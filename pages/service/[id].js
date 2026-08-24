import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import { fetchAllServices, fetchServiceBySlug } from "../../lib/api";

import WebDevelopmentTemplate from "../../components/templates/WebDevelopmentTemplate";
import LogoDesignTemplate from "../../components/templates/LogoDesignTemplate";
import BrochureDesignTemplate from "../../components/templates/BrochureDesignTemplate";
import GraphicDesignTemplate from "../../components/templates/GraphicDesignTemplate";
import EcommerceTemplate from "../../components/templates/EcommerceTemplate";
import EmailMarketingTemplate from "../../components/templates/EmailMarketingTemplate";
import HostingTemplate from "../../components/templates/HostingTemplate";
import MobileAppTemplate from "../../components/templates/MobileAppTemplate";
import WhatsAppBusinessTemplate from "../../components/templates/WhatsAppBusinessTemplate";

// =====================================================
// TEMPLATE COMPONENTS
// =====================================================

const TEMPLATE_COMPONENTS = {
  "web-development": WebDevelopmentTemplate,
  "logo-design": LogoDesignTemplate,
  "brochure-design": BrochureDesignTemplate,
  "graphic-design": GraphicDesignTemplate,
  ecommerce: EcommerceTemplate,
  "email-marketing": EmailMarketingTemplate,
  "web-hosting": HostingTemplate,
  "mobile-app": MobileAppTemplate,
  "whatsapp-business": WhatsAppBusinessTemplate,
};

export default function ServiceDetail({ service }) {
  const router = useRouter();

  // =====================================================
  // FALLBACK
  // =====================================================

  if (router.isFallback) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <h2>Loading...</h2>
        </div>
      </Layout>
    );
  }

  // =====================================================
  // SERVICE NOT FOUND
  // =====================================================

  if (!service) {
    return (
      <Layout>
        <main className="main">
          <div className="container py-5 text-center">
            <h1>Service Not Found</h1>
            <p>The service you are looking for does not exist.</p>
          </div>
        </main>
      </Layout>
    );
  }

  // =====================================================
  // SELECT TEMPLATE
  // =====================================================

  const TemplateComponent =
    TEMPLATE_COMPONENTS[service.template] || WebDevelopmentTemplate;

  // =====================================================
  // DEBUG
  // =====================================================

  console.log("SERVICE TEMPLATE:", service.template);
  console.log("SERVICE DATA:", service);

  // =====================================================
  // FINAL SERVICE URL
  // =====================================================

  const serviceUrl = `https://www.redspider.ae/service/${service.slug}/`;

  // =====================================================
  // IMAGE URL
  // =====================================================

  const serviceImage = service.image
    ? `${
        process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public"
      }/storage/${service.image}`
    : "https://www.redspider.ae/assets/img/og-image.webp";

  // =====================================================
  // SEO DATA
  // =====================================================

  const seoData = {
    title: service.seo_title || service.name || "Services | RedSpider",

    description: service.seo_description || service.description || "",

    keywords: service.seo_keywords || "",

    canonical: service.canonical_url || serviceUrl,

    image: serviceImage,

    robots: "index,follow",
  };

  // =====================================================
  // SERVICE SCHEMA
  // =====================================================

  const serviceSchema = {
    "@type": "Service",

    "@id": `${serviceUrl}#service`,

    name: service.name || "Web Design & Development Services",

    description: service.seo_description || service.description || "",

    url: serviceUrl,

    provider: {
      "@id": "https://www.redspider.ae/#localbusiness",
    },

    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },

    serviceType: service.name || "Web Design & Development",
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Layout>
      <SEO {...seoData} serviceSchema={serviceSchema} />

      <main className="main">
        <TemplateComponent data={service} service={service} />
      </main>
    </Layout>
  );
}

// =====================================================
// STATIC PATHS
// =====================================================

export async function getStaticPaths() {
  try {
    const services = await fetchAllServices();

    const paths = Array.isArray(services)
      ? services
          .filter((service) => service?.slug)
          .map((service) => ({
            params: {
              id: service.slug,
            },
          }))
      : [];

    console.log("SERVICE PATHS:", paths);

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("SERVICE PATH ERROR:", error);

    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

// =====================================================
// STATIC PROPS
// =====================================================

export async function getStaticProps({ params }) {
  try {
    if (!params?.id) {
      return {
        notFound: true,
      };
    }

    const service = await fetchServiceBySlug(params.id);

    console.log("SERVICE DETAIL:", params.id, service);

    if (!service) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        service,
      },

      revalidate: 60,
    };
  } catch (error) {
    console.error("SERVICE DETAIL ERROR:", error);

    return {
      notFound: true,
    };
  }
}
