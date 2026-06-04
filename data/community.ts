export type ThreadTag = "townhall" | "hot-take" | "question" | "show-and-tell";

export type Reply = {
  id: number;
  at: string;
  handle: string;
  name: string;
  body: string;
};

export type Thread = {
  id: number;
  slug: string;
  title: string;
  tag: ThreadTag;
  opened: string;
  openedBy: { handle: string; name: string };
  body: string;
  replies: Reply[];
};

// TODO: confirm with UTHM data team
// 6 townhall thread seeds below. The seed set is chosen to land in mid-2026
// for the UTHM Forge migration. The opening dates are placeholder; the real
// UTHM data team will align them with the academic calendar.

export const THREADS: Thread[] = [
  {
    id: 1,
    slug: "fyp-oss-license-uthm",
    title: "what license should FYP-Forge pick for UTHM FYPs?",
    tag: "townhall",
    opened: "2026-05-20",
    openedBy: { handle: "haikal.fskm", name: "Haikal R." },
    body: `opening for the June townhall. FYP-Forge is shaping up to be the canonical pipeline that turns a FSKTM FYP into a public OSS project. the question on the table: which OSS license should be the default for projects that go through the pipeline?

i think the answer is MIT for code and CC-BY-4.0 for thesis-adjacent writing. what do you think?`,
    replies: [
      {
        id: 1,
        at: "2026-05-20T21:14+08:00",
        handle: "saifuddin.fke",
        name: "Saifuddin R.",
        body: `counter-take: "default MIT" is the same as every other pipeline. if FYP-Forge is a UTHM flagship, we should default to Apache-2.0 for the patent grant — that gives industrial partners a clearer path to fork without legal review.`,
      },
      {
        id: 2,
        at: "2026-05-21T09:02+08:00",
        handle: "ameera.fstmi",
        name: "Ameera H.",
        body: `from a hiring angle: i have interviewed 14 candidates in the last 3 months. 9 of them proudly had an OSS FYP on their CV. 3 of those 9 could actually explain what the license let a downstream user do. 6 of them could not. we should make license choice a part of the FYP-Forge template, not a thing each student figures out at the end.`,
      },
      {
        id: 3,
        at: "2026-05-21T14:48+08:00",
        handle: "tsara.fpm",
        name: "Tsara I.",
        body: `i think the framing is wrong. the question is not "MIT vs Apache" — it is "how do we teach the next generation of FSKTM engineers, and does that match the world they will work in?" the answer to the second question is: we should make license-choice a taught module, not a config flag. that is the actual job now.`,
      },
      {
        id: 4,
        at: "2026-05-22T11:30+08:00",
        handle: "hafiz.fskm",
        name: "Hafiz Y.",
        body: `one thing i have seen: junior RAs who lean on OSS without a strong mental model ship code that "works" but is one license-clause away from a takedown notice. that is a real cost. the postgrads i work with treat license review as a checkpoint, not paperwork.`,
      },
      {
        id: 5,
        at: "2026-05-23T08:12+08:00",
        handle: "haikal.fskm",
        name: "Haikal R.",
        body: `summary for the townhall agenda: 3 takes on "Apache-2.0 for the patent grant", 1 take on "license as taught module", 1 take on "license review as RA checkpoint". we are not anti-MIT. we are pro-decision. closing summary at the townhall.`,
      },
    ],
  },
  {
    id: 2,
    slug: "uthm-wifi-at-fkmp",
    title: "why is UTHM Wi-Fi at FKMP still a productivity tax?",
    tag: "hot-take",
    opened: "2026-05-12",
    openedBy: { handle: "ameera.fstmi", name: "Ameera H." },
    body: `hot take: UTHM Wi-Fi at FKMP is not a connectivity problem. it is a capacity-planning problem. it is a deliberate choice that UTHM IT Centre makes because the cost of upgrading the AP density in the engineering blocks is "not in this year's budget."

it does not have to be this way. the data is in. FSKTM is fully upgraded (Eduroam + UTHM-Secure). FKMP is not. the gap is real, measurable, and avoidable.`,
    replies: [
      {
        id: 1,
        at: "2026-05-12T22:40+08:00",
        handle: "syamir.fskm",
        name: "Syamir T.",
        body: `i have run traceroutes from FKMP during class hours. half the time, my packet lands in the BNM-equivalent of a captive portal hell. it is not Eduroam's fault. it is UTHM IT's auth flow. fix the auth, the Wi-Fi feels 3x faster.`,
      },
      {
        id: 2,
        at: "2026-05-13T10:05+08:00",
        handle: "haikal.fskm",
        name: "Haikal R.",
        body: `counter-data point: FSKTM got upgraded because FSKTM lecturers filed a joint letter to UTHM IT citing the FYP-equivalent of a network audit. FKMP has not filed that letter yet. this is not a technical problem. it is a political problem.`,
      },
      {
        id: 3,
        at: "2026-05-14T08:22+08:00",
        handle: "daniyal.fke",
        name: "Daniyal K.",
        body: `i think the answer is: give students a 1-click "report this AP" button in the UTHM Sandbox app, and have the UTHM IT Centre commit to a public uptime number per AP. that is the only way this gets fixed sustainably.`,
      },
    ],
  },
  {
    id: 3,
    slug: "how-do-you-price-bounties-fairly",
    title: "how do you price UTHM Forge bounties fairly?",
    tag: "question",
    opened: "2026-05-05",
    openedBy: { handle: "haikal.fskm", name: "Haikal R." },
    body: `we have been running the UTHM Forge bounty board for 9 months now and we still do not have a great answer for "how much should this bounty be."

the heuristic we use today: "what would a senior engineer in this stack charge for 8 hours of focused work?" which gives a range of RM 350 to RM 1,200 for most bounties, with a FYP-grant ceiling of RM 1,500 for capstone-aligned work.

is that right? are we under-paying? over-paying? let me know what you think.`,
    replies: [
      {
        id: 1,
        at: "2026-05-05T14:30+08:00",
        handle: "rendra.fkaas",
        name: "Rendra K.",
        body: `i think the 8-hour heuristic is wrong. most bounties take me 2 to 4 hours. you are paying me 8 hours of senior rate for half a day of actual work. either:
1. lower the bounties (and accept more claimants per bounty)
2. bundle bounties into larger 1-week engagements (and pay more)`,
      },
      {
        id: 2,
        at: "2026-05-06T09:15+08:00",
        handle: "tsara.fpm",
        name: "Tsara I.",
        body: `the 8-hour heuristic is correct for "fair pay" but you should not price bounties on "fair pay" alone. price them on the value to UTHM Forge. an OCR pipeline that unblocks 10k scanned theses is worth more than 8 hours of senior rate.`,
      },
      {
        id: 3,
        at: "2026-05-06T20:01+08:00",
        handle: "haikal.fskm",
        name: "Haikal R.",
        body: `both takes land. we are going to split bounties into two tiers: "standard" (8h rate) and "high-impact" (priced on risk + value). more on this in the next bounty board update.`,
      },
    ],
  },
  {
    id: 4,
    slug: "show-and-tell-bhashaocr",
    title: "show and tell: i shipped BhashaOCR in 6 days",
    tag: "show-and-tell",
    opened: "2026-04-28",
    openedBy: { handle: "rendra.fkaas", name: "Rendra K." },
    body: `show and tell: i shipped BhashaOCR, a Bahasa Melayu + Jawi OCR pipeline, in 6 days, end to end. 1.2k receipts/day on the Bungkus test rig, 91% accuracy on Bahasa item names, MIT licensed.

the stack: Tesseract for line detection, a fine-tuned BERT-Mini for Bahasa item-name post-processing, and a custom CORS proxy because the public OCR APIs all wanted RM 1,200/month for a "starter" tier.

the bungkus circle reviewed the PR. if you want to see the code, the repo is on github.`,
    replies: [
      {
        id: 1,
        at: "2026-04-28T20:12+08:00",
        handle: "hafiz.fskm",
        name: "Hafiz Y.",
        body: `this is exactly the kind of work that should be in the UTHM Forge showcase. 6 days from "i have an idea" to "1.2k receipts/day on the test rig" is a real shipping velocity. +1.`,
      },
      {
        id: 2,
        at: "2026-04-29T08:00+08:00",
        handle: "saifuddin.fke",
        name: "Saifuddin R.",
        body: `the CORS-proxy trick is the right move. the public APIs price themselves out of the indie / FYP-grant market on purpose. building the proxy + the BERT post-processor in 6 days is the kind of leverage a small community has over a large company.`,
      },
      {
        id: 3,
        at: "2026-04-29T15:45+08:00",
        handle: "ameera.fstmi",
        name: "Ameera H.",
        body: `linking this from the showcase. deserved.`,
      },
    ],
  },
  {
    id: 5,
    slug: "uthm-monthly-hackathon",
    title: "should UTHM host a hackathon monthly?",
    tag: "hot-take",
    opened: "2026-04-15",
    openedBy: { handle: "ameera.fstmi", name: "Ameera H." },
    body: `hot take: UTHM Forge should host a hackathon every month, not just twice a year. not a 36-hour buildathon. a 12-hour, single-Saturday, single-bounty sprint. run from PTTA Workshop.

the reason: hackathons are recruiting, hackathons are onboarding, hackathons are the only place where a FSKTM Y1 meets a FKMP Y4. one big hackathon a year is a missed opportunity.`,
    replies: [
      {
        id: 1,
        at: "2026-04-15T21:30+08:00",
        handle: "haikal.fskm",
        name: "Haikal R.",
        body: `agree. this is why the UTHM Forge events page already has a 12h bounty sprint template — see the Hacknight: 12-hour Bounty Sprint event for the format. we should probably enforce a "next sprint is in 30 days" cadence so it actually ships monthly.`,
      },
      {
        id: 2,
        at: "2026-04-16T07:00+08:00",
        handle: "najwa.fskm",
        name: "Najwa A.",
        body: `monthly is too often. 6 weeks is the right cadence — it forces a real rest between sprints and lets the postmortem from one event inform the next.`,
      },
      {
        id: 3,
        at: "2026-04-16T14:18+08:00",
        handle: "ameera.fstmi",
        name: "Ameera H.",
        body: `agreed on 6 weeks. and add a "first-time UTHM builder" track so the sprints double as recruiting. stale sprints = stale community.`,
      },
    ],
  },
  {
    id: 6,
    slug: "ptptn-funded-side-projects",
    title: "PTPTN-funded side projects — yay or nay?",
    tag: "question",
    opened: "2026-04-02",
    openedBy: { handle: "haikal.fskm", name: "Haikal R." },
    body: `open question for the UTHM Forge community: is it OK for a UTHM student on a PTPTN loan to ship paid side-projects through UTHM Forge? the current rules of PTPTN say "no additional income from non-UTHM sources" — but a RM 600 UTHM Forge bounty is, in spirit, a UTHM-source payment.

is that the right read? is it different if the bounty issuer is UTHM Innovation & Commercialisation vs an external partner? let me know what you think.`,
    replies: [
      {
        id: 1,
        at: "2026-04-02T19:45+08:00",
        handle: "aishah.fskm",
        name: "Aishah S.",
        body: `add: "UTHM Forge bounty = UTHM-source" as an explicit reading guide, published on the bounty board. low-friction, high-clarity, and it makes the PTPTN conversation with parents much easier.`,
      },
      {
        id: 2,
        at: "2026-04-03T11:20+08:00",
        handle: "farouq.ptta",
        name: "Farouq S.",
        body: `i would trust this more if there were also a "PTPTN-flag" toggle on each bounty, set by the issuer at creation. "internal UTHM" bounties are PTPTN-safe; "external partner" bounties are flagged so the student can make an informed call.`,
      },
      {
        id: 3,
        at: "2026-04-03T18:08+08:00",
        handle: "haikal.fskm",
        name: "Haikal R.",
        body: `both good. we will add the "UTHM-source" reading guide as a footer on the bounty board, and the issuer-set PTPTN-flag as a public badge on each listing. shipping next sprint.`,
      },
    ],
  },
];

export const THREAD_TAGS: ThreadTag[] = ["townhall", "hot-take", "question", "show-and-tell"];

export const TAG_COLOR: Record<ThreadTag, string> = {
  townhall: "border-sd-amber text-sd-amber",
  "hot-take": "border-sd-purple text-sd-purple",
  question: "border-sd-neon-soft text-sd-neon-soft",
  "show-and-tell": "border-sd-money text-sd-money",
};
