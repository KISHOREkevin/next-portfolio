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

const glyph = (icon: PhosphorIconData) => function Glyph({ className }: { className?: string }) { return <Icon icon={icon} className={className} />; };
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

  const handlePrint = () => {
    playUiClick();
    window.print();
  };

  return (
    <div className="app-workspace space-y-6 max-w-4xl mx-auto font-sans text-sm text-[#cdd6f4] pb-6 select-text">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-[#181825] border border-[#313244] shadow-sm">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-[#89b4fa]" />
          <div>
            <h1 className="text-sm sm:text-base font-bold text-[#cdd6f4]">
              Curriculum Vitae / Resume
            </h1>
            <span className="text-xs font-mono text-[#a6adc8]">
              {profileData.name} — {profileData.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((value) => Math.max(75, value - 10))} className="app-control" aria-label="Zoom out">−</button>
          <span className="font-mono text-xs text-[#a6adc8] min-w-[42px] text-center">{zoom}%</span>
          <button onClick={() => setZoom((value) => Math.min(140, value + 10))} className="app-control" aria-label="Zoom in">+</button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#11111b] hover:bg-[#313244] text-xs font-mono text-[#cdd6f4] border border-[#313244] transition-colors"
            title="Print or save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#89b4fa]" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#89b4fa] hover:bg-[#b4befe] text-[#11111b] text-xs font-mono font-semibold transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {downloadAlert && (
        <div className="flex items-center gap-2 p-3 rounded-md bg-[#181825] border border-[#89b4fa]/40 text-xs font-mono text-[#89b4fa]">
          <Info className="w-4 h-4 shrink-0" />
          <span>
            Resume download triggered from <code className="text-[#cdd6f4]">/resume.pdf</code>.
          </span>
        </div>
      )}

      {/* Formatted Resume Paper Container */}
      <div
        className="p-6 sm:p-10 rounded-lg bg-[#181825] border border-[#313244] shadow-sm space-y-7 text-[#cdd6f4] print:bg-white print:text-black print:p-0 print:border-none print:shadow-none"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: "top center",
          marginBottom: `${(zoom - 100) * 3}px`
        }}
      >
        {/* Header */}
        <div className="border-b border-[#313244] pb-5 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#cdd6f4] tracking-tight">
            {profileData.name}
          </h2>
          <div className="text-sm font-mono text-[#cba6f7] font-semibold">
            {profileData.title} & AI Systems Engineer
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#a6adc8] font-mono pt-1">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#89b4fa]" />
              {socialData.email}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#a6e3a1]" />
              {profileData.location}
            </span>
            <span>•</span>
            <a
              href={socialData.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#89b4fa] hover:underline"
            >
              {socialData.github.replace("https://", "")}
            </a>
            <span>•</span>
            <a
              href={socialData.portfolio}
              target="_blank"
              rel="noreferrer"
              className="text-[#89b4fa] hover:underline"
            >
              {socialData.portfolio.replace("https://", "")}
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89b4fa] border-b border-[#313244] pb-1">
            Professional Summary
          </h3>
          <p className="text-xs sm:text-sm text-[#bac2de] leading-relaxed">
            Full Stack Developer with production experience engineering resilient web applications, scalable backend microservices, and Applied AI systems. Hands-on expertise building production client solutions with React.js, Node.js, Fastify, Sequelize, and PostgreSQL, MT5/MetaTrader trading workflows, MERN platforms, and local LLM/RAG pipelines using LangChain, Ollama, and vector databases. Founder of Codex Arch (custom minimal Linux OS) and active community educator.
          </p>
        </div>

        {/* Professional Experience */}
        <div className="space-y-5">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89b4fa] border-b border-[#313244] pb-1">
            Work Experience
          </h3>

          <div className="space-y-5">
            {experienceData.map((exp) => (
              <div key={`resume-${exp.id}`} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="font-bold text-sm text-[#cdd6f4]">{exp.role}</span>
                    <span className="text-[#a6adc8] text-xs sm:text-sm"> — {exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-[#6c7086]">{exp.period}</span>
                </div>

                <p className="text-xs text-[#bac2de] leading-relaxed">
                  {exp.summary}
                </p>

                <ul className="space-y-1.5 text-xs text-[#bac2de] pl-4 list-disc">
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
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#11111b] border border-[#313244] text-[#a6adc8]"
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
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89b4fa] border-b border-[#313244] pb-1">
            Featured Projects
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projectsData.map((proj) => (
              <div
                key={`resume-proj-${proj.id}`}
                className="p-3.5 rounded-md bg-[#11111b] border border-[#313244] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#cdd6f4]">{proj.title}</span>
                  <span className="text-[10px] font-mono text-[#89b4fa]">{proj.badge}</span>
                </div>
                <p className="text-xs text-[#bac2de] leading-relaxed">
                  {proj.shortDescription}
                </p>
                <div className="text-[10px] font-mono text-[#6c7086] truncate">
                  {proj.technologies.join(" • ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89b4fa] border-b border-[#313244] pb-1">
            Education
          </h3>

          <div className="space-y-3">
            {educationData.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                <div>
                  <span className="font-bold text-[#cdd6f4]">{edu.degree}</span>
                  {edu.field && <span className="text-[#bac2de]"> in {edu.field}</span>}
                  <div className="text-[#a6adc8]">{edu.institution}</div>
                </div>
                <div className="text-right sm:text-right font-mono text-xs">
                  <span className="text-[#a6e3a1] font-semibold">{edu.scoreType}: {edu.score}</span>
                  <div className="text-[#6c7086] text-[11px]">{edu.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89b4fa] border-b border-[#313244] pb-1">
            Certifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="p-2.5 rounded bg-[#11111b] border border-[#313244] flex flex-col justify-between"
              >
                <span className="font-semibold text-xs text-[#cdd6f4]">{cert.title}</span>
                <span className="text-[11px] font-mono text-[#89b4fa] mt-1">{cert.issuer}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Overview */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89b4fa] border-b border-[#313244] pb-1">
            Technical Competencies
          </h3>

          <div className="space-y-2 text-xs">
            {skillsData.map((cat) => (
              <div key={`resume-skill-${cat.id}`} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="font-mono font-semibold text-[#cdd6f4] sm:w-44 shrink-0">
                  {cat.name}:
                </span>
                <span className="text-[#a6adc8]">
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
