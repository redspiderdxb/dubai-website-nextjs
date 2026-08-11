import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import { fetchAllServices, fetchServiceBySlug } from "../../lib/api";

// 🔥 Import all template components
import WebDevelopmentTemplate from "../../components/templates/WebDevelopmentTemplate";
import LogoDesignTemplate from "../../components/templates/LogoDesignTemplate";
import BrochureDesignTemplate from "../../components/templates/BrochureDesignTemplate";
import GraphicDesignTemplate from "../../components/templates/GraphicDesignTemplate";
import EcommerceTemplate from "../../components/templates/EcommerceTemplate";
import EmailMarketingTemplate from "../../components/templates/EmailMarketingTemplate";
import HostingTemplate from "../../components/templates/HostingTemplate";
import MobileAppTemplate from "../../components/templates/MobileAppTemplate";

// 🔥 Template Component Map
const TEMPLATE_COMPONENTS = {
  "web-development": WebDevelopmentTemplate,
  "logo-design": LogoDesignTemplate,
  "brochure-design": BrochureDesignTemplate,
  "graphic-design": GraphicDesignTemplate,
  ecommerce: EcommerceTemplate,
  "email-marketing": EmailMarketingTemplate,
  "web-hosting": HostingTemplate,
  "mobile-app": MobileAppTemplate,
};

export default function ServiceDetail({ service }) {
  const router = useRouter();

  // 🔥 Loading state (fallback)
  if (router.isFallback) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // 🔥 404 - Service not found
  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">
            The service you are looking for does not exist.
          </p>
          <a
            href="/services"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View All Services
          </a>
        </div>
      </Layout>
    );
  }

  // 🔥 Get template component
  const TemplateComponent =
    TEMPLATE_COMPONENTS[service.template] || WebDevelopmentTemplate;

  // 🔥 SEO Data - Now using service.seo_* fields from backend
  const seoData = {
    title: service.seo_title || service.name || "Services | RedSpider",
    description: service.seo_description || service.description || "",
    keywords: service.seo_keywords || "",
    canonical:
      service.canonical_url ||
      `https://www.redspider.ae/services/${service.slug}`,
    image: service.image
      ? `${process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost/redspider/public"}/storage/${service.image}`
      : null,
    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />
      <main className="main">
        <TemplateComponent data={service} />
      </main>
    </Layout>
  );
}

// 🔥 getStaticPaths - Sab services ke slugs generate karo
export async function getStaticPaths() {
  try {
    const response = await fetchAllServices();
    const services = response?.data || [];

    const paths = services.map((service) => ({
      params: { id: service.slug },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching service paths:", error);
    return { paths: [], fallback: "blocking" };
  }
}

// 🔥 getStaticProps - Ek service ka data fetch karo
export async function getStaticProps({ params }) {
  try {
    const service = await fetchServiceBySlug(params.id);

    if (!service) {
      return { notFound: true };
    }

    return {
      props: {
        service: service,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching service:", error);
    return { notFound: true };
  }
}
