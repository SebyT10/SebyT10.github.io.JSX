import { useState } from "react";
import { colors, fonts } from "../theme";
import { CONFIG } from "../config";
import { PageHero, ProgressBar, StatusBadge } from "../components/Shared";

export default function CreativePage() {
  return (
    <div>
      <PageHero bg={CONFIG.backgrounds.creative} title="Creative" subtitle="Other Worlds" />
      <div style={{ padding: "0 clamp(24px, 5vw, 60px) 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 22,
        }}>
          {CONFIG.creativeProjects.map((p) => <CreativeCard key={p.id} project={p} />)}
        </div>
      </div>
    </div>
  );
}

function CreativeCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.bgCard, borderRadius: 2,
        overflow: "hidden",
        border: `1px solid ${colors.border}`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${colors.tan}22` : "none",
        transition: "transform 0.32s cubic-bezier(0.25,1,0.5,1), box-shadow 0.32s ease",
      }}
    >
      {/* Image */}
      <div style={{ paddingTop: "60%", position: "relative", overflow: "hidden" }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            filter: "brightness(0.88) saturate(0.85) sepia(0.15)",
            transition: "transform 0.6s cubic-bezier(0.25,1,0.5,1)",
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: "22px 20px" }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", marginBottom: 10,
        }}>
          <div>
            <h3 style={{
              fontFamily: fonts.display, fontSize: 21, fontWeight: 600,
              color: colors.textPrimary, margin: "0 0 3px",
            }}>
              {project.title}
            </h3>
            <div style={{
              fontFamily: fonts.mono, fontSize: 9,
              color: colors.sage, letterSpacing: "0.14em",
            }}>
              {project.category} · {project.year}
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p style={{
          fontFamily: fonts.display, fontSize: 14,
          color: colors.textSecondary, lineHeight: 1.65,
          margin: "0 0 16px",
        }}>
          {project.description}
        </p>

        <div>
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontFamily: fonts.mono, fontSize: 9,
            color: colors.textMuted, marginBottom: 7,
          }}>
            <span>PROGRESS</span>
            <span style={{ color: colors.sage }}>{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} color={colors.sage} />
        </div>
      </div>
    </div>
  );
}
