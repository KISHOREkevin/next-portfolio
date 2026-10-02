"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight } from "lucide-react";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "systemd 256.4-1-arch: Initializing Catppuccin Mocha Workstation",
  "Mounted /home/kishore (Developer Environment)",
  "Started D-Bus System Message Bus",
  "Loaded kernel modules: node v20.x, ts-node, python3, fastapi",
  "Configured network interfaces: localhost, remote-workstation",
  "Started Next.js 16 Production Application Engine",
  "Reached target Developer Workstation Desktop."
];

export function BootScreen({ onComplete }: BootScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user already booted in this session
    const hasBooted = typeof window !== "undefined" && sessionStorage.getItem("kishore_os_booted");
    if (hasBooted) {
      onComplete();
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[currentIndex]]);
        setProgress(Math.round(((currentIndex + 1) / BOOT_LOGS.length) * 100));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("kishore_os_booted", "true");
          }
          onComplete();
        }, 150);
      }
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        clearInterval(interval);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("kishore_os_booted", "true");
        }
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("kishore_os_booted", "true");
    }
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="bootscreen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-0 bg-[#11111b] text-[#cdd6f4] z-50 flex flex-col justify-between p-6 sm:p-12 font-mono select-none"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#313244] pb-4">
          <div className="flex items-center gap-2.5 text-[#89b4fa]">
            <Terminal className="w-5 h-5" />
            <span className="font-bold tracking-wider text-sm sm:text-base text-[#cdd6f4]">
              KISHOREOS
            </span>
            <span className="text-[#6c7086] text-xs">[Catppuccin Mocha]</span>
          </div>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1 px-3 py-1 text-xs rounded-md border border-[#313244] hover:border-[#89b4fa] text-[#a6adc8] hover:text-[#cdd6f4] transition-colors"
          >
            <span>Skip to Desktop</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>

        {/* Boot Terminal Log Output */}
        <div className="my-auto max-w-2xl w-full mx-auto space-y-2 text-xs sm:text-sm">
          <div className="text-[#a6adc8] mb-4">
            System initialization sequence...
          </div>

          <div className="space-y-2 min-h-[160px]">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <span className="text-[#a6e3a1] font-bold shrink-0">[  OK  ]</span>
                <span className="text-[#cdd6f4]">{log}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="pt-6">
            <div className="flex justify-between text-xs text-[#a6adc8] mb-1.5">
              <span>Loading Developer Environment</span>
              <span className="text-[#89b4fa] font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-[#181825] rounded-full h-1.5 overflow-hidden border border-[#313244]">
              <div
                className="bg-[#89b4fa] h-full transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-[#6c7086] border-t border-[#313244] pt-3">
          Press [Space] or [Esc] to enter desktop immediately
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
