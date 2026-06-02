import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BracketLink } from "@/components/ui/BracketLink";
import { BentoCard } from "@/components/ui/BentoCard";
import { StatRow } from "@/components/ui/StatRow";
import { GOV_CASE_STUDIES } from "@/data/govCaseStudies";

export const metadata: Metadata = {
  title: "for government",
  description: "SelaDevs as a partner for SEA public-sector digital initiatives.",
};

const HOW_WE_HELP = [
  {
    eyebrow: "<talent>",
    title: "talent pipeline",
    body: "we surface SEA builders to your team, with a public reputation score, a portfolio, and verified skill claims. no resumes, no recruiters, no agency.",
  },
  {
    eyebrow: "<prototype>",
    title: "rapid prototyping",
    body: "6 to 12 week engagements where 3 to 5 SelaDevs members ship a working prototype of a public-sector tool, with public code and a hand-off plan. fixed price, fixed scope.",
  },
  {
    eyebrow: "<sustainable>",
    title: "sustainable OSS",
    body: "we help your team adopt open-source-by-default procurement. the tools we ship are MIT-licensed, the data is yours, and the community can maintain the code after we hand off.",
  },
];

const ENGAGEMENT = [
  {
    eyebrow: "<bounty bank>",
    title: "bounty bank",
    body: "pre-fund an amount (typically RM 50k+). we publish your specs as a public bounty board. the community claims, ships, and gets paid on PR merge.",
  },
  {
    eyebrow: "<embedded>",
    title: "embedded squad",
    body: "3 to 5 SelaDevs members seconded to your team for 3 months. they ship to your stack, your repos, your cadence. we handle payroll, you handle access.",
  },
  {
    eyebrow: "<open rfp>",
    title: "open RFP",
    body: "we publish your RFP as a public bounty board, open to all SEA builders. the bids come with public reputation, public portfolio, and a public rubric. you pick, we contract.",
  },
];

const GUARDRAILS = [
  "open source by default · MIT or Apache 2.0, no exceptions",
  "public roadmap · milestones posted on /changelog within 7 days of kickoff",
  "no lock-in · the data is yours, the code is yours, the deploy is yours",
  "code-of-conduct enforced · the security sentinels guild arbitrates disputes",
  "security sentinels review · every line of public-sector code gets a second-eyes review",
];

export default function ForGovernmentPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "for government" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-6">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  &lt;for government&gt;
                </p>
                <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
                  ## build with the forge
                </h1>
                <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
                  1,751 builders. 13 states. a public-good ethos. ship citizen-facing tools in weeks, not years.
                </p>
              </div>
              <StatRow
                cols={3}
                items={[
                  { label: "states reached", value: 13 },
                  { label: "builders reachable", value: "1,751" },
                  { label: "avg bounty turnaround", value: "4d" },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;how we help&gt;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {HOW_WE_HELP.map((c) => (
                <BentoCard key={c.title} clip withCorner>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{c.eyebrow}</p>
                  <h3 className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong leading-tight">{c.title}</h3>
                  <p className="mt-2 text-sm text-sd-ink-soft/85">{c.body}</p>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;case studies&gt;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {GOV_CASE_STUDIES.map((cs) => (
                <BentoCard key={cs.id} clip withCorner>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-sd-amber">{cs.client}</p>
                  <h3 className="mt-1 font-pixel uppercase text-xl text-sd-ink-strong leading-tight">{cs.title}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">
                    {cs.timeline} · {cs.outcome}
                  </p>
                  <p className="mt-2 text-sm text-sd-ink-soft/85 line-clamp-4">{cs.body}</p>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;engagement models&gt;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ENGAGEMENT.map((c) => (
                <BentoCard key={c.title} clip withCorner>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{c.eyebrow}</p>
                  <h3 className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong leading-tight">{c.title}</h3>
                  <p className="mt-2 text-sm text-sd-ink-soft/85">{c.body}</p>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;guardrails&gt;
            </p>
            <BentoCard clip withCorner>
              <ul className="space-y-1.5 text-sm text-sd-ink-soft/85">
                {GUARDRAILS.map((g) => (
                  <li key={g} className="flex gap-2">
                    <span aria-hidden className="text-sd-neon">·</span>
                    {g}
                  </li>
                ))}
              </ul>
            </BentoCard>
          </div>
        </section>

        <section className="px-6 md:px-10 py-10">
          <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <BracketLink href="/">[&gt; back to home]</BracketLink>
            <Link
              href="/contact?topic=partnership"
              className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-4 py-2.5 hover:bg-sd-wine-700/30 transition-colors"
            >
              [ schedule a briefing ]
            </Link>
            <Link
              href="/showcase"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft hover:text-sd-neon"
            >
              [&gt; see past work]
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
