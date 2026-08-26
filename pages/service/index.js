import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import ServiceHero from "../../components/services/ServiceHero";
import { fetchAllServices } from "../../lib/api";
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage({ services }) {
  const heroData = {
    hero_title: "Our Services",
    hero_subtitle: "Professional Digital Solutions ",
    hero_description:
      "Explore our range of professional digital services designed to help businesses build, improve and grow their online presence.",
  };

  return (
    <Layout>
      <SEO
        title="Our Services | RedSpider"
        description="Explore our range of professional services in Dubai"
        canonical="https://www.redspider.ae/service/"
        noIndex={false}
      />

      {/* ============================================
          SERVICE HERO
      ============================================ */}
      <div className="rs-services-hero">
        <ServiceHero service={heroData} />
      </div>

      {/* ============================================
          SERVICES LISTING
      ============================================ */}
      <section className="rs-services-listing">
        <div className="rs-services-container">
          {/* Section Heading */}
          <div className="rs-services-heading">
            <h2>Our Services</h2>

            <p>
              We offer a wide range of professional digital services to help
              your business grow and achieve its online goals.
            </p>
          </div>

          {/* Services Grid */}
          <div className="rs-services-grid">
            {services?.map((service) => (
              <Link
                key={service.id}
                href={`/service/${service.slug}/`}
                className="rs-service-card-link"
              >
                <article className="rs-service-card">
                  {/* Service Image */}
                  {service.image && (
                    <div className="rs-service-card-image">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.image}`}
                        alt={service.name || "RedSpider Service"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rs-service-image"
                      />
                    </div>
                  )}

                  {/* Service Content */}
                  <div className="rs-service-card-content">
                    <h3 className="rs-service-card-title">{service.name}</h3>

                    {service.description && (
                      <p className="rs-service-card-description">
                        {service.description}
                      </p>
                    )}

                    <span className="rs-service-card-link">
                      Learn More
                      <span className="rs-service-card-arrow">→</span>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* No Services */}
          {(!services || services.length === 0) && (
            <div className="rs-services-empty">
              <p>No services are currently available.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const services = await fetchAllServices();

    return {
      props: {
        services: Array.isArray(services) ? services : [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching services:", error);

    return {
      props: {
        services: [],
      },
      revalidate: 60,
    };
  }
}
