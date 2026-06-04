export type PricingTier = {
  id: string;
  name: string;
  price: string;
  duration: string;
  features: string[];
  cta: string;
  ctaHref: string;
  ctaType: "link" | "external";
  featured?: boolean;
};

// Sponsorship tiers for industry partners, faculty, and student clubs.
export const PRICING_TIERS: PricingTier[] = [
  {
    id: "club",
    name: "student club",
    price: "free",
    duration: "self-serve",
    features: [
      "post 1 open bounty at a time",
      "RM 0–500 payout funded by the club",
      "self-review, 14d merge window",
      "faculty advisor sign-off required for RM > 200",
    ],
    cta: "start a club bounty",
    ctaHref: "/for-faculty",
    ctaType: "link",
  },
  {
    id: "faculty",
    name: "faculty sponsor",
    price: "RM 1,500",
    duration: "/ month",
    features: [
      "post up to 5 open bounties per month",
      "RM 0–2,000 payout per bounty",
      "co-branded with the faculty",
      "tax invoice for UTHM research-grant accounting",
      "named mentor from the issuing faculty",
    ],
    cta: "sponsor as faculty",
    ctaHref: "/for-faculty",
    ctaType: "link",
    featured: true,
  },
  {
    id: "industry",
    name: "industry sponsor",
    price: "RM 5,000",
    duration: "/ month",
    features: [
      "post up to 15 open bounties per month",
      "RM 0–5,000 payout per bounty",
      "co-branded with your company",
      "FYP pipeline: invite top students to your co-op / internship",
      "monthly report: builders engaged, PRs merged, hires",
      "dedicated UTHM Forge coordinator",
    ],
    cta: "contact partnerships",
    ctaHref: "/contact?topic=partnership",
    ctaType: "link",
  },
];

export const PRICING_FEATURES = [
  { label: "open bounties / month", club: "1", faculty: "5", industry: "15" },
  { label: "max payout / bounty", club: "RM 500", faculty: "RM 2,000", industry: "RM 5,000" },
  { label: "merge window", club: "14d", faculty: "21d", industry: "30d" },
  { label: "faculty co-brand", club: "—", faculty: "✓", industry: "✓" },
  { label: "tax invoice (UTHM)", club: "—", faculty: "✓", industry: "✓" },
  { label: "FYP pipeline access", club: "—", faculty: "—", industry: "✓" },
  { label: "monthly report", club: "—", faculty: "—", industry: "✓" },
  { label: "dedicated coordinator", club: "—", faculty: "—", industry: "✓" },
  { label: "OSS-maintainer bounties", club: "✓", faculty: "✓", industry: "✓" },
];

export type FaqItem = { q: string; a: string };
export const PRICING_FAQ: FaqItem[] = [
  {
    q: "what counts as an open bounty?",
    a: "one issue, one payout, one merge. auto-expires after the merge window. no surprise charges.",
  },
  {
    q: "can a faculty or industry sponsor cancel?",
    a: "yes, any time. pro-rated refund for the unused days, processed within 7 days.",
  },
  {
    q: "do you offer refunds if no PRs are merged?",
    a: "yes. if your bounty gets 0 qualifying PRs within the merge window, you get a full refund. \"qualifying\" = matching at least 3 of the 5 acceptance criteria in the bounty spec.",
  },
  {
    q: "is OSS-maintainer work really free?",
    a: "yes. any UTHM student or club can post an OSS bounty for free, forever, with payout up to RM 500 funded by the club or a faculty grant.",
  },
  {
    q: "where does the money come from?",
    a: "industry sponsors and faculty research grants cover the platform's operating costs. student clubs use club funds. UTHM Forge does not take a platform fee on student-club bounties.",
  },
];
