import { SITE_URL, BRAND, AIRBNB_URL, INSTAGRAM_URL } from "@/lib/site";

/**
 * JSON-LD structured data — tells Google this is a luxury self-catering cabin
 * (a LodgingBusiness) in the Berkshire countryside, with its amenities, location
 * and capacity. Drives rich results + local/lodging search visibility.
 *
 * Server-rendered into the HTML so crawlers see it on first byte. A
 * <script type="application/ld+json"> is a DATA block (not executed JS), and is
 * covered by the site CSP's 'unsafe-inline' regardless.
 */

// Only list real, specific profiles — never the bare airbnb.co.uk / instagram.com
// fallbacks (those would point crawlers at a generic homepage).
const sameAs = [AIRBNB_URL, INSTAGRAM_URL].filter(
  (u): u is string =>
    !!u &&
    u !== "https://www.airbnb.co.uk" &&
    u !== "https://www.instagram.com/"
);

const lodging = {
  "@type": "LodgingBusiness",
  "@id": `${SITE_URL}/#lodging`,
  name: BRAND.name,
  description:
    "A luxury two-bedroom self-catering cabin retreat in the Berkshire countryside, sleeping four. A super king bed in the cabin and two singles in a private shepherd's hut, with a fully equipped kitchen, walk-in shower, enclosed courtyard and woodland views — on the edge of the North Wessex Downs, near the Hampshire border.",
  url: SITE_URL,
  image: [
    `${SITE_URL}/images/squirrels-nest/sq-12.jpg`,
    `${SITE_URL}/images/squirrels-nest/sq-18.jpg`,
    `${SITE_URL}/images/squirrels-nest/sq-08.jpg`,
  ],
  email: BRAND.email,
  priceRange: "££",
  currenciesAccepted: "GBP",
  numberOfRooms: 2,
  petsAllowed: false,
  smokingAllowed: false,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Berkshire",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.45,
    longitude: -1.07,
  },
  containedInPlace: {
    "@type": "Place",
    name: "North Wessex Downs, Berkshire",
  },
  amenityFeature: [
    "Free WiFi",
    "Free private parking",
    "Fully equipped kitchen",
    "Large walk-in shower room",
    "Private enclosed courtyard",
    "Central heating",
    "Television",
    "Super king bed",
    "Private shepherd's hut",
    "Woodland views",
  ].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  ...(sameAs.length ? { sameAs } : {}),
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BRAND.name,
  inLanguage: "en-GB",
  publisher: { "@id": `${SITE_URL}/#lodging` },
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [lodging, website],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is involved.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
