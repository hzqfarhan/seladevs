import { BentoCard } from "@/components/ui/BentoCard";

const STATS = [
  { label: "median comp", value: "RM 39k+" },
  { label: "reply SLA", value: "24h" },
  { label: "ghost jobs", value: "0" },
  { label: "verified co.", value: "12/12" },
];

export function JobsStatsStrip() {
  return (
    <section className="px-6 md:px-10 py-4">
      <div className="mx-auto max-w-[1440px] grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map((s) => (
          <BentoCard key={s.label} clip withCorner className="text-center">
            <p className="font-pixel text-3xl text-sd-ink-strong">{s.value}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{s.label}</p>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
