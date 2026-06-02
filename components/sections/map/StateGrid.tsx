"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { STATES } from "@/data/map";
import type { StateDatum, StateRegion } from "@/data/map";

type Region = "all" | StateRegion;
type Sort = "builders" | "guilds" | "events" | "az";

export function StateGrid() {
  const [region, setRegion] = useState<Region>("all");
  const [sort, setSort] = useState<Sort>("builders");
  const [query, setQuery] = useState("");

  const filtered = useMemo<StateDatum[]>(() => {
    let list = STATES;
    if (region !== "all") list = list.filter((s) => s.region === region);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.landmark.toLowerCase().includes(q));
    }
    if (sort === "builders") list = [...list].sort((a, b) => b.builders - a.builders);
    else if (sort === "guilds") list = [...list].sort((a, b) => b.guilds - a.guilds);
    else if (sort === "events") list = [...list].sort((a, b) => b.events - a.events);
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [region, sort, query]);

  return (
    <section className="px-6 md:px-10 py-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="sticky top-[64px] z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-3 glass-dark border-y border-sd-wine-500/30 mb-6">
          <div className="mx-auto max-w-[1440px] flex flex-wrap items-center gap-2">
            <Chip active={region === "all"} onClick={() => setRegion("all")}>all regions</Chip>
            <Chip active={region === "peninsular"} onClick={() => setRegion("peninsular")}>peninsular</Chip>
            <Chip active={region === "borneo"} onClick={() => setRegion("borneo")}>borneo</Chip>
            <Chip active={region === "federal"} onClick={() => setRegion("federal")}>kl / putrajaya</Chip>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="[? search state / landmark →]"
              className="ml-auto font-mono text-[11px] uppercase tracking-widest bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft placeholder:text-sd-ink-soft/40 focus:outline-none focus:border-sd-neon w-full md:w-72"
            />
            <select
              aria-label="Sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft focus:outline-none focus:border-sd-neon"
            >
              <option value="builders">builders</option>
              <option value="guilds">guilds</option>
              <option value="events">events</option>
              <option value="az">a-z</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {filtered.map((s) => (
            <Link
              key={s.code}
              href={`/map/${s.slug}`}
              className="group relative border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 transition-all duration-200 hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">{s.code}</p>
              <p className="mt-1 font-pixel uppercase text-lg text-sd-ink-strong leading-tight">{s.name}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">{s.landmark}</p>
              <p className="mt-3 font-pixel text-2xl text-sd-ink-strong">{s.builders}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/50">builders</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft group-hover:text-sd-neon">
                [&gt; view →]
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
