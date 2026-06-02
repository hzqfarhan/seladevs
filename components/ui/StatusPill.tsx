import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  tone?: "default" | "amber";
}

export function StatusPill({ children, className, tone = "default" }: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest",
        "border-sd-wine-500/60 bg-sd-bg-0 text-sd-neon-soft",
        tone === "amber" && "border-sd-amber/60 text-sd-amber",
        className
      )}
    >
      <span className="relative inline-flex h-2 w-2">
        <span className={cn("absolute inline-flex h-full w-full rounded-full", tone === "amber" ? "bg-sd-amber" : "bg-sd-neon")} />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full animate-live-ping", tone === "amber" ? "bg-sd-amber" : "bg-sd-neon")} />
      </span>
      {children}
    </div>
  );
}
