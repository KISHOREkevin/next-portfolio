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
    <div className="app-workspace flex flex-col h-full text-[var(--foreground)] min-h-0">
      {/* App Toolbar */}
      <div className="pb-3 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-[var(--accent)] flex items-center gap-1.5">
            <span>Workspace</span>
            <span className="text-[var(--border-strong)]">/</span>
            <span>Projects</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-[var(--foreground)] m-0 leading-tight">
            Project Explorer
          </h1>
          <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
            {filtered.length} documented production systems & architectures
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <span className="absolute left-2.5 top-2 text-[var(--foreground-muted)] pointer-events-none">
              <Icon icon={phosphorIcons.magnifyingGlass} width={13} />
            </span>
            <input
              className="w-full h-8 pl-8 pr-7 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] font-sans transition-colors"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects or tech..."
              aria-label="Search projects"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {(query || category !== "All") && (
            <button
              className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer shrink-0 transition-colors"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
            >
              <Icon icon={phosphorIcons.arrowsClockwise} width={13} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="py-2.5 border-b border-[var(--border)] flex items-center gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
        {categories.map((item) => {
          const count = categoryCounts[item];
          const isActive = category === item;
          return (
            <button
              key={item}
              onClick={() => {
                setCategory(item);
                setMobileView("list");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold shadow-sm"
                  : "bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--border)]"
              }`}
            >
              <span>{item}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive
                    ? "bg-[var(--accent-foreground)]/20 text-[var(--accent-foreground)] font-bold"
                    : "bg-[var(--surface)] text-[var(--foreground-muted)]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area: Responsive Split or Mobile Master-Detail */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden pt-3">
        {/* Left Column: Projects List */}
        <div
          className={`flex-col md:w-[320px] lg:w-[350px] shrink-0 md:border-r border-[var(--border)] md:pr-3 overflow-y-auto ${
            mobileView === "detail" ? "hidden md:flex" : "flex w-full"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[var(--foreground-muted)] pb-2 mb-1 px-1">
            <span>Systems ({filtered.length})</span>
            <span>Select to inspect</span>
          </div>

          <div className="space-y-1.5 pb-4">
            {filtered.map((project) => {
              const isSelected = selected?.id === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => handleSelectProject(project.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer group relative ${
                    isSelected
                      ? "bg-[var(--surface-elevated)] border-[var(--border-strong)] border-l-[3px] border-l-[var(--accent)] shadow-sm"
                      : "bg-[var(--surface)]/40 border-transparent hover:border-[var(--border)] hover:bg-[var(--surface-elevated)]/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-muted)] group-hover:text-[var(--accent)] font-medium">
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

                  <h3 className="text-[13px] font-semibold text-[var(--foreground)] m-0 mb-1 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[var(--foreground-muted)] line-clamp-2 m-0 leading-relaxed mb-2">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--foreground-secondary)] border border-[var(--border)]/70"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono px-1 py-0.5 text-[var(--foreground-muted)]">
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
          className={`flex-1 min-w-0 md:pl-5 overflow-y-auto pb-4 ${
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
                  <span>← Back to all projects ({filtered.length})</span>
                </button>
              </div>

              {/* Detail Header Hero */}
              <div className="p-4 sm:p-5 rounded-lg bg-[var(--surface-elevated)]/60 border border-[var(--border)] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-[var(--surface)] text-[var(--accent)] font-semibold border border-[var(--border)]">
                      {selected.category}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--foreground-muted)]">
                      {selected.badge}
                    </span>
                  </div>

                  {/* External Action Links */}
                  <div className="flex flex-wrap items-center gap-2">
                    {selected.liveUrl && (
                      <a
                        href={selected.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold text-xs shadow-sm hover:opacity-95 transition-all cursor-pointer"
                      >
                        <Icon icon={phosphorIcons.linkSimple} width={13} />
                        Live Demo
                      </a>
                    )}

                    {selected.githubUrl && !selected.isPlaceholderLinks && (
                      <a
                        href={selected.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-xs font-medium transition-all cursor-pointer"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        Repository
                      </a>
                    )}
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] m-0 leading-tight">
                  {selected.title}
                </h2>

                <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed m-0">
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
      <div className="pt-2.5 mt-auto border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--foreground-muted)] shrink-0">
        <span className="truncate max-w-[200px] sm:max-w-none">
          projects.workspace / {selected?.id || "empty"}
        </span>
        <span>
          {filtered.length} of {projectsData.length} systems · KishoreOS
        </span>
      </div>
    </div>
  );
}
