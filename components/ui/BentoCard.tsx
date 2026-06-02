import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  withCorner?: boolean;
  clip?: boolean;
}

export function BentoCard({ children, className, hover = true, withCorner = false, clip = false }: Props) {
  return (
    <div
      className={cn(
        "relative border border-sd-wine-500/30 bg-sd-bg-1/70 rounded-2xl p-5 transition-all duration-200",
        hover && "hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]",
        clip && "clip-card",
        className
      )}
    >
      {withCorner && (
        <span aria-hidden className="absolute right-3 top-3 font-mono text-[10px] text-sd-neon-soft/70 select-none">
          [ + ]
        </span>
      )}
      {children}
    </div>
  );
}
