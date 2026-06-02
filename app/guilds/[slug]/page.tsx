import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BracketLink } from "@/components/ui/BracketLink";
import { GUILDS } from "@/data/guilds";
import { SHOWCASE } from "@/data/showcase";
import { MEMBERS } from "@/data/members";

export function generateStaticParams() {
  return GUILDS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = GUILDS.find((x) => x.slug === slug);
  if (!g) return { title: "not found" };
  return { title: g.name, description: g.tagline };
}

export default async function GuildDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = GUILDS.find((x) => x.slug === slug);
  if (!g) notFound();

  const memberHandles = [g.lead.handle, ...MEMBERS.filter((m) => m.id % 3 === g.id % 3).slice(0, 7).map((m) => m.handle)];
  const uniqueMembers = Array.from(new Set(memberHandles));
  const memberObjects = MEMBERS.filter((m) => uniqueMembers.includes(m.handle));
  const guildShowcase = SHOWCASE.filter((s) => uniqueMembers.includes(s.author.handle));
  const sessions = g.nextSession
    ? [0, 7, 14].map((d) => {
        const base = new Date(g.nextSession!);
        base.setDate(base.getDate() + d);
        return base;
      })
    : [];

  return (
    <>
      <Header />
      <main>
        <section className="px-6 md:px-10 pt-24 md:pt-32 pb-8">
          <div className="mx-auto max-w-[1440px]">
            <div
              aria-hidden
              className="h-32 rounded-2xl mb-6"
              style={{ background: `linear-gradient(135deg, ${g.banners[0]}, ${g.banners[1]})` }}
            />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                  &lt;{g.category} · {g.cadence}&gt;
                </p>
                <h1 className="mt-3 font-pixel uppercase text-4xl md:text-6xl text-sd-ink-strong">
                  {g.name}
                </h1>
                <p className="mt-3 text-sd-ink-soft/80 max-w-2xl">{g.tagline}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-sd-neon-soft">
                  lead · @{g.lead.handle} · {g.members}/{g.maxMembers} members · {g.recruiting ? "recruiting" : "closed"}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <button
                  type="button"
                  disabled={!g.recruiting}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-4 py-2 hover:bg-sd-wine-700/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  [ {g.recruiting ? "apply to join" : "closed"} → ]
                </button>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                  {g.links.discord && <a href={g.links.discord} className="text-sd-neon-soft hover:text-sd-neon">[ discord ]</a>}
                  {g.links.github && <a href={g.links.github} className="text-sd-neon-soft hover:text-sd-neon">[ github ]</a>}
                  {g.links.manifesto && <a href={g.links.manifesto} className="text-sd-neon-soft hover:text-sd-neon">[ manifesto ]</a>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;current mission&gt;
            </p>
            <p className="mt-3 max-w-3xl text-sd-ink-soft/90">{g.mission}</p>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;members&gt;
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {memberObjects.map((m) => (
                <Link
                  key={m.handle}
                  href={`/members/${m.handle}`}
                  className="flex flex-col items-center gap-1 border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-xl p-2 hover:border-sd-neon transition-colors"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel text-sm uppercase text-sd-neon">
                    {m.name.charAt(0)}
                  </span>
                  <span className="font-mono text-[10px] text-sd-neon-soft truncate w-full text-center">@{m.handle}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {guildShowcase.length > 0 && (
          <section className="px-6 md:px-10 py-8">
            <div className="mx-auto max-w-[1440px]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
                &lt;recent showcase&gt;
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {guildShowcase.map((s) => (
                  <Link
                    key={s.id}
                    href={`/showcase#${s.slug}`}
                    className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 hover:border-sd-neon/70 transition-colors"
                  >
                    <p className="font-semibold text-sd-ink-strong">{s.title}</p>
                    <p className="text-xs text-sd-ink-soft/70 line-clamp-2 mt-1">{s.oneLiner}</p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">
                      ★ {s.stars} · {s.tags[0]}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;code of conduct&gt;
            </p>
            <ul className="space-y-1 text-sm text-sd-ink-soft/85">
              <li>· ship something every sprint. anything. even a typo fix.</li>
              <li>· review at least 1 PR that isn't yours.</li>
              <li>· don't be a jerk. we have plenty of room for sharp opinions and zero room for rudeness.</li>
              <li>· public channels, public work. unless it's a private security concern.</li>
            </ul>
          </div>
        </section>

        {sessions.length > 0 && (
          <section className="px-6 md:px-10 py-8 pb-16">
            <div className="mx-auto max-w-[1440px]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
                &lt;next sessions&gt;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sessions.map((d, i) => (
                  <div key={i} className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">
                      {i === 0 ? "next" : i === 1 ? "+1 week" : "+2 weeks"}
                    </p>
                    <p className="mt-2 font-pixel text-2xl text-sd-ink-strong">
                      {d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/60 mt-1">
                      {d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} MYT
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px]">
            <BracketLink href="/guilds">[&gt; all guilds]</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
