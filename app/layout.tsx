import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { BigFooter } from "@/components/v2/BigFooter";
import { ScrollProgress } from "@/components/v2/ScrollProgress";
import { FloatingBookButton } from "@/components/v2/FloatingBookButton";
import { IntroLoader } from "@/components/v2/IntroLoader";
import { StructuredData } from "@/components/seo/StructuredData";
import { Grain } from "@/components/v2/Grain";
import { SITE_URL, BRAND } from "@/lib/site";

// Matched to the Mariven reference: Playfair Display for headings (classic
// high-contrast luxury serif) + Bricolage Grotesque for body (modern, warm
// grotesque). globals.css maps the display / accent / body variables onto
// these so every component picks them up.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} | Cosy Cabin Retreat in the Berkshire Countryside`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    `Squirrels' Nest is a cosy one-bedroom boutique cabin retreat in the Berkshire countryside, on the Hampshire border near the North Wessex Downs. A romantic countryside getaway with a super king bed, walk-in shower, private courtyard, woodland views and an optional shepherd's hut. Book your cabin getaway direct on Airbnb.`,
  applicationName: BRAND.name,
  keywords: [
    // Broad intent — what guests actually search
    "cosy cabin",
    "cosy cabins",
    "cabin getaway",
    "cabin getaways in the countryside",
    "countryside cabin getaway",
    "cosy cabin getaway",
    "countryside retreat",
    "rural retreat",
    "romantic cabin getaway",
    "weekend cabin break",
    "boutique cabin",
    // Location-qualified
    "cosy cabin Berkshire",
    "cabin getaway Berkshire",
    "countryside retreat Berkshire",
    "cosy cabin Hampshire",
    "cabin getaway Hampshire",
    "countryside retreat Hampshire",
    "cabin near Newbury",
    "cabin near Reading",
    "North Wessex Downs stay",
    "Berkshire Hampshire border retreat",
    // Property-specific
    "one-bedroom retreat Berkshire",
    "boutique retreat Berkshire",
    "shepherd's hut Berkshire",
    "romantic getaway Berkshire",
    "self-catering Berkshire",
    "boutique Airbnb Berkshire",
    "Squirrels' Nest",
  ],
  authors: [{ name: "Zoe" }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: "travel",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: BRAND.name,
    title: `${BRAND.name} — Cosy Cabin Retreat in the Berkshire Countryside`,
    description: `A cosy one-bedroom boutique cabin getaway in the Berkshire countryside, on the Hampshire border. Super king bed, walk-in shower, private courtyard, woodland views and an optional shepherd's hut.`,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — a cosy one-bedroom cabin retreat in the Berkshire countryside`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Cosy Cabin Retreat in the Berkshire Countryside`,
    description: "A cosy one-bedroom boutique cabin getaway in the Berkshire countryside, on the Hampshire border. Super king bed, private courtyard, woodland views, optional shepherd's hut.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Geotagging — pins the listing to its real location for local/maps search.
  other: {
    "geo.region": "GB-WBK",
    "geo.placename": "Newbury, Berkshire",
    "geo.position": "51.36325;-1.29025",
    ICBM: "51.36325, -1.29025",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${playfair.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <StructuredData />
        <IntroLoader />
        <ScrollProgress />
        <FloatingBookButton />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <BigFooter />
        </SmoothScroll>
        <Grain />
      </body>
    </html>
  );
}
