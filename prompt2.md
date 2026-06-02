# SelaDevs — Full Page Implementation Spec (prompt2)

> **Scope:** Build fully-working, production-quality pages for the existing SelaDevs Next.js 15 (App Router) site at `https://seladevs.com`. The design language is **wine/neon terminal-hacker**: dark `#0B0306` bg, neon `#FF2D55` accents, `VT323` pixel headings, `JetBrains Mono` body labels, `Inter` body text, with `[ + ]` corner glyphs, `clip-card` cut corners, and bracket-style links `[> label →]`.
>
> **Deliverables per page:** route file, components, typed data, fully working interactions, full content (no `Lorem`). Use only the existing tokens in `app/globals.css` (`--color-sd-*`, `--font-sd-*`) and UI primitives in `components/ui/*`. **No new deps.** No `node_modules`/build artifacts. No push to git.

---

## 0. Project Conventions (apply to all pages)

### 0.1 File structure per page
For each new route (e.g. `/showcase`):

```
app/<route>/
  page.tsx                  // server component, default export
  layout.tsx                // OPTIONAL, only if it needs its own shell
  loading.tsx               // skeleton using <Skeleton />
  error.tsx                 // "client" boundary, retry button
  not-found.tsx             // 404 with <BracketLink href="/">back to /</BracketLink>
```

For each section reused across pages, prefer `components/sections/<Name>.tsx` (server) and interactive bits as `components/sections/<Name>.tsx` with `"use client"` only when needed (filters, modals, tabs).

### 0.2 Visual system (use EXACTLY these tokens)
- Page bg: `bg-sd-bg-0` (dark) / `bg-sd-light-bg-0` (light)
- Card bg: `bg-sd-bg-1/60`–`bg-sd-bg-1/80`, border `border-sd-wine-500/30`
- Hover: `hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]`
- Headings: `font-pixel uppercase text-3xl md:text-5xl text-sd-ink-strong`
- Eyebrow: `<Eyebrow>&lt;section name&gt;</Eyebrow>`
- Bracket link: `<BracketLink href="...">[&gt; label]</BracketLink>`
- Section wrapper: `<section className="px-6 md:px-10 py-16 md:py-24"><div className="mx-auto max-w-[1440px]">…</div></section>`
- Card primitive: `<BentoCard clip withCorner>…</BentoCard>` for hero pieces; raw `<article className="border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5">` for list items.
- Status pill: `<StatusPill tone="amber">label</StatusPill>` (amber for caution, default neon for live)
- Counters: `<Counter value={n} suffix=" builders" />` (already wired in `lib/useCountUp.ts`)
- Decorative glyph `[ + ]` in top-right of cards via `withCorner` prop on `BentoCard`, or manually `<span aria-hidden className="absolute right-3 top-3 font-mono text-[10px] text-sd-neon-soft/70 select-none">[ + ]</span>`

### 0.3 Layout primitives
- **Page header pattern** (used on every list page):
  ```
  <section className="px-6 md:px-10 pt-24 md:pt-32 pb-8">
    <div className="mx-auto max-w-[1440px]">
      <Eyebrow>&lt;route-name&gt;</Eyebrow>
      <h1 className="mt-3 font-pixel uppercase text-4xl md:text-6xl text-sd-ink-strong">## Page Title</h1>
      <p className="mt-4 max-w-2xl text-sd-ink-soft/80">{one-line subtitle}</p>
      <!-- right-side stat: <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sd-neon-soft"><Counter value={…} /></p> -->
    </div>
  </section>
  ```
- **Filter bar pattern** (used on showcase/members/jobs/bounty/events):
  ```
  <div className="sticky top-[64px] z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-3 glass-dark border-y border-sd-wine-500/30">
    <div className="mx-auto max-w-[1440px] flex flex-wrap items-center gap-2">
      <!-- chips: <button class="font-mono text-[10px] uppercase tracking-[0.2em] border rounded-full px-3 py-1.5 border-sd-wine-500/40 text-sd-ink-soft/80 hover:border-sd-neon hover:text-sd-neon">label</button> -->
      <!-- active chip: add "border-sd-neon text-sd-neon bg-sd-wine-700/30" -->
    </div>
  </div>
  ```
- **Empty state pattern**: centered `[ + ]` glyph, `<h3 className="font-pixel uppercase text-2xl text-sd-ink-strong">no signals yet</h3>`, body, primary CTA.

### 0.4 Data model conventions
All collections live in `data/content.ts` (or split into `data/showcase.ts`, `data/members.ts`, etc. for files >200 lines). Each entity uses `id: number` (or `slug: string` for routable ones), ISO-ish timestamps (`"2026-05-12"`), and a `tags: string[]` array for filtering. Each file exports a TypeScript `interface` for the entity and a `const` array of seeded data (12+ items per list).

### 0.5 Accessibility & motion
- All interactive elements keyboard-focusable; use `<button>` not `<div onClick>`.
- Images: provide `alt`. Avatars fall back to initials in a 12×12 rounded-md with `border-sd-wine-500/40 bg-sd-bg-2 font-pixel uppercase text-sd-neon`.
- Respect `prefers-reduced-motion` (already handled globally).
- Color contrast: text on `sd-bg-0` must be `sd-ink-soft` or stronger.

---

## 1. `/showcase` — Project Gallery

**Goal:** Public gallery of what SelaDevs members are shipping. Card grid with filters by stack and role; click → detail modal. Pre-seed with 12 items using real-feeling Malaysian indie/dev projects.

### 1.1 Route: `app/showcase/page.tsx`
- Server component, no client state at the page level.
- Imports `<ShowcaseExplorer />` from `components/sections/showcase/ShowcaseExplorer.tsx` (client island for filters + modal).
- Imports `<ShowcaseHero />` (server) and `<ShowcaseGrid />` (server, receives filtered list as prop).

### 1.2 Components

**`components/sections/showcase/ShowcaseHero.tsx`** (server)
- Eyebrow `<showcase>`, h1 `## what we ship`, subtitle "twelve projects. one forge. no fluff — every entry below was built by a SelaDevs member."
- Right side: `<Counter value={12} suffix=" active projects" />` and a StatusPill `<StatusPill>live · v2.0</StatusPill>`.
- Below: small `MarqueeRow` of stack chips (`typescript`, `next.js`, `rust`, `python`, `elixir`, `go`, `react native`, `flutter`, `svelte`, `kotlin`, `swift`, `solidity`).

