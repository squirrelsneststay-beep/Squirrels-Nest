import type { MetadataRoute } from "next";

/**
 * robots.txt — allow indexing once the site is live + named.
 * Update SITE_URL to your production domain before deploying.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://squirrelsneststay.co.uk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // `/v2` is an internal design-exploration route — never publish.
        // /api, /_next, /admin reserved for future use.
        disallow: ["/v2", "/v2/", "/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
