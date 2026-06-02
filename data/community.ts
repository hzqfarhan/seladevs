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

export const THREADS: Thread[] = [
  {
    id: 1,
    slug: "is-vibe-coding-making-us-better-engineers",
    title: "is \"vibe coding\" making us better engineers?",
    tag: "townhall",
    opened: "2026-05-20",
    openedBy: { handle: "kagerou1107", name: "Aiman R." },
    body: `opening for the June townhall. the question is on the table: with LLMs now writing most of our code, are we getting better at engineering, or just faster at producing scripts that work for a demo and break in production?

i think the answer is "it depends on the engineer." what do you think?`,
    replies: [
      {
        id: 1,
        at: "2026-05-20T21:14+08:00",
        handle: "strdst7",
        name: "Saifuddin R.",
        body: `counter-take: "vibe coding" is the same as every other tool. the engineers who use it well are getting better. the ones who use it badly are getting worse. the tool is a multiplier, not a substitute.`,
      },
      {
        id: 2,
        at: "2026-05-21T09:02+08:00",
        handle: "ameera.dev",
        name: "Ameera H.",
        body: `from a hiring angle: i have interviewed 14 candidates in the last 3 months. 9 of them proudly "vibe-coded" their take-home. 3 of those 9 could actually explain what the code did. 6 of them could not. that is a real signal, and we should be reading it.`,
      },
      {
        id: 3,
        at: "2026-05-21T14:48+08:00",
        handle: "tsara.id",
        name: "Tsara I.",
        body: `i think the framing is wrong. the question is not "vibe coding good or bad" — it is "what are we teaching the next generation of engineers, and does that match the world they will work in?" the answer to the second question is "we should be teaching them how to verify, debug, and refactor code that an LLM wrote." that is the actual job now.`,
      },
      {
        id: 4,
        at: "2026-05-22T11:30+08:00",
        handle: "hafiz.py",
        name: "Hafiz Y.",
        body: `one thing i have seen: junior engineers who lean on LLMs without a strong mental model ship code that "works" but is one config change away from a production incident. that is a real cost. the seniors i work with use LLMs to skip the typing, not the thinking.`,
      },
      {
        id: 5,
        at: "2026-05-23T08:12+08:00",
        handle: "kagerou1107",
        name: "Aiman R.",
        body: `summary for the townhall agenda: 3 takes on "multiplier, not substitute", 1 take on "verify+debug+refactor is the new job", 1 take on "juniors are shipping code that is one config away from a prod incident". we are not anti-LLM. we are pro-mental-model. closing summary at the townhall.`,
      },
    ],
  },
  {
    id: 2,
    slug: "cult-of-overwork-in-sea-startups",
    title: "the cult of overwork in SEA startups",
    tag: "hot-take",
    opened: "2026-05-12",
    openedBy: { handle: "ameera.dev", name: "Ameera H." },
    body: `hot take: the cult of overwork in SEA startups is not a cultural inevitability. it is a deliberate choice that founders make because they think it is the only way to compete.

it is not. the data is in. the SEA startups that ship sustainably out-compete the ones that burn out their engineers, on every metric that matters: retention, NPS, bug rate, time-to-feature.`,
    replies: [
      {
        id: 1,
        at: "2026-05-12T22:40+08:00",
        handle: "syamir.kl",
        name: "Syamir T.",
        body: `i was at a SEA startup that prided itself on "the grind." 80-hour weeks were normal. half the team left in 6 months. the ones who stayed were not the best engineers — they were the ones with the fewest options. that should tell you something.`,
      },
      {
        id: 2,
        at: "2026-05-13T10:05+08:00",
        handle: "kagerou1107",
        name: "Aiman R.",
        body: `counter-data point: the founders of the SEA unicorns (grab, shopee, lazada) all ran 80+ hour weeks in the early years. some of that was overwork; some of that was just the right amount of urgency for the stage. the question is when it flips from "urgency" to "overwork." usually around year 3.`,
      },
      {
        id: 3,
        at: "2026-05-14T08:22+08:00",
        handle: "daniyal.rs",
        name: "Daniyal K.",
        body: `i think the answer is: pay people well enough that they do not need a second job, and trust them to manage their own hours. that is the only sustainable model.`,
      },
    ],
  },
  {
    id: 3,
    slug: "how-do-you-price-bounties-fairly",
    title: "how do you price bounties fairly?",
    tag: "question",
    opened: "2026-05-05",
    openedBy: { handle: "kagerou1107", name: "Aiman R." },
    body: `we have been running the bounty board for 18 months now and we still do not have a great answer for "how much should this bounty be."

the heuristic we use today: "what would a senior engineer in this stack charge for 8 hours of focused work?" which gives a range of RM 600 to RM 1,500 for most bounties.

is that right? are we under-paying? over-paying? let me know what you think.`,
    replies: [
      {
        id: 1,
        at: "2026-05-05T14:30+08:00",
        handle: "rendra.my",
        name: "Rendra K.",
        body: `i think the 8-hour heuristic is wrong. most bounties take me 2 to 4 hours. you are paying me 8 hours of senior rate for half a day of actual work. either:
1. lower the bounties (and accept more claimants per bounty)
2. bundle bounties into larger 1-week engagements (and pay more)`,
      },
      {
        id: 2,
        at: "2026-05-06T09:15+08:00",
        handle: "tsara.id",
        name: "Tsara I.",
        body: `the 8-hour heuristic is correct for "fair pay" but you should not price bounties on "fair pay" alone. price them on the value to the project. a security fix that prevents a CVE is worth more than 8 hours of senior rate.`,
      },
      {
        id: 3,
        at: "2026-05-06T20:01+08:00",
        handle: "kagerou1107",
        name: "Aiman R.",
        body: `both takes land. we are going to split bounties into two tiers: "standard" (8h rate) and "high-impact" (priced on risk + value). more on this in the next bounty board update.`,
      },
    ],
  },
  {
    id: 4,
    slug: "show-and-tell-bahasa-melayu-ocr",
    title: "show and tell: i shipped a Bahasa-Melayu OCR pipeline in 6 days",
    tag: "show-and-tell",
    opened: "2026-04-28",
    openedBy: { handle: "rendra.my", name: "Rendra K." },
    body: `show and tell: i shipped a Bahasa-Melayu OCR pipeline in 6 days, end to end. 1.2k receipts/day, 91% accuracy on Bahasa item names, MIT licensed.

the stack: Tesseract for line detection, a fine-tuned BERT-Mini for Bahasa item-name post-processing, and a custom CORS proxy because the public receipt-scanning APIs all wanted RM 1,200/month for a "starter" tier.

the bungkus guild reviewed the PR. if you want to see the code, the repo is on github.`,
    replies: [
      {
        id: 1,
        at: "2026-04-28T20:12+08:00",
        handle: "hafiz.py",
        name: "Hafiz Y.",
        body: `this is exactly the kind of work that should be in the showcase. 6 days from "i have an idea" to "1.2k receipts/day in prod" is a real shipping velocity. +1.`,
      },
      {
        id: 2,
        at: "2026-04-29T08:00+08:00",
        handle: "strdst7",
        name: "Saifuddin R.",
        body: `the CORS-proxy trick is the right move. the public APIs price themselves out of the indie / SME market on purpose. building the proxy + the BERT post-processor in 6 days is the kind of leverage a small community has over a large company.`,
      },
      {
        id: 3,
        at: "2026-04-29T15:45+08:00",
        handle: "ameera.dev",
        name: "Ameera H.",
        body: `linking this from the showcase. deserved.`,
      },
    ],
  },
  {
    id: 5,
    slug: "every-guild-needs-a-public-mission",
    title: "why every guild needs a public \"mission\" page",
    tag: "hot-take",
    opened: "2026-04-15",
    openedBy: { handle: "ameera.dev", name: "Ameera H." },
    body: `hot take: every guild should have a public "current mission" page. not a roadmap. not a manifesto. one sentence: "the next thing this guild is shipping, and when."

the reason: a guild without a mission is a chat room. a guild with a mission is a team.`,
    replies: [
      {
        id: 1,
        at: "2026-04-15T21:30+08:00",
        handle: "kagerou1107",
        name: "Aiman R.",
        body: `agree. this is why the guild page on /guilds/[slug] has a "current mission" field. it is required, not optional. we should probably enforce a max length too (140 chars?) so guilds cannot hide behind marketing.`,
      },
      {
        id: 2,
        at: "2026-04-16T07:00+08:00",
        handle: "najwa.codes",
        name: "Najwa A.",
        body: `140 chars is too short. 280 (a tweet) is the right ceiling. it forces a real sentence, not a slogan.`,
      },
      {
        id: 3,
        at: "2026-04-16T14:18+08:00",
        handle: "ameera.dev",
        name: "Ameera H.",
        body: `agreed on 280. and add a "last updated" timestamp so the mission has a freshness signal. stale missions = stale guilds.`,
      },
    ],
  },
  {
    id: 6,
    slug: "what-does-verified-company-mean",
    title: "what does \"verified company\" actually mean?",
    tag: "question",
    opened: "2026-04-02",
    openedBy: { handle: "kagerou1107", name: "Aiman R." },
    body: `we mark some job listings as "verified company" and others as not. the current rule is: verified = the company has a SSM-registered Malaysian entity, has been in business for 12+ months, and has posted at least one role with us before.

is that the right bar? too high? too low? what would make you, as a candidate, trust a listing more?`,
    replies: [
      {
        id: 1,
        at: "2026-04-02T19:45+08:00",
        handle: "aishah.sh",
        name: "Aishah S.",
        body: `add: "verified by a SelaDevs member" as a separate signal. a builder who interviewed at the company and had a positive experience can vouch for the listing. low-friction, high-trust.`,
      },
      {
        id: 2,
        at: "2026-04-03T11:20+08:00",
        handle: "farouq.sh",
        name: "Farouq S.",
        body: `i would trust "verified" more if there were also a "scam-flag" count. 0 scam flags in 12 months is a real signal. 3 scam flags in 6 months is a real signal too. surface both.`,
      },
      {
        id: 3,
        at: "2026-04-03T18:08+08:00",
        handle: "kagerou1107",
        name: "Aiman R.",
        body: `both good. we will add the "verified by a member" signal as a second badge, and the scam-flag count as a public counter on the listing. shipping next sprint.`,
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
