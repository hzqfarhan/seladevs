import { BentoCard } from "@/components/ui/BentoCard";
import { BracketLink } from "@/components/ui/BracketLink";
import { GUILDS } from "@/data/guilds";

export function FeaturedGuild() {
  const g = GUILDS.find((x) => x.slug === "edge-runners");
  if (!g) return null;
  return (
    <section className="px-6 md:px-10 py-6">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
          &lt;guild of the week&gt;
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3">
          <div className="relative border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-70"
              style={{ background: `linear-gradient(135deg, ${g.banners[0]} 0%, ${g.banners[1]} 100%)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sd-bg-0 via-sd-bg-0/60 to-transparent" />
            <div className="relative p-6 md:p-8 min-h-[300px] flex flex-col justify-end">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-amber">
                {g.category} · {g.cadence} · {g.recruiting ? "recruiting" : "closed"}
              </p>
              <h2 className="mt-2 font-pixel uppercase text-4xl md:text-5xl text-sd-ink-strong">
                {g.name}
              </h2>
              <p className="mt-2 text-sm text-sd-ink-soft/80 max-w-xl">{g.tagline}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-sd-neon-soft">
                current mission · {g.mission}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <BracketLink href={`/guilds/${g.slug}`}>[&gt; join guild]</BracketLink>
                {g.links.manifesto && (
                  <a
                    href={g.links.manifesto}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft hover:text-sd-neon"
                  >
                    [ view manifesto ]
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <BentoCard clip withCorner>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">members</p>
              <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">
                {g.members}<span className="text-sd-ink-soft/40 text-xl">/{g.maxMembers}</span>
              </p>
            </BentoCard>
            <BentoCard clip withCorner>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">missions shipped</p>
              <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">14</p>
            </BentoCard>
            <BentoCard clip withCorner>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">bounties earned</p>
              <p className="mt-2 font-pixel text-3xl text-sd-ink-strong">RM 8,420</p>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
