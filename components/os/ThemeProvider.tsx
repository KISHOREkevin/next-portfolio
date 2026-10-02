"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemePreference = "dark" | "light" | "system";
type ThemeContextValue = { preference: ThemePreference; resolvedTheme: "dark" | "light"; setPreference: (preference: ThemePreference) => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem("kishoreos-theme");
    return stored === "dark" || stored === "light" || stored === "system" ? stored : "system";
  });
  const [systemDark, setSystemDark] = useState(() => typeof window === "undefined" || window.matchMedia("(prefers-color-scheme: dark)").matches);
  const resolvedTheme = preference === "system" ? (systemDark ? "dark" : "light") : preference;
  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
  }, [resolvedTheme]);
  useEffect(() => { const media = window.matchMedia("(prefers-color-scheme: dark)"); const sync = () => setSystemDark(media.matches); media.addEventListener("change", sync); return () => media.removeEventListener("change", sync); }, []);
  const setPreference = (next: ThemePreference) => { localStorage.setItem("kishoreos-theme", next); setPreferenceState(next); };
  return <ThemeContext.Provider value={{ preference, resolvedTheme, setPreference }}>{children}</ThemeContext.Provider>;
}
export function useTheme() { const value = useContext(ThemeContext); if (!value) throw new Error("useTheme must be used inside ThemeProvider"); return value; }
