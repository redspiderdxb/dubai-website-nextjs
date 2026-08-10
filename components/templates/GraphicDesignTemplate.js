// frontend/components/templates/GraphicDesignTemplate.js
import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

export default function GraphicDesignTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

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
    intro_small_heading,
    intro_main_heading,
    intro_description,
    intro_image,
    cta_title,
    cta_description,
    cta_button_text,
    cta_button_link,
    cta_background,
    // Repeater Data
    features = [],
    processes = [],
    faqs = [],
    gallery = [],
  } = data;

  const circleText = "Years of Design Experience";

  // ============================================
  // 📊 DYNAMIC DATA WITH STATIC FALLBACK
  // ============================================

  // 1. Graphic Services - Dynamic from backend or static fallback
  const graphicServices =
    features.length > 0
      ? features
      : [
          {
            id: 1,
            title: "Business Brochure Design",
            description:
              "Distribute professionally created brochures that feature appealing designs and captivating information about your products and services. Whether it is a meeting, exhibition or marketing campaign, our brochure designs make a good impression.",
          },
          {
            id: 2,
            title: "Logo Design",
            description:
              "Your logo will be the face of your business. Being an established logo design company in Dubai, we develop one-of-a-kind logos that capture the nature and personality of your brand and are easily recognizable on social media, websites, signage, packaging and print media.",
          },
          {
            id: 3,
            title: "Business Card Design",
            description:
              "We can design a professional business card to make a long lasting impression on your potential customers.",
          },
          {
            id: 4,
            title: "Letterhead Design",
            description:
              "Establish a business identity by using custom designed letterhead design to make your business documents look elegant and consistent.",
          },
          {
            id: 5,
            title: "Flyer Design",
            description:
              "Are you promoting an event or launching a new product or special offer? No doubt, the creative flyers can help you do your work successfully. We design visually appealing flyers that will cater to your needs.",
          },
          {
            id: 6,
            title: "Banner & Advertising Design",
            description:
              "We create digital and print marketing assets such as website banners, social media graphics, online ads, promotional posters, exhibition graphics, and more, all branded to enhance your marketing efforts.",
          },
        ];

  // 2. Process Steps - Dynamic from backend or static fallback
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

  // 3. FAQ Data - Dynamic from backend or static fallback
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

  // 4. Gallery Images - Dynamic from backend
  const galleryImages = gallery.length > 0 ? gallery : [];

  return (
    <>
      <ServiceHero service={data} />

      {/* Intro Section */}
      <section className="rs-gd-intro">
        <span className="rs-gd-intro__shape" aria-hidden="true"></span>
        <div className="container-fluid px-3 px-md-4 px-xl-5">
          <div className="row gx-xl-5 align-items-start">
            <div className="col-lg-3">
              <div className="rs-gd-intro__rail">
                <span className="rs-gd-intro__rail-icon">
                  <i className="bi bi-bezier2"></i>
                </span>
                <span className="rs-gd-intro__rail-text">
                  {intro_small_heading || "Graphic Design · Dubai"}
                </span>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="rs-gd-intro__copy">
                <p className="rs-gd-intro__lead rs-gd-intro__reveal">
                  {intro_description ||
                    "At RedSpider Web & Art Design, we offer professional graphic design services in Dubai to help businesses build a strong and consistent identity. Our creative team designs visuals that are not only impressive but communicate your brand's message clearly."}
                </p>
                <p className="rs-gd-intro__support rs-gd-intro__reveal">
                  Whether you are a startup launching a new brand or an
                  established company revamping your marketing strategies, we
                  create designs that are tailored to meet your goals. Every
                  project is carefully planned to ensure consistency whether for
                  print or digital platforms.
                </p>
                <div className="rs-gd-intro__footer">
                  <a
                    className="rs-gd-intro__link"
                    href="#graphic-design-services"
                  >
                    <span>Explore our designs</span>
                    <i className="bi bi-arrow-up-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-2">
              <div className="rs-gd-intro__meta">Creative since 2010</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services + Process Section */}
      <section className="premium-services-section">
        <div className="premium-container">
          <div className="premium-grid">
            {/* Left Column - Services */}
            <div className="premium-col premium-col-left">
              <div className="premium-services">
                <span className="premium-badge">SERVICES</span>
                <h2 className="premium-title">
                  Our <span className="premium-highlight">Graphic Design</span>{" "}
                  Services
                </h2>
                <p className="premium-subtitle">
                  We offer a wide range of graphic design services tailored to
                  your needs.
                </p>

                <div className="premium-accordion">
                  {graphicServices.map((service, index) => (
                    <div
                      key={service.id || index}
                      className="premium-accordion-item"
                    >
                      <button
                        className={`premium-accordion-btn ${index === 0 ? "active" : ""}`}
                        onClick={(e) => {
                          const btn = e.currentTarget;
                          const item = btn.parentElement;
                          const body = item.querySelector(
                            ".premium-accordion-body",
                          );
                          const isActive = btn.classList.contains("active");

                          // Close all accordion items in left column
                          const allItems = document.querySelectorAll(
                            ".premium-col-left .premium-accordion-item",
                          );
                          allItems.forEach((el) => {
                            el.querySelector(
                              ".premium-accordion-btn",
                            ).classList.remove("active");
                            el.querySelector(
                              ".premium-accordion-body",
                            ).classList.remove("active");
                          });

                          if (!isActive) {
                            btn.classList.add("active");
                            body.classList.add("active");

                            // Change image based on clicked service
                            const images = document.querySelectorAll(
                              ".premium-main-image",
                            );
                            images.forEach((img) =>
                              img.classList.remove("active"),
                            );
                            const targetImage = document.querySelector(
                              `.premium-main-image-${index + 1}`,
                            );
                            if (targetImage)
                              targetImage.classList.add("active");
                          }
                        }}
                      >
                        <span className="premium-accordion-icon">
                          {index === 0 ? "−" : "+"}
                        </span>
                        <span className="premium-accordion-title">
                          {service.title}
                        </span>
                      </button>
                      <div
                        className={`premium-accordion-body ${index === 0 ? "active" : ""}`}
                      >
                        <p className="premium-accordion-text">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="premium-connect">
                  <span className="premium-connect-label">
                    Know More About:
                  </span>
                  <div className="premium-connect-line"></div>
                  <a href="#" className="premium-connect-link">
                    Contact us
                  </a>
                </div>
              </div>
            </div>

            {/* Center Column - Image */}
            <div className="premium-col premium-col-center">
              <div className="premium-image-wrapper">
                <img
                  className="premium-main-image premium-main-image-1 active"
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop"
                  alt="Design showcase"
                />
                <img
                  className="premium-main-image premium-main-image-2"
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop"
                  alt="Design showcase"
                />
                <img
                  className="premium-main-image premium-main-image-3"
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1400&auto=format&fit=crop"
                  alt="Design showcase"
                />
                <img
                  className="premium-main-image premium-main-image-4"
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop"
                  alt="Design showcase"
                />
                <img
                  className="premium-main-image premium-main-image-5"
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop"
                  alt="Design showcase"
                />
                <img
                  className="premium-main-image premium-main-image-6"
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1400&auto=format&fit=crop"
                  alt="Design showcase"
                />
              </div>
            </div>

            {/* Right Column - Process */}
            <div className="premium-col premium-col-right">
              <div className="premium-process">
                <div className="premium-process-header">
                  <span className="premium-badge">PROCESS</span>
                  <h6 className="premium-process-title">
                    Our <br /> Graphic Design <br /> Process
                  </h6>
                </div>
                <p className="premium-process-subtitle">
                  We work hard to create a graphic design that can keep our
                  clients satisfied. Here is how it begins:
                </p>

                <div className="premium-process-accordion">
                  {processData.map((process, index) => (
                    <div
                      key={process.id || index}
                      className={`premium-process-item ${index === 0 ? "active" : ""}`}
                    >
                      <button
                        className="premium-process-btn"
                        onClick={(e) => {
                          const btn = e.currentTarget;
                          const item = btn.parentElement;
                          const body = item.querySelector(
                            ".premium-process-body",
                          );
                          const isActive = item.classList.contains("active");

                          // Close all process items in right column
                          const allItems = document.querySelectorAll(
                            ".premium-col-right .premium-process-item",
                          );
                          allItems.forEach((el) => {
                            el.classList.remove("active");
                          });

                          if (!isActive) {
                            item.classList.add("active");
                          }
                        }}
                      >
                        <span className="premium-process-number">
                          {index + 1}.
                        </span>
                        <span className="premium-process-name">
                          {process.title}
                        </span>
                        <span className="premium-process-arrow">↗</span>
                      </button>
                      <div className="premium-process-body">
                        <p className="premium-process-text">
                          {process.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why RedSpider */}
      <section className="rs-agency-intro-sec">
        <div className="container">
          <h2 className="rs-agency-big-title">
            Why Choose <span className="text-red">RedSpider</span> for Graphic
            Design Services in Dubai?
          </h2>
          <div className="row rs-agency-bottom align-items-center">
            <div className="col-lg-5"></div>
            <div className="col-lg-4">
              <p className="rs-agency-text">
                We have a wealth of experience in the UAE assisting businesses
                in design to reinforce their branding and drive business growth.
              </p>
            </div>
            <div className="col-lg-1 d-none d-lg-block">
              <div className="rs-agency-line"></div>
            </div>
            <div className="col-lg-1">
              <div className="rs-agency-circle-wrap">
                <div className="rs-agency-scroll-text" id="rsAgencyCircleText">
                  {circleText.split("").map((char, index) => (
                    <span
                      key={index}
                      style={{
                        transform: `rotate(${index * (360 / circleText.length)}deg) translate(62px)`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div className="rs-agency-circle-center">14+</div>
              </div>
            </div>
          </div>
          <div className="row rs-agency-bottom align-items-center">
            <div className="letconnect mt-5">
              <span className="text-white">Let's Connect :</span>
              <div className="line"></div>
              <a href={cta_button_link || "#"}>
                {cta_button_text || "Book A Call"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why US Cards */}
      <section className="rs-vertical-cards">
        <div className="rs-vertical-cards__sticky">
          <div className="rs-vertical-cards__label">Scroll to explore</div>
          <h2 className="rs-vertical-cards__word fw-bold text-uppercase text-white">
            Why US
          </h2>

          <div className="rs-vertical-cards__lane rs-vertical-cards__lane--1">
            <article className="rs-vertical-cards__card">
              <div className="rs-vertical-cards__card-inner">
                <div className="rs-vertical-cards__card-head">
                  <i className="bi bi-person-badge rs-vertical-cards__icon"></i>
                  <h3 className="rs-vertical-cards__title">
                    Dedicated In-House Creative Team
                  </h3>
                </div>
                <p className="rs-vertical-cards__text">
                  The highly experienced designers collaborate with the clients
                  to provide innovative solutions without compromising standards
                  across all projects.
                </p>
              </div>
            </article>
          </div>

          <div className="rs-vertical-cards__lane rs-vertical-cards__lane--2">
            <article className="rs-vertical-cards__card">
              <div className="rs-vertical-cards__card-inner">
                <div className="rs-vertical-cards__card-head">
                  <i className="bi bi-rocket-takeoff rs-vertical-cards__icon"></i>
                  <h3 className="rs-vertical-cards__title">
                    Design with Purpose
                  </h3>
                </div>
                <p className="rs-vertical-cards__text">
                  All designs we create have a clear purpose to convey your
                  brand's message across various customers.
                </p>
              </div>
            </article>
          </div>

          <div className="rs-vertical-cards__lane rs-vertical-cards__lane--3">
            <article className="rs-vertical-cards__card">
              <div className="rs-vertical-cards__card-inner">
                <div className="rs-vertical-cards__card-head">
                  <i className="bi bi-people rs-vertical-cards__icon"></i>
                  <h3 className="rs-vertical-cards__title">
                    Fast Delivery & Clear Communication
                  </h3>
                </div>
                <p className="rs-vertical-cards__text">
                  We value your time. We have a streamlined workflow, clear
                  communication and timely updates, so that each project remains
                  on schedule.
                </p>
              </div>
            </article>
          </div>

          <div className="rs-vertical-cards__lane rs-vertical-cards__lane--4">
            <article className="rs-vertical-cards__card">
              <div className="rs-vertical-cards__card-inner">
                <div className="rs-vertical-cards__card-head">
                  <i className="bi bi-clock-history rs-vertical-cards__icon"></i>
                  <h3 className="rs-vertical-cards__title">
                    Print & Digital Ready Designs
                  </h3>
                </div>
                <p className="rs-vertical-cards__text">
                  Each design is presented in professional formats for
                  commercial print, web, social media, presentations and other
                  digital media.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Gallery - Dynamic */}
      {galleryImages.length > 0 && (
        <section className="opposite-gallery-sec py-0">
          <div className="opposite-gallery-sticky">
            <div className="gallery-title-wrap">
              <span>Our Work</span>
              <h2>Our Gallery</h2>
            </div>
            <div className="gallery-inner">
              <div className="gallery-track top-track">
                {galleryImages.slice(0, 6).map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`gallery-card ${
                      index % 3 === 0 ? "large" : index % 3 === 2 ? "small" : ""
                    }`}
                  >
                    <img src={item.image} alt={item.title || "Gallery Image"} />
                  </div>
                ))}
              </div>
              {galleryImages.length > 6 && (
                <div className="gallery-track bottom-track">
                  {galleryImages.slice(6, 12).map((item, index) => (
                    <div
                      key={item.id || index}
                      className={`gallery-card ${
                        index % 3 === 1
                          ? "large"
                          : index % 3 === 0
                            ? "small"
                            : ""
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.title || "Gallery Image"}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section id="review-sec" className="review-sec section light-background">
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="review-wrap">
            <img
              src="/assets/img/reviewimg.png"
              alt="Reviews"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      {/* FAQs - Dynamic */}
      {faqData.length > 0 && (
        <section
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
            <div className="text-start mb-5 border-bottom pb-3">
              <h2 className="fw-bold">Frequently Asked Questions</h2>
              <p>Find quick answers to common questions about our services.</p>
            </div>
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="accordion" id="faqLeft-graphic">
                  {faqData
                    .slice(0, Math.ceil(faqData.length / 2))
                    .map((faq, idx) => (
                      <div
                        className="accordion-item"
                        key={faq.id || `left-${idx}`}
                      >
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#faq-graphic-left-${idx}`}
                            aria-expanded="false"
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          id={`faq-graphic-left-${idx}`}
                          className="accordion-collapse collapse"
                          data-bs-parent="#faqLeft-graphic"
                        >
                          <div className="accordion-body">{faq.answer}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="accordion" id="faqRight-graphic">
                  {faqData
                    .slice(Math.ceil(faqData.length / 2))
                    .map((faq, idx) => (
                      <div
                        className="accordion-item"
                        key={faq.id || `right-${idx}`}
                      >
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#faq-graphic-right-${idx}`}
                            aria-expanded="false"
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          id={`faq-graphic-right-${idx}`}
                          className="accordion-collapse collapse"
                          data-bs-parent="#faqRight-graphic"
                        >
                          <div className="accordion-body">{faq.answer}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <ServiceCTA service={data} />
    </>
  );
}
