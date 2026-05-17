import type { MetadataRoute } from "next";

/**
 * robots.txt — allow indexing once the site is live + named.
 * Update SITE_URL to your production domain before deploying.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://squirrelsnest.co.uk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block paths that should never be indexed if you add them later
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
