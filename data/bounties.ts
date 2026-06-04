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

// TODO: confirm with UTHM data team
// Payout figures below are the seed range for the UTHM Forge migration
// (RM 350 – RM 1,200). Rubric language and closesAt times are placeholder;
// real issuers from FSKTM / FKMP / UTHM IT will replace them.

export const BOUNTIES: Bounty[] = [
  {
    id: 1,
    slug: "uthm-caps-dashboard-widget",
    title: "Build a UTHM-CAPS dashboard widget",
    track: "frontend",
    status: "open",
    payout: 600,
    currency: "RM",
    closesAt: "2026-06-20T23:59+08:00",
    description:
      "Build a self-contained widget for the UTHM-CAPS (Centre for Academic & Professional Studies) dashboard. The widget should fetch the next 3 CAPS announcements, render them with the existing sd-* tokens, and degrade gracefully to a cached payload when offline. Goal: drop it into the next monthly release of the CAPS portal.",
    rubric: [
      "Service worker registers and activates on first visit",
      "All CAPS announcement cards render offline after a single online visit",
      "Detail view opens from cache when offline",
      "Cache invalidates when a new announcement is added (etag/version check)",
      "No regressions in Lighthouse performance score",
    ],
    judging:
      "Two of the core team will review within 48h of submission. The PR must be green, include a short Loom walking through offline mode, and pass the rubric above. We pay on merge.",
    submission: `curl -X POST https://api.uthm-forge.dev/bounties/1/claim \\
  -H "Authorization: Bearer $UTHM_TOKEN" \\
  -d '{"repo":"github.com/you/caps-widget","pr":42}'`,
    issuer: { handle: "haikal.fskm", name: "Haikal R." },
  },
  {
    id: 2,
    slug: "uthm-library-thesis-ocr",
    title: "OCR pipeline for UTHM Library's old thesis PDFs (Bahasa Melayu)",
    track: "ai/ml",
    status: "open",
    payout: 900,
    currency: "RM",
    closesAt: "2026-06-25T23:59+08:00",
    description:
      "Build a Bahasa Melayu OCR + layout-recovery pipeline for UTHM Library's pre-2000 thesis collection. Outputs should be searchable plain-text + per-page bboxes in a documented JSON schema. Goal: unblock UTHM Library's digitisation backlog.",
    rubric: [
      "Handles Jawi + Rumi mixed-script pages without crashing",
      "≥ 88% word accuracy on a held-out 50-page test set we provide",
      "Plain-text output preserves page numbers and section headings",
      "Documents the failure modes in the repo (README 'Known limits' section)",
    ],
    judging:
      "UTHM Library will run the pipeline on a held-out batch of 100 scanned pages from the 1990s thesis collection. We pay if accuracy is ≥ 88% and the output is structurally sound.",
    submission: `curl -X POST https://api.uthm-forge.dev/bounties/2/claim \\
  -H "Authorization: Bearer $UTHM_TOKEN" \\
  -d '{"repo":"github.com/you/uthm-thesis-ocr","pr":12}'`,
    issuer: { handle: "ameera.fstmi", name: "Ameera H." },
  },
  {
    id: 3,
    slug: "iot-batupahat-air-quality",
    title: "Low-cost IoT air-quality monitor for Batu Pahat",
    track: "infra",
    status: "open",
    payout: 1200,
    currency: "RM",
    closesAt: "2026-06-22T23:59+08:00",
    description:
      "Ship a low-cost (sub-RM 250 BOM) IoT air-quality monitor reference design for Batu Pahat. Must measure PM2.5, PM10, and temperature/humidity, stream over Wi-Fi, and write to a self-hosted time-series DB. End-to-end: schematic, firmware, ingest, dashboard. Origin: UTHM FKMP capstone that we want to make a public reference design.",
    rubric: [
      "Total BOM under RM 250",
      "p95 ingest-to-dashboard latency under 2s",
      "Open firmware (no vendor lock-in)",
      "Dashboard shows the last 24h of readings on a single chart",
    ],
    judging:
      "We'll build two of your reference designs on a fresh batch of ESP32s and run them for a week. Payout on the rubric holding across both devices.",
    submission: `curl -X POST https://api.uthm-forge.dev/bounties/3/claim \\
  -H "Authorization: Bearer $UTHM_TOKEN" \\
  -d '{"repo":"github.com/you/iot-batupahat","pr":7}'`,
    issuer: { handle: "saifuddin.fke", name: "Saifuddin R." },
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
      "Add meaningful, accessible haptics to the Bungkus receipt-splitting checkout flow. Three haptic events minimum: item added, payment submitted, payment confirmed. Respect iOS and Android haptic guidelines and the user's reduce-motion setting.",
    rubric: [
      "3 distinct haptic events in the checkout flow",
      "Respects system reduce-motion setting on both platforms",
      "No regression in the existing haptics (if any)",
      "Documented in code with accessibility rationale",
    ],
    judging:
      "We'll test on a real iPhone 15 and a Pixel 8. The PR ships if the rubric holds and accessibility review is clean.",
    submission: `curl -X POST https://api.uthm-forge.dev/bounties/4/claim \\
  -H "Authorization: Bearer $UTHM_TOKEN" \\
  -d '{"repo":"github.com/you/bungkus-haptics","pr":3}'`,
    issuer: { handle: "rendra.fkaas", name: "Rendra K." },
  },
  {
    id: 5,
    slug: "uthm-coursereg-2fa",
    title: "Pinned 2FA on UTHM CourseReg access (WebAuthn)",
    track: "security",
    status: "open",
    payout: 800,
    currency: "RM",
    closesAt: "2026-06-18T23:59+08:00",
    description:
      "Add WebAuthn (passkey) as the second factor for UTHM CourseReg access (mock target for the bounty). Users should be able to register a passkey on first claim and use it on subsequent claims. Fall back to TOTP for users on older devices.",
    rubric: [
      "WebAuthn registration flow ships behind a feature flag",
      "Existing TOTP flow continues to work",
      "Rate limiting and lockout policies in place",
      "Documented threat model in the repo",
    ],
    judging:
      "A security review by the UTHM Forge Security circle. We pay if the PR ships, the rubric holds, and the threat model is reasonable.",
    submission: `curl -X POST https://api.uthm-forge.dev/bounties/5/claim \\
  -H "Authorization: Bearer $UTHM_TOKEN" \\
  -d '{"repo":"github.com/you/passkey-coursereg","pr":9}'`,
    issuer: { handle: "syamir.fskm", name: "Syamir T." },
  },
  {
    id: 6,
    slug: "fypforge-public-roadmap-docs",
    title: "FYP-Forge public roadmap (Docusaurus)",
    track: "docs",
    status: "open",
    payout: 350,
    currency: "RM",
    closesAt: "2026-06-15T23:59+08:00",
    description:
      "Set up a public roadmap for FYP-Forge at fypforge.uthm-forge.dev/roadmap using Docusaurus. Three categories: 'shipped', 'shipping next', 'proposed'. The data is a single markdown file; we want it readable, dark-mode-friendly, and easy to update.",
    rubric: [
      "Site builds with `npm run build` and is deployable to Vercel",
      "Dark and light theme both render correctly",
      "Roadmap data lives in a single, easy-to-edit markdown file",
      "At least 3 example entries per category",
    ],
    judging:
      "We'll deploy your branch to a preview URL and check the rubric. Payout on merge.",
    submission: `curl -X POST https://api.uthm-forge.dev/bounties/6/claim \\
  -H "Authorization: Bearer $UTHM_TOKEN" \\
  -d '{"repo":"github.com/you/roadmap-docs","pr":1}'`,
    issuer: { handle: "qistina.fstmi", name: "Qistina R." },
  },
  {
    id: 7,
    slug: "uthm-forge-hero-illustration",
    title: "Refresh uthm-forge.dev hero illustration",
    track: "design",
    status: "closing-soon",
    payout: 800,
    currency: "RM",
    closesAt: "2026-06-03T18:00+08:00",
    description:
      "Replace the placeholder hero illustration on uthm-forge.dev with a polished, on-brand SVG. The art should evoke 'forge + builders' — neon + wine palette, geometric, slightly glitchy, with a subtle Parit Raja campus silhouette. SVG only, no raster.",
    rubric: [
      "Single inline SVG, no external assets",
      "Renders correctly at 320px and 1440px",
      "Uses only the existing sd-* color tokens",
      "Respects prefers-reduced-motion (no autoplay animations)",
    ],
    judging:
      "The design team will review against the rubric. Payout on the PR being merged.",
    submission: `curl -X POST https://api.uthm-forge.dev/bounties/7/claim \\
  -H "Authorization: Bearer $UTHM_TOKEN" \\
  -d '{"repo":"github.com/you/hero-illustration","pr":2}'`,
    issuer: { handle: "ameera.fstmi", name: "Ameera H." },
  },
  {
    id: 8,
    slug: "uthm-forge-gitops-template",
    title: "UTHM Forge K8s GitOps repo template",
    track: "infra",
    status: "closing-soon",
    payout: 1100,
    currency: "RM",
    closesAt: "2026-06-04T12:00+08:00",
    description:
      "Ship a turn-key K8s GitOps repo template that a 3-person FSKTM capstone team can fork and run in 30 minutes. Includes ArgoCD app-of-apps, sealed-secrets, a basic prometheus + grafana stack, and a sample app.",
    rubric: [
      "One-command bootstrap (`make bootstrap`) deploys the full stack",
      "Documentation walks through the 30-min setup",
      "Sealed secrets example included",
      "Sample app deploys and is reachable via ingress",
    ],
    judging:
      "We'll time a fresh fork. Payout if you meet the 30-min-from-zero-to-running mark and the rubric holds.",
    submission: `curl -X POST https://api.uthm-forge.dev/bounties/8/claim \\
  -H "Authorization: Bearer $UTHM_TOKEN" \\
  -d '{"repo":"github.com/you/uthm-gitops-template","pr":1}'`,
    issuer: { handle: "arif.ptta", name: "Arif M." },
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
    proposedBy: "haziq.fskm",
    votes: 38,
  },
  {
    id: 2,
    title: "Khostel split-bill PWA",
    description: "offline-first PWA that splits a khostel-floor bill using OCR + bluetooth. ships with UTHM presets.",
    proposedBy: "ameera.fstmi",
    votes: 52,
  },
  {
    id: 3,
    title: "OCR thesis parser",
    description: "open-source OCR parser that handles Bahasa Melayu thesis PDFs and outputs structured JSON for UTHM Library.",
    proposedBy: "rendra.fkaas",
    votes: 71,
  },
  {
    id: 4,
    title: "Builder reputation score",
    description: "a public, transparent reputation score for UTHM Forge members based on shipped work + community feedback.",
    proposedBy: "haikal.fskm",
    votes: 29,
  },
  {
    id: 5,
    title: "Telegram bounty bot",
    description: "a bot that posts new UTHM Forge bounties to subscribed Telegram groups and accepts claim submissions inline.",
    proposedBy: "syafiqah.caps",
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
  { id: 1, handle: "@rendra.fkaas", payout: 350, title: "Fix Bungkus iOS keyboard overlap", paidAgo: "2d ago" },
  { id: 2, handle: "@aiman.fke", payout: 600, title: "UTHM Validator shareable URLs", paidAgo: "4d ago" },
  { id: 3, handle: "@hafiz.fskm", payout: 800, title: "Voice agent latency dashboard", paidAgo: "6d ago" },
  { id: 4, handle: "@daniyal.fke", payout: 1200, title: "no-std HTTP server lab", paidAgo: "1w ago" },
  { id: 5, handle: "@najwa.fskm", payout: 450, title: "KampusKita hero RSC migration", paidAgo: "1w ago" },
  { id: 6, handle: "@iman.fkmp", payout: 900, title: "GPU probe for UTHM Sandbox", paidAgo: "2w ago" },
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
