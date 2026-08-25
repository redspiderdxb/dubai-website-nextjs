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
} from "../lib/api";

export default function Home({
  homepageData,
  initialServices,
  initialBlogPosts,
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

    // Demo / staging protection
    robots: "noindex,nofollow",
  };

  // ============================================
  // FAQ SCHEMA
  // Uses ONLY visible FAQ data
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
            Server-side initial data
        ========================================== */}

        <Services data={homepageData} initialServices={initialServices} />

        <QuoteForm />

        <Portfolio />

        <About data={homepageData} />

        {/* ==========================================
            BLOGS
            Server-side initial data
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

    // ==========================================
    // Fetch Latest Blog Posts
    // SERVER SIDE / ISR
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

        // Higher ID = newer post
        if (idA !== idB) {
          return idB - idA;
        }

        // Fallback to created date
        const dateA = new Date(a?.created_at || 0).getTime();

        const dateB = new Date(b?.created_at || 0).getTime();

        return dateB - dateA;
      })
      .slice(0, 3);

    return {
      props: {
        homepageData: homepageData || null,

        initialServices: Array.isArray(initialServices) ? initialServices : [],

        initialBlogPosts: Array.isArray(initialBlogPosts)
          ? initialBlogPosts
          : [],
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
        initialBlogPosts: [],
      },

      revalidate: 60,
    };
  }
}
