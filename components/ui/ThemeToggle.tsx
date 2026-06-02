"use client";
import { useTheme } from "@/lib/useTheme";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, toggle, mounted] = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-md border border-sd-wine-500/40 text-sd-neon-soft hover:text-sd-neon hover:border-sd-neon transition-colors",
        className
      )}
    >
      <span aria-hidden className="block h-4 w-4">
        {mounted ? (
          theme === "dark" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinejoin="round" />
            </svg>
          )
        ) : (
          <span className="block h-3 w-3 rounded-full bg-sd-neon" />
        )}
      </span>
    </button>
  );
}
