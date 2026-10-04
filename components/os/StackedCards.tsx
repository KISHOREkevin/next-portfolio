"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";
import { profileData } from "@/data/profile";
import { experienceData } from "@/data/experience";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { useWindowManager } from "./WindowManager";
import { FastfetchCard } from "./FastfetchCard";

type Page = { id: string; eyebrow: string; title: string; appId?: string; content: React.ReactNode };

// Slide direction: 1 = forward (up from bottom), -1 = backward (down from top)
const slideVariants = {
  enter: (dir: number) => ({
    y: dir >= 0 ? "100%" : "-100%",
    rotateX: dir >= 0 ? 8 : -8,
  }),
  center: { y: "0%", rotateX: 0 },
  exit: (dir: number) => ({
    y: dir >= 0 ? "-100%" : "100%",
    rotateX: dir >= 0 ? -4 : 4,
  }),
};

const slideTransition = {
  duration: 0.62,
  ease: [0.32, 0.72, 0, 1] as const,
};

const WHEEL_THRESHOLD = 80; // px of delta to trigger a page change
const ANIM_LOCK_MS = 700; // ms to lock navigation during transition
const WHEEL_RESET_MS = 250; // ms of silence before resetting accumulated delta

export function StackedCards() {
  const { openApp } = useWindowManager();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isAnimating = useRef(false);
  const accDelta = useRef(0);
  const lastWheelTs = useRef(0);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const pages: Page[] = [
    {
      id: "about",
      eyebrow: "01 / ABOUT",
      title: profileData.name,
      appId: "about",
      content: (
        <>
          <p className="stacked-card-role">{profileData.title}</p>
          <p>{profileData.shortBio}</p>
          <div className="stacked-card-meta">
            <span><Icon icon={phosphorIcons.mapPin} width={14}/>{profileData.location}</span>
            <span className="stacked-status"><i />{profileData.status}</span>
          </div>
        </>
      ),
    },
    {
      id: "experience",
      eyebrow: "02 / EXPERIENCE",
      title: "Career timeline",
      appId: "experience",
      content: (
        <div className="stacked-timeline">
          {experienceData.map((item) => (
            <div key={item.id}>
              <span>{item.period}</span>
              <strong>{item.company}</strong>
              <p>{item.role}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "skills",
      eyebrow: "03 / SKILLS",
      title: "Technical Skills",
      appId: "skills",
      content: (
        <div className="stacked-skill-groups">
          {skillsData.map((category) => (
            <div key={category.id}>
              <span>{category.name}</span>
              <p>{category.skills.map((s) => s.name).join(" · ")}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "projects",
      eyebrow: "04 / PROJECTS",
      title: "Projects & Contributions",
      appId: "projects",
      content: (
        <div className="stacked-project-list">
          {projectsData.slice(0, 4).map((project) => (
            <div key={project.id}>
              <span>{project.badge}</span>
              <strong>{project.title}</strong>
              <p>{project.shortDescription}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "contact",
      eyebrow: "05 / CONTACT",
      title: "Start a conversation",
      appId: "contact",
      content: (
        <>
          <p>Available for full-stack engineering roles, technical architecture, and collaboration.</p>
          <div className="pt-4">
            <button
              onClick={() => openApp("contact")}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--foreground)] hover:text-[var(--background)] text-[var(--foreground)] font-mono text-xs font-medium transition-all duration-150 cursor-pointer group shadow-sm hover:border-[var(--foreground)]"
              aria-label="Open Contact Application"
            >
              <Icon icon={phosphorIcons.envelopeSimple} width={16} />
              <span>Open Contact App</span>
              <Icon
                icon={phosphorIcons.arrowRight}
                width={13}
                className="transition-transform duration-150 group-hover:translate-x-1"
              />
            </button>
          </div>
        </>
      ),
    },
  ];

  const navigate = useCallback(
    (nextIndex: number) => {
      if (isAnimating.current) return;
      if (nextIndex < 0 || nextIndex >= pages.length) return;
      setDirection(nextIndex > currentIndex ? 1 : -1);
      setCurrentIndex(nextIndex);
      isAnimating.current = true;

      // Ensure every new page starts cleanly scrolled to the top
      requestAnimationFrame(() => {
        const bodies = document.querySelectorAll<HTMLElement>(".stacked-page-body");
        bodies.forEach(b => { b.scrollTop = 0; });
        const shell = document.querySelector<HTMLElement>(".kishore-shell");
        if (shell) shell.scrollTop = 0;
      });

      setTimeout(() => { isAnimating.current = false; }, ANIM_LOCK_MS);
    },
    [currentIndex, pages.length]
  );

  // Wheel navigation — intercept wheel on the entire shell so we handle it
  // before the shell's own scroll, giving us the page-slide effect from the
  // very first scroll event.
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".kishore-shell");
    if (!shell) return;

    const onWheel = (e: WheelEvent) => {
      // Let windows and the launcher scroll their own content normally.
      const target = e.target as Element | null;
      if (target?.closest(".os-window") || target?.closest(".app-launcher") || target?.closest(".mobile-app")) return;

      // If the wheel is over a scrollable stacked-page-body that still has
      // room to scroll in the direction of the delta, let the body scroll
      // normally; only page-navigate once the body hits its boundary.
      const body = target?.closest(".stacked-page-body") as HTMLElement | null;
      if (body) {
        const atTop = body.scrollTop <= 0;
        const atBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 1;
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return;
      }

      e.preventDefault();

      const now = Date.now();
      // Reset accumulator after a pause so quick taps don't stack up.
      if (now - lastWheelTs.current > WHEEL_RESET_MS) {
        accDelta.current = 0;
      }
      lastWheelTs.current = now;
      accDelta.current += e.deltaY;

      if (accDelta.current > WHEEL_THRESHOLD) {
        accDelta.current = 0;
        navigate(currentIndex + 1);
      } else if (accDelta.current < -WHEEL_THRESHOLD) {
        accDelta.current = 0;
        navigate(currentIndex - 1);
      }
    };

    shell.addEventListener("wheel", onWheel, { passive: false });
    return () => shell.removeEventListener("wheel", onWheel);
  }, [currentIndex, navigate]);

  // Touch swipe navigation
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".kishore-shell");
    if (!shell) return;

    const onTouchStart = (e: TouchEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(".os-window") || target?.closest(".mobile-app") || target?.closest(".app-launcher")) return;
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(".os-window") || target?.closest(".mobile-app") || target?.closest(".app-launcher")) return;

      const diffY = touchStartY.current - e.changedTouches[0].clientY;
      const diffX = touchStartX.current - e.changedTouches[0].clientX;

      // Only navigate if vertical swipe is prominent and larger than horizontal gesture
      if (Math.abs(diffY) < 48 || Math.abs(diffX) > Math.abs(diffY)) return;

      // If inside a scrollable body with scroll room, let the body scroll instead of flipping page
      const body = target?.closest(".stacked-page-body") as HTMLElement | null;
      if (body && body.scrollHeight > body.clientHeight) {
        const atTop = body.scrollTop <= 2;
        const atBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 2;

        // If swiping down content (diffY > 0) but not at bottom yet, let natural scroll continue
        if (diffY > 0 && !atBottom) return;
        // If swiping up content (diffY < 0) but not at top yet, let natural scroll continue
        if (diffY < 0 && !atTop) return;
      }

      navigate(diffY > 0 ? currentIndex + 1 : currentIndex - 1);
    };

    shell.addEventListener("touchstart", onTouchStart, { passive: true });
    shell.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      shell.removeEventListener("touchstart", onTouchStart);
      shell.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentIndex, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if ((e.target as Element)?.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); navigate(currentIndex + 1); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); navigate(currentIndex - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, navigate]);

  const page = pages[currentIndex];

  return (
    <section className="stacked-pages-scene" aria-label="KishoreOS portfolio overview">
      {/* Fixed-height viewport — the only visible area */}
      <div className="stacked-cards-pin">
        <div className="stacked-pages-viewport">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.article
              key={page.id}
              className="stacked-page is-active"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              style={{ transformOrigin: "50% 100%", perspective: 1200 }}
            >
              <header>
                <span>{page.eyebrow}</span>
                <span>KISHOREOS</span>
              </header>
              <div className="stacked-page-body">
                {page.id === "about" ? (
                  <div className="about-split-layout">
                    <div className="about-hero-col">
                      <h2>{page.title}</h2>
                      {page.content}
                    </div>
                    <div className="about-telemetry-col">
                      <FastfetchCard onOpenTerminal={() => openApp("terminal")} />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2>{page.title}</h2>
                    {page.content}
                  </>
                )}
              </div>
             
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Page scroll progress bar */}
        <div className="stacked-scroll-bar-wrap" aria-label="Portfolio scroll progress">
          <span className="stacked-scroll-counter">
            <strong>{String(currentIndex + 1).padStart(2, "0")}</strong> / {String(pages.length).padStart(2, "0")}
          </span>
          <div
            className="stacked-scroll-track"
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={pages.length}
            title="Click to jump to section"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              const target = Math.min(pages.length - 1, Math.floor(ratio * pages.length));
              navigate(target);
            }}
          >
            <motion.div
              className="stacked-scroll-fill"
              initial={false}
              animate={{ width: `${((currentIndex + 1) / pages.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
