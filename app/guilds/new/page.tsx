import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BracketLink } from "@/components/ui/BracketLink";

export const metadata = { title: "start a guild" };

export default function NewGuildPage() {
  return (
    <>
      <Header />
      <main>
        <section className="px-6 md:px-10 pt-24 md:pt-32 pb-16">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;guilds / new&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase text-4xl md:text-6xl text-sd-ink-strong">
              ## start a guild
            </h1>
            <p className="mt-4 max-w-2xl text-sd-ink-soft/80">
              this page is coming soon. for now, drop us a line at{" "}
              <a
                href="mailto:guilds@seladevs.com"
                className="text-sd-neon hover:text-sd-neon-soft"
              >
                guilds@seladevs.com
              </a>{" "}
              with:
            </p>

            <ul className="mt-6 space-y-2 max-w-2xl text-sm text-sd-ink-soft/90">
              <li>· guild name + 1-line tagline</li>
              <li>· who the lead is and their @handle</li>
              <li>· weekly / biweekly / monthly cadence</li>
              <li>· the first 3-member invite list</li>
              <li>· the first mission (1 sentence)</li>
            </ul>

            <div className="mt-10">
              <BracketLink href="/guilds">[&gt; all guilds]</BracketLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
