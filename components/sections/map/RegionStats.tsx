import { BentoCard } from "@/components/ui/BentoCard";
import { STATES } from "@/data/map";

export function RegionStats() {
  const peninsular = STATES.filter((s) => s.region === "peninsular").reduce((a, s) => a + s.builders, 0);
  const borneo = STATES.filter((s) => s.region === "borneo").reduce((a, s) => a + s.builders, 0);
  const federal = STATES.filter((s) => s.region === "federal").reduce((a, s) => a + s.builders, 0);
  return (
    <section className="px-6 md:px-10 py-6">
      <div className="mx-auto max-w-[1440px] grid grid-cols-1 sm:grid-cols-3 gap-3">
        <BentoCard clip withCorner>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">peninsular</p>
          <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">{peninsular.toLocaleString()}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">builders</p>
        </BentoCard>
        <BentoCard clip withCorner>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">borneo</p>
          <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">{borneo.toLocaleString()}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">builders</p>
        </BentoCard>
        <BentoCard clip withCorner>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">federal</p>
          <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">{federal.toLocaleString()}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">builders</p>
        </BentoCard>
      </div>
    </section>
  );
}
