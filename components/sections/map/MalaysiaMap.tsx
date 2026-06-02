"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldTopo from "@/data/world-110m.json";
import malaysiaMap from "@/data/malaysia-states.json";
import { STATES, type StateDatum } from "@/data/map";

type Hotspot = { code: string; cx: number; cy: number; r: number; kind: "state" | "federal" };

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

function densityOf(s: StateDatum): "low" | "med" | "high" | "vhigh" {
  if (s.builders < 50) return "low";
  if (s.builders < 200) return "med";
  if (s.builders < 500) return "high";
  return "vhigh";
}

export function MalaysiaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const router = useRouter();

  useEffect(() => {
    const sync = () => {
      const t = document.documentElement.dataset.theme;
      setTheme(t === "light" ? "light" : "dark");
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Country outline from world-atlas (real geographic boundary).
  // We use the projection params saved in malaysia-states.json (produced by
  // scripts/gen-malaysia-map.js) so the country outline and the hotspots
  // are perfectly aligned.
  const { countryPath } = useMemo(() => {
    const fc = feature(worldTopo as any, (worldTopo as any).objects.countries) as any;
    const malaysia = fc.features.find((f: any) => f.properties && f.properties.name === COUNTRY_NAME);
    if (!malaysia) return { countryPath: null };
    const proj = (malaysiaMap as any).projection;
    const projection = geoMercator()
      .center(proj?.center || [109, 4.0])
      .scale(proj?.scale || 2400)
      .translate(proj?.translate || [300, 190]);
    const path = geoPath(projection);
    return { countryPath: path(malaysia) || null };
  }, []);

  const data = malaysiaMap as unknown as { viewBox: [number, number, number, number]; hotspots: Hotspot[]; projection?: { center: [number, number]; scale: number; translate: [number, number] } };
  const vbW = data.viewBox[2];
  const vbH = data.viewBox[3];
  const hotspots: Hotspot[] = data.hotspots;

  const focused = hovered ? findState(hovered) ?? null : null;
  const top3 = [...STATES].sort((a, b) => b.builders - a.builders).slice(0, 3);

  // Theme-aware colors
  const COUNTRY_FILL = theme === "light" ? "#FCEAE3" : "rgba(20, 7, 12, 0.55)";
  const COUNTRY_STROKE = theme === "light" ? "#B01434" : "#8C2A3E";
  const LABEL_COLOR = theme === "light" ? "rgba(58, 10, 24, 0.7)" : "rgba(244, 221, 227, 0.6)";
  const LABEL_HOVER = theme === "light" ? "#3A0A18" : "#FFE9EE";
  const LABEL_BG = theme === "light" ? "rgba(255, 245, 243, 0.85)" : "rgba(11, 3, 6, 0.85)";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
      <div className="relative border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-4 overflow-hidden">
        <svg
          viewBox={`0 0 ${vbW} ${vbH}`}
          className="w-full h-auto"
          role="img"
          aria-label="Interactive map of Malaysia showing builder density by state"
        >
          <defs>
            <linearGradient id="sdMapAtmos" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={theme === "light" ? "#FFD2C9" : "#FF2D55"} stopOpacity={theme === "light" ? "0.45" : "0.12"} />
              <stop offset="100%" stopColor={theme === "light" ? "#FFF5F3" : "#14070C"} stopOpacity="0" />
            </linearGradient>
            <radialGradient id="sdMapHover">
              <stop offset="0%" stopColor="#FF2D55" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#B01434" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width={vbW} height={vbH} fill="url(#sdMapAtmos)" />

          {/* Real country outline from world-atlas */}
          {countryPath && (
            <path
              d={countryPath}
              fill={COUNTRY_FILL}
              stroke={COUNTRY_STROKE}
              strokeWidth={1.2}
              style={{ pointerEvents: "none" }}
            />
          )}

          {/* Per-state hotspots (real geographic centroids) */}
          {hotspots.map((h) => {
            const stateInfo = findState(h.code);
            const isHovered = hovered === h.code;
            const density = stateInfo ? densityOf(stateInfo) : "low";
            const fill = isHovered
              ? "url(#sdMapHover)"
              : h.kind === "federal"
                ? "var(--sd-map-fill-vhigh)"
                : `var(--sd-map-fill-${density})`;
            return (
              <g key={h.code}>
                <circle
                  data-state={h.code}
                  tabIndex={0}
                  role="button"
                  aria-label={stateInfo ? `${stateInfo.name} — ${stateInfo.builders} builders` : h.code}
                  onMouseEnter={() => setHovered(h.code)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(h.code)}
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
                    fill,
                    stroke: theme === "light" ? "#FFF5F3" : "#FFE9EE",
                    strokeWidth: isHovered ? 1.5 : 0.6,
                    opacity: isHovered ? 1 : 0.85,
                    outline: "none",
                    transition: "fill 150ms, stroke 150ms, stroke-width 150ms, opacity 150ms",
                  }}
                  cx={h.cx}
                  cy={h.cy}
                  r={h.r}
                />
                {/* label on hover or always for federal territories */}
                {(isHovered || h.kind === "federal") && (
                  <g style={{ pointerEvents: "none" }}>
                    <rect
                      x={h.cx + h.r + 4}
                      y={h.cy - 9}
                      rx={3}
                      width={(h.code.length * 5.5) + 12}
                      height={14}
                      fill={LABEL_BG}
                      stroke={theme === "light" ? "#E89A8C" : "#8C2A3E"}
                      strokeWidth={0.5}
                    />
                    <text
                      x={h.cx + h.r + 10}
                      y={h.cy + 1}
                      fontFamily='"JetBrains Mono", monospace'
                      fontSize="8"
                      fontWeight="700"
                      fill={isHovered ? LABEL_HOVER : (h.kind === "federal" ? LABEL_HOVER : LABEL_COLOR)}
                      style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
                    >
                      {h.code.replace("KUALA LUMPUR", "KL").replace("PULAU PINANG", "PENANG").replace("NEGERI SEMBILAN", "N. SEMBILAN")}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Hint text */}
          {hovered === null && (
            <text
              x={vbW / 2}
              y={vbH - 10}
              textAnchor="middle"
              fontFamily='"JetBrains Mono", monospace'
              fontSize="9"
              fill={LABEL_COLOR}
              style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              click a state · use tab + enter for keyboard nav
            </text>
          )}
        </svg>

        <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-sd-ink-soft/70">
          <span>legend:</span>
          {(["low", "med", "high", "vhigh"] as const).map((d) => (
            <span key={d} className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: `var(--sd-map-fill-${d})` }}
              />
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
