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
  description: "the forge for UTHM's future builders.",
};

const PILLARS = [
  {
    eyebrow: "<open by default>",
    title: "open by default",
    body: "everything we build is MIT-licensed. the showcase, the bounty board, the leaderboard, the townhall — all open. fork the site and ship your own version in a weekend.",
  },
  {
    eyebrow: "<paid to ship>",
    title: "paid to ship",
    body: "we do bounties in RM, not exposure. the median payout is RM 600, the largest is RM 1,200, and the merge-to-payout window is under 14 days. FYP-grade work is welcome.",
  },
  {
    eyebrow: "<find your crew>",
    title: "find your crew",
    body: "circles (formerly guilds) are faculty-rooted working groups with a weekly cadence and a public mission. you ship alongside people at FSKTM, FKMP, FKE, FKAAS, FPTV, FSTI, FPM on problems you actually care about.",
  },
];

const RULES = [
  "ship something every sprint. anything. even a typo fix.",
  "review at least 1 PR that isn't yours.",
  "don't be a jerk. we have plenty of room for sharp opinions and zero room for rudeness.",
  "public channels, public work. unless it's a private security concern.",
  "payouts are for shipped work, not for 'contributing to the discussion.'",
  "if you can't attend a sprint, ping the lead. silent absence is the only way to get removed from a circle.",
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
                  a community-run platform for builders at Universiti Tun Hussein Onn Malaysia. we ship open source, we pay bounties in Ringgit, and we run on the energy of UTHM students, lecturers, and clubs who would rather build than talk.
                </p>
              </div>
              <StatRow
                cols={4}
                items={[
                  { label: "builders", value: 1200 },
                  { label: "faculties", value: 7 },
                  { label: "payouts", prefix: "RM ", value: 4800, suffix: "+" },
                  { label: "bounties", value: 18 },
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
            <h2 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">campus talent is real. the shipping infrastructure is not.</h2>
            <div className="mt-4 space-y-3 text-sd-ink-soft/90 leading-relaxed">
              <p>
                most engineering programs produce good code in private repos. FYPs are graded and shelved. student clubs run on enthusiasm, not infrastructure. lecturers want OSS, but there is no path to publish it. the result: a campus full of builders whose work never leaves Parit Raja.
              </p>
              <p>
                we think that is a problem. UTHM has the talent — 1,200+ builders across FSKTM, FKMP, FKE, FKAAS, FPTV, FSTI, FPM are already proving it. the <em>infrastructure</em> for "ship something together, get paid, and have it count" is what we are building here.
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
                { label: "active builders", value: 1200 },
                { label: "faculties", value: 7 },
                { label: "active circles", value: 12 },
                { label: "events / yr", value: 12 },
                { label: "RM paid out", prefix: "RM ", value: 4800, suffix: "+" },
                { label: "bounties paid", value: 18 },
                { label: "RM open", prefix: "RM ", value: 2200 },
                { label: "median TTFPR", value: "9d" },
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
                <h3 className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong">join a circle</h3>
                <p className="mt-2 text-sm text-sd-ink-soft/85">12 faculty-rooted circles, weekly cadence, real shipping. pick one that matches your stack.</p>
                <div className="mt-3">
                  <Link href="/guilds" className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors inline-block">
                    [ browse circles → ]
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
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">for industry</p>
                <h3 className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong">sponsor a bounty</h3>
                <p className="mt-2 text-sm text-sd-ink-soft/85">fund RM-denominated student bounties. 1,200 UTHM builders. 7 faculties. real shipping, public rubric.</p>
                <div className="mt-3">
                  <Link href="/for-industry" className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors inline-block">
                    [ sponsor the forge → ]
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
