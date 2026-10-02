"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";
import { experienceData } from "@/data/experience";

export function ExperienceApp() {
  const [selectedId, setSelectedId] = useState(experienceData[0]?.id ?? "");
  const [filter, setFilter] = useState("all");
  const filtered = experienceData.filter((item) => filter === "all" || item.category === filter);
  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="app-workspace">
      <div className="app-toolbar">
        <div>
          <div className="app-kicker">Workspace / career</div>
          <h1>Experience timeline</h1>
          <p>Professional roles, responsibilities, and technical environments.</p>
        </div>
        <div className="app-toolbar-actions">
          <select
            className="app-search"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter experience"
          >
            <option value="all">All roles ({experienceData.length})</option>
            <option value="full-stack">Full-stack</option>
            <option value="fintech">Fintech</option>
            <option value="systems">Systems & Linux</option>
            <option value="community">Community & Open Source</option>
          </select>
        </div>
      </div>

      <div className="app-body" style={{ gridTemplateColumns: "minmax(230px,.82fr) minmax(0,1.18fr)" }}>
        <aside className="app-sidebar">
          <p className="app-sidebar-label">Career path</p>
          <div className="app-timeline">
            {filtered.map((item) => (
              <button
                key={item.id}
                className={`app-list-row app-timeline-item ${selected?.id === item.id ? "is-active" : ""}`}
                onClick={() => setSelectedId(item.id)}
              >
                <div>
                  <div className="app-kicker">{item.period}</div>
                  <div className="app-list-title" style={{ marginTop: 4 }}>
                    {item.company}
                  </div>
                  <div className="app-list-meta">{item.role}</div>
                </div>
                <Icon icon={phosphorIcons.arrowRight} width={14} />
              </button>
            ))}
          </div>
        </aside>

        <section className="app-main-pane">
          {selected ? (
            <>
              <div className="app-detail-header">
                <div>
                  <div className="app-kicker">{selected.category.toUpperCase()} · {selected.location}</div>
                  <h2>{selected.role}</h2>
                  <p>{selected.company} · {selected.period}</p>
                </div>
                <span className="app-control">
                  <Icon icon={phosphorIcons.mapPin} width={13} />
                  {selected.location}
                </span>
              </div>

              <div className="app-detail-block">
                <h3>Role summary</h3>
                <p>{selected.summary}</p>
              </div>

              <div className="app-detail-block">
                <h3>Responsibilities & contributions</h3>
                <div className="app-list">
                  {selected.highlights.map((highlight) => (
                    <div className="app-list-row" key={highlight}>
                      <Icon icon={phosphorIcons.check} width={14} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span className="app-muted" style={{ flex: 1 }}>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="app-detail-block">
                <h3>Technical environment</h3>
                <div className="app-inline-list">
                  {selected.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="app-empty">
              <div>
                <strong>No role selected</strong>
                Select a role from the timeline.
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="app-statusbar">
        <span>career.timeline</span>
        <span>{experienceData.length} professional entries · Wealwin, Hashcodex, Krutanic, Shrika, Linux Admin, Codex Arch</span>
      </div>
    </div>
  );
}
