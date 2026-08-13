import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BlogList({ posts = [], pagination = {} }) {
  // ============================================
  // SETTINGS
  // ============================================

  const POSTS_PER_PAGE = 10;

  // ============================================
  // STATES
  // ============================================

  const [allPosts, setAllPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  // ============================================
  // SORT LATEST FIRST
  // ============================================
  // Newest ID first
  // If ID is same, newest created_at first
  //
  // Example:
  // 786
  // 785
  // 784
  // 783
  // ...
  // ============================================

  const sortLatestFirst = (items = []) => {
    return [...items].sort((a, b) => {
      const idA = Number(a?.id || 0);
      const idB = Number(b?.id || 0);

      // First priority: ID
      if (idA !== idB) {
        return idB - idA;
      }

      // Second priority: created_at
      const dateA = new Date(a?.created_at || 0).getTime();
      const dateB = new Date(b?.created_at || 0).getTime();

      return dateB - dateA;
    });
  };

  // ============================================
  // LOAD ALL BLOGS
  // ============================================
  // IMPORTANT:
  // Only ONE API request.
  //
  // Previously:
  // page=1
  // page=2
  // page=3
  // ...
  // page=52
  //
  // Now:
  // per_page=1000
  //
  // So only ONE request is made.
  // ============================================

  useEffect(() => {
    let cancelled = false;

    const loadAllBlogs = async () => {
      try {
        setLoading(true);

        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

        // ========================================
        // ONE API REQUEST ONLY
        // ========================================

        const response = await fetch(`${API_URL}/posts?page=1&per_page=1000`, {
          headers: {
            Accept: "application/json",
            "X-API-KEY": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Blog API error: ${response.status}`);
        }

        const json = await response.json();

        if (cancelled) {
          return;
        }

        // ========================================
        // GET POSTS
        // ========================================

        const apiPosts = Array.isArray(json?.data) ? json.data : [];

        // ========================================
        // FALLBACK
        // ========================================

        const sourcePosts =
          apiPosts.length > 0 ? apiPosts : Array.isArray(posts) ? posts : [];

        // ========================================
        // REMOVE DUPLICATES
        // ========================================

        const uniquePosts = Array.from(
          new Map(sourcePosts.map((post) => [String(post?.id), post])).values(),
        );

        // ========================================
        // SORT LATEST -> OLDEST
        // ========================================

        const sortedPosts = sortLatestFirst(uniquePosts);

        // ========================================
        // FRONTEND PAGINATION
        // ========================================

        const pages = Math.max(
          1,
          Math.ceil(sortedPosts.length / POSTS_PER_PAGE),
        );

        setAllPosts(sortedPosts);

        setTotalPages(pages);

        setCurrentPage(1);
      } catch (error) {
        console.error("Error loading blogs:", error);

        // ========================================
        // FALLBACK TO SERVER PROPS
        // ========================================

        if (!cancelled) {
          const fallbackPosts = sortLatestFirst(posts || []);

          const pages = Math.max(
            1,
            Math.ceil(fallbackPosts.length / POSTS_PER_PAGE),
          );

          setAllPosts(fallbackPosts);

          setTotalPages(pages);

          setCurrentPage(1);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAllBlogs();

    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================
  // CURRENT PAGE POSTS
  // ============================================

  const visiblePosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;

    return allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [allPosts, currentPage]);

  // ============================================
  // PAGE CHANGE
  // ============================================
  // NO API REQUEST HERE.
  // Because all blogs are already loaded.
  // ============================================

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);

    window.setTimeout(() => {
      document.getElementById("blog-posts")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  // ============================================
  // PAGINATION NUMBERS
  // ============================================

  const pageNumbers = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(page);
    }
  } else {
    // ========================================
    // FIRST 3
    // ========================================

    pageNumbers.push(1);
    pageNumbers.push(2);
    pageNumbers.push(3);

    // ========================================
    // MIDDLE
    // ========================================

    if (currentPage > 4 && currentPage < totalPages - 3) {
      pageNumbers.push("ellipsis-start");

      pageNumbers.push(currentPage);

      pageNumbers.push("ellipsis-end");
    } else {
      pageNumbers.push("ellipsis-middle");
    }

    // ========================================
    // LAST 3
    // ========================================

    pageNumbers.push(totalPages - 2);
    pageNumbers.push(totalPages - 1);
    pageNumbers.push(totalPages);
  }

  // ============================================
  // REMOVE DUPLICATES
  // ============================================

  const uniquePageNumbers = pageNumbers.filter((value, index, array) => {
    if (typeof value !== "number") {
      return true;
    }

    return array.indexOf(value) === index;
  });

  // ============================================
  // RENDER
  // ============================================

  return (
    <>
      {/* ==========================================
          BLOG POSTS
      ========================================== */}

      <section id="blog-posts" className="blog-posts section">
        <div className="container">
          {/* ======================================
              ONLY ONE LOADING
          ====================================== */}

          {loading && (
            <div className="blog-pagination-loading">
              <div className="blog-loading-spinner">
                <span></span>
              </div>

              <span>Loading blogs...</span>
            </div>
          )}

          {/* ======================================
              BLOG GRID
          ====================================== */}

          {!loading && (
            <>
              {visiblePosts.length > 0 ? (
                <div className="row gy-4">
                  {visiblePosts.map((post) => (
                    <div key={post.id} className="col-lg-4 col-md-6">
                      <article className="h-100 d-flex flex-column">
                        {/* ==================================
                            IMAGE
                        ================================== */}

                        <div className="post-img position-relative overflow-hidden">
                          <Image
                            src={
                              post.image || "/assets/img/blog-placeholder.jpg"
                            }
                            alt={post.title || post.name || "Blog Post"}
                            width={600}
                            height={400}
                            className="img-fluid w-100"
                            style={{
                              objectFit: "cover",
                              height: "240px",
                            }}
                            loading="lazy"
                            unoptimized={post.image?.startsWith("http")}
                          />
                        </div>

                        {/* ==================================
                            CATEGORY
                        ================================== */}

                        {post.category && (
                          <p className="post-category mt-3 mb-1">
                            {post.category}
                          </p>
                        )}

                        {/* ==================================
                            TITLE
                        ================================== */}

                        <h2 className="title fs-5 fw-bold">
                          <Link
                            href={`/blog/${post.slug || post.id}`}
                            className="text-dark text-decoration-none stretched-link"
                          >
                            {post.title || post.name || "Untitled Post"}
                          </Link>
                        </h2>

                        {/* ==================================
                            AUTHOR + DATE
                        ================================== */}

                        <div className="d-flex align-items-center mt-auto pt-2">
                          <div className="post-meta">
                            <p className="post-author mb-0 small fw-medium">
                              {post.author?.name || "RedSpider Team"}
                            </p>

                            <p className="post-date mb-0 small text-muted">
                              <time dateTime={post.created_at}>
                                {post.created_at
                                  ? new Date(
                                      post.created_at,
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "Recent"}
                              </time>
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              ) : (
                /* ==================================
                    NO POSTS
                ================================== */

                <div className="text-center py-5">
                  <h4>No blog posts found.</h4>

                  <p className="text-muted">Check back later for updates.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ==========================================
          PAGINATION
          ALWAYS BELOW BLOGS
      ========================================== */}

      {!loading && totalPages > 1 && (
        <section id="blog-pagination" className="blog-pagination section">
          <div className="container">
            <div className="blog-pagination-wrapper">
              {/* ==================================
                  PREVIOUS
              ================================== */}

              <button
                type="button"
                className={`blog-page-arrow ${
                  currentPage <= 1 ? "disabled" : ""
                }`}
                disabled={currentPage <= 1}
                aria-label="Previous page"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              {/* ==================================
                  PAGE NUMBERS
              ================================== */}

              <div className="blog-page-numbers">
                {uniquePageNumbers.map((page, index) => {
                  // =================================
                  // ELLIPSIS
                  // =================================

                  if (typeof page !== "number") {
                    return (
                      <span
                        key={`${page}-${index}`}
                        className="blog-page-ellipsis"
                      >
                        ...
                      </span>
                    );
                  }

                  // =================================
                  // PAGE BUTTON
                  // =================================

                  return (
                    <button
                      key={page}
                      type="button"
                      className={`blog-page-number ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* ==================================
                  NEXT
              ================================== */}

              <button
                type="button"
                className={`blog-page-arrow ${
                  currentPage >= totalPages ? "disabled" : ""
                }`}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
