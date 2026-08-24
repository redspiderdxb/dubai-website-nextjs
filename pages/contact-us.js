// pages/contact.js
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import { fetchContactData } from "../lib/api";

import ContactHero from "../components/contact/ContactHero";
import ContactInfoForm from "../components/contact/ContactInfoForm";
import ContactMap from "../components/contact/ContactMap";

export default function Contact({ contactData }) {
  // Fallback SEO if data is not available
  const seoData = {
    title: contactData?.seo_title || "Contact RedSpider - Web Design & Development Agency Dubai",
    description: contactData?.seo_description || "Get in touch with RedSpider for professional web design, development, and digital marketing services in Dubai. Call, email, or fill out our contact form.",
    keywords: contactData?.seo_keywords || "contact redspider, web design agency dubai contact, website development company uae",
    canonical: contactData?.canonical_url || "https://www.redspider.ae/contact",
    image: "https://www.redspider.ae/contact-og-image.jpg",
    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />
      <main className="main">
        <ContactHero data={contactData} />
        <ContactInfoForm data={contactData} />
        <ContactMap data={contactData} />
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const contactData = await fetchContactData();
    return {
      props: { contactData: contactData || null },
      revalidate: 60, // ISR - Regenerate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return {
      props: { contactData: null },
      revalidate: 60,
    };
  }
}