import Image from "next/image";

export default function BlogStats({ data, initialBlogPosts = [] }) {
  // ============================================
  // BLOG TITLE
  // ============================================

  const blogTitle = data?.blog_title || "From Our Blog";

  // ============================================
  // BLOG POSTS
  // Server-side / ISR data from pages/index.js
  // ============================================

  const blogPosts = Array.isArray(initialBlogPosts) ? initialBlogPosts : [];

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
  // ============================================
  // IMAGE URL HELPER
  // ============================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    const liveBase =
      process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
      "https://redspider.rsworkspace.net/admin/public";

    // ==========================================
    // FULL URL
    // ==========================================

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      /*
       * Convert any localhost backend URL
       * to the live backend URL.
       *
       * Handles:
       * http://localhost/redspider/public
       * http://localhost/RedSpider/public
       * https://localhost/redspider/public
       * https://localhost/REDSPIDER/public
       */

      if (/^https?:\/\/localhost\/redspider\/public/i.test(imagePath)) {
        return imagePath.replace(
          /^https?:\/\/localhost\/redspider\/public/i,
          liveBase,
        );
      }

      // Already-live/external URL → keep unchanged
      return imagePath;
    }

    // ==========================================
    // STORAGE IMAGE
    // ==========================================

    if (imagePath.includes("storage/")) {
      const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

      return `${liveBase}${cleanPath}`;
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
            <h2 className="home-blog-title rs-process-title">{blogTitle}</h2>
          </div>

          {/* BLOG POSTS */}

          <div className="row g-3">
            {blogPosts.length > 0 ? (
              blogPosts.map((post, index) => {
                const imageUrl =
                  getImageUrl(post.image) || "/assets/img/blog/blog-1.webp";

                const isRemote =
                  imageUrl.startsWith("http://") ||
                  imageUrl.startsWith("https://");

                return (
                  <div
                    key={post.id || post.slug || index}
                    className="col-12 col-md-6 col-lg-4"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="rs-blog-text-card">
                      <div className="blog-img">
                        {isRemote ? (
                          <img
                            src={imageUrl}
                            alt={post.title || post.name || "RedSpider Blog"}
                            loading="lazy"
                          />
                        ) : (
                          <Image
                            src={imageUrl}
                            alt={post.title || post.name || "RedSpider Blog"}
                            width={400}
                            height={300}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        )}
                      </div>

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
          <div className="rs-blog-stats">
            {stats.map((stat, index) => {
              const raw = String(stat.number || "");
              const numeric = raw.replace(/[^\d]/g, "") || "0";
              const suffix = raw.replace(/[\d\s]/g, "") || "+";

              return (
                <div key={index} className="rs-blog-stat-item">
                  <div className="rs-blog-stat-value">
                    <span
                      className="rs-blog-stat-number purecounter"
                      data-purecounter-start="0"
                      data-purecounter-end={parseInt(numeric, 10) || 0}
                      data-purecounter-duration="0"
                    >
                      {numeric}
                    </span>
                    <span className="rs-plus">{suffix}</span>
                  </div>

                  <p>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          CLIENT LOGOS
      ================================================== */}

      <section
        className="gr-section section pt-0 rs-worked-with-sec"
        style={{ background: "#000" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="rs-worked-title rs-process-title text-center text-white mb-5">
                We've worked with
              </h2>
            </div>
          </div>

          <div className="row justify-content-center rs-worked-logos">
            {clientLogos.map((logo, index) => {
              const logoUrl = getImageUrl(logo);

              const isRemote =
                logoUrl.startsWith("http://") || logoUrl.startsWith("https://");

              return (
                <div key={index} className="col-6 col-sm-4 col-lg-2">
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
                          sizes="(max-width: 576px) 50vw, (max-width: 1200px) 25vw, 16vw"
                          loading="lazy"
                          style={{ width: "100%", height: "auto" }}
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
                  style={{ width: "100%", height: "auto" }}
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
