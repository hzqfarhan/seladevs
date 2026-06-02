"use client";
import { useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "sd-theme";

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.classList.remove("dark", "light");
  html.classList.add(theme);
  html.dataset.theme = theme;
  html.style.colorScheme = theme;
  try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
}

function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "dark" || v === "light") return v;
  } catch {}
  return null;
}

function readSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function useTheme(): { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void; mounted: boolean } {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = readStoredTheme() ?? readSystemTheme();
    setThemeState(initial);
    applyTheme(initial);
    setMounted(true);

    // Listen for system changes only if no manual override exists
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystem = (e: MediaQueryListEvent) => {
      if (readStoredTheme() === null) {
        const next: Theme = e.matches ? "light" : "dark";
        setThemeState(next);
        applyTheme(next);
      }
    };
    mq.addEventListener("change", onSystem);
    return () => mq.removeEventListener("change", onSystem);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggle, setTheme, mounted };
}
