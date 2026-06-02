export type BountyStatus = "open" | "closing-soon" | "claimed" | "judging" | "paid";
export type BountyTrack =
  | "frontend"
  | "backend"
  | "infra"
  | "ai/ml"
  | "mobile"
  | "security"
  | "docs"
  | "design";

export type Bounty = {
  id: number;
  slug: string;
  title: string;
  track: BountyTrack;
  status: BountyStatus;
  payout: number;
  currency: "RM";
  closesAt: string;
  description: string;
  rubric: string[];
  judging: string;
  submission: string;
  issuer: { handle: string; name: string };
};

export const BOUNTIES: Bounty[] = [
  {
    id: 1,
    slug: "pwa-offline-cache-showcase",
    title: "Add PWA offline cache for /showcase",
    track: "frontend",
    status: "open",
    payout: 600,
    currency: "RM",
    closesAt: "2026-06-20T23:59+08:00",
    description:
      "Add a proper PWA offline cache to the /showcase page so it loads instantly and works without a network connection. The current implementation is a placeholder; we need a real service-worker-backed cache for project covers, project data, and the detail modal.",
    rubric: [
      "Service worker registers and activates on first visit",
      "All 12 showcase covers load offline after a single online visit",
      "Detail modal opens from cache when offline",
      "Cache invalidates when a new project is added (etag/version check)",
      "No regressions in Lighthouse performance score",
    ],
    judging:
      "Two of the core team will review within 48h of submission. The PR must be green, include a short Loom walking through offline mode, and pass the rubric above. We pay on merge.",
    submission: `curl -X POST https://api.seladevs.com/bounties/1/claim \\
  -H "Authorization: Bearer $SD_TOKEN" \\
  -d '{"repo":"github.com/you/pwa-cache","pr":42}'`,
    issuer: { handle: "kagerou1107", name: "Aiman R." },
  },
  {
    id: 2,
    slug: "clickhouse-guild-events-schema",
    title: "ClickHouse schema for guild events",
    track: "backend",
    status: "open",
    payout: 1200,
    currency: "RM",
    closesAt: "2026-06-25T23:59+08:00",
    description:
      "Design and ship a ClickHouse schema + ingestion path for guild events (sessions attended, missions shipped, members joined/left). The schema should be queryable for the guild page's stats panel with sub-100ms p99 latency on 10M rows.",
    rubric: [
      "Schema uses MergeTree + appropriate partitioning keys",
      "Ingestion path handles 1k events/sec sustained",
      "5 example queries documented and benchmarked",
      "Migration path from the current Postgres-only model included",
    ],
    judging:
      "We'll spin up a staging ClickHouse, replay 10M rows of synthetic data, and run your benchmark queries. Payout on a successful p99 under 100ms with the documented schema.",
    submission: `curl -X POST https://api.seladevs.com/bounties/2/claim \\
  -H "Authorization: Bearer $SD_TOKEN" \\
  -d '{"repo":"github.com/you/clickhouse-guilds","pr":12}'`,
    issuer: { handle: "tsara.id", name: "Tsara I." },
  },
  {
    id: 3,
    slug: "whisper-cpp-ci-runner",
    title: "Whisper.cpp CI runner on Tauri",
    track: "ai/ml",
    status: "open",
    payout: 1000,
    currency: "RM",
    closesAt: "2026-06-22T23:59+08:00",
    description:
      "Add a self-hosted Whisper.cpp runner to the AI-OS CI pipeline. The runner should pick up audio fixtures, transcribe, and assert the output matches a reference transcript within 200ms of audio.",
    rubric: [
      "Runner uses the GGML quantized whisper.cpp model",
      "p95 latency under 1.5x real-time for 30s clips",
      "CI step passes deterministically across 10 runs",
      "Documentation in the repo on how to add a new fixture",
    ],
    judging:
      "We'll add a few adversarial audio fixtures (background noise, code-switched EN/MS) and re-run your CI. Payout if the rubric holds.",
    submission: `curl -X POST https://api.seladevs.com/bounties/3/claim \\
  -H "Authorization: Bearer $SD_TOKEN" \\
  -d '{"repo":"github.com/you/whisper-ci","pr":7}'`,
    issuer: { handle: "strdst7", name: "Saifuddin R." },
  },
  {
    id: 4,
    slug: "bungkus-mobile-haptics",
    title: "Mobile haptics for Bungkus checkout",
    track: "mobile",
    status: "closing-soon",
    payout: 450,
    currency: "RM",
    closesAt: "2026-06-03T23:59+08:00",
    description:
      "Add meaningful, accessible haptics to the Bungkus checkout flow. Three haptic events minimum: item added, payment submitted, payment confirmed. Respect iOS and Android haptic guidelines and the user's reduce-motion setting.",
    rubric: [
      "3 distinct haptic events in the checkout flow",
      "Respects system reduce-motion setting on both platforms",
      "No regression in the existing haptics (if any)",
      "Documented in code with accessibility rationale",
    ],
    judging:
      "We'll test on a real iPhone 15 and a Pixel 8. The PR ships if the rubric holds and accessibility review is clean.",
    submission: `curl -X POST https://api.seladevs.com/bounties/4/claim \\
  -H "Authorization: Bearer $SD_TOKEN" \\
  -d '{"repo":"github.com/you/bungkus-haptics","pr":3}'`,
    issuer: { handle: "rendra.my", name: "Rendra K." },
  },
  {
    id: 5,
    slug: "pinned-2fa-bounty-claim",
    title: "Pinned 2FA on bounty claim",
    track: "security",
    status: "open",
    payout: 900,
    currency: "RM",
    closesAt: "2026-06-18T23:59+08:00",
    description:
      "Add WebAuthn (passkey) as the second factor for the bounty-claim flow. Users should be able to register a passkey on first claim and use it on subsequent claims. Fall back to TOTP for users on older devices.",
    rubric: [
      "WebAuthn registration flow ships behind a feature flag",
      "Existing TOTP flow continues to work",
      "Rate limiting and lockout policies in place",
      "Documented threat model in the repo",
    ],
    judging:
      "A security review by the Security Sentinels guild. We pay if the PR ships, the rubric holds, and the threat model is reasonable.",
    submission: `curl -X POST https://api.seladevs.com/bounties/5/claim \\
  -H "Authorization: Bearer $SD_TOKEN" \\
  -d '{"repo":"github.com/you/passkey-bounty","pr":9}'`,
    issuer: { handle: "syamir.kl", name: "Syamir T." },
  },
  {
    id: 6,
    slug: "public-roadmap-docs",
    title: "Public roadmap docs (Docusaurus)",
    track: "docs",
    status: "open",
    payout: 350,
    currency: "RM",
    closesAt: "2026-06-15T23:59+08:00",
    description:
      "Set up a public roadmap on seladevs.com/roadmap using Docusaurus. Three categories: 'shipped', 'shipping next', 'proposed'. The data is a single markdown file; we want it readable, dark-mode-friendly, and easy to update.",
    rubric: [
      "Site builds with `npm run build` and is deployable to Vercel",
      "Dark and light theme both render correctly",
      "Roadmap data lives in a single, easy-to-edit markdown file",
      "At least 3 example entries per category",
    ],
    judging:
      "We'll deploy your branch to a preview URL and check the rubric. Payout on merge.",
    submission: `curl -X POST https://api.seladevs.com/bounties/6/claim \\
  -H "Authorization: Bearer $SD_TOKEN" \\
  -d '{"repo":"github.com/you/roadmap-docs","pr":1}'`,
    issuer: { handle: "qistina.ts", name: "Qistina R." },
  },
  {
    id: 7,
    slug: "refresh-hero-illustration",
    title: "Refresh seladevs.com hero illustration",
    track: "design",
    status: "closing-soon",
    payout: 800,
    currency: "RM",
    closesAt: "2026-06-03T18:00+08:00",
    description:
      "Replace the placeholder hero illustration on the home page with a polished, on-brand SVG. The art should evoke 'forge + builders' — neon + wine palette, geometric, slightly glitchy, not too literal. SVG only, no raster.",
    rubric: [
      "Single inline SVG, no external assets",
      "Renders correctly at 320px and 1440px",
      "Uses only the existing sd-* color tokens",
      "Respects prefers-reduced-motion (no autoplay animations)",
    ],
    judging:
      "The design team will review against the rubric. Payout on the PR being merged.",
    submission: `curl -X POST https://api.seladevs.com/bounties/7/claim \\
  -H "Authorization: Bearer $SD_TOKEN" \\
  -d '{"repo":"github.com/you/hero-illustration","pr":2}'`,
    issuer: { handle: "ameera.dev", name: "Ameera H." },
  },
  {
    id: 8,
    slug: "k8s-gitops-template",
    title: "K8s GitOps repo template",
    track: "infra",
    status: "closing-soon",
    payout: 1100,
    currency: "RM",
    closesAt: "2026-06-04T12:00+08:00",
    description:
      "Ship a turn-key K8s GitOps repo template that a 3-person SEA team can fork and run in 30 minutes. Includes ArgoCD app-of-apps, sealed-secrets, a basic prometheus + grafana stack, and a sample app.",
    rubric: [
      "One-command bootstrap (`make bootstrap`) deploys the full stack",
      "Documentation walks through the 30-min setup",
      "Sealed secrets example included",
      "Sample app deploys and is reachable via ingress",
    ],
    judging:
      "We'll time a fresh fork. Payout if you meet the 30-min-from-zero-to-running mark and the rubric holds.",
    submission: `curl -X POST https://api.seladevs.com/bounties/8/claim \\
  -H "Authorization: Bearer $SD_TOKEN" \\
  -d '{"repo":"github.com/you/gitops-template","pr":1}'`,
    issuer: { handle: "arif.builds", name: "Arif M." },
  },
];

