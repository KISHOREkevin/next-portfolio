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
const Printer = glyph(phosphorIcons.printer);
const Mail = glyph(phosphorIcons.envelopeSimple);
const Phone = glyph(phosphorIcons.phone);
const MapPin = glyph(phosphorIcons.mapPin);
const Info = glyph(phosphorIcons.info);
const LinkedIn = glyph(phosphorIcons.linkedinLogo);
const ExternalLink = glyph(phosphorIcons.arrowSquareOut);

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

  const handlePrint = () => {
    playUiClick();
    window.print();
  };

  return (
    <div className="app-workspace font-sans text-sm text-[var(--foreground)] select-text">
      {/* App Toolbar — functional controls */}
      <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)] shrink-0 min-w-0">
        <span className="text-[11px] font-mono text-[var(--foreground-muted)] flex items-center gap-1.5 shrink-0">
          <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
          ATS-Optimized PDF
        </span>
        <div className="flex-1" />
        {/* Zoom controls — desktop only */}
        <div className="hidden sm:flex items-center gap-1 shrink-0">
          <button
            onClick={() => setZoom((value) => Math.max(80, value - 10))}
            className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="font-mono text-[10px] text-[var(--foreground-muted)] min-w-[32px] text-center">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom((value) => Math.min(130, value + 10))}
            className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>

        {/* Print / Save as PDF */}
        <button
          onClick={handlePrint}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)] text-xs font-mono font-medium transition-all cursor-pointer shrink-0"
          title="Print or Save as PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print</span>
        </button>

        {/* Download PDF */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-mono font-semibold transition-all shadow-sm hover:opacity-95 cursor-pointer shrink-0"
        >
          <Download className="w-3 h-3" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pb-8">
        <div className="max-w-4xl mx-auto space-y-4 pt-3">
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
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight m-0">
                    {profileData.name}
                  </h2>
                  <div className="text-sm font-mono text-[var(--accent)] font-semibold mt-0.5">
                    {profileData.title} & AI Systems Engineer
                  </div>
                </div>
                <div className="text-xs font-mono text-[var(--foreground-muted)] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              {/* Contact Information Bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[var(--foreground-muted)] font-mono pt-2 border-t border-[var(--border)]/40">
                <a
                  href={`tel:${socialData.phone.replace(/[\s-]/g, "")}`}
                  className="flex items-center gap-1 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{socialData.phone}</span>
                </a>
                <span>•</span>
                <a
                  href={`mailto:${socialData.email}`}
                  className="flex items-center gap-1 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{socialData.email}</span>
                </a>
                <span>•</span>
                <a
                  href={socialData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent)] hover:underline flex items-center gap-1"
                >
                  <span>{socialData.github.replace("https://", "")}</span>
                </a>
                <span>•</span>
                <a
                  href={socialData.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent)] hover:underline flex items-center gap-1"
                >
                  <span>{socialData.portfolio.replace("https://", "").replace(/\/$/, "")}</span>
                </a>
                <span>•</span>
                <a
                  href={socialData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--foreground-muted)] hover:text-[var(--accent)] flex items-center gap-1 transition-colors"
                >
                  <LinkedIn className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1 m-0">
                Professional Summary
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed m-0">
                Full Stack Developer &amp; AI Systems Engineer with production experience designing and
                deploying high-reliability web applications, scalable backend microservices, financial
                trading platform integrations, and Applied AI systems. Hands-on expertise building production
                client solutions with <strong>React.js, Node.js, Fastify, Python, FastAPI, Django, Sequelize,
                PostgreSQL, and MongoDB</strong>. Production background engineering cryptocurrency deposit and
                withdrawal workflows with blockchain wallet integrations (<strong>Ethers.js, Alchemy</strong>),
                MetaTrader 5 (<strong>MT5</strong>) copy-trading platforms, high-security multi-vendor authenticated
                APIs, and local LLM / Retrieval-Augmented Generation (<strong>RAG</strong>) pipelines using{" "}
                <strong>LangChain, Ollama, and vector databases</strong>. Founder of Codex Arch (custom minimal
                Linux OS) with proven expertise in Linux server administration, workflow automation, and cloud deployments.
              </p>
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
                    <span className="text-[var(--foreground-muted)] leading-relaxed">
                      {cat.skills.map((s) => s.name).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
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
                        {exp.period} | {exp.location}
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

            {/* Key Technical Projects */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1 m-0">
                Featured Technical Projects
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectsData.map((proj) => (
                  <div
                    key={`resume-proj-${proj.id}`}
                    className="p-3.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs text-[var(--foreground)]">
                          {proj.title}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--accent)] shrink-0 px-1.5 py-0.5 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                          {proj.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--foreground-muted)] leading-relaxed m-0 mt-1.5">
                        {proj.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[var(--border)]/50">
                      <div className="text-[10px] font-mono text-[var(--foreground)]">
                        {proj.technologies.slice(0, 6).join(" • ")}
                        {proj.technologies.length > 6 ? ` • +${proj.technologies.length - 6}` : ""}
                      </div>

                      {(proj.liveUrl || proj.githubUrl) && (
                        <div className="flex items-center gap-2 pt-1 text-[11px] font-mono">
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                            >
                              <span>Live Preview</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[var(--foreground-muted)] hover:text-[var(--accent)] inline-flex items-center gap-1"
                            >
                              <span>Source Code</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
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
                      {edu.details && (
                        <div className="text-[11px] text-[var(--foreground-muted)] mt-1">
                          {edu.details.join(" ")}
                        </div>
                      )}
                    </div>
                    <div className="font-mono text-xs sm:text-right shrink-0">
                      <span className="text-[var(--accent)] font-semibold">
                        {edu.scoreType}: {edu.score}
                      </span>
                      <div className="text-[var(--foreground-muted)] text-[11px]">{edu.period}</div>
                      {edu.location && (
                        <div className="text-[10px] text-[var(--foreground-muted)]">{edu.location}</div>
                      )}
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
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="pt-2 mt-auto border-t border-[var(--border)] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--foreground-muted)] shrink-0 gap-2 pb-1">
        <span className="truncate">resume.pdf</span>
        <span className="truncate text-right">
          <span className="hidden sm:inline">
            A. Kishore · Full Stack &amp; AI Systems Engineer · Updated October 2026
          </span>
          <span className="sm:hidden">ATS-Optimized PDF</span>
        </span>
      </div>
    </div>
  );
}
