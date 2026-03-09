import { useState } from "react";
import { colors, fonts } from "../theme";
import { CONFIG } from "../config";

const NAV_LINKS = [
  { key: "home",        label: "Home" },
  { key: "photography", label: "Photography" },
  { key: "code",        label: "Code" },
  { key: "music",       label: "Music" },
  { key: "creative",    label: "Creative" },
  { key: "blog",        label: "Journal" },
];

export default function Nav({ current, navigate }) {
  const isHome = current === "home";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "20px clamp(24px, 5vw, 60px)",
      background: isHome ? "transparent" : `${colors.bgDeep}ee`,
      backdropFilter: isHome ? "none" : "blur(14px)",
      borderBottom: isHome ? "none" : `1px solid ${colors.border}55`,
      transition: "background 0.4s ease, border-color 0.4s ease",
    }}>
      {/* Wordmark */}
      <button
        onClick={() => navigate("home")}
        style={{
          background: "none", border: "none", padding: 0,
          fontFamily: fonts.display, fontSize: 20, fontWeight: 700,
          color: colors.textPrimary, cursor: "pointer",
          letterSpacing: "0.02em",
        }}
      >
        {CONFIG.owner.name.split(" ")[0]}
        <span style={{ color: colors.tan }}>.</span>
      </button>

      {/* Links */}
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {NAV_LINKS.slice(1).map((l) => {
          const active = current === l.key;
          return (
            <button
              key={l.key}
              onClick={() => navigate(l.key)}
              style={{
                background: "none", border: "none", padding: 0,
                fontFamily: fonts.mono, fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: active ? colors.tan : colors.textMuted,
                cursor: "pointer",
                position: "relative",
                transition: "color 0.2s ease",
              }}
            >
              {l.label}
              {active && (
                <div style={{
                  position: "absolute", bottom: -4,
                  left: 0, right: 0, height: 1,
                  background: colors.tan,
                }} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
