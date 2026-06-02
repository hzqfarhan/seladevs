"use client";
import { useMemo, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { GuildCard } from "./GuildCard";
import { GUILDS, GUILD_CATEGORIES } from "@/data/guilds";
import type { Guild, GuildCategory, GuildCadence } from "@/data/guilds";

type Sort = "members" | "recent" | "az";
type RecruitingFilter = "all" | "recruiting" | "closed";

export function GuildsExplorer() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<GuildCategory | "all">("all");
  const [rec, setRec] = useState<RecruitingFilter>("all");
  const [cad, setCad] = useState<GuildCadence | "all">("all");
  const [sort, setSort] = useState<Sort>("members");

  const filtered = useMemo<Guild[]>(() => {
    let list = GUILDS.filter((g) => g.slug !== "edge-runners");
    if (cat !== "all") list = list.filter((g) => g.category === cat);
    if (rec === "recruiting") list = list.filter((g) => g.recruiting);
    if (rec === "closed") list = list.filter((g) => !g.recruiting);
    if (cad !== "all") list = list.filter((g) => g.cadence === cad);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (g) => g.name.toLowerCase().includes(q) || g.lead.handle.toLowerCase().includes(q)
      );
    }
    if (sort === "members") list = [...list].sort((a, b) => b.members - a.members);
    else if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query, cat, rec, cad, sort]);

  return (
    <>
      <div className="sticky top-[64px] z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-3 glass-dark border-y border-sd-wine-500/30">
        <div className="mx-auto max-w-[1440px] flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Chip active={cat === "all"} onClick={() => setCat("all")}>all</Chip>
            {GUILD_CATEGORIES.map((c) => (
              <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip active={rec === "all"} onClick={() => setRec("all")}>all status</Chip>
            <Chip active={rec === "recruiting"} onClick={() => setRec("recruiting")}>recruiting</Chip>
            <Chip active={rec === "closed"} onClick={() => setRec("closed")}>closed</Chip>
            <span className="mx-2 text-sd-ink-soft/30">·</span>
            <Chip active={cad === "all"} onClick={() => setCad("all")}>all cadence</Chip>
            <Chip active={cad === "weekly"} onClick={() => setCad("weekly")}>weekly</Chip>
            <Chip active={cad === "biweekly"} onClick={() => setCad("biweekly")}>biweekly</Chip>
            <Chip active={cad === "monthly"} onClick={() => setCad("monthly")}>monthly</Chip>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="[? search name or lead →]"
              className="font-mono text-[11px] uppercase tracking-widest bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft placeholder:text-sd-ink-soft/40 focus:outline-none focus:border-sd-neon w-full md:w-72"
            />
            <select
              aria-label="Sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft focus:outline-none focus:border-sd-neon"
            >
              <option value="members">members</option>
              <option value="recent">recent</option>
              <option value="az">a-z</option>
            </select>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-10 py-10">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-6">
            [{filtered.length} guilds]
          </p>
          {filtered.length === 0 ? (
            <EmptyState title="no guilds match" body="try clearing filters." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((g) => <GuildCard key={g.id} g={g} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
