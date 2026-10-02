"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";
import { profileData } from "@/data/profile";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { certificationsData } from "@/data/certifications";
import { useWindowManager } from "@/components/os/WindowManager";

export function AboutApp() {
  const { openApp } = useWindowManager();
  const [section, setSection] = useState<"overview" | "journey" | "focus">("overview");

  return (
    <div className="app-workspace">
      <div className="app-toolbar">
        <div>
          <div className="app-kicker">Profile / home</div>
          <h1>{profileData.name}</h1>
          <p>{profileData.title} · {profileData.status}</p>
        </div>
        <div className="app-toolbar-actions">
          <button className="app-control" onClick={() => openApp("terminal")}>
            <Icon icon={phosphorIcons.terminalWindow} width={14}/>Terminal
          </button>
          <button className="app-control app-control-primary" onClick={() => openApp("projects")}>
            <Icon icon={phosphorIcons.folderOpen} width={14}/>Projects
          </button>
        </div>
      </div>

      <div className="app-body" style={{gridTemplateColumns:"170px minmax(0,1fr)"}}>
        <aside className="app-sidebar">
          <p className="app-sidebar-label">Profile</p>
          <nav>
            {([
              ["overview", "Overview", phosphorIcons.userCircle],
              ["journey", "Journey", phosphorIcons.briefcase],
              ["focus", "Current focus", phosphorIcons.code]
            ] as const).map(([id, label, icon]) => (
              <button
                key={id}
                className={`app-nav-item ${section === id ? "is-active" : ""}`}
                onClick={() => setSection(id)}
              >
                <Icon icon={icon} width={15}/>{label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="app-main-pane">
          {section === "overview" && (
            <>
              <div className="app-detail-header">
                <div>
                  <div className="app-kicker">Available for full-stack & AI roles</div>
                  <h2>Profile overview</h2>
                  <p>{profileData.location}</p>
                </div>
                <span className="app-control">
                  <Icon icon={phosphorIcons.check} width={13}/>Online
                </span>
              </div>

              <div className="app-detail-block">
                <h3>Introduction</h3>
                {profileData.fullBio.map((paragraph) => (
                  <p key={paragraph} style={{marginBottom: 8}}>{paragraph}</p>
                ))}
              </div>

              <div className="app-detail-block">
                <h3>Core Identity & Stack</h3>
                <div className="app-inline-list">
                  <span>Full Stack Developer</span>
                  <span>AI / LLM Engineer</span>
                  <span>Linux & Open Source</span>
                  <span>React · Node.js · Fastify · PostgreSQL</span>
                  <span>RAG · LangChain · Ollama</span>
                </div>
              </div>

              <div className="app-detail-block">
                <h3>Education & Credentials</h3>
                <div className="app-list">
                  {educationData.map((edu) => (
                    <div className="app-list-row" key={edu.id}>
                      <div>
                        <div className="app-list-title">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</div>
                        <div className="app-list-meta">{edu.institution} ({edu.period}) · {edu.scoreType}: {edu.score}</div>
                      </div>
                    </div>
                  ))}
                  <div className="app-list-row">
                    <div>
                      <div className="app-list-title">Certifications</div>
                      <div className="app-list-meta">
                        {certificationsData.map((c) => `${c.title} (${c.issuer})`).join(" · ")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="app-detail-block">
                <h3>Developer philosophy</h3>
                <p>“{profileData.motto}”</p>
              </div>
            </>
          )}

          {section === "journey" && (
            <>
              <div className="app-detail-header">
                <div>
                  <div className="app-kicker">Development journey</div>
                  <h2>Career timeline</h2>
                </div>
                <button className="app-control" onClick={() => openApp("experience")}>
                  Open full timeline
                </button>
              </div>

              <div className="app-timeline" style={{marginTop: 16}}>
                {experienceData.map((item) => (
                  <div className="app-timeline-item is-active" key={item.id}>
                    <div className="app-kicker">{item.period}</div>
                    <h3 style={{margin: "4px 0", fontSize: 14}}>{item.company}</h3>
                    <p className="app-muted">{item.role}</p>
                    <p style={{marginTop: 6}} className="app-muted">{item.summary}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {section === "focus" && (
            <>
              <div className="app-detail-header">
                <div>
                  <div className="app-kicker">Workstation activity</div>
                  <h2>Current focus</h2>
                </div>
              </div>

              <div className="app-list" style={{marginTop: 16}}>
                {[
                  "Full-stack web applications with React, Node.js & Fastify",
                  "Applied AI systems with LLMs, RAG architecture & LangChain",
                  "Linux workstation automation & keyboard-centric workflows (Codex Arch)",
                  "Production API architecture, database migrations & MT5 integration"
                ].map((item, index) => (
                  <div className="app-list-row" key={item}>
                    <div>
                      <div className="app-list-title">{item}</div>
                      <div className="app-list-meta">
                        {index < 2 ? "Production engineering" : "Systems & Applied AI"}
                      </div>
                    </div>
                    <Icon icon={phosphorIcons.arrowRight} width={15}/>
                  </div>
                ))}
              </div>

              <div className="app-detail-block">
                <h3>Technical & Open-Source Interests</h3>
                <div className="app-inline-list">
                  <span>Linux & Window Managers (Qtile)</span>
                  <span>Self-Hosting & Docker</span>
                  <span>Local LLM Inference (Ollama)</span>
                  <span>Vector Databases & Semantic Search</span>
                  <span>Developer Community Workshops</span>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      <div className="app-statusbar">
        <span>profile.md</span>
        <span>A. Kishore · KishoreOS workspace</span>
      </div>
    </div>
  );
}
