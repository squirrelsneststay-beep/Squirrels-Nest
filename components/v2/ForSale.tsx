"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/site";
import { HandArrow } from "@/components/v2/HandDrawn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The pieces — furniture and finds, most of which can be bought.
interface Piece {
  src: string;
  alt: string;
  w: string;
  aspect: string;
  rotate: number;
  rate: number; // parallax strength
}

const PIECES: Piece[] = [
  { src: "/images/squirrels-nest/sq-18.jpg", alt: "Hand-upholstered yellow velvet chairs", w: "min(20rem, 60vw)", aspect: "4 / 5", rotate: -2.5, rate: 9 },
  { src: "/images/squirrels-nest/sq-30.jpg", alt: "A painted lamp and gilt mirror", w: "min(13rem, 40vw)", aspect: "3 / 4", rotate: 2.2, rate: -7 },
  { src: "/images/squirrels-nest/sq-25.jpg", alt: "A carved white sideboard", w: "min(16rem, 46vw)", aspect: "3 / 2", rotate: 1.5, rate: -10 },
  { src: "/images/squirrels-nest/sq-42.jpg", alt: "Lamps, flowers and finds on a side table", w: "min(15rem, 44vw)", aspect: "1 / 1", rotate: -1.8, rate: 6 },
];

/**
 * ForSale — "A showroom you can sleep in". Text beside a dynamic, slightly
 * collaged cluster of the pieces, each on its own parallax rate.
 */
export function ForSale() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.from(".fs-reveal", {
        y: 28,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
      gsap.utils.toArray<HTMLElement>(".fs-piece").forEach((el, i) => {
        const p = PIECES[i];
        if (!p) return;
        if (reduced) {
          gsap.set(el, { rotation: 0 });
          return;
        }
        gsap.set(el, { rotation: p.rotate });
        gsap.from(el, {
          y: 50,
          opacity: 0,
          scale: 0.9,
          duration: 1.0,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: ".fs-cluster", start: "top 85%", once: true },
        });
        gsap.to(el, {
          yPercent: p.rate,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
        });
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
          maxWidth: "84rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(2.5rem, 6vw, 5rem)",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 26rem", maxWidth: "36rem" }}>
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
            A showroom you can sleep in
            <span style={{ color: "var(--v2-accent)" }}>.</span>
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
          <span className="fs-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: "2rem" }}>
            <a
              href={`mailto:${BRAND.email}?subject=Squirrel's Nest — a piece I'd love to buy`}
              style={{
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
            <HandArrow color="var(--v2-accent)" size={58} rotate={28} style={{ marginTop: "0.3rem" }} />
          </span>
        </div>

        {/* Dynamic, slightly collaged cluster of pieces */}
        <div
          className="fs-cluster"
          style={{
            flex: "1 1 26rem",
            maxWidth: "36rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(0.8rem, 1.6vw, 1.4rem)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {PIECES.map((p) => (
            <div
              key={p.src}
              className="fs-piece"
              style={{
                position: "relative",
                width: p.w,
                aspectRatio: p.aspect,
                borderRadius: "3px",
                overflow: "hidden",
                background: "color-mix(in srgb, var(--v2-bg) 14%, transparent)",
                boxShadow: "0 30px 60px -34px rgba(0,0,0,0.55)",
                willChange: "transform",
              }}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 60vw, 20rem" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
