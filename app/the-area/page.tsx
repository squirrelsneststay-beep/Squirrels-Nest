import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/v2/Reveal";
import { FaqBlock, type FaqItem } from "@/components/seo/FaqBlock";
import { JOURNAL_POSTS } from "@/lib/journal";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS, SITE_URL, BRAND } from "@/lib/site";

const FAQS: FaqItem[] = [
  {
    q: "Where is Squirrels' Nest?",
    a: "Squirrels' Nest is a one-bedroom cabin in the West Berkshire countryside, near Newbury and the Hampshire border, on the edge of the North Wessex Downs.",
  },
  {
    q: "How do I book a stay?",
    a: "Booking is handled through Airbnb. You will find the live availability calendar and rates on the listing, which is linked from every page of this site.",
  },
  {
    q: "What is there to do nearby?",
    a: "Plenty. Walks on the North Wessex Downs, country pubs, Highclere Castle (the real Downton Abbey), the Kennet and Avon Canal and the market town of Newbury are all a short drive away. Our journal has guides to each.",
  },
  {
    q: "Is there parking at the cabin?",
    a: "Yes, there is private parking on site.",
  },
  {
    q: "What is the nearest town and railway station?",
    a: "Newbury is the nearest town, a short drive away, with a mainline railway station running to London Paddington and west towards the South West.",
  },
  {
    q: "Does the cabin have a kitchen?",
    a: "The cabin has a handy kitchenette with a microwave, sink and fridge, which is all you need for a relaxed self-catering stay.",
  },
];

export const metadata: Metadata = {
  title: "The Area — Things to do near Newbury & the North Wessex Downs",
  description:
    "A guide to the area around Squirrels' Nest: Highclere Castle, the North Wessex Downs, Watership Down, Newbury, Walbury Hill and Combe Gibbet, the Kennet & Avon Canal, and walks straight from the door in west Berkshire.",
  alternates: { canonical: "/the-area" },
  openGraph: {
    title: "Things to do near Newbury & the North Wessex Downs",
    description:
      "What to do near Squirrels' Nest — a boutique cabin in the Berkshire countryside, on the edge of the North Wessex Downs.",
    images: ["/images/squirrels-nest/sq-03.jpg"],
  },
};

// Real, well-known places near the RG20 area (Highclere / Burghclere /
// Kingsclere / Newbury). Public landmarks — not claims about the property.
const PLACES: { name: string; body: string }[] = [
  {
    name: "Highclere Castle",
    body: "The grand country house better known as Downton Abbey is just up the road in Highclere, its parkland designed by Capability Brown. It opens to visitors on selected dates through spring and summer — worth booking ahead.",
  },
  {
    name: "The North Wessex Downs",
    body: "One of England's National Landscapes: a wide sweep of chalk downland, beech hangers and quiet villages. The cabin sits right on its edge, so the big skies and long views start almost from the gate.",
  },
  {
    name: "Watership Down",
    body: "The chalk hill made famous by Richard Adams' novel rises a short drive south, near Kingsclere — open downland with long views across Hampshire and Berkshire, and an easy ridge walk.",
  },
  {
    name: "Newbury",
    body: "The nearest market town: independent shops, riverside walks along the Kennet, a Tuesday and Saturday market, and Newbury Racecourse. Handy for lunch, a rainy afternoon, or stocking the fridge.",
  },
  {
    name: "Walbury Hill & Combe Gibbet",
    body: "West of Newbury near Inkpen, Walbury Hill is the highest chalk hill in England, crowned by the stark silhouette of Combe Gibbet. A bracing walk with some of the best views in the South East.",
  },
  {
    name: "Sandham Memorial Chapel",
    body: "In nearby Burghclere, this plain little National Trust chapel holds Stanley Spencer's extraordinary cycle of First World War murals — quietly one of the most remarkable things in the county.",
  },
  {
    name: "The Kennet & Avon Canal",
    body: "Flat, easy towpath walking and cycling runs west from Newbury through Kintbury and Hungerford — locks, narrowboats and a string of canalside pubs to aim for.",
  },
  {
    name: "Walks from the door",
    body: "Footpaths lead straight out into the downs and farmland around the cabin. Bring boots; the walking here is the main event.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "The Area", item: `${SITE_URL}/the-area` },
  ],
};

