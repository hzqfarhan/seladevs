import { Counter } from "@/components/ui/Counter";
import { StatusPill } from "@/components/ui/StatusPill";
import { MarqueeRow } from "@/components/ui/Marquee";

const STACKS = [
  "typescript", "next.js", "rust", "python", "elixir", "go",
  "react native", "flutter", "svelte", "kotlin", "swift", "solidity",
];

export function ShowcaseHero() {
  return (
    <section className="px-6 md:px-10 pt-24 md:pt-32 pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;showcase&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
              ## what we ship
            </h1>
            <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
              twelve projects. one forge. no fluff — every entry below was built by a SelaDevs member.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              <Counter value={12} suffix=" active projects" />
            </p>
            <StatusPill>live · v2.0</StatusPill>
          </div>
        </div>

        <div className="mt-8 overflow-hidden border border-sd-wine-500/30 rounded-full py-2 bg-sd-bg-1/40">
          <MarqueeRow duration="40s">
            {STACKS.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft/80 px-3"
              >
                [{s}]
              </span>
            ))}
          </MarqueeRow>
        </div>
      </div>
    </section>
  );
}
