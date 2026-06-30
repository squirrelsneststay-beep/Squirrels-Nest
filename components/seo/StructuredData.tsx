import { SITE_URL, BRAND, AIRBNB_URL, INSTAGRAM_URL } from "@/lib/site";
import { AIRBNB_RATING } from "@/lib/owner-facts";

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
    "A cosy one-bedroom boutique cabin retreat in the Berkshire countryside, on the Hampshire border near the North Wessex Downs. A romantic countryside getaway with a luxurious super king-size bed, a kitchenette, a walk-in shower and a private enclosed courtyard — plus an optional shepherd's hut sleeping two.",
  slogan: "A cosy cabin getaway in the Berkshire countryside",
  url: SITE_URL,
  image: [
    `${SITE_URL}/images/squirrels-nest/sq-12.jpg`,
    `${SITE_URL}/images/squirrels-nest/sq-18.jpg`,
    `${SITE_URL}/images/squirrels-nest/sq-08.jpg`,
  ],
  email: BRAND.email,
  priceRange: "££",
  currenciesAccepted: "GBP",
  numberOfRooms: 1,
  petsAllowed: false,
  smokingAllowed: false,
  tourBookingPage: AIRBNB_URL,
  numberOfBedrooms: 1,
  occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: 4, unitText: "guests" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Newbury",
    addressRegion: "Berkshire",
    postalCode: "RG20",
    addressCountry: "GB",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "West Berkshire" },
    { "@type": "AdministrativeArea", name: "Hampshire" },
    { "@type": "Place", name: "North Wessex Downs" },
    { "@type": "City", name: "Newbury" },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.36325,
    longitude: -1.29025,
  },
  containedInPlace: {
    "@type": "Place",
    name: "North Wessex Downs, Berkshire",
  },
  amenityFeature: [
    "Free WiFi",
    "Free private parking",
    "Kitchenette (microwave, sink, fridge)",
    "Large walk-in shower room",
    "Private enclosed courtyard",
    "Central heating",
    "Super king bed",
    "Optional shepherd's hut (sleeps 2)",
    "Woodland views",
  ].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  // aggregateRating only when Zoe confirms the live Airbnb figures — fabricated
  // ratings are a manual-action risk and Google strips unverifiable ones.
  ...(AIRBNB_RATING
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: AIRBNB_RATING.stars,
          reviewCount: AIRBNB_RATING.count,
          bestRating: 5,
        },
      }
    : {}),
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
      // Escape `<` so a value containing "</script>" (e.g. via a future env
      // var) can never break out of the data block and execute.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
