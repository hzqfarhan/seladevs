export type ChangelogTag = "shipped" | "shipping" | "proposed";

export type ChangelogEntry = {
  id: number;
  date: string;
  tag: ChangelogTag;
  title: string;
  body: string;
  handle: string;
  refs?: { label: string; href: string }[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    id: 1,
    date: "2025-09-08",
    tag: "shipped",
    title: "showcase grid redesign",
    body: `the new \`/showcase\` grid landed. hover-zoom on covers, tag chips, search by title or handle. the next pass adds a detail modal and saved filters.

big thanks to \`@najwa.codes\` for the CSS, and to \`@qistina.ts\` for the design tokens.`,
    handle: "kagerou1107",
  },
  {
    id: 2,
    date: "2025-09-21",
    tag: "shipped",
    title: "selat probes: add TH region",
    body: `we added a probe node in Bangkok. SEA coverage is now SG, MY, ID, TH. p99 latency to most of our users' users dropped by ~80ms.

\`@iman.go\` shipped the k8s config and the retention policy. docs at [selat.dev/regions](https://selat.dev/regions).`,
    handle: "tsara.id",
    refs: [{ label: "regions docs", href: "https://selat.dev/regions" }],
  },
  {
    id: 3,
    date: "2025-10-04",
    tag: "shipping",
    title: "passkey support on bounty claim",
    body: `WebAuthn (passkey) as the second factor for bounty claims is in the security review queue. \`@aishah.sh\` and \`@syamir.kl\` have it running on a staging branch.

target: ship by 2025-10-25.`,
    handle: "syamir.kl",
  },
  {
    id: 4,
    date: "2025-10-12",
    tag: "proposed",
    title: "guild events schema in clickhouse",
    body: `proposal is up: store guild session attendance, mission outcomes, and member churn in a ClickHouse schema queryable from the guild page.

if you are a guild lead and have input, drop it in \`/community\` under the relevant thread.`,
    handle: "tsara.id",
  },
  {
    id: 5,
    date: "2025-10-30",
    tag: "shipped",
    title: "splithold v2 ringgit settlement",
    body: `SplitHold now stores the original currency per line item, with the FX rate at log time. v1 was USD-first; v2 is currency-agnostic with MYR as the display default for SEA groups.

released on iOS, Android, and the web.`,
    handle: "kagerou1107",
  },
  {
    id: 6,
    date: "2025-11-08",
    tag: "shipped",
    title: "bungkus ocr handles 1k receipts/day",
    body: `bungkus crossed 1,000 receipts/day through the OCR pipeline. the failure rate is 2.3% (down from 8% in v1), and the Bahasa-Melayu item-name recognition is at 91%.

the bungkus guild is now looking for a second maintainer to share the on-call rotation.`,
    handle: "rendra.my",
  },
  {
    id: 7,
    date: "2025-11-19",
    tag: "shipping",
    title: "gpu-ghosts whisper.cpp runner",
    body: `the whisper.cpp CI runner for the AI-OS stack is 80% done. \`@strdst7\` is the lead. ETA mid-December.`,
    handle: "strdst7",
  },
  {
    id: 8,
    date: "2025-11-30",
    tag: "shipped",
    title: "jobs board: salary tier filter",
    body: `you can now filter jobs by compensation tier: \`< RM 5k\`, \`RM 5–10k\`, \`RM 10–20k\`, \`RM 20k+\`. the filter is in the sticky bar on \`/jobs\`.

if you are posting a job without a salary, please add one. the no-salary filter is the second most-common reason for no applicants (after "no clear role description").`,
    handle: "kagerou1107",
  },
  {
    id: 9,
    date: "2025-12-11",
    tag: "shipped",
    title: "events calendar with month nav",
    body: `\`/events\` now has a 7-column calendar view with month navigation. day cells show up to 3 event dots (color = category). click a dot to open the day drawer.

RSVP state persists in \`localStorage\` under \`sd:rsvp:<id>\`.`,
    handle: "ameera.dev",
  },
  {
    id: 10,
    date: "2025-12-20",
    tag: "shipping",
    title: "role+state filter on /members",
    body: `\`/members\` now filters by 9 roles and 14 states, with combined search. URL state is preserved (\`?role=backend&state=penang&view=list\`).

shipping in the next sprint.`,
    handle: "najwa.codes",
  },
  {
    id: 11,
    date: "2025-12-31",
    tag: "proposed",
    title: "telegram bounty bot",
    body: `proposal: a Telegram bot that posts new bounties to subscribed groups and accepts claim submissions inline.

if you want to build this, comment on the proposal thread in \`/community\`.`,
    handle: "syafiqah.codes",
  },
  {
    id: 12,
    date: "2026-01-14",
    tag: "shipped",
    title: "map hover + keyboard nav",
    body: `the \`/map\` page now supports keyboard navigation: tab focuses each state polygon, enter navigates to the state detail. mouse hover is unchanged.

next step is the real TopoJSON-based map (see upcoming changelog entry).`,
    handle: "iman.go",
  },
  {
    id: 13,
    date: "2026-01-26",
    tag: "shipped",
    title: "jobs table view",
    body: `\`/jobs\` has a table view on \`lg+\` screens: role, company, location, type, comp, posted, [apply]. the same filter state applies.`,
    handle: "qistina.ts",
  },
  {
    id: 14,
    date: "2026-02-08",
    tag: "shipping",
    title: "seladev_os service worker v2",
    body: `v2 of the seladev_os service worker is in review. adds stale-while-revalidate for the showcase route, network-first for everything else, and a proper install prompt flow.`,
    handle: "arif.builds",
  },
  {
    id: 15,
    date: "2026-02-19",
    tag: "proposed",
    title: "builder reputation score",
    body: `a public, transparent reputation score for SelaDevs members, based on shipped work, reviews, and community feedback.

proposal thread in \`/community\`.`,
    handle: "kagerou1107",
  },
  {
    id: 16,
    date: "2026-03-04",
    tag: "shipped",
    title: "bounty poll: 5 options, 24h window",
    body: `\`/code/bounty\` now has a poll at the bottom. visitors vote for the next bounty to ship. top 3 ship next sprint. votes persist in \`localStorage\` under \`sd:poll:1\`.`,
    handle: "ameera.dev",
  },
  {
    id: 17,
    date: "2026-03-18",
    tag: "shipped",
    title: "events .ics download",
    body: `every event detail page now has an \`[ add to calendar ]\` button that generates a valid VCALENDAR for the event and downloads it. try it on \`/events/edge-runners-demo-night-14\`.`,
    handle: "ameera.dev",
  },
  {
    id: 18,
    date: "2026-04-02",
    tag: "shipping",
    title: "realtime map density heatmap",
    body: `the real Malaysia map (see upcoming) will render a 4-color density heatmap based on builder counts per state. \`@iman.go\` is wiring it up.`,
    handle: "iman.go",
  },
  {
    id: 19,
    date: "2026-04-15",
    tag: "proposed",
    title: "federal-territory federal-tier on map",
    body: `KL and Putrajaya should be their own visual tier on the map (federal territory), not grouped with Selangor. proposal is in the community thread.`,
    handle: "kagerou1107",
  },
  {
    id: 20,
    date: "2026-04-28",
    tag: "shipped",
    title: "job apply modal with localStorage",
    body: `\`/jobs\` apply modal now persists submissions to \`localStorage\` under \`sd:apply:<jobId>\`. disclaimer clearly states this is a demo; the production path posts to \`/api/apply\`.`,
    handle: "qistina.ts",
  },
  {
    id: 21,
    date: "2026-05-12",
    tag: "shipped",
    title: "showcase detail modal",
    body: `clicking a showcase card now opens a modal with the full writeup, tech stack, and links. no page navigation. closes on Esc, backdrop click, or the close button.`,
    handle: "najwa.codes",
  },
  {
    id: 22,
    date: "2026-05-25",
    tag: "shipping",
    title: "changelog rss feed",
    body: `\`/changelog/rss.xml\` is now live. subscribe with your reader to get every entry in your inbox. cache TTL is 1 hour at the edge.`,
    handle: "arif.builds",
  },
  {
    id: 23,
    date: "2026-06-02",
    tag: "proposed",
    title: "members leaderboard v2 (with seasons)",
    body: `proposal: split the leaderboard into quarterly seasons with prizes. reset every 90 days. ongoing discussion in \`/community\`.`,
    handle: "kagerou1107",
  },
  {
    id: 24,
    date: "2026-06-04",
    tag: "shipped",
    title: "/map real malaysia map",
    body: `\`/map\` is now powered by a real TopoJSON of Malaysia, with 4-color builder-density heatmap, keyboard navigation, and zoom. hand-drawn rectangles are gone.

the underlying data is \`react-simple-maps\` + a simplified MIT-licensed state-level TopoJSON. \`@iman.go\` shipped the integration.`,
    handle: "iman.go",
  },
];

export const CHANGELOG_TAGS: ChangelogTag[] = ["shipped", "shipping", "proposed"];
