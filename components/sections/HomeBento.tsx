"use client";
import { LogoHero } from "@/components/ui/LogoHero";
import { Counter } from "@/components/ui/Counter";
import { BracketLink } from "@/components/ui/BracketLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatusPill } from "@/components/ui/StatusPill";
import { MarqueeRow } from "@/components/ui/Marquee";
import { JOBS, STATES, SHOWCASE, STATS, GOVERNANCE, NAV_COLUMNS } from "@/data/content";
import Link from "next/link";
import { cn } from "@/lib/cn";

const FEATURES = [
  { label: "Free", title: "Free job posting", body: "1 active slot. No card." },
  { label: "ATS", title: "ATS pipeline", body: "Applied → hired. Built-in." },
  { label: "AI", title: "AI top match", body: "Selang AI scores every applicant." },
];

const SOLUTIONS = [
  { href: "/for-developers", eyebrow: "<for developers>", title: "Build a portfolio that pays." },
  { href: "/for-companies", eyebrow: "<for companies>", title: "Hire real engineering talent." },
  { href: "/for-government", eyebrow: "<for government>", title: "A self-sustaining ecosystem." },
];

const GRADS = [
  "linear-gradient(135deg,#5F0617 0%,#B01434 50%,#FF2D55 100%)",
  "linear-gradient(135deg,#5F0617 0%,#9B5CFF 50%,#FF2D55 100%)",
  "linear-gradient(135deg,#5F0617 0%,#FFB454 50%,#FF4D6D 100%)",
  "linear-gradient(135deg,#3A0A18 0%,#B01434 50%,#FF7A93 100%)",
  "linear-gradient(135deg,#5F0617 0%,#FF2D55 50%,#FFB454 100%)",
  "linear-gradient(135deg,#1B0A11 0%,#8C0A26 50%,#FF4D6D 100%)",
];

export function HomeBento() {
  return (
    <div className="px-4 md:px-8 pb-12">
      <div
        className={cn(
          "relative mx-auto w-full max-w-[1480px]",
          "border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-3xl",
          "shadow-[0_0_80px_rgba(255,45,85,0.10)]"
        )}
      >
        <BentoFrameChrome />

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-min gap-2 p-2 md:p-3">
          <HeroBlock className="col-span-12 md:col-span-8 md:row-span-2" />
          <StatusBlock className="col-span-12 md:col-span-4" />
          <CoordBlock className="col-span-12 md:col-span-4" />

          <JobsBlock className="col-span-12 md:col-span-5" />
          <StatsBlock className="col-span-12 md:col-span-4" />
          <EventBlock className="col-span-12 md:col-span-3" />

          <SDJobsBlock className="col-span-12 md:col-span-7" />
          <MapBlock className="col-span-12 md:col-span-5" />

          <LeaderboardBlock className="col-span-12 md:col-span-4" />
          <GovernanceBlock className="col-span-12 md:col-span-4" />
          <MarqueeBlock className="col-span-12 md:col-span-4" />

          <SolutionsBlock className="col-span-12 md:col-span-8" />
          <EpicBlock className="col-span-12 md:col-span-4" />

          <NavBlock className="col-span-12" />
        </div>
      </div>
    </div>
  );
}

function BentoFrameChrome() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute -inset-px rounded-3xl" style={{ background: "linear-gradient(180deg, rgba(242,180,65,0.15) 0%, transparent 18%, transparent 82%, rgba(242,180,65,0.10) 100%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(242,180,65,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(242,180,65,0.6) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div aria-hidden className="pointer-events-none absolute left-3 top-2 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft/70">
        uthm_forge_os // v1.0.0
      </div>
      <div aria-hidden className="pointer-events-none absolute right-3 top-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft/70">
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-sd-neon animate-live-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sd-neon" />
        </span>
        live
      </div>
      <div aria-hidden className="pointer-events-none absolute left-3 bottom-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft/40">
        ./forge
      </div>
      <div aria-hidden className="pointer-events-none absolute right-3 bottom-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft/40">
        ⌘ + k
      </div>
    </>
  );
}

