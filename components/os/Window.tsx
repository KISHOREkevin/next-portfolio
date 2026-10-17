"use client";
import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, useDragControls, useMotionValue } from "framer-motion";
import { X, Minus, Maximize2, Minimize2, ChevronLeft } from "lucide-react";
import { Icon } from "@iconify/react";
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

export function Window({ id, children }: { id: string; children: React.ReactNode }) {
  const { windows, activeAppId, closeApp, minimizeApp, toggleMaximizeApp, focusApp, isMobile } = useWindowManager();
  const drag = useDragControls();
  const meta = APPS_REGISTRY[id];
  const state = windows[id];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const windowedPosition = useRef({ x: 0, y: 0 });
  const wasMaximized = useRef(false);
  const maximized = state?.isMaximized ?? false;

  useEffect(() => {
    if (maximized && !wasMaximized.current) {
      windowedPosition.current = { x: x.get(), y: y.get() };
      x.set(0); y.set(0);
    }
    if (!maximized && wasMaximized.current) {
      x.set(windowedPosition.current.x); y.set(windowedPosition.current.y);
    }
    wasMaximized.current = maximized;
  }, [maximized, x, y]);

  if (!state?.isOpen || state.isMinimized) return null;

  const appIcon = icons[meta.icon] || phosphorIcons.appWindow;

  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.article
          className="mobile-app"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            zIndex: Math.max(90, state.zIndex),
            ["--app-accent" as any]: meta.accentColor
          }}
        >
          <header className="mobile-app-header">
            <button
              onClick={() => {
                playUiClick();
                closeApp(id);
              }}
              aria-label="Back to desktop"
              className="p-2 -ml-1 text-[var(--foreground)] hover:opacity-75 cursor-pointer flex items-center gap-1 font-medium text-xs"
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2 truncate">
              <span
                className="w-4 h-4 rounded flex items-center justify-center"
                style={{ color: meta.accentColor }}
              >
                <Icon icon={appIcon} width={15} height={15} />
              </span>
              <span className="font-bold text-sm tracking-wide text-[var(--foreground)] truncate">
                {meta.title === "File Explorer" ? "Archive" : meta.title}
              </span>
            </div>
            <button
              onClick={() => {
                playUiClick();
                closeApp(id);
              }}
              aria-label="Close application"
              className="p-2 -mr-1 text-[var(--foreground-muted)] hover:text-[var(--danger)] cursor-pointer"
            >
              <X size={20} />
            </button>
          </header>
          <div className="mobile-app-content">{children}</div>
        </motion.article>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.article
        drag={!maximized}
        dragControls={drag}
        dragListener={false}
        dragMomentum={false}
        className={`os-window ${maximized ? "is-maximized" : ""} ${activeAppId === id ? "is-focused" : ""}`}
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{
          zIndex: state.zIndex,
          x,
          y,
          left: maximized ? 16 : meta.defaultX,
          top: maximized ? 16 : meta.defaultY,
          width: maximized ? "calc(100vw - 32px)" : meta.defaultWidth,
          height: maximized ? "calc(100vh - 96px)" : meta.defaultHeight,
          ["--app-accent" as any]: meta.accentColor
        }}
        onPointerDown={() => focusApp(id)}
      >
        <header
          className="window-titlebar"
          onPointerDown={(e) => {
            if (!maximized) drag.start(e);
          }}
          onDoubleClick={() => {
            playUiClick();
            toggleMaximizeApp(id);
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 border border-white/10"
              style={{ background: `${meta.accentColor}20`, color: meta.accentColor }}
            >
              <Icon icon={appIcon} width={13} height={13} />
            </span>
            <span className="font-semibold text-xs tracking-tight truncate text-[var(--foreground)]">
              {meta.title === "File Explorer" ? "Archive" : meta.title}
            </span>
            <span
              className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase"
              style={{
                borderColor: `${meta.accentColor}33`,
                background: `${meta.accentColor}12`,
                color: meta.accentColor
              }}
            >
              {id}
            </span>
            <small className="hidden md:inline-block text-[11px] text-[var(--foreground-muted)] truncate max-w-xs">
              {meta.description}
            </small>
          </div>
          <nav className="flex items-center gap-1" onPointerDown={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                playUiClick();
                minimizeApp(id);
              }}
              aria-label="Minimize"
              className="w-6 h-6 rounded-md flex items-center justify-center text-[var(--foreground-muted)] hover:text-[#F59E0B] hover:bg-[#F59E0B]/15 transition-all cursor-pointer"
              title="Minimize"
            >
              <Minus size={13} />
            </button>
            <button
              onClick={() => {
                playUiClick();
                toggleMaximizeApp(id);
              }}
              aria-label={maximized ? "Restore" : "Maximize"}
              className="w-6 h-6 rounded-md flex items-center justify-center text-[var(--foreground-muted)] hover:text-[#34D399] hover:bg-[#34D399]/15 transition-all cursor-pointer"
              title={maximized ? "Restore" : "Maximize"}
            >
              {maximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
            <button
              className="window-close w-6 h-6 rounded-md flex items-center justify-center text-[var(--foreground-muted)] hover:text-[#F43F5E] hover:bg-[#F43F5E]/20 transition-all cursor-pointer"
              onClick={() => {
                playUiClick();
                closeApp(id);
              }}
              aria-label="Close"
              title="Close"
            >
              <X size={14} />
            </button>
          </nav>
        </header>
        <div className="window-content">{children}</div>
      </motion.article>
    </AnimatePresence>
  );
}
