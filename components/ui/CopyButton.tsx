"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function CopyButton({ value, label = "copy", className }: { value: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        });
      }}
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-ink-soft/80 rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon transition-colors",
        className
      )}
    >
      {done ? "✓ copied" : `[ ${label} ]`}
    </button>
  );
}
