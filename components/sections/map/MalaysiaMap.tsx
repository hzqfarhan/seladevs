"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldTopo from "@/data/world-110m.json";
import malaysiaMap from "@/data/malaysia-states.json";
import { STATES, type StateDatum } from "@/data/map";

type FedCircle = { code: string; cx: number; cy: number; r: number; kind: "circle" };
type StateRect = { code: string; pathD: string; kind: "rect" };
type MapDatum = StateRect | FedCircle;

const isCircle = (d: MapDatum): d is FedCircle => d.kind === "circle";

const COUNTRY_NAME = "Malaysia";

function findState(code: string): StateDatum | undefined {
  return STATES.find((s) => {
    const codeMap: Record<string, string> = {
      PERLIS: "Perlis",
      KEDAH: "Kedah",
      "PULAU PINANG": "Pulau Pinang",
      PERAK: "Perak",
      KELANTAN: "Kelantan",
      TERENGGANU: "Terengganu",
      PAHANG: "Pahang",
      SELANGOR: "Selangor",
      "KUALA LUMPUR": "Kuala Lumpur",
      PUTRAJAYA: "Putrajaya",
      "NEGERI SEMBILAN": "Negeri Sembilan",
      MELAKA: "Melaka",
      JOHOR: "Johor",
      SABAH: "Sabah",
      SARAWAK: "Sarawak",
    };
    return codeMap[code] === s.name;
  });
}

const DENSITY_COLOR = {
  low: "#5F0617",   // sd-wine-700
  med: "#8C0A26",   // sd-wine-600
  high: "#B01434",  // sd-wine-500
  vhigh: "#FF2D55", // sd-neon
};

const DENSITY_COLOR_LIGHT = {
  low: "#FFE0E6",
  med: "#FFB8C2",
  high: "#F25A75",
  vhigh: "#B01434",
};

function densityOf(s: StateDatum): keyof typeof DENSITY_COLOR {
  if (s.builders < 50) return "low";
  if (s.builders < 200) return "med";
  if (s.builders < 500) return "high";
  return "vhigh";
}

