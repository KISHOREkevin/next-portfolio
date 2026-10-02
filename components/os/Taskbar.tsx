"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AppWindow, Compass, Search, Signal, Sun, Moon } from "lucide-react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { APPS_REGISTRY, useWindowManager } from "./WindowManager";
import { useTheme } from "./ThemeProvider";

const icons: Record<string, PhosphorIconData> = {
  User: phosphorIcons.userCircle,
  FolderKanban: phosphorIcons.folderOpen,
  Briefcase: phosphorIcons.briefcase,
  Cpu: phosphorIcons.gearSix,
  Terminal: phosphorIcons.terminalWindow,
  FolderTree: phosphorIcons.folderOpen,
  Mail: phosphorIcons.envelopeSimple,
  FileText: phosphorIcons.fileText,
  Info: phosphorIcons.info
};

export function Taskbar() {
  const { windows, activeAppId, openApp, setLauncherOpen } = useWindowManager();
  const { resolvedTheme, setPreference } = useTheme();
  const [clock, setClock] = useState("");
  useEffect(() => { const update = () => setClock(new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date())); update(); const i = setInterval(update, 30000); return () => clearInterval(i); }, []);
  const running = Object.keys(windows).filter((id) => windows[id].isOpen);
  return <footer className="taskbar" aria-label="KishoreOS taskbar">
    <div className="taskbar-side"><button className="system-mark" onClick={() => setLauncherOpen(true)} aria-label="Open application launcher"><Compass size={18}/><span>K</span></button><span className="taskbar-brand">KishoreOS</span></div>
    <nav className="taskbar-apps" aria-label="Open applications">
      <button className="taskbar-launch" onClick={() => setLauncherOpen(true)} aria-label="Open application launcher"><AppWindow size={17}/></button>
      {running.map((id) => { const meta = APPS_REGISTRY[id]; const icon = icons[meta.icon] || phosphorIcons.appWindow; const active = activeAppId === id && !windows[id].isMinimized; return <button key={id} onClick={() => openApp(id)} className={`taskbar-app ${active ? "is-active" : ""}`} aria-label={`Switch to ${meta.title}`}><Icon icon={icon} width={17} height={17}/><span>{meta.title}</span><i /></button>; })}
    </nav>
    <div className="taskbar-side taskbar-status"><button onClick={() => setPreference(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Toggle light and dark theme">{resolvedTheme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}</button><button onClick={() => setLauncherOpen(true)} aria-label="Open applications"><Search size={16}/></button><Signal size={15}/><span>{clock}</span></div>
  </footer>;
}
