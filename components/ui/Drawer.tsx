"use client";
import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface Column { eyebrow: string; items: { label: string; href: string }[] }

interface Props {
  open: boolean;
  onClose: () => void;
  columns: Column[];
  className?: string;
}

export function Drawer({ open, onClose, columns, className }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[55]">
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-sd-bg-0/95 backdrop-blur-md animate-enter"
      />
      <div className={cn("relative h-full w-full overflow-y-auto p-8 md:p-14 animate-enter", className)}>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
            <SelaDevs /> — nav
          </p>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="font-mono text-sm text-sd-neon-soft border border-sd-wine-500/50 px-3 py-1.5 rounded-md hover:text-sd-neon hover:border-sd-neon transition-colors"
          >
            [ close ]
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {columns.map((col) => (
            <div key={col.eyebrow} className="space-y-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon">{col.eyebrow}</p>
              <ul className="space-y-2">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      onClick={onClose}
                      className="font-pixel uppercase text-2xl md:text-3xl text-sd-ink-strong hover:text-sd-neon transition-colors"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SelaDevs() {
  return <span className="text-sd-ink-strong">&lt;+ SD&gt;</span>;
}
