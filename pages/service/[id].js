import PageStyles from "../../components/seo/PageStyles";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import { fetchAllServices, fetchServiceBySlug } from "../../lib/api";
import { productionCanonical } from "../../lib/seo";

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

const discardInvalidCustomJs = (service) => {
  if (typeof service?.custom_js !== "string" || !service.custom_js.trim()) {
    return service;
  }

  try {
    new Function(service.custom_js);
    return service;
  } catch (error) {
    console.error(`Invalid custom_js for service "${service.slug}":`, error);

    return {
      ...service,
      custom_js: "",
    };
  }
};

export default function ServiceDetail({ service }) {
  const router = useRouter();

  // =====================================================
  // FALLBACK
  // =====================================================

  if (router.isFallback) {
    return (
      <Layout>
        <PageStyles href="/assets/css/pages/service.css" />
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
  // FINAL SERVICE URL
  // =====================================================

  const serviceUrl = productionCanonical(`/service/${service.slug}/`);

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

    canonical: serviceUrl,

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
      <PageStyles href="/assets/css/pages/service.css" />
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

    const service = discardInvalidCustomJs(await fetchServiceBySlug(params.id));

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
