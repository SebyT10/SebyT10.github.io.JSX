import { useState, useEffect } from "react";
import { colors, fonts } from "../theme";
import { CONFIG } from "../config";

const SECTIONS = [
  { key: "photography", label: "Photography", icon: "◎", desc: "Landscapes, streets & portraits from the field",     accent: colors.tan   },
  { key: "code",        label: "Code",         icon: "⌥", desc: "Web apps, tools & generative experiments",          accent: colors.sage  },
  { key: "music",       label: "Music",        icon: "♩", desc: "Ambient, electronic & experimental production",     accent: colors.clay  },
  { key: "creative",    label: "Creative",     icon: "✦", desc: "Zines, film, darkroom & other tangents",            accent: "#8a9e8a"    },
  { key: "blog",        label: "Journal",      icon: "✎", desc: "Process notes, updates & long-form writing",       accent: "#a49e8a"    },
];

export default function HomePage({ navigate }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div>
      {/* ── Full-height hero ── */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {/* Background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${CONFIG.backgrounds.home})`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.25) saturate(0.85) sepia(0.35)",
          transform: loaded ? "scale(1)" : "scale(1.06)",
          transition: "transform 2.2s ease, filter 1.8s ease",
        }} />
        {/* Warm gradient overlays */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 15% 85%, ${colors.tan}0e 0%, transparent 55%),
                       linear-gradient(to bottom, transparent 35%, ${colors.bgDeep} 100%)`,
        }} />
        {/* Grain texture overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
        }} />

        {/* Text content */}
        <div style={{
          position: "absolute", bottom: "11vh",
          left: "clamp(24px, 5vw, 80px)", maxWidth: 680,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 1.3s ease 0.25s, transform 1.3s cubic-bezier(0.25,1,0.5,1) 0.25s",
        }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 10,
            letterSpacing: "0.35em", color: colors.tan,
            marginBottom: 20, textTransform: "uppercase", opacity: 0.8,
          }}>
            Portfolio — {new Date().getFullYear()}
          </div>
          <h1 style={{
            fontFamily: fonts.display,
            fontSize: "clamp(4rem, 10vw, 8.5rem)",
            fontWeight: 700, color: colors.textPrimary,
            margin: "0 0 16px", lineHeight: 0.92,
            letterSpacing: "-0.03em",
          }}>
            {CONFIG.owner.name}
          </h1>
          <p style={{
            fontFamily: fonts.display,
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            color: colors.textSecondary, margin: "0 0 28px",
            fontStyle: "italic", lineHeight: 1.5,
          }}>
            {CONFIG.owner.tagline}
          </p>
          <p style={{
            fontFamily: fonts.mono, fontSize: 11,
            color: colors.textMuted, lineHeight: 1.8, maxWidth: 460,
          }}>
            {CONFIG.owner.bio}
          </p>
        </div>

        {/* Vertical scroll cue */}
        <div style={{
          position: "absolute", bottom: 36, right: 48,
          fontFamily: fonts.mono, fontSize: 9,
          color: colors.textMuted, letterSpacing: "0.22em",
          writingMode: "vertical-rl", opacity: loaded ? 0.6 : 0,
          transition: "opacity 1s ease 1.2s",
        }}>
          SCROLL TO EXPLORE
        </div>
      </div>

      {/* ── Section navigation grid ── */}
      <div style={{ padding: "80px clamp(24px, 5vw, 80px)", background: colors.bgDeep }}>
        <div style={{
          fontFamily: fonts.mono, fontSize: 10,
          color: colors.textMuted, letterSpacing: "0.3em",
          marginBottom: 48, textTransform: "uppercase",
        }}>
          Navigate
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          gap: 1, background: colors.border,
        }}>
          {SECTIONS.map((s, i) => (
            <SectionCard key={s.key} section={s} index={i} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionCard({ section, navigate }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => navigate(section.key)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "34px 30px",
        background: hovered ? colors.bgRaised : colors.bgDeep,
        cursor: "pointer", position: "relative", overflow: "hidden",
        transition: "background 0.25s ease",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 2, height: "100%",
        background: section.accent,
        transform: hovered ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "top",
        transition: "transform 0.32s cubic-bezier(0.25, 1, 0.5, 1)",
      }} />

      <div style={{
        fontFamily: fonts.display, fontSize: 34,
        color: section.accent, marginBottom: 14,
        display: "inline-block",
        transform: hovered ? "scale(1.12) translateX(4px)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}>
        {section.icon}
      </div>

      <h3 style={{
        fontFamily: fonts.display, fontSize: 23, fontWeight: 600,
        color: colors.textPrimary, margin: "0 0 9px",
      }}>
        {section.label}
      </h3>
      <p style={{
        fontFamily: fonts.mono, fontSize: 10,
        color: colors.textMuted, margin: 0, lineHeight: 1.65,
      }}>
        {section.desc}
      </p>

      <div style={{
        position: "absolute", bottom: 20, right: 22,
        fontFamily: fonts.mono, fontSize: 17,
        color: section.accent,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0)" : "translateX(-8px)",
        transition: "opacity 0.28s ease, transform 0.28s ease",
      }}>
        →
      </div>
    </div>
  );
}
