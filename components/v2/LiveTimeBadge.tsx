"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin);
}

/**
 * Small badge in the nav showing live time at the cabin + a rotating mood.
 * Uses GSAP ScrambleTextPlugin so when the time tick changes or the mood
 * line swaps, the new text scrambles through random letters before settling.
 */

const MOODS = [
  "rain on the corrugated roof",
  "kettle just clicked off",
  "kitchen window's open",
  "logs on, fire's catching",
  "sheep on the far field",
  "stars out tonight",
];

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function LiveTimeBadge() {
  const [time, setTime] = useState<string>("");
  const [moodIdx, setMoodIdx] = useState(0);
  const timeRef = useRef<HTMLSpanElement>(null);
  const moodRef = useRef<HTMLSpanElement>(null);

  // Initial mount — set time once
  useEffect(() => {
    setTime(formatTime(new Date()));
  }, []);

  // Tick the clock every 30s. When the displayed time CHANGES, scramble.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.setInterval(() => {
      const next = formatTime(new Date());
      if (next !== time) setTime(next);
    }, 30 * 1000);
    return () => clearInterval(id);
  }, [time]);

  // Animate scramble whenever `time` changes
  useEffect(() => {
    if (!timeRef.current || !time) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      timeRef.current.textContent = time;
      return;
    }
    gsap.to(timeRef.current, {
      duration: 0.7,
      scrambleText: {
        text: time,
        chars: "0123456789",
        revealDelay: 0.05,
        speed: 0.5,
      },
    });
  }, [time]);

  // Cycle mood every 6s + scramble each swap
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.setInterval(() => {
      setMoodIdx((i) => (i + 1) % MOODS.length);
    }, 6 * 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!moodRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      moodRef.current.textContent = `· ${MOODS[moodIdx]}`;
      return;
    }
    gsap.to(moodRef.current, {
      duration: 1.0,
      scrambleText: {
        text: `· ${MOODS[moodIdx]}`,
        chars: "lowerCase",
        revealDelay: 0.1,
        speed: 0.45,
      },
    });
  }, [moodIdx]);

  if (!time) return null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.65rem",
        fontFamily: "var(--font-geist)",
        fontSize: "0.7rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--v2-ink-soft)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "0.45rem",
          height: "0.45rem",
          borderRadius: "50%",
          background: "var(--v2-ink)",
          animation: "live-pulse 2.4s ease-in-out infinite",
          display: "inline-block",
        }}
      />
      <span>
        At the cabin · <span ref={timeRef}>{time}</span>
      </span>
      <span
        ref={moodRef}
        style={{
          opacity: 0.7,
          fontStyle: "italic",
          textTransform: "none",
          letterSpacing: "0.01em",
          fontFamily: "var(--font-cormorant)",
          fontSize: "0.85rem",
        }}
      >
        · {MOODS[moodIdx]}
      </span>
      <style jsx>{`
        @keyframes live-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.35); }
        }
      `}</style>
    </span>
  );
}
