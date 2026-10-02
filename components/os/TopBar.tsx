"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Volume2,
  VolumeX,
  Search,
  Info
} from "lucide-react";
import { useWindowManager } from "./WindowManager";
import { formatDate } from "@/lib/utils";
import { profileData } from "@/data/profile";

export function TopBar() {
  const {
    openApp,
    setCommandPaletteOpen,
    soundEnabled,
    toggleSound
  } = useWindowManager();

  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(formatDate(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-8 bg-[#181825] border-b border-[#313244]/50 px-3 sm:px-4 flex items-center justify-between z-30 select-none text-xs font-mono text-[#a6adc8]">
      {/* Left: OS Branding & Status */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => openApp("system-info")}
          className="flex items-center gap-2 text-[#cdd6f4] hover:text-[#cba6f7] transition-colors group focus:outline-none"
          title="System Telemetry"
        >
          <div className="w-4.5 h-4.5 rounded bg-[#313244] flex items-center justify-center text-[#cba6f7]">
            <Terminal className="w-3 h-3" />
          </div>
          <span className="font-semibold text-xs text-[#cdd6f4] tracking-tight">
            KishoreOS
          </span>
          <span className="text-[10px] text-[#a6adc8] bg-[#313244]/60 px-1.5 py-0.5 rounded hidden sm:inline">
            v2.4
          </span>
        </button>

        {/* Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#313244]/50">
          <div className="flex items-center gap-1.5 text-[11px] text-[#a6e3a1]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6e3a1] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#a6e3a1]"></span>
            </span>
            <span className="font-medium tracking-tight truncate max-w-[260px] text-[#a6e3a1]">
              {profileData.status}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Live Time */}
      <div className="text-[#a6adc8] text-[11px] tracking-wide flex items-center gap-1.5 font-mono">
        <span suppressHydrationWarning className="tabular-nums font-medium text-[#cdd6f4]">
          {currentTime || "Synchronizing clock..."}
        </span>
      </div>

      {/* Right: Actions (Search, Sound, System Info) */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Command Palette Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#313244]/50 hover:bg-[#313244] text-[#a6adc8] hover:text-[#cdd6f4] transition-colors text-[11px]"
          title="Command Palette (Ctrl + K)"
        >
          <Search className="w-3 h-3 text-[#a6adc8]" />
          <span className="hidden sm:inline font-sans text-xs">Search</span>
          <kbd className="hidden sm:inline-block px-1 rounded bg-[#11111b]/80 text-[10px] text-[#a6adc8]">
            ⌘K
          </kbd>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="p-1.5 rounded hover:bg-[#313244] text-[#a6adc8] hover:text-[#cdd6f4] transition-colors"
          title={soundEnabled ? "Mute audio feedback" : "Enable audio feedback"}
          aria-label="Toggle UI sounds"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#cba6f7]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#6c7086]" />
          )}
        </button>

        {/* System Info Quick Trigger */}
        <button
          onClick={() => openApp("system-info")}
          className="p-1.5 rounded hover:bg-[#313244] text-[#a6adc8] hover:text-[#cdd6f4] transition-colors hidden sm:flex"
          title="System Info"
          aria-label="System details"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
