# SelaDevs — Full Coverage + Real Malaysia Map (prompt3)

> **Scope of this prompt (delta over prompt2):**
> 1. Make every internal link on the site fully working — no dead routes. There are currently ~12 routes referenced from the Drawer, Header, Footer, and home-page sections that don't exist yet, plus the 7 we already built.
> 2. Replace the hand-drawn `<svg>` Malaysia map at `/map` with a **real, geographically-accurate** interactive map using a proper library.
> 3. Polish the existing 7 pages so the navigation surface (Drawer, Header, Footer, in-page bracket links) is consistent and every CTA goes somewhere real.
>
> **Build rules (unchanged from prompt2):**
> - No `node_modules`/build artifacts, no git push. Use only the existing tokens (`--color-sd-*`, `--font-sd-*`) and primitives (`components/ui/*`).
> - Use the `sd-*` design system exclusively. No hardcoded hex.
> - All new pages are server-rendered with `generateStaticParams` where possible. Client islands only when needed.
> - All copy is concrete SelaDevs voice — never `Lorem`.
> - `localStorage` for any interactive persistence (RSVP, vote, claim, apply, contact form, waitlist, etc.). No real backend.

---

## 0. Audit of broken / missing routes

I crawled every `href="/..."` in the codebase. The complete list, grouped by what's needed:

### 0.1 Already built (prompt2) — keep working
- `/showcase` · `/showcase` (filterable grid + modal)
- `/members` · `/members/[handle]` (24 builders, profile pages)
- `/guilds` · `/guilds/[slug]` · `/guilds/new` (12 guilds + featured + stub)
- `/events` · `/events/[slug]` (9 events, list+calendar)
- `/jobs` · `/jobs/[slug]` (12 jobs, apply modal)
- `/code/bounty` · `/code/bounty/[slug]` (8 bounties + poll)
- `/map` · `/map/[state]` (currently **hand-drawn** — replace per §6)
- `/offline` (already exists)

### 0.2 Referenced from Drawer (`data/content.ts`) but **missing** — build
- `/about` — "manifesto" link
- `/news` — community news feed
- `/changelog` — product/devlog timeline
- `/for-company` — "for companies" (recruiter pitch)
- `/for-government` — government pitch (already linked from HomeBento and TailoredSolutions)

### 0.3 Referenced from home sections but **missing** — build or remove
Search results: `components/sections/HomeBento.tsx`, `Hero.tsx`, `TailoredSolutions.tsx`, `SDJobsPricing.tsx`, `Footer.tsx`:
- `/about` — already in 0.2
- `/community` — referenced in `governance` bento (`view all discussions`)
- `/contact` — referenced in Footer
- `/privacy` — referenced in Footer
- `/terms` — referenced in Footer
- `/pricing` — referenced from `SDJobsPricing`
- `/leaderboard` — referenced from hero CTAs
- `/hire/register` — referenced from `SDJobsPricing` (recruiter signup CTA)
- `/events/seladevs-buildathon-2026` — referenced somewhere as a deep link; either add a real event to the data and point to its slug, or fix the link to point to `/events`

### 0.4 Action for 0.3
Either build each of these as a real page, or fix the link. **Recommendation: build all of them** — they're small marketing/static pages. Detailed specs in §3–§5.

---

## 1. New shared primitives

### 1.1 `<CTACard />` — `components/ui/CTACard.tsx`
Reusable, used by every marketing-page hero and section.
```ts
interface Props {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  primary?: { label: string; href: string; type?: "link" | "button" | "external" };
  secondary?: { label: string; href: string; type?: "link" | "button" | "external" };
  align?: "left" | "center";
  className?: string;
}
```
- Wraps a `BentoCard clip withCorner` with the standard eyebrow + pixel-title + body + buttons.
- `primary` of type `button` is a `<Button variant="primary">`; `link` is a `BracketLink`; `external` is a plain `<a target="_blank">`.

### 1.2 `<Markdown />` — `components/ui/Markdown.tsx` (tiny, no dep)
A minimal server-side markdown-to-React renderer for the static pages (`/about`, `/privacy`, `/terms`, `/changelog` entries, `/news` posts). Rules:
- Allowed inline: `**bold**`, `*italic*`, `` `code` ``, `[label](href)`, line breaks.
- Allowed blocks: `#`/`##`/`###` headings, `- ` and `1. ` lists, fenced ``` ``` ```code``` ``` ``` blocks, blank-line-separated paragraphs, `> ` blockquote.
- Do **not** use `marked`/`remark` — they add ~100KB. Hand-roll a 50-line function with a small regex pipeline. Output is server-rendered React, so no `dangerouslySetInnerHTML`.
- Sanitize: reject `<script>`, `javascript:` URLs, anything that isn't a `#`, `/`, `http://`, `https://`, or `mailto:` link. Render link target as `_self` by default, `_blank` for external http(s) only.
- Export `parseMarkdown(md: string): ReactNode` and a thin `<Markdown source={md} />` wrapper.

### 1.3 `<Timeline />` — `components/ui/Timeline.tsx`
Used by `/changelog` and `/news`. Server-renderable.
```ts
interface Entry { date: string; title: string; body?: ReactNode; tag?: "shipped" | "shipping" | "proposed" | "press" | "release" }
interface Props { entries: Entry[] }
```
- Vertical rail with one row per entry. Left = date pill (`font-mono`, sd-bg-2), right = title (pixel) + body (prose). Tag chip uses `tag` to color: `shipped` = neon, `shipping` = amber, `proposed` = purple, `press` = money, `release` = neon-soft.

### 1.4 `<ContactForm />` — `components/ui/ContactForm.tsx` (`"use client"`)
Form used on `/contact` and embedded into `/for-company` and `/hire/register`. Fields: name, email, company (optional), role (optional), topic (`<select>` with: "general", "partnership", "press", "support", "report"), message (textarea, 1000 char counter). Submit: client-side, stores to `localStorage` under `sd:contact:<timestamp>`, shows "received" success state with a copy-ticket-id button. Disclaimer: "this is a demo. in prod this posts to /api/contact." Uses the existing `Modal` pattern for the success state, or an in-place success block.

### 1.5 `<NewsletterStrip />` — `components/ui/NewsletterStrip.tsx`
Reused from the existing `NewsletterModal` (homepage). For `/for-company` and `/community` we want an inline version: email input + `[> subscribe]` button. Stores to `localStorage` under `sd:newsletter`.

