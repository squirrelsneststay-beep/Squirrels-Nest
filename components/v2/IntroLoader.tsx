"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * IntroLoader — a quiet arrival. A deep-green curtain holds the wordmark, a
 * gold rule draws under it, then the curtain lifts to reveal the page. Brief,
 * scroll-locked while it plays, skipped entirely for reduced-motion.
 */
const MARK = "Squirrel's Nest";

export function IntroLoader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
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
      tl.from(".il-letter", { yPercent: 115, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.025 }, 0.1)
        .from(".il-rule", { scaleX: 0, duration: 0.7, ease: "power2.inOut" }, 0.35)
        .to(".il-inner", { opacity: 0, y: -14, duration: 0.45, ease: "power2.in" }, 1.25)
        .to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 1.45);
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
        background: "#0c2a1e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="il-inner" style={{ textAlign: "center", color: "#f3f0e6" }}>
        <div
          className="font-display"
          style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)", letterSpacing: "-0.01em", lineHeight: 1, overflow: "hidden", padding: "0 0.1em" }}
        >
          {MARK.split("").map((c, i) => (
            <span key={i} className="il-letter" style={{ display: "inline-block" }}>
              {c === " " ? " " : c}
            </span>
          ))}
        </div>
        <div
          className="il-rule"
          style={{ height: "1.5px", width: "min(13rem, 46vw)", background: "#ffd400", margin: "1.4rem auto 0", transformOrigin: "center" }}
        />
      </div>
    </div>
  );
}
