"use client";

import React, { useState } from "react";
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
    <div className="app-workspace flex flex-col h-auto md:h-full text-[var(--foreground)]">
      {/* Top Toolbar */}
      <div className="pb-3 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-[var(--accent)]">
            KishoreOS / Settings
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-[var(--foreground)] m-0 leading-tight">
            System Information
          </h1>
          <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
            Runtime telemetry, environment architecture, and display preferences
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-mono font-semibold self-start sm:self-auto border border-[var(--accent)]/30">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          System Online
        </span>
      </div>

      {/* Responsive Tabs on Mobile - Sticky on mobile */}
      <div className="py-2.5 border-b border-[var(--border)] flex items-center gap-1.5 overflow-x-auto shrink-0 md:hidden no-scrollbar sticky top-0 z-10 bg-[var(--surface)]">
        {sections.map((item) => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              section === item.id
                ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold shadow-sm"
                : "bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-[var(--border)]"
            }`}
          >
            <Icon icon={item.icon} width={13} />
            <span>{item.id}</span>
          </button>
        ))}
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row md:min-h-0 md:overflow-hidden pt-3">
        {/* Left Sidebar on Desktop */}
        <aside className="hidden md:flex flex-col w-48 shrink-0 border-r border-[var(--border)] pr-3 overflow-y-auto">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)] mb-2 px-2">
            Categories
          </p>
          <nav className="space-y-1">
            {sections.map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all text-left cursor-pointer ${
                  section === item.id
                    ? "bg-[var(--surface-elevated)] text-[var(--foreground)] font-semibold border border-[var(--border)]"
                    : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                }`}
                onClick={() => setSection(item.id)}
              >
                <Icon icon={item.icon} width={15} />
                <span>{item.id}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Main Content */}
        <section className="flex-1 min-w-0 md:pl-4 md:overflow-y-auto pb-8 space-y-4">
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
        </section>
      </div>

      {/* Status Bar */}
      <div className="pt-2 mt-auto border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--foreground-muted)] shrink-0">
        <span>system-info</span>
        <span>KishoreOS v3.0 · {resolvedTheme}</span>
      </div>
    </div>
  );
}
