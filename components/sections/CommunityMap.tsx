import { Eyebrow } from "@/components/ui/Eyebrow";
import { BracketLink } from "@/components/ui/BracketLink";
import { STATES } from "@/data/content";
import { Counter } from "@/components/ui/Counter";

export function CommunityMap() {
  return (
    <section id="map" className="px-6 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Eyebrow>&lt;community map&gt;</Eyebrow>
            <h2 className="mt-3 font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong">
              ## malaysia tech map
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
            <Counter value={1751} suffix=" builders across malaysia" />
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3">
          <div className="relative border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6 overflow-hidden">
            <MapArt />
            <div className="relative z-10 flex items-center justify-center h-full min-h-[300px]">
              <BracketLink href="/map">[&gt; explore map]</BracketLink>
            </div>
          </div>

          <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6 clip-card">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;perak&gt;
            </p>
            <p className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">Teluk Intan Tower</p>
            <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
              <Stat dotClass="bg-sd-amber" label="0 devs" />
              <Stat dotClass="bg-sd-neon" label="0 guilds" />
              <Stat dotClass="bg-sd-purple" label="0 jobs" />
              <Stat dotClass="bg-sd-money" label="0 events" />
            </div>
            <div className="mt-6">
              <BracketLink href="/map?state=perak">[&gt; view perak]</BracketLink>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-2">
          {STATES.map((s) => (
            <a
              key={s.code}
              href={`/map?state=${s.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-md px-2 py-2 text-center hover:text-sd-neon hover:border-sd-neon transition-colors"
            >
              [{s.code}]
            </a>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <BracketLink href="/map">[&gt; explore full map]</BracketLink>
        </div>
      </div>
    </section>
  );
}

function Stat({ dotClass, label }: { dotClass: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`block h-1.5 w-1.5 ${dotClass}`} />
      <span className="text-sd-ink-soft/80">{label}</span>
    </div>
  );
}

function MapArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 220"
      className="absolute inset-0 w-full h-full opacity-50"
    >
      <defs>
        <linearGradient id="sdMapGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF2D55" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#B01434" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="220" fill="url(#sdMapGlow)" />
      <g stroke="rgba(255,45,85,0.35)" strokeWidth="0.8" fill="none">
        <path d="M40 60 L120 50 L210 60 L300 70 L360 50 L370 100 L350 150 L300 180 L220 190 L130 180 L70 150 L40 100 Z" />
        <path d="M120 50 L150 90 L130 130 L100 110 Z" />
        <path d="M210 60 L240 95 L230 140 L180 150 L150 90 Z" />
        <path d="M300 70 L340 110 L320 160 L300 180 L230 140 L240 95 Z" />
      </g>
      <g fill="#FF2D55">
        <circle cx="120" cy="90" r="3" />
        <circle cx="220" cy="110" r="3" />
        <circle cx="300" cy="120" r="3" />
        <circle cx="170" cy="140" r="3" />
        <circle cx="260" cy="160" r="3" />
      </g>
    </svg>
  );
}
