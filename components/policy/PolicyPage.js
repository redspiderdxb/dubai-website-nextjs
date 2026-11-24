import Layout from "../layout/Layout";
import PageStyles from "../seo/PageStyles";
import SEO from "../seo/SEO";
import Button from "../ui/Button";

/*
 * Shared layout for legal / policy pages.
 * Uses the same markup and stylesheet (privacy-policy.css) as the
 * Privacy Policy page so every policy page looks identical.
 */
export default function PolicyPage({
  seo,
  label,
  title,
  lead,
  intro = [],
  sections = [],
  lastUpdated,
}) {
  return (
    <>
      <PageStyles href="/assets/css/pages/privacy-policy.css" />
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        robots="index,follow"
      />
      <Layout>
        <section
          className="rs-inner-hero design-developemnt-hero hero-marquee privacy-policy-hero"
          style={{
            backgroundImage: "url(/assets/img/re-bg-hero-hq.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="rs-hero-overlay" aria-hidden="true"></div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="rs-process-title-sec">
                  <h1 className="rs-process-title mb-3">
                    <span className="rs-process-highlight">
                      {title}
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="privacy-policy-content"
          aria-label={`${title} content`}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="privacy-policy-document">
                  <aside className="privacy-policy-rail" aria-hidden="true">
                    <span className="privacy-policy-rail-line"></span>
                    <span className="privacy-policy-rail-label">{label}</span>
                    <span className="privacy-policy-rail-brand">RedSpider</span>
                  </aside>

                  <div className="privacy-policy-copy">
                    <div
                      className="privacy-policy-intro"
                      data-aos="fade-up"
                    >
                      <p className="privacy-policy-lead">{lead}</p>
                      {intro.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {lastUpdated ? (
                        <p>
                          <small>Last updated: {lastUpdated}</small>
                        </p>
                      ) : null}
                    </div>

                    {sections.map((section) => (
                      <section
                        key={section.id}
                        className="privacy-policy-section"
                        data-aos="fade-up"
                        data-aos-duration="650"
                        aria-labelledby={section.id}
                      >
                        <h2 id={section.id}>{section.heading}</h2>

                        {(section.paragraphs || []).map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}

                        {section.items?.length ? (
                          <ul>
                            {section.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                      </section>
                    ))}

                    <div
                      className="privacy-policy-actions"
                      data-aos="fade-up"
                      data-aos-duration="650"
                    >
                      <Button href="/contact-us/">Contact Us</Button>
                      <Button href="/privacy-policy/" color="white">
                        Read Privacy Policy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
