"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * IntroLoader — a quiet, Mariven-style arrival. A cream curtain holds the
 * wordmark while a thin brown rule draws across the centre like a progress
 * line, then the curtain lifts to reveal the page. Brief, scroll-locked while
 * it plays, skipped entirely for reduced-motion.
 */
const MARK = "Squirrels' Nest";

export function IntroLoader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Play once per browser session — don't make returning/refreshing visitors
    // sit through the ~2.3s curtain every time.
    let seen = false;
    try { seen = sessionStorage.getItem("sn-intro-seen") === "1"; } catch {}
    if (seen) {
      setDone(true);
      return;
    }
    try { sessionStorage.setItem("sn-intro-seen", "1"); } catch {}

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    if (reduced || !root) {
      document.body.style.overflow = prevOverflow;
      setDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = prevOverflow;
          setDone(true);
        },
      });
      tl.from(".il-letter", { yPercent: 115, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.03 }, 0.1)
        .from(".il-rule", { scaleX: 0, duration: 1.0, ease: "power2.inOut" }, 0.3)
        .to(".il-inner", { opacity: 0, y: -14, duration: 0.5, ease: "power2.in" }, 1.5)
        .to(root, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, 1.7);
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#f7f3ec",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="il-inner" style={{ textAlign: "center", color: "#2b2218", willChange: "transform, opacity" }}>
        <div
          className="font-display"
          style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)", letterSpacing: "-0.01em", lineHeight: 1, overflow: "hidden", padding: "0 0.1em" }}
        >
          {MARK.split("").map((c, i) => (
            <span key={i} className="il-letter" style={{ display: "inline-block", willChange: "transform, opacity" }}>
              {c === " " ? " " : c}
            </span>
          ))}
        </div>
        <div
          className="il-rule"
          style={{ height: "1px", width: "min(16rem, 52vw)", background: "#8a5a2b", margin: "1.6rem auto 0", transformOrigin: "center" }}
        />
      </div>
    </div>
  );
}
