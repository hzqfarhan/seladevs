import type { MetadataRoute } from "next";
import { UTHM_FACULTIES } from "@/data/map";
import { GUILDS } from "@/data/guilds";
import { JOBS } from "@/data/jobs";
import { EVENTS } from "@/data/events";
import { BOUNTIES } from "@/data/bounties";
import { NEWS } from "@/data/news";
import { CHANGELOG } from "@/data/changelog";
import { SHOWCASE } from "@/data/showcase";
import { THREADS as COMMUNITY } from "@/data/community";
import { MEMBERS } from "@/data/members";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://uthmforge.uthm.edu.my";
  const now = new Date();
  const staticRoutes = [
    "/",
    "/showcase",
    "/about",
    "/members",
    "/guilds",
    "/events",
    "/news",
    "/changelog",
    "/for-industry",
    "/jobs",
    "/code/bounty",
    "/for-faculty",
    "/for-industry/register",
    "/sponsorship",
    "/map",
    "/leaderboard",
    "/community",
    "/privacy",
    "/terms",
    "/contact",
  ];
  const dynamic = [
    ...UTHM_FACULTIES.map((f) => `/map/${f.slug}`),
    ...GUILDS.map((g) => `/guilds/${g.slug}`),
    ...JOBS.map((j) => `/jobs/${j.slug}`),
    ...EVENTS.map((e) => `/events/${e.slug}`),
    ...BOUNTIES.map((b) => `/code/bounty/${b.slug}`),
    ...NEWS.map((n) => `/news/${n.slug}`),
    ...CHANGELOG.map((c) => `/changelog#${c.id}`),
    ...SHOWCASE.map((s) => `/showcase#${s.slug}`),
    ...COMMUNITY.map((t: { slug: string }) => `/community/${t.slug}`),
    ...MEMBERS.map((m) => `/members/${m.handle}`),
  ];
  return [...staticRoutes, ...dynamic].map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r === "/" ? 1 : 0.6,
  }));
}
