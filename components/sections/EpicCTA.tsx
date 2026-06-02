import { Eyebrow } from "@/components/ui/Eyebrow";

export function EpicCTA() {
  return (
    <section className="relative overflow-hidden px-6 md:px-10 py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 60%, rgba(255,45,85,0.25) 0%, transparent 70%), radial-gradient(40% 40% at 20% 30%, rgba(155,92,255,0.15) 0%, transparent 70%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,45,85,0.6) 1px, transparent 1px)", backgroundSize: "100% 6px" }} />

      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[120%] max-w-[800px] opacity-30"
      >
        <defs>
          <linearGradient id="epicG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF2D55" />
            <stop offset="100%" stopColor="#5F0617" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="200,40 360,200 200,360 40,200" fill="none" stroke="url(#epicG)" strokeWidth="1.4" />
        <polygon points="200,90 310,200 200,310 90,200" fill="none" stroke="#FF2D55" strokeOpacity="0.3" />
        <polygon points="200,140 260,200 200,260 140,200" fill="none" stroke="#FF2D55" strokeOpacity="0.5" />
      </svg>

      <div className="relative mx-auto max-w-3xl text-center">
        <Eyebrow>&lt;connect with us&gt;</Eyebrow>
        <h2 className="mt-4 font-pixel uppercase text-4xl md:text-7xl leading-[0.95] text-sd-ink-strong animate-text-neon">
          ## Something Epic is Brewing.
        </h2>
        <p className="mt-6 text-sd-ink-soft/85 max-w-xl mx-auto">
          Join the community as we cook up events, bounties, and gatherings across Malaysia. Stay sharp. Stay shipping.
        </p>

        <a
          href="https://discord.gg"
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-3 font-mono uppercase tracking-widest text-sm border border-sd-neon/60 bg-sd-wine-700/60 text-sd-ink-strong rounded-md px-6 py-3 hover:shadow-[0_0_25px_rgba(255,45,85,0.6)] transition-shadow animate-discord-float animate-discord-glitch"
        >
          <span aria-hidden>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.075.075 0 0 0-.079.037c-.34.6-.717 1.387-.98 2.005a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.997-2.005.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 5.178 4.37a.07.07 0 0 0-.032.027C2.34 8.5 1.55 12.5 1.94 16.43a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.3 14.3 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.193.372-.293a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.099.246.198.372.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.578-.838-8.434-3.549-12.034a.06.06 0 0 0-.031-.028z" />
            </svg>
          </span>
          [ &gt; join our discord ]
        </a>
      </div>
    </section>
  );
}
