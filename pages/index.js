import PageStyles from "../components/seo/PageStyles";
import SEO from "../components/seo/SEO";
import Layout from "../components/layout/Layout";

import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import QuoteForm from "../components/home/QuoteForm";
import Portfolio, { slimHomepageGalleries } from "../components/home/Portfolio";
import About from "../components/home/About";
import BlogStats from "../components/home/BlogStats";
import FAQIndustries from "../components/home/FAQIndustries";
import AgencyPackages from "../components/home/AgencyPackages";

import {
  fetchHomepageData,
  fetchFeaturedServices,
  fetchPosts,
  fetchGalleries,
} from "../lib/api";
import { getGoogleReviews } from "../lib/googleReviews";

export default function Home({
  homepageData,
  initialServices,
  initialBlogPosts,
  initialGalleries,
  googleReviews,
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

    robots: "index,follow",
  };

  // ============================================
  // FAQ SCHEMA
  // ============================================

  const faqs = Array.isArray(homepageData?.faqs)
    ? homepageData.faqs
    : homepageData?.faqs && typeof homepageData.faqs === "object"
      ? Object.values(homepageData.faqs)
      : [];

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
      <PageStyles href="/assets/css/pages/home.css" />
      <SEO {...seo} includeBusinessSchema={true} faqSchema={faqSchema} />

      <Layout>
        <Hero data={homepageData} googleReviews={googleReviews} />

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

        <BlogStats
          data={homepageData}
          initialBlogPosts={initialBlogPosts}
          googleReviews={googleReviews}
        />

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
    const servicesLimit = Number(homepageData?.services_limit) || 6;

    const [
      initialServices,
      initialBlogResult,
      galleriesResult,
      googleReviews,
    ] = await Promise.all([
      fetchFeaturedServices(servicesLimit),
      fetchPosts(1),
      fetchGalleries(1, 50),
      getGoogleReviews(),
    ]);

    let initialBlogPosts = Array.isArray(initialBlogResult?.posts)
      ? [...initialBlogResult.posts]
      : [];

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

    const initialGalleries = slimHomepageGalleries(
      galleriesResult?.galleries || [],
    );

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

        googleReviews,
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
        googleReviews: null,
      },

      revalidate: 60,
    };
  }
}
