import PageStyles from "../components/seo/PageStyles";
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import { SITE_URL } from "../lib/seo";

import SharjahHero from "../components/location-pages/SharjahHero";
import SharjahBody from "../components/location-pages/SharjahBody";
import SharjahCTA from "../components/location-pages/SharjahCTA";

export default function WebDesignSharjah() {
  const title = "Web Design Sharjah | Website Design Company In Sharjah, UAE";

  const description =
    "RedSpider provides Professional Web Design Sharjah Services, helping businesses establish a strong online presence with custom & responsive websites.";

  const pageUrl = `${SITE_URL}/web-design-sharjah/`;

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
          name: "Web Design Sharjah",
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
        keywords="web design sharjah, website design company sharjah, web design company sharjah"
        canonical={pageUrl}
        image={`${SITE_URL}/assets/img/og-image.webp`}
        robots="index,follow"
        pageSchema={pageSchema}
      />

      <main className="main location-page">
        <SharjahHero />
        <SharjahBody />
       
      </main>
    </Layout>
  );
}
