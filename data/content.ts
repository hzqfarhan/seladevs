export { STATES } from "./map";
export { JOBS } from "./jobs";

export const NAV_COLUMNS = [
  {
    eyebrow: "<project>",
    items: [
      { label: "showcase", href: "/showcase" },
      { label: "manifesto", href: "/about" },
    ],
  },
  {
    eyebrow: "<community>",
    items: [
      { label: "builders", href: "/members" },
      { label: "guild directory", href: "/guilds" },
      { label: "events", href: "/events" },
      { label: "news", href: "/news" },
      { label: "changelog", href: "/changelog" },
    ],
  },
  {
    eyebrow: "<business>",
    items: [
      { label: "for companies", href: "/for-company" },
      { label: "job board", href: "/jobs" },
      { label: "bounty board", href: "/code/bounty" },
    ],
  },
  {
    eyebrow: "<government>",
    items: [
      { label: "our solution", href: "/for-government" },
    ],
  },
];

export const SHOWCASE = [
  { id: 1, title: "SplitHold", author: "kagerou1107" },
  { id: 2, title: "Jarak Tracker", author: "unc_sayyuf" },
  { id: 3, title: "Eternal Frame Fate V2", author: "kagerou1107" },
  { id: 4, title: "AI-OS", author: "strdst7" },
  { id: 5, title: "NullHold", author: "kagerou1107" },
  { id: 6, title: "JomEnvois", author: "aniqzr344" },
];

export const STATS = [
  { label: "active builders", value: 1751, prefix: "", suffix: "+" },
  { label: "payouts", value: 12500, prefix: "RM", suffix: "+" },
  { label: "missions", value: 86, prefix: "", suffix: "+" },
];

export const GOVERNANCE = [
  {
    n: "01",
    title: "Bounty Board",
    eyebrow: "earn rewards",
    body: "Earn payouts for shipping technical excellence.",
    cta: "view all bounties",
    href: "/code/bounty",
  },
  {
    n: "02",
    title: "Bounty Poll",
    eyebrow: "vote the next",
    body: "Vote for the next community bounty.",
    cta: "cast your vote",
    href: "/code/bounty",
  },
  {
    n: "03",
    title: "Townhall",
    eyebrow: "discussion",
    body: "Is 'Vibe Coding' making us better engineers, or just faster script-kiddies?",
    cta: "view all discussions",
    href: "/community",
  },
  {
    n: "04",
    title: "Guilds",
    eyebrow: "find your crew",
    body: "Build alongside people who ship at your level.",
    cta: "view all guilds",
    href: "/guilds",
  },
];
