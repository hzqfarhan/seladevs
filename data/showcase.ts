export type ShowcaseItem = {
  id: number;
  slug: string;
  title: string;
  author: { handle: string; name: string };
  cover: number;
  oneLiner: string;
  description: string;
  tags: string[];
  stack: string[];
  stars: number;
  forks: number;
  links: { live?: string; github?: string; writeup?: string };
  addedAt: string;
};

// TODO: confirm with UTHM data team
// Stars, forks, and addedAt values below are placeholder seeded numbers for the
// UTHM Forge migration. Real counts should be pulled from the GitHub API per
// project. The 12 projects are the seed set chosen by the UTHM Forge founders.

export const SHOWCASE: ShowcaseItem[] = [
  {
    id: 1,
    slug: "splithold",
    title: "SplitHold",
    author: { handle: "haikal.fskm", name: "Haikal R." },
    cover: 1,
    oneLiner: "splitwise for khostel roommates who hate spreadsheets",
    description:
      "SplitHold is a no-nonsense expense splitter built for UTHM khostel and Kolej Kediaman roommates, couples, and trip groups. Settle in Ringgit, sync to Supabase, no ads, no upsell. We rebuilt the UI in v2 around a single 'who owes who' panel — everything else is one tap away. Origin: a FSKTM final-year FYP.",
    tags: ["next.js", "typescript", "supabase"],
    stack: ["Next.js 15", "TypeScript", "Supabase", "Tailwind", "Framer Motion"],
    stars: 142,
    forks: 18,
    links: { live: "https://splithold.uthm-forge.dev", github: "https://github.com/uthm-forge/splithold" },
    addedAt: "2026-05-12",
  },
  {
    id: 2,
    slug: "paritrider",
    title: "ParitRider",
    author: { handle: "sayyuf.fkmp", name: "Sayyuf A." },
    cover: 2,
    oneLiner: "GPS mileage logger that doesn't sell your data",
    description:
      "ParitRider is an offline-first Flutter app that logs your trips and reimbursements without phoning home. Trip data stays on-device unless you opt-in to sync. Built for Parit Raja -> Batu Pahat grab-drivers, FKP auditors on site visits, and FKMP capstone students driving to industry partners. Origin: FKMP Y4 capstone.",
    tags: ["flutter", "dart", "maps"],
    stack: ["Flutter 3.22", "Dart", "Isar DB", "MapLibre"],
    stars: 96,
    forks: 11,
    links: { github: "https://github.com/uthm-forge/paritrider" },
    addedAt: "2026-05-08",
  },
  {
    id: 3,
    slug: "eternal-frame-fate-v2",
    title: "Eternal Frame Fate V2",
    author: { handle: "haikal.fskm", name: "Haikal R." },
    cover: 3,
    oneLiner: "anime frame-perfect gacha simulator",
    description:
      "A community-built simulator for the gacha mechanics in the Eternal Frame Fate mobile game. V2 is a full rewrite in React + Vite with deterministic seeded pulls, shareable seed URLs, and a fairness audit page. Built by a FSKTM Y3 student in his free time. Featured on the front page of /r/indiegaming for a week.",
    tags: ["react", "vite", "tailwind"],
    stack: ["React 19", "Vite 6", "Tailwind 4", "Zustand"],
    stars: 280,
    forks: 24,
    links: { live: "https://eternalframe.fate.dev", github: "https://github.com/haikalfsktm/eff-v2" },
    addedAt: "2026-04-30",
  },
  {
    id: 4,
    slug: "ai-os",
    title: "AI-OS",
    author: { handle: "saifuddin.fke", name: "Saifuddin R." },
    cover: 4,
    oneLiner: "voice-first linux desktop, mys-style",
    description:
      "AI-OS is an experimental desktop environment for Linux that ships with a Whisper.cpp-powered voice agent out of the box. You speak, it acts — file ops, window management, shell commands. Written in Rust + Tauri, with a built-in permissioned-action log. Origin: an FKE capstone project that grew.",
    tags: ["rust", "tauri", "whisper"],
    stack: ["Rust 1.78", "Tauri 2", "whisper.cpp", "egui"],
    stars: 212,
    forks: 22,
    links: { github: "https://github.com/uthm-forge/ai-os", writeup: "https://ai-os.uthm-forge.dev/manifesto" },
    addedAt: "2026-04-22",
  },
  {
    id: 5,
    slug: "nullhold",
    title: "NullHold",
    author: { handle: "haikal.fskm", name: "Haikal R." },
    cover: 5,
    oneLiner: "minimal kanban that actually respects your time",
    description:
      "NullHold is a personal kanban for one. Three columns, keyboard-first, no projects, no sub-tasks, no tags, no 'productivity frameworks'. Just a board and a state. Open source, no telemetry, single binary Go server + Svelte client. Used by ~30 FSKTM students to track FYP milestones.",
    tags: ["svelte", "supabase"],
    stack: ["Svelte 5", "Supabase", "Go", "Postgres"],
    stars: 318,
    forks: 21,
    links: { live: "https://nullhold.app", github: "https://github.com/uthm-forge/nullhold" },
    addedAt: "2026-04-15",
  },
  {
    id: 6,
    slug: "jomenvois",
    title: "JomEnvois",
    author: { handle: "aniq.fptv", name: "Aniq Z." },
    cover: 6,
    oneLiner: "SMS-first group payments for khostel nights",
    description:
      "JomEnvois lets a UTHM khostel floor settle a mamak bill over SMS — no app install required. The payer texts a shortcode, picks the bill, the system fans out SMS to floor-mates with their share, and replies roll back to the organiser. Origin: FPTV Y3 capstone, now spinning out of UTHM Innovation & Commercialisation.",
    tags: ["next.js", "postgres", "twilio"],
    stack: ["Next.js", "Postgres", "Twilio", "Bun"],
    stars: 207,
    forks: 29,
    links: { live: "https://jomenvois.uthm.dev" },
    addedAt: "2026-04-02",
  },
  {
    id: 7,
    slug: "bungkus",
    title: "Bungkus",
    author: { handle: "rendra.fkaas", name: "Rendra K." },
    cover: 7,
    oneLiner: "scan receipts, split with friends, settle in Ringgit",
    description:
      "Bungkus uses on-device OCR to extract line items from a receipt photo, then splits the bill by what each person actually ate. Integrates with SplitHold for settlement. iOS + Android via React Native. Origin: FKAAS applied-sci capstone with on-device ML Kit OCR.",
    tags: ["react-native", "ocr"],
    stack: ["React Native 0.76", "ML Kit OCR", "Expo", "Reanimated"],
    stars: 89,
    forks: 7,
    links: { github: "https://github.com/uthm-forge/bungkus" },
    addedAt: "2026-03-28",
  },
  {
    id: 8,
    slug: "uthm-sandbox",
    title: "UTHM Sandbox",
    author: { handle: "tsara.fpm", name: "Tsara I." },
    cover: 8,
    oneLiner: "open-source uptime monitor for Malaysian campus services",
    description:
      "UTHM Sandbox is an open-source uptime and incident monitor with a regional bias: it checks from MY, ID, SG, and TH probes, so UTHM services get accurate latency numbers for the actual users they serve. CLI + a tiny web UI in Go + ClickHouse. Origin: FPM postgrad research on campus-service reliability.",
    tags: ["go", "clickhouse"],
    stack: ["Go 1.23", "ClickHouse", "htmx", "Alpine.js"],
    stars: 342,
    forks: 36,
    links: { live: "https://sandbox.uthm.dev", github: "https://github.com/uthm-forge/uthm-sandbox" },
    addedAt: "2026-03-20",
  },
  {
    id: 9,
    slug: "kampuskita",
    title: "KampusKita",
    author: { handle: "ameera.fstmi", name: "Ameera H." },
    cover: 9,
    oneLiner: "campus services super-app for UTHM",
    description:
      "KampusKita is the UTHM Forge take on a campus services app: timetable, bus shuttle live ETAs, print queue, HostelNet credit, library seat availability, and a CAPS announcement feed in one Flutter app. Origin: FSTI Y3 design + dev joint capstone, now installed by ~600 students.",
    tags: ["flutter", "firebase"],
    stack: ["Flutter", "Firebase", "Cloud Functions", "FCM"],
    stars: 164,
    forks: 14,
    links: { live: "https://kampuskita.uthm-forge.dev" },
    addedAt: "2026-03-10",
  },
  {
    id: 10,
    slug: "nasi-net",
    title: "NasiNet",
    author: { handle: "haziq.fskm", name: "Haziq F." },
    cover: 10,
    oneLiner: "tiny HTTP server in 200 lines of Rust",
    description:
      "A teaching project — NasiNet is a 200-line HTTP/1.1 server in Rust with no dependencies, no async runtime, just std::net. Used as the lab material for the FSKTM 'Build it from scratch' study group and adapted by the Rust Rangers UTHM circle.",
    tags: ["rust", "http"],
    stack: ["Rust", "std::net", "no async"],
    stars: 41,
    forks: 3,
    links: { github: "https://github.com/uthm-forge/nasi-net", writeup: "https://haziq.uthm.dev/posts/nasi-net" },
    addedAt: "2026-02-28",
  },
  {
    id: 11,
    slug: "uthm-validator",
    title: "UTHM Validator",
    author: { handle: "aiman.fke", name: "Aiman S." },
    cover: 11,
    oneLiner: "regex playground with UTHM coursereg validation",
    description:
      "A regex playground that ships with a starter library of UTHM patterns: course codes (e.g. BFC20803), staff IDs, student matrix numbers, campus postcode 86400, FKMP/FKE faculty prefixes. Each pattern comes with a failing test suite you can poke at. WASM-compiled for client-side safety. Origin: an FKE Y3 FYP.",
    tags: ["typescript", "wasm"],
    stack: ["TypeScript", "Rust→WASM", "Vite"],
    stars: 153,
    forks: 9,
    links: { live: "https://validator.uthm-forge.dev", github: "https://github.com/uthm-forge/uthm-validator" },
    addedAt: "2026-02-14",
  },
  {
    id: 12,
    slug: "tukar",
    title: "Tukar",
    author: { handle: "syafiqah.caps", name: "Syafiqah M." },
    cover: 12,
    oneLiner: "currency exchange rate notifier for Telegram",
    description:
      "Tukar is a Telegram bot that posts Ringgit exchange rate alerts to your group chat on configurable thresholds. Pulls from BNM, openexchangerates, and a manual override list. Supports MYR, IDR, SGD, THB, PHP, USD. Origin: a CAPS-anchored side project now used by 2k+ students in UTHM Telegram groups.",
    tags: ["python", "telegram"],
    stack: ["Python 3.12", "aiogram", "Postgres", "Redis"],
    stars: 27,
    forks: 2,
    links: { github: "https://github.com/uthm-forge/tukar" },
    addedAt: "2026-01-30",
  },
];

export const SHOWCASE_TAGS = Array.from(
  new Set(SHOWCASE.flatMap((s) => s.tags))
).sort();
