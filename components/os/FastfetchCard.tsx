"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";

interface FastfetchCardProps {
  onOpenTerminal?: () => void;
}

export function FastfetchCard({ onOpenTerminal }: FastfetchCardProps) {
  const [expanded, setExpanded] = useState(false);

  const specs = [
    { label: "os",     value: "KishoreOS" },
    { label: "host",   value: "Full-Stack & Systems Engineer" },
    { label: "shell",  value: "fish (x86_64-arch)" },
    { label: "status", value: "Available for Hire" },
  ];

  // On mobile only show first 3 lines unless expanded
  const MOBILE_PREVIEW = 3;

  // Tokyo Night ANSI 8-color palette swatches
  const tokyoNightPalette = [
    "#151B2B", // Dark Base
    "#F43F5E", // Red
    "#34D399", // Emerald Green
    "#F59E0B", // Amber Yellow
    "#38BDF8", // Blue
    "#A855F7", // Purple / Violet
    "#06B6D4", // Cyan
    "#E6EDF7", // White / Foreground
  ];

  return (
    <div className="terminal-card font-mono text-xs rounded-xl border border-white/10 bg-[var(--surface)]/90 backdrop-blur-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 hover:border-white/20 w-full">

      {/* ── Titlebar ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/5 bg-[var(--surface-elevated)]/90 select-none">
        <div className="flex items-center gap-1.5">
          {/* Subtle colored terminal dots */}
          <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]/70 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]/70 inline-block" />
          <span className="ml-2 flex items-center gap-1 text-[11px] text-[var(--foreground-muted)]">
            <Icon icon={phosphorIcons.terminalWindow} width={13} className="text-[var(--accent)]" />
            <span className="text-[var(--foreground)] font-medium">kishore@arch:~</span>
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--foreground-muted)] tracking-widest uppercase opacity-75">fastfetch</span>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="p-3.5 space-y-3">

        {/* Prompt line */}
        <div className="flex items-center gap-1 text-[11px] pb-2 border-b border-white/5 leading-none">
          <span className="text-[#38BDF8] font-semibold">kishore@arch</span>
          <span className="text-[var(--foreground-muted)]">:~$</span>
          <span className="text-[var(--foreground)] font-bold ml-0.5">fastfetch</span>
        </div>

        {/* Logo + Specs grid */}
        <div className="flex gap-3.5 items-start">

          {/* ASCII logo — hidden on very small screens, visible md+ */}
          <pre
            aria-hidden="true"
            className="text-[9px] leading-[1.25] text-[#38BDF8] opacity-80 select-none shrink-0 hidden md:block pt-0.5"
          >{`    /\\
   /  \\
  /\\   \\
 /      \\
/ ,, ,, \\
\\__|__/`}</pre>

          {/* Specs */}
          <div className="flex-1 space-y-[6px] text-[11px] leading-snug min-w-0">
            {specs.map((item, idx) => {
              const hiddenOnMobile = !expanded && idx >= MOBILE_PREVIEW;
              return (
                <div
                  key={item.label}
                  className={`flex items-baseline gap-2 min-w-0 ${hiddenOnMobile ? "hidden md:flex" : "flex"}`}
                >
                  <span className="text-[#A855F7] w-12 shrink-0 uppercase text-[9px] tracking-wider font-semibold">
                    {item.label}
                  </span>
                  <span className="text-[var(--foreground-muted)] opacity-40 shrink-0 text-[10px]">•</span>
                  <span className="text-[var(--foreground)] font-medium truncate text-[11px]">
                    {item.value}
                  </span>
                </div>
              );
            })}

            {/* Mobile expand/collapse toggle */}
            <button
              onClick={() => setExpanded(v => !v)}
              className="md:hidden text-[10px] text-[var(--foreground-muted)] mt-1 hover:text-[var(--foreground)] transition-colors cursor-pointer"
              aria-label={expanded ? "Show less" : "Show more specs"}
            >
              {expanded ? "▲ less" : "▼ more specs"}
            </button>
          </div>
        </div>

        {/* Tokyo Night Palette swatches */}
        <div className="flex gap-1.5 pt-1">
          {tokyoNightPalette.map((color, i) => (
            <span
              key={i}
              className="h-2 flex-1 rounded-[3px] border border-white/5 shadow-xs transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Footer action */}
        {onOpenTerminal && (
          <div className="pt-2.5 border-t border-white/5 flex items-center justify-between gap-2">
            <span className="text-[10px] text-[var(--foreground-muted)] tracking-wide hidden sm:block">
              Interactive fish shell available
            </span>
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] text-[var(--foreground)] transition-all duration-150 cursor-pointer text-[10px] font-medium group ml-auto shadow-xs"
              aria-label="Open Interactive Terminal"
            >
              <span>Launch CLI</span>
              <Icon
                icon={phosphorIcons.arrowRight}
                width={11}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

