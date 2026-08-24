// pages/about.js
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import { fetchAboutData } from "../lib/api";

// Import all About components
import AboutHero from "../components/about/AboutHero";
import AboutInfo from "../components/about/AboutInfo";
import AboutValue from "../components/about/AboutValue";
import AboutBrands from "../components/about/AboutBrands";
import AboutServices from "../components/about/AboutServices";
import AboutCTA from "../components/about/AboutCTA";

export default function About({ aboutData }) {
  // Fallback SEO if data is not available
  const seoData = {
    title:
      aboutData?.seo_title || "About RedSpider - Web Design Agency in Dubai",
    description:
      aboutData?.seo_description ||
      "Learn about RedSpider, a leading web design company with 14+ years of experience in Dubai and UAE.",
    keywords:
      aboutData?.seo_keywords || "about redspider, dubai web design agency",
    canonical: aboutData?.canonical_url || "https://www.redspider.ae/about",
    image: "https://www.redspider.ae/about-og-image.jpg",
    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />
      <main className="main">
        <AboutHero data={aboutData} />
        <AboutInfo data={aboutData} />
        <AboutValue data={aboutData} />
        <AboutBrands data={aboutData} />
        <AboutServices data={aboutData} />
        <AboutCTA data={aboutData} />
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const aboutData = await fetchAboutData();
    return {
      props: { aboutData: aboutData || null },
      revalidate: 60, // ISR - Regenerate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching about data:", error);
    return {
      props: { aboutData: null },
      revalidate: 60,
    };
  }
}
