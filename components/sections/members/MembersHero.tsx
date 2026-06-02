import { Counter } from "@/components/ui/Counter";
import { StatusPill } from "@/components/ui/StatusPill";
import { BentoCard } from "@/components/ui/BentoCard";
import { MarqueeRow } from "@/components/ui/Marquee";
import { MEMBERS } from "@/data/members";
import { GUILDS } from "@/data/guilds";

const sortedByStars = [...MEMBERS].sort((a, b) => b.stars - a.stars);
const top10 = sortedByStars.slice(0, 10);
const next10 = sortedByStars.slice(10, 20);

function fmt(n: number) {
  return `0x${n.toString(16).padStart(4, "0")}…${(n * 7).toString(16).padStart(4, "0").slice(0, 4)}`;
}

export function MembersHero() {
  return (
    <section className="px-6 md:px-10 pt-24 md:pt-32 pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;builders&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
              ## the people behind the code
            </h1>
            <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
              1,751 builders across Malaysia and counting. find your kind.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              <Counter value={1751} suffix=" builders" />
            </p>
            <StatusPill>1,247 online</StatusPill>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <BentoCard clip withCorner>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">builders</p>
            <p className="mt-2 font-pixel text-4xl text-sd-ink-strong">
              <Counter value={1751} />
            </p>
          </BentoCard>
          <BentoCard clip withCorner>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">guilds</p>
            <p className="mt-2 font-pixel text-4xl text-sd-ink-strong">
              <Counter value={GUILDS.length} />
            </p>
          </BentoCard>
          <BentoCard clip withCorner>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">states</p>
            <p className="mt-2 font-pixel text-4xl text-sd-ink-strong">
              <Counter value={13} />
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

export function LeaderboardStrip() {
  return (
    <section className="px-6 md:px-10 pb-12">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
          &lt;leaderboard&gt;
        </p>
        <div className="space-y-2 overflow-hidden">
          <div className="overflow-hidden border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-full py-2">
            <MarqueeRow duration="50s">
              {top10.map((m, i) => (
                <span
                  key={m.handle}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft/80 px-3 whitespace-nowrap"
                >
                  [#{i + 1}] @{m.handle} · {m.stars} ★ · {m.state} · {fmt(m.id * 1234)}
                </span>
              ))}
            </MarqueeRow>
          </div>
          <div className="overflow-hidden border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-full py-2">
            <MarqueeRow reverse duration="60s">
              {next10.map((m, i) => (
                <span
                  key={m.handle}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft/80 px-3 whitespace-nowrap"
                >
                  [#{i + 11}] @{m.handle} · {m.stars} ★ · {m.state}
                </span>
              ))}
            </MarqueeRow>
          </div>
        </div>
      </div>
    </section>
  );
}
