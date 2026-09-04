import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BlogList({ posts = [], pagination = {} }) {
  const POSTS_PER_PAGE = 10;

  const categories = [
    "All",
    "SMS Marketing",
    "Digital Marketing",
    "CRM Software",
    "Social Media",
    "Chatbots",
    "Real Estate SEO",
  ];

  const sortLatestFirst = (items = []) => {
    return [...items].sort((a, b) => {
      const idA = Number(a?.id || 0);
      const idB = Number(b?.id || 0);

      if (idA !== idB) {
        return idB - idA;
      }

      const dateA = new Date(a?.created_at || 0).getTime();
      const dateB = new Date(b?.created_at || 0).getTime();

      return dateB - dateA;
    });
  };

  const [blogPosts, setBlogPosts] = useState(() => sortLatestFirst(posts));

  const [paginationData, setPaginationData] = useState(pagination || {});

  const [currentPage, setCurrentPage] = useState(pagination?.current_page || 1);

  const [loading, setLoading] = useState(false);

  /*
   * All blog posts used only for category filtering.
   * Loaded once in the background when the blog page opens.
   */
  const [allFilterPosts, setAllFilterPosts] = useState(null);

  const [filterLoading, setFilterLoading] = useState(false);

  // UI active category only
  const [activeCategory, setActiveCategory] = useState("All");

  const totalPages = Number(paginationData?.last_page) || 1;

  /*
   * Load all blog posts once in the background.
   *
   * This keeps category filtering instant when the user clicks
   * a category because the complete dataset is already available.
   */
  const loadAllFilterPosts = async () => {
    if (allFilterPosts !== null || filterLoading) {
      return;
    }

    try {
      setFilterLoading(true);

      const firstResponse = await fetch("/api/blog?page=1");

      if (!firstResponse.ok) {
        throw new Error(`Blog proxy error: ${firstResponse.status}`);
      }

      const firstResult = await firstResponse.json();

      const filterTotalPages = Number(firstResult?.pagination?.last_page) || 1;

      let combinedPosts = Array.isArray(firstResult?.posts)
        ? [...firstResult.posts]
        : [];

      if (filterTotalPages > 1) {
        const pageRequests = [];

        for (let page = 2; page <= filterTotalPages; page++) {
          pageRequests.push(
            fetch(`/api/blog?page=${page}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Blog proxy error: ${response.status}`);
                }

                return response.json();
              })
              .then((result) =>
                Array.isArray(result?.posts) ? result.posts : [],
              ),
          );
        }

        const remainingPages = await Promise.all(pageRequests);

        remainingPages.forEach((pagePosts) => {
          combinedPosts.push(...pagePosts);
        });
      }

      setAllFilterPosts(sortLatestFirst(combinedPosts));
    } catch (error) {
      console.error("Error preloading blog posts for filters:", error);
    } finally {
      setFilterLoading(false);
    }
  };

  /*
   * Start loading the complete filter dataset as soon as
   * the blog page mounts.
   *
   * This is intentionally separate from category clicking.
   */
  useEffect(() => {
    loadAllFilterPosts();
  }, []);

  /*
   * Category click only changes the active category.
   *
   * No API request happens here because the full filter dataset
   * has already been loaded in the background.
   */
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handlePageChange = async (page) => {
    if (page < 1 || page > totalPages || page === currentPage || loading) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/blog?page=${page}`);

      if (!response.ok) {
        throw new Error(`Blog proxy error: ${response.status}`);
      }

      const result = await response.json();

      const newPosts = sortLatestFirst(result?.posts || []);

      setBlogPosts(newPosts);
      setPaginationData(result?.pagination || {});
      setCurrentPage(result?.pagination?.current_page || page);
      setActiveCategory("All");

      setTimeout(() => {
        document.getElementById("blog-posts")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error("Error changing blog page:", error);
    } finally {
      setLoading(false);
    }
  };

  const pageNumbers = useMemo(() => {
    const pages = [];

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);
    pages.push(2);
    pages.push(3);

    if (currentPage > 4 && currentPage < totalPages - 3) {
      pages.push("ellipsis-start");
      pages.push(currentPage);
      pages.push("ellipsis-end");
    } else if (currentPage >= totalPages - 3) {
      pages.push("ellipsis-start");
    } else {
      pages.push("ellipsis-middle");
    }

    pages.push(totalPages - 2);
    pages.push(totalPages - 1);
    pages.push(totalPages);

    return pages.filter((value, index, array) => {
      if (typeof value !== "number") {
        return true;
      }

      return array.indexOf(value) === index;
    });
  }, [totalPages, currentPage]);

  const categoryFilterKeywords = {
    "SMS Marketing": ["sms marketing", "sms"],

    "Digital Marketing": ["digital marketing"],

    "CRM Software": ["crm software", "crm"],

    "Social Media": ["social media", "social"],

    Chatbots: ["chatbot", "chatbots"],

    "Real Estate SEO": [
      "real estate",
      "real estate website",
      "property",
      "seo",
    ],
  };

  const filteredPosts = useMemo(() => {
    /*
     * Existing All behaviour stays exactly the same.
     */
    if (activeCategory === "All") {
      return blogPosts;
    }

    /*
     * For category filters, use the complete preloaded dataset.
     *
     * While the initial preload is still happening, return an empty
     * array instead of incorrectly filtering only the current 10 posts.
     */
    if (allFilterPosts === null) {
      return [];
    }

    const keywords = categoryFilterKeywords[activeCategory] || [
      activeCategory.toLowerCase(),
    ];

    return allFilterPosts.filter((post) => {
      const titleText = [post?.title, post?.name].filter(Boolean).join(" ");

      const directCategoryText =
        typeof post?.category === "string"
          ? post.category
          : post?.category?.name || post?.category?.title || "";

      const categoryListText = Array.isArray(post?.categories)
        ? post.categories
            .flatMap((category) => {
              if (!category) {
                return [];
              }

              const value = category?.name || category?.title || "";

              return String(value)
                .split("|")
                .map((item) => item.trim());
            })
            .join(" ")
        : "";

      const searchableText = [titleText, directCategoryText, categoryListText]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return keywords.some((keyword) =>
        searchableText.includes(keyword.toLowerCase()),
      );
    });
  }, [blogPosts, allFilterPosts, activeCategory]);

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <section id="blog-posts" className="rs-blog-section">
        <div className="container">
          <div className="rs-blog-empty">
            <h4>No blog posts found.</h4>
            <p>Check back later for updates.</p>
          </div>
        </div>
      </section>
    );
  }

  /*
   * First post = Featured post
   * Remaining posts = Normal cards
   */
  const featuredPost = filteredPosts[0];
  const normalPosts = filteredPosts.slice(1);

  const getCategory = (post) => {
    if (post?.category?.name) {
      return post.category.name;
    }

    if (typeof post?.category === "string") {
      return post.category;
    }

    if (Array.isArray(post?.categories) && post.categories.length > 0) {
      return (
        post.categories[0]?.name ||
        post.categories[0]?.title ||
        "Digital Marketing"
      );
    }

    return "Digital Marketing";
  };

  const getExcerpt = (post, length = 150) => {
    if (post?.excerpt) {
      return post.excerpt;
    }

    if (post?.description) {
      return post.description;
    }

    if (post?.content) {
      const plainText = post.content
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();

      return plainText.length > length
        ? `${plainText.substring(0, length)}...`
        : plainText;
    }

    return "";
  };

  const formatDate = (date) => {
    if (!date) {
      return "Recent";
    }

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getReadingTime = (post) => {
    if (post?.reading_time) {
      return `${post.reading_time} min read`;
    }

    if (post?.readingTime) {
      return `${post.readingTime} min read`;
    }

    const text = post?.content ? post.content.replace(/<[^>]*>/g, "") : "";

    const words = text.trim().split(/\s+/).filter(Boolean).length;

    const minutes = Math.max(1, Math.ceil(words / 200));

    return `${minutes} min read`;
  };

  const renderImage = (post, featured = false) => {
    return (
      <Image
        src={post?.image || "/assets/img/blog-placeholder.webp"}
        alt={post?.title || post?.name || "Blog Post"}
        fill
        sizes={
          featured
            ? "(max-width: 991px) 100vw, 50vw"
            : "(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
        }
        className="rs-blog-card-image"
        unoptimized={post?.image?.startsWith("http")}
      />
    );
  };

  return (
    <>
      <section id="blog-posts" className="rs-blog-section">
        <div className="container">
          {/* =====================================
              CATEGORY FILTER UI
          ====================================== */}

          <div className="rs-blog-categories" data-aos="fade-up">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`rs-blog-category ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* =====================================
              CATEGORY EMPTY STATE
          ====================================== */}

          {activeCategory !== "All" &&
            allFilterPosts !== null &&
            filteredPosts.length === 0 && (
              <div className="rs-blog-empty">
                <h4>No posts in this category yet.</h4>
                <p>Try another topic or browse all articles.</p>
              </div>
            )}

          {/* =====================================
              FEATURED BLOG
          ====================================== */}

          {featuredPost && (
            <article className="rs-blog-featured" data-aos="fade-up">
              <Link
                href={`/blog/${featuredPost.slug || featuredPost.id}`}
                className="rs-blog-featured-image"
              >
                {renderImage(featuredPost, true)}

                <span className="rs-blog-image-overlay"></span>

                <span className="rs-blog-featured-badge">
                  {getCategory(featuredPost)}
                </span>
              </Link>

              <div className="rs-blog-featured-content">
                <span className="rs-blog-featured-label">Featured story</span>

                <div className="rs-blog-meta">
                  <span>
                    <i className="bi bi-calendar3"></i>
                    {formatDate(featuredPost.created_at)}
                  </span>

                  <span className="rs-meta-dot">•</span>

                  <span>
                    <i className="bi bi-clock"></i>
                    {getReadingTime(featuredPost)}
                  </span>
                </div>

                <h2>
                  <Link href={`/blog/${featuredPost.slug || featuredPost.id}`}>
                    {featuredPost.title || featuredPost.name || "Untitled Post"}
                  </Link>
                </h2>

                <p>{getExcerpt(featuredPost, 220)}</p>

                <Link
                  href={`/blog/${featuredPost.slug || featuredPost.id}`}
                  className="rs-blog-read-more"
                >
                  Read Article
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </article>
          )}

          {/* =====================================
              NORMAL BLOG GRID
          ====================================== */}

          {normalPosts.length > 0 && (
            <div className="rs-blog-grid">
              {normalPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="rs-blog-card"
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                >
                  <Link
                    href={`/blog/${post.slug || post.id}`}
                    className="rs-blog-card-image-wrap"
                  >
                    {renderImage(post)}

                    <span className="rs-blog-image-overlay"></span>

                    <span className="rs-blog-card-category">
                      {getCategory(post)}
                    </span>

                    <span className="rs-blog-hover-icon">
                      <i className="bi bi-arrow-up-right"></i>
                    </span>
                  </Link>

                  <div className="rs-blog-card-content">
                    <div className="rs-blog-meta">
                      <span>
                        <i className="bi bi-calendar3"></i>
                        {formatDate(post.created_at)}
                      </span>

                      <span className="rs-meta-dot">•</span>

                      <span>
                        <i className="bi bi-clock"></i>
                        {getReadingTime(post)}
                      </span>
                    </div>

                    <h3>
                      <Link href={`/blog/${post.slug || post.id}`}>
                        {post.title || post.name || "Untitled Post"}
                      </Link>
                    </h3>

                    <p>{getExcerpt(post)}</p>

                    <Link
                      href={`/blog/${post.slug || post.id}`}
                      className="rs-blog-read-more"
                    >
                      Read Article
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================
          LOADING
      ====================================== */}

      {loading && (
        <div className="rs-blog-loading">
          <span className="rs-blog-spinner"></span>
          <span>Loading blogs...</span>
        </div>
      )}

      {/* =====================================
          PAGINATION
      ====================================== */}

      {totalPages > 1 && activeCategory === "All" && (
        <section id="blog-pagination" className="rs-blog-pagination">
          <div className="container">
            <div className="rs-blog-pagination-wrapper">
              <button
                type="button"
                className="rs-blog-page-arrow"
                disabled={currentPage <= 1 || loading}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              <div className="rs-blog-page-numbers">
                {pageNumbers.map((page, index) => {
                  if (typeof page !== "number") {
                    return (
                      <span
                        key={`${page}-${index}`}
                        className="rs-blog-page-ellipsis"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      type="button"
                      disabled={loading}
                      className={`rs-blog-page-number ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="rs-blog-page-arrow"
                disabled={currentPage >= totalPages || loading}
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
