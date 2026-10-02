"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { socialData } from "@/data/social";
import { profileData } from "@/data/profile";
import { playUiClick } from "@/lib/audio";

const glyph = (icon: PhosphorIconData) => function Glyph({ className }: { className?: string }) { return <Icon icon={icon} className={className} />; };
const Mail = glyph(phosphorIcons.envelopeSimple);
const Copy = glyph(phosphorIcons.fileText);
const Check = glyph(phosphorIcons.check);
const ExternalLink = glyph(phosphorIcons.linkSimple);
const Send = glyph(phosphorIcons.arrowRight);
const MessageSquare = glyph(phosphorIcons.appWindow);
const Globe = glyph(phosphorIcons.compass);
const MapPin = glyph(phosphorIcons.mapPin);

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

    const mailtoSubject = encodeURIComponent(subject || `Engineering Inquiry from ${senderName || "Visitor"}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\nTopic: ${topic}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${socialData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 4000);
  };

  return (
    <div className="app-workspace space-y-6 max-w-3xl mx-auto font-sans text-sm text-[#cdd6f4] py-2 px-1 select-text">
      {/* Header */}
      <div className="pb-4 border-b border-[#313244]/40">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#89b4fa]" />
          <h1 className="text-lg sm:text-xl font-bold text-[#cdd6f4]">
            Contact & Communication
          </h1>
        </div>
        <p className="text-xs font-mono text-[#a6adc8] mt-1">
          Available for full-stack engineering roles, technical architecture, and collaboration
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-mono text-[#a6adc8]">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#a6e3a1]" />
            {profileData.location}
          </span>
          <span>•</span>
          <button
            onClick={handleCopyPhone}
            className="hover:text-[#cdd6f4] underline underline-offset-2 flex items-center gap-1"
            title="Click to copy phone number"
          >
            <span>{socialData.phone}</span>
            {copiedPhone && <span className="text-[#a6e3a1] text-[10px]">(Copied)</span>}
          </button>
        </div>
      </div>

      {/* Direct Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Copy Email */}
        <div className="p-3.5 rounded-lg bg-[#181825] border border-[#313244] flex flex-col justify-between space-y-2">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono text-[#6c7086] uppercase tracking-wider font-semibold">
              Email
            </span>
            <div className="text-xs font-mono text-[#cdd6f4] truncate" title={socialData.email}>
              {socialData.email}
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-md bg-[#11111b] hover:bg-[#313244] text-xs font-mono text-[#cdd6f4] transition-colors border border-[#313244]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#a6e3a1]" />
                <span className="text-[#a6e3a1]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#89b4fa]" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* GitHub */}
        <a
          href={socialData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-lg bg-[#181825] border border-[#313244] hover:bg-[#1e1e2e] flex flex-col justify-between space-y-2 group transition-colors"
        >
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono text-[#6c7086] uppercase tracking-wider font-semibold">
              GitHub
            </span>
            <div className="text-xs font-mono text-[#89b4fa] group-hover:underline truncate">
              {socialData.github.replace("https://", "")}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-md bg-[#11111b] group-hover:bg-[#313244] text-xs font-mono text-[#cdd6f4] transition-colors border border-[#313244]">
            <GithubIcon className="w-3.5 h-3.5 text-[#89b4fa]" />
            <span>Open Profile</span>
            <ExternalLink className="w-3 h-3 text-[#6c7086]" />
          </div>
        </a>

        {/* Live Portfolio */}
        <a
          href={socialData.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-lg bg-[#181825] border border-[#313244] hover:bg-[#1e1e2e] flex flex-col justify-between space-y-2 group transition-colors"
        >
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono text-[#6c7086] uppercase tracking-wider font-semibold">
              Live Portfolio
            </span>
            <div className="text-xs font-mono text-[#89b4fa] group-hover:underline truncate">
              {socialData.portfolio.replace("https://", "")}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-md bg-[#11111b] group-hover:bg-[#313244] text-xs font-mono text-[#cdd6f4] transition-colors border border-[#313244]">
            <Globe className="w-3.5 h-3.5 text-[#89b4fa]" />
            <span>Open Website</span>
            <ExternalLink className="w-3 h-3 text-[#6c7086]" />
          </div>
        </a>
      </div>

      {/* Message Composer */}
      <div className="pt-4 border-t border-[#313244]/40 space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#89b4fa]" />
          <h2 className="text-xs font-mono font-semibold text-[#cdd6f4] uppercase tracking-wider">
            Send a Direct Message
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-mono text-[#a6adc8] text-[11px]">Your Name</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Alex Morgan"
                className="os-input w-full px-3 py-2 rounded-md bg-[#181825] border border-[#313244]/60 text-[#cdd6f4] placeholder:text-[#6c7086] focus:outline-none focus:border-[#89b4fa] font-mono text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[#a6adc8] text-[11px]">Your Email</label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="alex@example.com"
                className="os-input w-full px-3 py-2 rounded-md bg-[#181825] border border-[#313244]/60 text-[#cdd6f4] placeholder:text-[#6c7086] focus:outline-none focus:border-[#89b4fa] font-mono text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[#a6adc8] text-[11px]">Subject</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="os-input w-full px-3 py-2 rounded-md font-mono text-xs"
            >
              <option>Job Opportunity</option>
              <option>Project Collaboration</option>
              <option>Full-Stack / AI Systems</option>
              <option>General</option>
            </select>
            <input
              type="text"
              required
              value={subject || topic}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Engineering Inquiry / Collaboration"
              className="os-input w-full px-3 py-2 rounded-md bg-[#181825] border border-[#313244]/60 text-[#cdd6f4] placeholder:text-[#6c7086] focus:outline-none focus:border-[#89b4fa] font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[#a6adc8] text-[11px]">Message</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Kishore, I'd like to discuss an opportunity..."
              className="os-input w-full px-3 py-2 rounded-md bg-[#181825] border border-[#313244]/60 text-[#cdd6f4] placeholder:text-[#6c7086] focus:outline-none focus:border-[#89b4fa] font-sans text-xs resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-3 pt-1">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#89b4fa] hover:bg-[#b4befe] text-[#11111b] font-semibold font-mono text-xs transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>

            {sentNotice && (
              <span className="text-[#a6e3a1] text-xs font-mono break-words">
                Launching email client...
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
