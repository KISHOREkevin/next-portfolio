"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AppWindow, Compass, Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { APPS_REGISTRY, useWindowManager } from "./WindowManager";
import { useTheme } from "./ThemeProvider";
import { isSoundEnabled, setSoundEnabled, playUiClick } from "@/lib/audio";

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
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const update = () => {
      const now = new Date();
      setClock(
        new Intl.DateTimeFormat("en", {
          weekday: "short",
          hour: "numeric",
          minute: "2-digit"
        }).format(now)
      );
    };
    update();
    const i = setInterval(update, 30000);
    return () => clearInterval(i);
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playUiClick();
  };

  const running = Object.keys(windows).filter((id) => windows[id].isOpen);

  return (
    <footer className="taskbar" aria-label="KishoreOS taskbar">
      <div className="taskbar-side">
        <button
          className="system-mark"
          onClick={() => {
            playUiClick();
            setLauncherOpen(true);
          }}
          aria-label="Open application launcher"
        >
          <Compass size={18} />
          <span>K</span>
        </button>
        <span className="taskbar-brand">KishoreOS</span>
      </div>

      <nav className="taskbar-apps" aria-label="Open applications">
        <button
          className="taskbar-launch"
          onClick={() => {
            playUiClick();
            setLauncherOpen(true);
          }}
          aria-label="Open application launcher"
          title="App Launcher (Esc to close)"
        >
          <AppWindow size={16} />
        </button>

        {running.map((id) => {
          const meta = APPS_REGISTRY[id];
          if (!meta) return null;
          const icon = icons[meta.icon] || phosphorIcons.appWindow;
          const active = activeAppId === id && !windows[id].isMinimized;

          return (
            <button
              key={id}
              onClick={() => {
                playUiClick();
                openApp(id);
              }}
              className={`taskbar-app ${active ? "is-active" : ""}`}
              style={{ ["--app-accent" as any]: meta.accentColor }}
              aria-label={`Switch to ${meta.title}`}
              title={`${meta.title} — ${meta.description}`}
            >
              <span
                style={{
                  color: active ? meta.accentColor : "inherit",
                  transition: "color 0.2s ease"
                }}
              >
                <Icon icon={icon} width={16} height={16} />
              </span>
              <span>{meta.title === "File Explorer" ? "Archive" : meta.title}</span>
              <i
                style={{
                  background: meta.accentColor,
                  boxShadow: active ? `0 0 8px ${meta.accentColor}` : undefined
                }}
              />
            </button>
          );
        })}
      </nav>

      <div className="taskbar-side taskbar-status">
        <button
          onClick={toggleSound}
          aria-label={soundOn ? "Mute audio" : "Enable sound effects"}
          title={soundOn ? "Sound Effects: ON" : "Sound Effects: OFF"}
        >
          {soundOn ? <Volume2 size={15} className="text-[var(--accent)]" /> : <VolumeX size={15} />}
        </button>

        <button
          onClick={() => {
            playUiClick();
            setPreference(resolvedTheme === "dark" ? "light" : "dark");
          }}
          aria-label="Toggle light and dark theme"
          title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
        >
          {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <div className="flex items-center gap-1.5 pl-1.5 border-l border-[var(--border)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] shadow-[0_0_6px_var(--success)] animate-pulse" />
          <span>{clock}</span>
        </div>
      </div>
    </footer>
  );
}
