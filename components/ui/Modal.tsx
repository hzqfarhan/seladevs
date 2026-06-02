"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function Modal({ open, onClose, children, className, ariaLabel }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
    >
      <button
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-enter"
      />
      <div
        ref={ref}
        tabIndex={-1}
        className={cn(
          "relative w-full max-w-md rounded-2xl border border-sd-wine-500/50 bg-sd-bg-0/95 shadow-[0_0_40px_rgba(255,45,85,0.25)] p-6 animate-enter",
          className
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-md border border-sd-wine-500/40 text-sd-neon-soft hover:text-sd-neon hover:border-sd-neon transition-colors"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
