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

// TODO: confirm with UTHM data team
// All event times use MYT (UTC+8). Venue capacity + RSVP counts below are
// placeholder seeded numbers; the real numbers live in the events service and
// are pulled in by the UTHM data team weekly. Please verify before going live.

export const EVENTS: EventItem[] = [
  {
    id: 1,
    slug: "uthm-forge-demo-night-14",
    title: "UTHM Forge Demo Night #14",
    category: "showcase",
    start: "2026-06-12T20:00+08:00",
    end: "2026-06-12T23:00+08:00",
    venue: { name: "FKMP Auditorium", city: "Parit Raja", mode: "in-person" },
    description:
      "Eight builders, eight demos, eight minutes each. Open mic, free makan, the monthly pulse-check of what UTHM Forge is shipping. This month: a UTHM PWA offline kit, a Bahasa Melayu OCR pipeline, and a real-time campus currency notifier.",
    agenda: [
      { time: "20:00", label: "doors + makan" },
      { time: "20:30", label: "demo 01 — UTHM PWA offline kit" },
      { time: "20:38", label: "demo 02 — BhashaOCR" },
      { time: "20:46", label: "demo 03 — CAPS-Announcer bot" },
      { time: "20:54", label: "demo 04 — UTHM Sandbox probes" },
      { time: "21:02", label: "demo 05 — SplitHold v2" },
      { time: "21:10", label: "demo 06 — Validator regex" },
      { time: "21:18", label: "demo 07 — FYP-Forge v2" },
      { time: "21:26", label: "demo 08 — AI-OS" },
      { time: "21:35", label: "open mic + networking" },
    ],
    speakers: [
      { handle: "haikal.fskm", name: "Haikal R.", role: "host" },
      { handle: "rendra.fkaas", name: "Rendra K.", role: "demo" },
      { handle: "syafiqah.caps", name: "Syafiqah M.", role: "demo" },
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
      "A 2.5-hour hands-on workshop organized by UTHM Forge. We'll cover Whisper.cpp deployment, VAD tuning, the costs of latency, and how to handle Bahasa Melayu code-switching. Bring a laptop and a working mic.",
    agenda: [
      { time: "21:00", label: "intros + setup" },
      { time: "21:15", label: "lecture: voice agent stack" },
      { time: "21:45", label: "lab: deploy whisper.cpp" },
      { time: "22:30", label: "lab: tune for bahasamelayu" },
      { time: "23:15", label: "q&a" },
    ],
    speakers: [
      { handle: "hafiz.fskm", name: "Hafiz Y.", role: "instructor" },
      { handle: "saifuddin.fke", name: "Saifuddin R.", role: "guest" },
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
    venue: { name: "UTHM Library Auditorium", city: "Parit Raja", mode: "hybrid" },
    description:
      "Monthly UTHM Forge community townhall. This month: 'Vibe Coding' — is it making us better engineers, or just faster script-kiddies? Open mic, 4-person panel, then audience Q&A. Light dinner provided.",
    agenda: [
      { time: "19:30", label: "doors + dinner" },
      { time: "20:00", label: "panel: vibe coding in 2026" },
      { time: "20:30", label: "open mic" },
      { time: "21:00", label: "audience q&a" },
      { time: "21:20", label: "announcements" },
    ],
    speakers: [
      { handle: "haikal.fskm", name: "Haikal R.", role: "panel" },
      { handle: "saifuddin.fke", name: "Saifuddin R.", role: "panel" },
      { handle: "ameera.fstmi", name: "Ameera H.", role: "panel" },
      { handle: "aiman.fke", name: "Aiman S.", role: "panel" },
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
    venue: { name: "PTTA Workshop, Level 2", city: "Parit Raja", mode: "in-person" },
    description:
      "Twelve hours, twelve bounties, one room. Pick a bounty from the board, ship a working solution by 22:00, get paid on the spot. Bounties range from RM 350 to RM 1,200. Open to UTHM members and guests.",
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
      { handle: "haikal.fskm", name: "Haikal R.", role: "judge" },
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
    venue: { name: "Dewan Sultan Ibrahim", city: "Parit Raja", mode: "hybrid" },
    description:
      "The relaunch of the UTHM Forge Showcase — the public gallery of what UTHM students and staff ship. v2 ships with offline support, a PWA install, and a new bounty-poll feature. We open the night with 3 demo-bounties, each paid out live.",
    agenda: [
      { time: "19:00", label: "doors" },
      { time: "19:30", label: "keynote: showcase v2" },
      { time: "20:00", label: "live bounty #1" },
      { time: "20:30", label: "live bounty #2" },
      { time: "21:00", label: "live bounty #3" },
      { time: "21:30", label: "celebration" },
    ],
    speakers: [
      { handle: "haikal.fskm", name: "Haikal R.", role: "keynote" },
      { handle: "ameera.fstmi", name: "Ameera H.", role: "co-host" },
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
      "Three-hour deep-dive, co-organized with UTHM FSKTM GPU cluster team. Running small LLMs in production on a single GPU. We cover quantization (GGUF, AWQ, GPTQ), batching, KV-cache tricks, and the actual $/1M-token costs on UTHM's on-prem cluster.",
    agenda: [
      { time: "15:00", label: "intro + setup" },
      { time: "15:30", label: "lecture: quantization 101" },
      { time: "16:15", label: "lab: gguf + ollama" },
      { time: "17:00", label: "lab: awq on a 3090" },
      { time: "17:45", label: "q&a" },
    ],
    speakers: [
      { handle: "iman.fkmp", name: "Iman G.", role: "instructor" },
    ],
    capacity: 80,
    rsvps: 47,
    cover: 6,
  },
  {
    id: 7,
    slug: "uthm-sandbox-v1-release-party",
    title: "UTHM Sandbox v1.0 Release Party",
    category: "social",
    start: "2026-07-26T18:00+08:00",
    end: "2026-07-26T22:00+08:00",
    venue: { name: "FSKTM Labs Block A", city: "Parit Raja", mode: "in-person" },
    description:
      "We shipped UTHM Sandbox v1.0 — let's makan. Casual social night for the community, partners, and friends. Pizza, drinks, a small swag drop, and a 10-minute retrospective by Tsara I. on what we learned building it.",
    agenda: [
      { time: "18:00", label: "doors + pizza" },
      { time: "19:00", label: "sandbox v1 retro" },
      { time: "19:30", label: "swag drop" },
      { time: "20:00", label: "social" },
    ],
    speakers: [
      { handle: "tsara.fpm", name: "Tsara I.", role: "keynote" },
    ],
    capacity: 200,
    rsvps: 134,
    cover: 7,
  },
  {
    id: 9,
    slug: "telegram-titans-botathon",
    title: "Telegram Titans: Botathon",
    category: "hacknight",
    start: "2026-08-22T10:00+08:00",
    end: "2026-08-22T20:00+08:00",
    venue: { name: "PTTA Workshop, Level 2", city: "Parit Raja", mode: "in-person" },
    description: "10-hour botathon organized by UTHM Forge + CAPS. Ship a working Telegram bot in a day. Themes: utility, devtools, bots-for-campus-life. Prizes in RM and a paid circle slot for the top 3.",
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
      { handle: "syafiqah.caps", name: "Syafiqah M.", role: "host" },
    ],
    capacity: 80,
    rsvps: 52,
    cover: 9,
  },
  {
    id: 10,
    slug: "uthm-forge-buildathon-2026",
    title: "UTHM Forge Buildathon 2026",
    category: "hacknight",
    start: "2026-09-12T10:00+08:00",
    end: "2026-09-13T22:00+08:00",
    venue: { name: "Dewan Sultan Ibrahim", city: "Parit Raja", mode: "in-person" },
    description: "Our flagship 36-hour buildathon. 200 builders, 12 bounties, RM 25,000 in prizes, and a panel of 6 judges from the UTHM academic + industry community. Open to UTHM members and guests.",
    agenda: [
      { time: "sat 10:00", label: "doors + coffee + bounty reveal" },
      { time: "sat 11:00", label: "claim window opens" },
      { time: "sat 18:00", label: "midpoint dinner" },
      { time: "sun 06:00", label: "sunrise check-in" },
      { time: "sun 20:00", label: "submissions close + demos" },
      { time: "sun 22:00", label: "awards" },
    ],
    speakers: [
      { handle: "haikal.fskm", name: "Haikal R.", role: "host" },
      { handle: "tsara.fpm", name: "Tsara I.", role: "judge" },
      { handle: "ameera.fstmi", name: "Ameera H.", role: "judge" },
      { handle: "saifuddin.fke", name: "Saifuddin R.", role: "judge" },
      { handle: "syamir.fskm", name: "Syamir T.", role: "judge" },
    ],
    capacity: 200,
    rsvps: 134,
    cover: 10,
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
