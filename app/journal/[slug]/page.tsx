import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/v2/Reveal";
import { JOURNAL_POSTS, getJournalPost } from "@/lib/journal";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS, SITE_URL, BRAND } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return JOURNAL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  const url = `/journal/${post.slug}`;
  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      url: `${SITE_URL}${url}`,
      publishedTime: post.date,
      authors: ["Zoe"],
      images: [{ url: post.heroImage, width: 1280, height: 720, alt: post.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.heroImage],
    },
  };
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/journal/${post.slug}`;
  const others = JOURNAL_POSTS.filter((p) => p.slug !== post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}${post.heroImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: "Zoe" },
    publisher: { "@type": "Organization", name: BRAND.name, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.keywords.join(", "),
    isPartOf: { "@type": "Blog", name: `The Journal — ${BRAND.name}`, url: `${SITE_URL}/journal` },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <article style={{ background: "var(--v2-bg)", color: "var(--v2-ink)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }}
      />

      {/* Header + hero */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "52rem",
          paddingInline: "clamp(1.5rem, 4vw, 3.5rem)",
          paddingTop: "clamp(7.5rem, 16vh, 11rem)",
        }}
      >
        <Reveal>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-geist)",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--v2-mute)",
            }}
          >
            <Link href="/journal" style={{ color: "var(--v2-mute)", textDecoration: "none" }}>
              Journal
            </Link>{" "}
            · {post.dateLabel} · {post.readMinutes} min read
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1
            className="font-display"
            style={{
              margin: "1rem 0 0",
              fontSize: "clamp(2.3rem, 5.2vw, 4.2rem)",
              lineHeight: 1.03,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              maxWidth: "18ch",
            }}
          >
            {post.title}
          </h1>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div
          className="mx-auto"
          style={{
            maxWidth: "64rem",
            paddingInline: "clamp(1.5rem, 4vw, 3.5rem)",
            marginTop: "clamp(2rem, 5vh, 3.5rem)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              borderRadius: "5px",
              background: "var(--v2-line)",
            }}
          >
            <Image
              src={post.heroImage}
              alt={post.heroAlt}
              fill
              priority
              sizes="(max-width: 768px) 92vw, 64rem"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </Reveal>

      {/* Body */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "40rem",
          paddingInline: "clamp(1.5rem, 4vw, 3.5rem)",
          paddingTop: "clamp(3rem, 7vh, 5rem)",
          paddingBottom: "clamp(4rem, 9vh, 7rem)",
        }}
      >
        {post.intro.map((para, i) => (
          <Reveal key={`intro-${i}`} delay={0.04 * i}>
            <p
              style={{
                margin: i === 0 ? 0 : "1.4rem 0 0",
                fontFamily: "var(--font-geist)",
                fontSize: "clamp(1.08rem, 1.5vw, 1.22rem)",
                lineHeight: 1.72,
                color: "var(--v2-ink)",
              }}
            >
              {para}
            </p>
          </Reveal>
        ))}

        {post.sections.map((section) => (
          <section key={section.heading} style={{ marginTop: "clamp(2.6rem, 6vh, 4rem)" }}>
            <Reveal>
              <h2
                className="font-display"
                style={{
                  margin: 0,
                  fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                {section.heading}
              </h2>
            </Reveal>
            {section.body.map((para, i) => (
              <Reveal key={i} delay={0.03 * i}>
                <p
                  style={{
                    margin: "1.1rem 0 0",
                    fontFamily: "var(--font-geist)",
                    fontSize: "1.08rem",
                    lineHeight: 1.72,
                    color: "var(--v2-ink-soft)",
                  }}
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </section>
        ))}

        {/* CTA */}
        <Reveal>
          <div
            style={{
              marginTop: "clamp(3.5rem, 8vh, 6rem)",
              paddingTop: "clamp(2.5rem, 6vh, 4rem)",
              borderTop: "1px solid var(--v2-line)",
              textAlign: "center",
            }}
          >
            <h2
              className="font-display"
              style={{
                margin: 0,
                fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}
            >
              Make it your weekend.
            </h2>
            <p
              style={{
                margin: "0.9rem auto 0",
                maxWidth: "38ch",
                fontFamily: "var(--font-geist)",
                fontSize: "1.02rem",
                lineHeight: 1.6,
                color: "var(--v2-ink-soft)",
              }}
            >
              Squirrels' Nest is a cosy one-bedroom cabin in the heart of it all,
              minutes from these walks, pubs and days out.
            </p>
            <div
              style={{
                marginTop: "1.6rem",
                display: "flex",
                gap: "0.9rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a href={AIRBNB_URL} {...EXTERNAL_LINK_PROPS} className="sv-pill is-inverse">
                Book now
              </a>
              <Link href="/" className="sv-pill">
                See the cabin
              </Link>
            </div>
          </div>
        </Reveal>

        {/* More from the journal */}
        <div style={{ marginTop: "clamp(3.5rem, 8vh, 5.5rem)" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-geist)",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--v2-mute)",
            }}
          >
            More from the journal
          </p>
          <div style={{ marginTop: "1.2rem", display: "grid", gap: "0.9rem" }}>
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/journal/${p.slug}`}
                className="font-display"
                style={{
                  fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--v2-ink)",
                  textDecoration: "none",
                }}
              >
                {p.title} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
