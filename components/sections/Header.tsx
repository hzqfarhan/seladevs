"use client";
import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Drawer } from "@/components/ui/Drawer";
import { NAV_COLUMNS, HEADER_LINKS } from "@/data/nav";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-[1480px] px-4 md:px-8 py-3">
        <div className="flex items-center justify-between border border-sd-wine-500/30 bg-sd-bg-1/70 backdrop-blur rounded-full px-3 py-1.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-8 w-8 place-items-center rounded-full border border-sd-wine-500/40 text-sd-neon-soft hover:text-sd-neon hover:border-sd-neon transition-colors"
            >
              <span className="font-mono text-sm leading-none">+</span>
            </button>
            <Link
              href="/"
              className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/55 hover:text-sd-neon-soft"
            >
              seladev_os
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {HEADER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/80 hover:text-sd-neon px-2 py-1 rounded-full hover:bg-sd-wine-700/30 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href="https://discord.gg/seladevs"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="hidden sm:grid h-8 w-8 place-items-center rounded-full border border-sd-wine-500/40 text-sd-neon-soft hover:text-sd-neon hover:border-sd-neon transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.075.075 0 0 0-.079.037c-.34.6-.717 1.387-.98 2.005a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.997-2.005.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 5.178 4.37a.07.07 0 0 0-.032.027C2.34 8.5 1.55 12.5 1.94 16.43a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.3 14.3 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.193.372-.293a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.099.246.198.372.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.578-.838-8.434-3.549-12.034a.06.06 0 0 0-.031-.028z" />
              </svg>
            </a>
            <ThemeToggle className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} columns={NAV_COLUMNS} />
    </header>
  );
}
