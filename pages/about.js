// pages/about.js
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";

// Import all About components
import AboutHero from "../components/about/AboutHero";
import AboutInfo from "../components/about/AboutInfo";
import AboutValue from "../components/about/AboutValue";
import AboutBrands from "../components/about/AboutBrands";
import AboutServices from "../components/about/AboutServices";
import AboutCTA from "../components/about/AboutCTA";

export default function About() {
  const seoData = {
    title: "About RedSpider - Web Design Agency in Dubai",
    description: "Learn about RedSpider, a leading web design company with 14+ years of experience in Dubai and UAE.",
    keywords: "about redspider, dubai web design agency",
    canonical: "https://www.redspider.ae/about",
    image: "https://www.redspider.ae/about-og-image.jpg",
    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />
      <main className="main">
        <AboutHero />
        <AboutInfo />
        <AboutValue />
        <AboutBrands />
        <AboutServices />
        <AboutCTA />
      </main>
    </Layout>
  );
}