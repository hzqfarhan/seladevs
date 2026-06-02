import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BracketLink } from "@/components/ui/BracketLink";
import { BentoCard } from "@/components/ui/BentoCard";
import { StatRow } from "@/components/ui/StatRow";
import { NewsletterStrip } from "@/components/ui/NewsletterStrip";

export const metadata: Metadata = {
  title: "manifesto",
  description: "the forge for Malaysia's future builders.",
};

const PILLARS = [
  {
    eyebrow: "<open by default>",
    title: "open by default",
    body: "everything we build is MIT-licensed. the showcase, the bounty board, the leaderboard, the townhall — all open. you can fork the site right now and ship your own version in a weekend.",
  },
  {
    eyebrow: "<paid to ship>",
    title: "paid to ship",
    body: "we do bounties in Ringgit, not exposure. the median payout is RM 600, the largest is RM 1,200, and the merge-to-payout window is under 14 days.",
  },
  {
    eyebrow: "<find your crew>",
    title: "find your crew",
    body: "guilds are themed working groups with a weekly cadence and a public mission. you ship alongside people who are at your level, on problems you actually care about.",
  },
];

const RULES = [
  "ship something every sprint. anything. even a typo fix.",
  "review at least 1 PR that isn't yours.",
  "don't be a jerk. we have plenty of room for sharp opinions and zero room for rudeness.",
  "public channels, public work. unless it's a private security concern.",
  "payouts are for shipped work, not for 'contributing to the discussion.'",
  "if you can't attend a sprint, ping the lead. silent absence is the only way to get removed from a guild.",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "manifesto" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-6">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  &lt;manifesto&gt;
                </p>
                <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
                  ## who we are
                </h1>
                <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
                  a community-run platform for builders in Malaysia and Southeast Asia. we ship open source, we pay bounties in Ringgit, and we run on the energy of people who would rather build than talk.
                </p>
              </div>
              <StatRow
                cols={4}
                items={[
                  { label: "builders", value: 1751 },
                  { label: "states", value: 13 },
                  { label: "payouts", prefix: "RM ", value: 12500, suffix: "+" },
                  { label: "bounties", value: 64 },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;the problem&gt;
            </p>
            <h2 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">SEA dev culture is 10 years behind.</h2>
            <div className="mt-4 space-y-3 text-sd-ink-soft/90 leading-relaxed">
              <p>
                most of the SEA dev scene is one of three things: a bootcamp that teaches React but not Rust, a consultancy that bills clients but does not build anything in public, or a corporate engineering team that has not shipped to OSS in 5 years. there is almost no middle ground.
              </p>
              <p>
                we think that is a problem. the SEA dev scene has the talent — we have 1,751 builders on this platform who prove it every week — but the <em>infrastructure</em> for "ship something together" does not exist outside of a few elite teams in SG.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;the forge&gt;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PILLARS.map((p) => (
                <BentoCard key={p.title} clip withCorner>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{p.eyebrow}</p>
                  <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">{p.title}</h3>
                  <p className="mt-2 text-sm text-sd-ink-soft/85">{p.body}</p>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;how we operate&gt;
            </p>
            <h2 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">six rules. that's it.</h2>
            <ol className="mt-4 space-y-2 text-sd-ink-soft/90 list-none">
              {RULES.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-pixel text-sd-neon-soft shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;the numbers&gt;
            </p>
            <StatRow
              cols={4}
              items={[
                { label: "active builders", value: 1751 },
                { label: "states", value: 13 },
                { label: "active guilds", value: 24 },
                { label: "events / yr", value: 24 },
                { label: "RM paid out", prefix: "RM ", value: 12500, suffix: "+" },
                { label: "bounties paid", value: 64 },
                { label: "RM open", prefix: "RM ", value: 6400 },
                { label: "median TTFPR", value: "11d" },
              ]}
            />
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;join us&gt;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <BentoCard clip withCorner>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">for builders</p>
                <h3 className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong">join a guild</h3>
                <p className="mt-2 text-sm text-sd-ink-soft/85">24 themed working groups, weekly cadence, real shipping. pick one that matches your stack.</p>
                <div className="mt-3">
                  <Link href="/guilds" className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors inline-block">
                    [ browse guilds → ]
                  </Link>
                </div>
              </BentoCard>
              <BentoCard clip withCorner>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">for earners</p>
                <h3 className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong">claim a bounty</h3>
                <p className="mt-2 text-sm text-sd-ink-soft/85">8 open bounties, RM 350 to RM 1,200, public rubric. claim, ship, get paid on merge.</p>
                <div className="mt-3">
                  <Link href="/code/bounty" className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors inline-block">
                    [ open bounty board → ]
                  </Link>
                </div>
              </BentoCard>
              <BentoCard clip withCorner>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">for companies</p>
                <h3 className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong">post a job</h3>
                <p className="mt-2 text-sm text-sd-ink-soft/85">1,751 builders, all shipping. 24h reply SLA, no ghost jobs, no recruiter cuts.</p>
                <div className="mt-3">
                  <Link href="/for-company" className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors inline-block">
                    [ hire from the forge → ]
                  </Link>
                </div>
              </BentoCard>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-10">
          <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-t border-sd-wine-500/20 pt-6">
            <BracketLink href="/">[&gt; back to home]</BracketLink>
            <NewsletterStrip />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
