"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { useWindowManager, APPS_REGISTRY } from "./WindowManager";
import { cn } from "@/lib/utils";

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
      onClick={() => openApp(appId)}
      className={cn(
        "group flex flex-col items-center justify-center py-2 px-1 rounded-md transition-all duration-200 select-none w-20 text-center cursor-pointer",
        "os-shortcut",
        isOpen && "is-running"
      )}
      title={`${app.title} — ${app.description}`}
      aria-label={`Open ${app.title}`}
    >
      <div className="relative flex items-center justify-center mb-1.5 rounded-[10px] border border-white/10 bg-white/5 px-2 py-2 shadow-[0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-white/20 group-hover:bg-white/10">
        <Icon icon={icon} className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
        {isOpen && <span className="shortcut-running" />}
      </div>

      <span className="text-[11px] font-mono leading-tight truncate w-full px-1">
        {app.title}
      </span>
    </button>
  );
}
