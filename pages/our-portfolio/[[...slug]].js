import PageStyles from "../../components/seo/PageStyles";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";

import PortfolioHero from "../../components/portfolio/PortfolioHero";
import PortfolioGrid from "../../components/portfolio/PortfolioGrid";
import PortfolioCTA from "../../components/portfolio/PortfolioCTA";

import { fetchAllGalleries } from "../../lib/api";
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
      <PageStyles href="/assets/css/pages/portfolio.css?v=card-heading-10" />

      <SEO
        {...seoData}
        includeBusinessSchema={true}
        pageSchema={ourPortfolioSchema["@graph"]}
      />

      <PortfolioHero />

      <PortfolioGrid
        initialGalleries={initialGalleries}
        initialFilter={initialFilter}
        initialIndustry={initialIndustry}
      />

      <PortfolioCTA />
    </Layout>
  );
}

function buildStaticPaths() {
  // Only emit canonical URLs. Aliases like /our-portfolio/websites/ are
  // handled by next.config redirects — getStaticProps cannot redirect
  // during prerender.
  const paths = [{ params: { slug: [] } }];

  PORTFOLIO_CATEGORIES.forEach((category) => {
    if (category.slug === "websites") {
      return;
    }

    paths.push({ params: { slug: [category.slug] } });
  });

  PORTFOLIO_INDUSTRIES.forEach((industry) => {
    paths.push({ params: { slug: [industry.value] } });
  });

  PORTFOLIO_CATEGORIES.forEach((category) => {
    if (category.slug === "websites") {
      return;
    }

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

  // Non-canonical aliases should be redirected in next.config; refuse here
  // so prerender never returns a redirect.
  if (requestedPath !== canonicalPath) {
    return { notFound: true };
  }

  const seo = getPortfolioSeo(parsed.filter, parsed.industry);

  try {
    // Full catalog so every category URL (mobile, video, figma, industries)
    // has matching items + title/link row on first paint.
    const galleries = await fetchAllGalleries();

    return {
      props: {
        initialGalleries: Array.isArray(galleries) ? galleries : [],
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
        initialFilter: parsed.filter,
        initialIndustry: parsed.industry,
        seo,
      },
      revalidate: 60,
    };
  }
}
