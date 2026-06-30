import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { JOURNAL_POSTS } from "@/lib/journal";

// Fixed publish date instead of `new Date()`. A live timestamp told crawlers
// every page changed on every request, wasting crawl budget. Bump this when
// content materially changes.
const LAST_MODIFIED = "2026-06-30";

const img = (n: string) => `${SITE_URL}/images/squirrels-nest/${n}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
      // Image sitemap — surfaces the cabin photography in Google Images.
      images: [img("sq-12.jpg"), img("sq-18.jpg"), img("sq-08.jpg"), img("sq-37.jpg"), img("sq-03.jpg")],
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        img("sq-12.jpg"), img("sq-17.jpg"), img("sq-08.jpg"), img("sq-33.jpg"),
        img("sq-37.jpg"), img("sq-20.jpg"), img("sq-03.jpg"), img("sq-30.jpg"),
        img("sq-18.jpg"), img("sq-25.jpg"),
      ],
    },
    {
      url: `${SITE_URL}/the-area`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/journal`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // One entry per journal post — each is its own indexable guide page.
    ...JOURNAL_POSTS.map((post) => ({
      url: `${SITE_URL}/journal/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [img(post.heroImage.split("/").pop() as string)],
    })),
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
