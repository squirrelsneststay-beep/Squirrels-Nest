import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — Cosy Cabin Retreat in the Berkshire Countryside`,
    short_name: BRAND.name,
    description:
      "A cosy one-bedroom boutique cabin retreat in the Berkshire countryside, near Newbury and the North Wessex Downs.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ec",
    theme_color: "#2b2218",
    categories: ["travel", "lifestyle"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
