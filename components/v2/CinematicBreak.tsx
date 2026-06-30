"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * A full-bleed cinematic breath between sections — one atmospheric photograph
 * with a slow parallax drift and a single line of editorial type floating over
 * it. The pause that makes the rest feel considered.
 */
export function CinematicBreak() {
  const innerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (headRef.current) headRef.current.style.opacity = "1";
      return;
    }
    let raf = 0;
    // Cache the section's document position + viewport height so the per-frame
    // scroll handler never calls getBoundingClientRect (which forces a sync
    // reflow on every frame and is what made this section judder under Lenis).
    let docTop = 0;
    let secH = 0;
    let vh = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      docTop = rect.top + window.scrollY;
      secH = el.offsetHeight;
      vh = window.innerHeight;
    };
    const render = () => {
      const rectTop = docTop - window.scrollY;
      // progress -1 (below) -> 1 (above); 0 when centred
      const p = (rectTop + secH / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(-p * 8).toFixed(2)}%, 0) scale(1.1)`;
      // Long luxury fade: the line eases in as the frame rises to centre
      // and eases back out as it leaves.
      if (headRef.current) {
        headRef.current.style.opacity = Math.max(0, 1 - Math.abs(p) * 1.55).toFixed(3);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      data-section-tone="dark"
      style={{
        position: "relative",
        height: "clamp(30rem, 86vh, 56rem)",
        overflow: "hidden",
        background: "var(--v2-ink)",
      }}
    >
      <div ref={innerRef} style={{ position: "absolute", inset: "-9% 0", willChange: "transform", backfaceVisibility: "hidden" }}>
        <Image
          src="/images/squirrels-nest/sq-03.jpg"
          alt="Wisteria climbing the timber-clad country house at Squirrels' Nest"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(28,18,10,0.5) 0%, rgba(28,18,10,0.18) 38%, rgba(28,18,10,0.28) 64%, rgba(28,18,10,0.62) 100%)",
        }}
      />
      <div
        className="mx-auto"
        style={{
          position: "relative",
          height: "100%",
          maxWidth: "70rem",
          paddingInline: "clamp(1.5rem, 4vw, 3.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          ref={headRef}
          className="font-display"
          style={{
            margin: 0,
            textAlign: "center",
            color: "#f3f0e6",
            opacity: 0,
            fontSize: "clamp(2.2rem, 5.5vw, 5.4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            fontWeight: 400,
            maxWidth: "20ch",
            textShadow: "0 2px 40px rgba(0,0,0,0.4)",
          }}
        >
          Escape to the{" "}
          <span style={{ fontStyle: "italic" }}>countryside.</span>
        </h2>
      </div>
    </section>
  );
}
