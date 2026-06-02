import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BracketLink } from "@/components/ui/BracketLink";
import { BentoCard } from "@/components/ui/BentoCard";
import { StatRow } from "@/components/ui/StatRow";
import { SDJobsPricing } from "@/components/sections/SDJobsPricing";
import { PRICING_TIERS } from "@/data/pricing";
import { COMPANY_FAQ } from "@/data/companyFaq";

export const metadata: Metadata = {
  title: "for companies",
  description: "post a job to SelaDevs. 24h reply SLA, no ghost listings, verified candidates.",
};

const WHY = [
  {
    eyebrow: "<reach>",
    title: "1,751 builders, all shipping",
    body: "not 1,751 'developers.' 1,751 people who shipped something to production in the last 90 days. the audience is the people, not the resumes.",
  },
  {
    eyebrow: "<honest>",
    title: "salary transparency",
    body: "every job must post a salary. the no-salary filter is the #2 reason candidates skip a listing. we enforce this on the way in.",
  },
  {
    eyebrow: "<no middlemen>",
    title: "no recruiters",
    body: "we do not run a placement agency. no commission, no recruiter cut, no 'intro fee.' just a flat per-listing price and a direct line to candidates.",
  },
];

const WHAT = [
  "manual review of every listing within 24h",
  "salary band audit — we reject underpaid roles",
  "no ghost jobs — closed roles auto-archive within 24h",
  "ATS-style dashboard for managing applicants",
  "monthly report (scale tier) with applicant quality metrics",
];

const HOW = [
  { step: "post", body: "register at /hire/register, post your role. takes 8 minutes." },
  { step: "review", body: "we audit within 24h. salary band, role clarity, no red flags." },
  { step: "match", body: "your role goes live with a featured slot if your tier includes it." },
  { step: "hire", body: "candidates apply direct. you DM them. you hire the right one. we do not take a cut." },
];

export default function ForCompanyPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "for companies" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-6">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  &lt;for companies&gt;
                </p>
                <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
                  ## hire from the forge
                </h1>
                <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
                  1,751 builders, all shipping. 24h reply SLA, no ghost jobs, no recruiters middlemanning.
                </p>
                <div className="mt-5 flex items-center gap-3 flex-wrap">
                  <Link
                    href="/hire/register"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-4 py-2.5 hover:bg-sd-wine-700/30 transition-colors"
                  >
                    [ post a job ]
                  </Link>
                  <Link
                    href="/pricing"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/50 text-sd-neon-soft rounded-full px-4 py-2.5 hover:border-sd-neon hover:text-sd-neon transition-colors"
                  >
                    [ see pricing ]
                  </Link>
                </div>
              </div>
              <StatRow
                cols={2}
                items={[
                  { label: "verified cos", value: "40+" },
                  { label: "median reply", value: "24h" },
                  { label: "ghost jobs", value: "0" },
                  { label: "avg time-to-hire", value: "11d" },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;why us&gt;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {WHY.map((w) => (
                <BentoCard key={w.title} clip withCorner>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{w.eyebrow}</p>
                  <h3 className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong leading-tight">{w.title}</h3>
                  <p className="mt-2 text-sm text-sd-ink-soft/85">{w.body}</p>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;what you get&gt;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {WHAT.map((w, i) => (
                <BentoCard key={i} clip withCorner>
                  <p className="font-pixel text-3xl text-sd-neon-soft/70">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-sm text-sd-ink-soft/90">{w}</p>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;how it works&gt;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {HOW.map((h, i) => (
                <BentoCard key={h.step} clip withCorner>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-sd-amber">{`step ${i + 1}`}</p>
                  <h3 className="mt-1 font-pixel uppercase text-2xl text-sd-ink-strong">{h.step}</h3>
                  <p className="mt-2 text-sm text-sd-ink-soft/85">{h.body}</p>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        <SDJobsPricing />

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;pricing quick look&gt;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRICING_TIERS.map((t) => (
                <BentoCard key={t.id} clip withCorner>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">{t.name}</p>
                  <p className="mt-1 font-pixel text-3xl text-sd-ink-strong">{t.price} <span className="text-sd-ink-soft/40 text-base">{t.duration}</span></p>
                </BentoCard>
              ))}
            </div>
            <div className="mt-3">
              <BracketLink href="/pricing">[&gt; full pricing + comparison table]</BracketLink>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-10">
          <div className="mx-auto max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;faq&gt;
            </p>
            <div className="space-y-2">
              {COMPANY_FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-sd-ink-strong">
                    {f.q}
                    <span aria-hidden className="font-mono text-sd-neon group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-sd-ink-soft/85">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between">
            <BracketLink href="/">[&gt; back to home]</BracketLink>
            <Link
              href="/contact?topic=partnership"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft hover:text-sd-neon"
            >
              [&gt; contact sales]
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
