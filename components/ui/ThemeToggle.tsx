"use client";
import { useTheme } from "@/lib/useTheme";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();
  const label = mounted ? (theme === "dark" ? "light" : "dark") : "theme";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${label} mode`}
      title={`Switch to ${label} mode`}
      data-theme-toggle
      data-current-theme={mounted ? theme : "dark"}
      className={cn(
        "group relative inline-flex items-center gap-2 h-9 pl-1 pr-3 rounded-full border transition-colors",
        "border-sd-wine-500/40 bg-sd-bg-1/60 text-sd-neon-soft hover:text-sd-neon hover:border-sd-neon",
        className
      )}
    >
      <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-sd-bg-2 border border-sd-wine-500/30 group-hover:border-sd-neon transition-colors">
        {mounted ? (
          theme === "dark" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinejoin="round" />
            </svg>
          )
        ) : (
          <span className="block h-3 w-3 rounded-full bg-sd-neon" />
        )}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
        {mounted ? theme : "—"}
      </span>
    </button>
  );
}
