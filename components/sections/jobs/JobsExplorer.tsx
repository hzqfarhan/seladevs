"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { JobApplyModal } from "./JobApplyModal";
import { JOBS, JOB_TYPES } from "@/data/jobs";
import type { Job, JobType } from "@/data/jobs";

type Tier = "all" | "<5k" | "5-10k" | "10-20k" | "20k+";
type Sort = "newest" | "high" | "low";
type View = "list" | "table";

function tierOf(salary: string): Tier {
  const nums = salary.match(/\d{1,3}(?:,\d{3})*/g);
  if (!nums) return "all";
  const high = Math.max(...nums.map((n) => Number(n.replace(/,/g, ""))));
  if (high < 5000) return "<5k";
  if (high < 10000) return "5-10k";
  if (high < 20000) return "10-20k";
  return "20k+";
}

function locOf(loc: string): "remote" | "KL" | "Selangor" | "Penang" | "Johor" | "other" {
  if (/remote/i.test(loc)) return "remote";
  if (loc.startsWith("KL") || /kuala/i.test(loc) || /cyberjaya/i.test(loc)) return "KL";
  if (/selangor/i.test(loc) || /pj/i.test(loc)) return "Selangor";
  if (/penang/i.test(loc)) return "Penang";
  if (/johor/i.test(loc)) return "Johor";
  return "other";
}

export function JobsExplorer() {
  const [type, setType] = useState<JobType | "all">("all");
  const [loc, setLoc] = useState<"all" | "remote" | "KL" | "Selangor" | "Penang" | "Johor" | "other">("all");
  const [tier, setTier] = useState<Tier>("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [view, setView] = useState<View>("list");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = useMemo<Job[]>(() => {
    let list = JOBS;
    if (type !== "all") list = list.filter((j) => j.type === type);
    if (loc !== "all") list = list.filter((j) => locOf(j.location) === loc);
    if (tier !== "all") list = list.filter((j) => tierOf(j.salary) === tier);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort === "newest") list = [...list].sort((a, b) => a.postedDays - b.postedDays);
    if (sort === "high" || sort === "low") {
      list = [...list].sort((a, b) => {
        const na = Math.max(...(a.salary.match(/\d+/g) || ["0"]).map(Number));
        const nb = Math.max(...(b.salary.match(/\d+/g) || ["0"]).map(Number));
        return sort === "high" ? nb - na : na - nb;
      });
    }
    return list;
  }, [type, loc, tier, sort, query]);

  const openJob = filtered.find((j) => j.id === openId) ?? JOBS.find((j) => j.id === openId) ?? null;

  return (
    <>
      <div className="sticky top-[64px] z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-3 glass-dark border-y border-sd-wine-500/30">
        <div className="mx-auto max-w-[1440px] flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Chip active={type === "all"} onClick={() => setType("all")}>all types</Chip>
            {JOB_TYPES.map((t) => (
              <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>
            ))}
            <span className="mx-2 text-sd-ink-soft/30">·</span>
            <Chip active={loc === "all"} onClick={() => setLoc("all")}>all locations</Chip>
            {(["remote", "KL", "Selangor", "Penang", "Johor"] as const).map((l) => (
              <Chip key={l} active={loc === l} onClick={() => setLoc(l)}>{l}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip active={tier === "all"} onClick={() => setTier("all")}>any comp</Chip>
            {(["<5k", "5-10k", "10-20k", "20k+"] as const).map((t) => (
              <Chip key={t} active={tier === t} onClick={() => setTier(t)}><span>RM {t}</span></Chip>
            ))}
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="[? search title / company / tag →]"
              className="ml-auto font-mono text-[11px] uppercase tracking-widest bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft placeholder:text-sd-ink-soft/40 focus:outline-none focus:border-sd-neon w-full md:w-72"
            />
            <select
              aria-label="Sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] bg-sd-bg-0/60 border border-sd-wine-500/40 rounded-full px-3 py-1.5 text-sd-ink-soft focus:outline-none focus:border-sd-neon"
            >
              <option value="newest">newest</option>
              <option value="high">comp high → low</option>
              <option value="low">comp low → high</option>
            </select>
            <div className="flex items-center gap-1">
              <Chip active={view === "list"} onClick={() => setView("list")}>[ list ]</Chip>
              <Chip active={view === "table"} onClick={() => setView("table")}>[ table ]</Chip>
            </div>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-10 py-10">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft mb-6">
            [{filtered.length} / {JOBS.length} roles]
          </p>

          {filtered.length === 0 ? (
            <p className="border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-2xl p-8 text-center text-sd-ink-soft/70">
              no roles match these filters.
            </p>
          ) : view === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((j) => (
                <JobCard key={j.id} job={j} onApply={() => setOpenId(j.id)} />
              ))}
            </div>
          ) : (
            <JobTable jobs={filtered} onApply={(id) => setOpenId(id)} />
          )}
        </div>
      </section>

      <JobApplyModal open={openId !== null} onClose={() => setOpenId(null)} job={openJob} />
    </>
  );
}