export type BountyPollOption = {
  id: number;
  title: string;
  description: string;
  proposedBy: string;
  votes: number;
};

export const BOUNTY_POLL: BountyPollOption[] = [
  {
    id: 1,
    title: "Edge function in 100 LoC",
    description: "ship a deno-style edge function runtime in 100 lines of rust. educational, not production.",
    proposedBy: "haziq.dev",
    votes: 38,
  },
  {
    id: 2,
    title: "Mamak split-bill PWA",
    description: "offline-first PWA that splits a mamak bill using OCR + bluetooth. ships with mamak presets.",
    proposedBy: "ameera.dev",
    votes: 52,
  },
  {
    id: 3,
    title: "OCR receipt parser",
    description: "open-source receipt parser that handles Bahasa Melayu item names and Ringgit currency.",
    proposedBy: "rendra.my",
    votes: 71,
  },
  {
    id: 4,
    title: "Builder reputation score",
    description: "a public, transparent reputation score for SelaDevs members based on shipped work + community feedback.",
    proposedBy: "kagerou1107",
    votes: 29,
  },
  {
    id: 5,
    title: "Telegram bounty bot",
    description: "a bot that posts new bounties to subscribed groups and accepts claim submissions inline.",
    proposedBy: "syafiqah.codes",
    votes: 64,
  },
];

export type PastBounty = {
  id: number;
  handle: string;
  payout: number;
  title: string;
  paidAgo: string;
};

export const PAST_BOUNTIES: PastBounty[] = [
  { id: 1, handle: "@rendra.my", payout: 350, title: "Fix Bungkus iOS keyboard overlap", paidAgo: "2d ago" },
  { id: 2, handle: "@aiman.sh", payout: 600, title: "RokokRegex shareable URLs", paidAgo: "4d ago" },
  { id: 3, handle: "@hafiz.py", payout: 800, title: "Voice agent latency dashboard", paidAgo: "6d ago" },
  { id: 4, handle: "@daniyal.rs", payout: 1200, title: "no-std HTTP server lab", paidAgo: "1w ago" },
  { id: 5, handle: "@najwa.codes", payout: 450, title: "Hero section RSC migration", paidAgo: "1w ago" },
  { id: 6, handle: "@iman.go", payout: 900, title: "GPU probe for Selat", paidAgo: "2w ago" },
];

export const BOUNTY_TRACKS: BountyTrack[] = [
  "frontend",
  "backend",
  "infra",
  "ai/ml",
  "mobile",
  "security",
  "docs",
  "design",
];
