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

export const SHOWCASE: ShowcaseItem[] = [
  {
    id: 1,
    slug: "splithold",
    title: "SplitHold",
    author: { handle: "kagerou1107", name: "Aiman R." },
    cover: 1,
    oneLiner: "splitwise for roommates who hate spreadsheets",
    description:
      "SplitHold is a no-nonsense expense splitter built for Malaysian roommates, couples, and trip groups. Settle in Ringgit, sync to Supabase, no ads, no upsell. We rebuilt the UI in v2 around a single 'who owes who' panel — everything else is one tap away.",
    tags: ["next.js", "typescript", "supabase"],
    stack: ["Next.js 15", "TypeScript", "Supabase", "Tailwind", "Framer Motion"],
    stars: 142,
    forks: 18,
    links: { live: "https://splithold.seladevs.com", github: "https://github.com/seladevs/splithold" },
    addedAt: "2026-05-12",
  },
  {
    id: 2,
    slug: "jarak-tracker",
    title: "Jarak Tracker",
    author: { handle: "unc_sayyuf", name: "Sayyuf A." },
    cover: 2,
    oneLiner: "GPS mileage logger that doesn't sell your data",
    description:
      "Jarak (Malay for 'distance') is an offline-first Flutter app that logs your trips and reimbursements without phoning home. Trip data stays on-device unless you opt-in to sync. Built for grab-drivers, auditors, and field engineers.",
    tags: ["flutter", "dart", "maps"],
    stack: ["Flutter 3.22", "Dart", "Isar DB", "MapLibre"],
    stars: 96,
    forks: 11,
    links: { github: "https://github.com/seladevs/jarak" },
    addedAt: "2026-05-08",
  },
  {
    id: 3,
    slug: "eternal-frame-fate-v2",
    title: "Eternal Frame Fate V2",
    author: { handle: "kagerou1107", name: "Aiman R." },
    cover: 3,
    oneLiner: "anime frame-perfect gacha simulator",
    description:
      "A community-built simulator for the gacha mechanics in the Eternal Frame Fate mobile game. V2 is a full rewrite in React + Vite with deterministic seeded pulls, shareable seed URLs, and a fairness audit page. Featured on the front page of /r/indiegaming for a week.",
    tags: ["react", "vite", "tailwind"],
    stack: ["React 19", "Vite 6", "Tailwind 4", "Zustand"],
    stars: 1280,
    forks: 84,
    links: { live: "https://eternalframe.fate.dev", github: "https://github.com/kagerou1107/eff-v2" },
    addedAt: "2026-04-30",
  },
  {
    id: 4,
    slug: "ai-os",
    title: "AI-OS",
    author: { handle: "strdst7", name: "Saifuddin R." },
    cover: 4,
    oneLiner: "voice-first linux desktop, mys-style",
    description:
      "AI-OS is an experimental desktop environment for Linux that ships with a Whisper.cpp-powered voice agent out of the box. You speak, it acts — file ops, window management, shell commands. Written in Rust + Tauri, with a built-in permissioned-action log.",
    tags: ["rust", "tauri", "whisper"],
    stack: ["Rust 1.78", "Tauri 2", "whisper.cpp", "egui"],
    stars: 512,
    forks: 42,
    links: { github: "https://github.com/seladevs/ai-os", writeup: "https://ai-os.seladevs.com/manifesto" },
    addedAt: "2026-04-22",
  },
  {
    id: 5,
    slug: "nullhold",
    title: "NullHold",
    author: { handle: "kagerou1107", name: "Aiman R." },
    cover: 5,
    oneLiner: "minimal kanban that actually respects your time",
    description:
      "NullHold is a personal kanban for one. Three columns, keyboard-first, no projects, no sub-tasks, no tags, no 'productivity frameworks'. Just a board and a state. Open source, no telemetry, single binary Go server + Svelte client.",
    tags: ["svelte", "supabase"],
    stack: ["Svelte 5", "Supabase", "Go", "Postgres"],
    stars: 318,
    forks: 21,
    links: { live: "https://nullhold.app", github: "https://github.com/seladevs/nullhold" },
    addedAt: "2026-04-15",
  },
  {
    id: 6,
    slug: "jomenvois",
    title: "JomEnvois",
    author: { handle: "aniqzr344", name: "Aniq Z." },
    cover: 6,
    oneLiner: "SMS-first group payments for mamak nights",
    description:
      "JomEnvois lets a group settle a mamak bill over SMS — no app install required. The payer texts a shortcode, picks the bill, the system fans out SMS to friends with their share, and replies roll back to the organiser. Built for the 73% of Malaysians on feature phones.",
    tags: ["next.js", "postgres", "twilio"],
    stack: ["Next.js", "Postgres", "Twilio", "Bun"],
    stars: 207,
    forks: 29,
    links: { live: "https://jomenvois.my" },
    addedAt: "2026-04-02",
  },
  {
    id: 7,
    slug: "bungkus",
    title: "Bungkus",
    author: { handle: "rendra.my", name: "Rendra K." },
    cover: 7,
    oneLiner: "scan receipts, split with friends, settle in Ringgit",
    description:
      "Bungkus uses on-device OCR to extract line items from a receipt photo, then splits the bill by what each person actually ate. Integrates with SplitHold for settlement. iOS + Android via React Native.",
    tags: ["react-native", "ocr"],
    stack: ["React Native 0.76", "ML Kit OCR", "Expo", "Reanimated"],
    stars: 89,
    forks: 7,
    links: { github: "https://github.com/seladevs/bungkus" },
    addedAt: "2026-03-28",
  },
  {
    id: 8,
    slug: "selat",
    title: "Selat",
    author: { handle: "tsara.id", name: "Tsara I." },
    cover: 8,
    oneLiner: "open-source uptime monitor for SEA SMEs",
    description:
      "Selat is an open-source uptime and incident monitor with a regional bias: it checks from SG, MY, ID, and TH probes, so SEA SMEs get accurate latency numbers for their actual audience. CLI + a tiny web UI in Go + ClickHouse.",
    tags: ["go", "clickhouse"],
    stack: ["Go 1.23", "ClickHouse", "htmx", "Alpine.js"],
    stars: 1742,
    forks: 96,
    links: { live: "https://selat.dev", github: "https://github.com/seladevs/selat" },
    addedAt: "2026-03-20",
  },
  {
    id: 9,
    slug: "kopipawang",
    title: "KopiPawang",
    author: { handle: "ameera.dev", name: "Ameera H." },
    cover: 9,
    oneLiner: "Kopi ordering app with queue ETAs",
    description:
      "Order your usual kopi from the mamak queue ahead of time. KopiPawang shows you a live ETA based on the shop's actual queue depth, and notifies you when to walk in. Flutter + Firebase, available in KL, PJ, and Penang.",
    tags: ["flutter", "firebase"],
    stack: ["Flutter", "Firebase", "Cloud Functions", "FCM"],
    stars: 64,
    forks: 4,
    links: { live: "https://kopipawang.app" },
    addedAt: "2026-03-10",
  },
  {
    id: 10,
    slug: "nasi-net",
    title: "NasiNet",
    author: { handle: "haziq.dev", name: "Haziq F." },
    cover: 10,
    oneLiner: "tiny HTTP server in 200 lines of Rust",
    description:
      "A teaching project — NasiNet is a 200-line HTTP/1.1 server in Rust with no dependencies, no async runtime, just std::net. Used as the lab material for the 'Build it from scratch' study group.",
    tags: ["rust", "http"],
    stack: ["Rust", "std::net", "no async"],
    stars: 41,
    forks: 3,
    links: { github: "https://github.com/seladevs/nasi-net", writeup: "https://haziq.dev/posts/nasi-net" },
    addedAt: "2026-02-28",
  },
  {
    id: 11,
    slug: "rokok-regex",
    title: "RokokRegex",
    author: { handle: "aiman.sh", name: "Aiman S." },
    cover: 11,
    oneLiner: "regex playground with Malaysian phone validation",
    description:
      "A regex playground that ships with a starter library of Malaysian patterns: phone numbers, plate numbers, MyKad, postcode, IC state codes. Each pattern comes with a failing test suite you can poke at. WASM-compiled for client-side safety.",
    tags: ["typescript", "wasm"],
    stack: ["TypeScript", "Rust→WASM", "Vite"],
    stars: 153,
    forks: 9,
    links: { live: "https://rokokregex.app", github: "https://github.com/seladevs/rokok-regex" },
    addedAt: "2026-02-14",
  },
  {
    id: 12,
    slug: "tukar",
    title: "Tukar",
    author: { handle: "syafiqah.codes", name: "Syafiqah M." },
    cover: 12,
    oneLiner: "currency exchange rate notifier for Telegram",
    description:
      "Tukar is a Telegram bot that posts Ringgit exchange rate alerts to your group chat on configurable thresholds. Pulls from BNM, openexchangerates, and a manual override list. Supports MYR, IDR, SGD, THB, PHP, USD.",
    tags: ["python", "telegram"],
    stack: ["Python 3.12", "aiogram", "Postgres", "Redis"],
    stars: 27,
    forks: 2,
    links: { github: "https://github.com/seladevs/tukar" },
    addedAt: "2026-01-30",
  },
];

export const SHOWCASE_TAGS = Array.from(
  new Set(SHOWCASE.flatMap((s) => s.tags))
).sort();
