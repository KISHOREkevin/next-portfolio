"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";
import { experienceData } from "@/data/experience";

const filterCategories = [
  { id: "all", label: "All Roles" },
  { id: "full-stack", label: "Full-Stack" },
  { id: "fintech", label: "FinTech" },
  { id: "systems", label: "Systems & Linux" },
  { id: "community", label: "Community & OSS" },
] as const;

export function ExperienceApp() {
  const [selectedId, setSelectedId] = useState(experienceData[0]?.id ?? "");
  const [filter, setFilter] = useState("all");
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  const filtered = experienceData.filter((item) => filter === "all" || item.category === filter);
  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  const handleSelectRole = (id: string) => {
    setSelectedId(id);
    setMobileView("detail");
  };

  return (
    <div className="app-workspace flex flex-col h-full text-[var(--foreground)]">
      {/* Top Toolbar */}
      <div className="pb-3 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-[var(--accent)]">
            Workspace / Career
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-[var(--foreground)] m-0 leading-tight">
            Experience Timeline
          </h1>
          <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
            Production engineering roles, responsibilities, and technical environments
          </p>
        </div>

        <div className="text-xs font-mono text-[var(--foreground-muted)]">
          {experienceData.length} documented career records
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="py-2.5 border-b border-[var(--border)] flex items-center gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
        {filterCategories.map((item) => {
          const count =
            item.id === "all"
              ? experienceData.length
              : experienceData.filter((exp) => exp.category === item.id).length;
          const isActive = filter === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setFilter(item.id);
                setMobileView("list");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold shadow-sm"
                  : "bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-[var(--border)]"
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? "bg-[var(--accent-foreground)]/20 text-[var(--accent-foreground)]"
                    : "bg-[var(--surface)] text-[var(--foreground-muted)]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Master-Detail Body */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden pt-3">
        {/* Left Column: Timeline List */}
        <div
          className={`flex-col md:w-[350px] shrink-0 md:border-r border-[var(--border)] md:pr-3 overflow-y-auto ${
            mobileView === "detail" ? "hidden md:flex" : "flex w-full"
          }`}
        >
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)] pb-2 mb-1 px-1">
            <span>Career Path ({filtered.length})</span>
            <span>Select role</span>
          </div>

          <div className="space-y-2 pb-6">
            {filtered.map((item) => {
              const isSelected = selected?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectRole(item.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer group ${
                    isSelected
                      ? "bg-[var(--surface-elevated)] border-[var(--accent)] shadow-sm"
                      : "bg-[var(--surface)]/50 border-[var(--border)] hover:bg-[var(--surface-elevated)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                      {item.period}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--foreground-muted)]">
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-[var(--foreground)] m-0 leading-snug">
                    {item.company}
                  </h3>

                  <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5 font-medium">
                    {item.role}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border)]/60 text-[10px] font-mono text-[var(--foreground-muted)]">
                    <span className="uppercase">{item.category}</span>
                    <Icon
                      icon={phosphorIcons.arrowRight}
                      width={12}
                      className={`transition-transform duration-150 ${
                        isSelected ? "text-[var(--accent)] translate-x-0.5" : "group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Role Inspector */}
        <div
          className={`flex-1 min-w-0 md:pl-4 overflow-y-auto pb-8 ${
            mobileView === "list" ? "hidden md:block" : "block w-full"
          }`}
        >
          {selected ? (
            <div className="space-y-4">
              {/* Mobile Back Button */}
              <div className="md:hidden pb-2 mb-2 border-b border-[var(--border)]">
                <button
                  onClick={() => setMobileView("list")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-medium text-[var(--foreground)] cursor-pointer"
                >
                  <Icon icon={phosphorIcons.caretLeft} width={14} />
                  <span>← Back to timeline ({filtered.length})</span>
                </button>
              </div>

              {/* Role Header */}
              <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-[var(--surface)] text-[var(--accent)] font-semibold border border-[var(--border)]">
                    {selected.category.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--foreground-muted)]">
                    <Icon icon={phosphorIcons.mapPin} width={12} />
                    {selected.location}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] m-0 leading-snug">
                  {selected.role}
                </h2>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--foreground-muted)]">
                  <span className="font-semibold text-[var(--foreground)]">{selected.company}</span>
                  <span>·</span>
                  <span>{selected.period}</span>
                </div>
              </div>

              {/* Summary Block */}
              <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)] m-0">
                  Role Summary
                </h3>
                <p className="text-sm text-[var(--foreground)] leading-relaxed m-0">
                  {selected.summary}
                </p>
              </div>

              {/* Highlights & Responsibilities */}
              <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)] m-0">
                  Responsibilities & Key Contributions ({selected.highlights.length})
                </h3>
                <div className="space-y-2">
                  {selected.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 p-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)]"
                    >
                      <div className="w-5 h-5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon icon={phosphorIcons.check} width={13} />
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed m-0 flex-1">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Environment */}
              <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-2.5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)] m-0">
                  Technical Environment & Tools ({selected.technologies.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selected.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 rounded-lg border border-dashed border-[var(--border)]">
              <p className="text-sm font-medium text-[var(--foreground)] m-0">No role selected</p>
              <p className="text-xs text-[var(--foreground-muted)] m-0 mt-1">
                Select an entry from the timeline to inspect responsibilities.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="pt-2 mt-auto border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--foreground-muted)] shrink-0">
        <span>career.timeline</span>
        <span>
          {experienceData.length} professional positions · Wealwin, Hashcodex, Krutanic, Shrika
        </span>
      </div>
    </div>
  );
}
