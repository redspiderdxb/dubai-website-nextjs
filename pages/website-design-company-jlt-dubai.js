import PageStyles from "../components/seo/PageStyles";
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import { SITE_URL } from "../lib/seo";

import JLTHero from "../components/location-pages/JLTHero";
import JLTBody from "../components/location-pages/JLTBody";
import JLTCTA from "../components/location-pages/JLTCTA";

export default function WebsiteDesignCompanyJLTDubai() {
  const title = "Website Design Company JLT Dubai | RedSpider";

  const description =
    "Professional website design company in JLT Dubai offering custom websites, ecommerce solutions, responsive design, and SEO-friendly development services.";

  const pageUrl = `${SITE_URL}/website-design-company-jlt-dubai/`;

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
          name: "Website Design Company JLT Dubai",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does website design cost in JLT Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The cost depends on the website’s size, features, and complexity. We provide customized quotations based on your specific requirements.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to build a business website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most business websites can be completed within 3 to 8 weeks, depending on project scope and content availability.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide ecommerce website development?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We design and develop ecommerce websites with secure payment gateways, product management systems, and customer-friendly shopping experiences.",
          },
        },
        {
          "@type": "Question",
          name: "Will my website be mobile-friendly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Every website we create is fully responsive and optimized for mobile devices.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer website maintenance and support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We provide ongoing maintenance, updates, security monitoring, and technical support to ensure your website continues to perform effectively.",
          },
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
        keywords="website design company JLT Dubai, website design JLT Dubai, web design company JLT"
        canonical={pageUrl}
        image={`${SITE_URL}/assets/img/og-image.webp`}
        robots="index,follow"
        pageSchema={pageSchema}
      />

      <main className="main location-page">
        <JLTHero />
        <JLTBody />
       
      </main>
    </Layout>
  );
}
