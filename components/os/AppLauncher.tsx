"use client";

import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { APPS_REGISTRY, useWindowManager } from "./WindowManager";
import { playUiClick } from "@/lib/audio";

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
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && setLauncherOpen(false);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [setLauncherOpen]);

  const choose = (id: string) => {
    playUiClick();
    openApp(id);
    setLauncherOpen(false);
  };

  return (
    <AnimatePresence>
      {launcherOpen && (
        <motion.div
          className="launcher-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setLauncherOpen(false)}
        >
          <motion.section
            className="app-launcher"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="Application launcher"
          >
            <div className="launcher-heading">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                <span className="font-semibold text-sm tracking-tight text-[var(--foreground)]">Applications</span>
                <small className="text-[var(--foreground-muted)]">({pinned.length} available)</small>
              </div>
              <button
                onClick={() => setLauncherOpen(false)}
                aria-label="Close launcher"
                className="p-1 rounded-md text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            <div className="launcher-grid">
              {pinned.map((id) => {
                const app = APPS_REGISTRY[id];
                if (!app) return null;
                const icon = icons[app.icon] || phosphorIcons.appWindow;
                return (
                  <button
                    key={id}
                    onClick={() => choose(id)}
                    className="group"
                    title={`${app.title} — ${app.description}`}
                  >
                    <span
                      className="launcher-icon transition-all duration-200 group-hover:shadow-[0_0_16px_rgba(0,0,0,0.4)]"
                      style={{
                        borderColor: `${app.accentColor}33`,
                        background: `${app.accentColor}12`,
                        color: app.accentColor
                      }}
                    >
                      <Icon
                        icon={icon}
                        width={22}
                        height={22}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                    </span>
                    <span className="truncate w-full text-center group-hover:text-[var(--foreground)]">
                      {app.title === "File Explorer" ? "Archive" : app.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="launcher-recent flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[var(--accent)] font-bold">KISHOREOS RUNTIME</span>
                <p className="m-0 text-xs text-[var(--foreground-muted)]">Select an application or press Esc to return to desktop.</p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[var(--foreground-muted)]">
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-elevated)]">Esc</kbd>
                <span>to close</span>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
