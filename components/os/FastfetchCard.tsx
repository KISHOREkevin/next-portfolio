"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";

interface FastfetchCardProps {
  onOpenTerminal?: () => void;
}

export function FastfetchCard({ onOpenTerminal }: FastfetchCardProps) {
  const specs = [
    { label: "os", value: "KishoreOS v3.0 (Linux)" },
    { label: "host", value: "Full Stack Engineer" },
    { label: "kernel", value: "Node 20 · Python 3.12" },
    { label: "uptime", value: "Nov 2025 – Present (@ Wealwin)" },
    { label: "shell", value: "zsh 5.9 (x86_64-arch)" },
    { label: "stack", value: "React · Fastify · PostgreSQL" },
    { label: "ai", value: "RAG · LangChain · Ollama" },
    { label: "status", value: "Available for Hire" },
  ];

  return (
    <div className="terminal-card font-mono text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-200 hover:border-[var(--border-strong)]">
      {/* Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)] bg-[var(--surface-elevated)]/90 text-[11px] select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] inline-block opacity-70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] inline-block opacity-70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] inline-block opacity-70" />
          <span className="ml-1 text-[var(--foreground)] font-semibold flex items-center gap-1.5">
            <Icon icon={phosphorIcons.terminalWindow} width={13} className="text-[var(--foreground-muted)]" />
            <span>kishore@arch:~</span>
          </span>
        </div>
        <span className="text-[10px] text-[var(--foreground-muted)] tracking-wider">fastfetch</span>
      </div>

      {/* Body */}
      <div className="p-3.5 sm:p-4 space-y-3">
        {/* Command line */}
        <div className="text-[12px] leading-none text-[var(--foreground-muted)] flex items-center gap-1 pb-1 border-b border-[var(--border-subtle)]">
          <span className="text-[var(--foreground)] font-semibold">kishore@arch</span>
          <span>:</span>
          <span className="text-[var(--foreground-secondary)]">~</span>
          <span>$</span>
          <span className="text-[var(--foreground)] font-bold ml-1">fastfetch</span>
        </div>

        {/* Content layout: ASCII logo on left + Specs on right */}
        <div className="grid grid-cols-[auto_1fr] gap-3 sm:gap-4 items-start pt-1">
          {/* ASCII Logo */}
          <pre className="text-[10px] leading-[1.18] text-[var(--foreground)] font-mono opacity-80 select-none hidden sm:block pt-0.5">
{`       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\`}
          </pre>

          {/* Specs list */}
          <div className="space-y-1.5 text-[11px] leading-tight min-w-0">
            {specs.map((item) => (
              <div key={item.label} className="flex items-baseline gap-2 min-w-0">
                <span className="text-[var(--foreground-muted)] w-14 shrink-0 uppercase text-[10px] tracking-wider font-semibold">
                  {item.label}
                </span>
                <span className="text-[var(--foreground-muted)] opacity-40 shrink-0">•</span>
                <span className="text-[var(--foreground)] font-medium truncate">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Palette blocks */}
        <div className="pt-1 flex gap-1.5 opacity-75">
          {["#1a1a1a", "#333333", "#555555", "#777777", "#999999", "#bbbbbb", "#dddddd", "#ffffff"].map((color, idx) => (
            <span
              key={idx}
              className="h-1.5 flex-1 rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Action footer */}
        {onOpenTerminal && (
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
            <span className="text-[var(--foreground-muted)] text-[10px]">
              Interactive Shell Available
            </span>
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--surface-hover)] hover:bg-[var(--foreground)] hover:text-[var(--background)] text-[var(--foreground)] transition-all duration-150 cursor-pointer text-[11px] group"
              aria-label="Open Interactive Terminal"
            >
              <span>Launch CLI</span>
              <Icon icon={phosphorIcons.arrowRight} width={11} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
