// ─────────────────────────────────────────────
//  THEME  — earthy, warm, muted palette
//  Edit these tokens to restyle the whole site
// ─────────────────────────────────────────────

export const colors = {
  // Backgrounds
  bgDeep:    "#0f0e0b",   // page background
  bgCard:    "#161410",   // cards & panels
  bgRaised:  "#1d1b16",   // slightly lifted surface
  bgHover:   "#222018",   // hover states

  // Borders
  border:    "#262218",
  borderMid: "#302c22",

  // Typography
  textPrimary:   "#ede6d4",   // headings & bright copy
  textSecondary: "#98907e",   // body text
  textMuted:     "#52493c",   // labels, meta, dim

  // Accent family
  tan:   "#c4a87c",   // warm tan — primary accent
  sage:  "#7a9e6c",   // muted sage green — secondary
  clay:  "#9e7a58",   // earthy clay/terracotta — tertiary
  moss:  "#5a7a52",   // deep moss green

  // Status
  statusLive:       "#7a9e6c",  // sage
  statusInProgress: "#c4a87c",  // tan
  statusPlanning:   "#8a9e8a",  // muted sage-grey
  statusOngoing:    "#9e7a58",  // clay

  // Scrollbar / selection
  scrollThumb:     "#2e2a20",
  selectionBg:     "#c4a87c22",
};

export const fonts = {
  display: "'Cormorant Garamond', serif",
  mono:    "'JetBrains Mono', monospace",
};

// Inject Google Fonts + global CSS resets
export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${colors.bgDeep}; color: ${colors.textPrimary}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${colors.bgDeep}; }
  ::-webkit-scrollbar-thumb { background: ${colors.scrollThumb}; border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: ${colors.tan}; }
  ::selection { background: ${colors.selectionBg}; color: ${colors.textPrimary}; }
  button { cursor: pointer; }
  a { text-decoration: none; }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

export const statusMeta = {
  live:        { label: "LIVE",        color: colors.statusLive },
  released:    { label: "RELEASED",    color: colors.statusLive },
  "in-progress": { label: "IN PROGRESS", color: colors.statusInProgress },
  planning:    { label: "PLANNING",    color: colors.statusPlanning },
  ongoing:     { label: "ONGOING",     color: colors.statusOngoing },
};
