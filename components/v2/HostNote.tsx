"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { HOST_NOTE, HOST_NAME } from "@/lib/owner-facts";

/**
 * "Your host" — a short note from Zoe in her own words. Airbnb stays are
 * host-trust purchases; a named human converts better than another room
 * photo. Small, centred, set like a letter.
 *
 * GATED: renders nothing until HOST_NOTE and HOST_NAME are filled in
 * lib/owner-facts.ts. The note must be Zoe's words, not copywriting.
 */
export function HostNote() {
  if (!HOST_NOTE || !HOST_NAME) return null;

  return (
    <section
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "12vh" }}
    >
      <div
        className="mx-auto text-center"
        style={{ maxWidth: "42rem", paddingInline: "clamp(1.5rem, 4vw, 3.5rem)" }}
      >
        <ScrollReveal>
          <p
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--v2-mute)",
              margin: 0,
            }}
          >
            Your host
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p
            className="font-display"
            style={{
              marginTop: "2rem",
              fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              fontWeight: 400,
              color: "var(--v2-ink)",
            }}
          >
            {HOST_NOTE}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p
            style={{
              marginTop: "1.75rem",
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "1.5rem",
              color: "color-mix(in srgb, var(--v2-ink) 72%, transparent)",
            }}
          >
            {HOST_NAME}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
