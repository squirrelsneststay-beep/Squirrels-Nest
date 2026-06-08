import type { Metadata } from "next";
import { Space_Grotesk, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { BigFooter } from "@/components/v2/BigFooter";
import { ScrollProgress } from "@/components/v2/ScrollProgress";
import { FloatingBookButton } from "@/components/v2/FloatingBookButton";
import { SITE_URL, BRAND } from "@/lib/site";

// Display / headings — a modern grotesque, in the spirit of the PP Neue
// Montreal that here-away.com uses. Space Grotesk is the free, OFL stand-in,
// used big for the main things. Variable name kept as --font-italiana so every
// existing `.font-display` heading + inline reference flips automatically.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-italiana",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// The old serif-italic accent lines now reuse the same grotesque (kept on the
// --font-cormorant variable so they update without touching every component).
const spaceGroteskAccent = Space_Grotesk({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
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
      className={`${spaceGrotesk.variable} ${spaceGroteskAccent.variable} ${geist.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ScrollProgress />
        <FloatingBookButton />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <BigFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
