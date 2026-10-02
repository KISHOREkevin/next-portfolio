"use client";
import React, { useEffect } from "react";
import { Window } from "./Window";
import { HomeDashboard } from "./HomeDashboard";
import { Taskbar } from "./Taskbar";
import { AppLauncher } from "./AppLauncher";
import { MobileOrb } from "./MobileOrb";
import { DesktopIcon } from "./DesktopIcon";
import { AmbientBackground } from "./AmbientBackground";
import { useWindowManager } from "./WindowManager";
import { AboutApp } from "@/components/apps/AboutApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { ExperienceApp } from "@/components/apps/ExperienceApp";
import { SkillsApp } from "@/components/apps/SkillsApp";
import { TerminalApp } from "@/components/apps/TerminalApp";
import { FileExplorerApp } from "@/components/apps/FileExplorerApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { ResumeApp } from "@/components/apps/ResumeApp";
import { SystemInfoApp } from "@/components/apps/SystemInfoApp";
import { initSoundPreference } from "@/lib/audio";

const appViews = { about: AboutApp, projects: ProjectsApp, experience: ExperienceApp, skills: SkillsApp, terminal: TerminalApp, files: FileExplorerApp, contact: ContactApp, resume: ResumeApp, "system-info": SystemInfoApp };

export function Desktop() {
  const { isMobile } = useWindowManager();
  useEffect(() => { initSoundPreference(); }, []);
  return <div className="kishore-shell"><AmbientBackground /><main className="desktop-stage">
    <header className="desktop-topbar"><span className="topbar-wordmark">KISHOREOS</span><span className="topbar-path">/ home / kishore</span></header>
    {!isMobile && <aside className="desktop-shortcuts" aria-label="Desktop shortcuts"><DesktopIcon appId="about"/><DesktopIcon appId="projects"/><DesktopIcon appId="experience"/><DesktopIcon appId="terminal"/></aside>}
    <HomeDashboard /><div className="window-layer">{Object.entries(appViews).map(([id, Component]) => <Window key={id} id={id}><Component /></Window>)}</div>
  </main>{!isMobile && <Taskbar />}<MobileOrb /><AppLauncher /></div>;
}
