import { useState } from "react";
import { colors, fonts } from "../theme";
import { CONFIG } from "../config";
import { PageHero, ProgressBar, StatusBadge, StackPill } from "../components/Shared";

export default function CodePage() {
  return (
    <div>
      <PageHero bg={CONFIG.backgrounds.code} title="Code" subtitle="Software & Tools" />
      <div style={{ padding: "0 clamp(24px, 5vw, 60px) 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
          gap: 22,
        }}>
          {CONFIG.codeProjects.map((p) => <CodeCard key={p.id} project={p} />)}
        </div>
      </div>
    </div>
  );
}

function CodeCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.bgCard,
        border: `1px solid ${hovered ? project.color + "44" : colors.border}`,
        borderRadius: 2, padding: "30px 26px",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "border-color 0.25s ease, transform 0.3s cubic-bezier(0.25,1,0.5,1)",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 14,
      }}>
        <div>
          <h3 style={{
            fontFamily: fonts.display, fontSize: 26, fontWeight: 700,
            color: colors.textPrimary, margin: "0 0 4px",
          }}>
            {project.title}
          </h3>
          <div style={{
            fontFamily: fonts.mono, fontSize: 10,
            color: project.color, letterSpacing: "0.1em",
          }}>
            {project.subtitle}
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Description */}
      <p style={{
        fontFamily: fonts.display, fontSize: 15,
        color: colors.textSecondary, lineHeight: 1.7,
        margin: "0 0 22px",
      }}>
        {project.description}
      </p>

      {/* Progress */}
      <div style={{ marginBottom: 18 }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontFamily: fonts.mono, fontSize: 9,
          color: colors.textMuted, letterSpacing: "0.14em",
          textTransform: "uppercase", marginBottom: 8,
        }}>
          <span>Progress</span>
          <span style={{ color: project.color }}>{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} color={project.color} />
      </div>

      {/* Stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {project.stack.map((s) => <StackPill key={s} label={s} />)}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 18 }}>
        <NavLink label="VIEW →" href={project.link} color={project.color} />
        <NavLink label="GITHUB →" href={project.github} color={colors.textMuted} />
      </div>
    </div>
  );
}

function NavLink({ label, href, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: fonts.mono, fontSize: 10,
        letterSpacing: "0.1em",
        color: hovered ? colors.tan : color,
        transition: "color 0.2s ease",
      }}
    >
      {label}
    </a>
  );
}
