import { Fragment, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";

const BROCHURE_ICONS = [
  "bi-box-seam",
  "bi-people",
  "bi-megaphone",
  "bi-bullseye",
  "bi-shop",
  "bi-mortarboard",
  "bi-calendar-event",
  "bi-journal-check",
  "bi-folder2-open",
];

export default function BrochureDesignTemplate({ data }) {
  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(0);

  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,
    intro_small_heading = "Brochure Design",
    intro_description = "At RedSpider Web & Art Design, we offer professional brochure design services in Dubai for various businesses in the industry.",
    cta_button_text,
    cta_button_link,
    features = [],
    benefits = [],
    processes = [],
    faqs = [],
    gallery = [],
    primary_color = "#FF6B35",
    secondary_color = "#111111",
    background_color = "#F8F9FA",
    text_color = "#1A1A1A",
    button_color = "#FF6B35",
    button_text_color = "#FFFFFF",
    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,
    features_title = "Our Brochure Design Services",
    features_subtitle = "",
    benefits_title = "Why Choose RedSpider for Brochure Design in Dubai?",
    benefits_subtitle = "",
    processes_title = "Our Brochure Design Process",
    processes_subtitle = "",
    faqs_title = "Frequently Asked Questions",
    faqs_subtitle = "Find quick answers to common questions about our services.",
    gallery_title = "Our Gallery",
    gallery_subtitle = "",
    section_order = [
      "hero",
      "intro",
      "features",
      "benefits",
      "processes",
      "gallery",
      "faqs",
      "cta",
    ],
    custom_css = "",
    custom_js = "",
  } = data;

  const brochureTypes =
    features.length > 0
      ? features
      : [
          {
            title: "Corporate Brochures",
            description: "Professional corporate brochures for your business",
          },
          {
            title: "Company Profile Design",
            description: "Comprehensive company profile designs",
          },
          {
            title: "Product Brochures",
            description: "Product-focused brochure designs",
          },
          {
            title: "B2B Brochures",
            description: "Business to business brochure designs",
          },
          {
            title: "Marketing Campaign Brochures",
            description: "Campaign-specific brochure designs",
          },
          {
            title: "Retail Brochures",
            description: "Retail-focused brochure designs",
          },
          {
            title: "Workshop & Training Brochures",
            description: "Workshop and training brochure designs",
          },
          {
            title: "Event, Exhibition & Trade Show Brochures",
            description: "Event and exhibition brochure designs",
          },
          {
            title: "Presentation folders and document folders",
            description: "Folder and document designs",
          },
        ];

  const whyChooseCards =
    benefits.length > 0
      ? benefits
      : [
          {
            title: "Experienced Across Multiple Industries",
            description:
              "We have created brochures for many companies in the real estate, construction, healthcare, education, hospitality, retail, technology, finance and corporate industry in the UAE.",
          },
          {
            title: "Strategic Content Organization",
            description:
              "A visually appealing brochure design goes beyond attractive visuals. We organize your content with clear headings that is easy to read and engages the customers.",
          },
          {
            title: "Modern, Brand-Focused Designs",
            description:
              "Each brochure is designed with your logo and high quality graphics. Color pallets and typography are selected professionally to make it look visually appealing.",
          },
          {
            title: "Ready for Print & Digital Distribution",
            description:
              "From commercial printing brochures to email campaigns, PDF downloads to online presentations, we can offer your files for the various platforms you need.",
          },
        ];

  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Requirement Analysis",
            description:
              "We analyze your business goals, target audience, and brochure requirements to create a clear project roadmap.",
          },
          {
            title: "Content Structure & Layout Planning",
            description:
              "We plan the content hierarchy, layout, and visual flow of your brochure.",
          },
          {
            title: "Design & Development",
            description:
              "We create visually appealing designs that align with your brand identity.",
          },
          {
            title: "Review & Refinement",
            description:
              "We refine the design based on your feedback and brand guidelines.",
          },
          {
            title: "Final Delivery",
            description:
              "We deliver the final design in multiple formats for both print and digital use.",
          },
        ];

  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question: "What brochure design services do you offer in Dubai?",
            answer:
              "We offer a wide range of brochure design services including corporate brochures, company profiles, product brochures, B2B brochures, marketing campaign brochures, retail brochures, workshop brochures, event brochures, and presentation folders.",
          },
          {
            question: "How long does it take to design a brochure?",
            answer:
              "Timelines depend on project complexity. Simple brochures typically take 3-5 days, while comprehensive catalogues may take 1-2 weeks.",
          },
          {
            question: "Do you provide print-ready files?",
            answer:
              "Yes, all designs are delivered in print-ready formats including CMYK, high-resolution PDF, and vector files for commercial printing.",
          },
          {
            question: "Can you redesign my existing brochure?",
            answer:
              "Yes, we offer redesign services to modernize your existing brochures while maintaining brand consistency.",
          },
        ];

  const uniqueGalleryImages = Array.from(
    new Map(
      (Array.isArray(gallery) ? gallery : [])
        .filter(
          (item) =>
            item && typeof item.image === "string" && item.image.trim() !== "",
        )
        .map((item) => [item.image.trim(), item]),
    ).values(),
  );

  const gallerySlides = uniqueGalleryImages.map((item) => ({
    src: item.image,
  }));

  const styles = {
    "--primary-color": primary_color,
    "--secondary-color": secondary_color,
    "--background-color": background_color,
    "--text-color": text_color,
    "--button-color": button_color,
    "--button-text-color": button_text_color,
  };

  const contactHref = cta_button_link || "/contact-us/";
  const imageBase =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public";

  const sectionMap = {
    hero: {
      component: (
        <section
          key="hero"
          className="design-developemnt-hero hero-marquee"
          style={{
            backgroundImage: hero_background
              ? `url(${imageBase}/storage/${hero_background})`
              : hero_image
                ? `url(${imageBase}/storage/${hero_image})`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12" data-aos="fade-right">
                <div className="rs-process-title-sec">
                  <h1 className="rs-process-title mb-3">
                    Brochure Design
                    {hero_subtitle && (
                      <span className="rs-process-highlight">
                        Company in Dubai
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
                    )}
                  </h1>

                  {hero_description && (
                    <p className="rs-process-text mb-3">
                      RedSpider creates professional brochures and company
                      profiles for businesses across Dubai and the UAE. Our
                      creative team combines clear content structure,
                      professional layouts and brand-focused visuals to produce
                      materials suitable for both print and digital use.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_hero,
    },

    intro: {
      component: (
        <section key="intro" className="rs-creative-intro">
          <div className="container">
            <div className="rs-creative-intro__grid">
              <div className="rs-creative-intro__meta">
                <span className="rs-creative-kicker">
                  {intro_small_heading}
                </span>
                <p className="rs-creative-intro__note">Print & digital ready</p>
              </div>

              <div className="rs-creative-intro__copy">
                <p className="rs-creative-intro__lead">{intro_description}</p>
                <p className="rs-creative-intro__support">
                  A brochure is more than printed paper. It is a marketing tool
                  that presents your brand, products and services in a clear
                  layout your team can use in meetings, exhibitions and
                  campaigns.
                </p>
                <a className="rs-creative-link" href="#brochure-design-services">
                  Explore brochure types
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_intro,
    },

    features: {
      component: (
        <section
          key="features"
          id="brochure-design-services"
          className="rs-creative-services"
        >
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">What we design</span>
              <h2>{features_title}</h2>
              {features_subtitle ? <p>{features_subtitle}</p> : null}
            </div>

            <div className="rs-creative-card-grid rs-creative-card-grid--compact">
              {brochureTypes.map((item, index) => (
                <article key={`${item.id || "type"}-${index}`} className="rs-creative-card">
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i
                        className={`bi ${BROCHURE_ICONS[index % BROCHURE_ICONS.length]}`}
                      ></i>
                    </span>
                    <span className="rs-creative-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
      show: show_features,
    },

    benefits: {
      component: (
        <section key="benefits" className="rs-creative-why">
          <div className="container">
            <div className="rs-creative-why__layout">
              <div className="rs-creative-why__intro">
                <span className="rs-creative-kicker">Why RedSpider</span>
                <h2>{benefits_title}</h2>
                {benefits_subtitle ? <p>{benefits_subtitle}</p> : (
                  <p>
                    Brochures for real estate, healthcare, education,
                    hospitality, retail, technology, finance and corporate
                    businesses across the UAE.
                  </p>
                )}
                <a className="rs-creative-btn" href={contactHref}>
                  {cta_button_text || "Book a call"}
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>

              <div className="rs-creative-why__grid">
                {whyChooseCards.map((item, index) => (
                  <article key={`${item.id || "why"}-${index}`} className="rs-creative-why__card">
                    <span className="rs-creative-why__icon" aria-hidden="true">
                      <i className={`bi ${BROCHURE_ICONS[index % BROCHURE_ICONS.length]}`}></i>
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_benefits,
    },

    processes: {
      component: (
        <section key="processes" className="rs-creative-process">
          <div className="container">
            <div className="rs-creative-head rs-creative-head--light">
              <span className="rs-creative-kicker">How we work</span>
              <h2>{processes_title}</h2>
              {processes_subtitle ? <p>{processes_subtitle}</p> : (
                <p>
                  A structured process from brief to print-ready files, so your
                  brochure is clear, on-brand and ready to use.
                </p>
              )}
            </div>

            <ol className="rs-creative-steps">
              {processData.map((process, index) => (
                <li key={`${process.id || "step"}-${index}`} className="rs-creative-step">
                  <span className="rs-creative-step__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{process.title}</h3>
                  <p>{process.description}</p>
                </li>
              ))}
            </ol>

            <div className="rs-creative-story">
              <article>
                <span>01</span>
                <h3>More Than Just a Brochure</h3>
                <p>
                  A brochure is one of the strongest marketing tools your
                  business can use. It represents your brand values and story,
                  and helps customers understand your products and services
                  quickly.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Build Trust Through Professional Design</h3>
                <p>
                  A well-designed brochure positions your brand clearly in a
                  competitive market. Sales teams can use it in conferences,
                  presentations and networking with confidence.
                </p>
              </article>
            </div>
          </div>
        </section>
      ),
      show: show_processes,
    },

    gallery: {
      component: (
        <Fragment key="gallery">
          <Lightbox
            open={galleryLightboxOpen}
            close={() => setGalleryLightboxOpen(false)}
            index={galleryLightboxIndex}
            slides={gallerySlides}
          />
          <section
            key="gallery"
            id="portfolio"
            className="portfolio section rs-custom-gallery rs-creative-gallery"
          >
            <div className="container">
              <div className="rs-creative-head">
                <span className="rs-creative-kicker">Selected work</span>
                <h2>{gallery_title || "Our Gallery"}</h2>
                {gallery_subtitle ? <p>{gallery_subtitle}</p> : null}
              </div>

              <div className="rs-custom-gallery-grid">
                {uniqueGalleryImages.length > 0 ? (
                  uniqueGalleryImages.map((item, index) => (
                    <div
                      key={`${item.image}-${index}`}
                      className="rs-custom-gallery-item"
                    >
                      <div
                        className="rs-custom-gallery-card portfolio-content h-100"
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setGalleryLightboxIndex(index);
                          setGalleryLightboxOpen(true);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setGalleryLightboxIndex(index);
                            setGalleryLightboxOpen(true);
                          }
                        }}
                      >
                        <img
                          src={item.image}
                          className="img-fluid"
                          alt={item.title || "Gallery Image"}
                          loading="lazy"
                        />
                        <div className="portfolio-info">
                          <h3>{item.title || "Gallery"}</h3>
                          {item.description && <p>{item.description}</p>}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setGalleryLightboxIndex(index);
                              setGalleryLightboxOpen(true);
                            }}
                            className="preview-link border-0 bg-transparent text-white"
                            aria-label={`View ${item.title || "Gallery Image"}`}
                          >
                            <i className="bi bi-zoom-in" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rs-custom-gallery-empty">
                    <p>No gallery images available</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </Fragment>
      ),
      show: show_gallery,
    },

    faqs: {
      component: (
        <ServiceFaqs
          key="faqs"
          faqs={faqData}
          title={faqs_title}
          subtitle={faqs_subtitle}
          idPrefix="brochure"
        />
      ),
      show: show_faqs,
    },

    cta: {
      component: <ServiceCTA service={data} key="cta" />,
      show: show_cta,
    },
  };

  const renderSections = () => {
    let order = section_order;

    if (typeof order === "string") {
      order = order.split(",").map((s) => s.trim());
    }

    if (!Array.isArray(order) || order.length === 0) {
      order = [
        "hero",
        "intro",
        "features",
        "benefits",
        "processes",
        "gallery",
        "faqs",
        "cta",
      ];
    }

    return order
      .map((key) => {
        const section = sectionMap[key];
        if (!section) return null;
        return section.show ? section.component : null;
      })
      .filter(Boolean);
  };

  return (
    <div style={styles}>
      {custom_css && (
        <style
          dangerouslySetInnerHTML={{
            __html: custom_css,
          }}
        />
      )}

      <main className="service-template brochure-design-template rs-creative-page">
        {renderSections()}
      </main>

      {custom_js && (
        <script
          dangerouslySetInnerHTML={{
            __html: custom_js,
          }}
        />
      )}
    </div>
  );
}
