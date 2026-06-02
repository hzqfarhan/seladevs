import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-4 md:px-8 pb-10">
      <div className="mx-auto max-w-[1480px] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-sd-wine-500/20 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/55">
        <p>© 2026 seladev_os v1.0.0</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-sd-neon transition-colors">privacy</Link>
          <Link href="/terms" className="hover:text-sd-neon transition-colors">terms</Link>
          <Link href="/contact" className="hover:text-sd-neon transition-colors">contact</Link>
        </div>
        <p className="text-sd-neon-soft/60">// built with care in kl</p>
      </div>
    </footer>
  );
}
