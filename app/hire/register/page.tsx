import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BracketLink } from "@/components/ui/BracketLink";
import { BentoCard } from "@/components/ui/BentoCard";
import { HireForm } from "@/components/ui/HireForm";

export const metadata: Metadata = {
  title: "post a job",
  description: "register your company and post your first role. verified in 24h.",
};

const STEPS = [
  { n: "01", label: "register", body: "fill the form. takes 4 minutes." },
  { n: "02", label: "verify", body: "we check your SSM registration. 24h." },
  { n: "03", label: "post", body: "go live with your first role. pay on submit." },
];

const WHAT = [
  "manual review of every listing within 24h",
  "salary band audit — we reject underpaid roles",
  "no ghost jobs — closed roles auto-archive within 24h",
  "ATS-style dashboard for managing applicants",
  "monthly report (scale tier) with applicant quality metrics",
];

export default function HireRegisterPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "post a job" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;hire&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
              ## post a job
            </h1>
            <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
              free for OSS roles, RM 299+ for the rest. verified in 24h.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {STEPS.map((s, i) => (
                <BentoCard key={s.n} clip withCorner>
                  <div className="flex items-center gap-3">
                    <span className="font-pixel text-2xl text-sd-amber">{s.n}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-sd-amber">
                      {i === 0 ? "active" : "next"}
                    </span>
                  </div>
                  <h3 className="mt-1 font-pixel uppercase text-xl text-sd-ink-strong">{s.label}</h3>
                  <p className="mt-1 text-sm text-sd-ink-soft/85">{s.body}</p>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
            <HireForm />
            <div className="space-y-3">
              <BentoCard clip withCorner>
                <p className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">what you get</p>
                <ul className="mt-2 space-y-1.5 text-sm text-sd-ink-soft/85">
                  {WHAT.map((w) => (
                    <li key={w} className="flex gap-2">
                      <span aria-hidden className="text-sd-neon">·</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </BentoCard>
              <BentoCard clip withCorner>
                <p className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">what it costs</p>
                <p className="mt-2 text-sm text-sd-ink-soft/85">
                  starter is RM 299/listing, growth is RM 799, scale is RM 1,999. full comparison on the pricing page.
                </p>
                <div className="mt-3">
                  <Link
                    href="/pricing"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-neon-soft rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon transition-colors"
                  >
                    [ see pricing ]
                  </Link>
                </div>
              </BentoCard>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between">
            <BracketLink href="/">[&gt; back to home]</BracketLink>
            <BracketLink href="/jobs">[&gt; job board]</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
