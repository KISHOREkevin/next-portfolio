"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { playUiClick, playWindowOpen, isSoundEnabled, setSoundEnabled } from "@/lib/audio";

export interface AppMetadata {
  id: string;
  title: string;
  icon: string;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  description: string;
  dockItem?: boolean;
  desktopItem?: boolean;
}

export const APPS_REGISTRY: Record<string, AppMetadata> = {
  about: {
    id: "about",
    title: "About Me",
    icon: "User",
    defaultWidth: 720,
    defaultHeight: 580,
    defaultX: 60,
    defaultY: 50,
    description: "Background, career trajectory & developer profile",
    dockItem: true,
    desktopItem: true
  },
  projects: {
    id: "projects",
    title: "Projects",
    icon: "FolderKanban",
    defaultWidth: 880,
    defaultHeight: 640,
    defaultX: 120,
    defaultY: 60,
    description: "AI, Full-Stack, and Systems projects",
    dockItem: true,
    desktopItem: true
  },
  experience: {
    id: "experience",
    title: "Experience",
    icon: "Briefcase",
    defaultWidth: 780,
    defaultHeight: 600,
    defaultX: 160,
    defaultY: 70,
    description: "Production roles at Wealwin, Hashcodex, Shrika & more",
    dockItem: true,
    desktopItem: true
  },
  skills: {
    id: "skills",
    title: "Skills",
    icon: "Cpu",
    defaultWidth: 760,
    defaultHeight: 560,
    defaultX: 200,
    defaultY: 80,
    description: "Categorized technologies, tools & AI expertise",
    dockItem: true,
    desktopItem: true
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    icon: "Terminal",
    defaultWidth: 680,
    defaultHeight: 460,
    defaultX: 100,
    defaultY: 100,
    description: "Interactive zsh / developer command-line",
    dockItem: true,
    desktopItem: true
  },
  files: {
    id: "files",
    title: "File Explorer",
    icon: "FolderTree",
    defaultWidth: 750,
    defaultHeight: 520,
    defaultX: 140,
    defaultY: 90,
    description: "Virtual filesystem /home/kishore",
    dockItem: true,
    desktopItem: true
  },
  contact: {
    id: "contact",
    title: "Contact",
    icon: "Mail",
    defaultWidth: 620,
    defaultHeight: 500,
    defaultX: 220,
    defaultY: 110,
    description: "Get in touch & direct communications",
    dockItem: true,
    desktopItem: true
  },
  resume: {
    id: "resume",
    title: "Resume",
    icon: "FileText",
    defaultWidth: 740,
    defaultHeight: 650,
    defaultX: 180,
    defaultY: 55,
    description: "Recruiter-friendly summary and PDF download",
    dockItem: true,
    desktopItem: true
  },
  "system-info": {
    id: "system-info",
    title: "System Info",
    icon: "Info",
    defaultWidth: 640,
    defaultHeight: 480,
    defaultX: 240,
    defaultY: 120,
    description: "KishoreOS system specs and architecture details",
    dockItem: false,
    desktopItem: true
  }
};

export interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowContextType {
  windows: Record<string, WindowState>;
  activeAppId: string | null;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  toggleMaximizeApp: (id: string) => void;
  focusApp: (id: string) => void;
  isMobile: boolean;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  launcherOpen: boolean;
  setLauncherOpen: (open: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<string, WindowState>>(() => {
    // Initial state: About is open by default on desktop, closed on mobile until booted
    const initial: Record<string, WindowState> = {};
    Object.keys(APPS_REGISTRY).forEach((id) => {
      initial[id] = {
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 10
      };
    });
    return initial;
  });

  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const topZIndexRef = React.useRef(20);
  const [isMobile, setIsMobile] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [sound, setSound] = useState(() => isSoundEnabled());

  // Check viewport on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSound = useCallback(() => {
    const next = !sound;
    setSound(next);
    setSoundEnabled(next);
    if (next) {
      playUiClick();
    }
  }, [sound]);

  const focusApp = useCallback(
    (id: string) => {
      topZIndexRef.current += 1;
      const nextZ = topZIndexRef.current;
      setWindows((winPrev) => ({
        ...winPrev,
        [id]: {
          ...winPrev[id],
          zIndex: nextZ,
          isMinimized: false
        }
      }));
      setActiveAppId(id);
    },
    []
  );

  const openApp = useCallback(
    (id: string) => {
      if (!APPS_REGISTRY[id]) return;
      playWindowOpen();
      topZIndexRef.current += 1;
      const nextZ = topZIndexRef.current;
      setWindows((winPrev) => ({
        ...winPrev,
        [id]: {
          isOpen: true,
          isMinimized: false,
          isMaximized: isMobile ? true : winPrev[id]?.isMaximized || false,
          zIndex: nextZ
        }
      }));
      setActiveAppId(id);
    },
    [isMobile]
  );

  const closeApp = useCallback((id: string) => {
    playUiClick();
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false
      }
    }));
    setActiveAppId((curr) => (curr === id ? null : curr));
  }, []);

  const minimizeApp = useCallback((id: string) => {
    playUiClick();
    setWindows((prev) => {
      const isCurrentlyMin = prev[id]?.isMinimized;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: !isCurrentlyMin
        }
      };
    });
    setActiveAppId((curr) => (curr === id ? null : curr));
  }, []);

  const toggleMaximizeApp = useCallback((id: string) => {
    playUiClick();
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id]?.isMaximized
      }
    }));
  }, []);

  // Global keyboard shortcuts (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
        playUiClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeAppId,
        openApp,
        closeApp,
        minimizeApp,
        toggleMaximizeApp,
        focusApp,
        isMobile,
        commandPaletteOpen,
        setCommandPaletteOpen,
        launcherOpen,
        setLauncherOpen,
        soundEnabled: sound,
        toggleSound
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowManager must be used within a WindowProvider");
  }
  return context;
}
