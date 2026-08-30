import PageStyles from "../components/seo/PageStyles";
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";

import PortfolioHero from "../components/portfolio/PortfolioHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import PortfolioCTA from "../components/portfolio/PortfolioCTA";

import { fetchGalleries } from "../lib/api";
import { slimGalleries, slimPagination } from "../lib/galleries";

const SITE_URL = "https://www.redspider.ae";

export default function Portfolio({ initialGalleries, initialPagination }) {
  const title = "Web Design Portfolio Dubai | RedSpider Projects";
  const description =
    "Explore RedSpider’s web design portfolio featuring selected website projects created for businesses across Dubai, the UAE and different industries.";

  const seoData = {
    title,
    description,
    keywords:
      "web design portfolio dubai, redspider projects, website development examples uae",
    canonical: `${SITE_URL}/our-portfolio/`,
    image: `${SITE_URL}/assets/img/og-image.webp`,
    robots: "index,follow",
  };

  const pageSchema = [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/our-portfolio/#webpage`,
      url: `${SITE_URL}/our-portfolio/`,
      name: title,
      description,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/our-portfolio/#projects`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/our-portfolio/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Portfolio",
          item: `${SITE_URL}/our-portfolio/`,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/our-portfolio/#projects`,
      itemListElement: (initialGalleries || []).slice(0, 12).map(
        (gallery, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: gallery.name,
          url: gallery.project_url || `${SITE_URL}/our-portfolio/`,
        }),
      ),
    },
  ];

  return (
    <Layout>
        <PageStyles href="/assets/css/pages/portfolio.css" />
      <SEO
        {...seoData}
        includeBusinessSchema={true}
        pageSchema={pageSchema}
      />

      <PortfolioHero />

      <PortfolioGrid
        initialGalleries={initialGalleries}
        initialPagination={initialPagination}
      />

      <PortfolioCTA />
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const result = await fetchGalleries(1, 12);

    return {
      props: {
        initialGalleries: slimGalleries(result.galleries),
        initialPagination: slimPagination(result.pagination),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching portfolio data:", error);

    return {
      props: {
        initialGalleries: [],
        initialPagination: {},
      },
      revalidate: 60,
    };
  }
}
