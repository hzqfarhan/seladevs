export type JobType = "full-time" | "contract" | "internship" | "part-time";

export type Job = {
  id: number;
  slug: string;
  company: string;
  title: string;
  location: string;
  type: JobType;
  salary: string;
  posted: string;
  postedDays: number;
  tags: string[];
  urgent: boolean;
  verified: boolean;
  description: string;
  requirements: string[];
  nice: string[];
  perks: string[];
  applyEmail: string;
};

// TODO: confirm with UTHM data team
// The `type` union above is preserved as-is. The placement framing (internship,
// part-time, RA, FYP-grant, full-time) is expressed through the `tags` array on
// each job to keep the JobType shape stable for existing consumers. If a new
// "ra" / "fyp-grant" JobType variant is approved we'll extend the union in a
// follow-up.

export const JOBS: Job[] = [
  {
    id: 1,
    slug: "uthm-itc-web-intern",
    company: "UTHM IT Centre",
    title: "Software Engineer Intern",
    location: "Batu Pahat",
    type: "internship",
    salary: "RM700/mo",
    posted: "25 days ago",
    postedDays: 25,
    tags: ["php", "laravel", "linux", "internship"],
    urgent: false,
    verified: true,
    description:
      "Work alongside the UTHM IT Centre team on the campus web dashboard. You'll ship features that touch real UTHM services (Student Portal, CoursReg, e-Complaint), write integration tests, and learn production-grade PHP/Laravel from senior engineers who actually review your PRs.",
    requirements: [
      "Currently pursuing a CS / SE degree at UTHM",
      "Comfortable reading PHP and writing basic SQL",
      "Comfortable in a Linux terminal",
      "Available 3+ months full-time in Parit Raja",
    ],
    nice: ["Have shipped a personal project end-to-end", "Familiar with Laravel or Symfony"],
    perks: ["RM700 monthly stipend", "Free lunch at PTTA", "Mentorship from UTHM IT seniors", "Letter of recommendation on completion"],
    applyEmail: "interns@itc.uthm.edu.my",
  },
  {
    id: 2,
    slug: "uthm-library-research-engineer",
    company: "UTHM Library Digital",
    title: "Platform / DevSecOps Engineer",
    location: "Batu Pahat",
    type: "contract",
    salary: "RM39,000 – RM45,000",
    posted: "about 1 month ago",
    postedDays: 30,
    tags: ["kubernetes", "aws", "terraform", "research"],
    urgent: false,
    verified: true,
    description:
      "6-month contract with strong intent to convert. Own the platform layer for UTHM Library's digital services (thesis OCR, e-resources, OPAC) — k8s on EKS, Terraform-managed infra, security scanning in CI, on-call rotation. We're looking for a senior who can ship, not just configure.",
    requirements: [
      "5+ years platform/devops experience",
      "Production k8s (EKS, GKE, or AKS) — at least 1 year",
      "Terraform or Pulumi — at least 2 years",
      "Strong AWS networking and IAM knowledge",
    ],
    nice: ["Academic / library-systems background", "ISO27001 implementation experience"],
    perks: ["RM39–45k base", "WFH 3 days/week", "Conference budget", "Potential conversion to permanent"],
    applyEmail: "careers@library.uthm.edu.my",
  },
  {
    id: 3,
    slug: "fskm-oss-fullstack",
    company: "UTHM FSKTM Research Grant",
    title: "Full Stack Product Engineer (FYP-Forge)",
    location: "Batu Pahat",
    type: "full-time",
    salary: "RM5,000 – RM15,000",
    posted: "2 months ago",
    postedDays: 60,
    tags: ["next.js", "typescript", "postgres", "fyp-grant"],
    urgent: false,
    verified: true,
    description:
      "UTHM FSKTM has an open research-grant slot for a full-stack engineer to own FYP-Forge end-to-end — schema, API, UI, monitoring. Mid-level welcome; we pay based on demonstrated skill, not years. The work ships as OSS and is supervised by a FSKTM academic.",
    requirements: [
      "2+ years production experience with a TS/JS full-stack stack",
      "Comfortable with Postgres and SQL",
      "Has shipped at least one user-facing product to real users",
    ],
    nice: ["Next.js + tRPC experience", "Has worked on a student-facing or campus product"],
    perks: ["RM5–15k based on level", "Co-authorship on resulting paper", "Hybrid (3 days on campus)", "Quarterly offsite"],
    applyEmail: "jobs@fsktm.uthm.edu.my",
  },
  {
    id: 4,
    slug: "bungkus-rn-engineer",
    company: "UTHM Innovation & Commercialization",
    title: "Mobile Engineer (React Native)",
    location: "Hybrid-UTHM",
    type: "full-time",
    salary: "RM8,000 – RM12,000",
    posted: "5 days ago",
    postedDays: 5,
    tags: ["react-native", "typescript", "hybrid"],
    urgent: true,
    verified: true,
    description:
      "Ship the next version of BungkusOCR — the receipt-splitting app spun out of a UTHM FYP. You'll own the mobile codebase, work with our OCR pipeline, and ship to 10k+ MAU. Hybrid: 2 days on campus, 3 remote.",
    requirements: [
      "3+ years React Native in production",
      "Strong TypeScript",
      "Has shipped to both iOS and Android stores",
    ],
    nice: ["Experience with ML Kit / on-device OCR", "Has worked on a fintech or campus-payments app"],
    perks: ["RM8–12k", "Hybrid 2+3", "Async-first", "Yearly company offsite"],
    applyEmail: "careers@uthmic.uthm.edu.my",
  },
  {
    id: 5,
    slug: "uthm-go-engineer",
    company: "UTHM Sandbox",
    title: "Backend Engineer (Go)",
    location: "Batu Pahat",
    type: "full-time",
    salary: "RM10,000 – RM18,000",
    posted: "12 days ago",
    postedDays: 12,
    tags: ["go", "clickhouse", "infra"],
    urgent: false,
    verified: true,
    description:
      "Build the data plane of UTHM Sandbox — the open-source uptime monitor for Malaysian campus services. ClickHouse for time-series, Go for everything else, htmx for the UI. Mid-to-senior, in-office in Parit Raja or remote MY.",
    requirements: [
      "3+ years Go in production",
      "Has worked with a time-series or analytics database",
      "Comfortable with low-level HTTP and networking",
    ],
    nice: ["OSS maintainer experience", "ClickHouse / Druid / Timescale background"],
    perks: ["RM10–18k", "OSS time (10%)", "Hybrid Parit Raja", "Yearly conference budget"],
    applyEmail: "jobs@sandbox.uthm.dev",
  },
  {
    id: 6,
    slug: "maju-bp-flutter-lead",
    company: "Maju Holdings Batu Pahat",
    title: "Flutter Lead",
    location: "Batu Pahat",
    type: "full-time",
    salary: "RM14,000 – RM22,000",
    posted: "18 days ago",
    postedDays: 18,
    tags: ["flutter", "firebase", "lead"],
    urgent: false,
    verified: true,
    description:
      "Lead the mobile team of 3 at Maju Holdings' Batu Pahat office. Set the architecture, drive weekly releases, and own the product direction with the founders. Series A, real users, real scale problems.",
    requirements: [
      "5+ years mobile, 3+ years Flutter",
      "Has led a team of 2+ engineers",
      "Firebase + GCP in production",
    ],
    nice: ["Logistics / e-commerce background", "Has worked at a series-A startup"],
    perks: ["RM14–22k + equity", "Hybrid BP", "Kopitiam stipend (obviously)", "Health insurance"],
    applyEmail: "join@majuholdings.my",
  },
  {
    id: 7,
    slug: "ai-os-rust-tauri",
    company: "UTHM AI-OS Lab",
    title: "Rust / Tauri Engineer",
    location: "Hybrid-UTHM",
    type: "contract",
    salary: "RM18,000 – RM28,000",
    posted: "3 days ago",
    postedDays: 3,
    tags: ["rust", "tauri", "ra"],
    urgent: true,
    verified: true,
    description:
      "Join the UTHM AI-OS Lab for a 6-month RA contract. Ship the production version of the voice-first linux desktop. You'll own the audio pipeline and the IPC between Rust and the Tauri frontend. Co-supervised by a FSKTM lecturer.",
    requirements: [
      "Strong production Rust",
      "Has shipped a Tauri or Electron app to real users",
      "Comfortable with low-latency audio (CPAL, cpal, or similar)",
    ],
    nice: ["Whisper / speech-to-text background", "Linux desktop internals knowledge"],
    perks: ["RM18–28k", "Hybrid-UTHM", "OSS-friendly", "Path to permanent"],
    applyEmail: "hiring@aios.fsktm.uthm.edu.my",
  },
  {
    id: 8,
    slug: "uthm-rokok-regex-devrel",
    company: "UTHM Forge",
    title: "Developer Relations",
    location: "Hybrid-UTHM",
    type: "part-time",
    salary: "RM3,500 – RM5,000",
    posted: "9 days ago",
    postedDays: 9,
    tags: ["devrel", "writing"],
    urgent: false,
    verified: true,
    description:
      "20 hours/week, flexible. Write technical posts, run 2 community AMAs/month, and be the public face of UTHM Forge. Perfect for a senior dev / postgrad who wants to slow down and write more.",
    requirements: [
      "5+ years dev experience",
      "Strong written English and Bahasa Melayu",
      "Has published technical writing (blog, dev.to, etc.)",
    ],
    nice: ["Active in a developer community", "Public-speaking experience"],
    perks: ["RM3.5–5k for 20h/week", "Hybrid-UTHM", "Conference budget"],
    applyEmail: "team@uthm-forge.dev",
  },
  {
    id: 9,
    slug: "uthm-tukar-python-telegram",
    company: "UTHM CAPS",
    title: "Python Backend (Telegram bots)",
    location: "Remote",
    type: "contract",
    salary: "RM6,000 – RM9,000",
    posted: "21 days ago",
    postedDays: 21,
    tags: ["python", "telegram", "fastapi"],
    urgent: false,
    verified: true,
    description:
      "Maintain and extend the CAPS-Announcer bot and related UTHM Telegram tooling. FastAPI backend, Postgres, Redis queue. 6-month contract with strong intent to convert.",
    requirements: [
      "3+ years Python",
      "Has worked with the Telegram Bot API at scale (1k+ groups)",
      "Comfortable with FastAPI + async",
    ],
    nice: ["Has shipped a bot to 10k+ users", "Campus-services / student-life background"],
    perks: ["RM6–9k", "Fully remote", "Async-first", "Potential permanent"],
    applyEmail: "jobs@caps.uthm.edu.my",
  },
  {
    id: 10,
    slug: "uthm-forge-oss-maintainer",
    company: "UTHM Forge",
    title: "Open Source Maintainer (UTHM circles)",
    location: "Remote",
    type: "part-time",
    salary: "RM2,500 stipend",
    posted: "30 days ago",
    postedDays: 30,
    tags: ["oss", "maintainer", "fyp-grant"],
    urgent: false,
    verified: true,
    description:
      "Help maintain a UTHM Forge open-source project of your choice (FYP-Forge, BhashaOCR, ParitRider, IoT-BatuPahat, etc.). 10 hours/week, RM2,500/month stipend, and the public credit of being on the maintainer list. Funded by UTHM FSKTM research grant.",
    requirements: [
      "Has shipped at least one open-source project (any size)",
      "Available 10h/week",
      "Comfortable responding to issues and PRs",
    ],
    nice: ["Has been an OSS maintainer before", "Active on GitHub"],
    perks: ["RM2,500 monthly stipend", "Public maintainer credit", "Mentorship from senior FSKTM maintainers"],
    applyEmail: "oss@uthm-forge.dev",
  },
  {
    id: 11,
    slug: "uthm-forge-community-lead",
    company: "UTHM Forge Core",
    title: "Community Lead",
    location: "Batu Pahat",
    type: "full-time",
    salary: "RM12,000 – RM16,000",
    posted: "1 day ago",
    postedDays: 1,
    tags: ["community", "ops"],
    urgent: false,
    verified: true,
    description:
      "Own community ops for UTHM Forge: run townhalls, run bounty flow, run partner outreach, and keep the discord healthy. This is a core-team role, not a community-manager-junior role. Reports to the UTHM Forge founder (FSKTM-anchored).",
    requirements: [
      "3+ years community or ops experience in tech",
      "Has run events of 100+ people",
      "Strong written English and Bahasa Melayu",
    ],
    nice: ["Active in MY / campus tech communities", "Has worked with founders directly"],
    perks: ["RM12–16k", "Hybrid BP", "Health insurance", "Conference budget"],
    applyEmail: "join@uthm-forge.dev",
  },
  {
    id: 12,
    slug: "uthm-founding-engineer",
    company: "UTHM JomEnvois Spinout",
    title: "Founding Engineer",
    location: "Hybrid-UTHM",
    type: "full-time",
    salary: "RM15,000 – RM25,000 + 0.5% equity",
    posted: "7 days ago",
    postedDays: 7,
    tags: ["next.js", "founder", "spinout"],
    urgent: true,
    verified: true,
    description:
      "Founding engineer #2 at JomEnvois-UTHM — the SMS-first group-payments spinout from a UTHM capstone. You'll own the backend, work directly with the founder on product, and ship to thousands of students. Pre-seed funded by UTHM Innovation & Commercialization, 18-month runway.",
    requirements: [
      "Has been a founding engineer or first 3 hires before",
      "Strong full-stack (Next.js + Postgres)",
      "Comfortable with SMS / telecom APIs (Twilio, MessageBird)",
    ],
    nice: ["Fintech background", "Has worked in a 2–5 person team"],
    perks: ["RM15–25k + 0.5% equity", "Co-founder-style autonomy", "Hybrid BP", "Visa support if needed"],
    applyEmail: "founder@jomenvois.uthm.dev",
  },
];

export const JOB_TYPES: JobType[] = ["full-time", "contract", "internship", "part-time"];
