import { useState, useCallback, useEffect, useRef } from "react";

import { colors, globalCSS } from "./theme";

import Nav    from "./components/Nav";
import Footer from "./components/Footer";

import HomePage        from "./pages/HomePage";
import PhotographyPage from "./pages/PhotographyPage";
import CodePage        from "./pages/CodePage";
import MusicPage       from "./pages/MusicPage";
import CreativePage    from "./pages/CreativePage";
import BlogPage        from "./pages/BlogPage";

// ─────────────────────────────────────────────
//  PAGE MAP
// ─────────────────────────────────────────────
const PAGES = {
  home:        (nav) => <HomePage navigate={nav} />,
  photography: ()    => <PhotographyPage />,
  code:        ()    => <CodePage />,
  music:       ()    => <MusicPage />,
  creative:    ()    => <CreativePage />,
  blog:        ()    => <BlogPage />,
};

// ─────────────────────────────────────────────
//  ROOT APP
// ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const navigate = useCallback((key) => {
    setPage(key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Inject global CSS once
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const isHome = page === "home";

  return (
    <div style={{
      background: colors.bgDeep,
      minHeight: "100vh",
      color: colors.textPrimary,
    }}>
      <Nav current={page} navigate={navigate} />

      {/* Nav spacer — only when not on home (home has full-height hero) */}
      {!isHome && <div style={{ height: 64 }} />}

      {/* Page content — keyed to trigger slide-in animation on each navigation */}
      <main
        key={page}
        style={{ animation: "fadeSlideIn 0.38s cubic-bezier(0.25, 1, 0.5, 1)" }}
      >
        {PAGES[page]?.(navigate)}
      </main>

      <Footer />
    </div>
  );
}
