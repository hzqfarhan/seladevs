import { Counter } from "@/components/ui/Counter";
import { StatusPill } from "@/components/ui/StatusPill";
import { BentoCard } from "@/components/ui/BentoCard";
import { BOUNTIES } from "@/data/bounties";

export function BountyTerminalHero() {
  return (
    <section className="px-6 md:px-10 pt-20 md:pt-24 pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;bounty&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
              ## bounty board
            </h1>
            <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
              earn Ringgit for shipping technical excellence. every bounty has a public rubric.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              <Counter value={BOUNTIES.reduce((a, b) => a + b.payout, 0)} prefix="RM " suffix=" in flight" />
            </p>
            <StatusPill>{BOUNTIES.length} live</StatusPill>
          </div>
        </div>

        <BentoCard clip className="mt-8 font-mono text-[12px] uppercase tracking-widest text-sd-ink-soft/85">
          <p><span className="text-sd-neon">$</span> seladev bounty list --live</p>
          <p className="mt-1"><span className="text-sd-neon">&gt;</span> {BOUNTIES.length} bounties · {BOUNTIES.filter((b) => b.status === "closing-soon").length} closing this week</p>
          <p className="mt-1"><span className="text-sd-neon">&gt;</span> payout range: RM {Math.min(...BOUNTIES.map((b) => b.payout))} – RM {Math.max(...BOUNTIES.map((b) => b.payout))}</p>
          <p className="mt-1"><span className="text-sd-neon">&gt;</span> type <span className="text-sd-amber">"claim"</span> to enter the queue<span className="animate-cursor-blink">_</span></p>
        </BentoCard>
      </div>
    </section>
  );
}
