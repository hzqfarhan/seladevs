"use client";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Chip } from "@/components/ui/Chip";
import { MemberCard } from "./MemberCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { MEMBERS, MEMBER_ROLES, MEMBER_STATES } from "@/data/members";
import type { Member, MemberRole, MemberState } from "@/data/members";

type View = "grid" | "list";
type Sort = "rank" | "name" | "joined";

export function MembersExplorer() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [role, setRole] = useState<MemberRole | "all">("all");
  const [state, setState] = useState<MemberState | "all">("all");
  const [sort, setSort] = useState<Sort>("rank");
  const [view, setView] = useState<View>("grid");

  useEffect(() => {
    const r = sp.get("role") as MemberRole | null;
    const s = sp.get("state") as MemberState | null;
    const v = sp.get("view") as View | null;
    const so = sp.get("sort") as Sort | null;
    if (r && (MEMBER_ROLES as string[]).includes(r)) setRole(r);
    if (s && (MEMBER_STATES as string[]).includes(s)) setState(s);
    if (v === "list" || v === "grid") setView(v);
    if (so === "rank" || so === "name" || so === "joined") setSort(so);
  }, [sp]);

  function pushUrl(next: { role?: string; state?: string; view?: string; sort?: string }) {
    const params = new URLSearchParams(sp.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (!v || v === "all") params.delete(k);
      else params.set(k, v);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const filtered = useMemo<Member[]>(() => {
    let list = MEMBERS;
    if (role !== "all") list = list.filter((m) => m.role === role);
    if (state !== "all") list = list.filter((m) => m.state === state);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (m) =>
          m.handle.toLowerCase().includes(q) ||
          m.name.toLowerCase().includes(q) ||
          m.stack.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (sort === "name") list = [...list].sort((a, b) => a.handle.localeCompare(b.handle));
    else if (sort === "joined") list = [...list].sort((a, b) => a.joined.localeCompare(b.joined));
    else list = [...list].sort((a, b) => b.stars - a.stars);
    return list;
  }, [query, role, state, sort]);

  return (
    <>
      <div className="sticky top-[64px] z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-3 glass-dark border-y border-sd-wine-500/30">
        <div className="mx-auto max-w-[1440px] flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Chip active={role === "all"} onClick={() => { setRole("all"); pushUrl({ role: "all" }); }}>all roles</Chip>
            {MEMBER_ROLES.map((r) => (
              <Chip key={r} active={role === r} onClick={() => { setRole(r); pushUrl({ role: r }); }}>{r}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip active={state === "all"} onClick={() => { setState("all"); pushUrl({ state: "all" }); }}>all states</Chip>
            {MEMBER_STATES.map((s) => (
              <Chip key={s} active={state === s} onClick={() => { setState(s); pushUrl({ state: s }); }}>{s}</Chip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="[? search handle / name / stack →]"
              className="font-mono text-[11px] uppercase tracking-widest bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft placeholder:text-sd-ink-soft/40 focus:outline-none focus:border-sd-neon w-full md:w-72"
            />
            <select
              aria-label="Sort"
              value={sort}
              onChange={(e) => { setSort(e.target.value as Sort); pushUrl({ sort: e.target.value }); }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft focus:outline-none focus:border-sd-neon"
            >
              <option value="rank">rank</option>
              <option value="name">name</option>
              <option value="joined">joined</option>
            </select>
            <div className="ml-auto flex items-center gap-1">
              <Chip active={view === "grid"} onClick={() => { setView("grid"); pushUrl({ view: "grid" }); }}>[ grid ]</Chip>
              <Chip active={view === "list"} onClick={() => { setView("list"); pushUrl({ view: "list" }); }}>[ list ]</Chip>
            </div>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-10 py-10">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-6">
            [{filtered.length} / {MEMBERS.length} builders]
          </p>

          {filtered.length === 0 ? (
            <EmptyState title="no builders match" body="try clearing filters." />
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((m) => <MemberCard key={m.id} m={m} />)}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((m) => <MemberCard key={m.id} m={m} variant="list" />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
