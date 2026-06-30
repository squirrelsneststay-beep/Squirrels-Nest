import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/v2/Reveal";
import { JOURNAL_POSTS } from "@/lib/journal";
import { SITE_URL, BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal — Notes from the Berkshire Countryside",
  description:
    "Local guides from Squirrels' Nest: where to walk on the North Wessex Downs, our favourite country pubs near Newbury, and how to spend a slow weekend in the Berkshire countryside.",
  alternates: { canonical: "/journal" },
  keywords: [
    "things to do in Berkshire",
    "Berkshire countryside guide",
    "places to stay in Berkshire",
    "country pubs near Newbury",
    "North Wessex Downs walks",
  ],
  openGraph: {
    title: "The Journal — Notes from the Berkshire Countryside",
    description:
      "Walks, pubs and slow weekends near Squirrels' Nest, a boutique cabin on the edge of the North Wessex Downs.",
    images: ["/images/squirrels-nest/sq-03.jpg"],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `The Journal — ${BRAND.name}`,
  description:
    "Local guides to the Berkshire countryside from Squirrels' Nest: walks, country pubs and slow weekends near Newbury and the North Wessex Downs.",
  url: `${SITE_URL}/journal`,
  publisher: { "@type": "Organization", name: BRAND.name, url: SITE_URL },
  blogPost: JOURNAL_POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    url: `${SITE_URL}/journal/${p.slug}`,
    datePublished: p.date,
    image: `${SITE_URL}${p.heroImage}`,
  })),
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
  ],
};

export default function JournalPage() {
  return (
    <article style={{ background: "var(--v2-bg)", color: "var(--v2-ink)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }}
      />

      <div
        className="mx-auto"
        style={{
          maxWidth: "60rem",
          paddingInline: "clamp(1.5rem, 4vw, 3.5rem)",
          paddingTop: "clamp(8rem, 18vh, 13rem)",
          paddingBottom: "clamp(5rem, 12vh, 9rem)",
        }}
      >
        <Reveal>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-geist)",
              fontSize: "0.78rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--v2-mute)",
            }}
          >
            The Journal
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1
            className="font-display"
            style={{
              margin: "0.9rem 0 0",
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              fontWeight: 400,
            }}
          >
            Notes from{" "}
            <span style={{ fontStyle: "italic", color: "var(--v2-ink-soft)" }}>the countryside.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p
            style={{
              margin: "1.6rem 0 0",
              maxWidth: "42ch",
              fontFamily: "var(--font-geist)",
              fontSize: "clamp(1rem, 1.3vw, 1.18rem)",
              lineHeight: 1.65,
              color: "var(--v2-ink-soft)",
            }}
          >
            Walks, pubs and slow weekends near the cabin. The places we love in
            this quiet corner of Berkshire, and how to make the most of a few
            days here.
          </p>
        </Reveal>

        <div style={{ marginTop: "clamp(3.5rem, 8vh, 6rem)", display: "grid", gap: "clamp(3rem, 7vh, 5.5rem)" }}>
          {JOURNAL_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={0.06 * i}>
              <Link
                href={`/journal/${post.slug}`}
                aria-label={`Read: ${post.title}`}
                style={{ display: "block", textDecoration: "none", color: "inherit" }}
                className="jrnl-card"
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                    borderRadius: "4px",
                    background: "var(--v2-line)",
                  }}
                >
                  <Image
                    src={post.heroImage}
                    alt={post.heroAlt}
                    fill
                    sizes="(max-width: 768px) 92vw, 60rem"
                    style={{ objectFit: "cover" }}
                    className="jrnl-img"
                  />
                </div>
                <p
                  style={{
                    margin: "1.5rem 0 0",
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--v2-mute)",
                  }}
                >
                  {post.dateLabel} · {post.readMinutes} min read
                </p>
                <h2
                  className="font-display"
                  style={{
                    margin: "0.7rem 0 0",
                    fontSize: "clamp(1.7rem, 3.4vw, 2.8rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    fontWeight: 400,
                  }}
                >
                  {post.title}
                </h2>
                <p
                  style={{
                    margin: "0.9rem 0 0",
                    maxWidth: "54ch",
                    fontFamily: "var(--font-geist)",
                    fontSize: "1.02rem",
                    lineHeight: 1.6,
                    color: "var(--v2-ink-soft)",
                  }}
                >
                  {post.excerpt}
                </p>
                <span
                  className="font-display"
                  style={{
                    display: "inline-block",
                    marginTop: "1.1rem",
                    fontSize: "1.05rem",
                    color: "var(--v2-accent)",
                  }}
                >
                  Read the journal →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
