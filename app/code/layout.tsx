export default function CodeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-sd-wine-500/30 bg-sd-bg-1/40">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-2 flex items-center gap-3">
          <span aria-hidden className="font-mono text-[10px] text-sd-neon-soft/70 select-none">[</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
            seladev_os // bounty.exe
          </span>
          <span aria-hidden className="font-mono text-[10px] text-sd-neon-soft/70 select-none">]</span>
          <span className="mx-2 text-sd-ink-soft/30">·</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/60">v2.0</span>
          <span className="mx-2 text-sd-ink-soft/30">·</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon">6 live</span>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-sd-neon/40 to-transparent animate-hud-beam" />
      </div>
      {children}
    </div>
  );
}
