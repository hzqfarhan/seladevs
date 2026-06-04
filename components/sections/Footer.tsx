import Link from "next/link";
import { FOOTER_LINKS } from "@/data/nav";

export function Footer() {
  return (
    <footer className="px-4 md:px-8 pb-10">
      <div className="mx-auto max-w-[1480px] flex flex-col gap-4 border-t border-sd-wine-500/20 pt-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/70">
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-sd-neon transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/55">
          <p>© 2026 uthm_forge_os v1.0.0</p>
          <p className="text-sd-neon-soft/60">// built with care in parit raja</p>
        </div>
      </div>
    </footer>
  );
}
