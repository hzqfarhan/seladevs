export type MemberRole =
  | "frontend"
  | "backend"
  | "full-stack"
  | "mobile"
  | "devops"
  | "ml/ai"
  | "design"
  | "data"
  | "security";

export type MemberFaculty =
  | "FSKTM"
  | "FKMP"
  | "FKE"
  | "FKAAS"
  | "FPTV"
  | "FSTI"
  | "FPM"
  | "CAPS"
  | "PTTA";

// Legacy alias — components that still reference `MemberState` keep compiling.
// TODO: rename to `MemberFaculty` across the codebase in a follow-up.
export type MemberState = MemberFaculty;

export type Member = {
  id: number;
  handle: string;
  name: string;
  bio: string;
  role: MemberRole;
  state: MemberFaculty;
  stack: string[];
  stars: number;
  joined: string;
  online: boolean;
  wallet: string;
};

// TODO: confirm with UTHM data team
// Faculty list above (FSKTM, FKMP, FKE, FKAAS, FPTV, FSTI, FPM, CAPS, PTTA) is the
// placeholder set seeded for the UTHM Forge migration. The `state` field name is
// preserved on purpose so existing consumers in /app and /components keep working;
// the values themselves now hold the UTHM faculty code. Final field rename
// (state -> faculty) and any additional faculties (e.g. new centres) pending sign-off.

