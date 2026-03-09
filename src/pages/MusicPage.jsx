import { useState } from "react";
import { colors, fonts } from "../theme";
import { CONFIG } from "../config";
import { PageHero, StatusBadge, StackPill } from "../components/Shared";

export default function MusicPage() {
  return (
    <div>
      <PageHero bg={CONFIG.backgrounds.music} title="Music" subtitle="Sound & Production" />
      <div style={{ padding: "0 clamp(24px, 5vw, 60px) 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {CONFIG.musicProjects.map((p) => <MusicCard key={p.id} project={p} />)}
        </div>
      </div>
    </div>
  );
}

function MusicCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        background: colors.bgCard,
        border: `1px solid ${hovered ? colors.clay + "44" : colors.border}`,
        borderRadius: 2, overflow: "hidden",
        transition: "border-color 0.25s ease",
      }}
    >
      {/* Album art */}
      <div style={{ position: "relative", width: 190, flexShrink: 0 }}>
        <img
          src={project.cover}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Warm sepia tint */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(158,122,88,0.12)",
          mixBlendMode: "multiply",
        }} />
        {/* Play button on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(15,14,11,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0, transition: "opacity 0.25s ease",
        }}>
          <div style={{
            width: 46, height: 46, borderRadius: "50%",
            border: `2px solid ${colors.tan}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: colors.tan, fontSize: 16, paddingLeft: 3,
          }}>
            ▶
          </div>
        </div>
      </div>

      {/* Details */}
      <div style={{ flex: 1, padding: "26px 28px" }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", marginBottom: 10,
        }}>
          <div>
            <h3 style={{
              fontFamily: fonts.display, fontSize: 25, fontWeight: 700,
              color: colors.textPrimary, margin: "0 0 4px",
            }}>
              {project.title}
            </h3>
            <div style={{
              fontFamily: fonts.mono, fontSize: 10,
              color: colors.clay, letterSpacing: "0.1em",
            }}>
              {project.genre} · {project.year} · {project.tracks} tracks
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p style={{
          fontFamily: fonts.display, fontSize: 15,
          color: colors.textSecondary, lineHeight: 1.7,
          margin: "0 0 18px",
        }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tools.map((t) => <StackPill key={t} label={t} />)}
        </div>
      </div>
    </div>
  );
}
