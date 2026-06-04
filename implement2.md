# Implementation Plan — SelaDevs → UTHM Forge

> **Project rebrand:** SelaDevs (national Malaysian developer community) → **UTHM Forge** (student/staff developer community for **Universiti Tun Hussein Onn Malaysia**, Parit Raja, Batu Pahat, Johor).
>
> **Working name:** `uthmforge` (codename, internal).
> **Domain (target):** `uthmforge.uthm.edu.my` (or chosen subdomain).
> **Stack:** Next.js 15 (App Router) + React 19 + Tailwind v4 + TypeScript. No backend rewrite needed — all data is hardcoded in `data/*.ts`.
>
> **Author:** Hermes (acting CTO) — migration plan for implementation sprint.

---

## 0. Why this migration

The current site is a marketing/portal product for a **nationwide** community of Malaysian developers (1,751 builders across 13 states, RM bounties, recruiter marketplace, etc.). Repurposing it for a **single public university** requires reframing the "country" frame as a "campus/faculty" frame. The SelaDevs shell (job board, showcase, townhall, guilds, events, bounties, news, changelog, leaderboard, map) is structurally perfect for a university — we just need to swap the unit of community from *state* to *faculty/department* and the unit of currency from *Ringgit* to *credits / USD-equivalent / RM-scholarship*.

We are **not** gutting routes — we are **re-skinning + re-contenting** the entire site. Every page is touched.

---

## 1. Brand & identity (the spine)

| Old | New | Notes |
|---|---|---|
| `SelaDevs` | **UTHM Forge** | "SelaDevs" appears in **metadata, manifest, PWA, headers, copy** — must be global-replaced. |
| `seladev_os` (system label) | **`uthm_forge_os`** | Internal system handle. |
| `seladevs.com` | **`uthmforge.uthm.edu.my`** | Used in footer, contact, emails, manifest, sitemap, robots. |
| `discord.gg/seladevs` | **`discord.gg/uthmforge`** (or UTHM official) | Header, footer, CTAs. |
| Hero tagline: *"The forge for Malaysia's future builders"* | ***"The forge for UTHM's future builders"*** | Sub-tagline: *"Built in Parit Raja. Shipped to the world."* |
| Hero geo: `lat 03.1390 / lng 101.6869` (KL) | **`lat 1.8585 / lng 103.0833`** (UTHM main campus, Parit Raja) | All map/coords. |
| Hero node: `kl-forge-01` | **`uthm-forge-01`** | Hero identifier. |
| Theme: wine-red `#FF2D55` + dark | **UTHM brand: deep maroon `#7B1E2D` + gold `#F2B441`** with dark | UTHM official palette. Keep neon/cyber feel but shift accent. |
| Fonts: Inter + JetBrains Mono + VT323 | **Keep — no change** (works for UTHM too). |
| Footer: *"© 2026 seladev_os v1.0.0 — built with care in kl"* | ***"© 2026 uthm_forge_os v1.0.0 — built with care in parit raja"*** | |
| Logo files: `seladevs-{dark,light}.png` | **`uthmforge-{dark,light}.png`** | Replace binaries in `public/logo/`. |
| PWA icons: `seladevs-{192,256,384,512,-maskable}.png` | **`uthmforge-{192,256,384,512,-maskable}.png`** | Replace binaries. |
| PWA cache name: `seladevs-v1` | **`uthmforge-v1`** | In `public/sw.js`. |
| PWA start URL: `/` | **Unchanged** | |

### 1.1 Theme tokens (Tailwind v4 `@theme` block in `app/globals.css`)
- Keep dark/light architecture.
- Replace `--color-accent`, `--color-accent-wine`, etc. with UTHM maroon + gold tokens.
- Add new UTHM-specific tokens: `--color-uthm-maroon`, `--color-uthm-gold`, `--color-uthm-ink`, `--color-uthm-fog`.
- Drop `--sd-map-*` map-specific tokens only if map is removed; otherwise rename to `--uf-map-*`.

---

## 2. Global rebrand surface area (do these FIRST — they fan out to every page)

| File | Change |
|---|---|
| `app/layout.tsx` | Title → "UTHM Forge — The forge for UTHM's future builders". Description, keywords (`uthm`, `uthm developers`, `uthm forge`, `parit raja`, `batu pahat`, `johor`, `universiti tun hussein onn malaysia`). Author/publisher/creator → "UTHM Forge". `metadataBase` → `https://uthmforge.uthm.edu.my`. `manifest` → `/manifest.webmanifest` (unchanged path). Icons → `uthmforge-*` files. Theme color → UTHM maroon. |
| `app/sitemap.ts` | `baseUrl` → `https://uthmforge.uthm.edu.my`. Add or drop routes (see §4). |
| `app/robots.ts` | `sitemap` URL → new domain. |
| `public/manifest.webmanifest` | `name`, `short_name`, `description`, all icon paths/sizes → UTHM Forge. |
| `public/sw.js` | `CACHE_NAME = "uthmforge-v1"`, precached logo/icon filenames updated. |
| `public/logo/*` | Replace PNGs (designer to deliver). |
| `public/icons/*` | Replace PNGs. |
| `components/sections/Header.tsx` | Wordmark/logo image swap. "seladev_os" pill → "uthm_forge_os". Discord URL → new. |
| `components/sections/Footer.tsx` | All copy updated. Email list updated (see §6). Discord + social updated. |
| `components/sections/Preloader.tsx` | Update boot line `seladev_os` → `uthm_forge_os` and any logo references. |
| `package.json` | `name` → `"uthmforge-web"`. Add `homepage: "https://uthmforge.uthm.edu.my"`. |

---

## 3. Hero, home, and top-of-funnel copy (high-traffic)

### 3.1 `components/sections/Hero.tsx`
- Tagline: `"The forge for UTHM's future builders"`.
- Subline: replace KL/SEA framing with UTHM + Johor framing.
- Coords: `1.8585, 103.0833` (Parit Raja, Batu Pahat, Johor).
- Node ID: `uthm-forge-01`.
- Trust row: replace "1,751 builders / 13 states" with realistic UTHM numbers (suggested placeholder set, will be sourced from UTHM data team):
  - `3 faculties × N students` (initial launch: ~`1,200` builders across FSKTM/FKMP/FKE — placeholder, mark `// TODO: confirm with UTHM`).
  - `RM 4,800 paid in bounties` (or convert to "PTPTN-matched credits" if preferred).
  - `42 projects shipped` (initial OSS showcase count).
