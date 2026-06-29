"use client";

import { Reveal } from "@/components/v2/Reveal";

/**
 * Amenities — the at-a-glance "what's here" grid every good hotel site has.
 * Line-icon + label, three columns, hairline-separated. Confirmed facts only.
 */
type Amenity = { label: string; icon: React.ReactNode };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const AMENITIES: Amenity[] = [
  { label: "Super king bed", icon: (<svg viewBox="0 0 24 24" {...stroke}><path d="M3 17v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4M3 17v2M21 17v2M3 13h18M7 11V9a1 1 0 0 1 1-1h3M13 11V9a1 1 0 0 1 1-1h3" /></svg>) },
  { label: "Fully equipped kitchen", icon: (<svg viewBox="0 0 24 24" {...stroke}><path d="M6 3v7M9 3v7M6 10a3 3 0 0 0 3-3M7.5 10v11M16 3c-1.5 1-2 3-2 5s.5 3 2 3M16 3v18" /></svg>) },
  { label: "Large walk-in shower", icon: (<svg viewBox="0 0 24 24" {...stroke}><path d="M5 21V8a4 4 0 0 1 4-4 4 4 0 0 1 4 4M13 8h6M16 5v3M9 13v.01M12 15v.01M9 17v.01M15 13v.01M12 19v.01M15 17v.01" /></svg>) },
  { label: "Private courtyard", icon: (<svg viewBox="0 0 24 24" {...stroke}><path d="M3 20h18M6 20v-6M18 20v-6M6 14h12M12 4c-2 2-3 4-3 6h6c0-2-1-4-3-6Z" /></svg>) },
  { label: "Free WiFi", icon: (<svg viewBox="0 0 24 24" {...stroke}><path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0M12 18.5h.01" /></svg>) },
  { label: "TV", icon: (<svg viewBox="0 0 24 24" {...stroke}><rect x="3" y="5.5" width="18" height="12" rx="1.5" /><path d="M8.5 21h7M12 17.5V21" /></svg>) },
  { label: "Central heating", icon: (<svg viewBox="0 0 24 24" {...stroke}><path d="M12 3c2 3-1 4 0 7M9 7c1 2-.5 2.5 0 4M15 7c1 2-.5 2.5 0 4M12 14a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /></svg>) },
  { label: "Private parking", icon: (<svg viewBox="0 0 24 24" {...stroke}><path d="M5 16v-4l1.5-4h11L19 12v4M5 16h14M5 16v2M19 16v2M7.5 12.5h.01M16.5 12.5h.01" /></svg>) },
  { label: "Woodland views", icon: (<svg viewBox="0 0 24 24" {...stroke}><path d="M12 3 7 11h10L12 3ZM12 8l-4 6h8l-4-6ZM12 14v6" /></svg>) },
  { label: "On-site animals", icon: (<svg viewBox="0 0 24 24" {...stroke}><circle cx="6.5" cy="11" r="1.5" /><circle cx="10" cy="8" r="1.5" /><circle cx="14" cy="8" r="1.5" /><circle cx="17.5" cy="11" r="1.5" /><path d="M8.5 15.5c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5c0 1.6-1.4 2.5-3.5 2.5s-3.5-.9-3.5-2.5Z" /></svg>) },
  { label: "Optional shepherd's hut", icon: (<svg viewBox="0 0 24 24" {...stroke}><path d="M4 20V11l8-5 8 5v9M4 20h16M9 20v-5h6v5M4 11l8 5 8-5" /></svg>) },
];

export function Amenities() {
  return (
    <section
      id="amenities"
      style={{
        background: "var(--v2-bg)",
        color: "var(--v2-ink)",
        paddingBlock: "clamp(6rem, 15vh, 12rem)",
        scrollMarginTop: "5rem",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "80rem", paddingInline: "clamp(1.5rem, 4vw, 4rem)" }}>
        <Reveal>
          <h2 className="font-display" style={titleStyle}>
            Everything you&apos;ll{" "}
            <span style={{ fontStyle: "italic", color: "var(--v2-ink-soft)" }}>need.</span>
          </h2>
        </Reveal>

        <div
          className="am-grid"
          style={{
            marginTop: "clamp(3rem, 6vw, 5rem)",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--v2-line)",
          }}
        >
          {AMENITIES.map((a, i) => (
            <Reveal key={a.label} delay={(i % 3) * 0.06}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.1rem",
                  paddingBlock: "1.6rem",
                  paddingRight: "1rem",
                  borderBottom: "1px solid var(--v2-line)",
                }}
              >
                <span style={{ width: "26px", height: "26px", flex: "none", color: "var(--v2-accent)" }}>
                  {a.icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: "1rem",
                    letterSpacing: "-0.005em",
                    color: "var(--v2-ink)",
                  }}
                >
                  {a.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const titleStyle: React.CSSProperties = {
  margin: "1.5rem 0 0",
  fontSize: "clamp(2.2rem, 4.6vw, 4.2rem)",
  lineHeight: 1.02,
  letterSpacing: "-0.03em",
  fontWeight: 400,
  maxWidth: "18ch",
};
