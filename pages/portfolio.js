// pages/portfolio.js
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";

import PortfolioHero from "../components/portfolio/PortfolioHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import PortfolioCTA from "../components/portfolio/PortfolioCTA";

export default function Portfolio() {
  const seoData = {
    title: "Our Portfolio - Best Web Design Projects in Dubai | RedSpider",
    description: "Explore RedSpider's portfolio of custom web design, eCommerce, and branding projects. 500+ successful websites delivered across Dubai and UAE.",
    keywords: "web design portfolio dubai, redspider projects, website development examples uae",
    canonical: "https://www.redspider.ae/portfolio",
    image: "https://www.redspider.ae/portfolio-og-image.jpg",
    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />
      <main className="main">
        <PortfolioHero />
        <PortfolioGrid />
        <PortfolioCTA />
      </main>
    </Layout>
  );
}