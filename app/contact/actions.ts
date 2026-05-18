"use server";

import { Resend } from "resend";
import { BRAND } from "@/lib/site";

export interface ContactResult {
  ok: boolean;
  error?: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || BRAND.email;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

// Fail-loud warning if we'd silently fall back to Resend's sandbox sender
// in production — it only delivers to the account-owner's verified email
// and silently rate-limits beyond that, so real visitors' messages would
// "succeed" client-side but never reach Zoe.
if (
  process.env.NODE_ENV === "production" &&
  FROM_EMAIL.endsWith("@resend.dev")
) {
  console.error(
    "[contact] CONTACT_FROM_EMAIL is unset in production. Falling back to Resend's sandbox sender — most messages will silently fail to deliver. Verify the squirrelsneststay.co.uk domain in Resend and set CONTACT_FROM_EMAIL=hello@squirrelsneststay.co.uk."
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function safeString(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

export async function submitContact(
  _prev: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  const honeypot = safeString(formData.get("website"), 200);
  if (honeypot.length > 0) {
    return { ok: true };
  }

  const name = safeString(formData.get("name"), 200);
  const email = safeString(formData.get("email"), 320);
  const dates = safeString(formData.get("dates"), 200);
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
