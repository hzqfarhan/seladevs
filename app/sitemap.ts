import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://seladevs.com";
  const now = new Date();
  const routes = [
    "/",
    "/showcase",
    "/about",
    "/members",
    "/guilds",
    "/events",
    "/news",
    "/changelog",
    "/for-company",
    "/jobs",
    "/code/bounty",
    "/for-government",
    "/hire/register",
    "/pricing",
    "/map",
    "/leaderboard",
    "/community",
    "/for-developers",
    "/for-companies",
    "/privacy",
    "/terms",
    "/contact",
  ];
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: now, changeFrequency: "weekly", priority: r === "/" ? 1 : 0.6 }));
}
