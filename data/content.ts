export { UTHM_FACULTIES as STATES } from "./map";
export { JOBS } from "./jobs";
export { NAV_COLUMNS, HEADER_LINKS, FOOTER_LINKS } from "./nav";

// TODO: confirm all numerical constants with UTHM data team.
export const SHOWCASE = [
  { id: 1, title: "KampusKita", author: "haikal_dev" },
  { id: 2, title: "BhashaOCR", author: "aishah_uthm" },
  { id: 3, title: "ParitRider", author: "amir_ridzuan" },
  { id: 4, title: "FYPForge", author: "nadia_ms" },
  { id: 5, title: "IoT-BatuPahat", author: "fkmp_lab" },
  { id: 6, title: "JohorPulse", author: "uthm_data" },
];

export const STATS = [
  { label: "active builders", value: 1200, prefix: "", suffix: "+" },
  { label: "bounties paid", value: 4800, prefix: "RM", suffix: "+" },
  { label: "faculties", value: 7, prefix: "", suffix: "" },
  { label: "projects shipped", value: 42, prefix: "", suffix: "+" },
];

export const GOVERNANCE = [
  {
    n: "01",
    title: "Bounty Board",
    eyebrow: "earn rewards",
    body: "Earn payouts for shipping technical excellence — FYP-grade projects, OSS contributions, and faculty-sponsored challenges.",
    cta: "view all bounties",
    href: "/code/bounty",
  },
  {
    n: "02",
    title: "Bounty Poll",
    eyebrow: "vote the next",
    body: "Help us pick the next community bounty. Proposals come from students, lecturers, and industry sponsors.",
    cta: "cast your vote",
    href: "/code/bounty",
  },
  {
    n: "03",
    title: "Townhall",
    eyebrow: "discussion",
    body: "Open threads on OSS licensing for FYP work, UTHM Wi-Fi at FKMP, monthly hackathons, and Bahasa Melayu in dev tooling.",
    cta: "view all discussions",
    href: "/community",
  },
  {
    n: "04",
    title: "Circles",
    eyebrow: "find your crew",
    body: "Faculty-rooted circles for FSKTM, FKMP, FKE, FKAAS, FPTV, FSTI, and FPM. Build alongside people who ship at your level.",
    cta: "view all circles",
    href: "/guilds",
  },
];
