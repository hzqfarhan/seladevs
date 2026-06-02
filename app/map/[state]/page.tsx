import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BracketLink } from "@/components/ui/BracketLink";
import { BentoCard } from "@/components/ui/BentoCard";
import { STATES } from "@/data/map";
import { GUILDS } from "@/data/guilds";
import { JOBS } from "@/data/jobs";
import { EVENTS } from "@/data/events";
import { MEMBERS } from "@/data/members";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const s = STATES.find((x) => x.slug === state);
  if (!s) return { title: "not found" };
  return { title: s.name, description: `${s.builders} builders across ${s.name} · ${s.landmark}` };
}

export default async function StateDetailPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = STATES.find((x) => x.slug === state);
  if (!s) notFound();

  const guilds = GUILDS.filter((g) => g.id % 3 === s.code.length % 3);
  const jobs = JOBS.filter((j) => s.name === "Kuala Lumpur" ? j.location.toLowerCase().includes("kl") || j.location.toLowerCase().includes("kuala") : j.location.toLowerCase().includes(s.name.toLowerCase().split(" ")[0]));
  const events = EVENTS.filter((e) => e.venue.city === s.name || (s.name === "Kuala Lumpur" && e.venue.city === "KL"));
  const builders = [...MEMBERS].sort((a, b) => b.stars - a.stars).slice(0, 6);

  return (
    <>
      <Header />
      <main>
        <section className="px-6 md:px-10 pt-24 md:pt-32 pb-8">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;{s.code} · {s.region}&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase text-4xl md:text-6xl text-sd-ink-strong">
              {s.name}
            </h1>
            <p className="mt-3 font-mono text-[12px] uppercase tracking-widest text-sd-ink-soft/60">
              landmark · {s.landmark}
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-6">
          <div className="mx-auto max-w-[1440px] grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="builders" value={s.builders} />
            <Stat label="guilds" value={s.guilds} />
            <Stat label="jobs" value={s.jobs} />
            <Stat label="events" value={s.events} />
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;active guilds here&gt;
            </p>
            {guilds.length === 0 ? (
              <p className="text-sm text-sd-ink-soft/70">no active guilds in this region yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {guilds.map((g) => (
                  <Link
                    key={g.id}
                    href={`/guilds/${g.slug}`}
                    className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 hover:border-sd-neon/70 transition-colors"
                  >
                    <p className="font-semibold text-sd-ink-strong">{g.name}</p>
                    <p className="text-xs text-sd-ink-soft/70 line-clamp-2 mt-1">{g.tagline}</p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">
                      {g.members}/{g.maxMembers} members · {g.category}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;open jobs here&gt;
            </p>
            {jobs.length === 0 ? (
              <p className="text-sm text-sd-ink-soft/70">no open jobs in this region right now.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {jobs.map((j) => (
                  <Link
                    key={j.id}
                    href={`/jobs/${j.slug}`}
                    className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 hover:border-sd-neon/70 transition-colors"
                  >
                    <p className="font-semibold text-sd-ink-strong">{j.title}</p>
                    <p className="text-xs text-sd-ink-soft/70">{j.company}</p>
                    <p className="mt-3 font-pixel text-lg text-sd-ink-strong">{j.salary}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;upcoming events&gt;
            </p>
            {events.length === 0 ? (
              <p className="text-sm text-sd-ink-soft/70">no upcoming events in this region right now.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {events.map((e) => (
                  <Link
                    key={e.id}
                    href={`/events/${e.slug}`}
                    className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 hover:border-sd-neon/70 transition-colors"
                  >
                    <p className="font-semibold text-sd-ink-strong">{e.title}</p>
                    <p className="text-xs text-sd-ink-soft/70 mt-1">
                      {new Date(e.start).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} · {e.venue.name}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-6 md:px-10 py-6 pb-16">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-3">
              &lt;notable builders&gt;
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {builders.map((m) => (
                <Link
                  key={m.handle}
                  href={`/members/${m.handle}`}
                  className="flex flex-col items-center gap-1 border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-xl p-3 hover:border-sd-neon transition-colors"
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

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px]">
            <BracketLink href="/map">[&gt; back to map]</BracketLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <BentoCard clip withCorner className="text-center">
      <p className="font-pixel text-3xl text-sd-ink-strong">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">{label}</p>
    </BentoCard>
  );
}