export function MalaysiaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLight, setIsLight] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const check = () => {
      if (typeof document === "undefined") return;
      setIsLight(document.documentElement.classList.contains("light"));
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Country outline from world-atlas (real geographic boundary)
  const countryPath = useMemo(() => {
    const fc = feature(worldTopo as any, (worldTopo as any).objects.countries) as any;
    const malaysia = fc.features.find((f: any) => f.properties && f.properties.name === COUNTRY_NAME);
    if (!malaysia) return null;
    const projection = geoMercator().center([109, 4.0]).scale(2400);
    const path = geoPath(projection);
    return path(malaysia) || null;
  }, []);

  const data = malaysiaMap as unknown as { viewBox: [number, number, number, number]; states: StateRect[]; federal: FedCircle[] };
  const focused = hovered ? findState(hovered) ?? null : null;
  const top3 = [...STATES].sort((a, b) => b.builders - a.builders).slice(0, 3);
  const colors = isLight ? DENSITY_COLOR_LIGHT : DENSITY_COLOR;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
      <div className="relative border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 overflow-hidden">
        <svg
          viewBox={`0 0 ${data.viewBox[2]} ${data.viewBox[3]}`}
          className="w-full h-auto"
          role="img"
          aria-label="Interactive map of Malaysia showing builder density by state"
        >
          <defs>
            <linearGradient id="sdMapAtmos" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF2D55" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#14070C" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="sdMapHover">
              <stop offset="0%" stopColor="#FF2D55" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#B01434" stopOpacity="0.5" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width={data.viewBox[2]} height={data.viewBox[3]} fill="url(#sdMapAtmos)" />

          {/* Real country outline from world-atlas */}
          {countryPath && (
            <path
              d={countryPath}
              fill="rgba(20, 7, 12, 0.5)"
              stroke="#8C2A3E"
              strokeWidth={0.6}
              style={{ pointerEvents: "none" }}
            />
          )}

          {/* State rectangles (geographically projected) */}
          {data.states.map((s) => {
            const stateInfo = findState(s.code);
            const isHovered = hovered === s.code;
            const density = stateInfo ? densityOf(stateInfo) : "low";
            return (
              <g key={s.code}>
                <path
                  d={s.pathD}
                  tabIndex={0}
                  role="button"
                  aria-label={stateInfo ? `${stateInfo.name} — ${stateInfo.builders} builders` : s.code}
                  onMouseEnter={() => setHovered(s.code)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(s.code)}
                  onBlur={() => setHovered(null)}
                  onClick={() => stateInfo && router.push(`/map/${stateInfo.slug}`)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && stateInfo) {
                      e.preventDefault();
                      router.push(`/map/${stateInfo.slug}`);
                    }
                  }}
                  className="cursor-pointer"
                  style={{
                    fill: isHovered ? "url(#sdMapHover)" : colors[density],
                    stroke: isHovered ? "#FFE9EE" : "#8C2A3E",
                    strokeWidth: isHovered ? 0.8 : 0.4,
                    outline: "none",
                    transition: "fill 150ms, stroke 150ms, stroke-width 150ms",
                  }}
                />
              </g>
            );
          })}

          {/* Federal territories (small circles) */}
          {data.federal.map((c) => {
            const stateInfo = findState(c.code);
            const isHovered = hovered === c.code;
            return (
              <g key={c.code}>
                <circle
                  data-state={c.code}
                  tabIndex={0}
                  role="button"
                  aria-label={stateInfo ? `${stateInfo.name} — ${stateInfo.builders} builders` : c.code}
                  onMouseEnter={() => setHovered(c.code)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(c.code)}
                  onBlur={() => setHovered(null)}
                  onClick={() => stateInfo && router.push(`/map/${stateInfo.slug}`)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && stateInfo) {
                      e.preventDefault();
                      router.push(`/map/${stateInfo.slug}`);
                    }
                  }}
                  className="cursor-pointer"
                  style={{
                    fill: isHovered ? "url(#sdMapHover)" : "#FF2D55",
                    stroke: "#FFE9EE",
                    strokeWidth: isHovered ? 1 : 0.5,
                    outline: "none",
                  }}
                  cx={c.cx}
                  cy={c.cy}
                  r={c.r}
                />
                {data.federal.filter((x) => isCircle(x)).map((cc) => (
                  <text
                    key={`label-${cc.code}`}
                    x={cc.cx + 6}
                    y={cc.cy + 3}
                    fontFamily='"JetBrains Mono", monospace'
                    fontSize="7"
                    fill={hovered === cc.code ? "#FFE9EE" : "rgba(244, 221, 227, 0.6)"}
                    style={{ pointerEvents: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {cc.code.replace("KUALA LUMPUR", "KL")}
                  </text>
                ))}
              </g>
            );
          })}

          {/* State labels for rectangles (small, low-contrast) */}
          {data.states.map((s) => {
            const stateInfo = findState(s.code);
            if (!stateInfo) return null;
            // Crude label position: bbox center
            const xs = (s.pathD.match(/M([\d.]+)\s+([\d.]+)/) || [])[1];
            const ys = (s.pathD.match(/M([\d.]+)\s+([\d.]+)/) || [])[2];
            if (!xs || !ys) return null;
            const code = s.code.replace("PULAU PINANG", "PENANG");
            return (
              <text
                key={`label-${s.code}`}
                x={Number(xs) + 5}
                y={Number(ys) + 9}
                fontFamily='"JetBrains Mono", monospace'
                fontSize="6"
                fill={hovered === s.code ? "#FFE9EE" : "rgba(244, 221, 227, 0.45)"}
                style={{ pointerEvents: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                {code}
              </text>
            );
          })}
        </svg>

        <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/70">
          <span>legend:</span>
          {(["low", "med", "high", "vhigh"] as const).map((d) => (
            <span key={d} className="inline-flex items-center gap-1.5">
              <span aria-hidden className="block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: colors[d] }} />
              {d === "low" ? "< 50" : d === "med" ? "50–200" : d === "high" ? "200–500" : "500+"}
            </span>
          ))}
        </div>
      </div>

      <aside className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5">
        {focused ? (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sd-neon-soft">
              &lt;{focused.code}&gt;
            </p>
            <p className="mt-2 font-pixel uppercase text-2xl text-sd-ink-strong">{focused.name}</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-sd-ink-soft/60">{focused.landmark}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Stat dotClass="bg-sd-amber" label={`${focused.builders} builders`} />
              <Stat dotClass="bg-sd-neon" label={`${focused.guilds} guilds`} />
              <Stat dotClass="bg-sd-purple" label={`${focused.jobs} jobs`} />
              <Stat dotClass="bg-sd-money" label={`${focused.events} events`} />
            </div>
            <a
              href={`/map/${focused.slug}`}
              className="mt-5 block text-center font-mono text-[10px] uppercase tracking-[0.2em] border border-sd-neon text-sd-neon rounded-full px-3 py-2 hover:bg-sd-wine-700/30 transition-colors"
            >
              [&gt; open {focused.name}]
            </a>
          </div>
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

function Stat({ dotClass, label }: { dotClass: string; label: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-sd-ink-soft/85 border border-sd-wine-500/20 bg-sd-bg-0/40 rounded-md px-2 py-1.5">
      <span className={`block h-1.5 w-1.5 ${dotClass}`} />
      {label}
    </div>
  );
}
