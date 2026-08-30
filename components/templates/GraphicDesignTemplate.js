import { Fragment, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";
import ServiceFaqs from "../services/ServiceFaqs";

const SERVICE_ICONS = [
  "bi-journal-richtext",
  "bi-pentagon",
  "bi-person-vcard",
  "bi-file-earmark-text",
  "bi-postcard",
  "bi-display",
];

const BENEFIT_ICONS = [
  "bi-person-badge",
  "bi-bullseye",
  "bi-lightning-charge",
  "bi-printer",
];

export default function GraphicDesignTemplate({ data }) {
  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(0);

  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const {
    intro_small_heading = "Graphic Design · Dubai",
    intro_description = "At RedSpider Web & Art Design, we offer professional graphic design services in Dubai to help businesses build a strong and consistent identity. Our creative team designs visuals that are not only impressive but communicate your brand's message clearly.",
    cta_title,
    cta_description,
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
    features_title = "Our Graphic Design Services",
    features_subtitle = "We offer a wide range of graphic design services tailored to your needs.",
    benefits_title = "Why Choose RedSpider for Graphic Design Services in Dubai?",
    benefits_subtitle = "We have a wealth of experience in the UAE assisting businesses in design to reinforce their branding and drive business growth.",
    processes_title = "Our Graphic Design Process",
    processes_subtitle = "We work hard to create a graphic design that can keep our clients satisfied. Here is how it begins:",
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

  const graphicServices =
    features.length > 0
      ? features
      : [
          {
            title: "Business Brochure Design",
            description:
              "Distribute professionally created brochures that feature appealing designs and captivating information about your products and services. Whether it is a meeting, exhibition or marketing campaign, our brochure designs make a good impression.",
          },
          {
            title: "Logo Design",
            description:
              "Your logo will be the face of your business. Being an established logo design company in Dubai, we develop one-of-a-kind logos that capture the nature and personality of your brand and are easily recognizable on social media, websites, signage, packaging and print media.",
          },
          {
            title: "Business Card Design",
            description:
              "We can design a professional business card to make a long lasting impression on your potential customers.",
          },
          {
            title: "Letterhead Design",
            description:
              "Establish a business identity by using custom designed letterhead design to make your business documents look elegant and consistent.",
          },
          {
            title: "Flyer Design",
            description:
              "Are you promoting an event or launching a new product or special offer? No doubt, the creative flyers can help you do your work successfully. We design visually appealing flyers that will cater to your needs.",
          },
          {
            title: "Banner & Advertising Design",
            description:
              "We create digital and print marketing assets such as website banners, social media graphics, online ads, promotional posters, exhibition graphics, and more, all branded to enhance your marketing efforts.",
          },
        ];

  const benefitCards =
    benefits.length > 0
      ? benefits
      : [
          {
            title: "Dedicated In-House Creative Team",
            description:
              "The highly experienced designers collaborate with the clients to provide innovative solutions without compromising standards across all projects.",
            icon: "bi-person-badge",
          },
          {
            title: "Design with Purpose",
            description:
              "All designs we create have a clear purpose to convey your brand's message across various customers.",
            icon: "bi-rocket-takeoff",
          },
          {
            title: "Fast Delivery & Clear Communication",
            description:
              "We value your time. We have a streamlined workflow, clear communication and timely updates, so that each project remains on schedule.",
            icon: "bi-people",
          },
          {
            title: "Print & Digital Ready Designs",
            description:
              "Each design is presented in professional formats for commercial print, web, social media, presentations and other digital media.",
            icon: "bi-clock-history",
          },
        ];

  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Requirement Analysis",
            description:
              "We analyze your business goals, target audience, and design requirements to create a clear project roadmap.",
          },
          {
            title: "Concept Development",
            description:
              "We create multiple design concepts based on your brand identity and project requirements.",
          },
          {
            title: "Design Refinement",
            description:
              "We refine the chosen design based on your feedback and brand guidelines.",
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
            question: "What graphic design services do you offer in Dubai?",
            answer:
              "We offer a wide range of graphic design services including brochure design, logo design, business card design, letterhead design, flyer design, banner design, and advertising design.",
          },
          {
            question:
              "How long does it take to complete a graphic design project?",
            answer:
              "Timelines depend on project complexity. Simple designs typically take 2-5 days, while comprehensive branding projects may take 1-2 weeks.",
          },
          {
            question: "Do you provide print-ready files?",
            answer:
              "Yes, all designs are delivered in print-ready formats including CMYK, high-resolution PDF, and vector files for commercial printing.",
          },
          {
            question: "Can you redesign my existing brand materials?",
            answer:
              "Yes, we offer rebranding and redesign services to modernize your existing brand materials while maintaining brand recognition.",
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

  const sectionMap = {
    hero: {
      component: <ServiceHero service={data} key="hero" />,
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
                <p className="rs-creative-intro__note">Creative since 2010</p>
              </div>

              <div className="rs-creative-intro__copy">
                <p className="rs-creative-intro__lead">{intro_description}</p>
                <p className="rs-creative-intro__support">
                  Whether you are a startup launching a new brand or an
                  established company revamping your marketing strategies, we
                  create designs that are tailored to meet your goals. Every
                  project is carefully planned to ensure consistency whether for
                  print or digital platforms.
                </p>
                <a className="rs-creative-link" href="#graphic-design-services">
                  Explore our designs
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
          id="graphic-design-services"
          className="rs-creative-services"
        >
          <div className="container">
            <div className="rs-creative-head">
              <span className="rs-creative-kicker">What we design</span>
              <h2>{features_title}</h2>
              <p>{features_subtitle}</p>
            </div>

            <div className="rs-creative-card-grid">
              {graphicServices.map((service, index) => (
                <article
                  key={`${service.id || "service"}-${index}`}
                  className="rs-creative-card"
                >
                  <div className="rs-creative-card__top">
                    <span className="rs-creative-card__icon" aria-hidden="true">
                      <i
                        className={`bi ${SERVICE_ICONS[index % SERVICE_ICONS.length]}`}
                      ></i>
                    </span>
                    <span className="rs-creative-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
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
                  <article key={`${card.id || "benefit"}-${index}`} className="rs-creative-why__card">
                    <span className="rs-creative-why__icon" aria-hidden="true">
                      <i
                        className={`bi ${
                          card.icon || BENEFIT_ICONS[index % BENEFIT_ICONS.length]
                        }`}
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
                <li key={`${process.id || "step"}-${index}`} className="rs-creative-step">
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
            open={galleryLightboxOpen}
            close={() => setGalleryLightboxOpen(false)}
            index={galleryLightboxIndex}
            slides={gallerySlides}
          />
          <section
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
                        onClick={() => {
                          setGalleryLightboxIndex(index);
                          setGalleryLightboxOpen(true);
                        }}
                        role="button"
                        tabIndex={0}
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
                          <h3>{item.title || "Gallery Image"}</h3>
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
          idPrefix="graphic"
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

      <main className="service-template graphic-design-template rs-creative-page">
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
