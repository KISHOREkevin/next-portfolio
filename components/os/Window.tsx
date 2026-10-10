"use client";
import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, useDragControls, useMotionValue } from "framer-motion";
import { X, Minus, Maximize2, Minimize2, ChevronLeft, AppWindow } from "lucide-react";
import { APPS_REGISTRY, useWindowManager } from "./WindowManager";

export function Window({ id, children }: { id: string; children: React.ReactNode }) {
  const { windows, activeAppId, closeApp, minimizeApp, toggleMaximizeApp, focusApp, isMobile } = useWindowManager();
  const drag = useDragControls(); const meta = APPS_REGISTRY[id]; const state = windows[id];
  const x = useMotionValue(0); const y = useMotionValue(0);
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
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.article
          className="mobile-app"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.16 }}
          style={{ zIndex: Math.max(90, state.zIndex) }}
        >
          <header className="mobile-app-header">
            <button
              onClick={() => closeApp(id)}
              aria-label="Back to desktop"
              className="p-2 -ml-1 text-[var(--foreground)] hover:opacity-75 cursor-pointer flex items-center gap-1 font-medium text-xs"
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
            <span className="font-bold text-sm tracking-wide text-[var(--foreground)] truncate">
              {meta.title === "File Explorer" ? "Archive" : meta.title}
            </span>
            <button
              onClick={() => closeApp(id)}
              aria-label="Close application"
              className="p-2 -mr-1 text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
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
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.16 }}
        style={{
          zIndex: state.zIndex,
          x,
          y,
          left: maximized ? 16 : meta.defaultX,
          top: maximized ? 50 : meta.defaultY,
          width: maximized ? "calc(100vw - 32px)" : meta.defaultWidth,
          height: maximized ? "calc(100vh - 138px)" : meta.defaultHeight
        }}
        onPointerDown={() => focusApp(id)}
      >
        <header
          className="window-titlebar"
          onPointerDown={(e) => {
            if (!maximized) drag.start(e);
          }}
          onDoubleClick={() => toggleMaximizeApp(id)}
        >
          <div>
            <AppWindow size={15} />
            <span>{meta.title === "File Explorer" ? "Archive" : meta.title}</span>
            <small>{meta.description}</small>
          </div>
          <nav onPointerDown={(e) => e.stopPropagation()}>
            <button onClick={() => minimizeApp(id)} aria-label="Minimize">
              <Minus size={15} />
            </button>
            <button
              onClick={() => toggleMaximizeApp(id)}
              aria-label={maximized ? "Restore" : "Maximize"}
            >
              {maximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button className="window-close" onClick={() => closeApp(id)} aria-label="Close">
              <X size={16} />
            </button>
          </nav>
        </header>
        <div className="window-content">{children}</div>
      </motion.article>
    </AnimatePresence>
  );
}
