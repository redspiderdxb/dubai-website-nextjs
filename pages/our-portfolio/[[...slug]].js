import PageStyles from "../../components/seo/PageStyles";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";

import PortfolioHero from "../../components/portfolio/PortfolioHero";
import PortfolioGrid from "../../components/portfolio/PortfolioGrid";
import PortfolioCTA from "../../components/portfolio/PortfolioCTA";

import { fetchGalleries } from "../../lib/api";
import { slimGalleries, slimPagination } from "../../lib/galleries";
import { SITE_URL } from "../../lib/seo";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_INDUSTRIES,
  buildPortfolioPath,
  getPortfolioSeo,
  parsePortfolioSlug,
} from "../../lib/portfolioFilters";

import ourPortfolioSchema from "../../lib/schema/our-portfolio.json";

export default function Portfolio({
  initialGalleries,
  initialPagination,
  initialFilter,
  initialIndustry,
  seo,
}) {
  const seoData = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: `${SITE_URL}${seo.path}`,
    image: `${SITE_URL}/assets/img/og-image.webp`,
    robots: "index,follow",
  };

  return (
    <Layout>
      <PageStyles href="/assets/css/pages/portfolio.css" />

      <SEO
        {...seoData}
        includeBusinessSchema={true}
        pageSchema={ourPortfolioSchema["@graph"]}
      />

      <PortfolioHero />

      <PortfolioGrid
        initialGalleries={initialGalleries}
        initialPagination={initialPagination}
        initialFilter={initialFilter}
        initialIndustry={initialIndustry}
      />

      <PortfolioCTA />
    </Layout>
  );
}

function buildStaticPaths() {
  const paths = [{ params: { slug: [] } }];

  // Include "websites" so /our-portfolio/websites/ can permanently redirect
  // to the canonical /our-portfolio/ URL.
  PORTFOLIO_CATEGORIES.forEach((category) => {
    paths.push({ params: { slug: [category.slug] } });
  });

  PORTFOLIO_INDUSTRIES.forEach((industry) => {
    paths.push({ params: { slug: [industry.value] } });
  });

  PORTFOLIO_CATEGORIES.forEach((category) => {
    PORTFOLIO_INDUSTRIES.forEach((industry) => {
      paths.push({
        params: { slug: [category.slug, industry.value] },
      });
    });
  });

  return paths;
}

export async function getStaticPaths() {
  return {
    paths: buildStaticPaths(),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug || [];
  const parsed = parsePortfolioSlug(slug);

  if (!parsed.valid) {
    return { notFound: true };
  }

  const canonicalPath = buildPortfolioPath(parsed.filter, parsed.industry);
  const requestedPath =
    slug.length === 0
      ? "/our-portfolio/"
      : `/our-portfolio/${slug.join("/")}/`;

  if (requestedPath !== canonicalPath) {
    return {
      redirect: {
        destination: canonicalPath,
        permanent: true,
      },
    };
  }

  const seo = getPortfolioSeo(parsed.filter, parsed.industry);

  try {
    const result = await fetchGalleries(1, 12);

    return {
      props: {
        initialGalleries: slimGalleries(result.galleries),
        initialPagination: slimPagination(result.pagination),
        initialFilter: parsed.filter,
        initialIndustry: parsed.industry,
        seo,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching portfolio data:", error);

    return {
      props: {
        initialGalleries: [],
        initialPagination: {},
        initialFilter: parsed.filter,
        initialIndustry: parsed.industry,
        seo,
      },
      revalidate: 60,
    };
  }
}
