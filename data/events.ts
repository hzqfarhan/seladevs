export type EventCategory =
  | "showcase"
  | "hacknight"
  | "townhall"
  | "workshop"
  | "social"
  | "bounty-launch";

export type EventItem = {
  id: number;
  slug: string;
  title: string;
  category: EventCategory;
  start: string;
  end: string;
  venue: { name: string; city: string; mode: "in-person" | "online" | "hybrid" };
  description: string;
  agenda: { time: string; label: string }[];
  speakers: { handle: string; name: string; role: string }[];
  capacity: number;
  rsvps: number;
  cover: number;
};

export const EVENTS: EventItem[] = [
  {
    id: 1,
    slug: "edge-runners-demo-night-14",
    title: "Edge Runners Demo Night #14",
    category: "showcase",
    start: "2026-06-12T20:00+08:00",
    end: "2026-06-12T23:00+08:00",
    venue: { name: "Seladevs Garage", city: "KL", mode: "in-person" },
    description:
      "Eight builders, eight demos, eight minutes each. Open mic, free food, the monthly pulse-check of what the SelaDevs community is shipping. This month: PWA offline kits, a Bahasa Melayu OCR pipeline, and a real-time currency notifier.",
    agenda: [
      { time: "20:00", label: "doors + makan" },
      { time: "20:30", label: "demo 01 — PWA offline kit" },
      { time: "20:38", label: "demo 02 — bungkus OCR" },
      { time: "20:46", label: "demo 03 — tukar bot" },
      { time: "20:54", label: "demo 04 — selat probes" },
      { time: "21:02", label: "demo 05 — split hold v2" },
      { time: "21:10", label: "demo 06 — rokok regex" },
      { time: "21:18", label: "demo 07 — eff v2" },
      { time: "21:26", label: "demo 08 — ai-os" },
      { time: "21:35", label: "open mic + networking" },
    ],
    speakers: [
      { handle: "kagerou1107", name: "Aiman R.", role: "host" },
      { handle: "rendra.my", name: "Rendra K.", role: "demo" },
      { handle: "syafiqah.codes", name: "Syafiqah M.", role: "demo" },
    ],
    capacity: 120,
    rsvps: 87,
    cover: 1,
  },
  {
    id: 2,
    slug: "prompt-pilots-voice-agents-prod",
    title: "Prompt Pilots: Voice Agents in Prod",
    category: "workshop",
    start: "2026-06-18T21:00+08:00",
    end: "2026-06-18T23:30+08:00",
    venue: { name: "Online · Discord Stage", city: "Online", mode: "online" },
    description:
      "A 2.5-hour hands-on workshop on shipping voice agents to production. We'll cover Whisper.cpp deployment, VAD tuning, the costs of latency, and how to handle Bahasa Melayu code-switching. Bring a laptop and a working mic.",
    agenda: [
      { time: "21:00", label: "intros + setup" },
      { time: "21:15", label: "lecture: voice agent stack" },
      { time: "21:45", label: "lab: deploy whisper.cpp" },
      { time: "22:30", label: "lab: tune for bahasamelayu" },
      { time: "23:15", label: "q&a" },
    ],
    speakers: [
      { handle: "hafiz.py", name: "Hafiz Y.", role: "instructor" },
      { handle: "strdst7", name: "Saifuddin R.", role: "guest" },
    ],
    capacity: 60,
    rsvps: 41,
    cover: 2,
  },
  {
    id: 3,
    slug: "june-townhall-vibe-coding",
    title: "June Townhall: Vibe Coding",
    category: "townhall",
    start: "2026-06-25T19:30+08:00",
    end: "2026-06-25T21:30+08:00",
    venue: { name: "Seladevs Garage", city: "KL", mode: "hybrid" },
    description:
      "Monthly community townhall. This month: 'Vibe Coding' — is it making us better engineers, or just faster script-kiddies? Open mic, 4-person panel, then audience Q&A. Light dinner provided.",
    agenda: [
      { time: "19:30", label: "doors + dinner" },
      { time: "20:00", label: "panel: vibe coding in 2026" },
      { time: "20:30", label: "open mic" },
      { time: "21:00", label: "audience q&a" },
      { time: "21:20", label: "announcements" },
    ],
    speakers: [
      { handle: "kagerou1107", name: "Aiman R.", role: "panel" },
      { handle: "strdst7", name: "Saifuddin R.", role: "panel" },
      { handle: "ameera.dev", name: "Ameera H.", role: "panel" },
      { handle: "aiman.sh", name: "Aiman S.", role: "panel" },
    ],
    capacity: 100,
    rsvps: 64,
    cover: 3,
  },
  {
    id: 4,
    slug: "hacknight-12h-bounty-sprint",
    title: "Hacknight: 12-hour Bounty Sprint",
    category: "hacknight",
    start: "2026-07-04T10:00+08:00",
    end: "2026-07-04T22:00+08:00",
    venue: { name: "Penang Co-Working, Level 4", city: "Penang", mode: "in-person" },
    description:
      "Twelve hours, twelve bounties, one room. Pick a bounty from the board, ship a working solution by 22:00, get paid on the spot. Bounties range from RM 350 to RM 1,200. Open to members and guests.",
    agenda: [
      { time: "10:00", label: "doors + coffee" },
      { time: "10:30", label: "bounty board reveal" },
      { time: "11:00", label: "claim window opens" },
      { time: "11:30", label: "ship" },
      { time: "16:00", label: "midpoint check-in" },
      { time: "21:00", label: "submissions close" },
      { time: "21:30", label: "judging" },
      { time: "22:00", label: "payouts + wrap" },
    ],
    speakers: [
      { handle: "kagerou1107", name: "Aiman R.", role: "judge" },
    ],
    capacity: 60,
    rsvps: 38,
    cover: 4,
  },
  {
    id: 5,
    slug: "showcase-v2-launch",
    title: "Showcase v2.0 Launch",
    category: "bounty-launch",
    start: "2026-07-11T19:00+08:00",
    end: "2026-07-11T22:00+08:00",
    venue: { name: "Seladevs Garage", city: "KL", mode: "hybrid" },
    description:
      "The relaunch of the Showcase — the public gallery of what SelaDevs members ship. v2 ships with offline support, a PWA install, and a new bounty-poll feature. We open the night with 3 demo-bounties, each paid out live.",
    agenda: [
      { time: "19:00", label: "doors" },
      { time: "19:30", label: "keynote: showcase v2" },
      { time: "20:00", label: "live bounty #1" },
      { time: "20:30", label: "live bounty #2" },
      { time: "21:00", label: "live bounty #3" },
      { time: "21:30", label: "celebration" },
    ],
    speakers: [
      { handle: "kagerou1107", name: "Aiman R.", role: "keynote" },
      { handle: "ameera.dev", name: "Ameera H.", role: "co-host" },
    ],
    capacity: 150,
    rsvps: 112,
    cover: 5,
  },
  {
    id: 6,
    slug: "gpu-ghosts-inference-budget",
    title: "GPU Ghosts: Inference on a Budget",
    category: "workshop",
    start: "2026-07-19T15:00+08:00",
    end: "2026-07-19T18:00+08:00",
    venue: { name: "Online · Discord Stage", city: "Online", mode: "online" },
    description:
      "Three-hour deep-dive on running small LLMs in production on a single GPU. We cover quantization (GGUF, AWQ, GPTQ), batching, KV-cache tricks, and the actual $/1M-token costs in the SEA region.",
    agenda: [
      { time: "15:00", label: "intro + setup" },
      { time: "15:30", label: "lecture: quantization 101" },
      { time: "16:15", label: "lab: gguf + ollama" },
      { time: "17:00", label: "lab: awq on a 3090" },
      { time: "17:45", label: "q&a" },
    ],
    speakers: [
      { handle: "iman.go", name: "Iman G.", role: "instructor" },
    ],
    capacity: 80,
    rsvps: 47,
    cover: 6,
  },
  {
    id: 7,
    slug: "selat-v1-release-party",
    title: "Selat v1.0 Release Party",
    category: "social",
    start: "2026-07-26T18:00+08:00",
    end: "2026-07-26T22:00+08:00",
    venue: { name: "Seladevs Garage", city: "KL", mode: "in-person" },
    description:
      "We shipped Selat v1.0 — let's drink. Casual social night for the community, partners, and friends. Pizza, drinks, a small swag drop, and a 10-minute retrospective by Tsara I. on what we learned building it.",
    agenda: [
      { time: "18:00", label: "doors + pizza" },
      { time: "19:00", label: "selat v1 retro" },
      { time: "19:30", label: "swag drop" },
      { time: "20:00", label: "social" },
    ],
    speakers: [
      { handle: "tsara.id", name: "Tsara I.", role: "keynote" },
    ],
    capacity: 200,
    rsvps: 134,
    cover: 7,
  },
  {
    id: 8,
    slug: "august-townhall-builder-burnout",
    title: "August Townhall: Builder Burnout",
    category: "townhall",
    start: "2026-08-06T20:00+08:00",
    end: "2026-08-06T22:00+08:00",
    venue: { name: "Online · Discord Stage", city: "Online", mode: "online" },
    description:
      "Open townhall on builder burnout. 3 short talks (10 min each), then structured breakout rooms. Topics: sustainable pace, the cult of overwork, and how to actually take a break without losing momentum.",
    agenda: [
      { time: "20:00", label: "intros" },
      { time: "20:10", label: "talk 01: sustainable pace" },
      { time: "20:25", label: "talk 02: cult of overwork" },
      { time: "20:40", label: "talk 03: taking the break" },
      { time: "20:55", label: "breakouts" },
      { time: "21:45", label: "share-out" },
    ],
    speakers: [
      { handle: "ameera.dev", name: "Ameera H.", role: "host" },
    ],
    capacity: 200,
    rsvps: 76,
    cover: 8,
  },
  {
    id: 9,
    slug: "telegram-titans-botathon",
    title: "Telegram Titans: Botathon",
    category: "hacknight",
    start: "2026-08-22T10:00+08:00",
    end: "2026-08-22T20:00+08:00",
    venue: { name: "Seladevs Garage", city: "KL", mode: "in-person" },
    description:
      "10-hour botathon. Ship a working Telegram bot in a day. Themes: utility, devtools, bots-for-business. Prizes in RM and a paid guild slot for the top 3.",
    agenda: [
      { time: "10:00", label: "doors + coffee" },
      { time: "10:30", label: "theme reveal" },
      { time: "11:00", label: "ship" },
      { time: "14:00", label: "midpoint" },
      { time: "18:00", label: "submissions close" },
      { time: "18:30", label: "demos" },
      { time: "19:30", label: "judging + prizes" },
    ],
    speakers: [
      { handle: "syafiqah.codes", name: "Syafiqah M.", role: "host" },
    ],
    capacity: 80,
    rsvps: 52,
    cover: 9,
  },
];

export const EVENT_CATEGORIES: EventCategory[] = [
  "showcase",
  "hacknight",
  "townhall",
  "workshop",
  "social",
  "bounty-launch",
];
