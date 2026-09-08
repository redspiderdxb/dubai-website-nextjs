import PageStyles from "../components/seo/PageStyles";
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import { SITE_URL } from "../lib/seo";

import AbuDhabiHero from "../components/location-pages/AbuDhabiHero";
import AbuDhabiBody from "../components/location-pages/AbuDhabiBody";
import AbuDhabiCTA from "../components/location-pages/AbuDhabiCTA";

export default function WebDesignAbuDhabi() {
  const title =
    "Web Design Abu Dhabi | Web Development Company Abu Dhabi";

  const description =
    "Looking for Web Design Abu Dhabi? RedSpider offers expert web design & development services to help your business grow with a strong online presence.";

  const pageUrl = `${SITE_URL}/web-design-abu-dhabi/`;

  const pageSchema = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
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
          name: "Web Design Abu Dhabi",
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <Layout>
      <PageStyles href="/assets/css/pages/location-pages.css" />

      <SEO
        title={title}
        description={description}
        keywords="web design Abu Dhabi, web development company Abu Dhabi, website design Abu Dhabi, web design company Abu Dhabi"
        canonical={pageUrl}
        image={`${SITE_URL}/assets/img/og-image.webp`}
        robots="index,follow"
        pageSchema={pageSchema}
      />

      <main className="main location-page">
        <AbuDhabiHero />
        <AbuDhabiBody />
      
      </main>
    </Layout>
  );
}