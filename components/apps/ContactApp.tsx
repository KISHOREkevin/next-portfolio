"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons } from "@/lib/icons/phosphor";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { socialData } from "@/data/social";
import { profileData } from "@/data/profile";
import { playUiClick } from "@/lib/audio";

export function ContactApp() {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sentNotice, setSentNotice] = useState(false);
  const [topic, setTopic] = useState("Job Opportunity");

  const handleCopyEmail = () => {
    playUiClick();
    navigator.clipboard.writeText(socialData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    playUiClick();
    navigator.clipboard.writeText(socialData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playUiClick();

    const mailtoSubject = encodeURIComponent(
      subject || `Engineering Inquiry from ${senderName || "Visitor"}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\nTopic: ${topic}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${socialData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 4000);
  };

  return (
    <div className="app-workspace flex flex-col h-auto md:h-full text-[var(--foreground)]">
      {/* Top Toolbar */}
      <div className="pb-3 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-[var(--accent)]">
            Workspace / Communication
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-[var(--foreground)] m-0 leading-tight">
            Contact & Collaboration
          </h1>
          <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
            Available for full-stack engineering roles, systems architecture, and partnerships
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[var(--foreground-muted)]">
          <span className="flex items-center gap-1 text-[var(--foreground)]">
            <Icon icon={phosphorIcons.mapPin} width={13} className="text-[var(--accent)]" />
            {profileData.location}
          </span>
          <span>·</span>
          <button
            onClick={handleCopyPhone}
            className="hover:text-[var(--foreground)] underline underline-offset-2 cursor-pointer flex items-center gap-1"
            title="Click to copy phone number"
          >
            <span>{socialData.phone}</span>
            {copiedPhone && <span className="text-[var(--accent)] text-[10px]">(Copied)</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:min-h-0 md:overflow-y-auto pt-4 pb-8 space-y-5 max-w-3xl mx-auto w-full">
        {/* Direct Channels Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Email Card */}
          <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)] font-semibold">
                Email
              </span>
              <div
                className="text-xs sm:text-sm font-semibold text-[var(--foreground)] truncate mt-1"
                title={socialData.email}
              >
                {socialData.email}
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors cursor-pointer"
            >
              <Icon
                icon={copied ? phosphorIcons.check : phosphorIcons.fileText}
                width={14}
                className={copied ? "text-[var(--accent)]" : "text-[var(--foreground-muted)]"}
              />
              <span>{copied ? "Copied" : "Copy Email"}</span>
            </button>
          </div>

          {/* GitHub Card */}
          <a
            href={socialData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-strong)] flex flex-col justify-between space-y-3 group transition-all"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)] font-semibold">
                GitHub
              </span>
              <div className="text-xs sm:text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] truncate mt-1">
                {socialData.github.replace("https://", "")}
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md bg-[var(--surface)] group-hover:bg-[var(--surface-hover)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors">
              <GithubIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Open Profile</span>
              <Icon icon={phosphorIcons.linkSimple} width={12} className="text-[var(--foreground-muted)]" />
            </div>
          </a>

          {/* Live Portfolio Card */}
          <a
            href={socialData.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-strong)] flex flex-col justify-between space-y-3 group transition-all"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)] font-semibold">
                Live Portfolio
              </span>
              <div className="text-xs sm:text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] truncate mt-1">
                {socialData.portfolio.replace("https://", "")}
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md bg-[var(--surface)] group-hover:bg-[var(--surface-hover)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors">
              <Icon icon={phosphorIcons.compass} width={14} className="text-[var(--accent)]" />
              <span>Open Website</span>
              <Icon icon={phosphorIcons.linkSimple} width={12} className="text-[var(--foreground-muted)]" />
            </div>
          </a>
        </div>

        {/* Direct Message Form */}
        <div className="p-5 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
            <Icon icon={phosphorIcons.envelopeSimple} width={16} className="text-[var(--accent)]" />
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[var(--foreground)] m-0">
              Send a Direct Message
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-mono text-[var(--foreground-muted)] text-xs font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full h-10 px-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[var(--foreground-muted)] text-xs font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full h-10 px-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[var(--foreground-muted)] text-xs font-medium">
                Topic & Subject
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-10 px-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                >
                  <option>Job Opportunity</option>
                  <option>Project Collaboration</option>
                  <option>Technical Advisory</option>
                  <option>General Inquiry</option>
                </select>
                <input
                  type="text"
                  required
                  value={subject || topic}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Engineering Inquiry / Collaboration"
                  className="sm:col-span-2 h-10 px-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[var(--foreground-muted)] text-xs font-medium">
                Message Content
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Kishore, I'd like to discuss an engineering role / opportunity..."
                className="w-full p-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] font-sans resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[var(--accent)] hover:opacity-95 text-[var(--accent-foreground)] font-semibold text-xs transition-all shadow-sm cursor-pointer"
              >
                <Icon icon={phosphorIcons.envelopeSimple} width={15} />
                <span>Send Message via Email</span>
              </button>

              {sentNotice && (
                <span className="text-xs font-mono text-[var(--accent)] font-semibold animate-pulse">
                  Opening mail client...
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Status Bar */}
      <div className="pt-2 mt-auto border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--foreground-muted)] shrink-0">
        <span>contact.mail</span>
        <span>A. Kishore · Responses typically within 24 hours · KishoreOS</span>
      </div>
    </div>
  );
}
