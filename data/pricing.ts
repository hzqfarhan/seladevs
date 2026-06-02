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

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "starter",
    price: "RM 299",
    duration: "/ 30 days",
    features: [
      "1 active listing",
      "manual review",
      "no featured slot",
      "24h reply SLA",
    ],
    cta: "post a job",
    ctaHref: "/hire/register",
    ctaType: "link",
  },
  {
    id: "growth",
    name: "growth",
    price: "RM 799",
    duration: "/ 30 days",
    features: [
      "3 active listings",
      "priority review",
      "1 featured slot",
      "24h reply SLA",
      "DM candidates directly",
    ],
    cta: "post 3 jobs",
    ctaHref: "/hire/register",
    ctaType: "link",
    featured: true,
  },
  {
    id: "scale",
    name: "scale",
    price: "RM 1,999",
    duration: "/ 30 days",
    features: [
      "10 active listings",
      "priority review",
      "3 featured slots",
      "1h reply SLA",
      "DM candidates directly",
      "sourcing assistance",
      "monthly report",
    ],
    cta: "contact sales",
    ctaHref: "/contact?topic=partnership",
    ctaType: "link",
  },
];

export const PRICING_FEATURES = [
  { label: "active listings", starter: "1", growth: "3", scale: "10" },
  { label: "manual review", starter: "✓", growth: "✓", scale: "✓" },
  { label: "priority review", starter: "—", growth: "✓", scale: "✓" },
  { label: "featured slot", starter: "—", growth: "1", scale: "3" },
  { label: "reply SLA", starter: "24h", growth: "24h", scale: "1h" },
  { label: "DM candidates", starter: "—", growth: "✓", scale: "✓" },
  { label: "sourcing assistance", starter: "—", growth: "—", scale: "✓" },
  { label: "monthly report", starter: "—", growth: "—", scale: "✓" },
  { label: "RSS feed", starter: "—", growth: "✓", scale: "✓" },
  { label: "custom domain", starter: "—", growth: "—", scale: "✓" },
  { label: "dedicated account manager", starter: "—", growth: "—", scale: "✓" },
  { label: "sourcing from guild network", starter: "—", growth: "—", scale: "✓" },
];

export type FaqItem = { q: string; a: string };
export const PRICING_FAQ: FaqItem[] = [
  {
    q: "what counts as a listing?",
    a: "one role, live for 30 days. if you want to renew, the listing auto-expires — no surprise charges.",
  },
  {
    q: "can i cancel?",
    a: "yes, any time. pro-rated refund for the unused days, processed within 7 days.",
  },
  {
    q: "do you offer refunds?",
    a: "yes. if your listing gets 0 qualified applicants (we define \"qualified\" as matching at least 3 of the 5 requirements you posted) within 14 days, you get a full refund.",
  },
  {
    q: "is there a free tier?",
    a: "yes — for open-source maintainer roles. email `oss@seladevs.com` with the repo URL and we'll post for free, forever.",
  },
];