### 1.6 `<StatRow />` — `components/ui/StatRow.tsx`
Horizontal stat strip with N cells. Replaces ad-hoc stats in the new marketing pages.
```ts
interface Props { items: { label: string; value: string | number; suffix?: string; prefix?: string }[]; className?: string }
```
- Uses `<BentoCard clip withCorner>` per cell, with the `font-pixel text-3xl` value + `font-mono text-[10px] uppercase` label pattern already used on `/members`.

### 1.7 `<MapEmbed />` — `components/ui/MapEmbed.tsx` (wrapper)
Thin client wrapper around the new Malaysia map. Renders a `<Suspense>` boundary, shows `<Skeleton>` fallback, and lazy-loads the heavy d3-geo bundle.

---

## 2. Updated Drawer nav (single source of truth)

Replace `NAV_COLUMNS` in `data/content.ts` with the **complete, exhaustive** list. No more `href` that goes to a 404. Also, the new pages should be grouped logically:

```ts
export const NAV_COLUMNS = [
  {
    eyebrow: "<project>",
    items: [
      { label: "showcase", href: "/showcase" },
      { label: "manifesto", href: "/about" },
      { label: "changelog", href: "/changelog" },
    ],
  },
  {
    eyebrow: "<community>",
    items: [
      { label: "builders", href: "/members" },
      { label: "guild directory", href: "/guilds" },
      { label: "events", href: "/events" },
      { label: "news", href: "/news" },
      { label: "townhall", href: "/community" },
      { label: "leaderboard", href: "/leaderboard" },
    ],
  },
  {
    eyebrow: "<business>",
    items: [
      { label: "for companies", href: "/for-company" },
      { label: "post a job", href: "/hire/register" },
      { label: "pricing", href: "/pricing" },
      { label: "job board", href: "/jobs" },
      { label: "bounty board", href: "/code/bounty" },
    ],
  },
  {
    eyebrow: "<government>",
    items: [
      { label: "our solution", href: "/for-government" },
    ],
  },
  {
    eyebrow: "<support>",
    items: [
      { label: "contact", href: "/contact" },
      { label: "privacy", href: "/privacy" },
      { label: "terms", href: "/terms" },
    ],
  },
];
```

Also update `Header.tsx` and `Footer.tsx` to use a small helper:
```ts
// data/nav.ts
export const HEADER_LINKS = [
  { label: "showcase", href: "/showcase" },
  { label: "members", href: "/members" },
  { label: "guilds", href: "/guilds" },
  { label: "events", href: "/events" },
  { label: "jobs", href: "/jobs" },
  { label: "bounty", href: "/code/bounty" },
  { label: "map", href: "/map" },
];
export const FOOTER_LINKS = [
  { label: "about", href: "/about" },
  { label: "changelog", href: "/changelog" },
  { label: "news", href: "/news" },
  { label: "leaderboard", href: "/leaderboard" },
  { label: "for companies", href: "/for-company" },
  { label: "for government", href: "/for-government" },
  { label: "contact", href: "/contact" },
  { label: "privacy", href: "/privacy" },
  { label: "terms", href: "/terms" },
];
```

The Drawer and Header should both consume these arrays, not hardcode.

---

## 3. Build `/about` — the manifesto

**Goal:** A long-form, single-page statement of what SelaDevs is, why it exists, what we believe, and how the community runs. This is the page the `[> learn more]` links in `Hero.tsx` and `HomeBento.tsx` point to.

### 3.1 Route
`app/about/page.tsx` (server). Metadata: title "manifesto", description "the forge for Malaysia's future builders."

### 3.2 Structure
- **Hero** (`<MapHero />`-style page header): eyebrow `<manifesto>`, h1 `## who we are`, subtitle, right-side `<StatRow items={[{label:"builders",value:1751},{label:"states",value:13},{label:"payouts",prefix:"RM ",value:12500,suffix:"+"},{label:"bounties shipped",value:64}]}>`.
- **Section 1 — "the problem"**: 2 paragraphs, single column max-w-2xl. Voice: technical, blunt, slightly annoyed at the state of SEA dev culture. No marketing fluff.
- **Section 2 — "the forge"**: 3-card bento grid describing three pillars: `open by default` (everything we build is OSS), `paid to ship` (bounties pay real Ringgit), `find your crew` (guilds). Each card uses `<BentoCard clip withCorner>`.
- **Section 3 — "how we operate"**: numbered list of 6 rules, e.g. "1. ship something every sprint. 2. review at least 1 PR that isn't yours. 3. don't be a jerk. 4. ..."
- **Section 4 — "the numbers"**: `<StatRow>` with 8 stats: builders, states, guilds, events/yr, RM paid out, bounties paid, RM open bounties, median time-to-first-PR.
- **Section 5 — "join us"**: a 3-path `<CTACard>` grid: `join a guild` → `/guilds`, `claim a bounty` → `/code/bounty`, `post a job` → `/for-company`.
- **Footer CTA**: bracket-link back to `/` and a `<NewsletterStrip />`.

### 3.3 Content source
Write the actual copy directly in the page file as JSX (no markdown). Use the SelaDevs voice from existing home copy. The page must be ≥600 words of real content.

---

## 4. Build `/news` — community news feed

**Goal:** A reverse-chronological feed of community news (releases, partnerships, milestones, op-eds). Each item has a slug, a date, a tag, a title, an author handle, and a markdown body.

### 4.1 Route
`app/news/page.tsx` (server) — list view.
`app/news/[slug]/page.tsx` (server) — detail view with `generateStaticParams` over the 12 items.

### 4.2 Components
- `components/sections/news/NewsHero.tsx` (server): `<news>` eyebrow, h1 `## from the forge`, subtitle "release notes, partnerships, and the occasional op-ed. updated weekly."
- `components/sections/news/NewsList.tsx` (server): grouping by month + year. Each item is a `<Link>` to the detail page with: tag chip, date mono, title (pixel), 1-line dek, author `@handle`.
- `components/sections/news/NewsItem.tsx` (server): full article view with `<Markdown source={body}/>`.

