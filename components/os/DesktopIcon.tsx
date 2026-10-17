"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { useWindowManager, APPS_REGISTRY } from "./WindowManager";
import { cn } from "@/lib/utils";
import { playUiClick } from "@/lib/audio";

const ICON_COMPONENTS: Record<string, PhosphorIconData> = {
  User: phosphorIcons.userCircle,
  FolderKanban: phosphorIcons.folderOpen,
  Briefcase: phosphorIcons.briefcase,
  Cpu: phosphorIcons.gearSix,
  Terminal: phosphorIcons.terminalWindow,
  FolderTree: phosphorIcons.folderOpen,
  Mail: phosphorIcons.envelopeSimple,
  FileText: phosphorIcons.fileText,
  Info: phosphorIcons.info,
  LayoutGrid: phosphorIcons.squaresFour
};

interface DesktopIconProps {
  appId: string;
}

export function DesktopIcon({ appId }: DesktopIconProps) {
  const { openApp, windows } = useWindowManager();
  const app = APPS_REGISTRY[appId];

  if (!app) return null;

  const icon = ICON_COMPONENTS[app.icon] || phosphorIcons.squaresFour;
  const isOpen = windows[appId]?.isOpen;

  return (
    <button
      onClick={() => {
        playUiClick();
        openApp(appId);
      }}
      className={cn(
        "group flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 select-none w-20 text-center cursor-pointer",
        "os-shortcut",
        isOpen && "is-running"
      )}
      style={{ ["--app-accent" as any]: app.accentColor }}
      title={`${app.title} — ${app.description}`}
      aria-label={`Open ${app.title}`}
    >
      <div
        className="relative flex items-center justify-center mb-1.5 w-11 h-11 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-white/10"
        style={{
          boxShadow: isOpen ? `0 0 14px ${app.accentColor}33` : undefined,
          borderColor: isOpen ? `${app.accentColor}55` : undefined
        }}
      >
        <span
          style={{ color: app.accentColor }}
          className="transition-transform duration-200 group-hover:scale-115 flex items-center justify-center"
        >
          <Icon icon={icon} className="w-5 h-5" />
        </span>
        {isOpen && (
          <span
            className="shortcut-running absolute -bottom-1"
            style={{
              background: app.accentColor,
              boxShadow: `0 0 6px ${app.accentColor}`
            }}
          />
        )}
      </div>

      <span className="text-[11px] font-mono leading-tight truncate w-full px-1 text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
        {app.title === "File Explorer" ? "Archive" : app.title}
      </span>
    </button>
  );
}