function Cell({ children, className, clip = false, label }: { children: React.ReactNode; className?: string; clip?: boolean; label?: string }) {
  return (
    <section
      className={cn(
        "relative border border-sd-wine-500/25 bg-sd-bg-2/55 rounded-2xl p-4 md:p-5 overflow-hidden transition-colors hover:border-sd-neon/55",
        clip && "clip-card",
        className
      )}
    >
      {label && (
        <span aria-hidden className="absolute right-3 top-3 font-mono text-[9px] uppercase tracking-[0.2em] text-sd-neon-soft/50 select-none">
          {label}
        </span>
      )}
      {children}
    </section>
  );
}

function HeroBlock({ className }: { className?: string }) {
  return (
    <Cell className={cn("flex flex-col", className)} label="[ hero ]">
      <div className="flex items-center justify-between">
        <Eyebrow>&lt;the forge for uthm&apos;s future builders&gt;</Eyebrow>
      </div>

      <div className="mt-3 flex-1 grid place-items-center py-2">
        <LogoHero size={620} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <BracketLink href="/about">[&gt; learn more]</BracketLink>
        <BracketLink href="/for-faculty">[&gt; for faculty]</BracketLink>
        <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/40">
          // built in parit raja · shipped to the world
        </span>
      </div>
    </Cell>
  );
}

function StatusBlock({ className }: { className?: string }) {
  return (
    <Cell className={className} label="[ status ]">
      <Eyebrow>&lt;sys.mem&gt;</Eyebrow>
      <div className="mt-3 flex items-center justify-between">
        <StatusPill>SYS.MEM // OK</StatusPill>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/50">
          uptime 99.99%
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
        <Tag>forge.uthm</Tag>
        <Tag tone="amber">build // live</Tag>
        <Tag>uthm-forge-01</Tag>
      </div>
    </Cell>
  );
}

function CoordBlock({ className }: { className?: string }) {
  return (
    <Cell className={className} label="[ hud ]">
      <Eyebrow>&lt;coordinates&gt;</Eyebrow>
      <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
        <Coord label="lat" value="01.8585" />
        <Coord label="lng" value="103.0833" />
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden bg-sd-wine-700/50 rounded-full">
        <div className="h-full w-2/3 bg-sd-neon animate-hud-beam rounded-full" />
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/40">
        // scanning grid
      </p>
    </Cell>
  );
}

function JobsBlock({ className }: { className?: string }) {
  return (
    <Cell className={className} label="[ jobs ]">
      <div className="flex items-center justify-between">
        <Eyebrow>&lt;hiring now&gt;</Eyebrow>
        <BracketLink href="/jobs" className="text-[10px]">[&gt; all]</BracketLink>
      </div>
      <ul className="mt-3 space-y-2.5">
        {JOBS.map((j) => (
          <li key={j.id} className="flex items-center gap-3 group">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-sd-wine-500/40 bg-sd-bg-2 font-pixel uppercase text-sd-neon text-xs">
              {j.company.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-sd-ink-strong truncate">{j.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/50 truncate">
                {j.company} · {j.location} · <span className="text-sd-amber">{j.type}</span>
              </p>
            </div>
            <span className="font-pixel text-sm text-sd-neon-soft shrink-0">{j.salary.split(" ")[0]}</span>
          </li>
        ))}
      </ul>
    </Cell>
  );
}

function StatsBlock({ className }: { className?: string }) {
  return (
    <Cell className={className} label="[ pulse ]">
      <Eyebrow>&lt;live pulse&gt;</Eyebrow>
      <div className="mt-3 space-y-2.5">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/60">
              <span className="h-1.5 w-1.5 rounded-full bg-sd-neon animate-glow" />
              {s.label}
            </div>
            <span className="font-pixel text-2xl text-sd-neon animate-pulse-neon">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </span>
          </div>
        ))}
      </div>
    </Cell>
  );
}

