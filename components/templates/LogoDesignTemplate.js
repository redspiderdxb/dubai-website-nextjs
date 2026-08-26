// frontend/components/templates/LogoDesignTemplate.js
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function LogoDesignTemplate({ data }) {
  if (!data) return <div className="text-center py-5">Loading...</div>;

  // ============================================
  // ✅ DYNAMIC FIELDS - Backend se aayenge
  // ============================================
  const {
    name,
    description,
    content,
    image,
    hero_title,
    hero_subtitle,
    hero_description,
    hero_image,
    hero_background,
    intro_small_heading = "Logo Design · Dubai",
    intro_main_heading = "",
    intro_description = "Your logo is the face of your business. In Dubai's competitive market, a professional logo builds trust, credibility, and brand recognition. We create logos that reflect your business values, communicate clearly with your audience, and create a lasting impression.",
    intro_image = "",
    cta_title,
    cta_description,
    cta_button_text,
    cta_button_link,
    cta_background,

    // Repeater Data
    features = [],
    benefits = [],
    logoTypes = [],
    logoServices = [],
    logoFormats = [],
    industriesLogo = [],
    logoPackages = [],
    processes = [],
    technologies = [],
    faqs = [],
    gallery = [],

    // ============================================
    // 🆕 NEW - FRONTEND DYNAMIC SETTINGS
    // ============================================

    // Design & Layout
    layout_style = "grid",
    columns_count = 3,
    primary_color = "#FF6B35",
    secondary_color = "#0047AB",
    background_color = "#F8F9FA",
    text_color = "#1A1A2E",
    button_color = "#FF6B35",
    button_text_color = "#FFFFFF",
    section_padding = "large",

    // Section Visibility
    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,

    // Content Customization
    hero_button_text = "Get Started",
    hero_button_url = "/contact",
    features_title = "What We Offer",
    features_subtitle = "",
    benefits_title = "Our Mission Is Design & Develop The Best Identity Around",
    benefits_subtitle = "Your logo is the face of your business. In Dubai's competitive market, a professional logo builds trust, credibility, and brand recognition.",
    processes_title = "Our Logo Design Process",
    processes_subtitle = "",
    technologies_title = "Types of Logo We Work",
    technologies_subtitle = "We design logos suitable for",
    faqs_title = "FAQ's",
    faqs_subtitle = "",
    gallery_title = "Our Gallery",
    gallery_subtitle = "",
    cta_subtitle = "",
    cta_button_url = "/contact",

    // Animation
    animation_enabled = false,
    animation_type = "fade",
    animation_duration = "medium",

    // Section Order
    section_order = [
      "hero",
      "intro",
      "features",
      "benefits",
      "processes",
      "technologies",
      "gallery",
      "faqs",
      "cta",
    ],

    // Custom Code
    custom_css = "",
    custom_js = "",
  } = data;

  // ============================================
  // 📌 FALLBACK DATA
  // ============================================

  // 1. Logo Types - Dynamic from backend or static fallback
  const logoTypesData =
    logoTypes.length > 0
      ? logoTypes
      : [
          {
            name: "Wordmark Logos",
            description:
              "Text-based logos that focus on typography and font styling to create a unique brand identity.",
            style: "Modern",
          },
          {
            name: "Lettermark Logos",
            description:
              "Logo designs using initials or abbreviated brand names for a clean and memorable identity.",
            style: "Minimal",
          },
          {
            name: "Symbol / Icon Logos",
            description:
              "Visual symbols or icons that represent your brand without text, creating instant recognition.",
            style: "Abstract",
          },
          {
            name: "Combination Logos",
            description:
              "A mix of text and symbols offering flexibility for various brand applications.",
            style: "Versatile",
          },
          {
            name: "Luxury & Corporate Logos",
            description:
              "Premium logo designs crafted for high-end brands and corporate identities with elegance.",
            style: "Premium",
          },
          {
            name: "Minimal & Modern Logos",
            description:
              "Clean, contemporary designs that focus on simplicity and visual impact.",
            style: "Clean",
          },
        ];

  const logoTypeIcons = {
    "Wordmark Logos": "bi-type",
    "Lettermark Logos": "bi-fonts",
    "Symbol / Icon Logos": "bi-hexagon",
    "Combination Logos": "bi-grid-3x3-gap",
    "Luxury & Corporate Logos": "bi-gem",
    "Minimal & Modern Logos": "bi-arrows-angle-expand",
  };

  // 2. Services - Dynamic from features or static fallback
  const servicesData =
    features.length > 0
      ? features
      : [
          {
            name: "Custom Logo Design",
            description:
              "Tailored logo designs created specifically for your brand, reflecting your unique identity and values.",
          },
          {
            name: "Brand Identity Systems",
            description:
              "Complete brand identity solutions including logos, color schemes, typography, and visual guidelines.",
          },
          {
            name: "Logo Redesign & Rebranding",
            description:
              "Modernize your existing logo or completely rebrand your business with a fresh new identity.",
          },
          {
            name: "Corporate Identity Design",
            description:
              "Professional corporate identities including logos, business cards, letterheads, and brand assets.",
          },
          {
            name: "Brand Guidelines & Visual Standards",
            description:
              "Comprehensive brand guidelines that ensure consistent brand application across all platforms.",
          },
        ];

  const serviceIcons = [
    "bi-vector-pen",
    "bi-grid-3x3-gap",
    "bi-arrow-repeat",
    "bi-building-check",
    "bi-journal-check",
  ];

  // 3. Formats - Dynamic from logoFormats or static fallback
  const formatsData =
    logoFormats.length > 0
      ? logoFormats
      : [
          {
            name: "High-Resolution JPG",
            description:
              "High-quality JPEG format suitable for web, presentations, and general use.",
          },
          {
            name: "PNG (Transparent Background)",
            description:
              "PNG format with transparent background for versatile use on any background color.",
          },
          {
            name: "Editable AI / EPS Vector File",
            description:
              "Vector files that can be scaled to any size without losing quality, ideal for printing.",
          },
          {
            name: "PDF Version",
            description:
              "PDF format for easy sharing, printing, and professional presentations.",
          },
          {
            name: "Black & White Logo",
            description:
              "Monochrome version of your logo for special applications and print media.",
          },
          {
            name: "Social Media Sizes",
            description:
              "Optimized logo sizes for all major social media platforms including Facebook, Instagram, and LinkedIn.",
          },
          {
            name: "Brand Color Codes",
            description:
              "Complete color palette with HEX, CMYK, and RGB codes for consistent brand application.",
          },
        ];

  const formatIcons = [
    "bi-file-earmark-image",
    "bi-image",
    "bi-file-earmark-text",
    "bi-file-earmark",
    "bi-circle-half",
    "bi-share",
    "bi-palette",
  ];

  // 4. Industries - Dynamic from industriesLogo or static fallback
  const allIndustries =
    industriesLogo.length > 0
      ? industriesLogo.map((item) => item.title || item.name)
      : [
          "Construction & Engineering Firms",
          "Real Estate Companies",
          "IT & Software Companies",
          "Corporate Businesses",
          "Startups",
          "Ecommerce Brands",
          "Healthcare Brands",
          "Restaurants & Cafes",
          "Fashion Brands",
          "Education Institutes",
          "Hospitality Companies",
          "Consulting Firms",
        ];

  const midPoint = Math.ceil(allIndustries.length / 2);
  const industriesRow1 = allIndustries.slice(0, midPoint);
  const industriesRow2 = allIndustries.slice(midPoint);

  // 5. Packages - Dynamic from logoPackages or static fallback
  const packagesData =
    logoPackages.length > 0
      ? logoPackages
      : [
          {
            name: "Logo Package",
            features:
              "5 Logo design with concept guidelines, Unlimited revisions until you are completely satisfied, Professional print & web ready logo artwork PDF files, Copyright ownership to the final logo",
          },
          {
            name: "Logo + Stationary",
            features:
              "5 Logo design with concept guidelines, Unlimited revisions until you are completely satisfied, Professional print & web ready logo artwork PDF files, Copyright ownership to the final logo, Complete Stationery Design",
          },
          {
            name: "Logo + Stationary + Website",
            features:
              "5 Logo design with concept guidelines, Professional print & web ready logo artwork PDF files, Copyright ownership to the final logo, Complete Stationery Design, Website Design & Development",
          },
          {
            name: "Brand Book",
            features:
              "5 Logo design with concept, Copyright ownership to the final logo, Corporate Identity with brand guideline, Complete Stationery Design, 8 Pages Brochure Design Artwork, Newspaper AD Design, Flag Design, Hanging Banner Design, Gift Items Design, Website Design & Development",
          },
        ];

  // 6. Process Steps - Dynamic from processes or static fallback
  const processData =
    processes.length > 0
      ? processes
      : [
          {
            title: "Brand Discovery & Consultation",
            description:
              "We conduct a thorough analysis of your brand, understanding your goals, target audience, and market positioning to create a solid foundation for the design process.",
          },
          {
            title: "Market Research & Concept Planning",
            description:
              "We conduct market research to understand industry trends and competitor strategies, ensuring our design concepts are innovative and effective.",
          },
          {
            title: "Initial Logo Concepts",
            description:
              "We create initial logo concepts based on the research and planning phase, presenting multiple options for your review and feedback.",
          },
          {
            title: "Feedback & Refinement",
            description:
              "We refine the logo concepts based on your feedback, ensuring the final design aligns with your brand vision and objectives.",
          },
          {
            title: "Final Delivery in Multiple Formats",
            description:
              "We deliver the final logo design in multiple formats, ensuring it is ready for both digital and print use, and meets all your branding needs.",
          },
        ];

  // 7. FAQ Data - Dynamic from faqs or static fallback
  const faqData =
    faqs.length > 0
      ? faqs
      : [
          {
            question:
              "What makes a strong logo design for businesses in Dubai?",
            answer:
              "A strong logo design reflects brand identity, industry relevance, and long-term scalability. In competitive markets like Dubai, a logo should be distinctive, versatile, and adaptable across digital and print platforms.",
          },
          {
            question:
              "How do logo design companies in Dubai approach branding?",
            answer:
              "Established logo design companies begin with brand research, competitor analysis, and audience understanding before creating design concepts. This ensures the final logo aligns with business positioning and market expectations.",
          },
          {
            question:
              "Do businesses across the UAE require different logo styles?",
            answer:
              "Logo styles vary depending on industry, target audience, and brand values. Businesses across the UAE often require culturally relevant yet modern designs that maintain international appeal.",
          },
          {
            question: "What is included in a complete logo design service?",
            answer:
              "A complete logo design service typically includes concept development, revisions, final artwork files, and brand usage guidelines to maintain visual consistency across platforms.",
          },
          {
            question: "How long does the logo design process usually take?",
            answer:
              "The logo design process generally takes between 5–10 business days depending on concept complexity, revision cycles, and brand requirements.",
          },
          {
            question: "What file formats are delivered after logo completion?",
            answer:
              "Final logo delivery includes multiple formats such as AI, EPS, PDF, PNG, and JPG to ensure compatibility for print, web, signage, and marketing materials.",
          },
          {
            question: "Can an existing brand in Dubai request a logo redesign?",
            answer:
              "Yes. Many businesses in Dubai request logo redesign services to modernize brand identity while maintaining brand recognition and market continuity.",
          },
          {
            question: "How is brand design different from logo design?",
            answer:
              "Logo design focuses on the visual symbol of a business, while brand design includes broader identity elements such as typography, color systems, visual guidelines, and communication style.",
          },
        ];

  // 8. Gallery Images - Dynamic from backend
  // ============================================
  // GALLERY IMAGES
  // ============================================

  const getFrontendImageUrl = (image) => {
    if (!image) return "";

    return image.replace(
      "http://localhost/redspider/public/",
      "https://redspider.rsworkspace.net/admin/public/",
    );
  };

  const galleryImages = gallery.length > 0 ? gallery : [];

  // ============================================
  // REMOVE DUPLICATE IMAGE PATHS
  // ============================================

  const uniqueGalleryImages = Array.from(
    new Map(
      galleryImages
        .filter(
          (item) =>
            item && typeof item.image === "string" && item.image.trim() !== "",
        )
        .map((item) => [item.image.trim(), item]),
    ).values(),
  );

  // ============================================
  // GALLERY LIGHTBOX
  // ============================================

  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);

  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(0);

  const gallerySlides = uniqueGalleryImages.map((item) => ({
    src: getFrontendImageUrl(item.image),
  }));

  // 9. How it Works Steps (Static)
  const workSteps = [
    {
      icon: "bi-send",
      title: "Submit Inquiry",
      desc: "Submit your inquiry to get package details and logo guidelines document.",
    },
    {
      icon: "bi-lightbulb",
      title: "Receive Concepts",
      desc: "Receive logo presentations with detailed concepts in 4 to 5 days as per your logo brief.",
    },
    {
      icon: "bi-pencil-square",
      title: "Review Revisions",
      desc: "Share your feedback and get revisions until the final logo direction is approved.",
    },
    {
      icon: "bi-check2-square",
      title: "Final Handover",
      desc: "After approval, final files are handed over in PDF, PNG, JPG, AI, and EPS formats.",
    },
  ];

  // Mission Points (Static)
  const missionPoints = [
    "Makes your business look established",
    "Creates a strong first impression",
    "Builds emotional connection",
    "Helps customers remember your brand",
    "Works across digital and print platforms",
  ];

  // ============================================
  // 🎨 Dynamic Styles
  // ============================================
  const styles = {
    "--primary-color": primary_color,
    "--secondary-color": secondary_color,
    "--background-color": background_color,
    "--text-color": text_color,
    "--button-color": button_color,
    "--button-text-color": button_text_color,
  };

  // ============================================
  // 📐 Section Order Mapping
  // ============================================
  const sectionMap = {
    hero: {
      component: <ServiceHero service={data} key="hero" />,
      show: show_hero,
    },
    intro: {
      component: (
        <section key="intro" className="archidex-accordion-sec">
          <div className="archidex-bg-shape"></div>
          <div className="container">
            <div className="archidex-top-line"></div>
            <div className="row g-5 align-items-start justify-content-between">
              <div className="col-lg-4">
                <h2 className="archidex-title">{features_title}</h2>
                <ul className="archidex-list dw">
                  {servicesData.map((item, index) => (
                    <li key={index}>
                      <span className="archidex-list-icon">
                        <i
                          className={serviceIcons[index % serviceIcons.length]}
                        ></i>
                      </span>
                      <span>{item.title || item.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="letconnect mt-5">
                  <span> Let's Connect : </span>
                  <div className="line"></div>
                  <a href={cta_button_link || "#"}> Book A Call </a>
                </div>
              </div>
              <div className="col-lg-5 px-lg-5">
                <div className="archidex-small-title">
                  <h2>
                    Our <br />
                    Logo Design <br />
                    Process
                  </h2>
                </div>
                <div
                  className="accordion archidex-accordion"
                  id="archidexAccordion"
                >
                  {processData.map((item, index) => (
                    <div className="accordion-item" key={item.id || index}>
                      <h3 className="accordion-header">
                        <button
                          className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                        >
                          <span className="arch-no">{String(index + 1)}.</span>
                          <span className="arch-name">{item.title}</span>
                          <span className="arch-arrow">↗</span>
                        </button>
                      </h3>
                      <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                        data-bs-parent="#archidexAccordion"
                      >
                        <div className="accordion-body">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-3">
                <div className="recieve-format">
                  <h6 className="mb-4 fw-bold text-center">
                    What You Will Receive
                  </h6>
                  <div className="rs-receive-stack-wrap">
                    {formatsData.map((item, index) => (
                      <div className="rs-receive-stack-item" key={index}>
                        <span className="rs-stack-line"></span>
                        <div className="rs-stack-icon">
                          <i
                            className={formatIcons[index % formatIcons.length]}
                          ></i>
                        </div>
                        <h5>{item.title || item.name}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_features,
    },
    benefits: {
      component: (
        <section key="benefits" className="rs-specialization-sec">
          <div
            className="container rs-specialization-wrap"
            style={{ maxWidth: "1320px" }}
          >
            <div className="row align-items-center g-5">
              <div className="col-lg-5">
                <h2 className="rs-main-title">{benefits_title}</h2>
                <p>
                  <small>{benefits_subtitle}</small>
                </p>
                <div className="rs-subtitle mt-4">A well-designed logo:</div>
                <div className="rs-special-list">
                  {missionPoints.map((point, index) => (
                    <button
                      className="rs-special-item"
                      key={index}
                      type="button"
                    >
                      <span className="rs-num">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      <span>{point}</span>
                      <span className="rs-icon">
                        <i className="bi bi-arrow-up-right"></i>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-lg-7">
                <div className="rs-image-area">
                  <div className="rs-dot-pattern"></div>
                  <div className="rs-main-image-box">
                    {image ? (
                      <img src={image} alt={name} />
                    ) : (
                      <img
                        src="/assets/img/l3.webp"
                        alt="Specialization Preview"
                      />
                    )}
                  </div>
                </div>
                <div className="letconnect mt-5">
                  <span>Know More About :</span>
                  <div className="line"></div>
                  <a href="#">View Our Work</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_benefits,
    },
    processes: {
      component: (
        <section key="processes" className="work-process-sec">
          <div className="container">
            <div className="title-wrap text-center">
              <span className="re-label">Logo Design Process</span>
              <h3>How it Works</h3>
            </div>
            <div className="row g-4">
              {workSteps.map((step, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <div className="work-card">
                    <div className="work-card-inner">
                      <div className="work-icon">
                        <i className={step.icon}></i>
                      </div>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                      <a href="#" className="work-link">
                        Step {String(index + 1).padStart(2, "0")}{" "}
                        <i className="bi bi-arrow-up-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
      show: show_processes,
    },
    technologies: {
      component: (
        <section key="technologies" className="rs-logo-types-sec pb-0">
          <div className="container">
            <div className="row align-items-start g-5">
              <div className="col-lg-4">
                <div className="title-wrap">
                  <span
                    style={{
                      color: "#d20000",
                      fontWeight: "400",
                      textTransform: "uppercase",
                    }}
                  >
                    {technologies_subtitle || "We design logos suitable for"}
                  </span>
                  <h3 className="fw-bold mt-3">
                    {technologies_title || "Types of logo we work"}
                  </h3>
                  <img
                    src="/assets/img/products-heading-shape.webp"
                    alt=""
                    className="img-fluid mt-3"
                  />
                </div>
              </div>
              <div className="col-lg-8">
                <div className="row g-4">
                  {logoTypesData.map((item, index) => (
                    <div className="col-md-6" key={item.id || index}>
                      <div className="rs-logo-type-card">
                        <div className="rs-logo-icon">
                          <i
                            className={
                              logoTypeIcons[item.title || item.name] ||
                              "bi-type"
                            }
                          ></i>
                        </div>
                        <h5>{item.title || item.name}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
      show: show_technologies,
    },
    gallery: {
      component: (
        <>
          {/* ============================================
          GALLERY LIGHTBOX
      ============================================ */}

          <Lightbox
            open={galleryLightboxOpen}
            close={() => setGalleryLightboxOpen(false)}
            index={galleryLightboxIndex}
            slides={gallerySlides}
          />

          {/* ============================================
          HOMEPAGE STYLE PORTFOLIO
      ============================================ */}

          <section
            key="gallery"
            id="portfolio"
            className="portfolio section pt-0"
          >
            {/* ============================================
            GALLERY TITLE
        ============================================ */}

            <div className="rs-gd-intro py-5">
              <div className="container-fluid px-3 px-md-4 px-xl-5">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div
                      className="rs-gd-intro__copy"
                      style={{
                        maxWidth: "100%",
                        margin: "auto",
                      }}
                    >
                      <h2
                        className="rs-gd-intro__lead rs-gd-intro__reveal fade-title mb-3"
                        style={{
                          maxWidth: "1000px",
                          margin: "auto",
                        }}
                      >
                        {gallery_title || "Our Gallery"}
                      </h2>

                      {gallery_subtitle && (
                        <p className="rs-gd-intro__lead rs-gd-intro__reveal text-center fs-5">
                          {gallery_subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================
            PORTFOLIO GRID
        ============================================ */}

            <div className="container">
              <div
                className="isotope-layout"
                data-default-filter="*"
                data-layout="masonry"
                data-sort="original-order"
              >
                <div className="row gy-4 isotope-container">
                  {uniqueGalleryImages.length > 0 ? (
                    uniqueGalleryImages.map((item, index) => (
                      <div
                        key={`${item.image}-${index}`}
                        className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                      >
                        <div
                          className="portfolio-content ffee"
                          role="button"
                          tabIndex={0}
                          style={{
                            cursor: "zoom-in",
                          }}
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
                          {/* IMAGE */}

                          <img
                            src={getFrontendImageUrl(item.image)}
                            className="img-fluid"
                            alt={item.title || `Gallery ${index + 1}`}
                            loading="lazy"
                          />

                          {/* HOVER CONTENT */}

                          <div className="portfolio-info">
                            <h3>{item.title || "Gallery"}</h3>

                            {item.description && <p>{item.description}</p>}

                            {/* ONLY ZOOM */}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();

                                setGalleryLightboxIndex(index);

                                setGalleryLightboxOpen(true);
                              }}
                              className="preview-link border-0 bg-transparent text-white"
                              style={{
                                fontSize: "1.2rem",
                                cursor: "zoom-in",
                              }}
                              aria-label={`View ${
                                item.title || "Gallery Image"
                              }`}
                            >
                              <i
                                className="bi bi-zoom-in"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <p className="text-center py-5">
                        No gallery images available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      ),

      show: show_gallery,
    },
    faqs: {
      component: (
        <section
          key="faqs"
          id="rs-faq-sec"
          className="rs-faq-sec section py-5 light-background"
        >
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div className="text-center mb-5">
              <h2 className="fw-bold">{faqs_title || "FAQ's"}</h2>
              {faqs_subtitle && <p>{faqs_subtitle}</p>}
            </div>
            <div className="accordion rs-faq-custom" id="rsFaqOne">
              {faqData.map((faq, index) => (
                <div className="accordion-item" key={faq.id || index}>
                  <h3 className="accordion-header">
                    <button
                      className={`accordion-button rs-faq-btn ${index === 0 ? "" : "collapsed"}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq${index}`}
                    >
                      <span className="faq-icon">+</span>
                      {faq.question}
                    </button>
                  </h3>
                  <div
                    id={`faq${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                    data-bs-parent="#rsFaqOne"
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
      show: show_faqs,
    },
    cta: {
      component: <ServiceCTA service={data} key="cta" />,
      show: show_cta,
    },
  };

  // ============================================
  // 🏗️ Render Sections Based on Order
  // ============================================
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
        "technologies",
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

  // ============================================
  // 📦 Packages Section (Outside Section Order)
  // ============================================
  const PackagesSection = () => (
    <section
      key="packages"
      className="rs-packages-sec light-background section line-bg-dar rs-price-light"
    >
      <div className="container" style={{ maxWidth: "1550px" }}>
        <div className="section-title text-center text-white mb-4">
          <h2 className="fw-bold">Professional Logo Design for every budget</h2>
          <p className="rs-subtitle">
            Choose the best package for your needs.
            <b>100% guaranteed satisfaction</b>
          </p>
        </div>
        <div className="row g-4 align-items-stretch mb-5">
          {packagesData.map((pkg, index) => (
            <div className="col-md-3" key={pkg.id || index}>
              <div className="rs-card">
                <p className="text-red">Package – {index + 1}</p>
                <h6>{pkg.title || pkg.name}</h6>
                <ul>
                  {(typeof pkg.features === "string"
                    ? pkg.features.split(", ")
                    : []
                  ).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const IndustriesMarquee = () => (
    <section key="industries" className="rs-text-marquee-sec mb-4">
      <div className="rs-text-marquee-wrap">
        <div className="rs-text-marquee-track">
          <div className="rs-text-item">
            {industriesRow1.map((item, index) => (
              <span key={index}>
                {item}
                <i className="rs-dot"></i>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rs-text-marquee-wrap red-strip">
        <div className="rs-text-marquee-track">
          <div className="rs-text-item">
            {industriesRow2.map((item, index) => (
              <span key={index}>
                {item}
                <i className="rs-dot"></i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
  // ============================================
  // 💬 Review Section (Outside Section Order)
  // ============================================
  const ReviewSection = () => (
    <section
      id="review-sec"
      className="review-sec section light-background py-0"
    >
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="review-wrap">
          <img
            src="/assets/img/reviewimg.webp"
            alt="Reviews"
            className="img-fluid"
          />
        </div>
      </div>
    </section>
  );

  // ============================================
  // 🏗️ Render Main Template
  // ============================================
  return (
    <div style={styles}>
      {custom_css && <style dangerouslySetInnerHTML={{ __html: custom_css }} />}
      <main className="service-template">
        {renderSections()}
        <PackagesSection />
        <IndustriesMarquee />
        <ReviewSection />
        {/* ============================================
            CTA SECTION - MOVED TO THE BOTTOM
        ============================================ */}
        <ServiceCTA service={data} key="cta-bottom" />
      </main>
      {custom_js && <script dangerouslySetInnerHTML={{ __html: custom_js }} />}
    </div>
  );
}
