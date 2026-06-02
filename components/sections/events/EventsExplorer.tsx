"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Chip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { BracketLink } from "@/components/ui/BracketLink";
import { EVENTS, EVENT_CATEGORIES } from "@/data/events";
import type { EventItem, EventCategory } from "@/data/events";

type View = "list" | "calendar";

const CAT_COLOR: Record<EventCategory, string> = {
  showcase: "#FF2D55",
  hacknight: "#9B5CFF",
  townhall: "#FFB454",
  workshop: "#FF7A93",
  social: "#B01434",
  "bounty-launch": "#FF4D6D",
};

function buildIcs(e: EventItem) {
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

export function EventsExplorer() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [view, setView] = useState<View>("list");
  const [cat, setCat] = useState<EventCategory | "all">("all");
  const [rsvps, setRsvps] = useState<Record<number, boolean>>({});
  const [month, setMonth] = useState<string>("2026-06");
  const [openDay, setOpenDay] = useState<string | null>(null);

  useEffect(() => {
    const v = sp.get("view") as View | null;
    const m = sp.get("month");
    if (v === "calendar" || v === "list") setView(v);
    if (m && /^\d{4}-\d{2}$/.test(m)) setMonth(m);
  }, [sp]);

  useEffect(() => {
    const stored: Record<number, boolean> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith("sd:rsvp:")) {
        stored[Number(k.slice(8))] = true;
      }
    }
    setRsvps(stored);
  }, []);

  function pushUrl(next: { view?: string; month?: string }) {
    const params = new URLSearchParams(sp.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (!v) params.delete(k);
      else params.set(k, v);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function setViewAndUrl(v: View) {
    setView(v);
    pushUrl({ view: v });
  }

  function setMonthAndUrl(m: string) {
    setMonth(m);
    pushUrl({ month: m });
  }

  function toggleRsvp(id: number) {
    const key = `sd:rsvp:${id}`;
    setRsvps((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) localStorage.setItem(key, "1");
      else localStorage.removeItem(key);
      return next;
    });
  }

  const filtered = useMemo<EventItem[]>(
    () => (cat === "all" ? EVENTS : EVENTS.filter((e) => e.category === cat)),
    [cat]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of filtered) {
      const key = e.start.slice(0, 7);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    for (const arr of map.values()) arr.sort((a, b) => a.start.localeCompare(b.start));
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <>
      <div className="sticky top-[64px] z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-3 glass-dark border-y border-sd-wine-500/30">
        <div className="mx-auto max-w-[1440px] flex flex-wrap items-center gap-2">
          <Chip active={cat === "all"} onClick={() => setCat("all")}>all</Chip>
          {EVENT_CATEGORIES.map((c) => (
            <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>
          ))}
          <div className="ml-auto flex items-center gap-1">
            <Chip active={view === "list"} onClick={() => setViewAndUrl("list")}>[ list ]</Chip>
            <Chip active={view === "calendar"} onClick={() => setViewAndUrl("calendar")}>[ calendar ]</Chip>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-10 py-10">
        <div className="mx-auto max-w-[1440px]">
          {filtered.length === 0 ? (
            <EmptyState title="no events match" body="try clearing the category filter." />
          ) : view === "list" ? (
            <ListView grouped={grouped} rsvps={rsvps} onRsvp={toggleRsvp} />
          ) : (
            <CalendarView
              month={month}
              setMonth={setMonthAndUrl}
              events={filtered}
              onDayClick={setOpenDay}
              openDay={openDay}
              onCloseDay={() => setOpenDay(null)}
              rsvps={rsvps}
              onRsvp={toggleRsvp}
            />
          )}
        </div>
      </section>
    </>
  );
}

