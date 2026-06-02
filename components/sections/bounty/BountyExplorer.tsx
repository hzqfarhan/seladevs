"use client";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import Link from "next/link";
import { BOUNTIES, BOUNTY_TRACKS } from "@/data/bounties";
import type { Bounty, BountyStatus, BountyTrack } from "@/data/bounties";

type Sort = "payout" | "newest" | "closing";

function closesIn(iso: string) {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "closed";
  const h = Math.floor(ms / (1000 * 60 * 60));
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

export function BountyExplorer() {
  const [track, setTrack] = useState<BountyTrack | "all">("all");
  const [status, setStatus] = useState<BountyStatus | "all">("all");
  const [sort, setSort] = useState<Sort>("payout");
  const [query, setQuery] = useState("");

  const filtered = BOUNTIES.filter((b) => {
    if (track !== "all" && b.track !== track) return false;
    if (status !== "all" && b.status !== status) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      if (!b.title.toLowerCase().includes(q) && !b.issuer.handle.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  if (sort === "payout") filtered.sort((a, b) => b.payout - a.payout);
  else if (sort === "newest") filtered.sort((a, b) => a.closesAt.localeCompare(b.closesAt));
  else filtered.sort((a, b) => a.closesAt.localeCompare(b.closesAt));

  return (
    <>
      <div className="sticky top-[64px] z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-3 glass-dark border-y border-sd-wine-500/30">
        <div className="mx-auto max-w-[1440px] flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Chip active={track === "all"} onClick={() => setTrack("all")}>all tracks</Chip>
            {BOUNTY_TRACKS.map((t) => (
              <Chip key={t} active={track === t} onClick={() => setTrack(t)}>{t}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip active={status === "all"} onClick={() => setStatus("all")}>all status</Chip>
            {(["open", "closing-soon", "claimed", "judging", "paid"] as BountyStatus[]).map((s) => (
              <Chip key={s} active={status === s} onClick={() => setStatus(s)}>{s}</Chip>
            ))}
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="[? search title or issuer →]"
              className="ml-auto font-mono text-[11px] uppercase tracking-widest bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft placeholder:text-sd-ink-soft/40 focus:outline-none focus:border-sd-neon w-full md:w-72"
            />
            <select
              aria-label="Sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft focus:outline-none focus:border-sd-neon"
            >
              <option value="payout">payout</option>
              <option value="newest">newest</option>
              <option value="closing">closing</option>
            </select>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-10 py-10">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-6">
            [{filtered.length} / {BOUNTIES.length} bounties]
          </p>
          {filtered.length === 0 ? (
            <p className="border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-2xl p-8 text-center text-sd-ink-soft/70">
              no bounties match.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((b) => <BountyCard key={b.id} b={b} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function BountyCard({ b }: { b: Bounty }) {
  const isClosing = b.status === "closing-soon";
  const closes = closesIn(b.closesAt);
  const closesLabel = isClosing ? `closes in ${closes}` : `closes ${closes}`;
  return (
    <Link
      href={`/code/bounty/${b.slug}`}
      className={`relative block border bg-sd-bg-1/60 rounded-2xl p-5 transition-all duration-200 hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)] ${
        isClosing ? "border-sd-amber/60 border-l-4" : "border-sd-wine-500/30"
      }`}
    >
      <span aria-hidden className="absolute right-3 top-3 font-mono text-[10px] text-sd-neon-soft/70 select-none">
        [ + ]
      </span>

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
        [{b.track} / RM {b.payout} / {closesLabel}]
      </p>
      <h3 className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong leading-tight">{b.title}</h3>
      <p className="mt-1 font-mono text-[11px] text-sd-ink-soft/70 line-clamp-1">{b.issuer.handle}</p>

      <div className="mt-4 flex items-end justify-between">
        <p className={`font-pixel text-3xl ${isClosing ? "text-sd-amber" : "text-sd-ink-strong"}`}>
          RM {b.payout}
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft group-hover:text-sd-neon">
          [&gt; claim →]
        </span>
      </div>
    </Link>
  );
}
