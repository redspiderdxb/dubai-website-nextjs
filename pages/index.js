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

import {
  fetchHomepageData,
  fetchFeaturedServices,
  fetchPosts,
  fetchAllGalleries,
} from "../lib/api";

export default function Home({
  homepageData,
  initialServices,
  initialBlogPosts,
  initialGalleries,
}) {
  // ============================================
  // SEO
  // ============================================

  const seo = {
    title:
      homepageData?.seo_title ||
      "Web Design Dubai | Web Design Company Dubai | RedSpider",

    description:
      homepageData?.seo_description ||
      "RedSpider is a web design company in Dubai creating professional, responsive and custom websites for businesses across the UAE. Explore our work and services.",

    keywords:
      homepageData?.seo_keywords ||
      "Web Development, SEO, Digital Marketing, Software Development",

    canonical: "https://www.redspider.ae/",

    image: "https://www.redspider.ae/assets/img/og-image.webp",

    robots: "noindex,nofollow",
  };

  // ============================================
  // FAQ SCHEMA
  // ============================================

  const faqs = Array.isArray(homepageData?.faqs) ? homepageData.faqs : [];

  const validFaqs = faqs.filter((faq) => faq?.question && faq?.answer);

  const faqSchema =
    validFaqs.length > 0
      ? {
          "@type": "FAQPage",
          "@id": "https://www.redspider.ae/#faq",

          mainEntity: validFaqs.map((faq) => ({
            "@type": "Question",

            name: faq.question,

            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

      
  return (
    <>
      <SEO {...seo} includeBusinessSchema={true} faqSchema={faqSchema} />

      <Layout>
        <Hero data={homepageData} />

        {/* ==========================================
            SERVICES
        ========================================== */}

        <Services data={homepageData} initialServices={initialServices} />

        <QuoteForm />

        {/* ==========================================
            HOMEPAGE PORTFOLIO

            Projects are already fetched server-side.
            No blank/loading state.
        ========================================== */}

        <Portfolio initialGalleries={initialGalleries} />

        <About data={homepageData} />

        {/* ==========================================
            BLOGS
        ========================================== */}

        <BlogStats data={homepageData} initialBlogPosts={initialBlogPosts} />


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
    // Homepage CMS
    // ==========================================

    const homepageData = await fetchHomepageData();

    // ==========================================
    // Services
    // ==========================================

    const servicesLimit = Number(homepageData?.services_limit) || 6;

    const initialServices = await fetchFeaturedServices(servicesLimit);

    // ==========================================
    // Latest Blog Posts
    // ==========================================

    const initialBlogResult = await fetchPosts(1);

    let initialBlogPosts = Array.isArray(initialBlogResult?.posts)
      ? [...initialBlogResult.posts]
      : [];

    // ==========================================
    // SORT LATEST FIRST
    // ==========================================

    initialBlogPosts = initialBlogPosts
      .sort((a, b) => {
        const idA = Number(a?.id || 0);
        const idB = Number(b?.id || 0);

        if (idA !== idB) {
          return idB - idA;
        }

        const dateA = new Date(a?.created_at || 0).getTime();

        const dateB = new Date(b?.created_at || 0).getTime();

        return dateB - dateA;
      })
      .slice(0, 3);

    // ==========================================
    // HOMEPAGE PORTFOLIO
    //
    // IMPORTANT:
    // Fetch on SERVER, not browser.
    //
    // This prevents:
    // - blank portfolio
    // - 2 sec loading gap
    // - real-estate fallback flash
    // ==========================================

    const initialGalleries = await fetchAllGalleries();

    return {
      props: {
        homepageData: homepageData || null,

        initialServices: Array.isArray(initialServices) ? initialServices : [],

        initialBlogPosts: Array.isArray(initialBlogPosts)
          ? initialBlogPosts
          : [],

        initialGalleries: Array.isArray(initialGalleries)
          ? initialGalleries
          : [],
      },

      // ISR
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);

    return {
      props: {
        homepageData: null,
        initialServices: [],
        initialBlogPosts: [],
        initialGalleries: [],
      },

      revalidate: 60,
    };
  }
}