### 4.3 Data: `data/news.ts`
```ts
export type NewsItem = {
  id: number;
  slug: string;
  date: string;          // ISO
  tag: "release" | "partnership" | "milestone" | "op-ed" | "press";
  title: string;
  dek: string;           // <= 140 chars
  author: { handle: string; name: string };
  body: string;          // markdown
};
```
Seed **12 items** spanning 2025-09 to 2026-06. Required titles (use these exact ones):
1. `SelaDevs reaches 1,751 builders` — milestone — 2025-09-04 — `@kagerou1107`
2. `Selat v1.0 ships with SG/MY/ID/TH probes` — release — 2025-09-22 — `@tsara.id`
3. `Partnership: RunCloud joins the bounty board` — partnership — 2025-10-11 — `@ameera.dev`
4. `Op-ed: why we still pay Ringgit for OSS` — op-ed — 2025-10-29 — `@kagerou1107`
5. `Prompt Pilots hits 1k agent calls/week in prod` — milestone — 2025-11-15 — `@hafiz.py`
6. `Edge Runners guild ships 1k-star OSS in 90 days` — milestone — 2025-12-02 — `@kagerou1107`
7. `Year in review: 12,500 RM paid, 64 bounties, zero ghost jobs` — milestone — 2025-12-28 — `@kagerou1107`
8. `Press: SelaDevs in The Edge Malaysia` — press — 2026-01-12 — `@ameera.dev`
9. `SplitHold v2 ships with ringgit-first settlement` — release — 2026-02-04 — `@kagerou1107`
10. `Op-ed: vibe coding is fine, actually` — op-ed — 2026-02-25 — `@strdst7`
11. `Partnership: Bungkus + Selat uptime integration` — partnership — 2026-03-18 — `@tsara.id`
12. `SelaDevs Showcase v2.0 launches with offline PWA` — release — 2026-05-30 — `@kagerou1107`

Body for each: 3-5 short paragraphs, in SelaDevs voice. Use the existing `<Markdown />` primitive for rendering.

### 4.4 States
- Loading: 6 `<Skeleton className="h-20 rounded-xl" />`.
- Error: standard `<BracketLink href="/">[> back to home]</BracketLink>` + retry.
- Not-found (item slug): "404 · signal lost" with `[> all news]`.

---

## 5. Build `/changelog` — product/devlog timeline

