"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { MEMBERS, MEMBER_ROLES, type MemberRole } from "@/data/members";
import type { Member } from "@/data/members";

type Season = "s3" | "all";

function deltaFor(id: number, season: Season): number {
  const seedKey = season === "s3" ? 13 : 7;
  const seed = (id * 7 + seedKey * 13) % 11;
  return seed - 5;
}

export function LeaderboardList() {
  const [season, setSeason] = useState<Season>("s3");
  const [role, setRole] = useState<MemberRole | "all">("all");

  const ranked = useMemo<Member[]>(() => {
    let list = [...MEMBERS];
    if (role !== "all") list = list.filter((m) => m.role === role);
    if (season === "s3") {
      list.sort((a, b) => (b.stars + deltaFor(b.id, "s3") * 12) - (a.stars + deltaFor(a.id, "s3") * 12));
    } else {
      list.sort((a, b) => b.stars - a.stars);
    }
    return list;
  }, [season, role]);

  return (
    <section className="px-6 md:px-10 py-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="sticky top-[64px] z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-3 glass-dark border-y border-sd-wine-500/30 mb-6">
          <div className="mx-auto max-w-[1440px] flex flex-wrap items-center gap-2">
            <Chip active={season === "s3"} onClick={() => setSeason("s3")}>[ season 03 ]</Chip>
            <Chip active={season === "all"} onClick={() => setSeason("all")}>[ all-time ]</Chip>
            <span className="mx-2 text-sd-ink-soft/30">·</span>
            <Chip active={role === "all"} onClick={() => setRole("all")}>all roles</Chip>
            {MEMBER_ROLES.map((r) => (
              <Chip key={r} active={role === r} onClick={() => setRole(r)}>{r}</Chip>
            ))}
          </div>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-4">
          [{ranked.length} builders]
        </p>

        <div className="overflow-x-auto border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sd-wine-500/30">
                <Th>rank</Th>
                <Th>builder</Th>
                <Th>role</Th>
                <Th>state</Th>
                <Th>stars</Th>
                <Th>delta</Th>
                <Th>{" "}</Th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((m, i) => {
                const d = deltaFor(m.id, season);
                return (
                  <tr key={m.handle} className="border-b border-sd-wine-500/15 hover:bg-sd-wine-700/10 transition-colors">
                    <td className="px-4 py-3 font-pixel text-sd-neon-soft">#{i + 1}</td>
                    <td className="px-4 py-3">
                      <Link href={`/members/${m.handle}`} className="flex items-center gap-2 text-sd-ink-strong hover:text-sd-neon">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel text-xs uppercase text-sd-neon">
                          {m.name.charAt(0)}
                        </span>
                        <span>
                          <span className="block font-semibold">{m.name}</span>
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft">@{m.handle}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/70">{m.role}</td>
                    <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/70">{m.state}</td>
                    <td className="px-4 py-3 font-pixel text-lg text-sd-ink-strong">{m.stars}</td>
                    <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest">
                      {d > 0 ? (
                        <span className="text-sd-neon">↑ +{d}</span>
                      ) : d < 0 ? (
                        <span className="text-sd-money">↓ {d}</span>
                      ) : (
                        <span className="text-sd-ink-soft/60">= 0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/members/${m.handle}`}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft hover:text-sd-neon"
                      >
                        [&gt; profile]
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
      {children}
    </th>
  );
}
