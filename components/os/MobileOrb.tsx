"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Compass, Moon, Sun, X } from "lucide-react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { useWindowManager } from "./WindowManager";
import { useTheme } from "./ThemeProvider";

type MenuItem = {
  id: string;
  name: string;
  code: string;
  icon?: PhosphorIconData;
  isTheme?: boolean;
  x: number;
  y: number;
};

// 8 items in 2 concentric orbital tiers radiating from the bottom-right trigger
// Inner Tier (R ≈ 78px) - 3 core actions
// Outer Tier (R ≈ 148px) - 5 actions
const menu: MenuItem[] = [
  // Inner Tier (R ≈ 78px)
  { id: "projects",   name: "Projects",  code: "PROJECTS", icon: phosphorIcons.folderOpen,     x: 0,    y: -78 },
  { id: "about",      name: "About",     code: "PROFILE",  icon: phosphorIcons.userCircle,     x: -55,  y: -55 },
  { id: "terminal",   name: "Terminal",  code: "CONSOLE",  icon: phosphorIcons.terminalWindow, x: -78,  y: 0 },

  // Outer Tier (R ≈ 148px)
  { id: "theme",      name: "Theme",     code: "THEME",    isTheme: true,                      x: -20,  y: -145 },
  { id: "resume",     name: "Resume",    code: "RESUME",   icon: phosphorIcons.fileText,       x: -58,  y: -135 },
  { id: "skills",     name: "Skills",    code: "SKILLS",   icon: phosphorIcons.gearSix,        x: -103, y: -103 },
  { id: "experience", name: "Journey",   code: "CAREER",   icon: phosphorIcons.briefcase,      x: -135, y: -58 },
  { id: "contact",    name: "Contact",   code: "CONTACT",  icon: phosphorIcons.envelopeSimple, x: -145, y: 0 },
];

export function MobileOrb() {
  const { openApp, setLauncherOpen } = useWindowManager();
  const { resolvedTheme, setPreference } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  const choose = (id: string) => {
    openApp(id);
    setOpen(false);
    setLauncherOpen(false);
  };

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  if (!mounted) {
    return (
      <div className="mobile-orb-wrap">
        <div className="orb-menu">
          <button className="mobile-orb" aria-label="Open application launcher">
            <Compass size={22} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-orb-wrap">
      <AnimatePresence>
        {open && (
          <motion.div
            className="orb-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="orb-menu">
        {/* HUD Indicator: shows active app name in the arc */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute -top-12 right-0 pointer-events-none select-none"
            >
              <div className="px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-md shadow-xl text-[10px] font-mono text-[var(--foreground)] tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[var(--foreground-muted)]">LAUNCH:</span>
                <span className="font-semibold text-[var(--foreground)]">
                  {hoveredApp || "SELECT APP"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orbital App Tiles */}
        <AnimatePresence>
          {open &&
            menu.map((item, index) => {
              const isThemeToggle = item.isTheme;
              return (
                <motion.button
                  key={item.id}
                  className="orb-tile"
                  initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: item.x,
                    y: item.y,
                    transition: {
                      type: "spring",
                      stiffness: 420,
                      damping: 26,
                      delay: index * 0.015,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.2,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.15 },
                  }}
                  onMouseEnter={() => setHoveredApp(item.name)}
                  onMouseLeave={() => setHoveredApp(null)}
                  onTouchStart={() => setHoveredApp(item.name)}
                  onClick={() => {
                    if (isThemeToggle) {
                      setPreference(nextTheme);
                    } else {
                      choose(item.id);
                    }
                  }}
                  aria-label={isThemeToggle ? `Switch to ${nextTheme} theme` : `Open ${item.name}`}
                >
                  <div className="flex flex-col items-center justify-center gap-0.5 pointer-events-none">
                    {isThemeToggle ? (
                      resolvedTheme === "dark" ? <Sun size={17} /> : <Moon size={17} />
                    ) : (
                      item.icon && <Icon icon={item.icon} width={18} height={18} />
                    )}
                    <span className="text-[8px] font-mono font-semibold tracking-tight text-[var(--foreground-muted)] uppercase leading-none">
                      {isThemeToggle ? (resolvedTheme === "dark" ? "Light" : "Dark") : item.code}
                    </span>
                  </div>
                </motion.button>
              );
            })}
        </AnimatePresence>

        {/* Center Trigger Button (Compass -> X) */}
        <button
          className={`mobile-orb ${open ? "is-open" : ""}`}
          onClick={() => {
            setOpen(!open);
            if (open) setHoveredApp(null);
          }}
          aria-label={open ? "Close menu" : "Open application launcher"}
          aria-expanded={open}
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="flex items-center justify-center w-full h-full"
          >
            {open ? <X size={22} /> : <Compass size={22} />}
          </motion.div>
        </button>
      </div>
    </div>
  );
}

