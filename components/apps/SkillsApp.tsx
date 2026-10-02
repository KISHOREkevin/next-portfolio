"use client";

import React, { useMemo, useState } from "react";
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
  soft_skills: phosphorIcons.userCircle
};

export function SkillsApp() {
  const [selectedId, setSelectedId] = useState("all");
  const [query, setQuery] = useState("");
  const selectedCategory = skillsData.find((category) => category.id === selectedId);

  const visibleCategories = useMemo(
    () =>
      skillsData
        .map((category) => ({
          ...category,
          skills: category.skills.filter((skill) =>
            `${skill.name} ${skill.tag} ${skill.level}`.toLowerCase().includes(query.toLowerCase())
          )
        }))
        .filter((category) => selectedId === "all" || category.id === selectedId)
        .filter((category) => category.skills.length),
    [query, selectedId]
  );

  return (
    <div className="app-workspace">
      <div className="app-toolbar">
        <div>
          <div className="app-kicker">Workspace / stack</div>
          <h1>Technology explorer</h1>
          <p>Technical skills and competencies organized across production domains.</p>
        </div>
        <div className="app-toolbar-actions">
          <input
            className="app-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search technologies"
            aria-label="Search technologies"
          />
        </div>
      </div>

      <div className="app-body" style={{ gridTemplateColumns: "190px minmax(0,1fr)" }}>
        <aside className="app-sidebar">
          <p className="app-sidebar-label">Categories</p>
          <nav>
            <button
              className={`app-nav-item ${selectedId === "all" ? "is-active" : ""}`}
              onClick={() => setSelectedId("all")}
            >
              <Icon icon={phosphorIcons.squaresFour} width={15} />
              All skills
            </button>
            {skillsData.map((category) => (
              <button
                className={`app-nav-item ${selectedId === category.id ? "is-active" : ""}`}
                key={category.id}
                onClick={() => setSelectedId(category.id)}
              >
                <Icon icon={categoryIcons[category.id] ?? phosphorIcons.code} width={15} />
                {category.name}
              </button>
            ))}
          </nav>
        </aside>

        <section className="app-main-pane">
          {visibleCategories.length ? (
            visibleCategories.map((category) => (
              <div key={category.id} style={{ marginBottom: 22 }}>
                <div className="app-detail-header">
                  <div>
                    <div className="app-kicker">{category.skills.length} skills</div>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                  </div>
                </div>

                <div className="app-list">
                  {category.skills.map((skill) => (
                    <div className="app-list-row" key={skill.name}>
                      <div>
                        <div className="app-list-title">{skill.name}</div>
                        <div className="app-list-meta">{skill.tag} · {skill.level}</div>
                      </div>
                      {skill.highlight && (
                        <span className="app-control">
                          <Icon icon={phosphorIcons.check} width={12} />
                          Core
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="app-empty">
              <div>
                <strong>No matching technologies</strong>
                Try a different category or search term.
              </div>
            </div>
          )}

          <div className="app-statusbar">
            <span>{selectedCategory?.name ?? "All categories"}</span>
            <span>{skillsData.length} categories · {skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)} skills</span>
          </div>
        </section>
      </div>
    </div>
  );
}
