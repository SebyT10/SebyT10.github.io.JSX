import { useState } from "react";
import { colors, fonts } from "../theme";
import { CONFIG } from "../config";
import { PageHero, Tag } from "../components/Shared";
import { formatDate } from "../utils";

export default function BlogPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]   = useState("all");

  const categories = ["all", ...new Set(CONFIG.blogPosts.map((p) => p.category))];
  const filtered = filter === "all"
    ? CONFIG.blogPosts
    : CONFIG.blogPosts.filter((p) => p.category === filter);

  if (selected) {
    return <BlogPost post={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div>
      <PageHero bg={CONFIG.backgrounds.blog} title="Journal" subtitle="Notes & Process" />

      <div style={{ padding: "0 clamp(24px, 5vw, 60px) 80px" }}>
        {/* Category filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {categories.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  padding: "5px 14px",
                  fontFamily: fonts.mono, fontSize: 9,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  background: active ? colors.sage : "transparent",
                  color: active ? colors.bgDeep : colors.textMuted,
                  border: `1px solid ${active ? colors.sage : colors.border}`,
                  borderRadius: 2, cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Post list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {filtered.map((post, i) => (
            <PostListItem
              key={post.id}
              post={post}
              index={i}
              onClick={() => setSelected(post)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Post list row ─────────────────────────────
function PostListItem({ post, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: `28px 0 28px ${hovered ? "14px" : "0px"}`,
        borderBottom: `1px solid ${colors.border}`,
        cursor: "pointer",
        display: "flex", gap: 28, alignItems: "flex-start",
        transition: "padding-left 0.28s ease",
      }}
    >
      {/* Index number */}
      <div style={{
        fontFamily: fonts.display, fontSize: 44,
        color: colors.border, fontWeight: 700,
        lineHeight: 1, flexShrink: 0, width: 58, textAlign: "right",
        userSelect: "none",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{
          display: "flex", gap: 10, alignItems: "center", marginBottom: 9,
        }}>
          <Tag label={post.category} color={colors.sage} />
          <span style={{
            fontFamily: fonts.mono, fontSize: 9,
            color: colors.textMuted, letterSpacing: "0.1em",
          }}>
            {formatDate(post.date)} · {post.readTime} read
          </span>
        </div>
        <h3 style={{
          fontFamily: fonts.display,
          fontSize: "clamp(1.35rem, 2.4vw, 1.85rem)",
          fontWeight: 700, color: colors.textPrimary,
          margin: "0 0 9px", lineHeight: 1.2,
        }}>
          {post.title}
        </h3>
        <p style={{
          fontFamily: fonts.display, fontSize: 15,
          color: colors.textSecondary, margin: 0,
          lineHeight: 1.65, maxWidth: 620,
        }}>
          {post.excerpt}
        </p>
      </div>

      {/* Arrow */}
      <div style={{
        fontFamily: fonts.mono, fontSize: 17,
        color: colors.sage,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0)" : "translateX(-8px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        alignSelf: "center", flexShrink: 0,
      }}>
        →
      </div>
    </div>
  );
}

// ── Full post reader ──────────────────────────
function BlogPost({ post, onBack }) {
  const paragraphs = post.content.split("\n\n");

  return (
    <div>
      <PageHero
        bg={CONFIG.backgrounds.blog}
        title={post.title}
        subtitle={`${post.category} · ${formatDate(post.date)}`}
      />
      <div style={{
        padding: "0 clamp(24px, 5vw, 60px) 80px",
        maxWidth: 740, margin: "0 auto",
      }}>
        {/* Back button */}
        <BackBtn onClick={onBack} label="← All Posts" />

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 }}>
          {post.tags.map((t) => <Tag key={t} label={t} color={colors.sage} />)}
        </div>

        {/* Body */}
        <div style={{
          fontFamily: fonts.display,
          fontSize: "clamp(1rem, 1.45vw, 1.12rem)",
          color: colors.textSecondary, lineHeight: 1.88,
        }}>
          {paragraphs.map((para, i) => {
            if (para.startsWith("**") && para.endsWith("**")) {
              return (
                <h3 key={i} style={{
                  fontFamily: fonts.display,
                  fontSize: "1.45em", fontWeight: 700,
                  color: colors.textPrimary,
                  margin: "2em 0 0.55em",
                }}>
                  {para.replace(/\*\*/g, "")}
                </h3>
              );
            }
            return <p key={i} style={{ margin: "0 0 1.4em" }}>{para}</p>;
          })}
        </div>

        {/* Footer meta */}
        <div style={{
          marginTop: 60, paddingTop: 28,
          borderTop: `1px solid ${colors.border}`,
          display: "flex", justifyContent: "space-between",
          fontFamily: fonts.mono, fontSize: 9,
          color: colors.textMuted, letterSpacing: "0.1em",
        }}>
          <span>{post.readTime} read</span>
          <span>{formatDate(post.date)}</span>
        </div>

        <BackBtn onClick={onBack} label="← All Posts" style={{ marginTop: 36 }} />
      </div>
    </div>
  );
}

function BackBtn({ onClick, label, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none", border: "none", padding: 0,
        fontFamily: fonts.mono, fontSize: 10,
        color: hovered ? colors.tan : colors.textMuted,
        letterSpacing: "0.2em", cursor: "pointer",
        textTransform: "uppercase",
        transition: "color 0.2s ease",
        display: "block", marginBottom: 44,
        ...style,
      }}
    >
      {label}
    </button>
  );
}
