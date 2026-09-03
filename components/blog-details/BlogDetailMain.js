import Image from "next/image";
import Link from "next/link";
import BlogDetailSidebar from "./BlogDetailSidebar";

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
   ADD IDS TO H2 / H3
===================================================== */

const prepareBlogContent = (html = "") => {
  if (!html) return "";

  let index = 0;

  return html.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag, attrs, inner) => {
      const cleanText = stripHtml(inner);

      if (!cleanText) {
        return match;
      }

      const id = `${createSlug(cleanText) || "section"}-${index}`;

      index++;

      // Remove existing ID to prevent duplicate IDs
      const cleanedAttrs = attrs.replace(/\s+id=["'][^"']*["']/gi, "");

      return `<${tag}${cleanedAttrs} id="${id}">${inner}</${tag}>`;
    },
  );
};

/* =====================================================
   BLOG DETAIL MAIN
===================================================== */

export default function BlogDetailMain({ post }) {
  /* ===================================================
     EMPTY STATE
  ================================================== */

  if (!post) {
    return (
      <div className="rs-blog-empty">
        <h4>No post data available</h4>
      </div>
    );
  }

  /* ===================================================
     DATE
  ================================================== */

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Recent";

  /* ===================================================
     AUTHOR
  ================================================== */

  const authorName =
    post.author?.name || post.author_name || "RedSpider Editorial";

  /* ===================================================
     CATEGORY
  ================================================== */

  const category =
    post.categories?.[0]?.name ||
    post.category?.name ||
    post.category ||
    "Digital Marketing";

  /* ===================================================
     READING TIME
  ================================================== */

  const plainContent = stripHtml(post.content || "");

  const wordCount = plainContent
    ? plainContent.split(/\s+/).filter(Boolean).length
    : 0;

  const readingTime =
    post.reading_time ||
    post.readingTime ||
    Math.max(1, Math.ceil(wordCount / 200));

  /* ===================================================
     PREPARE CONTENT
  ================================================== */

  const preparedContent = prepareBlogContent(post.content || "");

  /* ===================================================
     RENDER
  ================================================== */

  return (
    <article className="rs-blog-detail">
      {/* =================================================
          BLOG HEADER
      ================================================= */}

      <header className="rs-blog-header">
        {/* CATEGORY */}

        <div className="rs-blog-category">{category}</div>

        {/* TITLE */}

        <h1 className="rs-blog-title">
          {post.title || post.name || "Untitled Post"}
        </h1>

        {/* META */}

        <div className="rs-blog-meta">
          {/* AUTHOR */}

          <div className="rs-blog-author">
            <span className="rs-author-avatar">
              {authorName.charAt(0).toUpperCase()}
            </span>

            <div>
              <strong>{authorName}</strong>

              <small>{category}</small>
            </div>
          </div>

          {/* DATE / READING TIME */}

          <div className="rs-blog-meta-right">
            <span>
              <i className="bi bi-calendar3"></i>
              {formattedDate}
            </span>

            <span>
              <i className="bi bi-clock"></i>
              {readingTime} min read
            </span>
          </div>


          
        </div>
      </header>

      {/* =================================================
          FEATURE IMAGE
      ================================================= */}

      <div className="rs-blog-feature-image">
        <Image
          src={post.image || "/assets/img/blog/blog-1.webp"}
          alt={post.title || "Blog Post"}
          width={1200}
          height={650}
          priority
          className="rs-blog-feature-img"
          unoptimized={post.image?.startsWith("http")}
        />

        <div className="rs-image-caption">{post.title || "Blog Post"}</div>
      </div>

      {/* =================================================
          BLOG BODY
      ================================================= */}

      <div className="rs-blog-body-layout">
        {/* =================================================
            LEFT - STICKY SIDEBAR
        ================================================= */}

        <div className="rs-blog-sidebar-column">
          <BlogDetailSidebar post={post} />
        </div>

        {/* =================================================
            RIGHT - ARTICLE CONTENT
        ================================================= */}

        <div className="rs-blog-content">
          {/* INTRO */}

          {post.description && (
            <div className="rs-blog-intro">{post.description}</div>
          )}

          {/* MAIN CONTENT */}

          {preparedContent ? (
            <div
              className="rs-blog-html"
              dangerouslySetInnerHTML={{
                __html: preparedContent,
              }}
            />
          ) : (
            <p className="text-muted">Full content not available.</p>
          )}

          {/* =================================================
              CATEGORIES / TAGS
          ================================================= */}

          {(post.categories?.length > 0 || post.tags?.length > 0) && (
            <div className="rs-blog-bottom-tags">
              {/* CATEGORIES */}

              {post.categories?.map((cat, index) => (
                <Link
                  key={cat.id || index}
                  href={cat.slug ? `/category/${cat.slug}` : "#"}
                >
                  {cat.name}
                </Link>
              ))}

              {/* TAGS */}

              {post.tags?.map((tag, index) => (
                <Link
                  key={tag.id || index}
                  href={tag.slug ? `/tag/${tag.slug}` : "#"}
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
