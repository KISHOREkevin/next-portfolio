"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  FolderKanban,
  Briefcase,
  Cpu,
  Terminal,
  FolderTree,
  Mail,
  FileText,
  Info,
  LayoutGrid,
  X
} from "lucide-react";
import { useWindowManager, APPS_REGISTRY } from "./WindowManager";
import { cn } from "@/lib/utils";

const ICON_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  User,
  FolderKanban,
  Briefcase,
  Cpu,
  Terminal,
  FolderTree,
  Mail,
  FileText,
  Info,
  LayoutGrid
};

export function Dock() {
  const { windows, activeAppId, openApp, minimizeApp, isMobile } = useWindowManager();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const dockApps = Object.values(APPS_REGISTRY).filter((app) => app.dockItem);

  const handleAppClick = (id: string) => {
    const win = windows[id];
    if (win?.isOpen && !win?.isMinimized && activeAppId === id) {
      minimizeApp(id);
    } else {
      openApp(id);
    }
  };

  // Mobile Bottom Navigation Bar
  if (isMobile) {
    const mobilePrimaryIds = ["about", "projects", "skills", "terminal"];

    return (
      <>
        {/* Mobile App Drawer Modal */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <motion.div
              key="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#11111b]/80 backdrop-blur-sm z-50 flex flex-col justify-end"
              onClick={() => setMobileDrawerOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="bg-[#181825] border-t border-[#313244]/50 rounded-t-lg p-4 pb-6 max-h-[75vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drag handle */}
                <div className="w-8 h-1 rounded-full bg-[#45475a] mx-auto mb-3" />

                <div className="flex items-center justify-between pb-2.5 border-b border-[#313244]/50">
                  <span className="font-mono text-xs font-semibold text-[#cdd6f4]">
                    Applications
                  </span>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 rounded text-[#a6adc8] hover:text-[#cdd6f4] bg-[#313244]"
                    aria-label="Close app drawer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-3">
                  {Object.values(APPS_REGISTRY).map((app) => {
                    const Icon = ICON_COMPONENTS[app.icon] || LayoutGrid;
                    const win = windows[app.id];
                    const isOpen = win?.isOpen;

                    return (
                      <button
                        key={`drawer-${app.id}`}
                        onClick={() => {
                          setMobileDrawerOpen(false);
                          openApp(app.id);
                        }}
                        className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-[#313244]/50 active:bg-[#313244] transition-colors"
                      >
                        <div className="relative w-8 h-8 rounded-md bg-[#313244]/60 flex items-center justify-center text-[#cba6f7] mb-1">
                          <Icon className="w-4 h-4" />
                          {isOpen && (
                            <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#cba6f7]" />
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-[#bac2de] text-center truncate w-full">
                          {app.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fixed Mobile Bottom Bar */}
        <nav
          aria-label="Mobile Navigation"
          className="fixed bottom-0 inset-x-0 h-14 bg-[#181825] border-t border-[#313244]/50 px-2 flex items-center justify-around z-40 pb-[env(safe-area-inset-bottom)]"
        >
          {mobilePrimaryIds.map((id) => {
            const app = APPS_REGISTRY[id];
            if (!app) return null;
            const Icon = ICON_COMPONENTS[app.icon] || LayoutGrid;
            const win = windows[id];
            const isActive = win?.isOpen && !win?.isMinimized;

            return (
              <button
                key={`mobile-tab-${id}`}
                onClick={() => handleAppClick(id)}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full py-1 min-h-[44px] transition-colors relative",
                  isActive ? "text-[#cba6f7] font-semibold" : "text-[#a6adc8] active:text-[#cdd6f4]"
                )}
                aria-label={`Open ${app.title}`}
              >
                <div
                  className={cn(
                    "p-1 rounded transition-transform",
                    isActive ? "bg-[#313244] text-[#cba6f7]" : ""
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono mt-0.5 tracking-tight">{app.title}</span>
                {win?.isOpen && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#cba6f7]" />
                )}
              </button>
            );
          })}

          {/* More Apps Trigger */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full py-1 min-h-[44px] text-[#a6adc8] active:text-[#cdd6f4]"
            aria-label="All applications"
          >
            <div className="p-1 rounded">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono mt-0.5">More</span>
          </button>
        </nav>
      </>
    );
  }

  // Desktop Minimal Floating Dock
  return (
    <div className="fixed bottom-3 inset-x-0 flex justify-center z-30 pointer-events-none select-none">
      <nav
        aria-label="Desktop Dock"
        className="pointer-events-auto flex items-center gap-1 px-1.5 py-1 rounded-lg bg-[#181825]/90 backdrop-blur-md border border-[#313244]/40 shadow-sm"
      >
        {dockApps.map((app) => {
          const Icon = ICON_COMPONENTS[app.icon] || LayoutGrid;
          const win = windows[app.id];
          const isOpen = win?.isOpen;
          const isActive = activeAppId === app.id && isOpen && !win?.isMinimized;

          return (
            <div key={`dock-${app.id}`} className="relative group">
              {/* Tooltip */}
              {hoveredApp === app.id && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#11111b] border border-[#313244]/60 text-[11px] font-mono text-[#cdd6f4] whitespace-nowrap shadow-sm pointer-events-none z-50">
                  {app.title}
                </div>
              )}

              {/* Dock Icon Button */}
              <button
                onClick={() => handleAppClick(app.id)}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                className={cn(
                  "relative w-9 h-9 rounded-md flex items-center justify-center transition-colors duration-100",
                  isActive
                    ? "bg-[#313244] text-[#cdd6f4]"
                    : isOpen
                    ? "text-[#cdd6f4] hover:bg-[#313244]/50"
                    : "text-[#a6adc8] hover:text-[#cdd6f4] hover:bg-[#313244]/40"
                )}
                aria-label={`Launch ${app.title}`}
              >
                <Icon className="w-4.5 h-4.5" />

                {/* Running Indicator Dot */}
                {isOpen && (
                  <span
                    className={cn(
                      "absolute bottom-0.5 rounded-full",
                      isActive ? "w-1.5 h-1.5 bg-[#cba6f7]" : "w-1 h-1 bg-[#6c7086]"
                    )}
                  />
                )}
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
