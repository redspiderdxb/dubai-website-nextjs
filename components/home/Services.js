import Link from "next/link";
import { useState } from "react";

export default function Services({ data, initialServices = [] }) {
  // ============================================
  // SERVICES DATA
  // ============================================

  const [services] = useState(
    Array.isArray(initialServices) ? initialServices : [],
  );

  // ============================================
  // CMS CONTENT
  // ============================================

  const servicesTitle =
    data?.services_title || "Professional Web Design Dubai Company";

  const servicesDescription =
    data?.services_description ||
    "As a Best Web Design Company in Dubai, we focus on quality, innovation, and speed. RedSpider Web & Art Design is the best Dubai Web Design & Development Company. We specialize in creating websites Design, doing SEO, developing PHP Web Application, custom CMS & CRM solutions, mobile apps, and Ecommerce Web Design, Shopify Store Design & Development as well as Graphic Designing and branding services including PHP Developer Dubai. We are a trusted web design Dubai company that focuses on creating modern and user-friendly websites.";

  // ============================================
  // FALLBACK ICONS
  // ============================================

  const serviceIcons = [
    "bi-code-slash",
    "bi-laptop",
    "bi-phone",
    "bi-cart-check",
    "bi-palette",
    "bi-graph-up-arrow",
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
          {servicesTitle}
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
          SERVICES GRID
      ========================================== */}

      <div className="container">
        <div className="row gy-4">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={service.id || service.slug || index}
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={index * 100 + 100}
              >
                <div className="rs-service-card position-relative">
                  {/* ICON */}

                  <div className="rs-service-icon">
                    <i
                      className={serviceIcons[index % serviceIcons.length]}
                      aria-hidden="true"
                    ></i>
                  </div>

                  {/* TITLE */}

                  <h3>{service.name}</h3>

                  {/* DESCRIPTION */}

                  <p>{service.description}</p>

                  {/* LINK */}

                  <Link
                    href={`/services/${service.slug}`}
                    className="stretched-link"
                    aria-label={`Learn more about ${service.name}`}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No services available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
