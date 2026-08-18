import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import { fetchAllProducts, fetchProductBySlug } from "../../lib/api";

import RealEstatePortalTemplate from "../../components/product-templates/RealEstatePortalTemplate";
import SmsMarketingTemplate from "../../components/product-templates/SmsMarketingTemplate";
import DailyDealTemplate from "../../components/product-templates/DailyDealTemplate";
import ClassifiedDirectoryTemplate from "../../components/product-templates/ClassifiedDirectoryTemplate";
// 🔥 CRM Template Import
import CrmTemplate from "../../components/product-templates/CrmTemplate";

const TEMPLATE_COMPONENTS = {
  "real-estate-portal": RealEstatePortalTemplate,
  "sms-marketing": SmsMarketingTemplate,
  "daily-deal": DailyDealTemplate,
  "classified-directory": ClassifiedDirectoryTemplate,
  "crm-software": CrmTemplate, // 🔥 ADD THIS
};

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <h2>Loading...</h2>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <main className="main">
          <div className="container py-5 text-center">
            <h1>Product Not Found</h1>
            <p>The product you are looking for does not exist.</p>
          </div>
        </main>
      </Layout>
    );
  }

  const TemplateComponent =
    TEMPLATE_COMPONENTS[product.template] || RealEstatePortalTemplate;

  const seoData = {
    title: product.seo_title || product.name || "Products | RedSpider",

    description: product.seo_description || product.description || "",

    keywords: product.seo_keywords || "",

    canonical:
      product.canonical_url ||
      `https://www.redspider.ae/products/${product.slug}`,

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

/* =====================================================
   STATIC PATHS
===================================================== */

export async function getStaticPaths() {
  try {
    const products = await fetchAllProducts();

    const paths = Array.isArray(products)
      ? products
          .filter((product) => product?.slug)
          .map((product) => ({
            params: {
              slug: product.slug,
            },
          }))
      : [];

    console.log("PRODUCT PATHS:", paths);

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("PRODUCT PATH ERROR:", error);

    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

/* =====================================================
   STATIC PROPS
===================================================== */

export async function getStaticProps({ params }) {
  try {
    if (!params?.slug) {
      return {
        notFound: true,
      };
    }

    const product = await fetchProductBySlug(params.slug);

    console.log("PRODUCT DETAIL:", params.slug, product);

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },

      revalidate: 60,
    };
  } catch (error) {
    console.error("PRODUCT DETAIL ERROR:", error);

    return {
      notFound: true,
    };
  }
}
