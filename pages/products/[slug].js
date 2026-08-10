import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import { fetchAllProducts, fetchProductBySlug } from "../../lib/api";

// 🔥 Import all product template components - Path Sahi Karo
import RealEstatePortalTemplate from "../../components/product-templates/RealEstatePortalTemplate";
import SmsMarketingTemplate from "../../components/product-templates/SmsMarketingTemplate";
import DailyDealTemplate from "../../components/product-templates/DailyDealTemplate";
import ClassifiedDirectoryTemplate from "../../components/product-templates/ClassifiedDirectoryTemplate";

// 🔥 Template Component Map
const TEMPLATE_COMPONENTS = {
  'real-estate-portal': RealEstatePortalTemplate,
  'sms-marketing': SmsMarketingTemplate,
  'daily-deal': DailyDealTemplate,
  'classified-directory': ClassifiedDirectoryTemplate,
};

export default function ProductDetail({ product }) {
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

  // 🔥 404 - Product not found
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            The product you are looking for does not exist.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </a>
        </div>
      </Layout>
    );
  }

  // 🔥 Get template component
  const TemplateComponent = TEMPLATE_COMPONENTS[product.template] || RealEstatePortalTemplate;

  // 🔥 SEO Data
  const seoData = {
    title: product.seo_title || product.name || "Products | RedSpider",
    description: product.seo_description || product.description || "",
    keywords: product.seo_keywords || "",
    canonical: product.canonical_url || `https://www.redspider.ae/products/${product.slug}`,
    image: product.image
      ? `https://www.redspider.ae/storage/${product.image}`
      : null,
    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />
      <main className="main">
        <TemplateComponent data={product} />
      </main>
    </Layout>
  );
}

// 🔥 getStaticPaths - Sab products ke slugs generate karo
export async function getStaticPaths() {
  try {
    const products = await fetchAllProducts();

    const paths = products.map((product) => ({
      params: { slug: product.slug },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching product paths:", error);
    return { paths: [], fallback: "blocking" };
  }
}

// 🔥 getStaticProps - Ek product ka data fetch karo
export async function getStaticProps({ params }) {
  try {
    const product = await fetchProductBySlug(params.slug);

    if (!product) {
      return { notFound: true };
    }

    return {
      props: {
        product: product,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };
  }
}