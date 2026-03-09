// ─────────────────────────────────────────────
//  UTILS — shared helper functions
// ─────────────────────────────────────────────

export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const clamp = (min, val, max) => Math.min(Math.max(val, min), max);
