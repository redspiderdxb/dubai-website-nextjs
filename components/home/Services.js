import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchFeaturedServices } from "../../lib/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchFeaturedServices(6);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="services section pt-3">
        <div className="container">
          <div className="row gy-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="rs-service-card position-relative animate-pulse">
                  <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="services section pt-3">
      {/* Section Title */}
      <div
        className="container section-title text-center aos-init aos-animate pb-0"
        data-aos="fade-up"
      >
        <h1 className="rs-process-title mb-4 text-start text-center mt-4">
          Professional{" "}
          <span className="rs-process-highlight">
            Web Design Dubai Company{" "}
            <svg
              className="rs-process-underline"
              viewBox="0 0 320 22"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14"></path>
            </svg>
          </span>
        </h1>
      </div>

      {/* Description */}
      <div className="container section-title mb-4" data-aos="fade-up">
        <div className="row">
          <div className="col-12">
            <p className="mb-4">
              As a Best Web Design Company in Dubai, we focus on quality,
              innovation, and speed. RedSpider Web &amp; Art Design is the best
              Dubai Web Design &amp; Development Company. We specialize in
              creating websites Design, doing{" "}
              <a
                href="https://www.redspider.ae/service/seo-agency-dubai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                SEO
              </a>
              , developing PHP Web Application, custom CMS &amp; CRM solutions,{" "}
              <a
                href="https://www.redspider.ae/service/mobile-app-development/"
                target="_blank"
                rel="noopener noreferrer"
              >
                mobile apps
              </a>
              , and Ecommerce Web Design, Shopify Store Design &amp; Development
              as well as{" "}
              <a
                href="https://www.redspider.ae/service/graphic-design-company-dubai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Graphic Designing
              </a>{" "}
              and branding services including PHP Developer Dubai. We are a
              trusted web design Dubai company that focuses on creating modern
              and user-friendly websites.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container">
        <div className="row gy-4">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={service.id}
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={index * 100 + 100}
              >
                <div className="rs-service-card position-relative">
                  <div className="rs-service-icon">
                    <i className="bi bi-code-slash" aria-hidden="true"></i>
                  </div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="stretched-link"
                    aria-label={`Learn more about ${service.name}`}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No services available.</p>
          )}
        </div>
      </div>
    </section>
  );
}