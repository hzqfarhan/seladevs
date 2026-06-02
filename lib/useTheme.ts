"use client";
import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

export function useTheme(): [Theme, () => void, boolean] {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("sd-theme")) as Theme | null;
    const prefersLight = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial: Theme = stored ? stored : prefersLight ? "light" : "dark";
    setTheme(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("sd-theme", next);
      const html = document.documentElement;
      html.classList.remove("dark", "light");
      html.classList.add(next);
    }
  };

  return [theme, toggle, mounted];
}
