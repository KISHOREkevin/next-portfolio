"use client";

import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";
import { projectsData } from "@/data/projects";

const categories = ["All", "AI / LLM", "Full-Stack", "Systems & Tools"] as const;

export function ProjectsApp() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(projectsData[0]?.id ?? "");
  const [tab, setTab] = useState<"overview" | "architecture" | "concepts">("overview");

  const filtered = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const haystack = `${project.title} ${project.shortDescription} ${project.badge} ${project.technologies.join(" ")}`.toLowerCase();
      return matchesCategory && haystack.includes(query.toLowerCase());
    });
  }, [category, query]);

  const selected = filtered.find((project) => project.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="app-workspace">
      <div className="app-toolbar">
        <div>
          <div className="app-kicker">Workspace / projects</div>
          <h1>Project explorer</h1>
          <p>Inspect architecture, technologies, and engineering notes.</p>
        </div>
        <div className="app-toolbar-actions">
          <input
            className="app-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects"
            aria-label="Search projects"
          />
          <button className="app-control" onClick={() => { setCategory("All"); setQuery(""); }}>
            <Icon icon={phosphorIcons.arrowsClockwise} width={14} />
            Reset
          </button>
        </div>
      </div>

      <div className="app-body" style={{ gridTemplateColumns: "minmax(220px,.9fr) minmax(0,1.45fr)" }}>
        <aside className="app-sidebar">
          <p className="app-sidebar-label">Collections</p>
          <nav>
            {categories.map((item) => (
              <button
                key={item}
                className={`app-nav-item ${category === item ? "is-active" : ""}`}
                onClick={() => setCategory(item)}
              >
                <Icon
                  icon={item === "All" ? phosphorIcons.squaresFour : phosphorIcons.folderOpen}
                  width={15}
                />
                {item}
              </button>
            ))}
          </nav>
          <div style={{ marginTop: 22 }}>
            <p className="app-sidebar-label">Index</p>
            <p className="app-muted" style={{ fontSize: 11, lineHeight: 1.6 }}>
              {projectsData.length} documented production & engineering systems. Select an entry to open its technical inspector.
            </p>
          </div>
        </aside>

        <section
          className="app-main-pane"
          style={{ display: "grid", gridTemplateColumns: "minmax(190px,.72fr) minmax(0,1.28fr)", gap: 16 }}
        >
          <div>
            <div className="app-section-label">{filtered.length} projects</div>
            <div className="app-list">
              {filtered.map((project) => (
                <button
                  key={project.id}
                  className={`app-list-row ${selected?.id === project.id ? "is-active" : ""}`}
                  onClick={() => {
                    setSelectedId(project.id);
                    setTab("overview");
                  }}
                >
                  <div>
                    <div className="app-list-title">{project.title}</div>
                    <div className="app-list-meta">
                      {project.badge}
                      <br />
                      {project.shortDescription}
                    </div>
                  </div>
                  <Icon icon={phosphorIcons.arrowRight} width={14} style={{ marginTop: 3 }} />
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="app-empty">
                  <div>
                    <strong>No matching projects</strong>
                    Adjust the search or collection filter.
                  </div>
                </div>
              )}
            </div>
          </div>

          {selected ? (
            <div>
              <div className="app-detail-header">
                <div>
                  <div className="app-kicker">{selected.category}</div>
                  <h2>{selected.title}</h2>
                  <p>{selected.badge}</p>
                </div>
                <div className="app-toolbar-actions">
                  {selected.githubUrl && !selected.isPlaceholderLinks && (
                    <a
                      className="app-control"
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon icon={phosphorIcons.linkSimple} width={13} />
                      GitHub
                    </a>
                  )}
                  {selected.liveUrl && (
                    <a
                      className="app-control app-control-primary"
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open project
                    </a>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 4,
                  borderBottom: "1px solid var(--border)",
                  marginTop: 12
                }}
              >
                {(["overview", "architecture", "concepts"] as const).map((item) => (
                  <button
                    key={item}
                    className={`app-nav-item ${tab === item ? "is-active" : ""}`}
                    style={{ width: "auto", borderRadius: 0, textTransform: "capitalize" }}
                    onClick={() => setTab(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {tab === "overview" && (
                <>
                  <div className="app-detail-block">
                    <h3>Overview</h3>
                    <p>{selected.fullDescription}</p>
                  </div>
                  <div className="app-detail-block">
                    <h3>Technologies & Tools</h3>
                    <div className="app-inline-list">
                      {selected.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {tab === "architecture" && (
                <div className="app-detail-block">
                  <h3>Architecture / Data Flow</h3>
                  <div className="app-list">
                    {selected.architecturePoints.map((point, index) => (
                      <div className="app-list-row" key={point}>
                        <span className="app-kicker">0{index + 1}</span>
                        <span style={{ flex: 1 }} className="app-muted">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "concepts" && (
                <div className="app-detail-block">
                  <h3>Key Concepts & Impact</h3>
                  <div className="app-list">
                    {selected.keyConcepts.map((concept) => (
                      <div className="app-list-row" key={concept}>
                        <Icon icon={phosphorIcons.check} width={14} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span className="app-muted" style={{ flex: 1 }}>{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="app-empty">
              <div>
                <strong>No project selected</strong>
                Select a project from the list to inspect it.
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="app-statusbar">
        <span>projects.index</span>
        <span>{projectsData.length} documented systems · AI, Systems & Full-Stack</span>
      </div>
    </div>
  );
}
