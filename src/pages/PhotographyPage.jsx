import { useState, useEffect } from "react";
import { colors, fonts } from "../theme";
import { CONFIG } from "../config";
import { PageHero, Tag } from "../components/Shared";
import { formatDate } from "../utils";

export default function PhotographyPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]   = useState("all");

  const allTags = ["all", ...new Set(CONFIG.photography.flatMap((p) => p.tags))];
  const filtered = filter === "all"
    ? CONFIG.photography
    : CONFIG.photography.filter((p) => p.tags.includes(filter));

  return (
    <div>
      <PageHero bg={CONFIG.backgrounds.photography} title="Photography" subtitle="Visual Archive" />

      <div style={{ padding: "0 clamp(24px, 5vw, 60px) 80px" }}>
        {/* Filter bar */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {allTags.map((t) => {
            const active = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  padding: "5px 14px",
                  fontFamily: fonts.mono, fontSize: 9,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  background: active ? colors.tan : "transparent",
                  color: active ? colors.bgDeep : colors.textMuted,
                  border: `1px solid ${active ? colors.tan : colors.border}`,
                  borderRadius: 2, cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Masonry-style grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: 14,
        }}>
          {filtered.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} onClick={() => setSelected(photo)} />
          ))}
        </div>
      </div>

      {selected && (
        <PhotoLightbox photo={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

// ── Photo card ────────────────────────────────
function PhotoCard({ photo, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer", position: "relative",
        overflow: "hidden", background: colors.bgCard,
        borderRadius: 2,
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 22px 60px rgba(0,0,0,0.5), 0 0 0 1px ${colors.tan}22`
          : `0 4px 20px rgba(0,0,0,0.3)`,
        transition: "transform 0.35s cubic-bezier(0.25,1,0.5,1), box-shadow 0.35s ease",
      }}
    >
      <div style={{ paddingTop: "75%", position: "relative", overflow: "hidden" }}>
        <img
          src={photo.src}
          alt={photo.title}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25,1,0.5,1)",
            filter: hovered ? "brightness(0.7) saturate(0.9)" : "brightness(0.85) saturate(0.95)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 45%, rgba(15,14,11,0.85) 100%)",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 16px" }}>
          <div style={{
            fontFamily: fonts.display, fontSize: 19, fontWeight: 600,
            color: colors.textPrimary, marginBottom: 4,
          }}>
            {photo.title}
          </div>
          <div style={{
            fontFamily: fonts.mono, fontSize: 9,
            color: colors.tan, letterSpacing: "0.18em",
          }}>
            {photo.location}
          </div>
        </div>
      </div>

      <div style={{
        padding: "12px 16px",
        borderTop: `1px solid ${colors.border}`,
        display: "flex", justifyContent: "space-between",
        fontFamily: fonts.mono, fontSize: 9, color: colors.textMuted,
      }}>
        <span>{formatDate(photo.date)}</span>
        <span>{photo.camera}</span>
      </div>
    </div>
  );
}

// ── Lightbox ──────────────────────────────────
function PhotoLightbox({ photo, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(8,7,6,0.96)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex", maxWidth: 1080,
          width: "100%", maxHeight: "90vh",
          background: colors.bgCard,
          boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}
      >
        {/* Image */}
        <div style={{ flex: "1 1 60%", position: "relative", minHeight: 400 }}>
          <img
            src={photo.src}
            alt={photo.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Metadata panel */}
        <div style={{
          flex: "0 0 300px", padding: "34px 28px",
          overflowY: "auto", display: "flex", flexDirection: "column",
          borderLeft: `1px solid ${colors.border}`,
        }}>
          <h2 style={{
            fontFamily: fonts.display, fontSize: 30, fontWeight: 700,
            color: colors.textPrimary, margin: "0 0 6px",
          }}>
            {photo.title}
          </h2>
          <p style={{
            fontFamily: fonts.mono, fontSize: 9,
            color: colors.tan, letterSpacing: "0.2em",
            margin: "0 0 22px", textTransform: "uppercase",
          }}>
            {photo.location}
          </p>
          <p style={{
            fontFamily: fonts.display, fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.7, margin: "0 0 28px",
            fontStyle: "italic",
          }}>
            {photo.description}
          </p>

          {/* EXIF rows */}
          <div style={{ marginBottom: 26 }}>
            {[
              { label: "Date",     value: formatDate(photo.date) },
              { label: "Location", value: photo.location },
              { label: "Camera",   value: photo.camera },
              { label: "Lens",     value: photo.lens },
            ].map((row) => (
              <div key={row.label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "9px 0", borderBottom: `1px solid ${colors.border}`,
              }}>
                <span style={{
                  fontFamily: fonts.mono, fontSize: 9,
                  color: colors.textMuted, letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}>
                  {row.label}
                </span>
                <span style={{
                  fontFamily: fonts.mono, fontSize: 10,
                  color: colors.textSecondary, textAlign: "right", maxWidth: "58%",
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ flexWrap: "wrap" }}>
            {photo.tags.map((t) => <Tag key={t} label={t} />)}
          </div>

          <button
            onClick={onClose}
            style={{
              marginTop: "auto", paddingTop: 24, background: "none", border: "none",
              fontFamily: fonts.mono, fontSize: 10,
              color: colors.textMuted, letterSpacing: "0.2em",
              cursor: "pointer", textTransform: "uppercase", textAlign: "left",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = colors.tan)}
            onMouseLeave={(e) => (e.target.style.color = colors.textMuted)}
          >
            ← Close
          </button>
        </div>
      </div>
    </div>
  );
}