**`components/sections/showcase/ShowcaseExplorer.tsx`** (`"use client"`)
- Props: `items: ShowcaseItem[]` from server.
- State: `activeTag: string | "all"`, `query: string`, `sort: "new" | "top" | "random"`, `openId: number | null`.
- Renders: `<ShowcaseFilterBar />` (sticky) + `<ShowcaseGrid items={filtered} onOpen={setOpenId} />` + `<ShowcaseDetailModal item={open} onClose={…} />`.
- Filter logic: case-insensitive match on `item.title`, `item.author.handle`, or any tag. Sort by `item.addedAt` desc (new), `item.stars` desc (top), Fisher-Yates shuffle (random, deterministic seed from `Date.now()` for first render, then button to reshuffle).

**`components/sections/showcase/ShowcaseFilterBar.tsx`** (client, but pure)
- Props: `tags: string[]`, `active`, `onChange`, `query`, `onQueryChange`, `sort`, `onSortChange`.
- Layout: left = horizontal scrollable chips, right = sort `<select>` (styled to look like a chip) and a search input with bracket prefix `[? search →]`.
- Keyboard: `/` focuses search; `Esc` clears.

**`components/sections/showcase/ShowcaseGrid.tsx`** (server-receiving, but used in client — mark it client too)
- Responsive: 1 col mobile, 2 col `md`, 3 col `lg`. Gap-3.
- Card content (see `ShowcaseCard`).

**`components/sections/showcase/ShowcaseCard.tsx`**
- `<article className="group relative border border-sd-wine-500/30 bg-sd-bg-1/60 rounded-2xl p-5 transition-all duration-200 hover:border-sd-neon/70 hover:shadow-[0_0_30px_rgba(255,45,85,0.18)]">`
- Top: cover image (16:10, fallback gradient `from-sd-wine-700/40 to-sd-bg-1`) and the `[ + ]` glyph absolute top-right.
- Middle: `h3 font-semibold text-sd-ink-strong` (title) + `p text-xs text-sd-ink-soft/70` (one-line desc, 80 chars max).
- Tag row: 3–4 mono chips.
- Footer row: avatar circle (12×12, initials), `@handle` in `font-mono text-[11px] text-sd-neon-soft`, star count `★ 1.2k` and fork count.
- Whole card is a `<button>` that opens the modal (a11y: `aria-haspopup="dialog"`).

**`components/sections/showcase/ShowcaseDetailModal.tsx`** (client)
- Uses existing `<Modal>` primitive, width `max-w-2xl`.
- Sections: cover image full-width, title + handle row, tag chips, long description (3–5 sentences), "tech stack" list (icon-less bullets), link list (live demo, github, writeup — only include the ones present in data), and a "ship it too" CTA `<BracketLink href="/members">[> join a guild]</BracketLink>`.

### 1.3 Data: `data/showcase.ts`
```ts
export type ShowcaseItem = {
  id: number;
  slug: string;
  title: string;
  author: { handle: string; name: string };
  cover: string;          // path under /public/showcase/ OR gradient seed
  oneLiner: string;       // <= 80 chars
  description: string;    // 3-5 sentences
  tags: string[];         // e.g. ["next.js","typescript","ai"]
  stack: string[];
  stars: number;
  forks: number;
  links: { live?: string; github?: string; writeup?: string };
  addedAt: string;        // ISO date
};
```
Seed 12 items. **Required entries (use these titles + handles, fill the rest):**
1. `SplitHold` — `kagerou1107` — "splitwise for roommates who hate spreadsheets" — `["next.js","typescript","supabase"]`
2. `Jarak Tracker` — `unc_sayyuf` — "GPS mileage logger that doesn't sell your data" — `["flutter","dart","maps"]`
3. `Eternal Frame Fate V2` — `kagerou1107` — "anime frame-perfect gacha simulator" — `["react","vite","tailwind"]`
4. `AI-OS` — `strdst7` — "voice-first linux desktop, mys-style" — `["rust","tauri","whisper"]`
5. `NullHold` — `kagerou1107` — "minimal kanban that actually respects your time" — `["svelte","supabase"]`
6. `JomEnvois` — `aniqzr344` — "SMS-first group payments for mamak nights" — `["next.js","postgres","twilio"]`
7. `Bungkus` — `rendra.my` — "scan receipts, split with friends, settle in Ringgit" — `["react-native","ocr"]`
8. `Selat` — `tsara.id` — "open-source uptime monitor for SEA SMEs" — `["go","clickhouse"]`
9. `KopiPawang` — `ameera.dev` — "Kopi ordering app with queue ETAs" — `["flutter","firebase"]`
10. `NasiNet` — `haziq.dev` — "tiny HTTP server in 200 lines of Rust" — `["rust","http"]`
11. `RokokRegex` — `aiman.sh` — "regex playground with Malaysian phone validation" — `["typescript","wasm"]`
12. `Tukar` — `syafiqah.codes` — "currency exchange rate notifier for Telegram" — `["python","telegram"]`

Create stub images: in `public/showcase/`, generate 12 SVG covers named `1.svg` … `12.svg`. Each SVG is a 16:10 (800×500) abstract gradient + the project initial in 200px `VT323` (use system fallback `"VT323", monospace`), with two of: diagonal lines, dots, glow blobs. All gradients use `stop-color` from `[#FF2D55, #B01434, #5F0617, #14070C, #9B5CFF, #FFB454]`. Don't ship raster images — keep them tiny inline SVGs.

### 1.4 A11y / SEO
- `<title>` template uses existing metadata pattern.
- OpenGraph image for `/showcase` page = first cover SVG.
- Loading: 8 `<Skeleton className="aspect-[16/10] rounded-2xl" />` cards.

### 1.5 Acceptance criteria
- [ ] `npm run build` passes.
- [ ] All 12 cards render with cover, title, handle, tag chips.
- [ ] Filter by tag updates grid; combined with search; sort changes order.
- [ ] Modal opens on click, closes on Esc and backdrop click.
- [ ] Empty state appears when no items match.
- [ ] Lighthouse a11y ≥ 90.

