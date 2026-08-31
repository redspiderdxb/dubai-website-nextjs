import PageStyles from "../../components/seo/PageStyles";
import SEO from "../../components/seo/SEO";
import SitemapPage from "../../components/sitemap/SitemapPage";
import {
  fetchSitemapLinkGroups,
  SITEMAP_STATIC_PAGES,
} from "../../lib/sitemapData";
import { SITE_URL } from "../../lib/seo";

export default function Sitemap({ groups }) {
  const seoData = {
    title: "Sitemap | RedSpider Web Design Dubai",
    description:
      "Browse every URL on RedSpider.ae — main pages, services, products, blog posts and portfolio projects.",
    canonical: `${SITE_URL}/sitemap/`,
    robots: "index,follow",
  };

  return (
    <>
      <PageStyles href="/assets/css/pages/sitemap.css" />
      <SEO {...seoData} />
      <SitemapPage groups={groups} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const groups = await fetchSitemapLinkGroups();

    return {
      props: {
        groups,
      },
    };
  } catch (error) {
    console.error("Error building HTML sitemap:", error);

    return {
      props: {
        groups: {
          main: SITEMAP_STATIC_PAGES,
          services: [],
          products: [],
          blogs: [],
          portfolio: [],
        },
      },
    };
  }
}
