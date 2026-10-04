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
    { label: "os",     value: "KishoreOS v3.0 (Linux)" },
    { label: "host",   value: "Full Stack Engineer" },
    { label: "kernel", value: "Node 20 · Python 3.12" },
    { label: "uptime", value: "Nov 2025 – Present · Wealwin" },
    { label: "shell",  value: "zsh 5.9 (x86_64-arch)" },
    { label: "stack",  value: "React · Fastify · PostgreSQL" },
    { label: "ai",     value: "RAG · LangChain · Ollama" },
    { label: "status", value: "Available for Hire" },
  ];

  // On mobile only show first 3 lines unless expanded
  const MOBILE_PREVIEW = 3;

  return (
    <div className="terminal-card font-mono text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-lg transition-all duration-200 hover:border-[var(--border-strong)] w-full">

      {/* ── Titlebar ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-[7px] border-b border-[var(--border)] bg-[var(--surface-elevated)] select-none">
        <div className="flex items-center gap-1.5">
          {/* Window dots */}
          <span className="w-2 h-2 rounded-full bg-[var(--border-strong)] inline-block opacity-50" />
          <span className="w-2 h-2 rounded-full bg-[var(--border-strong)] inline-block opacity-50" />
          <span className="w-2 h-2 rounded-full bg-[var(--border-strong)] inline-block opacity-50" />
          <span className="ml-1.5 flex items-center gap-1 text-[11px] text-[var(--foreground-muted)]">
            <Icon icon={phosphorIcons.terminalWindow} width={12} />
            <span className="text-[var(--foreground)] font-semibold">kishore@arch:~</span>
          </span>
        </div>
        <span className="text-[10px] text-[var(--foreground-muted)] tracking-widest">fastfetch</span>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="p-3 space-y-2.5">

        {/* Prompt line */}
        <div className="flex items-center gap-1 text-[11px] pb-2 border-b border-[var(--border)] leading-none">
          <span className="text-[var(--foreground)] font-semibold">kishore@arch</span>
          <span className="text-[var(--foreground-muted)]">:~$</span>
          <span className="text-[var(--foreground)] font-bold ml-0.5">fastfetch</span>
        </div>

        {/* Logo + Specs grid */}
        <div className="flex gap-3 items-start">

          {/* ASCII logo — hidden on very small screens, visible md+ */}
          <pre
            aria-hidden="true"
            className="text-[9px] leading-[1.22] text-[var(--foreground)] opacity-70 select-none shrink-0 hidden md:block pt-0.5"
          >{`    /\\
   /  \\
  /\\   \\
 /      \\
/ ,, ,, \\
\\__|__/`}</pre>

          {/* Specs */}
          <div className="flex-1 space-y-[5px] text-[11px] leading-snug min-w-0">
            {specs.map((item, idx) => {
              const hiddenOnMobile = !expanded && idx >= MOBILE_PREVIEW;
              return (
                <div
                  key={item.label}
                  className={`flex items-baseline gap-1.5 min-w-0 ${hiddenOnMobile ? "hidden md:flex" : "flex"}`}
                >
                  <span className="text-[var(--foreground-muted)] w-12 shrink-0 uppercase text-[9px] tracking-wider font-semibold">
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
              className="md:hidden text-[10px] text-[var(--foreground-muted)] mt-1 hover:text-[var(--foreground)] transition-colors"
              aria-label={expanded ? "Show less" : "Show more specs"}
            >
              {expanded ? "▲ less" : "▼ more specs"}
            </button>
          </div>
        </div>

        {/* Palette swatches */}
        <div className="flex gap-1 opacity-60 pt-0.5">
          {["#1a1a1a","#333","#555","#777","#999","#bbb","#ddd","#fff"].map((c, i) => (
            <span key={i} className="h-1.5 flex-1 rounded-[2px]" style={{ backgroundColor: c }} />
          ))}
        </div>

        {/* Footer action */}
        {onOpenTerminal && (
          <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between gap-2">
            <span className="text-[9px] text-[var(--foreground-muted)] tracking-wide hidden sm:block">
              Interactive Shell Available
            </span>
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--border)] bg-transparent hover:bg-[var(--foreground)] hover:text-[var(--background)] text-[var(--foreground)] transition-all duration-150 cursor-pointer text-[10px] group ml-auto"
              aria-label="Open Interactive Terminal"
            >
              <span>Launch CLI</span>
              <Icon
                icon={phosphorIcons.arrowRight}
                width={10}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

