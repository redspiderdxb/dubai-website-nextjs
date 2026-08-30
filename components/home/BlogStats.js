import Link from "next/link";
import Image from "next/image";
import GoogleReviews from "../ui/GoogleReviews";

export default function BlogStats({
  data,
  initialBlogPosts = [],
  googleReviews = null,
}) {
  const blogTitle = data?.blog_title || "From Our Blog";

  const blogPosts = Array.isArray(initialBlogPosts) ? initialBlogPosts : [];

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

  const stats =
    data?.stats?.length > 0
      ? data.stats
      : [
          { number: "500", label: "Completed Projects" },
          { number: "100", label: "5 Star Reviews" },
          { number: "14", label: "Years of Excellence" },
        ];

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    const liveBase =
      process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
      "https://redspider.rsworkspace.net/admin/public";

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      if (/^https?:\/\/localhost\/redspider\/public/i.test(imagePath)) {
        return imagePath.replace(
          /^https?:\/\/localhost\/redspider\/public/i,
          liveBase,
        );
      }

      return imagePath;
    }

    if (imagePath.includes("storage/")) {
      const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
      return `${liveBase}${cleanPath}`;
    }

    if (imagePath.startsWith("assets/") || imagePath.startsWith("/assets/")) {
      return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    }

    if (!imagePath.includes("/")) {
      return `/assets/img/we-work/${imagePath}`;
    }

    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  };

  return (
    <>
      <section id="home-blog" className="section rs-home-blog">
        <div className="container">
          <div className="rs-home-blog__head text-center" data-aos="fade-up">
            <h2 className="rs-process-title rs-home-blog__title">{blogTitle}</h2>
          </div>

          <div className="rs-home-blog__grid">
            {blogPosts.length > 0 ? (
              blogPosts.map((post, index) => {
                const href = `/blog/${post.slug || post.id}`;
                const imageUrl =
                  getImageUrl(post.image) || "/assets/img/blog/blog-1.webp";
                const isRemote =
                  imageUrl.startsWith("http://") ||
                  imageUrl.startsWith("https://");

                return (
                  <article
                    key={post.id || post.slug || index}
                    className="rs-home-blog__card"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Link href={href} className="rs-home-blog__media">
                      <Image
                        src={imageUrl}
                        alt={post.title || post.name || "RedSpider Blog"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rs-home-blog__image"
                        unoptimized={isRemote}
                      />
                    </Link>

                    <h3 className="rs-home-blog__card-title">
                      <Link href={href}>
                        {post.title || post.name || "Read Article"}
                      </Link>
                    </h3>
                  </article>
                );
              })
            ) : (
              <p className="rs-home-blog__empty">No blog posts available.</p>
            )}
          </div>

          <div className="rs-home-blog__stats" data-aos="fade-up">
            {stats.map((stat, index) => {
              const raw = String(stat.number || "");
              const numeric = raw.replace(/[^\d]/g, "") || "0";
              const suffix = raw.replace(/[\d\s]/g, "") || "+";

              return (
                <div key={index} className="rs-home-blog__stat">
                  <div className="rs-home-blog__stat-value">
                    <span
                      className="purecounter"
                      data-purecounter-start="0"
                      data-purecounter-end={parseInt(numeric, 10) || 0}
                      data-purecounter-duration="1"
                    >
                      {numeric}
                    </span>
                    <span className="rs-home-blog__stat-plus">{suffix}</span>
                  </div>
                  <p>{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="rs-home-clients">
            <div
              className="rs-home-clients__head text-center"
              data-aos="fade-up"
            >
              <h2 className="rs-process-title rs-home-clients__title">
                We&apos;ve worked with
              </h2>
            </div>

            <div className="rs-home-clients__grid">
              {clientLogos.map((logo, index) => {
                const logoUrl = getImageUrl(logo);
                const isRemote =
                  logoUrl.startsWith("http://") ||
                  logoUrl.startsWith("https://");

                return (
                  <div
                    key={index}
                    className="rs-home-clients__item"
                    data-aos="fade-up"
                    data-aos-delay={(index % 6) * 40}
                  >
                    <Image
                      src={logoUrl}
                      alt={`RedSpider client logo ${index + 1}`}
                      width={160}
                      height={72}
                      sizes="(max-width: 576px) 45vw, (max-width: 1200px) 22vw, 140px"
                      unoptimized={isRemote}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews initialData={googleReviews} />
    </>
  );
}
