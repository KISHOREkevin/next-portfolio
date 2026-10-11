"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { profileData } from "@/data/profile";
import { experienceData } from "@/data/experience";
import { skillsData } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { educationData } from "@/data/education";
import { certificationsData } from "@/data/certifications";
import { socialData } from "@/data/social";
import { playUiClick } from "@/lib/audio";

const glyph = (icon: PhosphorIconData) =>
  function Glyph({ className }: { className?: string }) {
    return <Icon icon={icon} className={className} />;
  };

const FileText = glyph(phosphorIcons.fileText);
const Download = glyph(phosphorIcons.arrowRight);
const Printer = glyph(phosphorIcons.fileText);
const Mail = glyph(phosphorIcons.envelopeSimple);
const MapPin = glyph(phosphorIcons.mapPin);
const Info = glyph(phosphorIcons.info);

export function ResumeApp() {
  const [downloadAlert, setDownloadAlert] = useState(false);
  const [zoom, setZoom] = useState(100);

  const handleDownload = () => {
    playUiClick();
    const link = document.createElement("a");
    link.href = socialData.resumePath;
    link.download = "A_Kishore_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadAlert(true);
    setTimeout(() => setDownloadAlert(false), 5000);
  };



  return (
    <div className="app-workspace space-y-4 max-w-4xl mx-auto font-sans text-sm text-[var(--foreground)] pb-6 select-text">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] shadow-sm shrink-0">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-[var(--accent)]" />
          <div>
            <h1 className="text-sm sm:text-base font-bold text-[var(--foreground)] m-0 leading-tight">
               Resume
            </h1>
            <span className="text-xs font-mono text-[var(--foreground-muted)]">
              {profileData.name} — {profileData.title}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => setZoom((value) => Math.max(80, value - 10))}
              className="px-2 py-1 rounded bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer"
              aria-label="Zoom out"
            >
              −
            </button>
            <span className="font-mono text-xs text-[var(--foreground-muted)] min-w-[38px] text-center">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom((value) => Math.min(130, value + 10))}
              className="px-2 py-1 rounded bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer"
              aria-label="Zoom in"
            >
              +
            </button>
          </div>

         

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-mono font-semibold transition-all shadow-sm hover:opacity-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {downloadAlert && (
        <div className="flex items-center gap-2 p-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--accent)] text-xs font-mono text-[var(--accent)]">
          <Info className="w-4 h-4 shrink-0" />
          <span>
            Resume download triggered from{" "}
            <code className="text-[var(--foreground)] font-bold">/resume.pdf</code>.
          </span>
        </div>
      )}

      {/* Formatted Resume Paper Container */}
      <div
        className="p-5 sm:p-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-6 text-[var(--foreground)] print:bg-white print:text-black print:p-0 print:border-none print:shadow-none transition-transform"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: "top center",
          marginBottom: `${(zoom - 100) * 3}px`,
        }}
      >
        {/* Header */}
        <div className="border-b border-[var(--border)] pb-4 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight m-0">
            {profileData.name}
          </h2>
          <div className="text-sm font-mono text-[var(--accent)] font-semibold">
            {profileData.title} & AI Systems Engineer
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--foreground-muted)] font-mono pt-1">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
              {socialData.email}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
              {profileData.location}
            </span>
            <span>•</span>
            <a
              href={socialData.github}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              {socialData.github.replace("https://", "")}
            </a>
            <span>•</span>
            <a
              href={socialData.portfolio}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              {socialData.portfolio.replace("https://", "")}
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1 m-0">
            Professional Summary
          </h3>
          <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed m-0">
            Full Stack Developer with production experience engineering resilient web applications,
            scalable backend microservices, and Applied AI systems. Hands-on expertise building
            production client solutions with React.js, Node.js, Fastify, Sequelize, and PostgreSQL,
            MT5/MetaTrader trading workflows, MERN platforms, and local LLM/RAG pipelines using
            LangChain, Ollama, and vector databases. Founder of Codex Arch (custom minimal Linux OS)
            and active community educator.
          </p>
        </div>

        {/* Professional Experience */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1 m-0">
            Work Experience
          </h3>

          <div className="space-y-4">
            {experienceData.map((exp) => (
              <div
                key={`resume-${exp.id}`}
                className="p-3.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="font-bold text-sm text-[var(--foreground)]">{exp.role}</span>
                    <span className="text-[var(--foreground-muted)] text-xs sm:text-sm">
                      {" "}
                      — {exp.company}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--accent)] font-semibold">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed m-0">
                  {exp.summary}
                </p>

                <ul className="space-y-1 text-xs text-[var(--foreground-muted)] pl-4 list-disc">
                  {exp.highlights.map((h, i) => (
                    <li key={`rh-${exp.id}-${i}`} className="leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="pt-1 flex flex-wrap gap-1">
                  {exp.technologies.map((t) => (
                    <span
                      key={`rt-${exp.id}-${t}`}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Projects */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1 m-0">
            Featured Projects
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projectsData.map((proj) => (
              <div
                key={`resume-proj-${proj.id}`}
                className="p-3.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[var(--foreground)]">{proj.title}</span>
                  <span className="text-[10px] font-mono text-[var(--accent)]">{proj.badge}</span>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed m-0">
                  {proj.shortDescription}
                </p>
                <div className="text-[10px] font-mono text-[var(--foreground)] truncate pt-1 border-t border-[var(--border)]/50">
                  {proj.technologies.join(" • ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1 m-0">
            Education
          </h3>

          <div className="space-y-2">
            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="p-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs"
              >
                <div>
                  <span className="font-bold text-[var(--foreground)]">{edu.degree}</span>
                  {edu.field && (
                    <span className="text-[var(--foreground-muted)]"> in {edu.field}</span>
                  )}
                  <div className="text-[var(--foreground-muted)] mt-0.5">{edu.institution}</div>
                </div>
                <div className="font-mono text-xs sm:text-right">
                  <span className="text-[var(--accent)] font-semibold">
                    {edu.scoreType}: {edu.score}
                  </span>
                  <div className="text-[var(--foreground-muted)] text-[11px]">{edu.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1 m-0">
            Certifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="p-2.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col justify-between"
              >
                <span className="font-semibold text-xs text-[var(--foreground)]">{cert.title}</span>
                <span className="text-[11px] font-mono text-[var(--accent)] mt-1">{cert.issuer}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Overview */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1 m-0">
            Technical Competencies
          </h3>

          <div className="space-y-2 text-xs">
            {skillsData.map((cat) => (
              <div
                key={`resume-skill-${cat.id}`}
                className="p-2.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-baseline gap-1"
              >
                <span className="font-mono font-semibold text-[var(--foreground)] sm:w-48 shrink-0">
                  {cat.name}:
                </span>
                <span className="text-[var(--foreground-muted)]">
                  {cat.skills.map((s) => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
