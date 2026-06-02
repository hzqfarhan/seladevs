"use client";
import { useEffect, useState } from "react";

function nextEventDelta() {
  const target = new Date("2026-06-12T20:00+08:00").getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${d}d ${h}h`;
}

export function NextEventPill() {
  const [label, setLabel] = useState("3d 4h");
  useEffect(() => {
    setLabel(nextEventDelta());
    const id = setInterval(() => setLabel(nextEventDelta()), 60_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>next: {label}</span>;
}
