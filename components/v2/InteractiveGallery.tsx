"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Interactive gallery — click a photo to open a full-screen lightbox with
 * arrow key navigation. Hover lifts the tile subtly. Modal closes on ESC,
 * outside click, or X button. Cabin-photo themed: editorial grid on cream.
 */

type Photo = { src: string; caption: string; aspect: "portrait" | "landscape" };

const photos: Photo[] = [
  { src: "/images/squirrels-nest/sq-08.jpg", caption: "the cabin", aspect: "landscape" },
  { src: "/images/squirrels-nest/sq-12.jpg", caption: "the bedroom", aspect: "portrait" },
  { src: "/images/squirrels-nest/sq-15.jpg", caption: "yellow chairs", aspect: "portrait" },
  { src: "/images/squirrels-nest/sq-18.jpg", caption: "the sitting room", aspect: "landscape" },
  { src: "/images/squirrels-nest/sq-22.jpg", caption: "the tap", aspect: "portrait" },
  { src: "/images/squirrels-nest/sq-28.jpg", caption: "the screen", aspect: "portrait" },
  { src: "/images/squirrels-nest/sq-30.jpg", caption: "the chandelier", aspect: "landscape" },
  { src: "/images/squirrels-nest/sq-35.jpg", caption: "the kitchen", aspect: "portrait" },
  { src: "/images/squirrels-nest/sq-42.jpg", caption: "the lamps", aspect: "landscape" },
];

export function InteractiveGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    []
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    []
  );

  // Keyboard nav while lightbox open
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    // lock body scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, prev, next]);

  return (
    <section
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "14vh", overflow: "hidden" }}
    >
      <div className="lef-container flex items-center justify-between" style={{ marginBottom: "3rem" }}>
        <span className="sv-eyebrow">05 — A closer look</span>
        <span className="sv-eyebrow">Click any photo</span>
      </div>

      <div
        className="mx-auto grid"
        style={{
          maxWidth: "62rem",
          paddingInline: "clamp(1rem, 4vw, 3rem)",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.5rem",
        }}
      >
        {photos.map((p, i) => {
          // Tighter editorial grid — 4 columns, varied spans, small offsets
          const span = i % 5 === 0 ? 2 : 1;
          const colStart = undefined;
          const topOffset = i % 3 === 1 ? "1.25rem" : i % 3 === 2 ? "0.5rem" : "0";

          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="relative block group"
              style={{
                gridColumn: colStart ? `${colStart} / span ${span}` : `span ${span}`,
                marginTop: topOffset,
                padding: 0,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                appearance: "none",
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              aria-label={`Open photo: ${p.caption}`}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: p.aspect === "portrait" ? "4 / 5" : "3 / 2",
                  borderRadius: "3px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px -22px rgba(55,8,8,0.18)",
                  transition: "box-shadow 320ms ease",
                }}
                className="group-hover:shadow-[0_30px_55px_-25px_rgba(55,8,8,0.32)]"
              >
                <motion.img
                  src={p.src}
                  alt={p.caption}
                  loading={i < 3 ? "eager" : "lazy"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "tween", duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* subtle vignette on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(55,8,8,0.35) 100%)",
                  }}
                />
                {/* caption visible on hover */}
                <span
                  className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    left: "1rem",
                    bottom: "0.85rem",
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.85rem",
                    color: "var(--v2-bg)",
                    letterSpacing: "-0.005em",
                    textShadow: "0 1px 6px rgba(0,0,0,0.4)",
                  }}
                >
                  — {p.caption}
                </span>
              </div>
              {/* persistent small caption beneath each tile */}
              <span
                style={{
                  display: "block",
                  marginTop: "0.55rem",
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.78rem",
                  color: "var(--v2-mute)",
                  letterSpacing: "-0.005em",
                  textAlign: "left",
                }}
              >
                — {p.caption}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(20, 4, 4, 0.85)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(1.5rem, 4vw, 4rem)",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                width: 44,
                height: 44,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
                background: "rgba(255, 249, 235, 0.1)",
                color: "var(--v2-bg)",
                border: "1px solid rgba(255, 249, 235, 0.25)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 249, 235, 0.18)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 249, 235, 0.1)")}
            >
              <X size={18} aria-hidden />
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              style={{
                position: "absolute",
                left: "clamp(0.75rem, 2vw, 2rem)",
                top: "50%",
                transform: "translateY(-50%)",
                width: 48,
                height: 48,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
                background: "rgba(255, 249, 235, 0.1)",
                color: "var(--v2-bg)",
                border: "1px solid rgba(255, 249, 235, 0.25)",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={20} aria-hidden />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              style={{
                position: "absolute",
                right: "clamp(0.75rem, 2vw, 2rem)",
                top: "50%",
                transform: "translateY(-50%)",
                width: 48,
                height: 48,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
                background: "rgba(255, 249, 235, 0.1)",
                color: "var(--v2-bg)",
                border: "1px solid rgba(255, 249, 235, 0.25)",
                cursor: "pointer",
              }}
            >
              <ChevronRight size={20} aria-hidden />
            </button>

            {/* Photo + caption (animated swap on prev/next) */}
            <motion.figure
              key={photos[openIndex].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                maxWidth: "min(85vw, 70rem)",
                maxHeight: "calc(100vh - 8rem)",
                margin: 0,
              }}
            >
              <img
                src={photos[openIndex].src}
                alt={photos[openIndex].caption}
                style={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "75vh",
                  objectFit: "contain",
                  borderRadius: "3px",
                  boxShadow: "0 40px 80px -30px rgba(0,0,0,0.5)",
                }}
              />
              <figcaption
                style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.9rem",
                  color: "var(--v2-bg)",
                  opacity: 0.85,
                  letterSpacing: "-0.005em",
                }}
              >
                — {photos[openIndex].caption} &nbsp;&nbsp;
                <span style={{ opacity: 0.55, fontSize: "0.8rem" }}>
                  {openIndex + 1} / {photos.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
