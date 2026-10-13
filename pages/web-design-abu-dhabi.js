import PageStyles from "../components/seo/PageStyles";
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import { SITE_URL } from "../lib/seo";
import abuDhabiSchema from "../lib/schema/web-design-abu-dhabi.json";

import AbuDhabiHero from "../components/location-pages/AbuDhabiHero";
import AbuDhabiBody from "../components/location-pages/AbuDhabiBody";

export default function WebDesignAbuDhabi() {
  const title =
    "Web Design Abu Dhabi | Web Development Company Abu Dhabi";

  const description =
    "Looking for Web Design Abu Dhabi? RedSpider offers expert web design & development services to help your business grow with a strong online presence.";

  const pageUrl = `${SITE_URL}/web-design-abu-dhabi/`;

  return (
    <Layout includeGlobalSchema={false}>
      <PageStyles href="/assets/css/pages/location-pages.css" />

      <SEO
        title={title}
        description={description}
        keywords="web design Abu Dhabi, web development company Abu Dhabi, website design Abu Dhabi, web design company Abu Dhabi"
        canonical={pageUrl}
        image={`${SITE_URL}/assets/img/og-image.webp`}
        robots="index,follow"
        pageSchema={abuDhabiSchema["@graph"]}
      />

      <main className="main location-page">
        <AbuDhabiHero />
        <AbuDhabiBody />
      </main>
    </Layout>
  );
}
