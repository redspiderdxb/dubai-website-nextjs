import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchPosts } from "../../lib/api";

export default function BlogStats({ data }) {
  // ============================================
  // BLOG TITLE
  // ============================================

  const blogTitle = data?.blog_title || "From Our Blog";

  // ============================================
  // BLOG POSTS
  // ============================================

  const [blogPosts, setBlogPosts] = useState([]);

  const [blogsLoading, setBlogsLoading] = useState(true);

  // ============================================
  // FETCH LATEST BLOG POSTS
  // ============================================

  useEffect(() => {
    let mounted = true;

    const loadLatestBlogs = async () => {
      try {
        setBlogsLoading(true);

        // Fetch first page from Posts API
        const result = await fetchPosts(1);

        let posts = Array.isArray(result?.posts) ? result.posts : [];

        // ==========================================
        // SORT LATEST FIRST
        // ==========================================

        posts = [...posts].sort((a, b) => {
          const idA = Number(a?.id || 0);
          const idB = Number(b?.id || 0);

          // Higher ID = newer post
          if (idA !== idB) {
            return idB - idA;
          }

          // Fallback to created date
          const dateA = new Date(a?.created_at || 0).getTime();

          const dateB = new Date(b?.created_at || 0).getTime();

          return dateB - dateA;
        });

        // ==========================================
        // ONLY LATEST 3
        // ==========================================

        posts = posts.slice(0, 3);

        if (mounted) {
          setBlogPosts(posts);
        }
      } catch (error) {
        console.error("Error loading latest blog posts:", error);

        if (mounted) {
          setBlogPosts([]);
        }
      } finally {
        if (mounted) {
          setBlogsLoading(false);
        }
      }
    };

    loadLatestBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  // ============================================
  // CLIENT LOGOS
  // ============================================

  const clientLogos =
    data?.client_logos?.length > 0
      ? data.client_logos
      : [
          "1.webp",
          "2.webp",
          "3.webp",
          "4.webp",
          "5.webp",
          "6.webp",
          "7.webp",
          "8.webp",
          "9.webp",
          "10.webp",
          "11.webp",
        ];

  // ============================================
  // STATS
  // ============================================

  const stats =
    data?.stats?.length > 0
      ? data.stats
      : [
          {
            number: "500",
            label: "COMPLETED PROJECTS",
          },
          {
            number: "100",
            label: "5 STAR REVIEWS",
          },
          {
            number: "14",
            label: "YEARS OF EXCELLENCE",
          },
        ];

  // ============================================
  // IMAGE URL HELPER
  // ============================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // ==========================================
    // FULL URL
    // ==========================================

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      // Convert localhost backend URL
      // to live backend URL
      if (imagePath.includes("localhost")) {
        return imagePath.replace(
          "http://localhost/redspider/public",
          "https://redspider.rsworkspace.net/admin/public",
        );
      }

      return imagePath;
    }

    // ==========================================
    // STORAGE IMAGE
    // ==========================================

    if (imagePath.includes("storage/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
        "http://localhost/redspider/public";

      const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

      return `${baseUrl}${cleanPath}`;
    }

    // ==========================================
    // LOCAL ASSETS
    // ==========================================

    if (imagePath.startsWith("assets/") || imagePath.startsWith("/assets/")) {
      return imagePath;
    }

    // ==========================================
    // CLIENT LOGOS
    // ==========================================

    if (!imagePath.includes("/")) {
      return `/assets/img/we-work/${imagePath}`;
    }

    // ==========================================
    // FALLBACK
    // ==========================================

    return imagePath;
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <>
      {/* ==================================================
          BLOG SECTION
      ================================================== */}

      {/* ==================================================
    BLOG SECTION
================================================== */}

      <section
        id="home-blog"
        className="mobile-app-ser section dark-background rs-home-blog-new"
      >
        <div className="container">
          {/* BLOG TITLE */}

          <div
            className="section-title text-center text-white mb-2 aos-init aos-animate"
            data-aos="fade-up"
          >
            <div className="home-blog-title fw-normal">{blogTitle}</div>
          </div>

          {/* BLOG POSTS */}

          <div className="row g-3">
            {blogsLoading ? (
              <div className="col-12 text-center text-white">
                <p>Loading...</p>
              </div>
            ) : blogPosts.length > 0 ? (
              blogPosts.map((post, index) => {
                const imageUrl =
                  getImageUrl(post.image) || "/assets/img/blog/blog-1.webp";
                const isRemote =
                  imageUrl.startsWith("http://") ||
                  imageUrl.startsWith("https://");

                return (
                  <div
                    key={post.id || post.slug || index}
                    className="col-lg-4 col-md-6 aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="rs-blog-text-card">
                      {/* IMAGE */}

                      <div className="blog-img">
                        {isRemote ? (
                          <img
                            src={imageUrl}
                            alt={post.title || post.name || "RedSpider Blog"}
                            className="img-fluid"
                            loading="lazy"
                          />
                        ) : (
                          <Image
                            src={imageUrl}
                            alt={post.title || post.name || "RedSpider Blog"}
                            className="img-fluid"
                            width={400}
                            height={300}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* TITLE */}

                      <div className="rs-blog-post-title">
                        <h4>
                          <a
                            href={`/blog/${post.slug}`}
                            className="rs-blog-link"
                          >
                            {post.title || post.name || "Read Article"}
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center text-white">
                <p>No blog posts available.</p>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================
      STATS
  ================================================== */}

        <div className="container">
          <div className="rs-blog-stats row text-center justify-content-center">
            {stats.map((stat, index) => (
              <div key={index} className="col-3">
                <div>
                  <span
                    className="rs-blog-stat-number purecounter"
                    data-purecounter-start="0"
                    data-purecounter-end={parseInt(stat.number) || 0}
                    data-purecounter-duration="0"
                  >
                    {stat.number}
                  </span>

                  <span className="rs-plus"></span>
                </div>

                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          CLIENT LOGOS
      ================================================== */}

      <section
        className="gr-section section pt-0"
        style={{ background: "#000" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="rs-worked-title text-center text-white mb-5">
                We've worked with
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {clientLogos.map((logo, index) => {
              const logoUrl = getImageUrl(logo);
              const isRemote =
                logoUrl.startsWith("http://") || logoUrl.startsWith("https://");

              return (
                <div key={index} className="col-lg-2">
                  <div
                    className="g-review-wrap text-center rs-logo-hover"
                    data-aos="fade-up"
                  >
                    <div className="rs-logo-hover__item">
                      {isRemote ? (
                        <img
                          src={logoUrl}
                          alt={`RedSpider client logo ${index + 1}`}
                          className="img-fluid"
                          loading="lazy"
                          width="150"
                          height="80"
                        />
                      ) : (
                        <Image
                          src={logoUrl}
                          alt={`RedSpider client logo ${index + 1}`}
                          className="img-fluid"
                          width={150}
                          height={80}
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          REVIEWS
      ================================================== */}

      <section className="gr-section light-background section pt-5 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="g-review-wrap text-center" data-aos="fade-up">
                <Image
                  src="/assets/img/reviewimg.webp"
                  alt="Google reviews and client testimonials"
                  className="img-fluid"
                  width={800}
                  height={400}
                  sizes="100vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
