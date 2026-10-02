"use client";

import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { APPS_REGISTRY, useWindowManager } from "./WindowManager";

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
const pinned = ["about", "projects", "experience", "skills", "terminal", "files", "resume", "contact", "system-info"];

export function AppLauncher() {
 const { launcherOpen, setLauncherOpen, openApp } = useWindowManager();
 useEffect(() => { const key = (e: KeyboardEvent) => e.key === "Escape" && setLauncherOpen(false); window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [setLauncherOpen]);
 const choose = (id: string) => { openApp(id); setLauncherOpen(false); };
 return <AnimatePresence>{launcherOpen && <motion.div className="launcher-layer" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={() => setLauncherOpen(false)}>
   <motion.section className="app-launcher" initial={{opacity:0, y:14, scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10,scale:.98}} transition={{duration:.16}} onMouseDown={e=>e.stopPropagation()} aria-label="Application launcher">
     <div className="launcher-heading"><span>Applications</span><small>{pinned.length} available</small><button onClick={()=>setLauncherOpen(false)} aria-label="Close launcher"><X size={17}/></button></div>
     <div className="launcher-grid">{pinned.map(id=>{const app=APPS_REGISTRY[id], icon=icons[app.icon]||phosphorIcons.appWindow; return <button key={id} onClick={()=>choose(id)}><span className="launcher-icon"><Icon icon={icon} width={20} height={20}/></span><span>{app.title === "File Explorer" ? "Archive" : app.title}</span></button>})}</div>
     <div className="launcher-recent"><span>RECENT</span><p>Open an application to begin your session.</p></div>
   </motion.section>
 </motion.div>}</AnimatePresence>;
}
