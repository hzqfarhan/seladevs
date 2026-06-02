"use client";
import { useEffect, useRef, useState } from "react";

export function useCountUp(
  target: number,
  options: { duration?: number; start?: boolean; prefix?: string; suffix?: string } = {}
): { value: string; ref: React.RefObject<HTMLSpanElement | null> } {
  const { duration = 1600, start = false, prefix = "", suffix = "" } = options;
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState("0");

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const v = Math.floor(target * ease(p));
      setValue(v.toLocaleString());
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  const formatted = `${prefix}${value}${suffix}`;
  return { value: formatted, ref };
}