- Primary CTA: "Join the forge" → `/guilds/new` or `/contact`. Secondary CTA: "Browse projects" → `/showcase`.
- Replace any "seladev_os" boot label.

### 3.2 `components/sections/HomeBento.tsx`
- All bento cells referencing `STATS`, `SHOWCASE`, `STATES`, `GOVERNANCE` will auto-update once `data/content.ts` and `data/map.ts` are revised (see §4 & §5).
- "Hire Malaysia's Best Builders" → "Hire UTHM's Best Builders" (or repurpose as "Get your FYP published").
- "Build with Malaysian devs" → "Build with UTHM devs".
- Discord link → new URL.
- "13 states" → drop, replace with "3 faculties · 1 campus" or similar.
- `MapBlock` will need new data (UTHM campus faculties) or a fallback.

### 3.3 `components/sections/StatsBento.tsx`, `EventBanner.tsx`, `LatestJobs.tsx`, `SDJobsPricing.tsx`, `CommunityMap.tsx`, `LeaderboardPreview.tsx`, `GovernanceBento.tsx`, `OpportunitiesMarquee.tsx`, `TailoredSolutions.tsx`, `EpicCTA.tsx`, `NewsletterModal.tsx`
- All of these are data-driven from `data/content.ts`. Once that file is rewritten, the section components largely auto-update.
- Hardcoded copy in section components (eyebrow text, CTA labels) — must be searched and updated.

### 3.4 `components/sections/NewsletterStrip.tsx`
- Submit endpoint domain → UTHM Forge (or keep mock).
- Success message brand → UTHM Forge.

---

## 4. Route-by-route page changes

There are **28 user-facing routes** + 1 RSS endpoint. Each gets a per-page treatment.

### 4.1 `/` — Home
- File: `app/page.tsx` (uses `HomeBento` on desktop, `Hero` on mobile).
- Action: rebuild hero + bento to UTHM frame (see §3).
- Drop any "13 states" copy. Replace with UTHM faculty count.

### 4.2 `/about` — Manifesto
- File: `app/about/page.tsx`.
- Current copy: "1,751 builders, 13 states, RM 12,500+ payouts, 64 bounties", "ship open source … pay bounties in Ringgit", "SEA dev culture is 10 years behind".
- New copy: shift from *country* manifesto to *campus* manifesto. Headline: *"Why UTHM Forge"*. Replace state/government stats with UTHM-flavoured numbers. Replace "SEA dev culture" with "UTHM talent density". Keep the "open source" spine. Replace "pay bounties in Ringgit" with "pay bounties in RM (PTPTN-eligible where applicable)".
- Footer CTA → UTHM-relevant (e.g., "Join FSKTM circle").

### 4.3 `/map` — Map (REPURPOSE)
- File: `app/map/page.tsx` + `app/map/[state]/page.tsx` + `components/sections/map/*` + `data/map.ts` + `data/malaysia-states.json` + `scripts/gen-malaysia-map.js`.
- **Decision: Repurpose as UTHM campus / faculty map**, not delete.
  - New entity = **faculties + centres** at UTHM:
    - `FSKTM` — Faculty of Computer Science and Information Technology (lat/lng ~1.8596, 103.0836)
    - `FKMP` — Faculty of Mechanical and Manufacturing Engineering
    - `FKE` — Faculty of Electrical and Electronic Engineering
    - `FKAAS` — Faculty of Civil and Environmental Engineering
    - `FPTV` — Faculty of Technical and Vocational Education
    - `FSTI` — Faculty of Science and Information Technology (note: FSTI vs FSKTM naming to verify)
    - `FPM` — Faculty of Management
    - `FPTT` — Faculty of Engineering Technology (or equivalent)
    - `PTTA` — Pusat Pengajian Teknologi dan Kejuruteraan
    - `UTHM-CAPS` — Centre for Academic Development and Postgraduate Studies (placeholder)
- Implementation:
  - `data/map.ts` → export `UTHM_FACULTIES` with same shape as `STATES` (slug, name, landmark, coords, builder count, guilds, jobs, events).
  - `data/malaysia-states.json` → rename to `data/uthm-faculties.json` with viewBox tight to campus and `hotspots` per faculty.
  - `data/world-110m.json` → **drop** (no longer needed for country outline).
  - `scripts/gen-malaysia-map.js` → rewrite as `scripts/gen-uthm-faculties.js` (read a faculties TSV, emit JSON).
  - `components/sections/map/MalaysiaMap.tsx` → rename to `CampusMap.tsx` and `MalaysiaMapClient.tsx` → `CampusMapClient.tsx`. Replace world-atlas fetch with campus-only SVG/GeoJSON (use a static inline campus polygon + faculty hotspot pins for v1; defer real campus GeoJSON to v1.1).
  - `MapHero.tsx`, `RegionStats.tsx`, `StateGrid.tsx` → retheme to campus (rename to `FacultyGrid.tsx`). `MapHero` copy: "3 faculties. 1 campus. one forge."
  - `app/map/[state]/page.tsx` → `app/map/[faculty]/page.tsx`. Update params + `generateStaticParams` to use faculty slugs. Drop `STATES` import, import `UTHM_FACULTIES`.
  - `app/map/page.tsx` → retheme to campus map.

### 4.4 `/leaderboard`
- File: `app/leaderboard/page.tsx` + `components/ui/LeaderboardList.tsx`.
- Current: ranks "builders" by stars; uses `MEMBERS` (which has `state` field).
- New: rank UTHM students/staff. Replace "state" filter with **faculty** filter. Keep star/score mechanic. Update page title/eyebrow/CTA.

### 4.5 `/members`
- File: `app/members/page.tsx` + `app/members/[handle]/page.tsx` + `components/sections/members/*`.
- Copy: "1,751 builders across Malaysia and counting" → "X UTHM builders and counting" (use realistic placeholder).
- `MemberCard` and `MembersExplorer` are data-driven from `data/members.ts`. Update `state` field → `faculty` (e.g., `FSKTM`, `FKMP`). Update the explorer filter chips.
- Member profile page chrome: update "seladev_os" → "uthm_forge_os".

### 4.6 `/guilds` — Guilds (renamed mental model: "Circles" optional; keep "Guilds" if branding prefers)
- File: `app/guilds/page.tsx` + `app/guilds/[slug]/page.tsx` + `app/guilds/new/page.tsx` + `components/sections/guilds/*`.
- Keep route name (`/guilds`) but rebrand each guild around UTHM:
  - `Edge Runners` → "**UTHM Edge** — ship low-latency systems (FSKTM + FKE)".
  - `Bento Brigade` → "**UTHM Bento** — design student-facing tools".
  - `Prompt Pilots` → "**Prompt Pilots UTHM** — applied LLM research group".
  - Other guilds: rewrite missions to reference UTHM clubs, labs, faculties.
