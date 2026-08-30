import PageStyles from "../components/seo/PageStyles";
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import { fetchContactData } from "../lib/api";

import ContactHero from "../components/contact/ContactHero";
import ContactInfoForm from "../components/contact/ContactInfoForm";
import ContactMap from "../components/contact/ContactMap";

const SITE_URL = "https://www.redspider.ae";

function slimContactData(data) {
  if (!data || typeof data !== "object") {
    return null;
  }

  return {
    seo_title: data.seo_title || null,
    seo_description: data.seo_description || null,
    seo_keywords: data.seo_keywords || null,
    hero_title: data.hero_title || null,
    info_title: data.info_title || null,
    info_description: data.info_description || null,
    address: data.address || null,
    business_hours: data.business_hours || null,
    phone_1: data.phone_1 || null,
    phone_2: data.phone_2 || null,
    email: data.email || null,
    support_title: data.support_title || null,
    satisfaction_title: data.satisfaction_title || null,
    form_title: data.form_title || null,
    form_button_text: data.form_button_text || null,
    form_extinfo_text: data.form_extinfo_text || null,
    form_extinfo_phone: data.form_extinfo_phone || null,
    form_extinfo_small: data.form_extinfo_small || null,
    map_url: data.map_url || null,
  };
}

export default function Contact({ contactData }) {
  const title =
    contactData?.seo_title ||
    "Contact RedSpider - Web Design & Development Agency Dubai";

  const description =
    contactData?.seo_description ||
    "Get in touch with RedSpider for professional web design, development, and digital marketing services in Dubai. Call, email, or fill out our contact form.";

  const seoData = {
    title,
    description,
    keywords:
      contactData?.seo_keywords ||
      "contact redspider, web design agency dubai contact, website development company uae",
    canonical: `${SITE_URL}/contact-us/`,
    image: `${SITE_URL}/assets/img/og-image.webp`,
    robots: "index,follow",
  };

  const pageSchema = [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact-us/#webpage`,
      url: `${SITE_URL}/contact-us/`,
      name: title,
      description,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/#localbusiness`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/contact-us/#breadcrumb`,
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
          name: "Contact Us",
          item: `${SITE_URL}/contact-us/`,
        },
      ],
    },
  ];

  return (
    <Layout>
        <PageStyles href="/assets/css/pages/contact.css" />
      <SEO
        {...seoData}
        includeBusinessSchema={true}
        pageSchema={pageSchema}
      />
      <div className="rs-contact-page">
        <ContactHero data={contactData} />
        <ContactInfoForm data={contactData} />
        <ContactMap data={contactData} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const contactData = slimContactData(await fetchContactData());

    return {
      props: {
        contactData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching contact data:", error);

    return {
      props: {
        contactData: null,
      },
      revalidate: 60,
    };
  }
}