function ListView({
  grouped,
  rsvps,
  onRsvp,
}: {
  grouped: [string, EventItem[]][];
  rsvps: Record<number, boolean>;
  onRsvp: (id: number) => void;
}) {
  return (
    <div className="space-y-10">
      {grouped.map(([monthKey, list]) => {
        const [y, m] = monthKey.split("-");
        const monthLabel = new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        });
        return (
          <div key={monthKey}>
            <h2 className="font-pixel uppercase text-2xl text-sd-ink-strong mb-4">{monthLabel}</h2>
            <div className="space-y-2">
              {list.map((e) => <EventRow key={e.id} e={e} rsvped={!!rsvps[e.id]} onRsvp={() => onRsvp(e.id)} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EventRow({
  e,
  rsvped,
  onRsvp,
}: {
  e: EventItem;
  rsvped: boolean;
  onRsvp: () => void;
}) {
  const d = new Date(e.start);
  const day = d.getDate();
  const dow = d.toLocaleDateString("en-GB", { weekday: "short" });
  const mon = d.toLocaleDateString("en-GB", { month: "short" });
  const start = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const end = new Date(e.end).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)] transition-all">
      <div className="flex md:flex-col items-center md:items-center gap-2 md:gap-0 md:w-20 shrink-0">
        <span className="font-pixel text-3xl text-sd-ink-strong leading-none">{day}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">{dow}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/50 md:hidden">{mon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <BracketLink href={`/events/${e.slug}`}>{e.title}</BracketLink>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
          {start}–{end} · {e.venue.name} · {e.venue.city} · {e.venue.mode}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className="font-mono text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5"
          style={{ borderColor: CAT_COLOR[e.category] + "99", color: CAT_COLOR[e.category] }}
        >
          {e.category}
        </span>
        <button
          type="button"
          onClick={onRsvp}
          className={`font-mono text-[10px] uppercase tracking-[0.2em] border rounded-full px-3 py-1.5 transition-colors ${
            rsvped
              ? "border-sd-neon text-sd-neon bg-sd-wine-700/30"
              : "border-sd-wine-500/40 text-sd-ink-soft/80 hover:border-sd-neon hover:text-sd-neon"
          }`}
        >
          {rsvped ? "✓ going" : `${e.rsvps}/${e.capacity} rsvp`}
        </button>
      </div>
    </div>
  );
}

function CalendarView({
  month,
  setMonth,
  events,
  onDayClick,
  openDay,
  onCloseDay,
  rsvps,
  onRsvp,
}: {
  month: string;
  setMonth: (m: string) => void;
  events: EventItem[];
  onDayClick: (d: string) => void;
  openDay: string | null;
  onCloseDay: () => void;
  rsvps: Record<number, boolean>;
  onRsvp: (id: number) => void;
}) {
  const [y, m] = month.split("-").map(Number);
  const first = new Date(y, m - 1, 1);
  const last = new Date(y, m, 0);
  const startWeekday = first.getDay();
  const days: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) days.push(null);
  for (let i = 1; i <= last.getDate(); i++) days.push(new Date(y, m - 1, i));

  const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const monthLabel = first.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  function shiftMonth(delta: number) {
    const d = new Date(y, m - 1 + delta, 1);
    setMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-neon-soft rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon"
        >
          [&lt; prev]
        </button>
        <p className="font-pixel uppercase text-2xl text-sd-ink-strong">{monthLabel}</p>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-neon-soft rounded-full px-3 py-1.5 hover:border-sd-neon hover:text-sd-neon"
        >
          [next &gt;]
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/50 px-2 py-1">
            {d}
          </div>
        ))}
        {days.map((d, i) => {
          if (!d) return <div key={i} className="aspect-square" />;
          const k = dayKey(d);
          const dayEvents = events.filter((e) => e.start.slice(0, 10) === k);
          return (
            <button
              key={i}
              type="button"
              onClick={() => dayEvents.length > 0 && onDayClick(k)}
              className={`relative aspect-square border rounded-lg p-1.5 text-left transition-colors ${
                dayEvents.length > 0
                  ? "border-sd-wine-500/40 hover:border-sd-neon cursor-pointer"
                  : "border-sd-wine-500/15 cursor-default"
              } bg-sd-bg-1/40`}
            >
              <span className="font-mono text-[10px] text-sd-ink-soft/70">{d.getDate()}</span>
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex flex-wrap gap-0.5">
                {dayEvents.slice(0, 3).map((e) => (
                  <span
                    key={e.id}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: CAT_COLOR[e.category] }}
                    aria-label={e.category}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {openDay && (
        <DayDrawer
          date={openDay}
          events={events.filter((e) => e.start.slice(0, 10) === openDay)}
          onClose={onCloseDay}
          rsvps={rsvps}
          onRsvp={onRsvp}
        />
      )}
    </div>
  );
}

function DayDrawer({
  date,
  events,
  onClose,
  rsvps,
  onRsvp,
}: {
  date: string;
  events: EventItem[];
  onClose: () => void;
  rsvps: Record<number, boolean>;
  onRsvp: (id: number) => void;
}) {
  if (events.length === 0) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center md:justify-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative w-full md:max-w-lg bg-sd-bg-0 border border-sd-wine-500/50 rounded-t-2xl md:rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 font-mono text-sd-neon-soft hover:text-sd-neon"
        >
          ×
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft">
          &lt;{date}&gt;
        </p>
        <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">
          {events.length} event{events.length > 1 ? "s" : ""}
        </h3>
        <div className="mt-4 space-y-2">
          {events.map((e) => (
            <div key={e.id} className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-xl p-3">
              <BracketLink href={`/events/${e.slug}`}>{e.title}</BracketLink>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">
                {new Date(e.start).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} · {e.venue.city}
              </p>
              <button
                type="button"
                onClick={() => onRsvp(e.id)}
                className={`mt-2 font-mono text-[10px] uppercase tracking-[0.2em] border rounded-full px-2.5 py-1 ${
                  rsvps[e.id]
                    ? "border-sd-neon text-sd-neon bg-sd-wine-700/30"
                    : "border-sd-wine-500/40 text-sd-ink-soft/80 hover:border-sd-neon hover:text-sd-neon"
                }`}
              >
                {rsvps[e.id] ? "✓ going" : "rsvp"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { buildIcs };
