import { useState } from "react";
import { colors, fonts } from "../theme";
import { CONFIG } from "../config";

export default function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${colors.border}`,
      padding: "32px clamp(24px, 5vw, 60px)",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 16,
    }}>
      <div style={{
        fontFamily: fonts.mono, fontSize: 9,
        color: colors.textMuted, letterSpacing: "0.2em",
      }}>
        © {new Date().getFullYear()} {CONFIG.owner.name} — All rights reserved
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        {Object.entries(CONFIG.owner.social).map(([key, href]) => (
          <FooterLink key={key} label={key} href={href} />
        ))}
      </div>
    </footer>
  );
}

function FooterLink({ label, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: fonts.mono, fontSize: 9,
        letterSpacing: "0.15em", textTransform: "uppercase",
        color: hovered ? colors.tan : colors.textMuted,
        transition: "color 0.2s ease",
      }}
    >
      {label}
    </a>
  );
}
