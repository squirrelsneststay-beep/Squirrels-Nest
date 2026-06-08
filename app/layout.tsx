import type { Metadata } from "next";
import { Geist_Mono, Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { BigFooter } from "@/components/v2/BigFooter";
import { ScrollProgress } from "@/components/v2/ScrollProgress";
import { FloatingBookButton } from "@/components/v2/FloatingBookButton";
import { IntroLoader } from "@/components/v2/IntroLoader";
import { MorphingWordmark } from "@/components/v2/MorphingWordmark";
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

// Display / headings — Fraunces: a warm, high-contrast variable serif with
// optical sizing. Reads as quiet luxury (country-house hotel), and its italics
// pair beautifully with the hand-drawn accents.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
    default: `${BRAND.name}. A one-bedroom country retreat in ${BRAND.location}.`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    `A boutique one-bedroom retreat in the heart of ${BRAND.location}. Woodland views, a private courtyard, a luxurious super king bed, and an optional shepherd's hut — set in the peaceful grounds of a country house.`,
  keywords: ["airbnb", "berkshire", "country retreat", "boutique stay", "shepherd's hut", "courtyard", "woodland", "weekend escape", "self-catering"],
  authors: [{ name: "Zoe" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: BRAND.name,
    title: `${BRAND.name}. A one-bedroom country retreat in ${BRAND.location}.`,
    description: `A boutique one-bedroom retreat in the Berkshire countryside — super king bed, fully equipped kitchen, walk-in shower, private courtyard. An optional shepherd's hut sleeps two more.`,
    images: [
      {
        url: "/images/squirrels-nest/sq-12.jpg",
        width: 1280,
        height: 800,
        alt: `${BRAND.name}, the red headboard bedroom`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: "A one-bedroom boutique retreat in the Berkshire countryside.",
    images: ["/images/squirrels-nest/sq-12.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${switzer.variable} ${fraunces.variable} ${geistMono.variable} antialiased`}
    >
      <body>
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
          <MorphingWordmark />
          <main>{children}</main>
          <BigFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
