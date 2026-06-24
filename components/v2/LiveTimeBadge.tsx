"use client";

import { useEffect, useState } from "react";

/**
 * Small badge in the nav: live time at the cabin + today's sunset time.
 * Sunset is computed client-side for the cabin's location (Berkshire), so it's
 * always correct for the current day. No external API — pure maths.
 */

// Squirrel's Nest — Berkshire, England (approx).
const LAT = 51.45;
const LNG = -1.07;

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}

/**
 * Sunset for a given date/lat/lng, returned as a Date (UTC instant), using the
 * standard "Almanac for Computers" sunrise/sunset algorithm. Formatting with
 * toLocaleTimeString then renders it in the viewer's timezone (BST/GMT for UK).
 */
function sunsetFor(date: Date): Date | null {
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;
  const zenith = 90.833; // official sunset

  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const N = Math.floor((today - start) / 86400000);

  const lngHour = LNG / 15;
  const t = N + (18 - lngHour) / 24; // 18 = setting

  const M = 0.9856 * t - 3.289;
  let L = M + 1.916 * Math.sin(M * D2R) + 0.02 * Math.sin(2 * M * D2R) + 282.634;
  L = ((L % 360) + 360) % 360;

  let RA = R2D * Math.atan(0.91764 * Math.tan(L * D2R));
  RA = ((RA % 360) + 360) % 360;
  RA = RA + (Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90);
  RA = RA / 15;

  const sinDec = 0.39782 * Math.sin(L * D2R);
  const cosDec = Math.cos(Math.asin(sinDec));

  const cosH = (Math.cos(zenith * D2R) - sinDec * Math.sin(LAT * D2R)) / (cosDec * Math.cos(LAT * D2R));
  if (cosH > 1 || cosH < -1) return null; // sun never sets / never rises

  const H = (R2D * Math.acos(cosH)) / 15;
  const T = H + RA - 0.06571 * t - 6.622;
  let UT = ((T - lngHour) % 24 + 24) % 24;

  const hour = Math.floor(UT);
  const minute = Math.round((UT - hour) * 60);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour, minute));
}

export function LiveTimeBadge() {
  const [time, setTime] = useState<string>("");
  const [sunset, setSunset] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setTime(formatTime(now));
    const s = sunsetFor(now);
    if (s) setSunset(formatTime(s));
  }, []);

  // Tick the clock every 30s; refresh sunset if the day rolls over.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.setInterval(() => {
      const now = new Date();
      setTime((prev) => {
        const next = formatTime(now);
        return next !== prev ? next : prev;
      });
      const s = sunsetFor(now);
      if (s) setSunset((prev) => {
        const next = formatTime(s);
        return next !== prev ? next : prev;
      });
    }, 30 * 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  // Stacked, right-aligned, two balanced lines — "At the cabin · [time]" above
  // "Sunset [time]". No pulsing dot; quiet and symmetrical so it sits cleanly
  // just left of the Book pill.
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.3rem",
        fontFamily: "var(--font-geist)",
        fontSize: "0.66rem",
        lineHeight: 1,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--v2-ink-soft)",
        textAlign: "right",
      }}
    >
      <span>At the cabin · {time}</span>
      {sunset && <span style={{ opacity: 0.7 }}>Sunset {sunset}</span>}
    </span>
  );
}
