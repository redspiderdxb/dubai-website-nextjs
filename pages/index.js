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
import { fetchHomepageData } from "../lib/api";

export default function Home({ homepageData }) {
  // Fallback SEO if data is not available
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
        <Services data={homepageData} />
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

export async function getStaticProps() {
  try {
    const homepageData = await fetchHomepageData();
    return {
      props: { homepageData: homepageData || null },
      revalidate: 60, // ISR - Regenerate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      props: { homepageData: null },
      revalidate: 60,
    };
  }
}