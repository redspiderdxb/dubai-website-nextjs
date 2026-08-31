import Link from "next/link";
import Layout from "../layout/Layout";
import ContactCTA from "../ui/ContactCTA";

const SECTION_META = [
  {
    key: "main",
    title: "Main Pages",
    icon: "bi-house-door",
    description: "Core pages across the RedSpider website.",
  },
  {
    key: "services",
    title: "Services",
    icon: "bi-grid",
    description: "Web design, development, marketing and related services.",
  },
  {
    key: "products",
    title: "Products",
    icon: "bi-box-seam",
    description: "Business solutions and digital products from RedSpider.",
  },
  {
    key: "blogs",
    title: "Blog",
    icon: "bi-journal-text",
    description: "All articles, guides and insights from our team.",
  },
  {
    key: "portfolio",
    title: "Portfolio Projects",
    icon: "bi-images",
    description: "Selected client websites and projects delivered by RedSpider.",
  },
];

function SitemapLinkItem({ link }) {
  const content = (
    <>
      <span>{link.label}</span>
      <i
        className={
          link.external ? "bi bi-box-arrow-up-right" : "bi bi-arrow-up-right"
        }
        aria-hidden="true"
      />
    </>
  );

  if (link.external) {
    return (
      <a
        href={link.href}
        className="rs-sitemap-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className="rs-sitemap-link">
      {content}
    </Link>
  );
}

export default function SitemapPage({ groups = {} }) {
  const totalLinks = SECTION_META.reduce(
    (sum, section) => sum + (groups[section.key]?.length || 0),
    0,
  );

  return (
    <Layout>
      <section
        className="rs-inner-hero hero-marquee rs-sitemap-hero"
        style={{
          backgroundImage: "url(/assets/img/re-bg-hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="rs-hero-overlay" aria-hidden="true" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-10" data-aos="fade-right">
              <div className="rs-process-title-sec">
                <h1 className="rs-process-title mb-3">
                  <span className="rs-process-highlight">
                    Website Sitemap
                    <svg
                      className="rs-process-underline"
                      viewBox="0 0 320 22"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" />
                    </svg>
                  </span>
                </h1>
                <p className="rs-process-text mb-0">
                  Every page on redspider.ae — main pages, all services, all
                  products, every blog post and portfolio project links.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rs-sitemap-page">
        <div className="container">
          <div className="rs-sitemap-summary" data-aos="fade-up">
            <div className="rs-sitemap-summary__stat">
              <span className="rs-sitemap-summary__number">{totalLinks}</span>
              <span className="rs-sitemap-summary__label">URLs listed</span>
            </div>
            <p className="rs-sitemap-summary__text">
              This page lists every URL from the RedSpider website and CMS.
              Search engines can also use our{" "}
              <a href="/sitemap.xml" className="rs-sitemap-xml-link">
                XML sitemap
              </a>
              .
            </p>
          </div>

          <div className="row g-4 rs-sitemap-grid">
            {SECTION_META.map((section, index) => {
              const links = groups[section.key] || [];

              if (links.length === 0) {
                return null;
              }

              return (
                <div
                  key={section.key}
                  className={
                    links.length > 24 ? "col-lg-12" : "col-lg-6"
                  }
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <article className="rs-sitemap-card">
                    <header className="rs-sitemap-card__header">
                      <span
                        className="rs-sitemap-card__icon"
                        aria-hidden="true"
                      >
                        <i className={section.icon} />
                      </span>
                      <div>
                        <h2 className="rs-sitemap-card__title">
                          {section.title}
                        </h2>
                        <p className="rs-sitemap-card__desc">
                          {section.description}
                        </p>
                      </div>
                      <span className="rs-sitemap-card__count">
                        {links.length}
                      </span>
                    </header>

                    <ul className="rs-sitemap-card__list">
                      {links.map((link) => (
                        <li key={`${link.external ? "ext" : "int"}:${link.href}`}>
                          <SitemapLinkItem link={link} />
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA
        title="Can't find what you need?"
        description="Contact our Dubai team and we'll point you to the right service or page."
      />
    </Layout>
  );
}
