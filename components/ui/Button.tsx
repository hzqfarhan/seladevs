"use client";
import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({ variant = "outline", size = "md", className, children, ...rest }: Props) {
  const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-[11px]",
    md: "px-4 py-2 text-xs",
    lg: "px-5 py-3 text-sm",
  };
  const variants: Record<Variant, string> = {
    primary:
      "bg-sd-wine-700/80 dark:bg-sd-wine-700/60 text-sd-ink-strong border border-sd-neon/60 hover:shadow-[0_0_20px_rgba(255,45,85,0.55)] hover:border-sd-neon",
    outline:
      "bg-transparent text-sd-neon-soft border border-sd-wine-500/50 hover:text-sd-neon hover:border-sd-neon hover:shadow-[0_0_20px_rgba(255,45,85,0.35)]",
    ghost:
      "bg-transparent text-sd-ink-soft hover:text-sd-neon",
  };
  return (
    <button
      {...rest}
      className={cn(
        "group inline-flex items-center gap-2 font-mono uppercase tracking-widest transition-all duration-200 rounded-md",
        sizes[size],
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
