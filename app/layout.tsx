import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
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

// One neutral grotesque for the whole site — the way here-away.com uses a
// single PP Neue Montreal. Switzer (Fontshare, free for commercial use) is the
// close, self-hosted stand-in. Exposed on --font-switzer; globals.css maps the
// display / accent / body variables onto it so every component picks it up.
const switzer = localFont({
  variable: "--font-switzer",
  display: "swap",
  src: [
    { path: "../public/fonts/switzer/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/switzer/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/switzer/switzer-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/switzer/switzer-700.woff2", weight: "700", style: "normal" },
  ],
});

// Display / headings — Instrument Serif: a modern, high-contrast editorial
// serif. Used large and a touch tight it reads contemporary-luxury (fashion
// editorial, modern boutique hotel) rather than traditional country-house.
// Its italic is doing a lot of the personality work in the accent lines.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
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
        url: "/images/squirrels-nest/sq-12.jpg",
        width: 1280,
        height: 800,
        alt: `The super king bedroom at ${BRAND.name}, a luxury cabin retreat in the Berkshire countryside`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Cosy Cabin Retreat in the Berkshire Countryside`,
    description: "A cosy one-bedroom boutique cabin getaway in the Berkshire countryside, on the Hampshire border. Super king bed, private courtyard, woodland views, optional shepherd's hut.",
    images: ["/images/squirrels-nest/sq-12.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${switzer.variable} ${instrumentSerif.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('sn-theme')==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();",
          }}
        />
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
