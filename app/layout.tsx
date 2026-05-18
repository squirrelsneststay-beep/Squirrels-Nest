import type { Metadata } from "next";
import { Libre_Baskerville, Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { BigFooter } from "@/components/v2/BigFooter";
import { ScrollProgress } from "@/components/v2/ScrollProgress";

// Display serif — Libre Baskerville. The face Hotellia.framer.website uses
// for its big headlines ("Total escape", "ROOMS", "OFFERS"). Classic
// transitional serif with strong contrast, generous proportions.
// Variable name kept as --font-italiana for backward compat.
const libreBaskerville = Libre_Baskerville({
  variable: "--font-italiana",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://squirrelsnest.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Squirrels' Nest. A converted cabin in the English countryside.",
    template: "%s | Squirrels' Nest",
  },
  description:
    "A slow, considered stay. Squirrels' Nest is a converted cabin on a working farm. Wood-fired, hand-finished, set against open fields and quiet skies.",
  keywords: ["airbnb", "cabin", "english countryside", "weekend escape", "rural retreat", "self-catering"],
  authors: [{ name: "Zoe" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Squirrels' Nest",
    title: "Squirrels' Nest. A converted cabin in the English countryside.",
    description: "Wood-fired, hand-finished. Two bedrooms, sleeps four. A quiet weekend down the lane.",
    images: [
      {
        url: "/images/squirrels-nest/sq-12.jpg",
        width: 1280,
        height: 800,
        alt: "Squirrels' Nest, the red headboard bedroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Squirrels' Nest",
    description: "A converted cabin in the English countryside.",
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
      className={`${libreBaskerville.variable} ${cormorant.variable} ${geist.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ScrollProgress />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <BigFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
