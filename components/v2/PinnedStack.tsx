"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Slide = {
  eyebrow: string;
  title: string;
  body: string;
  tone: string;
};

const slides: Slide[] = [
  { eyebrow: "001", title: "A cabin at the end of a lane.", body: "Hand-finished pine, a wood-burning stove, and a quiet view across open fields.", tone: "#2f3b34" },
  { eyebrow: "002", title: "A working farm, slowed down.", body: "Walk the lanes at first light. Meet the sheep. Stay out of step with the rest.", tone: "#3d4f44" },
  { eyebrow: "003", title: "An evening that lingers.", body: "Fire lit, dinner unhurried, dark skies above. No screens. Just stillness.", tone: "#262e29" },
  { eyebrow: "004", title: "A morning that's earned.", body: "Wake to mist on the field. A pot of coffee, the door wide open.", tone: "#54635a" },
];

export function PinnedStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${slides.length * 100}%`,
        pin: ".ps-pin",
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(slides.length - 1, Math.floor(self.progress * slides.length));
          setActiveIdx(idx);
        },
      });
      return () => trigger.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="ps-pin relative h-screen overflow-hidden flex items-center" style={{ background: "var(--v2-bg)" }}>
        <div className="v2-container w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Image stack — only the active card visible, with CSS transition */}
            <div className="md:col-span-6 md:col-start-2 relative" style={{ aspectRatio: "4 / 5" }}>
              {slides.map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    background: s.tone,
                    borderRadius: "2px",
                    opacity: i === activeIdx ? 1 : 0,
                    transform: i === activeIdx ? "scale(1)" : "scale(0.96)",
                    transition: "opacity 700ms ease, transform 900ms ease",
                    zIndex: i === activeIdx ? 2 : 1,
                  }}
                />
              ))}
              <div className="absolute -bottom-12 left-0 font-mono-eyebrow" style={{ color: "var(--v2-mute)" }}>
                A short tour — {String(activeIdx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
            </div>

            {/* Text column — same pattern, one active at a time */}
            <div className="md:col-span-4 md:col-start-9 relative" style={{ minHeight: "20rem" }}>
              {slides.map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    opacity: i === activeIdx ? 1 : 0,
                    transform: i === activeIdx ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 600ms ease, transform 700ms ease",
                    pointerEvents: i === activeIdx ? "auto" : "none",
                  }}
                >
                  <span className="font-mono-eyebrow block mb-6" style={{ color: "var(--v2-mute)" }}>
                    {s.eyebrow}
                  </span>
                  <h2
                    className="font-display mb-8"
                    style={{
                      fontSize: "clamp(2rem, 3.6vw, 3.25rem)",
                      color: "var(--v2-ink)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      fontWeight: 400,
                    }}
                  >
                    {s.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "var(--v2-ink-soft)",
                      lineHeight: 1.55,
                      maxWidth: "32ch",
                      fontFamily: "var(--font-geist)",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
