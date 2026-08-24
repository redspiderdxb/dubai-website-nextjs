// frontend/components/templates/BrochureDesignTemplate.js

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import ServiceCTA from "../services/ServiceCTA";

export default function BrochureDesignTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  // ============================================
  // DYNAMIC FIELDS
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

    intro_small_heading = "Brochure Design",
    intro_main_heading = "",
    intro_description = "At RedSpider Web & Art Design, we offer professional brochure design services in Dubai for various businesses in the industry.",
    intro_image = "",

    cta_title,
    cta_description,
    cta_button_text,
    cta_button_link,
    cta_background,

    // Repeater Data
    features = [],
    benefits = [],
    processes = [],
    faqs = [],
    gallery = [],

    // ============================================
    // FRONTEND SETTINGS
    // ============================================

    layout_style = "grid",
    columns_count = 3,

    primary_color = "#FF6B35",
    secondary_color = "#0047AB",
    background_color = "#F8F9FA",
    text_color = "#1A1A2E",
    button_color = "#FF6B35",
    button_text_color = "#FFFFFF",
    section_padding = "large",

    // ============================================
    // SECTION VISIBILITY
    // ============================================

    show_hero = true,
    show_intro = true,
    show_features = true,
    show_benefits = true,
    show_processes = true,
    show_technologies = true,
    show_faqs = true,
    show_gallery = true,
    show_cta = true,

    // ============================================
    // CONTENT CUSTOMIZATION
    // ============================================

    hero_button_text = "Get Started",
    hero_button_url = "/contact",

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

    cta_subtitle = "",
    cta_button_url = "/contact",

    // ============================================
    // ANIMATION
    // ============================================

    animation_enabled = false,
    animation_type = "fade",
    animation_duration = "medium",

    // ============================================
    // SECTION ORDER
    // ============================================

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

    // ============================================
    // CUSTOM CODE
    // ============================================

    custom_css = "",
    custom_js = "",
  } = data;

  // ============================================
  // BROCHURE TYPES
  // ============================================

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

  const brochureIcons = [
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

  // ============================================
  // WHY CHOOSE CARDS
  // ============================================

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

  // ============================================
  // PROCESS STEPS
  // ============================================

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

  // ============================================
  // FAQ DATA
  // ============================================

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

  // ============================================
  // GALLERY
  // ============================================

  const galleryImages =
    Array.isArray(gallery) && gallery.length > 0 ? gallery : [];

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
  // LIGHTBOX
  // ============================================

  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(0);

  const gallerySlides = uniqueGalleryImages.map((item) => ({
    src: item.image,
  }));

  // ============================================
  // DYNAMIC STYLES
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
  // SECTION MAP
  // ============================================

  const sectionMap = {
    // ============================================
    // HERO
    // ============================================

    hero: {
      component: (
        <section
          key="hero"
          className="design-developemnt-hero hero-marquee"
          style={{
            backgroundImage: hero_background
              ? `url(${
                  process.env.NEXT_PUBLIC_IMAGE_URL ||
                  "http://localhost/redspider/public"
                }/storage/${hero_background})`
              : hero_image
                ? `url(${
                    process.env.NEXT_PUBLIC_IMAGE_URL ||
                    "http://localhost/redspider/public"
                  }/storage/${hero_image})`
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

    // ============================================
    // INTRO
    // ============================================

    intro: {
      component: (
        <section key="intro" className="broucher-info about-info-sec pix-bg">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-lg-3" data-aos="fade-right">
                <span className="about-label">
                  {intro_small_heading || "Brochure Design"}
                </span>
              </div>

              <div
                className="col-lg-9"
                data-aos="fade-left"
                data-aos-delay="150"
              >
                <h3 className="about-heading rs-main-title text-white">
                  {intro_description ||
                    "At RedSpider Web & Art Design, we offer professional brochure design services in Dubai for various businesses in the industry."}
                </h3>
              </div>
            </div>
          </div>
        </section>
      ),

      show: show_intro,
    },

    // ============================================
    // FEATURES
    // ============================================

    features: {
      component: (
        <section key="features" className="brochure-services-section dark-bg">
          <div className="container">
            <div className="row align-items-start justify-content-between">
              <div
                className="col-lg-4"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <h2
                  className="services-heading"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  {features_title || "Our Brochure Design Services"}
                </h2>

                <ul className="services-list">
                  {brochureTypes.map((item, index) => (
                    <li
                      key={item.id || index}
                      data-aos="fade-right"
                      data-aos-delay={900 + index * 100}
                    >
                      <span className="service-icon">
                        <i
                          className={
                            brochureIcons[index % brochureIcons.length]
                          }
                        ></i>
                      </span>

                      <span className="service-text">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="col-lg-7 px-lg-5"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <div
                  className="process-title-wrapper"
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  <h2 className="text-white">
                    Our
                    <br />
                    Brochure
                    <br />
                    Design Process
                  </h2>
                </div>

                <div
                  className="process-accordion"
                  id="brochureProcessAccordion"
                >
                  {processData.map((process, index) => {
                    const isFirst = index === 0;
                    const collapseId = `brochure-collapse-${index}`;

                    return (
                      <div
                        className="accordion-item"
                        key={process.id || index}
                        data-aos="fade-up"
                        data-aos-delay={800 + index * 100}
                      >
                        <div className="accordion-header">
                          <button
                            className={`accordion-trigger ${
                              isFirst ? "active" : ""
                            }`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded={isFirst}
                          >

                            <h3 className="hjs text-white">
                            <span className="step-number">{index + 1}.</span>

                            <span className="step-title">{process.title}</span>

                            <span className="step-arrow">↗</span>
                            </h3>
                          </button>
                        </div>

                        <div
                          id={collapseId}
                          className={`accordion-collapse collapse ${
                            isFirst ? "show" : ""
                          }`}
                          data-bs-parent="#brochureProcessAccordion"
                        >
                          <div className="accordion-body">
                            <div className="accordion-body-text">
                              {process.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  className="connect-section"
                  data-aos="fade-up"
                  data-aos-delay="900"
                >
                  <span
                    className="connect-label"
                    data-aos="fade-right"
                    data-aos-delay="1000"
                  >
                    Let's Connect :
                  </span>

                  <div
                    className="connect-divider"
                    data-aos="zoom-in"
                    data-aos-delay="1100"
                  ></div>

                  <a
                    href={cta_button_link || "#"}
                    className="connect-btn"
                    data-aos="fade-left"
                    data-aos-delay="1200"
                  >
                    {cta_button_text || "Book A Call"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),

      show: show_features,
    },

    // ============================================
    // BENEFITS
    // ============================================

    benefits: {
      component: (
        <section key="benefits" className="rs-why-brochure">
          <div className="container">
            <div className="row g-5 align-items-start">
              <div
                className="col-lg-5"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <div className="rs-why-brochure__intro">
                  <span
                    className="rs-why-brochure__label"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Why RedSpider
                  </span>

                  <h2
                    className="rsu-main-title"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    {benefits_title ||
                      "Why Choose RedSpider for Brochure Design in Dubai?"}
                  </h2>

                  <div
                    className="rs-why-brochure__dubai"
                    aria-label="Hand-drawn Dubai skyline outline"
                    role="img"
                    data-aos="zoom-in"
                    data-aos-delay="500"
                  >
                    <svg
                      viewBox="0 0 720 220"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        className="rs-why-brochure__dubai-line"
                        d="M8 185 C30 180 41 169 54 172 C67 175 61 190 75 191 C94 193 92 171 90 153 C87 126 91 86 111 51 C130 65 144 84 148 113 C151 139 143 174 155 182 C165 189 172 182 173 166 L177 88 L188 79 L197 66 C196 88 193 113 196 139 C198 161 194 181 205 185 C216 190 220 179 218 160 L219 102 C238 111 249 127 250 151 C251 170 242 182 251 188 C261 194 266 180 267 164 C269 137 278 109 292 95 C309 113 317 138 315 161 C313 178 316 188 329 188 C345 188 350 170 342 165 C332 159 325 170 332 180 C347 201 376 186 383 164 C393 172 405 170 412 158 C422 143 432 137 447 139 C466 142 471 158 466 177 L459 139 C457 120 470 108 484 108 C502 108 515 126 512 145 L507 184 L501 143 C499 126 507 117 516 120 C526 123 529 138 527 153 C524 174 531 189 545 187 C558 185 560 171 556 163 C552 156 543 158 543 166 C544 181 562 194 575 187 C584 181 582 158 582 137 L586 72 L591 62 L588 51 L593 42 L591 31 L597 22 L600 8 L603 22 L609 31 L607 42 L612 51 L609 62 L614 72 L619 137 C619 165 614 184 628 190 C644 197 655 185 655 169 L655 49 L660 28 L664 49 C677 51 683 58 683 69 L692 72 L692 92 L699 94 L699 174 C699 188 707 190 716 190"
                      ></path>

                      <path
                        className="rs-why-brochure__dubai-detail"
                        d="M91 91 C108 80 132 91 143 110 M91 119 C109 107 134 115 148 132 M92 147 C110 137 134 142 147 154 M448 139 C449 119 462 103 481 102 C501 101 517 117 519 139 M457 151 C471 142 496 143 510 154"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="rs-why-brochure__grid">
                  <div className="row g-4">
                    {whyChooseCards.map((item, index) => (
                      <div
                        className="col-md-6"
                        key={item.id || index}
                        data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                        data-aos-delay={300 + index * 150}
                      >
                        <article className="rs-why-brochure__card">
                          <div className="rs-why-brochure__card-inner">
                            <div className="rs-why-brochure__card-face rs-why-brochure__card-front">
                              <div className="rs-why-brochure__top">
                                <span className="rs-why-brochure__icon">
                                  <i className="bi bi-buildings"></i>
                                </span>

                                <span className="rs-why-brochure__number">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                              </div>

                              <h3 className="rs-why-brochure__card-title">
                                {item.title}
                              </h3>
                            </div>

                            <div className="rs-why-brochure__card-face rs-why-brochure__card-back">
                              

                              <p className="rs-why-brochure__text">
                                {item.description}
                              </p>

                              <span className="rs-why-brochure__back-number">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),

      show: show_benefits,
    },

    // ============================================
    // PROCESSES
    // ============================================

    processes: {
      component: (
        <section key="processes" className="rs-pixora-title">
          <div className="container-fluid px-3 px-xl-5">
            <div className="rs-pixora-title__hero">
              <h2 className="rs-pixora-title__headline">
                <span className="rs-pixora-title__line rs-pixora-title__line--one">
                  <span className="rs-pixora-title__word rs-pixora-title__word--rtl">
                    Why
                  </span>

                  <span className="rs-pixora-title__word rs-pixora-title__word--ltr">
                    Professional
                  </span>

                  <span className="rs-pixora-title__image rs-pixora-title__image--pill">
                    <img src="/assets/img/brochur-1.webp" alt="Brochure" />
                  </span>

                  <span className="rs-pixora-title__word rs-pixora-title__word--red rs-pixora-title__word--rtl">
                    Brochure
                  </span>
                </span>

                <span className="rs-pixora-title__line rs-pixora-title__line--two">
                  <span className="rs-pixora-title__image rs-pixora-title__image--square">
                    <img src="/assets/img/bro-visual.webp" alt="Brochure" />
                  </span>

                  <span className="rs-pixora-title__word rs-pixora-title__word--ltr">
                    Design
                  </span>

                  <span className="rs-pixora-title__line rs-pixora-title__line--three">
                    <span className="rs-pixora-title__word rs-pixora-title__word--rtl">
                      Matters
                    </span>

                    <span className="rs-pixora-title__image rs-pixora-title__image--portrait">
                      <img src="/assets/img/print-bro.webp" alt="Brochure" />
                    </span>
                  </span>
                </span>
              </h2>
            </div>

            <div className="container">
              <div
                className="letconnect py-4"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <span
                  className="text-white"
                  data-aos="fade-right"
                  data-aos-delay="250"
                >
                  View our Work :
                </span>

                <div
                  className="line"
                  data-aos="zoom-in"
                  data-aos-delay="350"
                ></div>

                <a href="#" data-aos="fade-left" data-aos-delay="450">
                  Our Portfolio
                </a>
              </div>
            </div>

            <div
              className="container rs-pixora-title__content"
              style={{
                maxWidth: "1600px",
              }}
            >
              <div className="row g-5">
                <div
                  className="col-lg-8"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  <article className="rs-pixora-title__content-col">
                    <span className="rs-pixora-title__number">01</span>

                    <h3 className="rs-pixora-title__content-title">
                      More Than Just a Brochure
                    </h3>

                    <p className="rs-pixora-title__text">
                      A brochure is not just a piece of printed paper, it's one
                      of the top marketing tools your business can use. It
                      represents your brand's values and story to the target
                      customers and attracts new ones.
                    </p>

                    <p className="rs-pixora-title__text">
                      When customers connect with your story and understand your
                      products and services easily, they will become more loyal.
                      Your sales team will easily handle conferences,
                      presentations and networking with well designed brochures.
                    </p>
                  </article>
                </div>

                <div
                  className="col-lg-4"
                  data-aos="fade-left"
                  data-aos-delay="300"
                >
                  <article className="rs-pixora-title__content-col rs-pixora-title__content-col--right">
                    <span className="rs-pixora-title__number">02</span>

                    <h3 className="rs-pixora-title__content-title">
                      Build Trust Through Professional Design
                    </h3>

                    <p className="rs-pixora-title__text">
                      Businesses who invest in brochure design services get a
                      perfect marketing tool to promote their brand. A
                      well-designed brochure positions your brand strategically
                      in this intense competition.
                    </p>
                  </article>
                </div>
              </div>

              <span
                className="rs-pixora-title__accent"
                aria-hidden="true"
              ></span>
            </div>
          </div>
        </section>
      ),

      show: show_processes,
    },

    // ============================================
    // GALLERY
    // ============================================

    gallery: {
      component: (
        <>
          <Lightbox
            open={galleryLightboxOpen}
            close={() => setGalleryLightboxOpen(false)}
            index={galleryLightboxIndex}
            slides={gallerySlides}
          />

          <section
            key="gallery"
            id="portfolio"
            className="portfolio section pt-0 rs-custom-gallery"
          >
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

            <div className="container">
              <div
                className="isotope-layout"
                data-default-filter="*"
                data-layout="masonry"
                data-sort="original-order"
              >
                <ul
                  className="portfolio-filters isotope-filters d-none"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <li data-filter="*" className="filter-active">
                    All
                  </li>
                </ul>

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
                    <div className="rs-custom-gallery-empty">
                      <p>No gallery images available</p>
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

    // ============================================
    // FAQ
    // ============================================

    faqs: {
      component: (
        <section
          key="faqs"
          id="rs-faq-sec"
          className="home-faq rs-faq-sec section pb-5 pt-0 light-background"
        >
          <div
            className="container"
            style={{
              maxWidth: "1600px",
              background: "#f6f6f6",
              padding: "40px",
              borderRadius: "30px",
            }}
          >
            <div
              className="text-start mb-5 border-bottom pb-3"
              data-aos="fade-up"
            >
              <h2 className="fw-bold">
                {faqs_title || "Frequently Asked Questions"}
              </h2>

              <p>
                {faqs_subtitle ||
                  "Find quick answers to common questions about our services."}
              </p>
            </div>

            {faqData.length > 0 ? (
              <div className="row g-4">
                <div
                  className="col-lg-6"
                  data-aos="fade-right"
                  data-aos-delay="150"
                >
                  <div className="accordion" id="faqLeft-brochure">
                    {faqData
                      .slice(0, Math.ceil(faqData.length / 2))
                      .map((faq, idx) => (
                        <div
                          className="accordion-item"
                          key={faq.id || `left-${idx}`}
                        >
                          <h3 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-brochure-left-${idx}`}
                            >
                              {faq.question}
                            </button>
                          </h3>

                          <div
                            id={`faq-brochure-left-${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqLeft-brochure"
                          >
                            <div className="accordion-body">{faq.answer}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div
                  className="col-lg-6"
                  data-aos="fade-left"
                  data-aos-delay="250"
                >
                  <div className="accordion" id="faqRight-brochure">
                    {faqData
                      .slice(Math.ceil(faqData.length / 2))
                      .map((faq, idx) => (
                        <div
                          className="accordion-item"
                          key={faq.id || `right-${idx}`}
                        >
                          <h3 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-brochure-right-${idx}`}
                            >
                              {faq.question}
                            </button>
                          </h3>

                          <div
                            id={`faq-brochure-right-${idx}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqRight-brochure"
                          >
                            <div className="accordion-body">{faq.answer}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center">No FAQs available</p>
            )}
          </div>
        </section>
      ),

      show: show_faqs,
    },

    // ============================================
    // CTA
    // ============================================

    cta: {
      component: <ServiceCTA service={data} key="cta" />,
      show: show_cta,
    },
  };

  // ============================================
  // RENDER SECTIONS
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
        "gallery",
        "faqs",
        "cta",
      ];
    }

    return order
      .map((key) => {
        const section = sectionMap[key];

        if (!section) {
          return null;
        }

        return section.show ? section.component : null;
      })
      .filter(Boolean);
  };

  // ============================================
  // FINAL RENDER
  // ============================================

  return (
    <div style={styles}>
      {custom_css && (
        <style
          dangerouslySetInnerHTML={{
            __html: custom_css,
          }}
        />
      )}

      <main className="service-template">{renderSections()}</main>

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
