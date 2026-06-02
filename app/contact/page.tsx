import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BentoCard } from "@/components/ui/BentoCard";
import { ContactForm } from "@/components/ui/ContactForm";
import { CopyButton } from "@/components/ui/CopyButton";
import { BracketLink } from "@/components/ui/BracketLink";

export const metadata: Metadata = {
  title: "contact",
  description: "general enquiries, partnerships, press, support.",
};

const CHANNELS = [
  { label: "general@seladevs.com", href: "mailto:hello@seladevs.com", best: "everything else" },
  { label: "press@seladevs.com", href: "mailto:press@seladevs.com", best: "media, podcasts, articles" },
  { label: "partnerships@seladevs.com", href: "mailto:partnerships@seladevs.com", best: "company partnerships, sponsors" },
  { label: "security@seladevs.com", href: "mailto:security@seladevs.com", best: "responsible disclosure, abuse" },
  { label: "discord.gg/seladevs", href: "https://discord.gg/seladevs", best: "real-time chat, community" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "contact" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-8">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;contact&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase text-4xl md:text-6xl text-sd-ink-strong">
              ## get in touch
            </h1>
            <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
              we read everything. expect a reply within 24h on weekdays.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
            <ContactForm />
            <div className="space-y-3">
              {CHANNELS.map((c) => (
                <BentoCard key={c.label} clip withCorner className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[12px] text-sd-ink-strong truncate">{c.label}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                      best for · {c.best}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <CopyButton value={c.label} label="copy" />
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1.5 hover:bg-sd-wine-700/30 transition-colors"
                    >
                      [ open ↗ ]
                    </a>
                  </div>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between">
            <BracketLink href="/">[&gt; back to home]</BracketLink>
            <BracketLink href="/about">[&gt; about seladevs]</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
