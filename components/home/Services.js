import Link from "next/link";

export default function Services({ data }) {
  // ============================================
  // CMS CONTENT
  // ============================================

  const servicesDescription =
    data?.services_description ||
    "As a Best Web Design Company in Dubai, we focus on quality, innovation, and speed. RedSpider Web & Art Design is the best Dubai Web Design & Development Company. We specialize in creating websites Design, doing SEO, developing PHP Web Application, custom CMS & CRM solutions, mobile apps, and Ecommerce Web Design, Shopify Store Design & Development as well as Graphic Designing and branding services including PHP Developer Dubai. We are a trusted web design Dubai company that focuses on creating modern and user-friendly websites.";

  // ============================================
  // STATIC SERVICES
  // ============================================

  const services = [
    {
      title: "Web Design & Development",
      description:
        "We build modern websites that reflect your brand and engage your audience. Fast, responsive, and designed to help your business grow online.",
      icon: "bi-code-slash",
      url: "/services/web-development",
    },

    {
      title: "Web Hosting",
      description:
        "Keep your website secure, fast, and online 24/7. Reliable hosting with expert support for smooth performance.",
      icon: "bi-server",
      url: "/services/web-hosting",
    },

    {
      title: "WhatsApp Business API Integration & Marketing",
      description:
        "Connect with customers. automate conversations. and manage WhatsApp communication with powerful business solutions.",
      icon: "bi-whatsapp",
      url: "/services/whatsapp-business-api-integration",
    },

    {
      title: "Logo Design",
      description:
        "Create a logo that represents your brand. Professional designs that help your business stand out.",
      icon: "bi-brush",
      url: "/services/logo-designing-company-dubai-brand-identity",
    },

    {
      title: "Brochure / Profile Design",
      description:
        "Showcase your business with professional brochures and profiles. Clean designs that inform, impress, and build trust.",
      icon: "bi-images",
      url: "/services/brochure-design-services",
    },

    {
      title: "Email Marketing",
      description:
        "Connect with customers through effective email campaigns. Boost engagement, build loyalty, and grow your audience.",
      icon: "bi-envelope",
      url: "/services/email-marketing-services",
    },
  ];

  // ============================================
  // RENDER
  // ============================================

  return (
    <section id="services" className="services section pt-3">
      {/* ==========================================
          SECTION TITLE
      ========================================== */}

      <div
        className="container section-title text-center aos-init aos-animate pb-0"
        data-aos="fade-up"
      >
        <h1 className="rs-process-title mb-4 text-start text-center mt-4">
          Web Design
          <span className="rs-process-highlight">
            Company in Dubai{" "}
            <svg
              className="rs-process-underline"
              viewBox="0 0 320 22"
              preserveAspectRatio="none"
            >
              <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14"></path>
            </svg>
          </span>
        </h1>
      </div>

      {/* ==========================================
          DESCRIPTION
      ========================================== */}

      <div className="container section-title mb-4" data-aos="fade-up">
        <div className="row">
          <div className="col-12">
            <p className="mb-4">{servicesDescription}</p>
          </div>
        </div>
      </div>

      {/* ==========================================
          STATIC SERVICES GRID
      ========================================== */}

      <div className="container">
        <div className="row gy-4">
          {services.map((service, index) => (
            <div
              key={service.url}
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={index * 100 + 100}
            >
              <Link
                href={service.url}
                className="rs-service-card position-relative d-block text-decoration-none"
                aria-label={`Learn more about ${service.title}`}
              >
                {/* ICON */}

                <div className="rs-service-icon">
                  <i className={service.icon} aria-hidden="true"></i>
                </div>

                {/* TITLE */}

                <h3>{service.title}</h3>

                {/* DESCRIPTION */}

                <p>{service.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
