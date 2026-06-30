import { JOURNAL_POSTS } from "@/lib/journal";
import { SITE_URL, BRAND } from "@/lib/site";

// Static RSS 2.0 feed for the Journal. Helps content discovery (readers,
// aggregators, some search surfaces) and is linked from the document head.
export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const items = JOURNAL_POSTS.map((post) => {
    const url = `${SITE_URL}/journal/${post.slug}`;
    const pubDate = new Date(`${post.date}T09:00:00Z`).toUTCString();
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.metaDescription)}</description>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Journal — ${escapeXml(BRAND.name)}</title>
    <link>${SITE_URL}/journal</link>
    <description>Local guides to the Berkshire countryside from Squirrels' Nest: walks, country pubs, days out and slow weekends near Newbury and the North Wessex Downs.</description>
    <language>en-GB</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
