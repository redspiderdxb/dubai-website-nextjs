import PageStyles from "../components/seo/PageStyles";
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import { fetchAboutData } from "../lib/api";

import AboutHero from "../components/about/AboutHero";
import AboutInfo from "../components/about/AboutInfo";
import AboutValue from "../components/about/AboutValue";
import AboutBrands from "../components/about/AboutBrands";
import AboutServices from "../components/about/AboutServices";
import AboutCTA from "../components/about/AboutCTA";
import { SITE_URL } from "../lib/seo";

function slimAboutData(data) {
  if (!data || typeof data !== "object") {
    return null;
  }

  return {
    seo_title: data.seo_title || null,
    seo_description: data.seo_description || null,
    seo_keywords: data.seo_keywords || null,
    hero_title: data.hero_title || null,
    hero_subtitle: data.hero_subtitle || null,
    hero_description: data.hero_description || null,
    info_label: data.info_label || null,
    info_heading: data.info_heading || null,
    info_image: data.info_image || null,
    stats: Array.isArray(data.stats) ? data.stats : [],
    value_title: data.value_title || null,
    value_description: data.value_description || null,
    value_items: Array.isArray(data.value_items) ? data.value_items : [],
    brands_title: data.brands_title || null,
    brands_description: data.brands_description || null,
    brands_image: data.brands_image || null,
    brands_button_text: data.brands_button_text || null,
    brands_button_link: data.brands_button_link || null,
    services_title: data.services_title || null,
    services_description: data.services_description || null,
  };
}

export default function About({ aboutData }) {
  const title =
    aboutData?.seo_title ||
    "About Us | Web Design Company in Dubai | RedSpider";

  const description =
    aboutData?.seo_description ||
    "RedSpider is a web design company in Dubai with 14+ years of experience. We design and develop websites, ecommerce, apps and digital services for businesses across the UAE.";

  const seoData = {
    title,
    description,
    keywords:
      aboutData?.seo_keywords ||
      "about redspider, web design company dubai, dubai web design agency",
    canonical: `${SITE_URL}/about-us/`,
    image: `${SITE_URL}/assets/img/og-image.webp`,
    robots: "index,follow",
  };

  const pageSchema = [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about-us/#webpage`,
      url: `${SITE_URL}/about-us/`,
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
      "@id": `${SITE_URL}/about-us/#breadcrumb`,
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
          name: "About Us",
          item: `${SITE_URL}/about-us/`,
        },
      ],
    },
  ];

  return (
    <Layout>
        <PageStyles href="/assets/css/pages/about.css" />
      <SEO
        {...seoData}
        includeBusinessSchema={true}
        pageSchema={pageSchema}
      />
      <AboutHero data={aboutData} />
      <AboutInfo data={aboutData} />
      <AboutValue data={aboutData} />
      <AboutBrands data={aboutData} />
      <AboutServices data={aboutData} />
      <AboutCTA />
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const aboutData = slimAboutData(await fetchAboutData());

    return {
      props: {
        aboutData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching about data:", error);

    return {
      props: {
        aboutData: null,
      },
      revalidate: 60,
    };
  }
}
