import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchFeaturedServices } from "../../lib/api";

export default function Services({ data }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get title and description from API data or use defaults
  const servicesTitle =
    data?.services_title || "Professional Web Design Dubai Company";
  const servicesDescription =
    data?.services_description ||
    "As a Best Web Design Company in Dubai, we focus on quality, innovation, and speed. RedSpider Web & Art Design is the best Dubai Web Design & Development Company. We specialize in creating websites Design, doing SEO, developing PHP Web Application, custom CMS & CRM solutions, mobile apps, and Ecommerce Web Design, Shopify Store Design & Development as well as Graphic Designing and branding services including PHP Developer Dubai. We are a trusted web design Dubai company that focuses on creating modern and user-friendly websites.";
  const servicesLimit = data?.services_limit || 6;

  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await fetchFeaturedServices(servicesLimit);
        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, [servicesLimit]);

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

  // Fallback icons for services
  const serviceIcons = [
    "bi-code-slash",
    "bi-laptop",
    "bi-phone",
    "bi-cart-check",
    "bi-palette",
    "bi-graph-up-arrow",
  ];

  return (
    <section id="services" className="services section pt-3">
      {/* Section Title */}
      <div
        className="container section-title text-center aos-init aos-animate pb-0"
        data-aos="fade-up"
      >
        <h1 className="rs-process-title mb-4 text-start text-center mt-4">
          {servicesTitle}
        </h1>
      </div>

      {/* Description */}
      <div className="container section-title mb-4" data-aos="fade-up">
        <div className="row">
          <div className="col-12">
            <p className="mb-4">{servicesDescription}</p>
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
                    <i
                      className={serviceIcons[index % serviceIcons.length]}
                      aria-hidden="true"
                    ></i>
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
