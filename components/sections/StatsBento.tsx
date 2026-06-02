"use client";
import { Counter } from "@/components/ui/Counter";
import { STATS } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function StatsBento() {
  return (
    <section className="px-6 md:px-10 py-12 md:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-end justify-between mb-6">
          <Eyebrow>&lt;live pulse&gt;</Eyebrow>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft/60">
            updated // now
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="relative border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-6 hover:border-sd-neon/60 transition-colors"
            >
              <BracketTop />
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-sd-neon animate-glow" />
                {s.label}
              </div>
              <p className="mt-4 font-pixel uppercase text-5xl md:text-6xl text-sd-neon animate-pulse-neon">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/50">
                <span>// count</span>
                <span>{s.label}</span>
              </div>
              <BracketBottom />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BracketTop() {
  return (
    <div aria-hidden className="absolute left-0 right-0 top-0 h-px overflow-hidden">
      <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-sd-neon to-transparent" />
    </div>
  );
}
function BracketBottom() {
  return (
    <div aria-hidden className="absolute left-0 right-0 bottom-0 h-px overflow-hidden">
      <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-sd-neon to-transparent ml-auto" />
    </div>
  );
}
