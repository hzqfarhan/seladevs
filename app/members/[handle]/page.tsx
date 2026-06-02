import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BracketLink } from "@/components/ui/BracketLink";
import { MEMBERS } from "@/data/members";
import { SHOWCASE } from "@/data/showcase";
import { GUILDS } from "@/data/guilds";

export function generateStaticParams() {
  return MEMBERS.map((m) => ({ handle: m.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const m = MEMBERS.find((x) => x.handle === handle);
  if (!m) return { title: "not found" };
  return { title: `@${m.handle}`, description: m.bio };
}

export default async function MemberProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const m = MEMBERS.find((x) => x.handle === handle);
  if (!m) notFound();

  const sorted = [...MEMBERS].sort((a, b) => b.stars - a.stars);
  const rank = sorted.findIndex((x) => x.id === m.id) + 1;
  const memberShowcase = SHOWCASE.filter((s) => s.author.handle === m.handle);
  const leadGuilds = GUILDS.filter((g) => g.lead.handle === m.handle);
  const memberGuilds = GUILDS.filter((g) => g.lead.handle === m.handle || (g.id % 7 === m.id % 7));

  return (
    <>
      <Header />
      <main>
        <section className="px-6 md:px-10 pt-24 md:pt-32 pb-8">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;builders / @{m.handle}&gt;
            </p>

            <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex items-center gap-5">
                <span className="relative grid h-24 w-24 place-items-center rounded-2xl border border-sd-wine-500/40 bg-sd-bg-2 font-pixel text-5xl uppercase text-sd-neon">
                  {m.name.charAt(0)}
                  {m.online && (
                    <span aria-hidden className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-sd-money ring-2 ring-sd-bg-0" />
                  )}
                </span>
                <div>
                  <h1 className="font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong">{m.name}</h1>
                  <p className="font-mono text-[12px] uppercase tracking-widest text-sd-neon-soft">@{m.handle}</p>
                  <p className="mt-2 text-sm text-sd-ink-soft/80 max-w-xl">{m.bio}</p>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-ink-soft/60">
                  wallet · {m.wallet}
                </p>
                <BracketLink href="/members">[&gt; message]</BracketLink>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="stars" value={m.stars} />
              <Stat label="rank" value={`#${rank}`} />
              <Stat label="role" value={m.role} />
              <Stat label="state" value={m.state} />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;stack&gt;
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {m.stack.map((s) => (
                <span key={s} className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-neon-soft rounded-full px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {memberShowcase.length > 0 && (
          <section className="px-6 md:px-10 py-8">
            <div className="mx-auto max-w-[1440px]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;showcase entries&gt;
              </p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {memberShowcase.map((s) => (
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

        {(leadGuilds.length > 0 || memberGuilds.length > 0) && (
          <section className="px-6 md:px-10 py-8">
            <div className="mx-auto max-w-[1440px]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;guilds&gt;
              </p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {leadGuilds.map((g) => (
                  <Link
                    key={g.id}
                    href={`/guilds/${g.slug}`}
                    className="border border-sd-neon/40 bg-sd-wine-700/20 rounded-2xl p-4 hover:border-sd-neon transition-colors"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-sd-amber">lead</p>
                    <p className="mt-1 font-semibold text-sd-ink-strong">{g.name}</p>
                    <p className="text-xs text-sd-ink-soft/70 line-clamp-1 mt-1">{g.tagline}</p>
                  </Link>
                ))}
                {memberGuilds.filter((g) => g.lead.handle !== m.handle).map((g) => (
                  <Link
                    key={g.id}
                    href={`/guilds/${g.slug}`}
                    className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 hover:border-sd-neon/70 transition-colors"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">member</p>
                    <p className="mt-1 font-semibold text-sd-ink-strong">{g.name}</p>
                    <p className="text-xs text-sd-ink-soft/70 line-clamp-1 mt-1">{g.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 md:px-10 py-12">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;joined&gt;
            </p>
            <p className="mt-2 font-pixel text-2xl text-sd-ink-strong">
              {new Date(m.joined).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{label}</p>
      <p className="mt-2 font-pixel text-2xl text-sd-ink-strong">{value}</p>
    </div>
  );
}
