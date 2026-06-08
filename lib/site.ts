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
  // Public contact + where contact-form enquiries are delivered. The form is
  // SENT from a verified address on the domain (CONTACT_FROM_EMAIL), but lands
  // in this Gmail inbox.
  email: "squirrelsneststay@gmail.com",
  domain: "squirrelsneststay.co.uk",
  location: "Berkshire",
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || `https://${BRAND.domain}`;

// The live Airbnb listing. Booking always happens on Airbnb, so every "Book"
// CTA points here. Kept as the default (not just an env var) so it works on
// every deploy; NEXT_PUBLIC_AIRBNB_URL can still override it if the listing
// ever changes. Clean room URL only — no share/session/date params.
export const AIRBNB_URL =
  process.env.NEXT_PUBLIC_AIRBNB_URL ||
  "https://www.airbnb.co.uk/rooms/1703768527913896679";

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

/**
 * A reliable "email us" link. A bare `mailto:` only works when the visitor has
 * a desktop mail app configured — many don't (they use webmail), so the link
 * appears to do nothing. Since the inbox is Gmail, we open Gmail's compose
 * window in a new tab instead, pre-filled with the address (and optional
 * subject). Pair with EXTERNAL_LINK_PROPS so it opens in a new tab.
 */
export function emailComposeUrl(subject?: string): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: BRAND.email });
  if (subject) params.set("su", subject);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
