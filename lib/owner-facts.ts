/**
 * Owner-confirmed facts — the single gate for every content section that
 * needs Zoe's sign-off before it can go live.
 *
 * HOW THIS WORKS
 * Every value below starts null / empty. A section component reads its
 * facts from here and renders NOTHING until the value is filled in, so this
 * file can ship to production with the sections dark. When Zoe confirms a
 * fact, fill it in, redeploy, and the section appears. No other wiring.
 *
 * RULE (from FACTS.md): never invent a value. Every entry filled here must
 * come from Zoe or from the live Airbnb listing, verbatim or summarised
 * faithfully. The forwardable question list that gathers these answers is
 * kept outside this repo (it names the client folder layout).
 */

export interface GuestReview {
  /** The quote, ideally word-for-word from the Airbnb review. */
  quote: string;
  /** First name as shown on Airbnb, e.g. "Hannah". */
  name: string;
  /** e.g. "May 2026" — optional. */
  date?: string;
}

export interface AirbnbRating {
  /** e.g. 4.9 — copy from the live listing, keep in sync when it moves. */
  stars: number;
  /** Number of reviews backing it, e.g. 23. */
  count: number;
}

export interface NearbyPlace {
  /** e.g. "The Bell at Aldworth". */
  name: string;
  /** One short line: what it is / why go, e.g. "a proper village pub". */
  note: string;
  /** e.g. "10 min drive" — optional. */
  distance?: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/* ── Social proof ──────────────────────────────────────────────────── */

/** 2–3 real guest quotes, hand-copied from the Airbnb listing. */
export const GUEST_REVIEWS: GuestReview[] = [];

/** The listing's live rating. null until copied from Airbnb. */
export const AIRBNB_RATING: AirbnbRating | null = null;

/* ── Price ─────────────────────────────────────────────────────────── */

/** Nightly from-price in GBP, e.g. 175. null = no price shown anywhere. */
export const FROM_PRICE_GBP: number | null = null;

/* ── Location ──────────────────────────────────────────────────────── */

/** e.g. "On the edge of the North Wessex Downs, near Reading". */
export const LOCATION_LINE: string | null = null;

/** e.g. ["45 min from Oxford", "1 hr from central London"]. */
export const TRAVEL_TIMES: string[] = [];

/** e.g. "Nearest station: Theale (15 min) — direct trains to Paddington". */
export const STATION_LINE: string | null = null;

/* ── Host ──────────────────────────────────────────────────────────── */

/** Zoe's note to guests, in her words, ~40–80 words. */
export const HOST_NOTE: string | null = null;

/** First name for the sign-off, e.g. "Zoe". */
export const HOST_NAME: string | null = null;

/* ── The area ──────────────────────────────────────────────────────── */

/** 4–6 walks / pubs / places, all confirmed by Zoe. */
export const NEARBY_PLACES: NearbyPlace[] = [];

/* ── FAQ ───────────────────────────────────────────────────────────── */

/** 6–8 practical answers. The questions are drafted; answers must be real. */
export const FAQS: FaqEntry[] = [];