function EventBlock({ className }: { className?: string }) {
  return (
    <Cell className={className} label="[ event ]" clip>
      <Eyebrow>&lt;event&gt;</Eyebrow>
      <p className="mt-3 font-pixel uppercase text-lg text-sd-ink-strong leading-tight">
        UTHM Buildathon
        <br />
        <span className="text-sd-neon">2026</span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/60">
        Open // Aug 2026
      </p>
      <div className="mt-3">
        <BracketLink href="/events/uthm-buildathon-2026" className="text-[10px]">[&gt; apply]</BracketLink>
      </div>
      <div aria-hidden className="mt-3 -mx-4 -mb-4 h-10" style={{ background: GRADS[0] }} />
    </Cell>
  );
}

function SDJobsBlock({ className }: { className?: string }) {
  return (
    <Cell className={className} label="[ industry ]">
      <div className="flex items-center justify-between">
        <Eyebrow>&lt;industry&gt;</Eyebrow>
        <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/50">
          sponsor a student bounty
        </span>
      </div>
      <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">
        ## Hire UTHM&apos;s Best Builders
      </h3>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="border border-sd-wine-500/30 bg-sd-bg-2/50 rounded-md p-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-sd-neon-soft border border-sd-wine-500/40 rounded-full px-1.5 py-0.5">
              {f.label}
            </span>
            <p className="mt-1.5 font-pixel uppercase text-sm text-sd-ink-strong leading-tight">{f.title}</p>
            <p className="mt-0.5 text-[10px] text-sd-ink-soft/70 leading-tight">{f.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <a
          href="/for-industry"
          className="inline-flex items-center font-mono text-[10px] uppercase tracking-widest text-sd-ink-strong border border-sd-neon/60 bg-sd-wine-700/60 rounded-md px-2.5 py-1.5 hover:shadow-[0_0_20px_rgba(242,180,65,0.45)] transition-shadow"
        >
          [ claim offer &gt; ]
        </a>
        <BracketLink href="/sponsorship" className="text-[10px]">[&gt; sponsorship tiers]</BracketLink>
      </div>
    </Cell>
  );
}

function MapBlock({ className }: { className?: string }) {
  return (
    <Cell className={className} label="[ map ]" clip>
      <div className="flex items-center justify-between">
        <Eyebrow>&lt;community map&gt;</Eyebrow>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
          <Counter value={1751} suffix=" builders" />
        </span>
      </div>
      <div className="mt-2 relative h-24">
        <MapArt />
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1.5">
        {STATES.slice(0, 10).map((s) => (
          <a
            key={s.code}
            href={`/map?state=${s.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-sd-neon-soft border border-sd-wine-500/30 rounded px-1.5 py-1 text-center hover:text-sd-neon hover:border-sd-neon transition-colors"
          >
            [{s.code}]
          </a>
        ))}
      </div>
      <div className="mt-2 flex justify-end">
        <BracketLink href="/map" className="text-[10px]">[&gt; full map]</BracketLink>
      </div>
    </Cell>
  );
}

function LeaderboardBlock({ className }: { className?: string }) {
  const TOP = [
    { rank: 1, handle: "kagerou1107", score: 9820 },
    { rank: 2, handle: "strdst7", score: 7640 },
    { rank: 3, handle: "unc_sayyuf", score: 5210 },
  ];
  return (
    <Cell className={className} label="[ leaderboard ]">
      <div className="flex items-center justify-between">
        <Eyebrow>&lt;leaderboard&gt;</Eyebrow>
        <BracketLink href="/leaderboard" className="text-[10px]">[&gt; all]</BracketLink>
      </div>
      <ul className="mt-3 space-y-2">
        {TOP.map((u) => (
          <li key={u.handle} className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon w-6">
              #{String(u.rank).padStart(2, "0")}
            </span>
            <span className="grid h-7 w-7 place-items-center rounded-full border border-sd-wine-500/40 bg-sd-bg-2 font-pixel uppercase text-sd-neon text-xs">
              {u.handle.charAt(0).toUpperCase()}
            </span>
            <span className="flex-1 text-xs text-sd-ink-strong truncate">@{u.handle}</span>
            <span className="font-pixel text-lg text-sd-neon">{u.score.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </Cell>
  );
}

function GovernanceBlock({ className }: { className?: string }) {
  return (
    <Cell className={className} label="[ governance ]">
      <div className="flex items-center justify-between">
        <Eyebrow>&lt;get involved&gt;</Eyebrow>
        <BracketLink href="/community" className="text-[10px]">[&gt; all]</BracketLink>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {GOVERNANCE.map((g) => (
          <a
            key={g.n}
            href={g.href}
            className="group flex items-start gap-2.5 border border-sd-wine-500/25 rounded-md p-2.5 hover:border-sd-neon/60 transition-colors"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center bg-sd-neon text-sd-bg-0 font-pixel text-sm">
              {g.n}
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-sd-neon-soft truncate">
                &lt;{g.eyebrow}&gt;
              </p>
              <p className="font-pixel uppercase text-sm text-sd-ink-strong leading-tight truncate">
                {g.title}
              </p>
            </div>
          </a>
        ))}
      </div>
    </Cell>
  );
}

function MarqueeBlock({ className }: { className?: string }) {
  return (
    <Cell className={cn("p-0", className)} label="[ showcase ]">
      <div className="px-4 md:px-5 pt-4 md:pt-5 flex items-center justify-between">
        <Eyebrow>&lt;opportunities hub&gt;</Eyebrow>
        <BracketLink href="/showcase" className="text-[10px]">[&gt; all]</BracketLink>
      </div>
      <div className="mt-3 space-y-2 overflow-hidden">
        <MarqueeRow duration="22s">
          {SHOWCASE.slice(0, 3).map((p, i) => (
            <MiniProject key={p.id} title={p.title} author={p.author} grad={GRADS[i % GRADS.length]} />
          ))}
        </MarqueeRow>
      </div>
    </Cell>
  );
}

function MiniProject({ title, author, grad }: { title: string; author: string; grad: string }) {
  return (
    <div className="w-[160px] shrink-0 border border-sd-wine-500/30 rounded-lg overflow-hidden bg-sd-bg-2/60">
      <div className="h-16 relative" style={{ background: grad }}>
        <div className="absolute inset-0 grid place-items-center font-pixel uppercase text-sm text-sd-ink-strong">
          {title.split(" ")[0]}
        </div>
      </div>
      <div className="px-2 py-1.5 flex items-center justify-between">
        <p className="font-mono text-[10px] text-sd-ink-strong truncate">{title}</p>
        <span className="font-mono text-[9px] text-sd-ink-soft/60">@{author}</span>
      </div>
    </div>
  );
}

function SolutionsBlock({ className }: { className?: string }) {
  return (
    <Cell className={className} label="[ solutions ]">
      <Eyebrow>&lt;about us&gt;</Eyebrow>
      <h3 className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">## tailored solutions</h3>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
        {SOLUTIONS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group border border-sd-wine-500/25 bg-sd-bg-2/50 rounded-md p-3 hover:border-sd-neon/60 transition-colors"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-sd-neon-soft">
              {c.eyebrow}
            </p>
            <p className="mt-1 font-pixel uppercase text-sm text-sd-ink-strong leading-tight">
              {c.title}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-sd-neon-soft group-hover:text-sd-neon">
              [ read &gt; ]
            </p>
          </Link>
        ))}
      </div>
    </Cell>
  );
}

function EpicBlock({ className }: { className?: string }) {
  return (
    <Cell className={cn("text-center", className)} label="[ epic ]">
      <Eyebrow>&lt;connect with us&gt;</Eyebrow>
      <p className="mt-2 font-pixel uppercase text-xl text-sd-ink-strong leading-[0.95]">
        ## Something
        <br />
        Epic is
        <br />
        <span className="text-sd-neon animate-text-neon">Brewing.</span>
      </p>
      <a
        href="https://discord.gg/uthmforge"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-2 font-mono uppercase tracking-widest text-[10px] border border-sd-neon/60 bg-sd-wine-700/60 text-sd-ink-strong rounded-md px-3 py-1.5 hover:shadow-[0_0_20px_rgba(242,180,65,0.55)] transition-shadow animate-discord-float"
      >
        <span aria-hidden>
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.075.075 0 0 0-.079.037c-.34.6-.717 1.387-.98 2.005a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.997-2.005.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 5.178 4.37a.07.07 0 0 0-.032.027C2.34 8.5 1.55 12.5 1.94 16.43a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.3 14.3 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.193.372-.293a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.099.246.198.372.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.578-.838-8.434-3.549-12.034a.06.06 0 0 0-.031-.028z" />
          </svg>
        </span>
        [ &gt; join discord ]
      </a>
    </Cell>
  );
}

function NavBlock({ className }: { className?: string }) {
  return (
    <Cell className={className} label="[ nav ]">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {NAV_COLUMNS.map((col) => (
          <div key={col.eyebrow}>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-sd-neon-soft">
              {col.eyebrow}
            </p>
            <ul className="mt-2 space-y-1">
              {col.items.map((it) => (
                <li key={it.label}>
                  <Link
                    href={it.href}
                    className="text-xs text-sd-ink-soft/85 hover:text-sd-neon transition-colors"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-sd-neon-soft">
            &lt;socials&gt;
          </p>
          <ul className="mt-2 space-y-1 text-xs">
            <li><a className="text-sd-ink-soft/85 hover:text-sd-neon transition-colors" href="https://discord.gg/uthmforge">discord</a></li>
            <li><a className="text-sd-ink-soft/85 hover:text-sd-neon transition-colors" href="https://twitter.com">x / twitter</a></li>
            <li><a className="text-sd-ink-soft/85 hover:text-sd-neon transition-colors" href="https://tiktok.com">tiktok</a></li>
            <li className="pt-1 mt-1 border-t border-sd-wine-500/15">
              <Link href="/privacy" className="text-sd-ink-soft/60 hover:text-sd-neon-soft">privacy · terms · contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </Cell>
  );
}

function Tag({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "amber" }) {
  return (
    <span
      className={cn(
        "border rounded-md px-2 py-1 text-center truncate",
        tone === "amber"
          ? "border-sd-amber/50 text-sd-amber"
          : "border-sd-wine-500/40 text-sd-ink-soft/70"
      )}
    >
      {children}
    </span>
  );
}

function Coord({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border border-sd-wine-500/25 rounded-md px-2.5 py-1.5">
      <span className="text-sd-neon-soft">{label}</span>
      <span className="text-sd-ink-strong animate-hud-blink">{value}</span>
    </div>
  );
}

function MapArt() {
  return (
    <svg aria-hidden viewBox="0 0 400 120" className="absolute inset-0 w-full h-full opacity-80">
      <defs>
        <linearGradient id="sdMapGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF2D55" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#B01434" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="120" fill="url(#sdMapGlow)" />
      <g stroke="rgba(255,45,85,0.4)" strokeWidth="0.8" fill="none">
        <path d="M40 30 L120 20 L210 30 L300 40 L360 20 L370 70 L350 100 L300 110 L220 115 L130 110 L70 90 L40 60 Z" />
        <path d="M120 20 L150 55 L130 80 L100 65 Z" />
        <path d="M210 30 L240 60 L230 90 L180 100 L150 55 Z" />
      </g>
      <g fill="#FF2D55">
        <circle cx="120" cy="55" r="2.5" />
        <circle cx="220" cy="65" r="2.5" />
        <circle cx="300" cy="70" r="2.5" />
        <circle cx="170" cy="85" r="2.5" />
      </g>
    </svg>
  );
}
