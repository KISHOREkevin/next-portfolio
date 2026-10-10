"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";
import { profileData } from "@/data/profile";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { certificationsData } from "@/data/certifications";
import { useWindowManager } from "@/components/os/WindowManager";

const tabs = [
  { id: "overview", label: "Profile Overview", icon: phosphorIcons.userCircle },
  { id: "journey", label: "Career Journey", icon: phosphorIcons.briefcase },
  { id: "focus", label: "Current Focus", icon: phosphorIcons.code },
] as const;

export function AboutApp() {
  const { openApp } = useWindowManager();
  const [section, setSection] = useState<(typeof tabs)[number]["id"]>("overview");

  return (
    <div className="app-workspace flex flex-col h-auto md:h-full text-[var(--foreground)]">
      {/* Top Toolbar */}
      <div className="pb-3 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-[var(--accent)]">
            Profile / Identity
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-[var(--foreground)] m-0 leading-tight">
            {profileData.name}
          </h1>
          <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
            {profileData.title} · {profileData.location}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] text-xs text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer"
            onClick={() => openApp("terminal")}
          >
            <Icon icon={phosphorIcons.terminalWindow} width={14} />
            Terminal
          </button>
          <button
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold text-xs shadow-sm hover:opacity-95 cursor-pointer"
            onClick={() => openApp("projects")}
          >
            <Icon icon={phosphorIcons.folderOpen} width={14} />
            Projects
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar - Sticky on mobile */}
      <div className="py-2.5 border-b border-[var(--border)] flex items-center gap-1.5 overflow-x-auto shrink-0 no-scrollbar sticky top-0 z-10 bg-[var(--surface)]">
        {tabs.map((tab) => {
          const isActive = section === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSection(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold shadow-sm"
                  : "bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-[var(--border)]"
              }`}
            >
              <Icon icon={tab.icon} width={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 md:min-h-0 md:overflow-y-auto pt-3 pb-8 space-y-6">
        {section === "overview" && (
          <div className="space-y-4 max-w-4xl">
            {/* Status Card */}
            <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-bold">
                  Status
                </span>
                <h2 className="text-base font-bold text-[var(--foreground)] m-0 mt-0.5">
                  Available for Full-Stack & Applied AI Engineering
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
                  Based in {profileData.location} · Immediate availability
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-mono font-semibold self-start sm:self-auto border border-[var(--accent)]/30">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                Online & Active
              </span>
            </div>

            {/* Introduction Biography */}
            <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)] m-0">
                Introduction
              </h3>
              <div className="space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
                {profileData.fullBio.map((paragraph) => (
                  <p key={paragraph} className="m-0 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Core Identity Badges */}
            <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-2.5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)] m-0">
                Core Identity & Production Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Full Stack Developer",
                  "AI / LLM Engineer",
                  "Linux & Open Source",
                  "React · Next.js · TypeScript",
                  "Node.js · Fastify · Django · FastAPI",
                  "PostgreSQL · MongoDB · Redis",
                  "RAG Architecture · LangChain · Ollama",
                  "Docker · System Design",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Credentials */}
            <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)] m-0">
                Education & Credentials
              </h3>
              <div className="space-y-2">
                {educationData.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--foreground)] m-0">
                        {edu.degree}
                        {edu.field ? ` in ${edu.field}` : ""}
                      </h4>
                      <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
                        {edu.institution} ({edu.period})
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[var(--accent)] font-semibold shrink-0">
                      {edu.scoreType}: {edu.score}
                    </span>
                  </div>
                ))}

                <div className="p-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-[var(--foreground-muted)] m-0">
                    Certifications & Accreditations
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {certificationsData.map((c) => (
                      <span
                        key={c.id}
                        className="px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)]"
                      >
                        {c.title} ({c.issuer})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Philosophy */}
            <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)] m-0 mb-1">
                Developer Philosophy
              </h3>
              <p className="text-sm italic text-[var(--foreground)] m-0 leading-relaxed">
                “{profileData.motto}”
              </p>
            </div>
          </div>
        )}

        {section === "journey" && (
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[var(--border)]">
              <div>
                <h2 className="text-base font-bold text-[var(--foreground)] m-0">
                  Career Progression
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] m-0">
                  High-level milestones across professional engineering roles
                </p>
              </div>
              <button
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-medium text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer self-start sm:self-auto"
                onClick={() => openApp("experience")}
              >
                <span>Open Full Experience App</span>
                <Icon icon={phosphorIcons.arrowRight} width={13} />
              </button>
            </div>

            <div className="space-y-3">
              {experienceData.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-xs font-mono font-bold text-[var(--accent)]">
                      {item.period}
                    </span>
                    <span className="text-xs font-mono text-[var(--foreground-muted)]">
                      {item.location}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--foreground)] m-0">
                    {item.company}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-[var(--foreground-muted)] m-0">
                    {item.role}
                  </p>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed m-0 pt-1">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === "focus" && (
          <div className="space-y-4 max-w-4xl">
            <div className="pb-2 border-b border-[var(--border)]">
              <h2 className="text-base font-bold text-[var(--foreground)] m-0">
                Workstation Activity & Current Focus
              </h2>
              <p className="text-xs text-[var(--foreground-muted)] m-0">
                Primary engineering initiatives actively maintained and developed
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Full-Stack Web Applications",
                  tech: "React, Next.js, Node.js, Fastify & PostgreSQL",
                  category: "Production Engineering",
                },
                {
                  title: "Applied AI & RAG Architecture",
                  tech: "LLMs, LangChain, Ollama, Embeddings & Vector Stores",
                  category: "AI / Systems",
                },
                {
                  title: "Linux Workstation Workflows",
                  tech: "Qtile, Bash, Python & automated system maintenance (Codex Arch)",
                  category: "Systems & OSS",
                },
                {
                  title: "High-Throughput Trading Modules",
                  tech: "MetaTrader 5 (MT5), Order Routing & Database Migrations",
                  category: "FinTech Architecture",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex flex-col justify-between space-y-2"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-bold">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--foreground)] m-0 mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs font-mono text-[var(--foreground-muted)] m-0 pt-2 border-t border-[var(--border)]/60">
                    {item.tech}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-2.5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)] m-0">
                Technical & Open-Source Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Linux & Window Managers (Qtile)",
                  "Self-Hosting & Docker Containers",
                  "Local LLM Inference (Ollama)",
                  "Vector Databases & Semantic Search",
                  "Developer Community & Technical Workshops",
                ].map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="pt-2 mt-auto border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--foreground-muted)] shrink-0">
        <span>profile.bio</span>
        <span>A. Kishore · Full Stack & AI Systems Engineer · KishoreOS</span>
      </div>
    </div>
  );
}
