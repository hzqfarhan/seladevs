export type CaseStudy = {
  id: number;
  slug: string;
  client: string;
  title: string;
  timeline: string;
  outcome: string;
  body: string;
};

export const GOV_CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    slug: "selangor-digital-licensing-mvp",
    client: "Selangor State Government",
    title: "digital licensing MVP",
    timeline: "8 weeks",
    outcome: "RM 0 to state · live in staging",
    body: `brief: design a 1-page application form for small business licenses, with status tracking.

delivered: a working web app (Next.js + Postgres) with a single-form UX, an admin review queue, and a public status page. 8 weeks from kickoff to staging, including 2 weeks of design review with the state team.

the state paid RM 0. SelaDevs paid the 3 builders (RM 4,200 each) out of the community bounty bank. the code is MIT-licensed and live on github.`,
  },
  {
    id: 2,
    slug: "penang-open-data-audit",
    client: "Penang State Government",
    title: "open data portal security audit",
    timeline: "2 weeks",
    outcome: "12 issues filed · 8 fixed in 30 days",
    body: `brief: audit the public open-data portal for security and accessibility issues.

delivered: a 47-page report covering auth, rate-limiting, OWASP top 10, and 12 specific vulnerabilities ranked by severity. the Penang team fixed 8 of the 12 within 30 days; the remaining 4 were re-classified as accepted-risk.

the security sentinels guild ran the audit. RM 0 to the state, RM 8,400 to the audit team.`,
  },
  {
    id: 3,
    slug: "federal-bahasa-llm-eval",
    client: "Federal Ministry (Digital)",
    title: "Bahasa Melayu LLM evaluation harness",
    timeline: "in flight",
    outcome: "RM 50k grant · shipping Q3 2026",
    body: `brief: build a public, reproducible evaluation harness for Bahasa-Melayu-capable LLMs.

in flight: a collaboration between the prompt pilots guild and 3 universities. the harness will be open-source, MIT-licensed, and benchmarked against a held-out test set contributed by the ministry.

funded by a RM 50k grant from the ministry. SelaDevs contributes the orchestration; the universities contribute the linguistic test set; the ministry contributes the held-out evaluation set.`,
  },
];
