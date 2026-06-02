"use client";
import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("relative overflow-hidden bg-sd-bg-2 rounded-md animate-shimmer", className)} />;
}
