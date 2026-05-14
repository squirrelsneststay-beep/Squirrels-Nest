"use client";

import { useEffect, useRef, useState } from "react";

export function IntroLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.body.style.overflow = "hidden";

    const totalDuration = prefersReducedMotion ? 100 : 2800;
    const t = setTimeout(() => {
      document.body.style.overflow = "";
      setHidden(true);
    }, totalDuration);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
      style={{ background: "var(--lef-cream)", animation: "lef-curtain 2.8s var(--ease-expo) forwards" }}
    >
      <div className="relative flex flex-col items-center gap-6">
        <span
          className="font-mono-eyebrow"
          style={{ color: "var(--lef-moss)", animation: "lef-fadein 0.7s var(--ease-expo) 0.1s both" }}
        >
          est. — the english countryside
        </span>

        <div className="overflow-hidden">
          <h1
            className="font-display text-center"
            style={{
              fontSize: "var(--fs-96)",
              color: "var(--lef-forest)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              animation: "lef-rise 1s var(--ease-expo) 0.2s both",
            }}
          >
            Lane End Farm
          </h1>
        </div>

        <div
          className="h-px w-32 origin-left"
          style={{
            background: "var(--lef-bark)",
            animation: "lef-line 1.2s var(--ease-expo) 1s both",
          }}
        />

        <span
          className="font-mono-eyebrow"
          style={{ color: "var(--lef-bark)", animation: "lef-fadein 0.7s var(--ease-expo) 1.6s both" }}
        >
          a quiet stay
        </span>
      </div>

      <style>{`
        @keyframes lef-fadein {
          from { opacity: 0; transform: translateY(0.5rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lef-rise {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lef-line {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes lef-curtain {
          0%, 75%  { transform: translateY(0); }
          100%     { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
}
