"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATES, type StateDatum } from "@/data/map";

export function MalaysiaMapSVG() {
  const [hovered, setHovered] = useState<string | null>(null);
  const router = useRouter();

  const focused = hovered ? STATES.find((s) => s.code === hovered) ?? null : null;
  const top3 = [...STATES].sort((a, b) => b.builders - a.builders).slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
      <div className="relative border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 overflow-hidden">
        <svg
          viewBox="0 0 600 380"
          className="w-full h-auto"
          role="img"
          aria-label="Map of Malaysia with state-level builder density"
        >
          <defs>
            <radialGradient id="sdMapHover">
              <stop offset="0%" stopColor="#FF2D55" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#B01434" stopOpacity="0.4" />
            </radialGradient>
            <linearGradient id="sdMapGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF2D55" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#14070C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="600" height="380" fill="url(#sdMapGlow)" />

          {STATES.filter((s) => s.shape === "path").map((s) => (
            <path
              key={s.code}
              d={s.pathD}
              data-state={s.code}
              tabIndex={0}
              role="link"
              aria-label={`${s.name} — ${s.builders} builders`}
              onMouseEnter={() => setHovered(s.code)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(s.code)}
              onBlur={() => setHovered(null)}
              onClick={() => router.push(`/map/${s.slug}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/map/${s.slug}`);
                }
              }}
              className="cursor-pointer transition-all duration-150"
              style={{
                fill: hovered === s.code ? "url(#sdMapHover)" : "rgba(140, 42, 62, 0.25)",
                stroke: "#8C2A3E",
                strokeWidth: 1,
                outline: "none",
              }}
            />
          ))}

          {STATES.filter((s) => s.shape === "circle").map((s) => (
            <g key={s.code}>
              <circle
                data-state={s.code}
                tabIndex={0}
                role="link"
                aria-label={`${s.name} — ${s.builders} builders`}
                onMouseEnter={() => setHovered(s.code)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(s.code)}
                onBlur={() => setHovered(null)}
                onClick={() => router.push(`/map/${s.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/map/${s.slug}`);
                  }
                }}
                className="cursor-pointer"
                style={{
                  fill: hovered === s.code ? "url(#sdMapHover)" : "#FF2D55",
                  stroke: "#FFE9EE",
                  strokeWidth: hovered === s.code ? 1.5 : 0.5,
                  outline: "none",
                }}
                cx={s.coords.x}
                cy={s.coords.y}
                r={s.code === "KUALA LUMPUR" ? 4 : 3}
              />
            </g>
          ))}

          {STATES.map((s) => (
            <text
              key={`label-${s.code}`}
              x={s.coords.x + (s.shape === "circle" ? 6 : 0)}
              y={s.coords.y + (s.shape === "circle" ? 4 : -2)}
              textAnchor={s.shape === "circle" ? "start" : "middle"}
              fontFamily='"JetBrains Mono", monospace'
              fontSize="8"
              fill={hovered === s.code ? "#FFE9EE" : "rgba(244, 221, 227, 0.55)"}
              style={{ pointerEvents: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              {s.code.replace("KUALA LUMPUR", "KL").replace("PULAU PINANG", "PENANG")}
            </text>
          ))}
        </svg>
      </div>

      <aside className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5">
        {focused ? (
          <StatePanel s={focused} />
        ) : (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;hover a state&gt;
            </p>
            <p className="mt-3 font-pixel uppercase text-2xl text-sd-ink-strong">top 3 active</p>
            <div className="mt-4 space-y-2">
              {top3.map((s, i) => (
                <button
                  key={s.code}
                  type="button"
                  onMouseEnter={() => setHovered(s.code)}
                  onClick={() => router.push(`/map/${s.slug}`)}
                  className="w-full text-left flex items-center justify-between border border-sd-wine-500/30 bg-sd-bg-0/40 rounded-xl p-3 hover:border-sd-neon transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-pixel text-sd-neon">#{i + 1}</span>
                    <span>
                      <span className="block font-semibold text-sd-ink-strong">{s.name}</span>
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/60">{s.landmark}</span>
                    </span>
                  </span>
                  <span className="font-pixel text-xl text-sd-ink-strong">{s.builders}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function StatePanel({ s }: { s: StateDatum }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
        &lt;{s.code}&gt;
      </p>
      <p className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">{s.name}</p>
      <p className="font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/60">{s.landmark}</p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Stat dotClass="bg-sd-amber" label={`${s.builders} builders`} />
        <Stat dotClass="bg-sd-neon" label={`${s.guilds} guilds`} />
        <Stat dotClass="bg-sd-purple" label={`${s.jobs} jobs`} />
        <Stat dotClass="bg-sd-money" label={`${s.events} events`} />
      </div>

      <a
        href={`/map/${s.slug}`}
        className="mt-5 block text-center font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-2 hover:bg-sd-wine-700/30 transition-colors"
      >
        [&gt; open {s.name}]
      </a>
    </div>
  );
}

function Stat({ dotClass, label }: { dotClass: string; label: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-ink-soft/85 border border-sd-wine-500/20 bg-sd-bg-0/40 rounded-md px-2 py-1.5">
      <span className={`block h-1.5 w-1.5 ${dotClass}`} />
      {label}
    </div>
  );
}
