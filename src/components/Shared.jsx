import { colors, fonts, statusMeta } from "../theme";

// ─────────────────────────────────────────────
//  PAGE HERO  — full-bleed image header
// ─────────────────────────────────────────────
export function PageHero({ bg, title, subtitle }) {
  return (
    <div style={{ position: "relative", height: 340, overflow: "hidden", marginBottom: 60 }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.28) saturate(0.9) sepia(0.3)",
        transition: "opacity 0.8s ease",
      }} />
      {/* warm vignette overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to bottom, transparent 0%, ${colors.bgDeep} 100%)`,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 0% 100%, rgba(196,168,124,0.06) 0%, transparent 60%)",
      }} />
      <div style={{
        position: "relative", height: "100%",
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 clamp(24px,5vw,60px) 44px",
      }}>
        <div style={{
          fontFamily: fonts.mono, fontSize: 10,
          letterSpacing: "0.32em", color: colors.tan,
          marginBottom: 12, textTransform: "uppercase", opacity: 0.85,
        }}>
          {subtitle}
        </div>
        <h1 style={{
          fontFamily: fonts.display,
          fontSize: "clamp(3rem, 6vw, 5rem)",
          fontWeight: 700, color: colors.textPrimary,
          margin: 0, lineHeight: 1, letterSpacing: "-0.02em",
        }}>
          {title}
        </h1>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  TAG  — small label pill
// ─────────────────────────────────────────────
export function Tag({ label, color }) {
  const c = color || colors.tan;
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px", borderRadius: 2,
      fontFamily: fonts.mono, fontSize: 9,
      letterSpacing: "0.15em", color: c,
      border: `1px solid ${c}33`,
      backgroundColor: `${c}10`,
      textTransform: "uppercase",
      marginRight: 6, marginBottom: 6,
    }}>
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────
//  PROGRESS BAR
// ─────────────────────────────────────────────
export function ProgressBar({ value, color }) {
  const c = color || colors.tan;
  return (
    <div style={{
      height: 2, background: colors.border,
      borderRadius: 1, overflow: "hidden",
    }}>
      <div style={{
        height: "100%", width: `${value}%`,
        background: c, borderRadius: 1,
        transition: "width 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────
//  STATUS BADGE
// ─────────────────────────────────────────────
export function StatusBadge({ status }) {
  const meta = statusMeta[status] || { label: status.toUpperCase(), color: colors.tan };
  return (
    <span style={{
      fontFamily: fonts.mono, fontSize: 9,
      letterSpacing: "0.15em",
      color: meta.color,
      border: `1px solid ${meta.color}44`,
      backgroundColor: `${meta.color}10`,
      padding: "4px 10px", borderRadius: 2,
      textTransform: "uppercase", whiteSpace: "nowrap",
    }}>
      {meta.label}
    </span>
  );
}

// ─────────────────────────────────────────────
//  STACK PILL  — tech / tool label
// ─────────────────────────────────────────────
export function StackPill({ label }) {
  return (
    <span style={{
      fontFamily: fonts.mono, fontSize: 9,
      color: colors.textMuted,
      border: `1px solid ${colors.border}`,
      padding: "3px 8px", borderRadius: 2,
    }}>
      {label}
    </span>
  );
}
