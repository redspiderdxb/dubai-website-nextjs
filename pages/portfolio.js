// pages/portfolio.js

import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";

import PortfolioHero from "../components/portfolio/PortfolioHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import PortfolioCTA from "../components/portfolio/PortfolioCTA";

import { fetchGalleries } from "../lib/api";

export default function Portfolio({ initialGalleries, initialPagination }) {
  const seoData = {
    title: "Our Portfolio - Best Web Design Projects in Dubai | RedSpider",

    description:
      "Explore RedSpider's portfolio of custom web design, eCommerce, and branding projects. 500+ successful websites delivered across Dubai and UAE.",

    keywords:
      "web design portfolio dubai, redspider projects, website development examples uae",

    canonical: "https://www.redspider.ae/portfolio",

    image: "https://www.redspider.ae/portfolio-og-image.jpg",

    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />

      <main className="main">
        <PortfolioHero />

        <PortfolioGrid
          initialGalleries={initialGalleries}
          initialPagination={initialPagination}
        />

        <PortfolioCTA />
      </main>
    </Layout>
  );
}

// ============================================
// Server-side Initial Portfolio Data
// ============================================

export async function getStaticProps() {
  const result = await fetchGalleries(1, 12);

  console.log("PORTFOLIO SERVER DATA:", result);

  return {
    props: {
      initialGalleries: result.galleries || [],
      initialPagination: result.pagination || {},
    },

    revalidate: 60,
  };
}
