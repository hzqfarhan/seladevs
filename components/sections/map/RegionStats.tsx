import { BentoCard } from "@/components/ui/BentoCard";
import { STATES } from "@/data/map";

export function RegionStats() {
  const engineering = STATES.filter((s) => s.region === "engineering").reduce((a, s) => a + s.builders, 0);
  const computing = STATES.filter((s) => s.region === "computing").reduce((a, s) => a + s.builders, 0);
  const centres = STATES.filter((s) => s.region === "centre").reduce((a, s) => a + s.builders, 0);
  const applied = STATES.filter((s) => s.region === "applied").reduce((a, s) => a + s.builders, 0);
  const management = STATES.filter((s) => s.region === "management").reduce((a, s) => a + s.builders, 0);
  return (
    <section className="px-6 md:px-10 py-6">
      <div className="mx-auto max-w-[1440px] grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <BentoCard clip withCorner>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">computing</p>
          <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">{computing.toLocaleString()}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">builders</p>
        </BentoCard>
        <BentoCard clip withCorner>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">engineering</p>
          <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">{engineering.toLocaleString()}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">builders</p>
        </BentoCard>
        <BentoCard clip withCorner>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">applied</p>
          <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">{applied.toLocaleString()}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">builders</p>
        </BentoCard>
        <BentoCard clip withCorner>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">management</p>
          <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">{management.toLocaleString()}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">builders</p>
        </BentoCard>
        <BentoCard clip withCorner>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">centres</p>
          <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">{centres.toLocaleString()}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">builders</p>
        </BentoCard>
      </div>
    </section>
  );
}
