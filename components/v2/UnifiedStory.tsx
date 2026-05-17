"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * UnifiedStory — savor.it pattern. THREE chapters in one pin.
 *
 * Chapter 1: From the lane — the kettle on — all the way to bed
 * Chapter 2: Without — traffic / signal / neighbours / schedules / rushing
 * Chapter 3: We're hoping for a stay where you find — more / more / more / & more —
 *            good food in the kitchen / quiet on the lane / time you'd forgotten
 *
 * Labels are FIXED at viewport positions with HOLD phases between beats.
 * Photos crossfade anchored to the pin. The "summary" label of each chapter
 * persists into the next chapter by translating up.
 */
export function UnifiedStory() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Chapter 1 elements
      const labelLane = root.querySelector<HTMLElement>(".st-lane");
      const labelKettle = root.querySelector<HTMLElement>(".st-kettle");
      const labelBed = root.querySelector<HTMLElement>(".st-bed");
      const line1 = root.querySelector<SVGPathElement>(".st-line-1");
      const line2 = root.querySelector<SVGPathElement>(".st-line-2");
      const ch1Group = root.querySelector<HTMLElement>(".st-ch1-fadeout");

      // Chapter 2 elements
      const labelWithout = root.querySelector<HTMLElement>(".st-without");
      const listItems = gsap.utils.toArray<HTMLElement>(".st-list-item");
      const ch2Group = root.querySelector<HTMLElement>(".st-ch2-fadeout");

      // Chapter 3 elements
      const ch3Lead = root.querySelector<HTMLElement>(".st-ch3-lead");
      const ch3Curve = root.querySelector<SVGPathElement>(".st-ch3-curve");
      const moreItems = gsap.utils.toArray<HTMLElement>(".st-more-item");
      const rightItems = gsap.utils.toArray<HTMLElement>(".st-right-item");

      // Photos
      const layers = gsap.utils.toArray<HTMLElement>(".st-layer");
      const innerImgs = gsap.utils.toArray<HTMLElement>(".st-layer-inner");
      const fadeAll = root.querySelector<HTMLElement>(".st-fade-all");

      // Initial hidden state
      gsap.set(
        [labelLane, labelKettle, labelBed, labelWithout, ...listItems, ch3Lead, ...moreItems, ...rightItems],
        { opacity: 0, y: 14 }
      );
      [line1, line2, ch3Curve].forEach((p) => {
        if (!p) return;
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      layers.forEach((l, i) => gsap.set(l, { opacity: i === 0 ? 1 : 0 }));
      innerImgs.forEach((el) => gsap.set(el, { scale: 1.16, x: "-2%" }));
      gsap.set(fadeAll, { opacity: 1 });

      if (prefersReducedMotion) {
        gsap.set([labelLane, labelKettle, labelBed, labelWithout, ...listItems, ch3Lead, ...moreItems, ...rightItems], { opacity: 1, y: 0 });
        [line1, line2, ch3Curve].forEach((p) => p && (p.style.strokeDashoffset = "0"));
        layers.forEach((l) => gsap.set(l, { opacity: 1 }));
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=1500%",
          pin: ".st-pin",
          scrub: 1.0,
          anticipatePin: 1,
        },
      });

      // Slow Ken Burns on each photo
      tl.fromTo(innerImgs[0], { scale: 1.16, x: "-2%" }, { scale: 1.0, x: "2%", ease: "power1.inOut", duration: 0.40 }, 0.00);
      tl.fromTo(innerImgs[1], { scale: 1.18, x: "-2.5%" }, { scale: 1.0, x: "2%", ease: "power1.inOut", duration: 0.30 }, 0.30);
      tl.fromTo(innerImgs[2], { scale: 1.20, x: "-3%" }, { scale: 1.0, x: "2%", ease: "power1.inOut", duration: 0.28 }, 0.55);
      tl.fromTo(innerImgs[3], { scale: 1.22, x: "-3%" }, { scale: 1.0, x: "2%", ease: "power1.inOut", duration: 0.25 }, 0.78);

      // ═══════════ CHAPTER 1 (LOCKED — DO NOT CHANGE) ═══════════
      tl.to(labelLane, { opacity: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0.02);
      // HOLD
      if (line1) {
        const len = line1.getTotalLength();
        tl.fromTo(line1, { strokeDashoffset: len }, { strokeDashoffset: 0, ease: "power1.inOut", duration: 0.06 }, 0.10);
      }
      tl.to(labelKettle, { opacity: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0.14);
      // HOLD
      tl.to(layers[0], { opacity: 0, duration: 0.08, ease: "sine.inOut" }, 0.21);
      tl.to(layers[1], { opacity: 1, duration: 0.08, ease: "sine.inOut" }, 0.21);
      if (line2) {
        const len = line2.getTotalLength();
        tl.fromTo(line2, { strokeDashoffset: len }, { strokeDashoffset: 0, ease: "power1.inOut", duration: 0.08 }, 0.23);
      }
      tl.to(labelBed, { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, 0.28);
      // HOLD — chapter 1 visible

      // Chapter 1 → Chapter 2 transition.
      // "all the way to bed" stays at its position then fades out — no translate up.
      tl.to(ch1Group, { opacity: 0, duration: 0.06, ease: "power2.inOut" }, 0.40);
      tl.to(labelBed, { opacity: 0, duration: 0.07, ease: "power2.inOut" }, 0.40);
      tl.to(layers[1], { opacity: 0, duration: 0.07, ease: "sine.inOut" }, 0.44);
      tl.to(layers[2], { opacity: 1, duration: 0.07, ease: "sine.inOut" }, 0.44);

      // ═══════════ CHAPTER 2 ═══════════
      tl.to(labelWithout, { opacity: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0.50);
      listItems.forEach((it, i) => {
        tl.to(it, { opacity: 1, y: 0, duration: 0.035, ease: "power2.out" }, 0.53 + i * 0.025);
      });
      // HOLD — chapter 2 visible

      // Chapter 2 → Chapter 3 transition.
      // Bed translates further up off-screen. Chapter 2 group fades out except
      // the tail of the list (translates up similarly).
      tl.to(ch2Group, { opacity: 0, duration: 0.06, ease: "power2.inOut" }, 0.72);
      // Photo crossfade C → D
      tl.to(layers[2], { opacity: 0, duration: 0.07, ease: "sine.inOut" }, 0.74);
      tl.to(layers[3], { opacity: 1, duration: 0.07, ease: "sine.inOut" }, 0.74);

      // ═══════════ CHAPTER 3 ═══════════
      tl.to(ch3Lead, { opacity: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0.78);
      // Dashed curve descending (we use solid line draw — looks dashed via stroke)
      if (ch3Curve) {
        const len = ch3Curve.getTotalLength();
        tl.fromTo(ch3Curve, { strokeDashoffset: len }, { strokeDashoffset: 0, ease: "power1.inOut", duration: 0.08 }, 0.81);
      }
      // "more" stack appears one by one
      moreItems.forEach((m, i) => {
        tl.to(m, { opacity: 1, y: 0, duration: 0.03, ease: "power2.out" }, 0.85 + i * 0.018);
      });
      // Right-side phrases appear shortly after each "more"
      rightItems.forEach((r, i) => {
        tl.to(r, { opacity: 1, y: 0, duration: 0.03, ease: "power2.out" }, 0.88 + i * 0.025);
      });
      // HOLD — chapter 3 visible

      // Final fade for handoff
      tl.to(fadeAll, { opacity: 0, duration: 0.04, ease: "power2.in" }, 0.97);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative" data-section-tone="dark">
      <div className="st-pin relative h-screen w-full overflow-hidden" style={{ background: "var(--v2-ink)" }}>
        {/* Four sharp photos that crossfade independently */}
        {[
          { src: "/images/zoe-09.jpg", overlay: 0.32 },
          { src: "/images/zoe-02.jpg", overlay: 0.38 },
          { src: "/images/zoe-13.jpg", overlay: 0.50 },
          { src: "/images/squirrels-nest/sq-18.jpg", overlay: 0.35 },
        ].map((p, i) => (
          <div key={i} className="st-layer absolute inset-0" style={{ willChange: "opacity" }}>
            <div className="st-layer-inner absolute inset-0" style={{ willChange: "transform", transformOrigin: "center center" }}>
              <img
                src={p.src}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div aria-hidden className="absolute inset-0" style={{ background: `rgba(0,0,0,${p.overlay})` }} />
          </div>
        ))}

        {/* Eyebrow */}
        <div className="absolute top-0 inset-x-0 z-30 pt-8">
          <div className="lef-container flex items-center justify-between">
            <span className="sv-eyebrow is-light">A short story</span>
            <span className="sv-eyebrow is-light">From the lane to lights out</span>
          </div>
        </div>

        <div className="st-fade-all absolute inset-0 z-20">
          {/* ───────── CHAPTER 1 (LOCKED) ───────── */}
          <div className="st-ch1-fadeout">
            <span
              className="st-lane absolute"
              style={{ left: "12%", top: "33%", transform: "translate(0, -50%)", fontFamily: "var(--font-geist)", fontSize: "1.5rem", fontWeight: 400, color: "var(--v2-bg)", letterSpacing: "-0.01em", whiteSpace: "nowrap", textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
            >
              From the lane
            </span>
            <span
              className="st-kettle absolute"
              style={{ left: "44%", top: "33%", transform: "translate(0, -50%)", fontFamily: "var(--font-geist)", fontSize: "1.5rem", fontWeight: 400, color: "var(--v2-bg)", letterSpacing: "-0.01em", whiteSpace: "nowrap", textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
            >
              the kettle on
            </span>
            <svg
              className="absolute inset-0 pointer-events-none"
              viewBox="0 0 1280 800"
              preserveAspectRatio="none"
              style={{ width: "100%", height: "100%" }}
              aria-hidden
            >
              <path className="st-line-1" d="M 300 264 L 545 264" stroke="#fff9eb" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path className="st-line-2" d="M 745 280 C 820 290, 600 380, 750 415" stroke="#fff9eb" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          <div
            className="st-bed absolute"
            style={{ left: "58%", top: "52%", maxWidth: "26rem", fontFamily: "var(--font-geist)", color: "var(--v2-bg)", textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
          >
            <p style={{ fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.01em", margin: 0 }}>
              all the way to bed.
            </p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.7rem", fontWeight: 300, opacity: 0.92, marginTop: "0.4rem" }}>
              and the door clicks shut.
            </p>
          </div>

          {/* ───────── CHAPTER 2 ───────── */}
          <div className="st-ch2-fadeout">
            <span
              className="st-without absolute"
              style={{ left: "20%", top: "30%", transform: "translate(0, -50%)", fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "2.1rem", fontWeight: 300, color: "var(--v2-bg)", letterSpacing: "-0.02em", textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
            >
              Without
            </span>
            <ul
              className="absolute"
              style={{ left: "32%", top: "30%", transform: "translate(0, -25%)", listStyle: "none", padding: 0, margin: 0, fontFamily: "var(--font-geist)", color: "var(--v2-bg)", textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
            >
              {["traffic", "signal", "neighbours", "schedules", "or rushing"].map((w) => (
                <li
                  key={w}
                  className="st-list-item"
                  style={{ fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.005em", lineHeight: 1.6 }}
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* ───────── CHAPTER 3 (NEW) ───────── */}
          {/* Lead "We're hoping for a stay where you find" — mid-right like savor's "We're talking about a future where there's" */}
          <p
            className="st-ch3-lead absolute"
            style={{
              left: "50%",
              top: "32%",
              transform: "translate(0, -50%)",
              maxWidth: "26rem",
              fontFamily: "var(--font-geist)",
              fontSize: "1.4rem",
              fontWeight: 400,
              color: "var(--v2-bg)",
              letterSpacing: "-0.005em",
              lineHeight: 1.45,
              margin: 0,
              textShadow: "0 1px 12px rgba(0,0,0,0.55)",
            }}
          >
            We&apos;re hoping for a stay where you find
          </p>

          {/* Dashed curve descending from lead down-left toward the "more" stack */}
          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 1280 800"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%" }}
            aria-hidden
          >
            <path
              className="st-ch3-curve"
              d="M 720 280 C 800 360, 380 420, 360 540"
              stroke="#fff9eb"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 8"
            />
          </svg>

          {/* "more / more / more / more / & more" stack — mid-bottom-left, MOVED LEFT so curve doesn't cross */}
          <div
            className="absolute"
            style={{
              left: "32%",
              top: "62%",
              fontFamily: "var(--font-geist)",
              color: "var(--v2-bg)",
              textShadow: "0 1px 12px rgba(0,0,0,0.55)",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["more", "more", "more", "more", "& more"].map((w, i) => (
                <li
                  key={i}
                  className="st-more-item"
                  style={{ fontSize: "1.4rem", fontWeight: 400, letterSpacing: "-0.005em", lineHeight: 1.5 }}
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* Right-side phrases aligned to each "more" */}
          <div
            className="absolute"
            style={{
              left: "42%",
              top: "62%",
              fontFamily: "var(--font-geist)",
              color: "var(--v2-bg)",
              textShadow: "0 1px 12px rgba(0,0,0,0.55)",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "good food in the kitchen",
                "quiet on the lane",
                "long walks before breakfast",
                "time you'd forgotten",
                "room for nothing at all.",
              ].map((w, i) => (
                <li
                  key={i}
                  className="st-right-item"
                  style={{ fontSize: "1.4rem", fontWeight: 400, letterSpacing: "-0.005em", lineHeight: 1.5 }}
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
