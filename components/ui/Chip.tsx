"use client";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface Props {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export function Chip({ active, onClick, children, className, type = "button" }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.2em] border rounded-full px-3 py-1.5 transition-colors whitespace-nowrap",
        active
          ? "border-sd-neon text-sd-neon bg-sd-wine-700/30"
          : "border-sd-wine-500/40 text-sd-ink-soft/80 hover:border-sd-neon hover:text-sd-neon",
        className
      )}
    >
      {children}
    </button>
  );
}
