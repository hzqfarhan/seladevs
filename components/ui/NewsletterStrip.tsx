"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface Props {
  className?: string;
  label?: string;
  placeholder?: string;
}

export function NewsletterStrip({ className, label = "subscribe", placeholder = "you@example.com" }: Props) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    try { localStorage.setItem("sd:newsletter", email); } catch {}
    setDone(true);
  }

  if (done) {
    return (
      <div className={cn("flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-sd-neon", className)}>
        [ ✓ ] subscribed
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn("flex flex-wrap items-center gap-2", className)}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="font-mono text-[11px] uppercase tracking-widest bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft placeholder:text-sd-ink-soft/40 focus:outline-none focus:border-sd-neon w-64"
      />
      <button
        type="submit"
        className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors"
      >
        [ {label} ]
      </button>
    </form>
  );
}
