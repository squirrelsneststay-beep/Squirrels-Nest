import type { Metadata } from "next";
import { GalleryClient } from "@/components/v2/GalleryClient";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `A photo gallery of ${BRAND.name}, a boutique one-bedroom cabin retreat in the Berkshire countryside near the Hampshire border — the bedroom, kitchen, walk-in shower, private courtyard and grounds.`,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Gallery | ${BRAND.name}`,
    description: `Photographs of ${BRAND.name}, a cosy boutique cabin retreat in the Berkshire countryside.`,
    images: ["/images/squirrels-nest/sq-12.jpg"],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
