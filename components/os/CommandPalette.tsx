"use client";

import React, { useEffect } from "react";
import { Command } from "cmdk";
import { Icon } from "@iconify/react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { useWindowManager } from "./WindowManager";
import { socialData } from "@/data/social";
import { playUiClick } from "@/lib/audio";

const glyph = (icon: PhosphorIconData) => function Glyph({ className }: { className?: string }) {
  return <Icon icon={icon} className={className} />;
};
const User = glyph(phosphorIcons.userCircle);
const FolderKanban = glyph(phosphorIcons.folderOpen);
const Briefcase = glyph(phosphorIcons.briefcase);
const Cpu = glyph(phosphorIcons.gearSix);
const Terminal = glyph(phosphorIcons.terminalWindow);
const FolderTree = glyph(phosphorIcons.folderOpen);
const Mail = glyph(phosphorIcons.envelopeSimple);
const FileText = glyph(phosphorIcons.fileText);
const Info = glyph(phosphorIcons.info);
const ExternalLink = glyph(phosphorIcons.linkSimple);
const Volume2 = glyph(phosphorIcons.sun);
const VolumeX = glyph(phosphorIcons.moon);
const X = glyph(phosphorIcons.x);

export function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    openApp,
    soundEnabled,
    toggleSound
  } = useWindowManager();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const handleSelectApp = (appId: string) => {
    playUiClick();
    setCommandPaletteOpen(false);
    openApp(appId);
  };

  const handleExternalLink = (url: string) => {
    playUiClick();
    setCommandPaletteOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#11111b]/70 backdrop-blur-sm flex items-start justify-center pt-[14vh] px-4"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-[#181825] border border-[#313244] rounded-[8px] shadow-2xl overflow-hidden animate-in fade-in duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="flex flex-col w-full font-mono text-xs">
          {/* Header / Input */}
          <div className="flex items-center px-3.5 py-1 border-b border-[#313244] bg-[#1e1e2e]/50">
            <span className="text-[#cba6f7] font-bold mr-2 text-sm select-none">$</span>
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="w-full py-2.5 bg-transparent text-[#cdd6f4] placeholder:text-[#6c7086] text-xs focus:outline-none"
            />
            <button
              onClick={() => setCommandPaletteOpen(false)}
              className="p-1 rounded text-[#a6adc8] hover:text-[#cdd6f4] bg-[#313244] transition-colors"
              aria-label="Close"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Results List */}
          <Command.List className="max-h-[300px] overflow-y-auto p-1.5 space-y-0.5">
            <Command.Empty className="py-6 text-center text-[#6c7086] text-xs">
              No matching commands.
            </Command.Empty>

            {/* Applications Group */}
            <Command.Group heading="Applications" className="text-[#6c7086] font-semibold px-2 py-1 text-[10px] tracking-wider uppercase">
              <Command.Item
                onSelect={() => handleSelectApp("about")}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#cba6f7]" />
                  <span>About Me</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">Overview</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelectApp("projects")}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-3.5 h-3.5 text-[#89b4fa]" />
                  <span>Projects</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">Repositories</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelectApp("experience")}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-[#fab387]" />
                  <span>Experience</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">Work History</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelectApp("skills")}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#94e2d5]" />
                  <span>Skills</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">Arsenal</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelectApp("terminal")}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#a6e3a1]" />
                  <span>Terminal</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">Shell</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelectApp("files")}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FolderTree className="w-3.5 h-3.5 text-[#f9e2af]" />
                  <span>File Manager</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">/home/kishore</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelectApp("contact")}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#f5c2e7]" />
                  <span>Contact</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">Mail & Msg</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelectApp("resume")}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#f38ba8]" />
                  <span>Resume</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">Curriculum Vitae</span>
              </Command.Item>
            </Command.Group>

            {/* Quick Actions */}
            <Command.Group heading="Tools & System" className="text-[#6c7086] font-semibold px-2 py-1 text-[10px] tracking-wider uppercase pt-1">
              <Command.Item
                onSelect={() => handleSelectApp("system-info")}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-[#89b4fa]" />
                  <span>System Info</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">Neofetch</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  toggleSound();
                  setCommandPaletteOpen(false);
                }}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  {soundEnabled ? (
                    <VolumeX className="w-3.5 h-3.5 text-[#6c7086]" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-[#cba6f7]" />
                  )}
                  <span>Toggle Audio Feedback</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">{soundEnabled ? "Mute" : "Enable"}</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleExternalLink(socialData.github)}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#6c7086]" />
                  <span>GitHub Profile</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">External</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleExternalLink(socialData.linkedin)}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-[#cdd6f4] hover:bg-[#313244] cursor-pointer aria-selected:bg-[#313244] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#6c7086]" />
                  <span>LinkedIn Profile</span>
                </div>
                <span className="text-[10px] text-[#6c7086]">External</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Hints */}
          <div className="px-3.5 py-2 bg-[#11111b] border-t border-[#313244] flex items-center justify-between text-[10px] text-[#6c7086] select-none">
            <span>Navigate: <kbd className="text-[#cdd6f4] px-1 bg-[#313244] rounded">↑↓</kbd> Select: <kbd className="text-[#cdd6f4] px-1 bg-[#313244] rounded">↵</kbd></span>
            <span>Exit: <kbd className="text-[#cdd6f4] px-1 bg-[#313244] rounded">Esc</kbd></span>
          </div>
        </Command>
      </div>
    </div>
  );
}
