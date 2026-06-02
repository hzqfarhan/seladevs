import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