function JobCard({ job, onApply }: { job: Job; onApply: () => void }) {
  return (
    <article
      className={`group relative border bg-sd-bg-1/60 rounded-2xl p-5 transition-all duration-200 ${
        job.urgent
          ? "border-sd-neon/60 glow-wine"
          : "border-sd-wine-500/30 hover:border-sd-neon/70"
      } hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]`}
    >
      <span aria-hidden className="absolute right-3 top-3 font-mono text-[10px] text-sd-neon-soft/70 select-none">
        [ + ]
      </span>

      <div className="flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel text-lg uppercase text-sd-neon">
          {job.company.charAt(0)}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-sd-ink-strong leading-tight">{job.title}</h3>
          <p className="text-xs text-sd-ink-soft/70">{job.company}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-sd-ink-soft/60">
        <span>{job.location}</span>
        <span aria-hidden>·</span>
        <span className="text-sd-amber">{job.type}</span>
        {job.urgent && (
          <>
            <span aria-hidden>·</span>
            <span className="text-sd-neon">urgent</span>
          </>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="font-pixel text-2xl text-sd-ink-strong truncate">{job.salary}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/50">
            {job.posted}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/jobs/${job.slug}`}
            className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-ink-soft/80 rounded-full px-2.5 py-1.5 hover:border-sd-neon hover:text-sd-neon transition-colors"
          >
            [&gt; details]
          </Link>
          <button
            type="button"
            onClick={onApply}
            className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-2.5 py-1.5 hover:bg-sd-wine-700/30 transition-colors"
          >
            [ apply ]
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.tags.slice(0, 4).map((t) => (
          <span key={t} className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-wine-500/40 text-sd-neon-soft/80 rounded-full px-2 py-0.5">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

function JobTable({ jobs, onApply }: { jobs: Job[]; onApply: (id: number) => void }) {
  return (
    <div className="overflow-x-auto border border-sd-wine-500/30 bg-sd-bg-1/40 rounded-2xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-sd-wine-500/30">
            <Th>role</Th>
            <Th>company</Th>
            <Th>location</Th>
            <Th>type</Th>
            <Th>comp</Th>
            <Th>posted</Th>
            <Th>{" "}</Th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.id} className="border-b border-sd-wine-500/15 hover:bg-sd-wine-700/10 transition-colors">
              <td className="px-4 py-3">
                <Link href={`/jobs/${j.slug}`} className="text-sd-ink-strong hover:text-sd-neon">
                  {j.title}
                </Link>
                {j.urgent && <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-sd-neon">urgent</span>}
              </td>
              <td className="px-4 py-3 text-sd-ink-soft/80">{j.company}</td>
              <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/70">{j.location}</td>
              <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-sd-amber">{j.type}</td>
              <td className="px-4 py-3 font-pixel text-sd-ink-strong whitespace-nowrap">{j.salary}</td>
              <td className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/50">{j.posted}</td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onApply(j.id)}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-1 hover:bg-sd-wine-700/30 transition-colors"
                >
                  [ apply ]
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
      {children}
    </th>
  );
}
