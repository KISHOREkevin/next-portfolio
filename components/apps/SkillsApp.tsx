"use client";

import React, { useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";
import { skillsData } from "@/data/skills";

const categoryIcons: Record<string, typeof phosphorIcons.code> = {
  frontend: phosphorIcons.code,
  backend: phosphorIcons.hardDrive,
  databases: phosphorIcons.hardDrive,
  ai: phosphorIcons.stack,
  devops: phosphorIcons.terminalWindow,
  systems: phosphorIcons.gearSix,
  languages: phosphorIcons.code,
  problem_solving: phosphorIcons.squaresFour,
  soft_skills: phosphorIcons.userCircle,
};

export function SkillsApp() {
  const [selectedId, setSelectedId] = useState("all");
  const [query, setQuery] = useState("");
  const pillsRef = useRef<HTMLDivElement>(null);

  const scrollPills = (dir: "left" | "right") => {
    if (pillsRef.current) {
      const amount = dir === "left" ? -140 : 140;
      pillsRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const totalSkillCount = useMemo(
    () => skillsData.reduce((acc, cat) => acc + cat.skills.length, 0),
    []
  );

  const visibleCategories = useMemo(
    () =>
      skillsData
        .map((category) => ({
          ...category,
          skills: category.skills.filter((skill) =>
            `${skill.name} ${skill.tag} ${skill.level}`
              .toLowerCase()
              .includes(query.toLowerCase())
          ),
        }))
        .filter((category) => selectedId === "all" || category.id === selectedId)
        .filter((category) => category.skills.length > 0),
    [query, selectedId]
  );

  return (
    <div className="app-workspace">
      {/* Control bar: navigation arrows + category pills + search */}
      <div className="flex items-center gap-1 pb-2 border-b border-[var(--border)] shrink-0 min-w-0">
        {/* Left Arrow Button */}
        <button
          onClick={() => scrollPills("left")}
          className="w-6 h-7 rounded bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] active:scale-95 flex items-center justify-center shrink-0 cursor-pointer transition-all"
          title="Scroll filters left"
          aria-label="Previous filters"
        >
          <Icon icon={phosphorIcons.caretLeft} width={13} />
        </button>

        {/* Scrollable Category pills */}
        <div ref={pillsRef} className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-1 min-w-0">
          <button
            onClick={() => setSelectedId("all")}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              selectedId === "all"
                ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold shadow-sm"
                : "bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-[var(--border)]"
            }`}
          >
            <Icon icon={phosphorIcons.squaresFour} width={12} />
            <span>All</span>
            <span className={`text-[10px] px-1 rounded font-mono ${selectedId === "all" ? "bg-[var(--accent-foreground)]/20 text-[var(--accent-foreground)]" : "text-[var(--foreground-muted)]"}`}>{totalSkillCount}</span>
          </button>

          {skillsData.map((category) => {
            const isActive = selectedId === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedId(category.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold shadow-sm"
                    : "bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-[var(--border)]"
                }`}
              >
                <Icon icon={categoryIcons[category.id] ?? phosphorIcons.code} width={12} />
                <span>{category.name}</span>
                <span className={`text-[10px] px-1 rounded font-mono ${isActive ? "bg-[var(--accent-foreground)]/20 text-[var(--accent-foreground)]" : "text-[var(--foreground-muted)]"}`}>{category.skills.length}</span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scrollPills("right")}
          className="w-6 h-7 rounded bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] active:scale-95 flex items-center justify-center shrink-0 cursor-pointer transition-all"
          title="Scroll filters right"
          aria-label="Next filters"
        >
          <Icon icon={phosphorIcons.caretRight} width={13} />
        </button>

        {/* Search */}
        <div className="relative shrink-0 w-28 sm:w-40">
          <input
            className="w-full h-7 px-2 pr-5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] font-sans"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            aria-label="Search technologies"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-1 top-1.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)] text-[10px] cursor-pointer">✕</button>
          )}
        </div>
        {(query || selectedId !== "all") && (
          <button
            className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] text-[10px] text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer shrink-0"
            onClick={() => { setSelectedId("all"); setQuery(""); }}
            title="Reset filters"
          >
            <Icon icon={phosphorIcons.arrowsClockwise} width={11} />
          </button>
        )}
      </div>

      {/* Main Content: Grouped Responsive Skill Cards Grid */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pt-3 pb-8 space-y-6">
        {visibleCategories.length > 0 ? (
          visibleCategories.map((category) => (
            <div key={category.id} className="space-y-3">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[var(--border)]/60">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                    <Icon icon={categoryIcons[category.id] ?? phosphorIcons.code} width={14} />
                  </div>
                  <h2 className="text-base font-bold text-[var(--foreground)] m-0">
                    {category.name}
                  </h2>
                  <span className="text-xs font-mono text-[var(--accent)] font-semibold">
                    ({category.skills.length})
                  </span>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] m-0">
                  {category.description}
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] transition-all flex flex-col justify-between space-y-2 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[var(--foreground)] m-0 leading-tight">
                        {skill.name}
                      </h3>
                      {skill.highlight && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] font-semibold shrink-0">
                          Core
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]/40 text-[11px] font-mono text-[var(--foreground-muted)]">
                      <span className="truncate" title={skill.tag}>
                        {skill.tag}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border)]/50 shrink-0">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center rounded-lg border border-dashed border-[var(--border)] my-6">
            <p className="text-sm font-medium text-[var(--foreground)] m-0">No matching technologies</p>
            <p className="text-xs text-[var(--foreground-muted)] m-0 mt-1">
              Try a different search query or select &quot;All Skills&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedId("all");
                setQuery("");
              }}
              className="mt-3 px-3 py-1.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="pt-2 mt-auto border-t border-[var(--border)] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--foreground-muted)] shrink-0 gap-2 pb-1">
        <span className="truncate">skills.matrix</span>
        <span className="truncate text-right">
          <span className="hidden sm:inline">
            {skillsData.length} categories · {totalSkillCount} documented skills · KishoreOS
          </span>
          <span className="sm:hidden">
            {totalSkillCount} skills
          </span>
        </span>
      </div>
    </div>
  );
}
