"use client";

import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { projectsData, ProjectItem } from "@/data/projects";

const categories = [
  "All",
  "AI / LLM",
  "FinTech / Trading",
  "Full-Stack",
  "Systems & Tools",
] as const;

export function ProjectsApp() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(projectsData[0]?.id ?? "");
  const [tab, setTab] = useState<"overview" | "architecture" | "concepts">("overview");
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");
  const pillsRef = React.useRef<HTMLDivElement>(null);

  const scrollPills = (dir: "left" | "right") => {
    if (pillsRef.current) {
      const amount = dir === "left" ? -140 : 140;
      pillsRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      All: projectsData.length,
      "AI / LLM": projectsData.filter((p) => p.category === "AI / LLM").length,
      "FinTech / Trading": projectsData.filter((p) => p.category.includes("FinTech")).length,
      "Full-Stack": projectsData.filter((p) => p.category.includes("Full-Stack")).length,
      "Systems & Tools": projectsData.filter((p) => p.category.includes("Systems")).length,
    };
  }, []);

  const filtered = useMemo(() => {
    return projectsData.filter((project) => {
      let matchesCategory = false;
      if (category === "All") {
        matchesCategory = true;
      } else if (category === "AI / LLM") {
        matchesCategory = project.category === "AI / LLM";
      } else if (category === "FinTech / Trading") {
        matchesCategory = project.category.includes("FinTech");
      } else if (category === "Full-Stack") {
        matchesCategory = project.category.includes("Full-Stack");
      } else if (category === "Systems & Tools") {
        matchesCategory = project.category.includes("Systems");
      }

      const haystack = `${project.title} ${project.shortDescription} ${project.fullDescription} ${project.badge} ${project.technologies.join(" ")}`.toLowerCase();
      return matchesCategory && haystack.includes(query.toLowerCase());
    });
  }, [category, query]);

  const selected: ProjectItem | null =
    filtered.find((project) => project.id === selectedId) ?? filtered[0] ?? null;

  const handleSelectProject = (id: string) => {
    setSelectedId(id);
    setTab("overview");
    setMobileView("detail");
  };

  return (
    <div className="app-workspace">
      {/* Control bar: navigation arrows + category filters + search */}
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
          {categories.map((item) => {
            const count = categoryCounts[item];
            const isActive = category === item;
            return (
              <button
                key={item}
                onClick={() => { setCategory(item); setMobileView("list"); }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold"
                    : "bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
                }`}
              >
                <span>{item}</span>
                <span className={`text-[10px] px-1 rounded font-mono ${isActive ? "bg-white/20 text-[var(--accent-foreground)]" : "text-[var(--foreground-muted)]"}`}>{count}</span>
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
        <div className="relative shrink-0 w-28 sm:w-44">
          <span className="absolute left-2 top-1.5 text-[var(--foreground-muted)] pointer-events-none">
            <Icon icon={phosphorIcons.magnifyingGlass} width={12} />
          </span>
          <input
            className="w-full h-7 pl-6 pr-5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] font-sans"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          />
          {query && <button onClick={() => setQuery("")} className="absolute right-1.5 top-1.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)] text-[10px] cursor-pointer">✕</button>}
        </div>
        {(query || category !== "All") && (
          <button
            className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] text-[10px] text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer shrink-0"
            onClick={() => { setCategory("All"); setQuery(""); }}
            title="Reset filters"
          >
            <Icon icon={phosphorIcons.arrowsClockwise} width={11} />
          </button>
        )}
      </div>


      {/* Main Content Area: Responsive Split or Mobile Master-Detail */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col md:flex-row pt-0">
        {/* Left Column: Projects List */}
        <div
          className={`flex-col md:w-[320px] lg:w-[340px] shrink-0 md:border-r border-[var(--border)] md:pr-3 overflow-y-auto overscroll-contain pt-1 ${
            mobileView === "detail" ? "hidden md:flex" : "flex flex-1 w-full min-h-0 h-full"
          }`}
        >
          <div className="space-y-1.5 pb-4">
            {filtered.map((project) => {
              const isSelected = selected?.id === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => handleSelectProject(project.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer group relative ${
                    isSelected
                      ? "bg-[var(--surface-elevated)] border-[var(--border-strong)] border-l-[3px] border-l-[var(--accent)] shadow-sm"
                      : "bg-[var(--surface)]/40 border-transparent hover:border-[var(--border)] hover:bg-[var(--surface-elevated)]/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-muted)] group-hover:text-[var(--accent)] font-medium">
                      {project.category}
                    </span>
                    <Icon
                      icon={phosphorIcons.arrowRight}
                      width={12}
                      className={`transition-all duration-150 ${
                        isSelected
                          ? "text-[var(--accent)] translate-x-0.5 opacity-100"
                          : "text-[var(--foreground-muted)] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>

                  <h3 className="text-xs font-semibold text-[var(--foreground)] m-0 mb-0.5 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-[11px] text-[var(--foreground-muted)] line-clamp-2 m-0 leading-relaxed mb-1.5">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--foreground-secondary)] border border-[var(--border)]/70"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[9px] font-mono px-1 py-0.5 text-[var(--foreground-muted)]">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

            {filtered.length === 0 && (
              <div className="p-8 text-center rounded-lg border border-dashed border-[var(--border)] my-4">
                <p className="text-sm font-medium text-[var(--foreground)] m-0">No matching projects</p>
                <p className="text-xs text-[var(--foreground-muted)] m-0 mt-1">
                  Try adjusting your search query or collection filter.
                </p>
                <button
                  onClick={() => {
                    setCategory("All");
                    setQuery("");
                  }}
                  className="mt-3 px-3 py-1.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Project Detail Inspector */}
        <div
          className={`flex-1 min-w-0 min-h-0 md:pl-4 overflow-y-auto overscroll-contain pb-4 pt-1 ${
            mobileView === "list" ? "hidden md:block" : "block w-full h-full"
          }`}
        >
          {selected ? (
            <div className="space-y-3">
              {/* Mobile Back Button */}
              <div className="md:hidden pb-2 mb-2 border-b border-[var(--border)]">
                <button
                  onClick={() => setMobileView("list")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-medium text-[var(--foreground)] cursor-pointer"
                >
                  <Icon icon={phosphorIcons.caretLeft} width={14} />
                  <span>← Back to list ({filtered.length})</span>
                </button>
              </div>

              {/* Compact Detail Header */}
              <div className="pb-3 border-b border-[var(--border)] space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--surface-elevated)] text-[var(--accent)] font-semibold border border-[var(--border)]">
                      {selected.category}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--foreground-muted)]">
                      {selected.badge}
                    </span>
                  </div>

                  {/* External Action Links */}
                  <div className="flex items-center gap-1.5">
                    {selected.liveUrl && (
                      <a
                        href={selected.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold text-xs shadow-sm hover:opacity-95 transition-all cursor-pointer"
                      >
                        <Icon icon={phosphorIcons.linkSimple} width={12} />
                        Live Demo
                      </a>
                    )}

                    {selected.githubUrl && !selected.isPlaceholderLinks && (
                      <a
                        href={selected.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--surface-elevated)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-xs font-medium transition-all cursor-pointer"
                      >
                        <GithubIcon className="w-3 h-3" />
                        Code
                      </a>
                    )}
                  </div>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[var(--foreground)] m-0 leading-snug">
                  {selected.title}
                </h2>

                <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed m-0">
                  {selected.shortDescription}
                </p>
              </div>

              {/* Segmented Tabs */}
              <div className="flex items-center gap-1 border-b border-[var(--border)] pb-1.5">
                {(
                  [
                    { id: "overview", label: "Overview & Stack" },
                    { id: "architecture", label: "Architecture" },
                    { id: "concepts", label: "Key Concepts" },
                  ] as const
                ).map((tabItem) => (
                  <button
                    key={tabItem.id}
                    onClick={() => setTab(tabItem.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                      tab === tabItem.id
                        ? "bg-[var(--surface-elevated)] text-[var(--foreground)] font-semibold border border-[var(--border)] shadow-xs"
                        : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    {tabItem.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Overview */}
              {tab === "overview" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-2">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                      System Specification & Execution
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed m-0 whitespace-pre-line">
                      {selected.fullDescription}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-2.5">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                      Technologies & Stack ({selected.technologies.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] hover:border-[var(--accent)]/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Architecture */}
              {tab === "architecture" && (
                <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-3">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                    Architecture & Data Flow
                  </div>
                  <div className="space-y-2.5">
                    {selected.architecturePoints.map((point, index) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 p-3 rounded-md bg-[var(--surface-elevated)]/60 border border-[var(--border)]"
                      >
                        <span className="text-xs font-mono font-bold text-[var(--accent)] shrink-0 px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)]">
                          0{index + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed m-0 flex-1">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Key Concepts */}
              {tab === "concepts" && (
                <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-3">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                    Key Concepts & Engineering Principles
                  </div>
                  <div className="space-y-2.5">
                    {selected.keyConcepts.map((concept) => (
                      <div
                        key={concept}
                        className="flex items-start gap-3 p-3 rounded-md bg-[var(--surface-elevated)]/60 border border-[var(--border)]"
                      >
                        <div className="w-5 h-5 rounded-md bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5 border border-[var(--accent)]/20">
                          <Icon icon={phosphorIcons.check} width={12} />
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed m-0 flex-1">
                          {concept}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 rounded-lg border border-dashed border-[var(--border)]">
              <p className="text-sm font-medium text-[var(--foreground)] m-0">No project selected</p>
              <p className="text-xs text-[var(--foreground-muted)] m-0 mt-1">
                Select an entry from the list to inspect technical details.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="pt-2 mt-auto border-t border-[var(--border)] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--foreground-muted)] shrink-0 gap-2 pb-1">
        <span className="truncate max-w-[150px] sm:max-w-none">
          projects.workspace / {selected?.id || "empty"}
        </span>
        <span className="truncate text-right">
          <span className="hidden sm:inline">
            {filtered.length} of {projectsData.length} systems · KishoreOS
          </span>
          <span className="sm:hidden">
            {filtered.length}/{projectsData.length} systems
          </span>
        </span>
      </div>
    </div>
  );
}
