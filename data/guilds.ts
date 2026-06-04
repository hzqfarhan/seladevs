export type GuildCategory =
  | "frontend"
  | "backend"
  | "infra"
  | "ai/ml"
  | "mobile"
  | "security"
  | "web3"
  | "design"
  | "dx";

export type GuildCadence = "weekly" | "biweekly" | "monthly";

export type Guild = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  category: GuildCategory;
  cadence: GuildCadence;
  recruiting: boolean;
  members: number;
  maxMembers: number;
  lead: { handle: string; name: string };
  mission: string;
  banners: [string, string];
  recentActivity: string;
  nextSession?: string;
  links: { discord?: string; github?: string; manifesto?: string };
};

// TODO: confirm with UTHM data team
// 12 "circles" (formerly "guilds" in the SelaDevs era) for the UTHM Forge
// migration. The interface name `Guild` and the slugs are preserved to keep
// every consumer in /app and /components working. The user-facing `name` and
// `mission` are rewritten for UTHM faculties, labs, and student services.
// Member counts and cadence are placeholder seeded values.

export const GUILDS: Guild[] = [
  {
    id: 1,
    slug: "edge-runners",
    name: "UTHM Edge",
    tagline: "ship a 1k-star OSS tool in 90 days. we move like a sprint, ship like a studio.",
    category: "frontend",
    cadence: "weekly",
    recruiting: true,
    members: 47,
    maxMembers: 60,
    lead: { handle: "haikal.fskm", name: "Haikal R." },
    mission: "ship a 1k-star OSS tool in 90 days from a UTHM FYP. current target: a PWA-ready showcase kit anchored at FSKTM.",
    banners: ["#8C0A26", "#5F0617"],
    recentActivity: "2h ago",
    nextSession: "2026-06-04T20:00+08:00",
    links: {
      discord: "https://discord.gg/uthm-edge",
      github: "https://github.com/uthm-forge/uthm-edge",
      manifesto: "https://uthm-forge.dev/circles/uthm-edge/manifesto",
    },
  },
  {
    id: 2,
    slug: "bento-brigade",
    name: "UTHM Bento",
    tagline: "designers + frontenders shipping 1 component library a month.",
    category: "design",
    cadence: "biweekly",
    recruiting: true,
    members: 34,
    maxMembers: 40,
    lead: { handle: "qistina.fstmi", name: "Qistina R." },
    mission: "release a 30-component bento kit for UTHM-facing apps, MIT, with tokens and a Figma source.",
    banners: ["#B01434", "#FF2D55"],
    recentActivity: "5h ago",
    nextSession: "2026-06-08T19:00+08:00",
    links: { discord: "https://discord.gg/uthm-bento" },
  },
  {
    id: 3,
    slug: "prompt-pilots",
    name: "Prompt Pilots UTHM",
    tagline: "voice agents, RAG, and shipping AI to actual UTHM users — not demos.",
    category: "ai/ml",
    cadence: "weekly",
    recruiting: true,
    members: 41,
    maxMembers: 50,
    lead: { handle: "hafiz.fskm", name: "Hafiz Y." },
    mission: "ship a voice agent that handles 1k real UTHM Library patron calls/week.",
    banners: ["#9B5CFF", "#FF2D55"],
    recentActivity: "12m ago",
    nextSession: "2026-06-03T21:00+08:00",
    links: { github: "https://github.com/uthm-forge/prompt-pilots-uthm" },
  },
  {
    id: 4,
    slug: "telegram-titans",
    name: "Telegram Titans UTHM",
    tagline: "bots, MTProto, and the unsexy reliability work that scales them for UTHM CAPS.",
    category: "backend",
    cadence: "weekly",
    recruiting: true,
    members: 29,
    maxMembers: 40,
    lead: { handle: "syafiqah.caps", name: "Syafiqah M." },
    mission: "build a shared bot-hosting template for UTHM CAPS that cuts deploy time from 30min to 2min.",
    banners: ["#FF2D55", "#14070C"],
    recentActivity: "1d ago",
    nextSession: "2026-06-06T20:30+08:00",
    links: { discord: "https://discord.gg/uthm-telegram-titans" },
  },
  {
    id: 5,
    slug: "rust-rangers",
    name: "Rust Rangers UTHM",
    tagline: "rust, no async runtime, no bullshit. we read the stdlib like scripture.",
    category: "backend",
    cadence: "weekly",
    recruiting: false,
    members: 18,
    maxMembers: 25,
    lead: { handle: "daniyal.fke", name: "Daniyal K." },
    mission: "build a no-std HTTP server, line by line, as a public lab series out of FKE.",
    banners: ["#5F0617", "#FFB454"],
    recentActivity: "8h ago",
    nextSession: "2026-06-05T20:00+08:00",
    links: { github: "https://github.com/uthm-forge/rust-rangers" },
  },
  {
    id: 6,
    slug: "cloud-cartel",
    name: "UTHM Cloud",
    tagline: "k8s, terraform, and the boring infrastructure that makes UTHM shipping fast.",
    category: "infra",
    cadence: "biweekly",
    recruiting: true,
    members: 26,
    maxMembers: 40,
    lead: { handle: "arif.ptta", name: "Arif M." },
    mission: "ship a gitops template for UTHM capstone teams — k8s, postgres, redis, monitoring, all 1-click.",
    banners: ["#B01434", "#9B5CFF"],
    recentActivity: "3h ago",
    nextSession: "2026-06-10T19:00+08:00",
    links: { discord: "https://discord.gg/uthm-cloud" },
  },
  {
    id: 7,
    slug: "gpu-ghosts",
    name: "GPU Ghosts UTHM",
    tagline: "small models, big inference. we run LLMs on a single 3090 in the FSKTM cluster.",
    category: "ai/ml",
    cadence: "weekly",
    recruiting: true,
    members: 23,
    maxMembers: 30,
    lead: { handle: "iman.fkmp", name: "Iman G." },
    mission: "open-source a sub-200ms Bahasa Melayu speech-to-text server as a UTHM capstone.",
    banners: ["#9B5CFF", "#5F0617"],
    recentActivity: "20m ago",
    nextSession: "2026-06-05T21:00+08:00",
    links: { github: "https://github.com/uthm-forge/gpu-ghosts" },
  },
  {
    id: 8,
    slug: "react-renegades",
    name: "React Renegades UTHM",
    tagline: "react 19, server components, and the new render model. we ship the new way.",
    category: "frontend",
    cadence: "weekly",
    recruiting: true,
    members: 32,
    maxMembers: 50,
    lead: { handle: "najwa.fskm", name: "Najwa A." },
    mission: "rewrite the uthm-forge.dev site in RSC, post the diff series publicly.",
    banners: ["#FF2D55", "#B01434"],
    recentActivity: "45m ago",
    nextSession: "2026-06-04T20:00+08:00",
    links: { discord: "https://discord.gg/uthm-react" },
  },
  {
    id: 9,
    slug: "svelte-syndicate",
    name: "Svelte Syndicate UTHM",
    tagline: "svelte 5 runes, no virtual DOM drama, just shipping for UTHM Sandbox admin UI.",
    category: "frontend",
    cadence: "monthly",
    recruiting: true,
    members: 14,
    maxMembers: 30,
    lead: { handle: "arjun.fskm", name: "Arjun N." },
    mission: "ship NullHold to 1k active UTHM users by end of Q3.",
    banners: ["#FFB454", "#FF2D55"],
    recentActivity: "1d ago",
    nextSession: "2026-06-20T19:00+08:00",
    links: { github: "https://github.com/uthm-forge/svelte-syndicate" },
  },
  {
    id: 10,
    slug: "kotlin-knights",
    name: "Kotlin Knights UTHM",
    tagline: "android native, jetpack compose, and shipping apps that feel native on every device.",
    category: "mobile",
    cadence: "biweekly",
    recruiting: true,
    members: 21,
    maxMembers: 35,
    lead: { handle: "dinesh.fstmi", name: "Dinesh P." },
    mission: "ship a 100% kotlin, 100% compose starter app for UTHM that hits the play store in 30 days.",
    banners: ["#B01434", "#FFB454"],
    recentActivity: "6h ago",
    nextSession: "2026-06-12T20:00+08:00",
    links: { github: "https://github.com/uthm-forge/kotlin-knights" },
  },
  {
    id: 11,
    slug: "design-disruptors",
    name: "Design Disruptors UTHM",
    tagline: "the design mafia. we audit your UTHM-app onboarding in 24h and tell you the truth.",
    category: "design",
    cadence: "monthly",
    recruiting: false,
    members: 12,
    maxMembers: 18,
    lead: { handle: "ameera.fstmi", name: "Ameera H." },
    mission: "publish 12 public teardowns of UTHM-affiliated app onboarding flows.",
    banners: ["#FF2D55", "#9B5CFF"],
    recentActivity: "2d ago",
    nextSession: "2026-06-15T19:00+08:00",
    links: { discord: "https://discord.gg/uthm-design" },
  },
  {
    id: 12,
    slug: "security-sentinels",
    name: "Security Sentinels UTHM",
    tagline: "we find the bug before the bad guy does. pentests, audits, writeups.",
    category: "security",
    cadence: "monthly",
    recruiting: true,
    members: 16,
    maxMembers: 25,
    lead: { handle: "syamir.fskm", name: "Syamir T." },
    mission: "publish a monthly 'state of UTHM appsec' report, free, no vendor sponsorship.",
    banners: ["#5F0617", "#FF2D55"],
    recentActivity: "3d ago",
    nextSession: "2026-06-18T20:00+08:00",
    links: { manifesto: "https://uthm-forge.dev/circles/security-sentinels/manifesto" },
  },
];

export const GUILD_CATEGORIES: GuildCategory[] = [
  "frontend",
  "backend",
  "infra",
  "ai/ml",
  "mobile",
  "security",
  "web3",
  "design",
  "dx",
];
