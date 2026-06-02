import { MarqueeRow } from "@/components/ui/Marquee";
import { PAST_BOUNTIES } from "@/data/bounties";

export function PastBounties() {
  return (
    <section className="px-6 md:px-10 py-10">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
          &lt;recently paid&gt;
        </p>
        <div className="overflow-hidden border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-full py-2">
          <MarqueeRow duration="45s">
            {PAST_BOUNTIES.map((p) => (
              <span
                key={p.id}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft/85 px-4 whitespace-nowrap"
              >
                [ ✓ ] {p.handle} · <span className="text-sd-amber">RM {p.payout}</span> · {p.title} · paid {p.paidAgo}
              </span>
            ))}
          </MarqueeRow>
        </div>
      </div>
    </section>
  );
}