**Goal:** Engineering-style changelog (the kind you'd see at Linear, Vercel, or Cal.com). Reverse chronological, grouped by month, with categories `shipped` / `shipping` / `proposed`. This page proves we ship, not just talk.

### 5.1 Route
`app/changelog/page.tsx` (server). Metadata: title "changelog", description "what we shipped, shipping, and proposing."

### 5.2 Components
- `components/sections/changelog/ChangelogHero.tsx` (server): eyebrow `<changelog>`, h1 `## the build log`, subtitle "every ship, every fix, every near-miss. no marketing filter.", right-side status pill `<StatusPill tone="amber">3 shipping this week</StatusPill>`.
- `components/sections/changelog/ChangelogTimeline.tsx` (server): uses the new `<Timeline />` primitive, grouped by month.
- `components/sections/changelog/ChangelogSubscribe.tsx` (client): inline "subscribe to the changelog via RSS" with a copy-link button. The actual RSS feed lives at `app/changelog/rss.xml/route.ts` (build a tiny one — see §5.4).

### 5.3 Data: `data/changelog.ts`
```ts
export type ChangelogEntry = {
  id: number;
  date: string;          // ISO
  tag: "shipped" | "shipping" | "proposed";
  title: string;
  body: string;          // markdown, 2-4 short paragraphs
  author?: { handle: string; name: string };
  refs?: { label: string; href: string }[];  // PRs, docs, demos
};
```
Seed **24 entries** spanning 2025-09 to 2026-06, in groups of ~4 per month. **Required entries (use these exact titles):**
1. `shipped · showcase grid redesign` — 2025-09-08 — `kagerou1107`
2. `shipped · selat probes: add TH region` — 2025-09-21 — `tsara.id`
3. `shipping · passkey support on bounty claim` — 2025-10-04 — `syamir.kl`
4. `proposed · guild events schema in clickhouse` — 2025-10-12 — `tsara.id`
5. `shipped · splithold v2 ringgit settlement` — 2025-10-30 — `kagerou1107`
6. `shipped · bungkus ocr handles 1k receipts/day` — 2025-11-08 — `rendra.my`
7. `shipping · gpu-ghosts whisper.cpp runner` — 2025-11-19 — `strdst7`
8. `shipped · jobs board: salary tier filter` — 2025-11-30 — `kagerou1107`
9. `shipped · events calendar with month nav` — 2025-12-11 — `ameera.dev`
10. `shipping · role+state filter on /members` — 2025-12-20 — `najwa.codes`
11. `proposed · telegram bounty bot` — 2025-12-31 — `syafiqah.codes`
12. `shipped · map hover + keyboard nav` — 2026-01-14 — `iman.go`
13. `shipped · jobs table view` — 2026-01-26 — `qistina.ts`
14. `shipping · seladev_os service worker v2` — 2026-02-08 — `arif.builds`
15. `proposed · builder reputation score` — 2026-02-19 — `kagerou1107`
16. `shipped · bounty poll: 5 options, 24h window` — 2026-03-04 — `ameera.dev`
17. `shipped · events .ics download` — 2026-03-18 — `ameera.dev`
18. `shipping · realtime map density heatmap` — 2026-04-02 — `iman.go`
19. `proposed · federal-territory federal-tier on map` — 2026-04-15 — `kagerou1107`
20. `shipped · job apply modal with localStorage` — 2026-04-28 — `qistina.ts`
21. `shipped · showcase detail modal` — 2026-05-12 — `najwa.codes`
22. `shipping · changelog rss feed` — 2026-05-25 — `arif.builds`
23. `proposed · members leaderboard v2 (with seasons)` — 2026-06-02 — `kagerou1107`
24. `shipped · /map real malaysia map` — 2026-06-04 — `iman.go` ← when §6 is done

Each body 2-4 short paragraphs, in SelaDevs voice, no Lorem.

### 5.4 RSS feed: `app/changelog/rss.xml/route.ts`
- Server route. `export async function GET()` returns a `Response` with `Content-Type: application/rss+xml`.
- Body is a hand-built RSS 2.0 document with the latest 20 entries. Item `<link>` points to `https://seladevs.com/changelog#<id>`. `<pubDate>` is RFC 822 format. `<description>` is the entry body (first 280 chars). Cached at the edge via `revalidate = 3600`.

---

## 6. Replace the hand-drawn map with a REAL Malaysia map

This is the biggest technical change. The current `/map` page uses 15 hand-drawn polygons that look like rectangles. The user wants a real, geographically-accurate, interactive map of Malaysia with state polygons.

### 6.1 Library decision: `react-simple-maps` + `topojson-client` + `d3-geo`

We are **NOT** going to use Leaflet/Mapbox. Reasons:
- We don't want a tile server, a network dep, or a global basemap. The aesthetic is dark/wine — a satellite/road map would fight the design.
- We need **state-level polygons with hover/click**, not pan/zoom tiles.
- We want a small bundle and full SSR compatibility (Next.js 15, App Router).
- We want easy theme integration with the `sd-*` tokens.

**Stack:**
- **`react-simple-maps`** (^3.0.0) — declarative `<ComposableMap>`, `<Geographies>`, `<Geography>` components. SVG, no DOM overlay, no Leaflet. Works with any TopoJSON.
- **`topojson-client`** (^3.1.0) — convert TopoJSON → GeoJSON at runtime. ~10KB.
- **`d3-geo`** (^3.1.1) — for the projection. Comes with `react-simple-maps`'s peer.
- **TopoJSON source**: the `world-atlas` package (^2.0.2) ships a 110m-resolution countries TopoJSON, but it does **not** have Malaysian state subdivisions at the level we need. We need a Malaysia-specific source.

### 6.2 The Malaysia TopoJSON — what to pull

**Primary source (recommended):** the `mappings/malaysia-state` dataset from [dataforswim/my-geodata](https://github.com/dataformy/my-geodata) OR the official JUPEM (Jabatan Ukur dan Pemetaan Malaysia) state-level shapefile converted to TopoJSON. The most reliable and license-clean option:

> **Source A (best, ~40KB gzipped):** `https://raw.githubusercontent.com/sandhikagalih/simple-maps-malaysia/master/malaysia.json` — a curated, simplified TopoJSON of Malaysia's 13 states + federal territories. License: MIT. Object key: `states` (FeatureCollection of 16 features: 13 states + KL + Putrajaya + Labuan, sometimes).

> **Source B (fallback, ~120KB):** the `malaysia` state collection from the [GADM](https://gadm.org/) dataset (https://gadm.org/download_country.html). Higher resolution, but you must convert via `ogr2ogr -f "GeoJSON" GADM_gpkg...gpkg` and then `geo2topo` to TopoJSON, and it's CC-BY-NC-SA 4.0 (attribution required).

> **Source C (alternative):** the `states` layer from [kysely/geo-myanmar](https://github.com/.../geo-myanmar) — actually no, that's Myanmar.

**Decision: pull Source A.** Save to `data/malaysia-states.json` (or `public/malaysia.json` and fetch client-side). Run a one-time validation at build time: every feature must have `properties.name` matching one of our 15 state names (`Johor`, `Kedah`, `Kelantan`, `Kuala Lumpur`, `Labuan`, `Melaka`, `Negeri Sembilan`, `Pahang`, `Perak`, `Perlis`, `Pulau Pinang`, `Putrajaya`, `Sabah`, `Sarawak`, `Selangor`, `Terengganu`). Map them by `properties.name` (case-insensitive) to our internal state codes.

### 6.3 npm install

```bash
npm install react-simple-maps@^3.0.0 topojson-client@^3.1.0 d3-geo@^3.1.1 @types/topojson-client@^3.1.5 --save
npm install @types/d3-geo@^3.1.0 --save-dev
```

Add to `package.json`:
```json
"dependencies": {
  ...existing,
  "react-simple-maps": "^3.0.0",
  "topojson-client": "^3.1.0",
  "d3-geo": "^3.1.1",
  "@types/topojson-client": "^3.1.5"
},
"devDependencies": {
  ...existing,
  "@types/d3-geo": "^3.1.0"
}
```

**Bundle note:** `d3-geo` is ~30KB gzipped, `topojson-client` ~7KB, `react-simple-maps` ~12KB, plus our 40KB TopoJSON. Total ~90KB added, all gzipped. This is acceptable for a single page; the rest of the site stays light because the map is a `dynamic` import.

### 6.4 Component: `components/sections/map/MalaysiaMap.tsx` (NEW, `"use client"`)
```ts
"use client";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import malaysiaTopo from "@/data/malaysia-states.json";
import { STATES, type StateDatum } from "@/data/map";
```
- `ComposableMap` projection: `geoMercator` with `center={[109, 4.5]}` (Malaysia centroid) and `scale={2400}`. Test: Sabah (NE) and Johor (S) should both be visible. If not, adjust.
- `width={800}` `height={500}` `style={{ width: "100%", height: "auto" }}`.
- For each `<Geography>` from `<Geographies geography={malaysiaTopo}>`:
  - Look up matching `STATES` entry by `geo.properties.name` (lowercase, normalized).
  - If matched, set `fill` based on builder density: `sd-wine-700` (<50), `sd-wine-500` (50-200), `sd-wine-300` (200-500), `sd-neon` (>500). Density buckets are computed in a memo from `STATES`.
  - `stroke="#FFE9EE"` (sd-ink-strong) `strokeWidth={0.4}`.
  - `style={{ default: { outline: "none" }, hover: { fill: "#FF2D55", cursor: "pointer", outline: "none" }, pressed: { outline: "none" } }}` — Tailwind classes **don't work** in `react-simple-maps` style objects. Use inline hex.
  - `onMouseEnter`/`onMouseLeave` update a `hovered: string | null` state with the state code.
  - `onClick={() => router.push(\`/map/${match.slug}\`)}`.
  - `tabIndex={0}`, `onKeyDown` for Enter/Space → navigate. `aria-label` describes the state + builder count.
  - `role="button"`.
- Wrap in a `<ZoomableGroup>` with `minZoom={1}` `maxZoom={8}` `translateExtent`, so the user can scroll-zoom. Mobile: disable zoom, use only hover/click.
- Render a `<StatePanel />` next to the map (or below on mobile) that shows the hovered state's data. When nothing is hovered, show the top 3 states by `builders`.

### 6.5 Component: `components/sections/map/MalaysiaMap.tsx` — density heatmap
Compute a builder-density bucket per state:
```ts
function densityOf(s: StateDatum): "low" | "med" | "high" | "vhigh" {
  if (s.builders < 50) return "low";
  if (s.builders < 200) return "med";
  if (s.builders < 500) return "high";
  return "vhigh";
}
const DENSITY_COLOR: Record<...> = {
  low: "#5F0617",   // sd-wine-700
  med: "#8C0A26",   // sd-wine-600
  high: "#B01434",  // sd-wine-500
  vhigh: "#FF2D55", // sd-neon
};
```
Add a legend below the map: 4 cells with the colors and labels (`< 50`, `50–200`, `200–500`, `500+ builders`).

### 6.6 The `data/malaysia-states.json` import
- The file lives in `data/malaysia-states.json`.
- Import as a JSON module: `import malaysiaTopo from "@/data/malaysia-states.json"`.
- TypeScript: ensure `resolveJsonModule: true` in `tsconfig.json` (it already is in this project).
- Properties check: every feature needs `properties.name`. If the source has `properties.name_long` or `properties.state`, adjust the lookup.
- Build-time validation in `app/map/page.tsx`:
```ts
import malaysiaTopo from "@/data/malaysia-states.json";
const NAMES = new Set(STATES.map(s => s.name.toLowerCase()));
const features = (malaysiaTopo as any).objects.states?.geometries ?? [];
const unmatched = features.filter((f: any) => !NAMES.has(String(f.properties?.name ?? "").toLowerCase()));
if (process.env.NODE_ENV !== "production" && unmatched.length > 0) {
  console.warn("[map] unmatched state names:", unmatched.map((f: any) => f.properties?.name));
}
```

### 6.7 `app/map/page.tsx` — load the new map with dynamic import
```ts
import dynamic from "next/dynamic";
const MalaysiaMap = dynamic(() => import("@/components/sections/map/MalaysiaMap").then(m => m.MalaysiaMap), {
  ssr: false,            // d3-geo + topojson-client use window in some paths
  loading: () => <Skeleton className="aspect-[8/5] rounded-2xl" />,
});
```
- Keep the existing `<MapHero />`, `<RegionStats />`, `<StateGrid />` — they still work.
- Replace the current `<MalaysiaMapSVG />` import with `<MalaysiaMap />`.

### 6.8 Accessibility
- The map is keyboard-navigable: tab focuses each state polygon in DOM order, Enter navigates.
- Provide a parallel text list (the existing `<StateGrid />`) for screen readers and keyboard users who can't see the map.
- `<svg>` has `role="img"` and an `aria-label` that summarizes "Interactive map of Malaysia showing builder density by state."

### 6.9 Dark/light theme
- The default `react-simple-maps` background is transparent. Our wrapper is `bg-sd-bg-1/60` so the dark theme works out of the box. For the light theme, the wine colors become too low-contrast — switch to darker fills in light mode:
```ts
const bgIsLight = typeof document !== "undefined" && document.documentElement.classList.contains("light");
const DENSITY_COLOR_LIGHT = { low: "#FFE0E6", med: "#FFB8C2", high: "#F25A75", vhigh: "#B01434" };
```
- Better: read the theme from a context or from `data-theme` attribute on `<html>`. Subscribe with a `useEffect`.

### 6.10 What to delete
- `components/sections/map/MalaysiaMapSVG.tsx` — keep the file but mark deprecated, or delete it. The new component is the source of truth.
- The 15 hand-authored `pathD` strings in `data/map.ts` are no longer used for rendering, but keep `STATES` for the side panels, region stats, state grid, and detail-page cross-refs.

---

## 7. Build `/for-company` — recruiter pitch

**Goal:** Convince a Malaysian tech company to post a job. 3-step pitch: "we're not another job board", "what you get", "what it costs", "how to start".

### 7.1 Route
`app/for-company/page.tsx` (server). Metadata: title "for companies", description "post a job to SelaDevs. 24h reply SLA, no ghost listings, verified candidates."

### 7.2 Sections
1. **Hero**: eyebrow `<for companies>`, h1 `## hire from the forge`, subtitle "1,751 builders, all shipping. 24h reply SLA, no ghost jobs, no recruiters middlemanning.", right-side `<StatRow items={[{label:"verified cos",value:"40+"},{label:"median reply",value:"24h"},{label:"ghost jobs",value:"0"},{label:"avg time-to-hire",value:"11d"}]}>`. CTA: `<CTACard primary={{label:"post a job",href:"/hire/register"}} secondary={{label:"see pricing",href:"/pricing"}} />`.
2. **"why us"**: 3-card bento. `reach 1,751 builders` / `salary transparency` / `no recruiters`. Each card is a `<BentoCard clip withCorner>` with eyebrow + pixel title + 2-sentence body.
3. **"what you get"**: numbered list, 5 items. Each item is a `<BentoCard>` with a big number (`01`–`05`) and a short body.
4. **"how it works"**: 4-step horizontal flow (post → review → match → hire). Use the existing bento/grid styling.
5. **Pricing tease**: import `<SDJobsPricing />` from the home page components.
6. **FAQ**: 6 questions, each in a `<details>` element. Topics: "do you take a cut?", "what if I get no applicants?", "can I edit after posting?", "refund policy?", "international companies?", "do you offer screening?".
7. **Footer CTA**: `<CTACard primary={{label:"post a job",href:"/hire/register"}} secondary={{label:"contact sales",href:"/contact?topic=partnership"}} />`.

### 7.3 Data
The pricing tiers (3 plans: "starter RM 299", "growth RM 799", "scale RM 1,999") live in `data/pricing.ts`:
```ts
export const PRICING_TIERS = [
  { id: "starter", name: "starter", price: "RM 299", duration: "/ 30 days", features: ["1 active listing", "manual review", "no featured slot", "24h reply SLA"], cta: "post a job" },
  { id: "growth", name: "growth", price: "RM 799", duration: "/ 30 days", features: ["3 active listings", "priority review", "1 featured slot", "24h reply SLA", "DM candidates directly"], cta: "post 3 jobs", featured: true },
  { id: "scale", name: "scale", price: "RM 1,999", duration: "/ 30 days", features: ["10 active listings", "priority review", "3 featured slots", "1h reply SLA", "DM candidates directly", "sourcing assistance", "monthly report"], cta: "contact sales" },
];
```

### 7.4 FAQ data: `data/companyFaq.ts`
6 entries, each `{ q: string; a: string }`. Use the new `<Markdown />` primitive for the `a` field.

---

## 8. Build `/for-government` — government pitch

**Goal:** Pitch SelaDevs as a partner for Malaysian state/federal government tech initiatives (digital economy, talent development, public-sector tools). Single page, serious, restrained tone.

### 8.1 Route
`app/for-government/page.tsx` (server). Metadata: title "for government", description "SelaDevs as a partner for SEA public-sector digital initiatives."

### 8.2 Sections
1. **Hero**: eyebrow `<for government>`, h1 `## build with the forge`, subtitle "1,751 builders. 13 states. a public-good ethos. ship citizen-facing tools in weeks, not years." Right-side: 3-cell bento: `states reached` / `builders reachable` / `avg bounty turnaround`.
2. **"how we help"**: 3-card bento. `talent pipeline` / `rapid prototyping` / `sustainable OSS`. Each card explains one program.
3. **"case studies"**: 3-card grid with real-feeling SEA case studies (we'll seed): `Selangor digital licensing MVP` (8 weeks, RM 0 to state), `Penang open-data portal audit` (2 weeks, 12 issues filed), `Federal Bahasa-Melayu LLM evaluation` (in flight, RM 50k grant).
4. **"engagement models"**: 3-card bento. `bounty bank` (pre-fund RM amount, community ships), `embedded squad` (3-5 SelaDevs members seconded to your team for 3 months), `open RFP` (we publish your spec as a public bounty board).
5. **"guardrails"**: 5 bullets in a card. Open source by default, public roadmap, no lock-in, code-of-conduct enforced, security sentinels review.
6. **Footer CTA**: `<CTACard primary={{label:"schedule a briefing",href:"/contact?topic=partnership"}} secondary={{label:"see past work",href:"/showcase"}} />`.

### 8.3 Data: `data/govCaseStudies.ts`
```ts
export type CaseStudy = { id: number; slug: string; client: string; title: string; timeline: string; outcome: string; body: string; }
```
Seed 3 (the ones in §8.2.3).

### 8.4 Note on tone
The `/for-government` page is the most "corporate" page. Keep the wine/neon aesthetic, but use less glitch and more clean bento grids. Avoid ALL CAPS in body copy (mono caps only in labels).

---

## 9. Build `/community` — townhall + discussions

**Goal:** A public townhall space. Long-form discussion threads (no real backend — we render markdown discussion posts seeded as data). This is the page the `view all discussions` link in the home bento points to.

### 9.1 Route
`app/community/page.tsx` (server) — list of discussion threads.
`app/community/[slug]/page.tsx` (server) — single discussion thread with replies.

### 9.2 Components
- `components/sections/community/CommunityHero.tsx`: eyebrow `<community>`, h1 `## townhall`, subtitle "long-form discussion. open to all. no upvotes, no engagement bait."
- `components/sections/community/ThreadList.tsx`: each thread card shows tag, title, opener `@handle`, date, reply count, last-reply time. Grouped by month.
- `components/sections/community/ThreadView.tsx`: full thread. Original post (markdown), then a chronological list of replies. Reply count and a CTA: `[> reply]` which opens a `Modal` with a textarea form that stores to `localStorage` and shows "submitted" state (clearly a demo).

### 9.3 Data: `data/community.ts`
```ts
export type Thread = {
  id: number;
  slug: string;
  title: string;
  tag: "townhall" | "hot-take" | "question" | "show-and-tell";
  opened: string;       // ISO
  openedBy: { handle: string; name: string };
  body: string;        // markdown
  replies: { id: number; at: string; handle: string; name: string; body: string }[];
};
```
Seed **6 threads** with 3-5 replies each. **Required titles:**
1. `is "vibe coding" making us better engineers?` — townhall — `@kagerou1107`
2. `the cult of overwork in SEA startups` — hot-take — `@ameera.dev`
3. `how do you price bounties fairly?` — question — `@kagerou1107`
4. `show and tell: i shipped a Bahasa-Melayu OCR pipeline in 6 days` — show-and-tell — `@rendra.my`
5. `why every guild needs a public "mission" page` — hot-take — `@ameera.dev`
6. `what does "verified company" actually mean?` — question — `@kagerou1107`

Each reply has 1-3 short paragraphs in SelaDevs voice, no Lorem. The first thread (vibe coding) gets the most replies (5) since it's the "feature" thread.

### 9.4 Reply form
`<ThreadReplyForm threadSlug={string} />` — `Modal` with `<textarea>` + submit. On submit, stores to `localStorage` under `sd:reply:<threadSlug>:<timestamp>`. Shows "submitted" + disclaimer "this is a demo. in prod this posts to /api/community."

---

## 10. Build `/leaderboard` — public ranking

**Goal:** A paginated leaderboard of the top 100 builders by stars, with season filter. Reuses `MEMBERS` from prompt2.

### 10.1 Route
`app/leaderboard/page.tsx` (server) — list view.

### 10.2 Components
- `components/sections/leaderboard/LeaderboardHero.tsx`: eyebrow `<leaderboard>`, h1 `## the scoreboard`, subtitle "builders ranked by shipped work, not vibes. season resets quarterly.", right-side `<StatusPill tone="amber">season 03 · 91d left</StatusPill>`.
- `components/sections/leaderboard/LeaderboardList.tsx` (client): tab between `season 03` (current) and `all-time`. Filter by role. Shows 1-100 with rank delta (↑ +2 / ↓ -1 / = 0) vs. previous snapshot. Each row is a `<Link href="/members/[handle]">` with avatar, name, @handle, role, state, stars, rank-delta indicator.

### 10.3 Data
Use the existing `MEMBERS` for the current snapshot. For the "previous snapshot" deltas, deterministically generate a fake delta from `member.id` and `season`:
```ts
function fakeDelta(id: number, season: number): { delta: number; season: number } {
  const seed = (id * 7 + season * 13) % 11;
  return { delta: seed - 5, season };
}
```
This produces stable +/- N values per (id, season) so the leaderboard looks alive but doesn't need a backend.

### 10.4 No "rebuild history" — just 2 snapshots
We have 24 members in the seeded data. Show all 24. Don't try to mock 100.

---

## 11. Build `/pricing` — public pricing page

**Goal:** Reuse the 3-tier pricing model from §7.3, but on a dedicated page. Adds a comparison table and an "FAQ" anchor.

### 11.1 Route
`app/pricing/page.tsx` (server). Metadata: title "pricing", description "transparent, per-listing pricing. no recruiter commissions."

### 11.2 Sections
1. **Hero**: `<pricing>` eyebrow, h1 `## pricing`, subtitle "one fee per listing. no commissions, no recruiter cuts, no hidden charges."
2. **3 tiers**: import the 3 `PRICING_TIERS` cards, full-width grid, featured tier highlighted with `glow-wine`.
3. **Comparison table**: 12-row table comparing starter/growth/scale on features (active listings, featured slots, reply SLA, DM candidates, sourcing assist, monthly report, RSS feed, custom domain, etc.).
4. **"non-profit / open-source"**: a card. "We post OSS maintainer roles for free. Email `oss@seladevs.com` with the repo URL."
5. **FAQ**: 4 questions, each a `<details>` element. Topics: "what counts as a listing?", "can I cancel?", "do you offer refunds?", "is there a free tier?".

### 11.3 Data: `data/pricingFaq.ts`
4 entries, each `{ q: string; a: string }`.

---

## 12. Build `/contact` — public contact page

**Goal:** Catch-all contact form with topic routing, plus a directory of public contact channels.

### 12.1 Route
`app/contact/page.tsx` (server). Metadata: title "contact", description "general enquiries, partnerships, press, support."

### 12.2 Sections
1. **Hero**: `<contact>` eyebrow, h1 `## get in touch`, subtitle "we read everything. expect a reply within 24h on weekdays."
2. **Form**: use the new `<ContactForm />` primitive. Default topic: "general". Pre-fill the topic from `?topic=` query param.
3. **Channels**: 5-cell bento grid: `general@seladevs.com`, `press@seladevs.com`, `partnerships@seladevs.com`, `security@seladevs.com`, `discord.gg/seladevs`. Each cell is a `<BentoCard clip withCorner>` with the email/link, "best for" description, and a copy button.

---

## 13. Build `/hire/register` — recruiter signup

**Goal:** A short form to start posting jobs. The serious work happens in email; the form is a placeholder that captures intent and writes to `localStorage`.

### 13.1 Route
`app/hire/register/page.tsx` (server). Metadata: title "post a job", description "register your company and post your first role."

### 13.2 Sections
1. **Hero**: `<hire>` eyebrow, h1 `## post a job`, subtitle "free for OSS roles, RM 299+ for the rest. verified in 24h."
2. **Stepper**: 3 numbered steps (`01 register` / `02 verify` / `03 post`) as a horizontal flow at the top. Active step is "01".
3. **Form**: company name, company email, company website, your name, your role, password (placeholder), terms checkbox. Submit stores to `localStorage` under `sd:hire:<timestamp>` and shows "received — we'll be in touch within 24h" success state.
4. **Aside**: "what you get" 5-bullet list, "what it costs" pricing teaser with a `[> see pricing]` link to `/pricing`.

---

## 14. Build `/privacy` and `/terms` — legal pages

### 14.1 Routes
- `app/privacy/page.tsx` (server). Metadata: title "privacy".
- `app/terms/page.tsx` (server). Metadata: title "terms".

### 14.2 Content
Both pages are server components rendering markdown via the new `<Markdown />` primitive. Store the body in `data/legal.ts`:
```ts
export const PRIVACY_MD = `# privacy policy\n\nLast updated: 2026-06-01\n\n... ~600 words of real policy text ...`;
export const TERMS_MD = `# terms of service\n\nLast updated: 2026-06-01\n\n... ~600 words of real terms text ...`;
```
- Use the SelaDevs voice but be serious and conventional. No `Lorem`. Cover: what we collect, what we don't, cookies (we use `localStorage` only — be honest about that), third parties (none), data retention, your rights, contact email `privacy@seladevs.com`.
- Terms: who can use, account responsibilities, content IP, disclaimer of warranties, governing law (Malaysia), contact `legal@seladevs.com`.
- Layout: `<LegalHero />` server component (eyebrow + h1 + last-updated), then the markdown body in a max-w-2xl column, then a `<BracketLink href="/">[> back to home]</BracketLink>`.

---

## 15. Fix the deep link in the events section

The reference `href="/events/seladevs-buildathon-2026"` points to an event that doesn't exist. Two options:

### 15.1 Recommended: add the event to the data
Add a 10th event to `data/events.ts`:
```ts
{
  id: 10,
  slug: "seladevs-buildathon-2026",
  title: "SelaDevs Buildathon 2026",
  category: "hacknight",
  start: "2026-09-12T10:00+08:00",
  end: "2026-09-13T22:00+08:00",
  venue: { name: "KL Convention Centre", city: "KL", mode: "in-person" },
  description: "Our flagship 36-hour buildathon. 200 builders, 12 bounties, RM 25,000 in prizes, and a panel of 6 judges from the SEA dev community. Open to SelaDevs members and guests.",
  agenda: [
    { time: "sat 10:00", label: "doors + coffee + bounty reveal" },
    { time: "sat 11:00", label: "claim window opens" },
    { time: "sat 18:00", label: "midpoint dinner" },
    { time: "sun 06:00", label: "sunrise check-in" },
    { time: "sun 20:00", label: "submissions close + demos" },
    { time: "sun 22:00", label: "awards" },
  ],
  speakers: [
    { handle: "kagerou1107", name: "Aiman R.", role: "host" },
    { handle: "tsara.id", name: "Tsara I.", role: "judge" },
    { handle: "ameera.dev", name: "Ameera H.", role: "judge" },
    { handle: "strdst7", name: "Saifuddin R.", role: "judge" },
    { handle: "syamir.kl", name: "Syamir T.", role: "judge" },
  ],
  capacity: 200,
  rsvps: 0,
  cover: 10,
},
```
Bump the existing `id: 9` `telegram-titans-botathon` to `id: 11` and `telegram-titans-botathon` references to it. (Or use sequential id but order the array by date.) Detail page auto-renders.

### 15.2 Alternative: remove the link
If you don't want a 10th event, replace the deep link with `href="/events"`. Search the codebase first to see where this href appears:
```bash
grep -r "seladevs-buildathon-2026" app components
```

---

## 16. Polish the existing 7 pages

### 16.1 Add a `<Breadcrumbs />` primitive
- `components/ui/Breadcrumbs.tsx` (server): renders a small mono path: `< home / showcase >` with each segment as a `<Link>` (except the current). Use on every detail page.
- Wrap in a `<div className="px-6 md:px-10 pt-4"><div className="mx-auto max-w-[1440px] font-mono text-[10px] uppercase tracking-[0.2em] text-sd-ink-soft/50">[ &lt; home / <Link>...</Link> / <span className="text-sd-neon-soft">current</span> ]</div></div>`.

### 16.2 Update each page's hero/footer to add a "back" link
On every list page (`/showcase`, `/members`, `/guilds`, `/events`, `/jobs`, `/code/bounty`, `/map`, `/news`, `/changelog`, `/community`, `/leaderboard`), at the bottom of the page above the Footer, add:
```tsx
<div className="px-6 md:px-10 py-8">
  <div className="mx-auto max-w-[1440px] flex items-center justify-between">
    <BracketLink href="/">[&gt; back to home]</BracketLink>
    <BracketLink href={...relevant cross-link...}>[&gt; related]</BracketLink>
  </div>
</div>
```
Pick relevant cross-links per page (e.g. `/showcase` → `/members`).

### 16.3 Add breadcrumbs + cross-links to all detail pages
- `/members/[handle]` → breadcrumbs: home / members / @handle · cross-link: showcase + guilds
- `/guilds/[slug]` → home / guilds / <name> · cross-link: members
- `/events/[slug]` → home / events / <title> · cross-link: members
- `/jobs/[slug]` → home / jobs / <title> · cross-link: members
- `/code/bounty/[slug]` → home / bounty / <title> · cross-link: members
- `/map/[state]` → home / map / <name> · cross-link: events + members
- `/news/[slug]` → home / news / <title> · cross-link: changelog
- `/community/[slug]` → home / townhall / <title> · cross-link: members

### 16.4 Theme: ensure every new page works in light mode
- All `bg-sd-bg-1/60` becomes `bg-sd-light-bg-1/60` via the existing `html.light` overrides.
- All `text-sd-ink-soft` and `text-sd-ink-strong` already have light-mode overrides.
- The new `<MapEmbed />` needs special care — see §6.9.

### 16.5 Mobile responsiveness sweep
- Test every new page at 375px (mobile) and 768px (tablet). The map page in particular: at < 768px, render the `<StateGrid />` above the map (because the map is too small to interact with on mobile). The map becomes a "desktop-only" experience with a "open on desktop" hint on mobile.

### 16.6 Update `app/sitemap.ts`
Regenerate the sitemap to include all the new routes. The sitemap is a hand-rolled list; just add the new paths.

### 16.7 Update `app/robots.ts`
Make sure `robots.txt` doesn't accidentally block any of the new pages (it shouldn't — current rules are global).

---

## 17. Implementation order (suggested, sequential)

Each step is independently buildable and shippable. Test after each.

1. **`/privacy` + `/terms` + `<Markdown />`** — small, isolated, validates the markdown primitive.
2. **`/contact` + `<ContactForm />`** — small, validates the form pattern.
3. **`/news` + `data/news.ts`** — reuses `<Markdown />`, validates the news pattern.
4. **`/changelog` + `data/changelog.ts` + RSS feed** — reuses `<Markdown />` and `<Timeline />`.
5. **`/pricing` + `data/pricing.ts` + `data/pricingFaq.ts`** — reuses everything above.
6. **`/for-company` + `data/companyFaq.ts`** — reuses the pricing tiers.
7. **`/for-government` + `data/govCaseStudies.ts`** — reuses bento patterns.
8. **`/community` + `data/community.ts` + reply form modal** — reuses `<Markdown />` and `<Modal />`.
9. **`/leaderboard`** — reuses `MEMBERS` and the leaderboard pattern from prompt2.
10. **`/hire/register`** — reuses `<ContactForm />`-style input patterns.
11. **Add the 10th event (`seladevs-buildathon-2026`)** to `data/events.ts`.
12. **Install map libs + pull TopoJSON** (§6.3 + §6.2) — run `npm install`, save the TopoJSON file.
13. **Build `MalaysiaMap.tsx`** (§6.4–§6.5) — test in isolation at `localhost:3000/map`.
14. **Wire `dynamic` import in `app/map/page.tsx`** (§6.7) — test density heatmap, hover, click, keyboard nav.
15. **Delete `MalaysiaMapSVG.tsx`** (or alias it as a fallback for the no-JS case).
16. **Update `NAV_COLUMNS`, `HEADER_LINKS`, `FOOTER_LINKS`** (§2) — single source of truth.
17. **Polish: breadcrumbs, back-links, cross-links, theme sweep, mobile sweep, sitemap, robots, build**.

---

## 18. Self-check checklist

- [ ] `npm run build` exits 0 with all new routes statically generated.
- [ ] Every link in the Drawer, Header, Footer, HomeBento, Hero, TailoredSolutions, SDJobsPricing, governance bento, and every detail page resolves to a real route that returns 200.
- [ ] Unknown slugs on all dynamic routes return the custom 404 UI.
- [ ] `/map` renders the real TopoJSON-based map: 16 features (13 states + KL + Putrajaya + Labuan if present), 4-color density heatmap, hover/click/keyboard navigation all work.
- [ ] Map library deps (`react-simple-maps`, `topojson-client`, `d3-geo`, `@types/topojson-client`, `@types/d3-geo`) are in `package.json`.
- [ ] TopoJSON file `data/malaysia-states.json` is committed (small, < 60KB).
- [ ] Light + dark theme both render correctly on every new page.
- [ ] Every form (`<ContactForm>`, reply form, apply modal, bounty claim, RSVP, poll, waitlist, hire/register) writes to `localStorage` and shows a clear "demo" disclaimer.
- [ ] `prefers-reduced-motion` still respected (no new animations outside the existing global utility set).
- [ ] No `node_modules/`, `.next/`, `*.tsbuildinfo` accidentally added.
- [ ] No git push performed.
