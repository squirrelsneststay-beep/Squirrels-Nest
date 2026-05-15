"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Without [stacked words]" on a dark photographic background.
 *
 * Same Geist sans 0.95rem weight 500 typography as the From-To labels —
 * NOT display serif. White text on dark photo. Each item flicks in as
 * the user scrolls through the pinned section.
 */
export function VerticalStackReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const items = ["traffic", "signal", "noise", "neighbours", "rushing"];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const lead = root.querySelector(".vs-lead");
      const stackItems = gsap.utils.toArray<HTMLElement>(".vs-item");
      const img = root.querySelector(".vs-img");

      gsap.set([lead, ...stackItems], { opacity: 0, y: 12 });

      if (prefersReducedMotion) {
        gsap.set([lead, ...stackItems], { clearProps: "all" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=240%",
          pin: ".vs-pin",
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.fromTo(img, { scale: 1 }, { scale: 1.08, ease: "none" }, 0);
      tl.to(lead, { opacity: 1, y: 0, duration: 0.06 }, 0.08);
      stackItems.forEach((it, i) => {
        tl.to(it, { opacity: 1, y: 0, duration: 0.06, ease: "power3.out" }, 0.2 + i * 0.12);
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative">
      <div className="vs-pin relative h-screen overflow-hidden">
        <div className="vs-img absolute inset-0" style={{ willChange: "transform" }}>
          <img
            src="/images/squirrels-nest/sq-30.jpg"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.55)" }}
        />

        {/* Tiny top eyebrow — consistent with other moments */}
        <div className="absolute top-0 inset-x-0 z-30 pt-8">
          <div className="lef-container flex items-center justify-between">
            <span
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              03 — What you'll find
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              & what you won't
            </span>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-full mx-auto"
            style={{ maxWidth: "44rem", paddingInline: "clamp(1.25rem, 5vw, 4rem)" }}
          >
            <div className="text-center">
              <span
                className="vs-lead block"
                style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#fff",
                  letterSpacing: "0.01em",
                  marginBottom: "1.5rem",
                }}
              >
                Without
              </span>

              <ul className="flex flex-col gap-2 items-center">
                {items.map((w, i) => (
                  <li
                    key={i}
                    className="vs-item"
                    style={{
                      fontFamily: "var(--font-geist)",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      color: "#fff",
                      letterSpacing: "0.01em",
                      lineHeight: 1.5,
                    }}
                  >
                    {w}.
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