---

## 2. `/members` — Builders Directory

**Goal:** Searchable, filterable list of SelaDevs members with profile cards. This is the "people" page.

### 2.1 Route: `app/members/page.tsx`
- Server, imports `<MembersExplorer />` and `<LeaderboardStrip />`.

### 2.2 Components

**`components/sections/members/MembersHero.tsx`**
- Eyebrow `<builders>`, h1 `## the people behind the code`, subtitle "1,751 builders across Malaysia and counting."
- Right side: `<Counter value={1751} suffix=" builders" />` + `<StatusPill>1,247 online</StatusPill>` (live-ping).
- Stat strip (3 cells, BENTO grid): `1,751 builders`, `89 guilds`, `13 states` — each cell uses `<BentoCard clip withCorner>` with `font-pixel text-3xl text-sd-ink-strong` and `font-mono text-[10px] uppercase` label.

**`components/sections/members/LeaderboardStrip.tsx`**
- Horizontal marquee (use `MarqueeRow` primitive) of top 10 handles, formatted as:
  ```
  [#1] @kagerou1107 · 142 stars · KL · 0x4a…21
  ```
- Reverse row 2 with the next 10. Click anywhere → `/members/[handle]`.

**`components/sections/members/MembersExplorer.tsx`** (`"use client"`)
- State: `query`, `activeRole: string | "all"`, `activeState: string | "all"`, `sort: "rank" | "name" | "joined"`, `view: "grid" | "list"`.
- Filter bar uses the standard pattern. Role chips: `all`, `frontend`, `backend`, `full-stack`, `mobile`, `devops`, `ml/ai`, `design`, `data`, `security`. State chips: `all`, `KL`, `Selangor`, `Penang`, `Johor`, `Sabah`, `Sarawak`, `Perak`.
- Toggles grid/list with the same data; list view shows a denser row.

