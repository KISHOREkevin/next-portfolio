"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Compass, Moon, Sun } from "lucide-react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { useWindowManager } from "./WindowManager";
import { useTheme } from "./ThemeProvider";

type MenuItem = {
  id: string;
  label: string;
  icon: PhosphorIconData;
  x: number;
  y: number;
  labelSide: "left" | "right";
};

const ORB_RADIUS = 45;

const menu: MenuItem[] = [
  { id: "about", label: "Profile", icon: phosphorIcons.userCircle, x: -136, y: -172, labelSide: "left" },
  { id: "projects", label: "Projects", icon: phosphorIcons.folderOpen, x: -116, y: -82, labelSide: "left" },
  { id: "experience", label: "Journey", icon: phosphorIcons.briefcase, x: -178, y: -18, labelSide: "left" },
  { id: "skills", label: "Skills", icon: phosphorIcons.gearSix, x: -84, y: -242, labelSide: "left" },
  { id: "terminal", label: "Console", icon: phosphorIcons.terminalWindow, x: -230, y: -105, labelSide: "right" },
  { id: "resume", label: "Resume", icon: phosphorIcons.fileText, x: -241, y: -193, labelSide: "right" },
  { id: "contact", label: "Contact", icon: phosphorIcons.envelopeSimple, x: -48, y: -155, labelSide: "left" }
];

const THEME_POSITION = { x: -150, y: -250 };

export function MobileOrb() {
  const { openApp, setLauncherOpen } = useWindowManager();
  const { resolvedTheme, setPreference } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  const choose = (id: string) => {
    openApp(id);
    setOpen(false);
    setLauncherOpen(false);
  };

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <div className="mobile-orb-wrap">
      <AnimatePresence>
        {open && (
          <motion.div
            className="orb-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="orb-menu">
        <AnimatePresence>
          {open &&
            menu.map((item, index) => (
              <motion.button
                key={item.id}
                className="orb-item"
                style={{ "--x": `${item.x}px`, "--y": `${item.y}px` } as React.CSSProperties}
                initial={{ opacity: 0, scale: 0.35, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x: item.x, y: item.y }}
                exit={{ opacity: 0, scale: 0.35, x: 0, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.018 }}
                onClick={() => choose(item.id)}
                aria-label={`Open ${item.label}`}
              >
                <Icon icon={item.icon} width={18} height={18} />
                <span
                  style={
                    item.labelSide === "right"
                      ? { left: ORB_RADIUS + 6, right: "auto" }
                      : undefined
                  }
                >
                  {item.label}
                </span>
              </motion.button>
            ))}
        </AnimatePresence>

        {open && (
          <motion.button
            className="orb-theme"
            style={{ "--x": `${THEME_POSITION.x}px`, "--y": `${THEME_POSITION.y}px` } as React.CSSProperties}
            initial={{ opacity: 0, scale: 0.35, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: THEME_POSITION.x, y: THEME_POSITION.y }}
            exit={{ opacity: 0, scale: 0.35, x: 0, y: 0 }}
            transition={{ duration: 0.2, delay: 0.11 }}
            onClick={() => setPreference(nextTheme)}
            aria-label={`Switch to ${nextTheme} theme`}
            aria-pressed={resolvedTheme === "dark"}
            title={`Switch to ${nextTheme} theme`}
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span>{nextTheme === "light" ? "Light" : "Dark"}</span>
          </motion.button>
        )}

        <button
          className={`mobile-orb ${open ? "is-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Open application launcher"
          aria-expanded={open}
        >
          <Compass size={23} />
        </button>
      </div>
    </div>
  );
}
