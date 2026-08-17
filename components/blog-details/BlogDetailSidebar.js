import { useEffect, useMemo, useRef, useState } from "react";

/* =====================================================
   HELPERS
===================================================== */

const stripHtml = (html = "") => {
  return String(html)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .trim();
};

const createSlug = (text = "") => {
  return stripHtml(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

/* =====================================================
   EXTRACT H2 / H3
===================================================== */

const extractHeadings = (html = "") => {
  if (!html) return [];

  const headings = [];

  const regex = /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi;

  let match;
  let index = 0;

  while ((match = regex.exec(html)) !== null) {
    const level = match[1].toLowerCase();

    const text = stripHtml(match[3]);

    if (!text) continue;

    const id = `${createSlug(text) || "section"}-${index}`;

    headings.push({
      id,
      text,
      level,
    });

    index++;
  }

  return headings;
};

/* =====================================================
   SIDEBAR
===================================================== */

export default function BlogDetailSidebar({ post }) {
  const [activeId, setActiveId] = useState("");

  const sidebarRef = useRef(null);

  /* ===================================================
     HEADINGS
  ================================================== */

  const headings = useMemo(() => {
    return extractHeadings(post?.content || "");
  }, [post?.content]);

  /* ===================================================
     FORCE STICKY SYSTEM
  ================================================== */

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const sidebar = sidebarRef.current;

    if (!sidebar) return;

    const layout = sidebar.closest(".rs-blog-body-layout");

    if (!layout) return;

    /* =================================================
       CONFIG
    ================================================= */

    const TOP_OFFSET = 11;

    let ticking = false;

    /* =================================================
       RESET
    ================================================= */

    const resetSidebar = () => {
      sidebar.style.position = "";
      sidebar.style.top = "";
      sidebar.style.left = "";
      sidebar.style.width = "";
      sidebar.style.height = "";
      sidebar.style.zIndex = "";
      sidebar.style.margin = "";
      sidebar.style.bottom = "";
    };

    /* =================================================
       MOBILE CHECK
    ================================================= */

    const isMobile = () => {
      return window.innerWidth <= 767;
    };

    /* =================================================
       UPDATE SIDEBAR
    ================================================= */

    const updateSidebar = () => {
      ticking = false;

      if (isMobile()) {
        resetSidebar();

        return;
      }

      const layoutRect = layout.getBoundingClientRect();

      const sidebarRect = sidebar.getBoundingClientRect();

      const sidebarHeight = sidebar.offsetHeight;

      const layoutTop = layoutRect.top + window.scrollY;

      const layoutBottom = layoutTop + layout.offsetHeight;

      const scrollTop = window.scrollY;

      const fixedTop = TOP_OFFSET;

      /* =================================================
         CURRENT SIDEBAR HEIGHT
      ================================================= */

      const sidebarWidth = sidebarRect.width;

      /* =================================================
         START POINT
      ================================================= */

      const startPoint = layoutTop - fixedTop;

      /* =================================================
         END POINT
      ================================================= */

      const maxScroll = layoutBottom - sidebarHeight - fixedTop;

      /* =================================================
         BEFORE START
      ================================================= */

      if (scrollTop < startPoint) {
        sidebar.style.position = "relative";

        sidebar.style.top = "0";
        sidebar.style.left = "0";
        sidebar.style.width = "100%";
        sidebar.style.zIndex = "5";

        return;
      }

      /* =================================================
         REACHED ARTICLE BOTTOM
      ================================================= */

      if (scrollTop >= maxScroll) {
        sidebar.style.position = "absolute";

        sidebar.style.top = `${layout.offsetHeight - sidebarHeight}px`;

        sidebar.style.left = "0";

        sidebar.style.width = "100%";

        sidebar.style.zIndex = "5";

        return;
      }

      /* =================================================
         FIXED
      ================================================= */

      sidebar.style.position = "fixed";

      sidebar.style.top = `${fixedTop}px`;

      sidebar.style.left = `${sidebarRect.left}px`;

      sidebar.style.width = `${sidebarWidth}px`;

      sidebar.style.height = `${sidebarHeight}px`;

      sidebar.style.zIndex = "9999";

      sidebar.style.margin = "0";
    };

    /* =================================================
       SCROLL
    ================================================= */

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateSidebar);

        ticking = true;
      }
    };

    /* =================================================
       RESIZE
    ================================================= */

    const handleResize = () => {
      resetSidebar();

      window.requestAnimationFrame(updateSidebar);
    };

    /* =================================================
       INIT
    ================================================= */

    resetSidebar();

    updateSidebar();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    /* =================================================
       CLEANUP
    ================================================= */

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleResize);

      resetSidebar();
    };
  }, []);

  /* ===================================================
     ACTIVE HEADING
  ================================================== */

  useEffect(() => {
    if (!headings.length) return;

    const handleScroll = () => {
      let current = "";

      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);

        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 150) {
          current = heading.id;
        }
      });

      if (current) {
        setActiveId(current);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  /* ===================================================
     CLICK
  ================================================== */

  const handleClick = (e, id) => {
    e.preventDefault();

    const element = document.getElementById(id);

    if (!element) return;

    const offset = 110;

    const position =
      element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);

    setActiveId(id);
  };

  /* ===================================================
     RENDER
  ================================================== */

  return (
    <aside ref={sidebarRef} className="rs-blog-sidebar">
      <div className="rs-blog-toc">
        {/* TITLE */}

        <div className="rs-toc-title">
          <span className="rs-toc-icon">
            <i className="bi bi-list"></i>
          </span>

          <span>IN THIS ARTICLE</span>
        </div>

        {/* NAVIGATION */}

        {headings.length > 0 ? (
          <nav className="rs-toc-nav">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                    rs-toc-item
                    ${activeId === heading.id ? "active" : ""}
                    ${heading.level === "h3" ? "sub-item" : ""}
                  `}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        ) : (
          <div className="rs-toc-empty">Article sections</div>
        )}
      </div>
    </aside>
  );
}