**`components/sections/members/MemberCard.tsx`**
- Avatar 16×16, with online dot (green via `--color-sd-money` #FF4D6D) bottom-right if online.
- `h3` = display name; `p font-mono text-[11px] text-sd-neon-soft` = `@handle`.
- 2-line bio.
- 3 mono chips: role, state, primary stack.
- Footer: `★ stars` count, `joined Mon YYYY`.

**`components/sections/members/MemberListRow.tsx`**
- 1-line row: avatar · `@handle · Display Name` · role · state · `★ n` · joined date · `[> profile →]`.

### 2.3 Data: `data/members.ts`
```ts
export type Member = {
  id: number;
  handle: string;          // e.g. "kagerou1107"
  name: string;            // e.g. "Aiman R."
  bio: string;             // 1-2 sentences
  role: "frontend"|"backend"|"full-stack"|"mobile"|"devops"|"ml/ai"|"design"|"data"|"security";
  state: "KL"|"Selangor"|"Penang"|"Johor"|"Sabah"|"Sarawak"|"Perak"|"Pahang"|"Kelantan"|"Melaka"|"Negeri Sembilan"|"Perlis"|"Kedah"|"Terengganu";
  stack: string[];         // 2-4 items
  stars: number;
  joined: string;          // ISO date
  online: boolean;
  wallet: string;          // 0x… 8 chars (placeholder)
};
```
Seed 24 members (more than 12 to demonstrate filtering density). Required handles (must appear in the 24): `kagerou1107`, `unc_sayyuf`, `strdst7`, `aniqzr344`, `rendra.my`, `tsara.id`, `ameera.dev`, `haziq.dev`, `aiman.sh`, `syafiqah.codes`. Fill the remaining 14 with believable Malaysian dev handles (`najwa.codes`, `arif.builds`, `aishah.sh`, `izzat.dev`, `syakirah.io`, `daniyal.rs`, `farouq.sh`, `hafiz.py`, `iman.go`, `qistina.ts`, `arjun.svelte`, `mei.lin`, `dinesh.codes`, `syamir.kl`).

### 2.4 Profile page: `app/members/[handle]/page.tsx`
- Server component. `generateStaticParams` returns all 24 handles.
- Layout: hero (avatar 24×24, `@handle`, wallet short, `[copy wallet]` button client component), 3 stat cards (stars, joined, rank), bio, stack list, recent showcase items (cross-link by `author.handle` from `data/showcase.ts`), guilds they're in (cross-link by membership), `[> message]` CTA (placeholder href).
- Loading: shimmer for the hero block; error: retry; not-found: `<Eyebrow>&lt;404&gt;</Eyebrow>` + back link.

### 2.5 Acceptance criteria
- [ ] 24 members visible across 9 roles, 13 states.
- [ ] Combined search + role + state filter works; result count updates live.
- [ ] Grid/list toggle persists in `?view=list` (useSearchParams).
- [ ] Profile route renders for all 24 handles, returns 404 for unknown.
- [ ] Filter bar is sticky below the global header on scroll.

---

## 3. `/guilds` — Guild Directory

**Goal:** Discover and join guilds (themed working groups). Card grid with category filters and a featured "guild of the week" hero.

### 3.1 Route: `app/guilds/page.tsx`

### 3.2 Components

**`components/sections/guilds/GuildsHero.tsx`**
- Eyebrow `<guilds>`, h1 `## find your crew`, subtitle "themed working groups. weekly sprints. real shipping."
- Right: `<Counter value={89} suffix=" active guilds" />` + StatusPill `<StatusPill>12 recruiting</StatusPill>`.

**`components/sections/guilds/FeaturedGuild.tsx`** (server)
- Bento grid 2-col on `lg`:
  - Left: large 5×3 ratio "guild of the week" card with gradient overlay, big guild name in pixel font, member count, current mission statement, `[> join guild]` and `[> view manifesto]` bracket links.
  - Right: stacked 3 mini stat cards: `members`, `missions shipped`, `bounties earned`.
- Featured guild is `Edge Runners` (see data).

**`components/sections/guilds/GuildsExplorer.tsx`** (`"use client"`)
- Filter chips: category (`all`, `frontend`, `backend`, `infra`, `ai/ml`, `mobile`, `security`, `web3`, `design`, `dx`), recruiting status (`all`, `recruiting`, `closed`), cadence (`all`, `weekly`, `biweekly`, `monthly`).
- Search by name/lead.
- Sort: `members`, `recent activity`, `a-z`.
- Grid of `GuildCard`.

**`components/sections/guilds/GuildCard.tsx`**
- Top: a 2-color "guild banner" SVG (no images) — 24×6 bar using two `sd-wine-*` colors keyed by category.
- Title (pixel, 2xl), one-liner, lead `@handle`, member avatars (stacked 4 max, +N), mono chips (category, cadence, recruiting state).
- Footer row: `[last activity: 2h ago]` in mono + `[> enter guild →]`.

**`components/sections/guilds/CreateGuildCTA.tsx`**
- `BentoCard clip withCorner` with copy "don't see your tribe? start a guild." + primary button → `/guilds/new` (stub page returns "coming soon" with email capture form).

### 3.3 Data: `data/guilds.ts`
```ts
export type Guild = {
  id: number;
  slug: string;
  name: string;            // e.g. "Edge Runners"
  tagline: string;         // <= 100 chars
  category: "frontend"|"backend"|"infra"|"ai/ml"|"mobile"|"security"|"web3"|"design"|"dx";
  cadence: "weekly"|"biweekly"|"monthly";
  recruiting: boolean;
  members: number;
  maxMembers: number;
  lead: { handle: string; name: string };
  mission: string;         // current sprint mission
  banners: [string,string];// 2 sd-* hex colors
  recentActivity: string;  // "2h ago"
  nextSession?: string;    // ISO date for next meeting
  links: { discord?: string; github?: string; manifesto?: string };
};
```
Seed 12 guilds. **Required names:** `Edge Runners` (featured), `Bento Brigade`, `Prompt Pilots`, `Telegram Titans`, `Rust Rangers`, `Cloud Cartel`, `GPU Ghosts`, `React Renegades`, `Svelte Syndicate`, `Kotlin Knights`, `Design Disruptors`, `Security Sentinels`. Use believable leads (cross-ref members data where possible). `Edge Runners` lead = `kagerou1107`, members = 87/100, mission = "ship a 1k-star OSS tool in 90 days", cadence = weekly, nextSession = "2026-06-04T20:00+08:00".

### 3.4 Detail page: `app/guilds/[slug]/page.tsx`
- Server. `generateStaticParams` over 12 slugs.
- Hero: guild name pixel, tagline, lead, member count, recruiting pill, `[> apply to join]` CTA.
- Sections: "current mission" (h2 pixel + body), "members" (avatar grid linking to `/members/[handle]`), "recent showcase" (cross-link to `data/showcase.ts` items by `author.handle`), "code of conduct" stub, "next sessions" (list of 3 future ISO dates as a small calendar).
- Loading: 3-column shimmer; not-found: bracket back link.

### 3.5 Acceptance criteria
- [ ] 12 guilds render with banner, lead, members, cadence, recruiting state.
- [ ] Filter by category + recruiting + cadence, with search.
- [ ] Featured "Edge Runners" appears above the grid, always.
- [ ] Detail page renders for all 12 slugs.

---

## 4. `/events` — Events Calendar

**Goal:** Upcoming + past events with filters, calendar/list toggle, RSVP stub.

### 4.1 Route: `app/events/page.tsx`

### 4.2 Components

**`components/sections/events/EventsHero.tsx`**
- Eyebrow `<events>`, h1 `## what we're running`, subtitle "showcases, hacknights, townhalls. free, always."
- Right: `<Counter value={24} suffix=" events / yr" />` + StatusPill `<StatusPill tone="amber">next: 3d 4h</StatusPill>`.

**`components/sections/events/EventsToggle.tsx`** (`"use client"`)
- Two pills: `[ list ]` `[ calendar ]`. Calendar view shows the current month as a 7-col grid (Sun-start) with day cells. Each day cell shows up to 3 event dots (color = category). Click a dot → opens day drawer.
- Month nav: `[< june 2026 >]`.

**`components/sections/events/EventsList.tsx`**
- Grouped by month. Each group: month label in pixel, then a list of `EventRow`.

**`components/sections/events/EventRow.tsx`**
- Date column (left, fixed width): `font-pixel text-2xl` day number + `font-mono text-[10px] uppercase` weekday + month abbrev.
- Body: title (h3), venue line, time range, category chip, RSVP pill (shows count, e.g. `47 / 120 rsvp`, click → toggles local state "going").
- Right: `[> details →]`.

**`components/sections/events/EventDetail.tsx`** (client, modal)
- Title, hero banner (SVG pattern like showcase), description (3 paragraphs), agenda (ordered list with timestamps in mono), speakers (avatar + name + role), location (venue name + "add to calendar" with a `<a href="…ics">` download link), RSVP button.

### 4.3 Data: `data/events.ts`
```ts
export type EventCategory = "showcase"|"hacknight"|"townhall"|"workshop"|"social"|"bounty-launch";
export type EventItem = {
  id: number;
  slug: string;
  title: string;
  category: EventCategory;
  start: string;          // ISO datetime in +08:00
  end: string;
  venue: { name: string; city: string; mode: "in-person"|"online"|"hybrid" };
  description: string;    // 2-3 sentences
  agenda: { time: string; label: string }[];
  speakers: { handle: string; name: string; role: string }[];
  capacity: number;
  rsvps: number;
  cover: string;          // SVG seed id
};
```
Seed 9 events spanning the next 90 days starting 2026-06-01. **Required entries:**
1. `Edge Runners Demo Night #14` — showcase — KL — 2026-06-12T20:00+08:00
2. `Prompt Pilots: Voice Agents in Prod` — workshop — online — 2026-06-18T21:00+08:00
3. `June Townhall: Vibe Coding` — townhall — KL — 2026-06-25T19:30+08:00
4. `Hacknight: 12-hour Bounty Sprint` — hacknight — Penang — 2026-07-04T10:00+08:00
5. `Showcase v2.0 Launch` — bounty-launch — KL — 2026-07-11T19:00+08:00
6. `GPU Ghosts: Inference on a Budget` — workshop — online — 2026-07-19T15:00+08:00
7. `Selat v1.0 Release Party` — social — KL — 2026-07-26T18:00+08:00
8. `August Townhall: Builder Burnout` — townhall — online — 2026-08-06T20:00+08:00
9. `Telegram Titans: Botathon` — hacknight — KL — 2026-08-22T10:00+08:00

Speakers cross-ref members data where possible (e.g. `kagerou1107`, `strdst7`, `ameera.dev`, `aim_an.sh`).

### 4.4 Detail page: `app/events/[slug]/page.tsx`
- Server. Reuse the modal as a full page (or render `<EventDetailEmbed item={e} />` from the modal component split out).
- Past events (`end < now`) get a "replay" stub: `[> watch recording]` disabled button with "coming soon" tooltip.

### 4.5 Acceptance criteria
- [ ] 9 events render in both list and calendar views.
- [ ] RSVP state persists in `localStorage` (key `sd:rsvp:<id>`).
- [ ] Calendar day cell with events opens a drawer listing them.
- [ ] `.ics` download link generates a valid VCALENDAR for the event.

---

## 5. `/jobs` — Job Board

**Goal:** Bracket-tech style job board — public listings with rich filters, salary transparency, and an "apply" CTA that opens a modal. Includes a "post a job" pricing pitch (reuse `<SDJobsPricing />` from home).

### 5.1 Route: `app/jobs/page.tsx`

### 5.2 Components

**`components/sections/jobs/JobsHero.tsx`**
- Eyebrow `<hiring>`, h1 `## jobs that ship`, subtitle "open roles from companies that respect your craft."
- Right: `<Counter value={3} suffix=" open roles" />` + StatusPill `<StatusPill tone="amber">updated daily</StatusPill>`.

**`components/sections/jobs/JobsStatsStrip.tsx`**
- 4 bento cells: `RM39k+ median`, `24h reply SLA`, `no ghost jobs`, `verified companies`. Each `<BentoCard clip>` with `font-pixel text-3xl`.

**`components/sections/jobs/JobsExplorer.tsx`** (`"use client"`)
- Filter chips: type (`all`, `full-time`, `contract`, `internship`, `part-time`), location (`all`, `KL`, `Selangor`, `Penang`, `Johor`, `remote`), comp tier (`all`, `<RM5k`, `RM5–10k`, `RM10–20k`, `RM20k+`).
- Search by title/company/tags.
- Sort: `newest`, `comp high → low`, `comp low → high`.
- Toggle: list / table (table view on `lg+` only: cols = role, company, location, type, comp, posted, [> apply]).

**`components/sections/jobs/JobCard.tsx`**
- Company avatar (12×12), title, company name, location/type mono line, salary in pixel, posted time mono, tag chips (max 4), `[> apply →]`.
- When `urgent` tag present, render a `glow-wine` border (existing utility).

**`components/sections/jobs/JobApplyModal.tsx`** (client)
- Uses `<Modal>`. Form: name, email, github/x handle, short note (textarea, 500 chars max with counter), resume URL (optional), `[> send application]`.
- On submit: client-side only — store in `localStorage` under `sd:apply:<jobId>`, show "sent" success state, no real network call.
- Includes disclaimer: "this is a demo. in prod, this posts to /api/apply."

**`components/sections/jobs/PostJobCTA.tsx`**
- Re-export of `<SDJobsPricing />` from home, but on this page it lives between the explorer and the footer.

### 5.3 Data: `data/jobs.ts`
Replace the existing `JOBS` export in `data/content.ts` with a richer type and 12 seeded jobs. **Required entries (use these verbatim, expand comp where noted):**
1. `RunCloud Sdn Bhd` — `Software Engineer Intern` — Cyberjaya — Internship — `RM700/mo` — posted 25d ago — tags `["php","laravel","linux"]`
2. `Peripamo Technologies` — `Platform / DevSecOps Engineer` — KL — Contract — `RM39,000 – RM45,000` — 1mo — tags `["kubernetes","aws","terraform"]`
3. `Courtsite` — `Full Stack Product Engineer` — KL Eco City — Full-time — `RM5,000 – RM15,000` — 2mo — tags `["next.js","typescript","postgres"]`
4. `Bungkus Sdn Bhd` — `Mobile Engineer (React Native)` — Remote — Full-time — `RM8,000 – RM12,000` — 5d — tags `["react-native","typescript"]` — **urgent**
5. `Selat` — `Backend Engineer (Go)` — Penang — Full-time — `RM10,000 – RM18,000` — 12d — tags `["go","clickhouse"]`
6. `KopiPawang` — `Flutter Lead` — KL — Full-time — `RM14,000 – RM22,000` — 18d — tags `["flutter","firebase","lead"]`
7. `AI-OS` — `Rust / Tauri Engineer` — Remote — Contract — `RM18,000 – RM28,000` — 3d — tags `["rust","tauri"]` — **urgent**
8. `RokokRegex` — `Developer Relations` — KL — Part-time — `RM3,500 – RM5,000` — 9d — tags `["devrel","writing"]`
9. `Tukar` — `Python Backend (Telegram bots)` — Remote — Contract — `RM6,000 – RM9,000` — 21d — tags `["python","telegram","fastapi"]`
10. `Edge Runners` — `Open Source Maintainer` — Remote — Part-time — `RM2,500 stipend` — 30d — tags `["oss","maintainer"]`
11. `Seladevs Core` — `Community Lead` — KL — Full-time — `RM12,000 – RM16,000` — 1d — tags `["community","ops"]`
12. `JomEnvois` — `Founding Engineer` — KL — Full-time — `RM15,000 – RM25,000 + 0.5% equity` — 7d — tags `["next.js","founder"]` — **urgent**

Each job gets a `slug`, `description` (3–5 sentences describing the role, requirements, what you'll ship), `requirements: string[]` (4–6 bullets), `nice: string[]` (2–3 bullets), `perks: string[]` (3–4 bullets), `applyEmail: string` (placeholder `jobs@<domain>.com`), `urgent: boolean`, `verified: boolean`.

### 5.4 Detail page: `app/jobs/[slug]/page.tsx`
- Server. `generateStaticParams` over 12 slugs.
- Layout: header (company, role, salary, location, type, posted), body (description, requirements list, nice-to-have, perks), sidebar (apply CTA → opens the modal, share `[copy link]` button, "report this listing" link).
- 404 for unknown slugs.

### 5.5 Acceptance criteria
- [ ] 12 jobs render with full filter combinations working.
- [ ] Apply modal persists submission to `localStorage` and shows success.
- [ ] Table view on `lg+` aligns cleanly, no horizontal scroll.
- [ ] Detail page renders for all 12 slugs.

---

## 6. `/code/bounty` — Bounty Board

**Goal:** Two sections: (1) live bounties with payouts, (2) "bounty poll" — vote on the next. The `/code/bounty` path is intentional (the `code` segment is a route group that can be a `layout.tsx` shell).

### 6.1 Route: `app/code/bounty/layout.tsx` (server)
- Renders a slim sub-header with a "bounty terminal" HUD: `[ seladev_os // bounty.exe ] · v2.0 · 6 live`. Reuse the `animate-hud-beam` utility on a thin gradient bar.

### 6.2 Route: `app/code/bounty/page.tsx`
- Imports `<BountyTerminal />` and `<BountyPoll />` and `<PastBounties />`.

### 6.3 Components

**`components/sections/bounty/BountyTerminalHero.tsx`**
- Eyebrow `<bounty>`, h1 `## bounty board`, subtitle "earn Ringgit for shipping technical excellence. every bounty has a public rubric."
- Right: `<Counter value={6400} prefix="RM " suffix=" in flight" />` + StatusPill `<StatusPill>6 live</StatusPill>`.
- Below: a faux terminal `<BentoCard clip>` block with the typing effect (use `animate-cursor-blink`):
  ```
  $ seladev bounty list --live
  > 6 bounties · 3 closing this week
  > payout range: RM 150 – RM 1,200
  > type "claim" to enter the queue
  ```

**`components/sections/bounty/BountyExplorer.tsx`** (`"use client"`)
- Filter chips: track (`all`, `frontend`, `backend`, `infra`, `ai/ml`, `mobile`, `security`, `docs`, `design`), status (`all`, `open`, `closing-soon`, `claimed`, `judging`, `paid`).
- Sort: payout high → low, newest, closing soon.
- Search by title/issuer.

**`components/sections/bounty/BountyCard.tsx`**
- Top: `[ track / payout / closes in ]` row in mono caps.
- Title (pixel), 1-line desc (mono), 4 tag chips.
- Footer: payout big pixel (`RM 800`), closes in (mono, color amber if <24h), `[> claim →]`.
- "closing-soon" = amber left border (`border-l-4 border-sd-amber`).

**`components/sections/bounty/BountyDetailModal.tsx`** (client)
- Sections: title, payout box (BentoCard with pixel), full description, "what we expect" (rubric bullets), "how claims are judged" (paragraph), "submission format" (code block in mono with a curl example), issuer handle, status timeline (4 mono steps: open → claimed → submitted → paid).

**`components/sections/bounty/BountyPoll.tsx`**
- Heading: "vote the next bounty — top 3 ship next sprint."
- 5 poll options as `BentoCard clip` cards: title, 1-line desc, vote bar (mono, % of total, animates on click), `[> vote →]`.
- Local state, no backend. Show "you voted: X" toast. Show 24h "voting closes in" countdown.

**`components/sections/bounty/PastBounties.tsx`**
- "recently paid" — MarqueeRow of `[ handle · RM payout · bounty title · paid 2d ago ]` rows.

### 6.4 Data: `data/bounties.ts`
```ts
export type BountyStatus = "open"|"closing-soon"|"claimed"|"judging"|"paid";
export type Bounty = {
  id: number;
  slug: string;
  title: string;
  track: "frontend"|"backend"|"infra"|"ai/ml"|"mobile"|"security"|"docs"|"design";
  status: BountyStatus;
  payout: number;         // in RM
  currency: "RM";
  closesAt: string;       // ISO
  description: string;    // 3-5 sentences
  rubric: string[];       // 4-6 bullets
  judging: string;        // paragraph
  submission: string;     // curl/code block
  issuer: { handle: string; name: string };
};
export type BountyPollOption = {
  id: number;
  title: string;
  description: string;
  proposedBy: string;     // handle
};
```
Seed 8 open bounties (mix of statuses, 3 in `closing-soon` with closesAt < 48h from "now" = 2026-06-02T19:28+08:00). **Required titles:**
1. `Add PWA offline cache for /showcase` — frontend — RM 600
2. `ClickHouse schema for guild events` — backend — RM 1,200
3. `Whisper.cpp CI runner on Tauri` — ai/ml — RM 1,000
4. `Mobile haptics for Bungkus checkout` — mobile — RM 450 — closing-soon
5. `Pinned 2FA on bounty claim` — security — RM 900
6. `Public roadmap docs (Docusaurus)` — docs — RM 350
7. `Refresh seladevs.com hero illustration` — design — RM 800 — closing-soon
8. `K8s GitOps repo template` — infra — RM 1,100 — closing-soon

Seed 5 poll options (titles): `Edge function in 100 LoC`, `Mamak split-bill PWA`, `OCR receipt parser`, `Builder reputation score`, `Telegram bounty bot`.

Seed 6 "recently paid" entries for the marquee: `[handle, payout, title, "Xd ago"]`.

### 6.5 Detail page: `app/code/bounty/[slug]/page.tsx`
- Server. `generateStaticParams` over the 8 slugs.
- Renders the same data as the modal but full-page. `[> claim this bounty]` opens a "claim" modal (just confirms and writes to `localStorage` under `sd:claim:<id>`).

### 6.6 Acceptance criteria
- [ ] 8 bounties filterable by track + status, sortable by payout.
- [ ] `closing-soon` cards show amber left border and amber time.
- [ ] Poll votes persist in `localStorage` under `sd:poll:<id>`.
- [ ] Marquee scrolls infinitely (already handled by the `Marquee` primitive).
- [ ] Detail pages render for all 8 slugs.

---

## 7. `/map` — Community Map

**Goal:** Full interactive-feeling map of Malaysia with state-level builder density. Hover a state → details. Click → state detail page.

### 7.1 Route: `app/map/page.tsx`
- Server. Imports `<MapHero />`, `<MapExplorer />` (client for hover/click), `<StateGrid />` (the existing chip grid, but enriched).

### 7.2 Components

**`components/sections/map/MapHero.tsx`**
- Eyebrow `<community map>`, h1 `## malaysia tech map`, subtitle "1,751 builders. 13 states. one forge."
- Right: `<Counter value={1751} suffix=" builders · 89 guilds" />` + StatusPill `<StatusPill>live</StatusPill>`.

**`components/sections/map/MapExplorer.tsx`** (`"use client"`)
- Two-column bento:
  - **Left (2/3 width):** large SVG map of Malaysia (`MalaysiaMapSVG`). Each state is a `<path>` with `data-state="<code>"`. On hover, the path fills with a `sd-neon` gradient and shows a tooltip (existing `useInView` is not needed — use plain React state for the hovered state). On click, navigate to `/map/[state]`.
  - **Right (1/3):** "currently selected" panel — shows the hovered state's name (pixel), landmark, and 4 mini stats (builders, guilds, jobs, events). When nothing is hovered, show the top-3 most active states stacked.
- Below the map: filter chips (region: `all`, `peninsular`, `borneo`, `kl/putrajaya`), sort states by builders/guilds/events, and a search by state name.

**`components/sections/map/MalaysiaMapSVG.tsx`**
- Pure SVG, viewBox `0 0 600 360`, no external libs.
- 13 states + KL + Putrajaya, total 15 paths. Use a hand-drawn-feel polygon for each (real-ish shapes, not rectangles). See Section 7.4 for the geometry table.
- Default fill: `rgba(140, 42, 62, 0.25)` (sd-line at 25% alpha); stroke: `sd-wine-500` `#8C2A3E`; stroke-width 1; hover fill: `url(#sdMapHover)` (defined in `<defs>` as a radial gradient of `sd-neon`).
- Each `<path>` has `data-state` and an `aria-label` like `Johor — 0 builders (live)`.
- For KL and Putrajaya, use small filled circles inside Selangor's region, with their own `data-state` and labels.

**`components/sections/map/StateGrid.tsx`**
- Replace the existing chips with enriched cards in a 3-col `md`, 5-col `lg` grid. Each card: code (mono), state name (pixel), landmark (mono), builder count (pixel big), `[> view →]`. Hover: same glow effect.

**`components/sections/map/RegionStats.tsx`**
- 3 mini bento cells: `Peninsular 1,420 builders`, `Borneo 218 builders`, `Federal 113 builders`. Compute counts from the data.

### 7.3 Data: `data/map.ts`
```ts
export type StateDatum = {
  code: string;            // "JOHOR"
  name: string;            // "Johor"
  landmark: string;        // "Abu Bakar Mosque"
  region: "peninsular"|"borneo"|"federal";
  coords: { x: number; y: number }; // label position for the SVG
  pathD: string;           // SVG path d-attribute
  builders: number;        // seed realistic counts
  guilds: number;
  jobs: number;
  events: number;
};
```
Seed counts (sums to ~1751): KL 480, Selangor 412, Penang 218, Johor 174, Sabah 96, Sarawak 89, Perak 67, Pahang 52, Kedah 41, Melaka 38, Negeri Sembilan 33, Kelantan 24, Terengganu 18, Putrajaya 9. Guilds proportionally (5–8% of builders). Jobs 1–3 per active state. Events 0–4 per state.

### 7.4 SVG geometry (path-d strings)
Hand-authored paths in a 600×360 viewBox. Use these starting points; refine for visual correctness, but keep all paths non-overlapping and within the viewBox. Origin is top-left; peninsular Malaysia occupies roughly the upper-middle, Sabah/Sarawak the lower-right (Borneo).

| code | approx bbox (x,y,w,h) | d-string starter |
|---|---|---|
| PERLIS | 200,30,40,30 | `M210 30 L240 30 L245 60 L205 65 Z` |
| KEDAH | 175,55,80,55 | `M180 60 L255 60 L250 115 L170 110 Z` |
| PULAU PINANG | 195,118,30,18 | `M195 118 L225 118 L222 136 L195 136 Z` (island, small) |
| PERAK | 195,135,75,80 | `M198 140 L268 138 L262 218 L190 215 Z` |
| KELANTAN | 290,60,55,80 | `M295 60 L345 55 L348 140 L292 142 Z` |
| TERENGGANU | 305,140,60,75 | `M308 140 L365 138 L362 215 L305 215 Z` |
| PAHANG | 245,215,115,90 | `M248 215 L360 215 L355 305 L242 305 Z` |
| SELANGOR | 215,225,55,55 | `M218 225 L272 225 L268 280 L215 280 Z` |
| KL | inside Selangor | circle at (245, 252) r=4 |
| PUTRAJAYA | inside Selangor | circle at (255, 268) r=3 |
| NEGERI SEMBILAN | 215,282,55,40 | `M218 282 L270 282 L268 322 L215 322 Z` |
| MELAKA | 210,322,30,18 | `M212 322 L240 322 L240 340 L210 340 Z` |
| JOHOR | 240,322,135,38 | `M242 322 L375 322 L370 358 L240 358 Z` |
| SABAH | 430,80,120,140 | `M435 85 L545 80 L548 215 L432 220 Z` |
| SARAWAK | 380,210,180,90 | `M385 215 L555 210 L552 295 L380 298 Z` |

These are intentionally rough — refine during implementation. Each path is `<path data-state="<code>" d="…" />` and gets its `coords` set to the centroid for the label.

### 7.5 Detail page: `app/map/[state]/page.tsx`
- Server. `generateStaticParams` over 15 state slugs (state slug = lowercase, hyphens).
- Sections: state hero (name pixel, landmark, builders, guilds, jobs, events), "active guilds here" (cross-ref `data/guilds.ts` where lead is in that state — for now, fake membership by hashing `guild.id % 3 === 0` of states), "open jobs here" (cross-ref `data/jobs.ts` where `state === "KL"` or matches), "upcoming events" (cross-ref `data/events.ts`), "notable builders" (top 6 by `stars` from `data/members.ts`).
- Loading: shimmer; not-found: 404 with back link.

### 7.6 Acceptance criteria
- [ ] Hovering any state fills it with neon gradient and updates the right panel within 16ms.
- [ ] Clicking navigates to `/map/<state-slug>`.
- [ ] All 15 detail pages render with at least 1 cross-referenced item each (use the deterministic fake logic above if real data is sparse).
- [ ] SVG is keyboard-navigable: tab focuses states in order, Enter triggers navigation.

---

## 8. Shared Concerns

### 8.1 Search params & URL state
- Use `nuqs` only if already installed; otherwise hand-roll with `useSearchParams` + `useRouter().replace` to keep URLs shareable for: `/members?role=backend&state=penang&view=list`, `/jobs?type=full-time&tier=10-20`, `/showcase?tag=next.js&sort=top`, `/guilds?category=ai`, `/code/bounty?track=frontend&status=open`, `/events?view=calendar&month=2026-07`.
- Each page reads initial state from `searchParams` and updates via `replace` to avoid scroll jumps.

### 8.2 Empty / loading / error
- Every list page renders 8 skeleton cards in `loading.tsx` using the existing `<Skeleton>` primitive with `aspect-[16/10]` (showcase) or `aspect-[4/3]` (others).
- `error.tsx` per route: a `<BentoCard clip>` containing "something broke at <route-name>", the error message in mono, and a `[> retry]` button that calls `reset()`.
- `not-found.tsx`: bracket back link + pixel "404 · signal lost".

### 8.3 Theming
- All colors already have `html.light` overrides in `globals.css` (light bg / ink / wine). Pages must use only the `sd-*` tokens; never hardcode `#…`.
- Test: toggle the theme toggle in the header; every page should look correct in both modes.

### 8.4 Performance
- All new pages are server-rendered with static export where possible. `generateStaticParams` on every dynamic route.
- Client components only where strictly required (filters, modal, RSVP, map hover).
- No client-side data fetching — all seed data is in `data/`.
- Images: use inline SVG covers (no raster) for showcase + events to keep the bundle small.

### 8.5 SEO
- Each page sets a `metadata` export with `title`, `description`, and (where applicable) `openGraph.images`. The root layout's `template` adds `· SelaDevs`.

### 8.6 Bracket-link & decorative consistency
- All CTAs that aren't buttons use `<BracketLink>`.
- All cards that benefit from a corner glyph use `BentoCard withCorner` or include the manual `[ + ]` span.
- Pixel headings are `font-pixel uppercase`; mono labels are `font-mono text-[10–11px] uppercase tracking-[0.2em]`.
- Never use `Lorem ipsum`. All copy is concrete, in the SelaDevs voice ("ship", "forge", "builders", "ringgit", "guild", "bounty", "townhall").

---

## 9. Implementation Order (suggested)

1. **Data layer** — create `data/showcase.ts`, `data/members.ts`, `data/guilds.ts`, `data/events.ts`, `data/jobs.ts` (replace existing `JOBS`), `data/bounties.ts`, `data/map.ts` with all required seeds and types. Update `data/content.ts` to re-export any shared slices and keep the `STATES` constant in sync with `data/map.ts` (delegate: `export { STATES as STATES_LEGACY } from "./map";` or simply re-export from `data/map.ts`).
2. **Shared bits** — extract `<EventDetailEmbed>` from the modal; add `<StatePanel>` helper to `components/sections/map/`; add a tiny `<EmptyState>` UI primitive in `components/ui/EmptyState.tsx`.
3. **Showcase** — `app/showcase/page.tsx` + the 5 components in `components/sections/showcase/`. Test in isolation.
4. **Members** — `app/members/page.tsx`, `app/members/[handle]/page.tsx`, and the 4 members components.
5. **Guilds** — `app/guilds/page.tsx`, `app/guilds/[slug]/page.tsx`, `app/guilds/new/page.tsx` stub, 4 guilds components.
6. **Events** — `app/events/page.tsx`, `app/events/[slug]/page.tsx`, 4 events components + the calendar grid math.
7. **Jobs** — `app/jobs/page.tsx`, `app/jobs/[slug]/page.tsx`, 5 jobs components. Hook the apply modal to `localStorage`.
8. **Bounty** — `app/code/bounty/layout.tsx`, `app/code/bounty/page.tsx`, `app/code/bounty/[slug]/page.tsx`, 5 bounty components.
9. **Map** — `app/map/page.tsx`, `app/map/[state]/page.tsx`, 4 map components. Hand-author the SVG paths and verify hover/click + keyboard nav.
10. **Polish pass** — light/dark sweep, skeleton/loading sweep, error boundaries, mobile responsive sweep (test at 375px, 768px, 1280px), `prefers-reduced-motion` sanity, build with `npm run build`, fix any TS errors.

---

## 10. Out of Scope (do NOT build)
- Real auth, real database, real payments, real Discord OAuth, real RSVP backend, real bounty claiming flow, real calendar subscription Webcal.
- Server actions / API routes. This spec is frontend-only with `localStorage` for the few interactive bits.
- New npm dependencies. Tailwind + existing primitives only.
- Migrating to a different framework or component library.
- i18n (English only for v1).
- Admin dashboards for members/jobs/bounties/events.
- Email capture (except the `/guilds/new` "coming soon" form which can be a static mailto link).

---

## 11. Self-Check Checklist (run before declaring done)
- [ ] `npm run build` exits 0.
- [ ] `npm run lint` exits 0 (if configured; otherwise manual `next build` warnings are acceptable).
- [ ] All 6 routes load at `http://localhost:3000/<route>` in dev and prod.
- [ ] All dynamic routes (`/members/[handle]`, `/guilds/[slug]`, `/events/[slug]`, `/jobs/[slug]`, `/code/bounty/[slug]`, `/map/[state]`) render for every seeded entry and return 404 for unknown slugs.
- [ ] Filter + sort + search on every list page works in combination.
- [ ] Light/dark theme renders correctly on every page.
- [ ] Mobile (375px), tablet (768px), desktop (1280px, 1440px) all look intentional.
- [ ] All CTAs use the bracket-link or button system; no raw `<a>` CTAs.
- [ ] All copy is concrete, no `Lorem`.
- [ ] No new files under `node_modules/`, `.next/`, `*.tsbuildinfo`.
- [ ] No git push performed.