export default function TheAreaPage() {
  return (
    <article
      style={{ background: "var(--v2-bg)", color: "var(--v2-ink)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }}
      />

      <div
        className="mx-auto"
        style={{ maxWidth: "52rem", paddingInline: "clamp(1.5rem, 4vw, 3.5rem)", paddingTop: "clamp(8rem, 18vh, 13rem)", paddingBottom: "clamp(5rem, 12vh, 9rem)" }}
      >
        <Reveal>
          <h1
            className="font-display"
            style={{
              margin: 0,
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              fontWeight: 400,
            }}
          >
            The area{" "}
            <span style={{ fontStyle: "italic", color: "var(--v2-ink-soft)" }}>around the cabin.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p
            style={{
              marginTop: "2rem",
              maxWidth: "44ch",
              fontFamily: "var(--font-geist)",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--v2-ink-soft)",
            }}
          >
            Squirrels&apos; Nest sits in west Berkshire, near Newbury and on the
            edge of the North Wessex Downs, close to the Hampshire border. There
            is a lot within a short drive — here are a few favourites.
          </p>
        </Reveal>

        <div style={{ marginTop: "clamp(3rem, 7vw, 5rem)" }}>
          {PLACES.map((p) => (
            <Reveal key={p.name}>
              <section style={{ paddingBlock: "1.75rem", borderTop: "1px solid var(--v2-line)" }}>
                <h2
                  className="font-display"
                  style={{ margin: 0, fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)", letterSpacing: "-0.02em", fontWeight: 400 }}
                >
                  {p.name}
                </h2>
                <p
                  style={{
                    margin: "0.8rem 0 0",
                    maxWidth: "52ch",
                    fontFamily: "var(--font-geist)",
                    fontSize: "1.0625rem",
                    lineHeight: 1.65,
                    color: "var(--v2-ink-soft)",
                  }}
                >
                  {p.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>

        {/* From the journal — cross-links into the guide content */}
        <section style={{ marginTop: "clamp(3.5rem, 9vh, 6rem)" }}>
          <Reveal>
            <h2
              className="font-display"
              style={{ margin: 0, fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 400 }}
            >
              From the journal
            </h2>
          </Reveal>
          <div style={{ marginTop: "clamp(1.5rem, 3vh, 2.2rem)", display: "grid", gap: "0.9rem" }}>
            {JOURNAL_POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={0.03 * i}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="font-display"
                  style={{ fontSize: "clamp(1.15rem, 2vw, 1.45rem)", letterSpacing: "-0.02em", color: "var(--v2-ink)", textDecoration: "none" }}
                >
                  {post.title} &rarr;
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <FaqBlock items={FAQS} />

        <Reveal>
          <div style={{ marginTop: "clamp(3.5rem, 8vw, 6rem)", display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href={AIRBNB_URL} {...EXTERNAL_LINK_PROPS} className="sv-pill is-inverse">
              <span>Book</span>
              <span className="sv-pill-rule" aria-hidden />
              <span>on Airbnb</span>
            </a>
            <Link href="/gallery" style={{ fontFamily: "var(--font-geist)", fontSize: "1rem", color: "var(--v2-ink)", textDecoration: "none", borderBottom: "1px solid color-mix(in srgb, var(--v2-ink) 40%, transparent)", paddingBottom: "0.2rem" }}>
              See the cabin &rarr;
            </Link>
          </div>
        </Reveal>

        <p style={{ marginTop: "3rem", fontFamily: "var(--font-geist)", fontSize: "0.82rem", color: "var(--v2-mute)" }}>
          {BRAND.name} · A boutique cabin in the Berkshire countryside, near Newbury.
        </p>
      </div>
    </article>
  );
}
