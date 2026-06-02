import { CHANGELOG } from "@/data/changelog";

export const revalidate = 3600;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

export async function GET() {
  const sorted = [...CHANGELOG].sort((a, b) => b.date.localeCompare(a.date));
  const items = sorted.slice(0, 20);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SelaDevs changelog</title>
    <link>https://seladevs.com/changelog</link>
    <description>What we shipped, shipping, and proposing.</description>
    <language>en</language>
    <atom:link href="https://seladevs.com/changelog/rss.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (e) => `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>https://seladevs.com/changelog#${e.id}</link>
      <guid isPermaLink="false">sd-cl-${e.id}</guid>
      <pubDate>${rfc822(e.date)}</pubDate>
      <category>${e.tag}</category>
      <description>${escapeXml(e.body.slice(0, 280))}</description>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
