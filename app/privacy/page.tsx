import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Markdown } from "@/components/ui/Markdown";
import { PRIVACY_MD } from "@/data/legal";

export const metadata: Metadata = {
  title: "privacy",
  description: "what data SelaDevs collects, what it doesn't, and your rights.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "privacy" }]} />
      <main>
        <section className="px-6 md:px-10 pt-8 pb-16">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;legal&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase text-4xl md:text-6xl text-sd-ink-strong">
              ## privacy
            </h1>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20">
          <div className="mx-auto max-w-2xl">
            <Markdown source={PRIVACY_MD} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
