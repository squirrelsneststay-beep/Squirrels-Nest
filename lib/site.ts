/**
 * Single source of truth for brand strings and external destinations.
 * Update here, the whole site updates.
 *
 * Values that change per environment (deploy URL, Airbnb listing) come from
 * NEXT_PUBLIC_* vars and are inlined at build time. Fallbacks keep the site
 * shippable if a var is unset, but production should always set them.
 */

export const BRAND = {
  name: "Squirrels' Nest",
  email: "zoe@squirrelsneststay.co.uk",
  domain: "squirrelsneststay.co.uk",
  location: "West Berkshire",
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || `https://${BRAND.domain}`;

export const AIRBNB_URL =
  process.env.NEXT_PUBLIC_AIRBNB_URL || "https://www.airbnb.co.uk";

// Only expose the Instagram link when a real profile URL is configured. The
// bare instagram.com homepage is treated as "unset" (null) so the footer never
// ships a link that dumps visitors on a login wall.
const rawInstagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
export const INSTAGRAM_URL: string | null =
  rawInstagram && rawInstagram !== "https://www.instagram.com/"
    ? rawInstagram
    : null;

/**
 * Standard attributes for any link opening an external destination in a new
 * tab. Always pair `target="_blank"` with `rel="noopener noreferrer"` to
 * prevent the new page from referencing window.opener and to suppress the
 * Referer header.
 */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};
