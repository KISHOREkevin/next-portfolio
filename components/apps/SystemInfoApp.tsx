"use client";

import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";
import { profileData } from "@/data/profile";
import { ThemePreference, useTheme } from "@/components/os/ThemeProvider";

const sections = [
  { id: "System", icon: phosphorIcons.desktop },
  { id: "Appearance", icon: phosphorIcons.palette },
  { id: "Environment", icon: phosphorIcons.code },
  { id: "About", icon: phosphorIcons.info },
] as const;

export function SystemInfoApp() {
  const { preference, resolvedTheme, setPreference } = useTheme();
  const [section, setSection] = useState<(typeof sections)[number]["id"]>("System");
  const pillsRef = useRef<HTMLDivElement>(null);

  const scrollPills = (dir: "left" | "right") => {
    if (pillsRef.current) {
      const amount = dir === "left" ? -140 : 140;
      pillsRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const specs = [
    ["Operating System", profileData.systemSpecs.os],
    ["Kernel / Base", profileData.systemSpecs.kernel],
    ["Shell", profileData.systemSpecs.shell],
    ["Frontend Framework", profileData.systemSpecs.environment],
    ["Core Stack", profileData.systemSpecs.coreStack],
    ["Backend Engine", profileData.systemSpecs.backendEngine],
    ["AI Runtime", profileData.systemSpecs.aiRuntime],
    ["Vector Database", profileData.systemSpecs.vectorStore],
  ];

  return (
    <div className="app-workspace">
      {/* Single control bar: navigation arrows + section pills + status */}
      <div className="flex items-center gap-1 pb-2 border-b border-[var(--border)] shrink-0 min-w-0">
        {/* Left Arrow Button */}
        <button
          onClick={() => scrollPills("left")}
          className="w-6 h-7 rounded bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] active:scale-95 flex items-center justify-center shrink-0 cursor-pointer transition-all"
          title="Scroll sections left"
          aria-label="Previous sections"
        >
          <Icon icon={phosphorIcons.caretLeft} width={13} />
        </button>

        {/* Scrollable Section Pills */}
        <div ref={pillsRef} className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-1 min-w-0">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                section === item.id
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold shadow-sm"
                  : "bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              <Icon icon={item.icon} width={13} />
              <span>{item.id}</span>
            </button>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scrollPills("right")}
          className="w-6 h-7 rounded bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] active:scale-95 flex items-center justify-center shrink-0 cursor-pointer transition-all"
          title="Scroll sections right"
          aria-label="Next sections"
        >
          <Icon icon={phosphorIcons.caretRight} width={13} />
        </button>

        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-[10px] font-mono font-semibold border border-[var(--accent)]/30 shrink-0 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          Online
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pt-3 pb-8 space-y-4">
          {section === "System" && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-bold">
                  Telemetry
                </span>
                <h2 className="text-lg font-bold text-[var(--foreground)] m-0 mt-0.5">
                  {profileData.systemSpecs.os}
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
                  Custom developer workstation profile & technical specifications
                </p>
              </div>

              <div className="rounded-lg bg-[var(--surface)] border border-[var(--border)] overflow-hidden divide-y divide-[var(--border)]">
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                  >
                    <span className="font-mono text-[var(--foreground-muted)] font-medium">
                      {label}
                    </span>
                    <strong className="font-mono text-[var(--foreground)] sm:text-right">
                      {value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === "Appearance" && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-bold">
                  Interface
                </span>
                <h2 className="text-lg font-bold text-[var(--foreground)] m-0 mt-0.5">
                  Theme Preference
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
                  Select color theme for KishoreOS windows, taskbar, and applications
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["dark", "light", "system"] as ThemePreference[]).map((theme) => {
                  const isSelected = preference === theme;
                  return (
                    <button
                      key={theme}
                      onClick={() => setPreference(theme)}
                      className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? "bg-[var(--surface-elevated)] border-[var(--accent)] shadow-sm"
                          : "bg-[var(--surface)] border-[var(--border)] hover:bg-[var(--surface-elevated)]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[var(--foreground)] capitalize">
                            {theme} Theme
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                          )}
                        </div>
                        <p className="text-xs text-[var(--foreground-muted)] m-0 mt-1">
                          {theme === "dark"
                            ? "High-contrast dark monochrome"
                            : theme === "light"
                            ? "Crisp, clean light mode"
                            : "Matches system preferences"}
                        </p>
                      </div>

                      <span
                        className={`text-xs font-mono px-2.5 py-1 rounded-md text-center border ${
                          isSelected
                            ? "bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)] font-semibold"
                            : "bg-[var(--surface-elevated)] text-[var(--foreground-muted)] border-[var(--border)]"
                        }`}
                      >
                        {isSelected ? "Active Theme" : "Select"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-1">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)] m-0">
                  Current Session
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed m-0">
                  KishoreOS is currently active in <strong>{resolvedTheme}</strong> mode.
                  Performance optimizations and reduced motion settings are enabled.
                </p>
              </div>
            </div>
          )}

          {section === "Environment" && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-bold">
                  Architecture
                </span>
                <h2 className="text-lg font-bold text-[var(--foreground)] m-0 mt-0.5">
                  Portfolio Engineering Stack
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
                  Libraries, frameworks, and architecture powering this portfolio OS
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "Next.js 16 (App Router)", role: "SSR framework & Turbopack bundler" },
                  { name: "React 19", role: "UI primitives & reactive state" },
                  { name: "Tailwind CSS v4", role: "Atomic design & CSS variables" },
                  { name: "TypeScript 5", role: "Strict compile-time type safety" },
                  { name: "Framer Motion", role: "Physics-based windowing animations" },
                  { name: "Phosphor & Lucide Icons", role: "Accessible vector iconography" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-1"
                  >
                    <h4 className="text-sm font-semibold text-[var(--foreground)] m-0">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[var(--foreground-muted)] m-0">
                      {item.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === "About" && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-bold">
                  Overview
                </span>
                <h2 className="text-lg font-bold text-[var(--foreground)] m-0 mt-0.5">
                  About KishoreOS
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
                  A personal developer portfolio designed as an interactive OS
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-3 text-sm text-[var(--foreground)] leading-relaxed">
                <p className="m-0">
                  KishoreOS is designed to represent my work not as a passive résumé, but as an interactive workstation environment.
                </p>
                <p className="m-0">
                  Built from the ground up to reflect my passion for Linux systems, clean window management, and full-stack software architecture.
                </p>
              </div>
            </div>
          )}
      </div>

      {/* Status Bar */}
      <div className="pt-2 mt-auto border-t border-[var(--border)] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--foreground-muted)] shrink-0 gap-2 pb-1">
        <span className="truncate">system-info</span>
        <span className="truncate text-right">
          <span className="hidden sm:inline">
            KishoreOS v3.0 · {resolvedTheme}
          </span>
          <span className="sm:hidden">
            v3.0 · {resolvedTheme}
          </span>
        </span>
      </div>
    </div>
  );
}
