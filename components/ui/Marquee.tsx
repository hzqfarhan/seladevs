"use client";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface RowProps {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  duration?: string;
}

export function MarqueeRow({ children, reverse = false, className, duration = "30s" }: RowProps) {
  return (
    <div className={cn("flex w-max gap-6 md:gap-10", reverse ? "animate-marquee-reverse" : "animate-marquee", className)} style={{ animationDuration: duration }}>
      {children}
      {children}
    </div>
  );
}