export const MEMBERS: Member[] = [
  {
    id: 1,
    handle: "haikal.fskm",
    name: "Haikal R.",
    bio: "FSKTM Y3 CS. ships more in a week than most do in a semester. writes rust when nobody is watching.",
    role: "full-stack",
    state: "FSKTM",
    stack: ["typescript", "rust", "next.js"],
    stars: 480,
    joined: "2024-09-12",
    online: true,
    wallet: "uthm-4a91…21f3",
  },
  {
    id: 2,
    handle: "sayyuf.fkmp",
    name: "Sayyuf A.",
    bio: "FKMP Y4 Mech Eng. flutter, maps, and too much coffee. building a campus ride-share tracker for Parit Raja.",
    role: "mobile",
    state: "FKMP",
    stack: ["flutter", "dart", "maps"],
    stars: 162,
    joined: "2024-11-04",
    online: true,
    wallet: "uthm-12bc…9d04",
  },
  {
    id: 3,
    handle: "saifuddin.fke",
    name: "Saifuddin R.",
    bio: "FKE Y4 EE. rust evangelist. building a low-cost air-quality node as his FYP.",
    role: "ml/ai",
    state: "FKE",
    stack: ["rust", "tauri", "whisper"],
    stars: 380,
    joined: "2024-10-19",
    online: false,
    wallet: "uthm-77ab…1cce",
  },
  {
    id: 4,
    handle: "aniq.fptv",
    name: "Aniq Z.",
    bio: "FPTV Y3 Vocational Ed. twilio whisperer. capstone: a UTHM Library SMS hold-notifier.",
    role: "backend",
    state: "FPTV",
    stack: ["next.js", "postgres", "twilio"],
    stars: 207,
    joined: "2025-01-21",
    online: true,
    wallet: "uthm-9f02…aa18",
  },
  {
    id: 5,
    handle: "rendra.fkaas",
    name: "Rendra K.",
    bio: "FKAAS Y2 Applied Sci. react native + ml kit. has strong opinions about app icons.",
    role: "mobile",
    state: "FKAAS",
    stack: ["react-native", "ocr", "expo"],
    stars: 89,
    joined: "2025-02-02",
    online: true,
    wallet: "uthm-3344…b2a1",
  },
  {
    id: 6,
    handle: "tsara.fpm",
    name: "Tsara I.",
    bio: "FPM Y4 Maths. go, clickhouse, and Johor-sovereign infra. runs the campus Selat-style probe off a rpi4 in PTTA.",
    role: "backend",
    state: "FPM",
    stack: ["go", "clickhouse", "htmx"],
    stars: 420,
    joined: "2024-09-08",
    online: false,
    wallet: "uthm-c0de…5ea5",
  },
  {
    id: 7,
    handle: "ameera.fstmi",
    name: "Ameera H.",
    bio: "FSTI Y3 IT. designs interfaces that feel like a 3am study-room session — fast, warm, exact.",
    role: "design",
    state: "FSTI",
    stack: ["figma", "flutter", "framer"],
    stars: 354,
    joined: "2024-12-14",
    online: true,
    wallet: "uthm-b007…feed",
  },
  {
    id: 8,
    handle: "haziq.fskm",
    name: "Haziq F.",
    bio: "FSKTM Y2 CS. writes rust that compiles on the first try. owns the FSKTM-FKMP study group.",
    role: "backend",
    state: "FSKTM",
    stack: ["rust", "go", "postgres"],
    stars: 211,
    joined: "2024-10-30",
    online: true,
    wallet: "uthm-fade…c0de",
  },
  {
    id: 9,
    handle: "aiman.fke",
    name: "Aiman S.",
    bio: "FKE Y3 EE. regex enjoyer. built a UTHM-coursereg validator because every form he found was wrong.",
    role: "frontend",
    state: "FKE",
    stack: ["typescript", "wasm", "rust"],
    stars: 153,
    joined: "2025-01-11",
    online: false,
    wallet: "uthm-a1ma…n123",
  },
  {
    id: 10,
    handle: "syafiqah.caps",
    name: "Syafiqah M.",
    bio: "CAPS Y2. python + telegram bots. CAPS-Announcer is the third bot she's shipped to 1k+ UTHM students.",
    role: "backend",
    state: "CAPS",
    stack: ["python", "postgres", "redis"],
    stars: 78,
    joined: "2025-03-02",
    online: true,
    wallet: "uthm-5f1q…aa02",
  },
  {
    id: 11,
    handle: "najwa.fskm",
    name: "Najwa A.",
    bio: "FSKTM Y3 CS. frontend with a soft spot for css. never met a grid she couldn't center.",
    role: "frontend",
    state: "FSKTM",
    stack: ["react", "css", "next.js"],
    stars: 142,
    joined: "2025-02-18",
    online: true,
    wallet: "uthm-4e2a…0b1e",
  },
  {
    id: 12,
    handle: "arif.ptta",
    name: "Arif M.",
    bio: "PTTA Y2. devops by day, homelab ops by night. runs the UTHM self-hosted meetup from his khostel room.",
    role: "devops",
    state: "PTTA",
    stack: ["kubernetes", "terraform", "aws"],
    stars: 87,
    joined: "2025-04-22",
    online: true,
    wallet: "uthm-beef…0077",
  },
  {
    id: 13,
    handle: "aishah.fskm",
    name: "Aishah S.",
    bio: "FSKTM Y4 CS. security researcher. fuzzes things that nobody else thought to fuzz, usually UTHM Wi-Fi captive portals.",
    role: "security",
    state: "FSKTM",
    stack: ["go", "rust", "burp"],
    stars: 234,
    joined: "2024-09-05",
    online: false,
    wallet: "uthm-dead…beef",
  },
  {
    id: 14,
    handle: "izzat.fstmi",
    name: "Izzat R.",
    bio: "FSTI Y1 IT. migrates jQuery codebases for fun. yes, in 2026 — and yes, UTHM has one.",
    role: "frontend",
    state: "FSTI",
    stack: ["typescript", "react", "vite"],
    stars: 51,
    joined: "2026-01-14",
    online: true,
    wallet: "uthm-1221…0099",
  },
  {
    id: 15,
    handle: "syakirah.fpm",
    name: "Syakirah H.",
    bio: "Postgrad (MSc DS) at FPM. data engineer. turns clickstreams into decisions for UTHM Innovation & Commercialisation.",
    role: "data",
    state: "FPM",
    stack: ["python", "dbt", "snowflake"],
    stars: 119,
    joined: "2025-01-09",
    online: true,
    wallet: "uthm-d4ta…1queen",
  },
  {
    id: 16,
    handle: "daniyal.fke",
    name: "Daniyal K.",
    bio: "FKE Y4 EE. rust + embedded. flashed a custom firmware on the PTTA door-lock for his FYP demo.",
    role: "backend",
    state: "FKE",
    stack: ["rust", "c", "embedded"],
    stars: 178,
    joined: "2024-12-30",
    online: false,
    wallet: "uthm-da11…ee21",
  },
  {
    id: 17,
    handle: "farouq.ptta",
    name: "Farouq S.",
    bio: "PTTA Y3. writes shell scripts that ship. the uthm-forge build pipeline is his.",
    role: "devops",
    state: "PTTA",
    stack: ["bash", "go", "nix"],
    stars: 92,
    joined: "2025-05-04",
    online: true,
    wallet: "uthm-f4rq…0110",
  },
  {
    id: 18,
    handle: "hafiz.fskm",
    name: "Hafiz Y.",
    bio: "RA — Dr. Aini's lab (FSKTM). fastapi + langchain. builds agents that actually ship to UTHM Library production.",
    role: "ml/ai",
    state: "FSKTM",
    stack: ["python", "fastapi", "openai"],
    stars: 267,
    joined: "2024-11-19",
    online: true,
    wallet: "uthm-hf12…py00",
  },
  {
    id: 19,
    handle: "iman.fkmp",
    name: "Iman G.",
    bio: "Postgrad (MSc DS) at FKMP. go micro-services + k8s. runs the gpu-ghosts infra for the Bahasa STT cluster.",
    role: "devops",
    state: "FKMP",
    stack: ["go", "kubernetes", "helm"],
    stars: 145,
    joined: "2024-12-28",
    online: false,
    wallet: "uthm-1m4n…9900",
  },
  {
    id: 20,
    handle: "qistina.fstmi",
    name: "Qistina R.",
    bio: "FSTI Y4 IT. design systems. turned uthm-forge.dev from a figma into pixels in 9 days.",
    role: "design",
    state: "FSTI",
    stack: ["figma", "react", "tokens"],
    stars: 198,
    joined: "2024-11-02",
    online: true,
    wallet: "uthm-7015…7a55",
  },
  {
    id: 21,
    handle: "arjun.fskm",
    name: "Arjun N.",
    bio: "FSKTM Y3 CS. svelte + sveltekit. believes runes are the right call for the UTHM Sandbox admin UI.",
    role: "frontend",
    state: "FSKTM",
    stack: ["svelte", "typescript", "vite"],
    stars: 76,
    joined: "2025-06-12",
    online: true,
    wallet: "uthm-a12j…n002",
  },
  {
    id: 22,
    handle: "mei.fpm",
    name: "Mei L.",
    bio: "Postgrad (PhD) at FPM. data viz. makes Postgres EXPLAIN plans look like art for the FYP-Forge dashboards.",
    role: "data",
    state: "FPM",
    stack: ["d3", "python", "duckdb"],
    stars: 134,
    joined: "2025-01-25",
    online: false,
    wallet: "uthm-me1l…n014",
  },
  {
    id: 23,
    handle: "dinesh.fstmi",
    name: "Dinesh P.",
    bio: "FSTI Y3 IT. android native. ships features in kotlin that took ios teams a semester.",
    role: "mobile",
    state: "FSTI",
    stack: ["kotlin", "jetpack", "compose"],
    stars: 102,
    joined: "2025-02-20",
    online: true,
    wallet: "uthm-d1ne…5002",
  },
  {
    id: 24,
    handle: "syamir.fskm",
    name: "Syamir T.",
    bio: "FYP candidate at FSKTM. pen-tests the things UTHM IT Centre doesn't know it's running.",
    role: "security",
    state: "FSKTM",
    stack: ["python", "go", "metasploit"],
    stars: 312,
    joined: "2024-10-22",
    online: true,
    wallet: "uthm-5y4m…k1k1",
  },
];

export const MEMBER_ROLES: MemberRole[] = [
  "frontend",
  "backend",
  "full-stack",
  "mobile",
  "devops",
  "ml/ai",
  "design",
  "data",
  "security",
];

export const MEMBER_STATES: MemberFaculty[] = [
  "FSKTM",
  "FKMP",
  "FKE",
  "FKAAS",
  "FPTV",
  "FSTI",
  "FPM",
  "CAPS",
  "PTTA",
];
