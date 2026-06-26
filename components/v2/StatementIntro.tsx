"use client";

import Image from "next/image";
import { Reveal } from "@/components/v2/Reveal";
import { ScrollType } from "@/components/v2/ScrollType";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * The opening editorial beat after the hero. A large, confident statement set
 * against the dark, with one tall photograph offset to the right. Asymmetric,
 * unhurried, gallery-like.
 */
export function StatementIntro() {
  return (
    <section
      style={{
        background: "var(--v2-bg)",
        color: "var(--v2-ink)",
        paddingBlock: "clamp(7rem, 18vh, 16rem)",
      }}
    >
      <div
        className="si-grid mx-auto"
        style={{
          maxWidth: "84rem",
          paddingInline: "clamp(1.5rem, 4vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 0.85fr)",
          gap: "clamp(2.5rem, 6vw, 7rem)",
          alignItems: "center",
        }}
      >
        <div>
          <Reveal delay={0.08}>
            <h2
              className="font-display"
              style={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: "clamp(2.4rem, 5.2vw, 5.4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                maxWidth: "18ch",
              }}
            >
              Made for slow,{" "}
              <span style={{ fontStyle: "italic", color: "var(--v2-ink-soft)" }}>
                unhurried
              </span>{" "}
              weekends.
            </h2>
          </Reveal>
          <ScrollType
            text="A boutique cabin in the grounds of a Berkshire country house. Hand-finished, quietly luxurious, set against open woodland. Close the gate, and the week falls away."
            style={{
              marginTop: "2rem",
              maxWidth: "26ch",
              fontFamily: "var(--font-geist)",
              fontSize: "clamp(1.25rem, 2vw, 1.7rem)",
              lineHeight: 1.5,
              color: "var(--v2-ink)",
            }}
          />
          <Reveal delay={0.24}>
            <a
              href={AIRBNB_URL}
              {...EXTERNAL_LINK_PROPS}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                marginTop: "2.25rem",
                fontFamily: "var(--font-geist)",
                fontSize: "0.84rem",
                letterSpacing: "0.04em",
                color: "var(--v2-ink)",
                textDecoration: "none",
                borderBottom: "1px solid color-mix(in srgb, var(--v2-ink) 40%, transparent)",
                paddingBottom: "0.25rem",
              }}
            >
              Check availability on Airbnb <span aria-hidden>&rarr;</span>
            </a>
          </Reveal>
        </div>

        <Reveal imgWipe style={{ borderRadius: "5px" }}>
          <span style={{ position: "relative", display: "block", aspectRatio: "3 / 4", borderRadius: "5px", overflow: "hidden" }}>
            <Image
              src="/images/squirrels-nest/sq-18.jpg"
              alt="The sitting room at Squirrels' Nest, with its yellow velvet chairs"
              fill
              sizes="(max-width: 880px) 100vw, 36vw"
              style={{ objectFit: "cover" }}
            />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
