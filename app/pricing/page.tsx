import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BracketLink } from "@/components/ui/BracketLink";
import { BentoCard } from "@/components/ui/BentoCard";
import { PRICING_TIERS, PRICING_FEATURES, PRICING_FAQ } from "@/data/pricing";

export const metadata: Metadata = {
  title: "sponsorship",
  description: "transparent sponsorship tiers for UTHM Forge. no commissions, no recruiter cuts.",
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "pricing" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;pricing&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase leading-[0.95] text-4xl md:text-6xl text-sd-ink-strong">
              ## sponsorship
            </h1>
            <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
              one flat fee per month, per sponsor. no commissions, no recruiter cuts, no hidden charges. students, clubs, and OSS maintainers are always free.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-3 gap-3">
            {PRICING_TIERS.map((t) => (
              <BentoCard
                key={t.id}
                clip
                withCorner
                className={`flex flex-col ${t.featured ? "border-sd-neon/60 glow-wine" : ""}`}
              >
                {t.featured && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-sd-neon mb-1">
                    · most popular ·
                  </p>
                )}
                <p className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">
                  {t.name}
                </p>
                <p className="mt-2 font-pixel text-4xl text-sd-ink-strong">{t.price}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/50">
                  {t.duration}
                </p>
                <ul className="mt-5 space-y-1.5 text-sm text-sd-ink-soft/85 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span aria-hidden className="text-sd-neon">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={t.ctaHref}
                  className={`mt-5 block text-center font-mono text-[10px] uppercase tracking-[0.2em] border rounded-full px-3 py-2 transition-colors ${
                    t.featured
                      ? "border-sd-neon text-sd-neon hover:bg-sd-wine-700/30"
                      : "border-sd-wine-500/50 text-sd-neon-soft hover:border-sd-neon hover:text-sd-neon"
                  }`}
                >
                  [ {t.cta} → ]
                </Link>
              </BentoCard>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 py-10">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;feature comparison&gt;
            </p>
            <div className="overflow-x-auto border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-2xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sd-wine-500/30">
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">feature</th>
                    <th className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">student club</th>
                    <th className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon">faculty sponsor</th>
                    <th className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">industry sponsor</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_FEATURES.map((row) => (
                    <tr key={row.label} className="border-b border-sd-wine-500/15">
                      <td className="px-4 py-2.5 text-sd-ink-soft/85">{row.label}</td>
                      <td className="px-4 py-2.5 text-center font-mono text-sd-ink-soft/80">{row.club}</td>
                      <td className="px-4 py-2.5 text-center font-mono text-sd-ink-strong">{row.faculty}</td>
                      <td className="px-4 py-2.5 text-center font-mono text-sd-ink-soft/80">{row.industry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <BentoCard clip withCorner className="text-center max-w-2xl mx-auto">
              <p className="font-mono text-[10px] uppercase tracking-widest text-sd-amber">non-profit / open-source</p>
              <p className="mt-2 text-sm text-sd-ink-soft/85">
                we post OSS maintainer roles for free, forever. email{" "}
                <a href="mailto:oss@seladevs.com" className="text-sd-neon hover:text-sd-neon-soft">oss@seladevs.com</a>{" "}
                with the repo URL and the role.
              </p>
            </BentoCard>
          </div>
        </section>

        <section className="px-6 md:px-10 py-10">
          <div className="mx-auto max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;faq&gt;
            </p>
            <div className="space-y-2">
              {PRICING_FAQ.map((f) => (
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
            <BracketLink href="/contact?topic=partnership">[&gt; contact sales]</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
