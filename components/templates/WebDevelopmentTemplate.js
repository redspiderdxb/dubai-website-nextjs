import { Fragment, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";
import GoogleReviews from "../ui/GoogleReviews";

const SERVICE_ICONS = [
  "bi-code-slash",
  "bi-wordpress",
  "bi-phone",
  "bi-gear",
  "bi-diagram-3",
  "bi-shield-check",
];

const BENEFIT_ICONS = [
  "bi-geo-alt",
  "bi-layout-text-window",
  "bi-graph-up-arrow",
  "bi-search",
  "bi-palette",
  "bi-layers",
  "bi-clock-history",
];

export default function WebDevelopmentTemplate({ data }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,
    intro_small_heading = "Web Development · Dubai, UAE",
    intro_description = "We build modern websites that reflect your brand. Our team creates responsive, SEO-friendly websites that help businesses grow online.",
    cta_button_text,
    cta_button_link,
    features = [],
    benefits = [],
    processes = [],
    faqs = [],
    gallery = [],
    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,
    features_title = "Our Web Development Services",
    features_subtitle = "At RedSpider, we offer a wide range of web development services to cater to your needs.",
    benefits_title = "Why Businesses Choose RedSpider for Web Development",
    benefits_subtitle = "RedSpider has earned trust by offering top notch services to various businesses in the industry.",
    processes_title = "Our Web Development Process",
    processes_subtitle = "Every website has different technical requirements. We develop solutions around your content, functionality, integrations and future growth.",
    faqs_title = "Frequently Asked Questions",
    faqs_subtitle = "Find quick answers to common questions about our services.",
    gallery_title = "Our Work",
    gallery_subtitle = "",
    section_order = [
      "hero",
      "intro",
      "features",
      "benefits",
      "processes",
      "gallery",
      "review",
      "faqs",
      "cta",
    ],
    custom_css = "",
    custom_js = "",
  } = data;

  const imageBase =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public";
  const contactHref = cta_button_link || "/contact-us/";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    const image = String(imagePath).trim();
    if (image.startsWith("https://") || image.startsWith("/")) return image;
    if (image.startsWith("http://") && !image.includes("localhost")) return image;
    if (image.includes("/storage/")) {
      return `${imageBase}${image.substring(image.indexOf("/storage/"))}`;
    }
    return `${imageBase}/storage/${image}`;
  };

  const servicesData =
    features.length > 0
      ? features
      : [
          {
            title: "Custom Website Development",
            description:
              "Bespoke websites built around your brand, content and business workflows.",
          },
          {
            title: "CMS & WordPress Development",
            description:
              "Easy-to-manage websites with clean structure, plugins and content workflows.",
          },
          {
            title: "Responsive Web Design",
            description:
              "Layouts that work clearly on desktop, tablet and mobile without compromise.",
          },
          {
            title: "Web Applications",
            description:
              "Custom functionality, dashboards and tools that support how your team works.",
          },
          {
            title: "Integrations & APIs",
            description:
              "Connect CRM, payment, booking and business systems to your website.",
          },
          {
            title: "Maintenance & Support",
            description:
              "Updates, security, backups and technical support after launch.",
          },
        ];

  const benefitCards =
    benefits.length > 0
      ? benefits
      : [
          {
            title: "Industry Experience Across UAE",
            description:
              "Real estate, corporate, healthcare, education, retail and service businesses across Dubai and the UAE.",
          },
          {
            title: "Strategic Layout & User Experience",
            description:
              "Clear structure and intuitive navigation that help visitors find what they need.",
          },
          {
            title: "Conversion-Focused Structure",
            description:
              "Content hierarchy, visual flow and calls to action designed to generate enquiries.",
          },
          {
            title: "SEO-Friendly Foundation",
            description:
              "Clean markup, fast loading and a structure that search engines can understand.",
          },
        ];

  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Requirement Analysis",
            description:
              "We review your goals, content, integrations and technical constraints before design begins.",
          },
          {
            title: "UX & Visual Design",
            description:
              "Wireframes and layouts are planned so the site is easy to use and aligned with your brand.",
          },
          {
            title: "Development",
            description:
              "We build a secure, scalable website with the CMS, features and integrations you need.",
          },
          {
            title: "Testing & Launch",
            description:
              "Quality checks across devices, then a structured launch with handover and training.",
          },
        ];

  const uniqueGallery = Array.from(
    new Map(
      (gallery || [])
        .filter((item) => item?.image)
        .map((item) => [item.image, item]),
    ).values(),
  ).slice(0, 9);

  const gallerySlides = uniqueGallery.map((item) => ({
    src: getImageUrl(item.image),
  }));

  const sectionMap = {
    hero: {
      component: (
        <section
          key="hero"
          className="design-developemnt-hero hero-marquee"
          style={{
            backgroundImage: hero_background
              ? `url(${getImageUrl(hero_background)})`
              : hero_image
                ? `url(${getImageUrl(hero_image)})`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="rs-process-title-sec">
              <h1 className="rs-process-title mb-3">
                Web Development
                {hero_subtitle ? (
                  <span className="rs-process-highlight">
                    Company in Dubai
                    <svg
                      className="rs-process-underline"
                      viewBox="0 0 320 22"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" />
                    </svg>
                  </span>
                ) : null}
              </h1>
              {hero_description ? (
                <p className="rs-process-text mb-3">
                  RedSpider provides custom web development solutions for
                  businesses that need reliable, scalable and easy-to-manage
                  websites. From CMS development and WordPress solutions to
                  custom functionality and integrations, we build websites
                  around practical business and technical requirements.
                </p>
              ) : null}
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
                <span className="rs-creative-kicker">{intro_small_heading}</span>
                <p className="rs-creative-intro__note">Built in Dubai since 2010</p>
              </div>
              <div className="rs-creative-intro__copy">
                <p className="rs-creative-intro__lead">{intro_description}</p>
                <p className="rs-creative-intro__support">
                  From a simple business website to a custom platform, we plan
                  structure, design and development so your site stays easy to
                  manage and ready to grow.
                </p>
                <a className="rs-creative-link" href="#web-development-services">
                  Explore our services
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
          id="web-development-services"
          className="rs-creative-services"
        >
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">What we build</span>
              <h2>{features_title}</h2>
              <p>{features_subtitle}</p>
            </div>
            <div className="rs-creative-card-grid">
              {servicesData.map((item, index) => (
                <article
                  key={`${item.id || item.title}-${index}`}
                  className="rs-creative-card"
                >
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i
                        className={`bi ${
                          item.icon && String(item.icon).includes("bi")
                            ? item.icon
                            : SERVICE_ICONS[index % SERVICE_ICONS.length]
                        }`}
                      ></i>
                    </span>
                    <span className="rs-creative-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{item.title || item.name}</h3>
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
                <p>{benefits_subtitle}</p>
                <a className="rs-creative-btn" href={contactHref}>
                  {cta_button_text || "Book a call"}
                  <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="rs-creative-why__grid">
                {benefitCards.map((card, index) => (
                  <article
                    key={`${card.id || card.title}-${index}`}
                    className="rs-creative-why__card"
                  >
                    <span className="rs-creative-why__icon" aria-hidden="true">
                      <i
                        className={`bi ${BENEFIT_ICONS[index % BENEFIT_ICONS.length]}`}
                      ></i>
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
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
              <p>{processes_subtitle}</p>
            </div>
            <ol className="rs-creative-steps">
              {processData.map((process, index) => (
                <li
                  key={`${process.id || process.title}-${index}`}
                  className="rs-creative-step"
                >
                  <span className="rs-creative-step__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{process.title}</h3>
                  <p>{process.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ),
      show: show_processes,
    },
    gallery: {
      component: (
        <Fragment key="gallery">
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={lightboxIndex}
            slides={gallerySlides}
          />
          <section
            id="portfolio"
            className="portfolio section rs-custom-gallery rs-creative-gallery"
          >
            <div className="container">
              <div className="rs-creative-head">
                <span className="rs-creative-kicker">Selected work</span>
                <h2>{gallery_title || "Our Work"}</h2>
                {gallery_subtitle ? <p>{gallery_subtitle}</p> : null}
              </div>
              <div className="rs-custom-gallery-grid">
                {uniqueGallery.length > 0 ? (
                  uniqueGallery.map((item, index) => (
                    <div
                      key={`${item.image}-${index}`}
                      className="rs-custom-gallery-item"
                    >
                      <div
                        className="rs-custom-gallery-card portfolio-content h-100"
                        onClick={() => {
                          setLightboxIndex(index);
                          setLightboxOpen(true);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setLightboxIndex(index);
                            setLightboxOpen(true);
                          }
                        }}
                      >
                        <img
                          src={getImageUrl(item.image)}
                          className="img-fluid"
                          alt={item.title || "Gallery Image"}
                          loading="lazy"
                        />
                        <div className="portfolio-info">
                          <h3>{item.title || "Gallery Image"}</h3>
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
    review: {
      component: <GoogleReviews key="review" />,
      show: true,
    },
    faqs: {
      component: (
        <ServiceFaqs
          key="faqs"
          faqs={faqs}
          title={faqs_title}
          subtitle={faqs_subtitle}
          idPrefix="webdev"
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
        "review",
        "faqs",
        "cta",
      ];
    }
    if (!order.includes("intro") && order.includes("hero")) {
      order.splice(order.indexOf("hero") + 1, 0, "intro");
    }
    return order
      .map((key) => {
        const section = sectionMap[key];
        if (!section || !section.show) return null;
        return section.component;
      })
      .filter(Boolean);
  };

  return (
    <div>
      {custom_css ? <style dangerouslySetInnerHTML={{ __html: custom_css }} /> : null}
      <main className="service-template web-development-template rs-creative-page">
        {renderSections()}
      </main>
      {custom_js ? <script dangerouslySetInnerHTML={{ __html: custom_js }} /> : null}
    </div>
  );
}