- "ship a voice agent … for a SEA SME" → ship a voice agent for a UTHM student service.
- "open-source a sub-200ms speech-to-text server for Bahasa Melayu" → keep (it's a great UTHM project too) but reframe as a UTHM capstone/FYP.
- `CreateGuildCTA` copy: "Start a UTHM circle" instead of "Start a guild".

### 4.7 `/events`
- File: `app/events/page.tsx` + `app/events/[slug]/page.tsx` + `components/sections/events/*`.
- Replace venues: KL/Penang → UTHM campus venues (FKMP Auditorium, FSKTM Labs, UTHM Library, Dewan Sultan Ibrahim, etc.) and **Online** (Discord/Zoom).
- Timezone: keep MYT (UTC+8) — UTHM is in Johor (also MYT; note that Johor is adjacent to Singapore but uses MYT).
- Workshop topics: keep Bahasa Melayu code-switching, Whisper.cpp workshops, etc., but rebrand as UTHM-organized.

### 4.8 `/news`
- File: `app/news/page.tsx` + `app/news/[slug]/page.tsx`.
- Headlines: rewrite all to UTHM context (e.g., "UTHM Forge partners with FSKTM on OSS capstone", "First UTHM-built sub-200ms STT server for Bahasa Melayu ships", "UTHM student wins SelaDevs-style bounty"). Keep story format.
- Drop "SelaDevs in The Edge Malaysia" → "UTHM Forge in The Edge Malaysia" (or replace with a more plausible publication for the demo).

### 4.9 `/changelog`
- File: `app/changelog/page.tsx` + `app/changelog/rss.xml/route.ts`.
- Rewrite entries: every reference to "Selat v1.0", "Bungkus OCR", "BNM", "Selat probes in Bangkok", "MYR as display default", "real Malaysia map", "federal territory tier" → UTHM-flavoured equivalents. E.g.:
  - *"Selat v1.0"* → *"UTHM-CAPS dashboard v1.0"*.
  - *"Bungkus OCR"* → *"Bungkus OCR — UTHM FYP fork"*.
  - *"BNM sandbox"* → *"UTHM Sandbox"* (or actual UTHM partner).
  - *"real Malaysia map"* → *"real UTHM campus map (FSKTM, FKMP, FKE, FKAAS, FPTV, FPM, …)"*.
  - *"federal territory tier"* → *"graduate / postgraduate tier"*.
- RSS feed (`route.ts`) — same title/description updates. Channel name → "UTHM Forge changelog".

### 4.10 `/code/bounty` (and `/code/bounty/[slug]`)
- File: `app/code/layout.tsx` + `app/code/bounty/page.tsx` + `app/code/bounty/[slug]/page.tsx` + `app/code/bounty/error.tsx` + `app/code/bounty/loading.tsx` + `app/code/bounty/[slug]/not-found.tsx` + `components/sections/bounty/*`.
- Currency: keep RM (UTHM context still uses RM); no structural change needed.
- Bounty topics: replace SEA-SME framing with UTHM-FYP/student-club framing. Keep the "Bahasa Melayu OCR" / "Mamak split-bill" tasks as legitimate UTHM student projects.
- `BountyClaimButton` — submission API example `api.seladevs.com` → `api.uthmforge.uthm.edu.my`.
- Layout: title "SelaDevs Code" → "UTHM Forge Code".

### 4.11 `/jobs` (and `/jobs/[slug]`)
- File: `app/jobs/page.tsx` + `app/jobs/[slug]/page.tsx` + `app/jobs/error.tsx` + `app/jobs/loading.tsx` + `app/jobs/[slug]/not-found.tsx` + `components/sections/jobs/*`.
- Replace fictional companies (RunCloud, Peripamo, Courtsite, Bungkus, Selat, KopiPawang, AI-OS, RokokRegex, Tukar, Edge Runners, Seladevs Core, JomEnvois) with **UTHM-flavoured employers**:
  - UTHM internal: "UTHM IT Centre", "UTHM Library Digital", "UTHM FSKTM Research Grant", "UTHM Innovation & Commercialization".
  - Local Batu Pahat / Johor: "Penerbit UTHM", "Maju Holdings (Batu Pahat)", "JohorTech Co-op", "Hospital Batu Pahat (digital)", "MBIP e-services".
  - National partners: "MDEC" (if still applicable), "Khazanah digital", "Cradle Fund".
  - Keep some "OSS-first" companies since students want to ship.
- Salaries: convert to RM, with explicit "internship / part-time / FYP-grant / RA-ship" tags.
- Cities: KL/Penang → Batu Pahat / Johor Bahru / Online / Hybrid-UTHM.
- `JobApplyModal` / `JobActions` — refer to `api.uthmforge.uthm.edu.my` if needed.

### 4.12 `/for-company` — REMOVE or REPURPOSE
- File: `app/for-company/page.tsx`.
- **Recommendation: Repurpose as `/for-industry`** — pitching UTHM-faculty research collaborations to industry partners (replaces recruiter marketplace).
- New copy: pitch to companies that want to sponsor UTHM FYPs, run co-op programs, hire from FSKTM/FKMP. Drop RM pricing tiers (move to `/for-industry#sponsorship`).

### 4.13 `/for-government` — REPURPOSE
- File: `app/for-government/page.tsx`.
- **Recommendation: Repurpose as `/for-faculty`** — internal landing for UTHM faculty/staff to publish projects, request student builders, or list research-grant funded bounties.
- Replace Selangor/Penang/Federal Ministry case studies with UTHM-faculty case studies (FYP showcase, research collaboration wins). Drop "13 states reached".
- `data/govCaseStudies.ts` → rename to `data/facultyCaseStudies.ts` (or keep filename; rewrite content) — three new case studies, e.g.:
  1. FSKTM capstone: Bahasa Melayu OCR pipeline.
  2. FKMP industry collaboration: predictive maintenance for a Johor factory.
  3. UTHM-PTTA: low-cost IoT air-quality monitor for Batu Pahat.

### 4.14 `/hire/register` — REMOVE or REPURPOSE
- File: `app/hire/register/page.tsx`.
- **Recommendation: Repurpose as `/for-industry/register`** — industry partner registration. Drop "SSM registration" check (UTHM context: industry doesn't need SSM to post; replace with MoU/MoA check or a simple domain-email verification).
- `components/ui/HireForm.tsx` — replace "SSM registration" with "Industry partner verification (domain email or MoU number)".

### 4.15 `/pricing` — REMOVE or REPURPOSE
- File: `app/pricing/page.tsx`.
- **Recommendation: Repurpose as `/sponsorship`** — sponsorship tiers for industry to fund student bounties (free for student projects, paid sponsor slots for industry).
- Drop RM 299/799/1,999 tiers. New tiers: "Student Club Sponsor" (free, self-serve), "Faculty Sponsor" (RM 1,500/mo, includes N student seats), "Industry Sponsor" (RM 5,000/mo, includes branded bounties and FYP pipeline access).
- `data/pricing.ts` → rewrite tiers.
- `data/companyFaq.ts` → rewrite for industry-sponsor model.

### 4.16 `/showcase` (and detail modal)
- File: `app/showcase/page.tsx` + `app/showcase/error.tsx` + `app/showcase/loading.tsx` + `app/showcase/not-found.tsx` + `components/sections/showcase/*`.
- All 12 projects in `data/showcase.ts` get UTHM treatment (see §5).
- Hero copy: "twelve projects. one forge" → "twelve projects. one campus." (or "N projects. 1 forge").
- Filter bar: filter by faculty + stack + year.

### 4.17 `/community` (Townhall)
- File: `app/community/page.tsx` + `app/community/[slug]/page.tsx` + `app/community/[slug]/not-found.tsx`.
- Thread topics: rewrite from *Bahasa Melayu OCR / SSM-registered Malaysian entity / cult of overwork in SEA startups / vibe coding* to UTHM-flavoured versions. Keep the "townhall" mechanic.
- `ThreadReplyButton` — submission API → new domain.

### 4.18 `/contact`
- File: `app/contact/page.tsx` + `components/ui/ContactForm.tsx`.
- Replace all email channels:
  - `hello@seladevs.com` → `hello@uthmforge.uthm.edu.my` (or `uthmforge@gmail.com` for demo).
  - `press@seladevs.com` → `press@uthmforge.uthm.edu.my`.
  - `partnerships@seladevs.com` → `partnerships@uthmforge.uthm.edu.my`.
  - `security@seladevs.com` → `security@uthmforge.uthm.edu.my`.
  - `abuse@seladevs.com` → `abuse@uthmforge.uthm.edu.my`.
- ContactForm ticket ID prefix `sd-` → `uthm-`.
- Address block: UTHM, 86400 Parit Raja, Batu Pahat, Johor.

### 4.19 `/terms` & `/privacy`
- File: `app/terms/page.tsx` + `app/privacy/page.tsx` + `data/legal.ts`.
- New governing law: still Malaysia, but reference UTHM as the data controller. Reference UTHM's data-protection policy, MOHE circulars, and PDPA 2010.
- Reference "Jabatan Perlindungan Data Peribadi (JPDP)" remains valid (it's the regulator).
- Reference "courts of Kuala Lumpur" → "courts of Johor Bahru" (UTHM is in Johor).
- Replace "Sdn Bhd / SSM" with "UTHM / UTHM Holdings" where applicable.
- Update copyright "SelaDevs" → "UTHM Forge".

### 4.20 `/offline`
- File: `app/offline/page.tsx`.
- Generic. Update brand: "UTHM Forge is offline". Logo/wordmark swap.

### 4.21 `/sitemap` & `/robots`
- `app/sitemap.ts` — update `baseUrl`. Review route list. Drop `/for-company`, `/for-government`, `/hire/register`, `/pricing` if removed; add `/for-industry`, `/for-faculty`, `/sponsorship` if added. (See §8 for final route decisions.)
- `app/robots.ts` — update sitemap URL.

### 4.22 `app/manifest.webmanifest` (covered in §2)

---

## 5. Data files — the biggest content rewrite

All under `data/`. Each is structurally preserved; content is rewritten for UTHM.

### 5.1 `data/nav.ts`
- `HEADER_LINKS` and `FOOTER_LINKS`: review and update labels/URLs to UTHM frame. Add `/for-faculty` and `/sponsorship` if repurposed. Remove `/for-government`, `/for-company`, `/pricing`, `/hire/register` if removed (see §8).
- Brand label: `seladev_os` → `uthm_forge_os`.
- Discord URL → new.

### 5.2 `data/content.ts` (used by home, hero, stats, governance, footer, etc.)
- `STATS` — replace with UTHM stats:
  - `{ label: "builders", value: 1200, suffix: "+" }` (placeholder, TODO confirm)
  - `{ label: "faculties", value: 7, suffix: "" }`
  - `{ label: "bounties paid", value: 4800, prefix: "RM ", suffix: "" }`
  - `{ label: "projects shipped", value: 42, suffix: "" }`
- `GOVERNANCE` (4 cards) — reframe as UTHM governance (e.g., "Student Council", "FSKTM Coordinator", "Faculty Sponsor", "Industry Partner").
- `SHOWCASE` (mini list, 6 items) — subset of `data/showcase.ts` UTHM projects.

### 5.3 `data/map.ts` → repurpose as UTHM faculties
- Replace `STATES` with `UTHM_FACULTIES` (same shape):
  - `{ slug, name, landmark, coords: { lat, lng }, builders, guilds, jobs, events }`.
- 7–10 faculties/centres as listed in §4.3.

### 5.4 `data/malaysia-states.json` → `data/uthm-faculties.json`
- Same `viewBox` + `hotspots` structure but coordinates scoped to UTHM campus (Parit Raja).

### 5.5 `data/world-110m.json` → DELETE
- No longer used (campus map doesn't need world-atlas).

### 5.6 `data/members.ts`
- 24 fictional members → 24 UTHM students/staff. Replace `state` with `faculty`. Update names to Malay/Malaysian UTHM-style names. Update `joined` dates to 2024–2026. Set `wallet` to a UTHM-style identifier (e.g., `uthm-…`).
- `role` examples: "FSKTM Y3 CS", "FKMP Y4 Mech Eng", "FKE Y2 EE", "FYP candidate", "RA — Dr. Aini's lab", "Postgrad (MSc DS)".

### 5.7 `data/guilds.ts`
- 12 guilds → UTHM circles/clubs. Replace missions to reference UTHM faculties, labs, and student services. Keep at most one Bahasa Melayu STT guild (now positioned as a UTHM capstone).

### 5.8 `data/showcase.ts` — rewrite 12 projects
- Each project's `name`, `tagline`, `summary`, `problem`, `build`, `impact`, `tags` rewritten for UTHM context.
- Reuse where it makes sense (e.g., Bahasa Melayu OCR becomes a UTHM FYP, not a SEA-SME product).
- Drop: MyKad-related, BNM-sandbox, mamak, "SME" framing.
- Add: campus services, FYP-grade projects, Johor-context projects, MDEC-aligned projects.

### 5.9 `data/events.ts`
- 9 events in KL/Penang → events at UTHM campus + Online. Workshop topics updated. Dates within 2025–2026.

### 5.10 `data/jobs.ts`
- 12 jobs at fictional MY companies → 12 jobs at UTHM-relevant orgs (see §4.11). All RM-denominated. Add explicit "internship / RA / part-time / FYP-grant" tags.

### 5.11 `data/bounties.ts`
- 8 bounties → UTHM bounties. RM 350–1,200 range kept (or adjust if UTHM grants are different). Examples:
  - "Build a UTHM-CAPS dashboard widget (RM 600)".
  - "OCR pipeline for UTHM Library's old thesis PDFs — Bahasa Melayu (RM 900)".
  - "Low-cost IoT air-quality monitor for Batu Pahat (RM 1,200)".
- Poll options + past payouts all rewritten.

### 5.12 `data/community.ts`
- 6 townhall threads → 6 UTHM-flavoured threads. Drop SSM/Bahasa-Melayu-OCR-only framing; reframe as "FYP OSS license", "UTHM Wi-Fi at FKMP", "Should UTHM host a Hackathon monthly?".

### 5.13 `data/news.ts`
- 12 articles → 12 UTHM articles.

### 5.14 `data/changelog.ts`
- 24 entries → 24 UTHM entries.

### 5.15 `data/govCaseStudies.ts` → `data/facultyCaseStudies.ts` (rename + rewrite)
- 3 case studies → 3 UTHM faculty case studies (see §4.13).

### 5.16 `data/companyFaq.ts` → rename to `data/industryFaq.ts` (optional)
- 6 FAQs → 6 industry-sponsor FAQs.

### 5.17 `data/pricing.ts` → `data/sponsorship.ts` (rename + rewrite)
- 3 tiers → 3 sponsorship tiers (see §4.15).

### 5.18 `data/legal.ts`
- Full `PRIVACY_MD` and `TERMS_MD` rewritten to reference UTHM as data controller. PDPA 2010 + JPDP still cited. Governing law: Malaysia; jurisdiction: Johor Bahru. See §7 for legal compliance.

### 5.19 `data/malaysia-states.json` and `scripts/gen-malaysia-map.js` (see §4.3)
- Rename and rewrite as UTHM generator.

---

## 6. Email & contact surface area (find/replace audit)

Find every occurrence of the following and replace (regex audit needed across the entire repo):

| Old | New |
|---|---|
| `hello@seladevs.com` | `hello@uthmforge.uthm.edu.my` |
| `press@seladevs.com` | `press@uthmforge.uthm.edu.my` |
| `partnerships@seladevs.com` | `partnerships@uthmforge.uthm.edu.my` |
| `security@seladevs.com` | `security@uthmforge.uthm.edu.my` |
| `abuse@seladevs.com` | `abuse@uthmforge.uthm.edu.my` |
| `legal@seladevs.com` | `legal@uthmforge.uthm.edu.my` |
| `privacy@seladevs.com` | `privacy@uthmforge.uthm.edu.my` |
| `oss@seladevs.com` | `oss@uthmforge.uthm.edu.my` |
| `join@seladevs.com` | `join@uthmforge.uthm.edu.my` |
| `discord.gg/seladevs` | `discord.gg/uthmforge` (or chosen) |
| `seladevs.com` (general) | `uthmforge.uthm.edu.my` |
| `seladev_os` (system handle) | `uthm_forge_os` |
| `SelaDevs` (display name) | `UTHM Forge` |
| `seladevs` (slug/id) | `uthmforge` |
| `sd-` (ticket ID prefix) | `uthm-` |
| `kl-forge-01` (node) | `uthm-forge-01` |
| `kl` (in copy: "built in kl") | `parit raja` |
| `node-01` (generic) | `uthm-forge-01` |
| All fictional company emails (`@runcloud.io`, `@peripamo.tech`, `@courtsite.my`, `@bungkus.my`, `@selat.dev`, `@kopipawang.app`, `@ai-os.dev`, `@rokokregex.app`, `@tukar.bot`, `@jomenvois.my`) | New UTHM-flavoured emails (e.g., `@uthm.edu.my`, `@uthmlib.edu.my`, `@uthmfyp.edu.my`, `@caps.uthm.edu.my`). |
| `api.seladevs.com` (bounty submission example) | `api.uthmforge.uthm.edu.my` |
| `nxukkhyjasusqbzhkqdv.supabase.co` (next.config.ts) | **Decision needed** — replace with new UTHM Supabase project, or drop if no real backend. |

A repository-wide grep should be run to enumerate every match:

```sh
rg -n "seladevs|seladev_os|seladev-|SelaDevs" --hidden -g '!node_modules/**' -g '!.next/**' -g '!public/**'
rg -n "@seladevs\.|@runcloud\.|@peripamo\.|@courtsite\.|@bungkus\.|@selat\.|@kopipawang\.|@ai-os\.|@rokokregex\.|@tukar\.|@jomenvois\." --hidden -g '!node_modules/**'
```

---

## 7. Legal & compliance (UTHM is a public university — extra care)

UTHM is a **public university under the Ministry of Higher Education (MoHE), Malaysia**. Migrating SelaDevs to UTHM context requires:

1. **PDPA 2010** still applies — keep JPDP reference.
2. **Governing law**: Malaysia. **Jurisdiction**: change from Kuala Lumpur to Johor Bahru (UTHM is in Batu Pahat, Johor — Johor Bahru is the state capital and the proper court venue).
3. **Data controller**: UTHM (replacing "SelaDevs Sdn Bhd"). Add UTHM's data-protection officer contact.
4. **Copyright**: replace `SelaDevs` with `UTHM Forge` and add a note that the platform is operated as a UTHM student/community initiative.
5. **Public-university-specific clauses**:
   - Mention that UTHM Forge is a student-led community portal, not an official UTHM commercial service.
   - Add a disclaimer: "UTHM Forge is not an official UTHM product unless otherwise stated. For official UTHM services, visit uthm.edu.my."
   - Add a MoHE/UTHM branding policy clause: "Use of the UTHM name/logo is limited to identification and editorial reference; no endorsement implied."
6. **Cookies & analytics**: review and update cookie banner copy to reference UTHM Forge.

`data/legal.ts` (`PRIVACY_MD` + `TERMS_MD`) needs a near-full rewrite. Coordinate with UTHM's legal/data-protection office before publishing if this becomes a real public deployment.

---

## 8. Route decisions (final list)

After migration, the route set should be:

### KEPT (re-skinned)
- `/` (home)
- `/about`
- `/map` (campus map) + `/map/[faculty]` (was `/map/[state]`)
- `/leaderboard`
- `/members` + `/members/[handle]`
- `/guilds` + `/guilds/[slug]` + `/guilds/new`
- `/events` + `/events/[slug]`
- `/news` + `/news/[slug]`
- `/changelog` + `/changelog/rss.xml`
- `/code/bounty` + `/code/bounty/[slug]`
- `/jobs` + `/jobs/[slug]`
- `/showcase`
- `/community` + `/community/[slug]`
- `/contact`
- `/privacy`
- `/terms`
- `/offline`
- `/sitemap`, `/robots`

### REPURPOSED
- `/for-company` → **`/for-industry`** (industry partner landing)
- `/for-government` → **`/for-faculty`** (UTHM faculty landing)
- `/hire/register` → **`/for-industry/register`** (industry partner signup)
- `/pricing` → **`/sponsorship`** (sponsorship tiers)

### DROPPED (or 301 to replacements)
- None — all 28 routes are reused. We repurpose rather than delete to preserve SEO and internal links.
- `/for-company` and `/for-company/*` should 301 to `/for-industry` equivalents (use Next.js `redirects()` in `next.config.ts`).
- Same for `/for-government` → `/for-faculty`, `/hire/register` → `/for-industry/register`, `/pricing` → `/sponsorship`.

Update `data/nav.ts` (HEADER_LINKS, FOOTER_LINKS) accordingly so users land on the new routes without seeing the old paths.

---

## 9. Map & GeoJSON migration (concrete steps)

1. **Generate UTHM campus GeoJSON** (manual or via OpenStreetMap query for UTHM, Parit Raja). Save as `data/uthm-campus.geojson`. Faculty centroids as separate JSON `data/uthm-faculties.json`.
2. **Update `scripts/gen-malaysia-map.js` → `scripts/gen-uthm-faculties.js`**:
   - Input: list of faculties (name, slug, lat, lng, builders, etc.).
   - Output: `data/uthm-faculties.json` with `viewBox` computed from min/max lat/lng, and `hotspots` array.
3. **Update `components/sections/map/MalaysiaMap.tsx` → `CampusMap.tsx`**:
   - Drop world-atlas import.
   - Render UTHM campus polygon (from `uthm-campus.geojson`) with d3-geo.
   - Render faculty hotspots from `uthm-faculties.json`.
4. **Update `components/sections/map/MalaysiaMapClient.tsx` → `CampusMapClient.tsx`** (same logic, renamed).
5. **Update `MapHero.tsx`**, **`RegionStats.tsx`**, **`StateGrid.tsx` → `FacultyGrid.tsx`** (rename and retheme).
6. **Update `app/map/page.tsx`** to import new components/data.
7. **Update `app/map/[state]/page.tsx` → `app/map/[faculty]/page.tsx`**:
   - Rename directory.
   - `generateStaticParams` iterates `UTHM_FACULTIES` slugs.
   - Page uses `UTHM_FACULTIES.find(...)`.
8. **Update `not-found.tsx`**, `error.tsx`, `loading.tsx` in `/map/*` to reflect new entity.
9. **Update `scripts/check-css*.cjs`, `test-theme.cjs`** if they reference old paths.
10. **Update `app/sitemap.ts`** to list `/map/[faculty]` URLs.

---

## 10. Component-level changes (low-level surface)

| Component | Change |
|---|---|
| `components/sections/Hero.tsx` | Tagline, subline, coords, node ID, trust row, brand label. |
| `components/sections/HomeBento.tsx` | All copy referring to "Malaysia" → "UTHM". Discord URL. |
| `components/sections/Header.tsx` | Wordmark, "seladev_os" pill, Discord URL, nav links. |
| `components/sections/Footer.tsx` | Copyright, "built with care in parit raja", email list, social links, nav links. |
| `components/sections/Preloader.tsx` | Brand label, logo references. |
| `components/sections/StatsBento.tsx` | Data-driven from `data/content.ts` (auto-updates). Eyebrow copy. |
| `components/sections/EventBanner.tsx` | Eyebrow/CTA copy. |
| `components/sections/LatestJobs.tsx` | Data-driven (auto). Eyebrow. |
| `components/sections/SDJobsPricing.tsx` | "SD" prefix → "UTHM". Repurpose or rename file. |
| `components/sections/CommunityMap.tsx` | Eyebrow/CTA copy; data-driven content. |
| `components/sections/LeaderboardPreview.tsx` | Eyebrow/CTA copy. |
| `components/sections/GovernanceBento.tsx` | Data-driven. |
| `components/sections/OpportunitiesMarquee.tsx` | Marquee text. |
| `components/sections/TailoredSolutions.tsx` | Replace "company" / "government" offerings with "industry" / "faculty" offerings. |
| `components/sections/EpicCTA.tsx` | Tagline + brand. |
| `components/sections/NewsletterModal.tsx` | Brand, success message, endpoint. |
| `components/sections/map/*` | All renamed/restyled (see §9). |
| `components/sections/jobs/*` | Data-driven (auto from `data/jobs.ts`). "RM" + city filters stay. |
| `components/sections/events/*` | Data-driven. Venue + timezone stay (MYT). |
| `components/sections/guilds/*` | Data-driven. |
| `components/sections/members/*` | Data-driven. State → faculty filter. |
| `components/sections/showcase/*` | Data-driven. |
| `components/sections/bounty/*` | API domain `api.seladevs.com` → `api.uthmforge.uthm.edu.my`. Brand. |
| `components/ui/HireForm.tsx` | "SSM registration" → "Industry partner verification". Brand. |
| `components/ui/ContactForm.tsx` | Ticket prefix `sd-` → `uthm-`. Default email channels. |
| `components/ui/NewsletterStrip.tsx` | Brand, endpoint, success message. |
| `components/ui/LeaderboardList.tsx` | State → faculty filter. |
| `components/ui/LogoMark.tsx` / `LogoHero.tsx` | Logo image swap (props-driven from public assets). |
| `components/ui/ServiceWorkerRegister.tsx` | Brand. |
| `components/ui/ThemeToggle.tsx`, `Button.tsx`, `BentoCard.tsx`, `Chip.tsx`, `Counter.tsx`, `CTACard.tsx`, `Drawer.tsx`, `EmptyState.tsx`, `Eyebrow.tsx`, `InstallPrompt.tsx`, `Markdown.tsx`, `Marquee.tsx`, `Modal.tsx`, `NextEventPill.tsx`, `Section.tsx`, `ShowcaseCover.tsx`, `Skeleton.tsx`, `StatRow.tsx`, `StatusPill.tsx`, `Timeline.tsx`, `ThreadReplyButton.tsx`, `CopyButton.tsx`, `BracketLink.tsx`, `Breadcrumbs.tsx` | Mostly generic — no content change needed unless they reference brand in copy. |
| `app/globals.css` | Theme tokens (UTHM maroon + gold). Drop or rename `--sd-map-*`. |

---

## 11. Configuration

- **`package.json`**: `name = "uthmforge-web"`, `homepage = "https://uthmforge.uthm.edu.my"`.
- **`next.config.ts`**:
  - `images.remotePatterns`: replace Supabase host if a new UTHM Supabase project is provisioned; otherwise drop it. Keep `avatars.githubusercontent.com`.
  - Add `async redirects()` for `/for-company*` → `/for-industry*`, `/for-government*` → `/for-faculty*`, `/hire/register` → `/for-industry/register`, `/pricing` → `/sponsorship`.
- **`app/sitemap.ts`**: new base URL; revised route list.
- **`app/robots.ts`**: new sitemap URL.
- **`tsconfig.json`**: no change.
- **`postcss.config.mjs`**: no change.

---

## 12. PWA / Offline

- **`public/manifest.webmanifest`**: name, short_name, description, icons, theme_color (UTHM maroon), background_color.
- **`public/sw.js`**: rename cache to `uthmforge-v1`, update precached logo/icon paths, update offline page reference.
- **`app/offline/page.tsx`**: rebrand copy.

---

## 13. Public assets checklist

- [ ] `public/logo/uthmforge-dark.png` (designer to deliver)
- [ ] `public/logo/uthmforge-light.png`
- [ ] `public/icons/uthmforge-192.png`
- [ ] `public/icons/uthmforge-256.png`
- [ ] `public/icons/uthmforge-384.png`
- [ ] `public/icons/uthmforge-512.png`
- [ ] `public/icons/uthmforge-maskable.png`
- [ ] Delete old `seladevs-*` assets after replacement.
- [ ] `public/states/*` (if existing) — review & replace with UTHM campus imagery.
- [ ] `public/assets/*` — review & replace.

---

## 14. Migration phases (execution order)

### Phase 0 — Audit & plan (DONE — this document)
- Full repo map.
- Decision tree for repurposing vs deleting.
- Brand identity locked in.

### Phase 1 — Brand spine (no logic change)
1. Replace logos in `public/logo/` and `public/icons/`.
2. Update `app/layout.tsx` (metadata, manifest URL, theme color, icons).
3. Update `components/sections/Header.tsx`, `Footer.tsx`, `Preloader.tsx` (brand labels + nav links).
4. Update `public/manifest.webmanifest` + `public/sw.js`.
5. Update `package.json` name + homepage.
6. Update `app/globals.css` theme tokens.
7. Update `components/sections/Hero.tsx` (tagline, coords, node ID).
8. Update `components/sections/HomeBento.tsx` (high-level copy + Discord URL).
9. Update `app/contact/page.tsx` + `components/ui/ContactForm.tsx` (emails + ticket prefix).
10. Update `app/sitemap.ts` + `app/robots.ts` (URLs only).
11. Update `data/nav.ts` (HEADER_LINKS, FOOTER_LINKS — labels only; routes still work).
12. Update `app/about/page.tsx` (manifesto copy).
13. Update `data/legal.ts` (privacy + terms — full rewrite per §7).

### Phase 2 — Data rewrite (content swap, shapes preserved)
1. `data/content.ts` (STATS, GOVERNANCE, SHOWCASE mini list).
2. `data/members.ts` (state → faculty, UTHM names).
3. `data/guilds.ts` (UTHM circles).
4. `data/showcase.ts` (12 UTHM projects).
5. `data/events.ts` (UTHM campus + online events).
6. `data/jobs.ts` (UTHM-relevant employers).
7. `data/bounties.ts` (UTHM bounties + past payouts).
8. `data/community.ts` (townhall threads).
9. `data/news.ts` (UTHM news).
10. `data/changelog.ts` (UTHM changelog).
11. `data/govCaseStudies.ts` → `data/facultyCaseStudies.ts` (rename + rewrite).
12. `data/companyFaq.ts` → `data/industryFaq.ts` (rename + rewrite).
13. `data/pricing.ts` → `data/sponsorship.ts` (rename + rewrite).
14. `data/map.ts` (rename STATES → UTHM_FACULTIES; populate with 7–10 faculties).
15. `data/malaysia-states.json` → `data/uthm-faculties.json` (regenerate).
16. `data/world-110m.json` — delete.

### Phase 3 — Map feature migration
1. Generate `data/uthm-campus.geojson` (or inline static polygon).
2. Rewrite `scripts/gen-malaysia-map.js` → `scripts/gen-uthm-faculties.js`.
3. Rename + rewrite `components/sections/map/MalaysiaMap.tsx` → `CampusMap.tsx`.
4. Rename + rewrite `MalaysiaMapClient.tsx` → `CampusMapClient.tsx`.
5. Rename + retheme `MapHero.tsx`, `RegionStats.tsx`, `StateGrid.tsx` → `FacultyGrid.tsx`.
6. Update `app/map/page.tsx`.
7. Rename `app/map/[state]/` → `app/map/[faculty]/` and update page + `generateStaticParams` + `not-found.tsx`.
8. Update `app/sitemap.ts` to include `/map/[faculty]` URLs.

### Phase 4 — Forms & interactive
1. `components/ui/HireForm.tsx` (SSM → industry verification).
2. `app/hire/register/page.tsx` (repurpose as `/for-industry/register` content; route 301 to `/for-industry/register`).
3. `app/for-company/page.tsx` (repurpose as `/for-industry`).
4. `app/for-government/page.tsx` (repurpose as `/for-faculty`).
5. `app/pricing/page.tsx` (repurpose as `/sponsorship`).
6. `components/sections/SDJobsPricing.tsx` (rename to `SponsorshipTiers.tsx` or similar; retheme).
7. `components/sections/TailoredSolutions.tsx` (industry + faculty offerings).
8. `next.config.ts` redirects (see §11).

### Phase 5 — Detail pages (route-level polish)
1. `/jobs/[slug]` (employer emails + city).
2. `/events/[slug]` (venue + timezone).
3. `/code/bounty/[slug]` (API domain in code samples).
4. `/community/[slug]` (townhall content reference; auto from `data/community.ts`).
5. `/news/[slug]` (auto from `data/news.ts`).
6. `/members/[handle]` (faculty badge; auto).
7. `/guilds/[slug]` (auto from `data/guilds.ts`).

### Phase 6 — Polish & validation
1. Repository-wide find/replace audit (rg + manual) for stray `SelaDevs` / `seladev*` references.
2. Tailwind v4 build check.
3. `next build` — confirm no type errors.
4. Lighthouse + accessibility check.
5. Visual QA: every page in dark + light mode.
6. RSS feed validation (`/changelog/rss.xml`).
7. Sitemap validation (`/sitemap.xml`).
8. PWA install + offline QA.
9. Final review of legal pages with UTHM stakeholders (if production).

---

## 15. Per-page alignment checklist (every page)

| Page | Status | Action summary |
|---|---|---|
| `/` | 🟡 Pending | Rebrand hero + bento (Phase 1, §3). |
| `/about` | 🟡 Pending | Rewrite manifesto (Phase 1.12). |
| `/map` | 🟡 Pending | Campus map (Phase 3). |
| `/map/[faculty]` | 🟡 Pending | Rename dir + page (Phase 3.7). |
| `/leaderboard` | 🟡 Pending | Faculty filter (Phase 2.2 + §4.4). |
| `/members` | 🟡 Pending | Data-driven (Phase 2.2). |
| `/members/[handle]` | 🟡 Pending | Faculty badge (auto). |
| `/guilds` | 🟡 Pending | Data-driven (Phase 2.3). |
| `/guilds/[slug]` | 🟡 Pending | Data-driven. |
| `/guilds/new` | 🟡 Pending | Copy "Start a UTHM circle". |
| `/events` | 🟡 Pending | Data-driven (Phase 2.5). |
| `/events/[slug]` | 🟡 Pending | Venue + MYT (Phase 5.2). |
| `/news` | 🟡 Pending | Data-driven (Phase 2.9). |
| `/news/[slug]` | 🟡 Pending | Data-driven. |
| `/changelog` | 🟡 Pending | Data-driven (Phase 2.10). |
| `/changelog/rss.xml` | 🟡 Pending | Channel name/description. |
| `/code/bounty` | 🟡 Pending | API domain (Phase 5.3). |
| `/code/bounty/[slug]` | 🟡 Pending | API domain. |
| `/jobs` | 🟡 Pending | Data-driven (Phase 2.6). |
| `/jobs/[slug]` | 🟡 Pending | Emails (Phase 5.1). |
| `/for-company` → `/for-industry` | 🟡 Pending | Repurpose (Phase 4.3). |
| `/for-government` → `/for-faculty` | 🟡 Pending | Repurpose (Phase 4.4). |
| `/hire/register` → `/for-industry/register` | 🟡 Pending | Repurpose (Phase 4.2). |
| `/pricing` → `/sponsorship` | 🟡 Pending | Repurpose (Phase 4.5). |
| `/showcase` | 🟡 Pending | Data-driven (Phase 2.4). |
| `/community` | 🟡 Pending | Data-driven (Phase 2.8). |
| `/community/[slug]` | 🟡 Pending | Data-driven. |
| `/contact` | 🟡 Pending | Emails (Phase 1.9). |
| `/terms` | 🟡 Pending | Legal rewrite (Phase 1.13). |
| `/privacy` | 🟡 Pending | Legal rewrite. |
| `/offline` | 🟡 Pending | Rebrand (Phase 1.4). |
| `/sitemap.xml` | 🟡 Pending | URLs (Phase 1.10). |
| `/robots.txt` | 🟡 Pending | Sitemap URL (Phase 1.10). |
| `manifest.webmanifest` | 🟡 Pending | Rebrand (Phase 1.3). |
| `sw.js` | 🟡 Pending | Cache + paths (Phase 1.4). |

---

## 16. Risks & open questions

1. **UTHM stats (1,751 builders, etc.)** — all current numbers are placeholders. Need UTHM data team confirmation for: builder count, faculty count, bounty pool, project count. Mark all numerical constants with `// TODO: confirm` in `data/content.ts` and `data/map.ts`.
2. **UTHM faculty list & coordinates** — need authoritative source. UTHM currently has 7+ faculties + several centres. Coordinate slugs and landmarks need UTHM verification.
3. **Branding approval** — UTHM logo usage is governed by UTHM's branding policy. Confirm with UTHM's Corporate Communications Office (Pejabat Hal Ehwal Korporat & Kualiti) before publishing.
4. **Legal sign-off** — privacy + terms reference UTHM as data controller. Need UTHM's legal/data-protection officer sign-off for production deployment.
5. **Supabase project** — current `nxukkhyjasusqbzhkqdv.supabase.co` is unowned by UTHM. Decision: provision a new UTHM Supabase project, or drop remote image patterns and use local assets only.
6. **Domain** — `uthmforge.uthm.edu.my` is illustrative. UTHM subdomain policy may require a different name.
7. **Discord/community link** — confirm whether UTHM Forge will have a real Discord, or a Telegram/UTHM-issued platform.
8. **Content ownership** — original SelaDevs showcase/bounty/community content is original to SelaDevs; re-use in UTHM context is fine for demo but flag for production.

---

## 17. Definition of done

- [ ] No occurrence of `SelaDevs`, `seladev*`, `seladevs.*`, `Sdn Bhd`, `kl-forge`, `seladev_os` in the codebase (verified via `rg`).
- [ ] No fictional company email (`@runcloud.io`, `@peripamo.tech`, `@courtsite.my`, `@bungkus.my`, `@selat.dev`, `@kopipawang.app`, `@ai-os.dev`, `@rokokregex.app`, `@tukar.bot`, `@jomenvois.my`) remains.
- [ ] Every page renders UTHM-aligned copy in both dark and light mode.
- [ ] All data files (16+) reflect UTHM context.
- [ ] Map feature renders UTHM campus + faculty hotspots.
- [ ] `next build` succeeds with zero TypeScript errors.
- [ ] `next.config.ts` redirects all repurposed old routes to new routes.
- [ ] PWA install + offline works with new manifest.
- [ ] Sitemap + robots reflect new domain and route list.
- [ ] Legal pages (privacy + terms) reference UTHM as data controller, Johor Bahru as jurisdiction, PDPA 2010 + JPDP remain cited.
- [ ] All `TODO: confirm` constants flagged for UTHM data team.

---

*End of plan. Next step: phase sign-off and start Phase 1 (brand spine).*
