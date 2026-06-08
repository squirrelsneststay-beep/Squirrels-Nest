"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ForSale — the "everything's for sale" angle. A dark-green block: much of the
 * furniture and finds in the cabin are Zoe's own and can be bought. Text beside
 * a photo of the pieces, with a quiet way to ask.
 */
export function ForSale() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".fs-reveal", {
        y: 28,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-section-tone="dark"
      style={{
        background: "var(--v2-ink)",
        color: "var(--v2-bg)",
        paddingBlock: "clamp(5rem, 14vh, 11rem)",
        paddingInline: "clamp(1.5rem, 5vw, 5rem)",
        overflow: "hidden",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "82rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(2.5rem, 6vw, 6rem)",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 28rem", maxWidth: "38rem" }}>
          <p
            className="fs-reveal"
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--v2-accent)",
              margin: 0,
            }}
          >
            Zoe&apos;s collection
          </p>
          <h2
            className="fs-reveal font-display"
            style={{
              marginTop: "1.25rem",
              fontSize: "clamp(2rem, 4.4vw, 3.6rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              fontWeight: 600,
              maxWidth: "16ch",
            }}
          >
            A showroom you can sleep in.
          </h2>
          <p
            className="fs-reveal"
            style={{
              marginTop: "1.75rem",
              maxWidth: "36rem",
              fontFamily: "var(--font-geist)",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "color-mix(in srgb, var(--v2-bg) 82%, transparent)",
            }}
          >
            Squirrel&apos;s Nest is also Zoe&apos;s showroom. Much of what fills it is her
            own: the hand-upholstered chairs, the painted lamps, the folding
            screens, the little finds picked up along the way. Nothing is roped
            off, and nothing is precious for the sake of it.
          </p>
          <p
            className="fs-reveal"
            style={{
              marginTop: "1.1rem",
              maxWidth: "36rem",
              fontFamily: "var(--font-geist)",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "color-mix(in srgb, var(--v2-bg) 82%, transparent)",
            }}
          >
            Stay the night, live with the pieces, and if something catches your
            eye, it can come home with you. Just ask, and Zoe will sort the rest.
          </p>
          <a
            href={`mailto:${BRAND.email}?subject=Squirrel's Nest — a piece I'd love to buy`}
            className="fs-reveal"
            style={{
              display: "inline-block",
              marginTop: "2rem",
              fontFamily: "var(--font-geist)",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--v2-accent)",
              textDecoration: "underline",
              textUnderlineOffset: "5px",
              textDecorationThickness: "2px",
            }}
          >
            Ask Zoe about a piece
          </a>
        </div>

        <div
          className="fs-reveal"
          style={{
            flex: "1 1 22rem",
            maxWidth: "28rem",
            position: "relative",
            aspectRatio: "4 / 5",
            borderRadius: "3px",
            overflow: "hidden",
            background: "color-mix(in srgb, var(--v2-bg) 14%, transparent)",
          }}
        >
          <Image
            src="/images/squirrels-nest/sq-18.jpg"
            alt="Hand-upholstered velvet chairs at Squirrels' Nest, available to buy"
            fill
            sizes="(max-width: 768px) 88vw, 28rem"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
