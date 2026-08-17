import SEO from "../components/seo/SEO";
import Layout from "../components/layout/Layout";

import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import QuoteForm from "../components/home/QuoteForm";
import Portfolio from "../components/home/Portfolio";
import About from "../components/home/About";
import BlogStats from "../components/home/BlogStats";
import FAQIndustries from "../components/home/FAQIndustries";
import AgencyPackages from "../components/home/AgencyPackages";

import { fetchHomepageData, fetchFeaturedServices } from "../lib/api";

export default function Home({ homepageData, initialServices }) {
  // ============================================
  // SEO
  // ============================================

  const seo = {
    title: homepageData?.seo_title || "Home | RedSpider",

    description:
      homepageData?.seo_description ||
      "RedSpider is a leading Web Development & Digital Marketing Company.",

    keywords:
      homepageData?.seo_keywords ||
      "Web Development, SEO, Digital Marketing, Software Development",

    canonical: homepageData?.canonical_url || "https://www.redspider.com/",

    image: "https://www.redspider.com/images/og-image.jpg",
  };

  return (
    <>
      <SEO {...seo} />

      <Layout>
        <Hero data={homepageData} />

        {/* ==========================================
            SERVICES
            Server-side initial data
        ========================================== */}

        <Services data={homepageData} initialServices={initialServices} />

        <QuoteForm />

        <Portfolio />

        <About data={homepageData} />

        <BlogStats data={homepageData} />

        <FAQIndustries data={homepageData} />

        <AgencyPackages />
      </Layout>
    </>
  );
}

// ============================================
// SERVER-SIDE / ISR DATA
// ============================================

export async function getStaticProps() {
  try {
    // ==========================================
    // Fetch Homepage CMS Data
    // ==========================================

    const homepageData = await fetchHomepageData();

    // ==========================================
    // Services Limit
    // ==========================================

    const servicesLimit = Number(homepageData?.services_limit) || 6;

    // ==========================================
    // Fetch Featured Services
    // SERVER SIDE
    // ==========================================

    const initialServices = await fetchFeaturedServices(servicesLimit);

    return {
      props: {
        homepageData: homepageData || null,

        initialServices: Array.isArray(initialServices) ? initialServices : [],
      },

      // Refresh data every 60 seconds
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);

    return {
      props: {
        homepageData: null,
        initialServices: [],
      },

      revalidate: 60,
    };
  }
}
