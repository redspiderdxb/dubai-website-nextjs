import PageStyles from "../components/seo/PageStyles";
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import { SITE_URL } from "../lib/seo";
import sharjahSchema from "../lib/schema/web-design-sharjah.json";

import SharjahHero from "../components/location-pages/SharjahHero";
import SharjahBody from "../components/location-pages/SharjahBody";

export default function WebDesignSharjah() {
  const title = "Web Design Sharjah | Website Design Company In Sharjah, UAE";

  const description =
    "RedSpider provides Professional Web Design Sharjah Services, helping businesses establish a strong online presence with custom & responsive websites.";

  const pageUrl = `${SITE_URL}/web-design-sharjah/`;

  return (
    <Layout includeGlobalSchema={false}>
      <PageStyles href="/assets/css/pages/location-pages.css" />

      <SEO
        title={title}
        description={description}
        keywords="web design sharjah, website design company sharjah, web design company sharjah"
        canonical={pageUrl}
        image={`${SITE_URL}/assets/img/og-image.webp`}
        robots="index,follow"
        pageSchema={sharjahSchema["@graph"]}
      />

      <main className="main location-page">
        <SharjahHero />
        <SharjahBody />
      </main>
    </Layout>
  );
}
