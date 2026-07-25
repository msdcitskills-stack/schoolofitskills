import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeKey = "default" | "midnight" | "emerald" | "rose" | "obsidian";

export const themes: { key: ThemeKey; label: string; swatch: string[] }[] = [
  { key: "default", label: "Sun & Ink", swatch: ["#f5f1e6", "#f5c518", "#111111"] },
  { key: "midnight", label: "Midnight", swatch: ["#0f1230", "#6366f1", "#a78bfa"] },
  { key: "emerald", label: "Emerald", swatch: ["#f2f7f2", "#0d7a5f", "#c9a84c"] },
  { key: "rose", label: "Rose", swatch: ["#fef4f0", "#e85d3a", "#1a1a1a"] },
  { key: "obsidian", label: "Obsidian", swatch: ["#0e0e0e", "#f5c518", "#f7f7f7"] },
];

const ThemeCtx = createContext<{ theme: ThemeKey; setTheme: (t: ThemeKey) => void }>({
  theme: "default",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeKey>("default");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? (window.localStorage.getItem("sois-theme") as ThemeKey | null)
        : null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    themes.forEach((t) => root.classList.remove(`theme-${t.key}`));
    if (theme !== "default") root.classList.add(`theme-${theme}`);
    window.localStorage.setItem("sois-theme", theme);
  }, [theme]);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
