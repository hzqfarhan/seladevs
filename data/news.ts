export type NewsTag = "release" | "partnership" | "milestone" | "op-ed" | "press";

export type NewsItem = {
  id: number;
  slug: string;
  date: string;
  tag: NewsTag;
  title: string;
  dek: string;
  author: { handle: string; name: string };
  body: string;
};

export const NEWS: NewsItem[] = [
  {
    id: 1,
    slug: "seladevs-reaches-1751-builders",
    date: "2025-09-04",
    tag: "milestone",
    title: "SelaDevs reaches 1,751 builders",
    dek: "we set the line a year ago at 500. we just crossed four times that, and we are not slowing down.",
    author: { handle: "kagerou1107", name: "Aiman R." },
    body: `1,751 builders across 13 states. that is the number on the counter as of this morning, and it is one we are quietly proud of.

when we kicked off SelaDevs in 2024, we picked 500 as a stretch goal for year one. we hit it in nine months. then we set a stretchier goal: 1,500 by month 18. we hit that in 16.

the secret is boring: we paid people to ship, and we shipped a thing that made the people who shipped want to stick around.

## what changed this quarter

- the **bounty board** crossed RM 12,500 paid out, with a median time-to-PR-merge of 4 days.
- the **guilds** directory went from 12 to 24 active groups. Edge Runners alone shipped 14 PRs to public OSS repos.
- the **Selat** uptime monitor (built by \`@tsara.id\`) crossed 200M probe requests without a false negative.

## what is next

we are holding the bar at "ship something every sprint" for the next 12 months. if you have not joined a guild yet, do. it is the single best way to keep momentum.`,
  },
  {
    id: 2,
    slug: "selat-v10-ships",
    date: "2025-09-22",
    tag: "release",
    title: "Selat v1.0 ships with SG/MY/ID/TH probes",
    dek: "open-source uptime monitoring built for the latency realities of Southeast Asia. MIT, clickhouse-backed, htmx UI.",
    author: { handle: "tsara.id", name: "Tsara I." },
    body: `Selat v1.0 is out. it is an open-source uptime monitor with probe nodes in Singapore, Malaysia, Indonesia, and Thailand — the regions our SMEs actually serve.

most monitors in this space run probes from AWS us-east-1, which is fine until your users are in Jakarta and your monitor says "all green" because it never bothered to ask them.

## what is in v1

- **Probes every 30s** from 4 SEA regions, expandable to 16.
- **ClickHouse** for time-series storage, 90-day retention by default.
- **htmx + Go** for the dashboard. no JS framework, no build step.
- **Status pages** per service, embeddable as iframes.
- **Telegram and email alerts** with regional routing (you can route KL alerts to one channel, SG to another).

## what is next

we want a probe node in the Philippines next quarter. if you can host a small VPS in Manila or Cebu for us, ping \`tsara@seladevs.com\`.`,
  },
  {
    id: 3,
    slug: "partnership-runcloud-joins-bounty-board",
    date: "2025-10-11",
    tag: "partnership",
    title: "Partnership: RunCloud joins the bounty board",
    dek: "the first managed-hosting company in SEA to commit a recurring bounty slot. RM 600 / month, open ended.",
    author: { handle: "ameera.dev", name: "Ameera H." },
    body: `RunCloud is now an official partner of the SelaDevs bounty board. starting this month, they are committing RM 600 a month as an open bounty for tools, integrations, or docs that improve the RunCloud ecosystem.

this is a big deal for two reasons. first, it is a real, recurring commitment — not a one-off hackathon prize. second, it is the first time a managed-hosting company in SEA has treated a community bounty board as a permanent part of their devrel budget.

## what this means in practice

- **For builders**: every month, there is a guaranteed RM 600 bounty on the board, posted by RunCloud, with a public rubric and a 14-day claim window.
- **For RunCloud**: they get OSS contributions to their stack, made by builders who actually use the platform.
- **For SelaDevs**: it proves the model works for recurring corporate sponsorship, not just one-off sponsorships.

## other partners in the pipeline

we are in active conversations with two more companies about recurring bounties. more on that next month.`,
  },
  {
    id: 4,
    slug: "op-ed-why-we-pay-ringgit-for-oss",
    date: "2025-10-29",
    tag: "op-ed",
    title: "Op-ed: why we still pay Ringgit for OSS",
    dek: "a friend asked me last week if paying maintainers in MYR was 'performative' given how low the conversion goes. here is why we still do it.",
    author: { handle: "kagerou1107", name: "Aiman R." },
    body: `a friend in the SEA dev community pinged me last week and asked, point blank: "is paying OSS maintainers in Ringgit performative? you know USD goes further."

the question is fair. RM 1,200 a month is roughly USD 270. by global OSS rates, that is on the low end. the friend is right.

## here is why we still do it anyway

**because the alternative is not "pay more in USD". the alternative is "do not pay at all."**

most OSS maintainers in this region have day jobs, or freelance contracts, or are still in school. asking them to invoice a US sponsor, navigate Wise, and report the income to LHDN is a 6-hour onboarding per maintainer. we tried it. we got 3 maintainers through the funnel in 6 months.

with RM-denominated bounties, we got 24 maintainers through in 4 weeks. the friction difference is not 10x. it is 100x.

## the math, honestly

- USD bounty pool: USD 12k/year. minus 8% Wise fees. minus 6 hours of maintainer time per onboarding. minus tax. effective rate: 0.6 maintainers.
- RM bounty pool: RM 50k/year (~USD 11k). zero fees. zero onboarding time. zero tax for most maintainers (under the RM 34k annual threshold for hobby income). effective rate: 4.8 maintainers.

we pay the same amount. we reach 8x the maintainers. that is not performative. that is the math.

## what we are not doing

we are not pretending RM 1,200 a month is "a fair wage for OSS." it is not. it is a token. the goal is to keep the door open and the maintainers shipping, not to replace their day job.

if you are a corporate sponsor who wants to put USD 10k/year into this pool, email \`partnerships@seladevs.com\`. we will convert it and report exactly where it went.`,
  },
  {
    id: 5,
    slug: "prompt-pilots-1k-agent-calls",
    date: "2025-11-15",
    tag: "milestone",
    title: "Prompt Pilots hits 1k agent calls/week in prod",
    dek: "the voice-agent stack that \`@hafiz.py\` and the guild have been iterating on for 4 months is now in production for a real SEA SME.",
    author: { handle: "hafiz.py", name: "Hafiz Y." },
    body: `the Prompt Pilots guild has been quietly iterating on a voice-agent stack for a customer-support use case. this week, the stack crossed 1,000 real customer calls in a single week, with a 92% first-call-resolution rate.

the customer is a regional insurance company with 60k policyholders. before the agent, their support queue had a 14-hour average wait time. after: 47 seconds.

## what the stack looks like

- **whisper.cpp** for STT, running on a 3090 in their own VPC.
- **custom Bahasa Melayu + Manglish** phoneme dictionary (the off-the-shelf Whisper gets Bahasa 78% right; ours gets 94%).
- **agent loop** in Python with a strict tool-use schema. no free-form function calling, no MCP.
- **escalation** to a human agent on a 4-of-5 confidence threshold.

## what is next

we are publishing the Bahasa Melayu phoneme dictionary as a separate OSS project next month. it is the most-requested piece of the stack. if you are working on Bahasa STT and want to compare notes, hit us up.`,
  },
  {
    id: 6,
    slug: "edge-runners-1k-star-oss",
    date: "2025-12-02",
    tag: "milestone",
    title: "Edge Runners guild ships 1k-star OSS in 90 days",
    dek: "the 90-day mission that the guild set for itself in Q3 2025 is done. the result: NullHold, a no-bullshit personal kanban, is at 1,200 stars on GitHub.",
    author: { handle: "kagerou1107", name: "Aiman R." },
    body: `in September, the Edge Runners guild set itself a public 90-day mission: ship a 1k-star OSS tool. no marketing, no growth hacking, no paid promotion. just a tool that we wanted to use ourselves, shipped well, and let the work speak.

the tool is **NullHold** — a personal kanban for one. three columns, keyboard-first, no projects, no sub-tasks, no tags, no "productivity frameworks". just a board and a state. open source, no telemetry, single binary Go server + Svelte client.

today it crossed 1,200 stars on GitHub. the issue tracker is sane. the contributors list is 14 people. the README is 200 lines.

## what we learned

- **"for one" is a feature, not a limit.** the audience for single-user, no-account-required tools is larger than we thought.
- **a small, opinionated stack is a recruiting tool.** six of our 14 contributors are new guild members who joined specifically because of this project.
- **a public mission with a deadline is more powerful than a roadmap.** the 90-day commitment forced us to cut, not add.

we are doing it again next quarter. the new mission will be announced on \`/changelog\` when the guild votes it in.`,
  },
  {
    id: 7,
    slug: "year-in-review-2025",
    date: "2025-12-28",
    tag: "milestone",
    title: "Year in review: 12,500 RM paid, 64 bounties, zero ghost jobs",
    dek: "our 2025 numbers, in full. what worked, what didn't, and what we are changing in 2026.",
    author: { handle: "kagerou1107", name: "Aiman R." },
    body: `2025 is done. here are the numbers, in full.

## what worked

- **1,751 active builders** (up from 412 in Jan).
- **RM 12,500 paid** in bounties (up from RM 1,800).
- **64 bounties closed** with a public PR, mean time-to-merge 4 days.
- **24 active guilds** (up from 7 in Jan).
- **9 townhalls**, average 62 attendees.
- **0 ghost jobs** in the job board. every closed role was closed within 24h of being filled.

## what did not work

- the **newsletter**. we sent 6 issues. open rate is 18%, which is fine, but click rate is 1.2%, which is not. we are killing the newsletter in 2026 and replacing it with a single weekly changelog email.
- the **/about page**. it was 400 words of marketing speak that did not say what we actually do. we rewrote it (see the current version) and got 3x more signups.
- the **discord moderation**. we let it drift for 3 months and ended up with a #general channel that was 40% off-topic. the new mod squad is in.

## what we are changing in 2026

- **Quarterly seasons** for the leaderboard, with prizes.
- **Public roadmap** on the changelog page, voted on by guild leads.
- **State chapters**: physical monthly meetups in KL, Penang, JB, KK. the first one is in February.
- **Bounty bank**: a way for companies to commit RM 10k+ upfront as a pre-funded bounty pool, distributed across the year.

## thank you

to the 1,751 builders who shipped, reviewed, posted, and turned up. the 64 bounties were not a marketing campaign. they were 64 real things that you made and other people use. that is the only metric that matters.

see you in 2026.`,
  },
  {
    id: 8,
    slug: "press-the-edge-malaysia",
    date: "2026-01-12",
    tag: "press",
    title: "Press: SelaDevs in The Edge Malaysia",
    dek: "The Edge ran a half-page feature on the community. here is the link, the pull quotes, and what we got wrong in the original pitch.",
    author: { handle: "ameera.dev", name: "Ameera H." },
    body: `The Edge Malaysia ran a half-page feature on SelaDevs in their January 12 print edition. it is online now at [theedgemarkets.com](https://theedgemarkets.com).

## pull quotes

> "SelaDevs is what happens when you stop waiting for Silicon Valley to notice you and just start shipping." — the writer's framing, which is generous.

> "the bounty model is interesting. they pay real money for real PRs, and the average claim-to-merge is four days. that is shorter than most internal corporate cycles." — the analyst sidebar, which is the part that will get us more corporate sponsors than anything else in the piece.

## what we got wrong in the original pitch

we sent the writer a draft that said "1,751 builders across Malaysia" which is true, but implied they were all in the Klang Valley. the article correctly notes that 36% are in Sabah, Sarawak, and the east coast. we should have led with that.

## what this means for you

if you are a builder who has been waiting for a "legit" community to be associated with: there is now a print magazine article you can show your parents. that is a real, practical win.

if you are a corporate sponsor reading this: yes, we are the people in the article. the RM 50k+ partnership tier is real. \`partnerships@seladevs.com\`.`,
  },
  {
    id: 9,
    slug: "splithold-v2-ringgit-settlement",
    date: "2026-02-04",
    tag: "release",
    title: "SplitHold v2 ships with ringgit-first settlement",
    dek: "the roommate-expense splitter now settles in MYR by default, with optional USD/SGD side-currency tracking for expat groups.",
    author: { handle: "kagerou1107", name: "Aiman R." },
    body: `SplitHold v2 is out. the headline change: the app now treats Ringgit as the primary currency, not a secondary one that gets converted to USD at the end of the month.

this sounds small. it is not.

## why this matters

the previous version tracked everything in USD internally and converted to MYR on the dashboard. this meant:

- if your roommate paid RM 47 for the electricity, SplitHold stored that as USD 10.45 (rounding errors compounded).
- if the exchange rate moved between when you logged the bill and when you settled it, the totals drifted.
- you could not see "how much do i owe in ringgit" without a toggle.

v2 stores the original currency, the amount, the FX rate at log time, and the settlement currency, on every line item. if you log RM 47, it stays RM 47. if your group uses USD, you can flip the display. if half the group is in SGD, side-currency tracking handles that too.

## other changes

- **faster sync**: realtime across devices instead of 30s poll.
- **better splits**: by-item percentage, by-item weight, even-split with rounding to the cent.
- **export**: CSV and PDF for tax season.
- **no ads, no upsell**: same as v1. always.

available on iOS, Android, and the web at [splithold.app](https://splithold.app).`,
  },
  {
    id: 10,
    slug: "op-ed-vibe-coding-is-fine",
    date: "2026-02-25",
    tag: "op-ed",
    title: "Op-ed: vibe coding is fine, actually",
    dek: "the panic about AI-generated code is the panic about every new tool. we have been here before. here is what i think actually changes.",
    author: { handle: "strdst7", name: "Saifuddin R." },
    body: `every few years, the dev community decides that a new tool is going to destroy software engineering. the panic is always the same: "we will not need engineers anymore."

i have been through this. i was a junior when people said Ruby on Rails would end CS degrees. i was mid-career when people said jQuery would end frontend engineering. i was senior when people said Kubernetes would end sysadmin. none of those things happened, and none of the engineers who actually knew how to use the tools lost their jobs.

## what is actually different about LLMs

the new thing is not "AI can write code." we have had code-generation tools for decades. the new thing is that LLMs can write code **in your codebase, with your conventions, at the speed of conversation**.

this is a real capability change. it is not a category change. engineers will still be needed; we will just be doing more of the "what should this code do" work and less of the "type the code" work. that is a better job.

## what i think actually breaks

- **the bottom of the market**: interns and bootcamp grads doing CRUD work. if you are paid to write 200 lines of JavaScript a day, an LLM will do that. the answer is to learn the parts the LLM cannot do (architecture, design judgment, asking the right question), not to "code harder."
- **the "interview is a leetcode" model**: if your hiring process is "can you recite the answer to FizzBuzz," it is now obsolete. good. switch to project-based hiring.
- **the "i will just write it myself" ego**: the engineers who refuse to use LLMs will be the ones who ship less, not the ones with purer souls. use the tools.

## what does not break

- the need for **someone who understands the domain**.
- the need for **someone who can debug a system that is on fire**.
- the need for **someone who can hold a 6-month roadmap in their head**.

if you are an engineer reading this and you are worried about your job: stop writing code, start writing intent. the LLM can turn intent into code. it cannot yet come up with the right intent.`,
  },
  {
    id: 11,
    slug: "partnership-bungkus-selat-integration",
    date: "2026-03-18",
    tag: "partnership",
    title: "Partnership: Bungkus + Selat uptime integration",
    dek: "the receipt-splitting app now embeds Selat status badges. transparent uptime for the SMEs that depend on Bungkus for accounting.",
    author: { handle: "tsara.id", name: "Tsara I." },
    body: `Bungkus — the receipt-splitting app by \`@rendra.my\` — now embeds Selat status badges on its public status page. if you are a Bungkus user and the OCR pipeline is degraded, you will see it on the dashboard, not in a tweet.

## why this matters

most SEA SMEs do not have a "DevOps team" that watches a status page. they have an accountant who uses Bungkus to settle receipts, and a driver who uses Waze, and a marketing person who uses Canva. if any of those tools goes down, the business loses money and no one knows why.

by making Bungkus's status transparent via Selat, the SMEs depending on it can:

- **plan around** known maintenance windows.
- **escalate** when something is broken, with a public record.
- **trust** the platform more, because the platform is honest about its health.

## what is next

we are talking to three more consumer apps about embedding Selat status badges. if you maintain a SEA-facing app and want to plug into this, the docs are at [selat.dev/embed](https://selat.dev/embed).`,
  },
  {
    id: 12,
    slug: "showcase-v2-launches",
    date: "2026-05-30",
    tag: "release",
    title: "SelaDevs Showcase v2.0 launches with offline PWA",
    dek: "the public gallery of what the community ships is now installable, offline-capable, and ships with 12 new project entries.",
    author: { handle: "kagerou1107", name: "Aiman R." },
    body: `the SelaDevs Showcase v2.0 is out. it is the public gallery of what the community ships, and v2 is a real rework.

## what is new

- **installable PWA**: pin it to your home screen on iOS or Android. launches full-screen, no browser chrome.
- **offline mode**: every project cover and metadata is cached after the first visit. browse the showcase on the LRT with no signal.
- **12 new project entries**: SplitHold, Jarak Tracker, Eternal Frame Fate V2, AI-OS, NullHold, JomEnvois, Bungkus, Selat, KopiPawang, NasiNet, RokokRegex, Tukar. 8 of them went from "shipping the MVP" to "shipping to 1k+ users" because of the showcase.
- **detail modal**: click any card for the full writeup, tech stack, and links. no page navigation needed.
- **bounty-poll integration**: the next bounty to ship is voted on by showcase visitors. democracy, but for code.

## what this is, in plain terms

v1 of the showcase was a link wall. v2 is a curated gallery that you can browse, install, and use to find your next project to clone, fork, or join.

## thanks

to the 12 builders who shipped these projects, to the 7 bounty claimants who built the showcase itself, and to the 1,247 people who installed the v2 PWA in the first 72 hours. you make this work.

the next milestone: 1,000,000 monthly visitors to the showcase. we are at 18k. we will get there.`,
  },
];

export const NEWS_TAGS: NewsTag[] = ["release", "partnership", "milestone", "op-ed", "press"];

export const TAG_COLOR: Record<NewsTag, string> = {
  release: "border-sd-neon text-sd-neon",
  partnership: "border-sd-money text-sd-money",
  milestone: "border-sd-amber text-sd-amber",
  "op-ed": "border-sd-purple text-sd-purple",
  press: "border-sd-neon-soft text-sd-neon-soft",
};
