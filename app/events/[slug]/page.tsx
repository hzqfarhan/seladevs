import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BracketLink } from "@/components/ui/BracketLink";
import { EVENTS } from "@/data/events";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = EVENTS.find((x) => x.slug === slug);
  if (!e) return { title: "not found" };
  return { title: e.title, description: e.description };
}

function buildIcsText(e: typeof EVENTS[number]) {
  const dt = (iso: string) =>
    iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "").replace(/([+-]\d{2})(\d{2})$/, "$1$2");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SelaDevs//Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.slug}@seladevs.com`,
    `DTSTAMP:${dt(new Date().toISOString())}`,
    `DTSTART:${dt(e.start)}`,
    `DTEND:${dt(e.end)}`,
    `SUMMARY:${e.title}`,
    `DESCRIPTION:${e.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${e.venue.name} · ${e.venue.city}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = EVENTS.find((x) => x.slug === slug);
  if (!e) notFound();

  const start = new Date(e.start);
  const end = new Date(e.end);
  const isPast = end.getTime() < Date.now();
  const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcsText(e))}`;

  return (
    <>
      <Header />
      <main>
        <section className="px-6 md:px-10 pt-24 md:pt-32 pb-8">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;{e.category} · {e.venue.mode}&gt;
            </p>
            <h1 className="mt-3 font-pixel uppercase text-4xl md:text-6xl text-sd-ink-strong leading-[0.95]">
              {e.title}
            </h1>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-widest text-sd-ink-soft/70">
              {start.toLocaleString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              {" · "}
              {start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}–
              {end.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} MYT
            </p>
            <p className="mt-1 font-mono text-[12px] uppercase tracking-widest text-sd-neon-soft">
              {e.venue.name} · {e.venue.city}
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6">
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
            <div>
              <p className="text-sd-ink-soft/90 leading-relaxed">{e.description}</p>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;agenda&gt;
              </p>
              <ol className="mt-3 space-y-1.5">
                {e.agenda.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm text-sd-ink-soft/90">
                    <span className="font-mono text-[11px] text-sd-neon-soft w-14 shrink-0">{a.time}</span>
                    <span>{a.label}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
                &lt;speakers&gt;
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {e.speakers.map((s) => (
                  <a
                    key={s.handle}
                    href={`/members/${s.handle}`}
                    className="flex items-center gap-3 border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-xl p-3 hover:border-sd-neon/70 transition-colors"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel uppercase text-sd-neon">
                      {s.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm text-sd-ink-strong">{s.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">@{s.handle} · {s.role}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <aside className="space-y-3">
              <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">location</p>
                <p className="mt-2 font-pixel text-xl text-sd-ink-strong">{e.venue.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/60">
                  {e.venue.city} · {e.venue.mode}
                </p>
                <a
                  href={icsHref}
                  download={`${e.slug}.ics`}
                  className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/50 text-sd-neon-soft rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon transition-colors"
                >
                  [ add to calendar ]
                </a>
              </div>

              {isPast ? (
                <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">past event</p>
                  <p className="mt-2 text-sm text-sd-ink-soft/80">
                    this event has ended. the recording will land here soon.
                  </p>
                  <button
                    type="button"
                    disabled
                    title="coming soon"
                    className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-ink-soft/40 rounded-full px-3 py-1.5 cursor-not-allowed"
                  >
                    [ watch recording · coming soon ]
                  </button>
                </div>
              ) : (
                <div className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">capacity</p>
                  <p className="mt-2 font-pixel text-2xl text-sd-ink-strong">
                    {e.rsvps}<span className="text-sd-ink-soft/40 text-base">/{e.capacity}</span>
                  </p>
                  <BracketLink href={`/events/${e.slug}#rsvp`}>[&gt; rsvp above]</BracketLink>
                </div>
              )}

              <div className="pt-2">
                <BracketLink href="/events">[&gt; all events]</BracketLink>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
