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

export const JOBS = [
  {
    id: 1,
    company: "RunCloud Sdn Bhd",
    title: "Software Engineer Intern",
    location: "Cyberjaya",
    type: "Internship",
    salary: "700",
    posted: "25 days ago",
  },
  {
    id: 2,
    company: "Peripamo Technologies Sdn Bhd",
    title: "Platform / DevSecOps Engineer",
    location: "Kuala Lumpur",
    type: "Contract",
    salary: "RM39,000 – RM45,000",
    posted: "about 1 month ago",
  },
  {
    id: 3,
    company: "Courtsite",
    title: "Full Stack Product Engineer",
    location: "KL Eco City",
    type: "Full-time",
    salary: "RM5,000 – RM15,000",
    posted: "2 months ago",
  },
];

export const STATES = [
  { code: "JOHOR", name: "Johor", landmark: "Abu Bakar Mosque", devs: 0 },
  { code: "KEDAH", name: "Kedah", landmark: "Langkawi Sky Bridge", devs: 0 },
  { code: "KELANTAN", name: "Kelantan", landmark: "Siti Khadijah Market", devs: 0 },
  { code: "MELAKA", name: "Melaka", landmark: "A Famosa", devs: 0 },
  { code: "NEGERI SEMBILAN", name: "Negeri Sembilan", landmark: "Seri Menanti Palace", devs: 0 },
  { code: "PAHANG", name: "Pahang", landmark: "Cameron Highlands", devs: 0 },
  { code: "PULAU PINANG", name: "Pulau Pinang", landmark: "Kek Lok Si Temple", devs: 0 },
  { code: "PERAK", name: "Perak", landmark: "Teluk Intan Tower", devs: 0 },
  { code: "PERLIS", name: "Perlis", landmark: "Alwi Mosque", devs: 0 },
  { code: "SELANGOR", name: "Selangor", landmark: "Batu Caves", devs: 0 },
  { code: "TERENGGANU", name: "Terengganu", landmark: "Crystal Mosque", devs: 0 },
  { code: "SABAH", name: "Sabah", landmark: "Mount Kinabalu", devs: 0 },
  { code: "SARAWAK", name: "Sarawak", landmark: "Kuching Waterfront", devs: 0 },
  { code: "KUALA LUMPUR", name: "Kuala Lumpur", landmark: "Petronas Twin Towers", devs: 0 },
  { code: "PUTRAJAYA", name: "Putrajaya", landmark: "Putra Mosque", devs: 0 },
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
