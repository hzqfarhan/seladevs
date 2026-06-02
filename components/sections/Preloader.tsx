"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let v = 0;
    const tick = () => {
      v = Math.min(100, v + Math.random() * 14 + 4);
      setProgress(v);
      if (v < 100) raf = requestAnimationFrame(tick);
      else setTimeout(() => setHidden(true), 250);
    };
    const start = setTimeout(() => raf = requestAnimationFrame(tick), 120);
    return () => { cancelAnimationFrame(raf); clearTimeout(start); };
  }, []);

  if (hidden) return null;

  return (
    <div className={cn("fixed inset-0 z-[80] grid place-items-center bg-sd-bg-0 transition-opacity duration-300")}>
      <div className="w-[min(80vw,420px)] space-y-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sd-neon-soft">
          loading<span className="animate-cursor-blink">_</span>
        </p>
        <div className="h-[2px] w-full bg-sd-wine-700/60 overflow-hidden">
          <div
            className="h-full bg-sd-neon shadow-[0_0_12px_rgba(255,45,85,0.7)] origin-left transition-transform duration-200"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
        <p className="font-mono text-[10px] text-sd-ink-soft/60">{Math.floor(progress)}%</p>
      </div>
    </div>
  );
}
