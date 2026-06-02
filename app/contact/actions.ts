"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { BRAND } from "@/lib/site";
import { consume } from "@/lib/rate-limit";

export interface ContactResult {
  ok: boolean;
  error?: string;
}

const isProd = process.env.NODE_ENV === "production";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || BRAND.email;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

// Abuse limits. The form is unauthenticated, so without throttling a bot
// could drain the Resend monthly quota and bury Zoe's inbox. Per-IP stops one
// sender hammering it; the global cap stops a botnet draining the quota fast.
const IP_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 }; // 3 per 10 min per IP
const GLOBAL_LIMIT = { max: 40, windowMs: 60 * 60 * 1000 }; // 40 per hour total

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Trim, length-cap, and (for single-line fields) collapse newlines. Newline
 * collapsing is defense-in-depth: the values are sent as discrete JSON fields
 * to Resend (not raw SMTP), so header injection isn't possible today — but it
 * keeps the subject/from lines clean and safe if the transport ever changes.
 */
function safeString(
  value: FormDataEntryValue | null,
  max: number,
  singleLine = false
): string {
  let out = String(value ?? "").trim();
  if (singleLine) out = out.replace(/[\r\n]+/g, " ");
  return out.slice(0, max);
}

export async function submitContact(
  _prev: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  // Honeypot: bots fill every field; humans never see this one. Discard
  // silently before spending a rate-limit slot on obvious bots.
  const honeypot = safeString(formData.get("website"), 200);
  if (honeypot.length > 0) {
    return { ok: true };
  }

  // Rate limit by caller IP, plus a global backstop.
  const hdrs = await headers();
  const ip =
    (hdrs.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";

  const tooMany: ContactResult = {
    ok: false,
    error: `Thanks — we're getting a lot of messages right now. Please try again in a few minutes, or email ${BRAND.email} directly.`,
  };
  if (!consume(`contact:ip:${ip}`, IP_LIMIT).allowed) return tooMany;
  if (!consume("contact:global", GLOBAL_LIMIT).allowed) return tooMany;

  const name = safeString(formData.get("name"), 200, true);
  const email = safeString(formData.get("email"), 320, true);
  const dates = safeString(formData.get("dates"), 200, true);
  const message = safeString(formData.get("message"), 5000);

  if (!name) return { ok: false, error: "Please tell us your name." };
  if (!email || !EMAIL_RE.test(email)) return { ok: false, error: "That email address doesn't look right." };
  if (!message) return { ok: false, error: "Please add a short message." };

  if (!RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set — form cannot send.");
    return {
      ok: false,
      error: `We can't send messages right now. Please email ${BRAND.email} directly.`,
    };
  }

  // Fail CLOSED in production if the sender is still Resend's sandbox address.
  // The sandbox only delivers to the Resend account owner and silently drops
  // everyone else — so a real guest would see "message sent" while Zoe never
  // receives it. Better to tell them to email directly than to fake success.
  if (isProd && FROM_EMAIL.endsWith("@resend.dev")) {
    console.error(
      "[contact] CONTACT_FROM_EMAIL is the Resend sandbox sender in production. Set CONTACT_FROM_EMAIL to a verified address on squirrelsneststay.co.uk. Refusing to send to avoid silent delivery failure."
    );
    return {
      ok: false,
      error: `We can't send messages right now. Please email ${BRAND.email} directly.`,
    };
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `${BRAND.name} Contact <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `${BRAND.name} — message from ${name}`,
      text: [
        `From: ${name} <${email}>`,
        dates ? `Dates: ${dates}` : null,
        "",
        message,
      ].filter(Boolean).join("\n"),
    });
    if (error) {
      console.error("[contact] Resend returned error:", error);
      return { ok: false, error: `Something went wrong. Please email ${BRAND.email} directly.` };
    }
    return { ok: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] send threw:", msg);
    return { ok: false, error: `Something went wrong. Please email ${BRAND.email} directly.` };
  }
}
