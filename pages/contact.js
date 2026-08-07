// pages/contact.js
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";

import ContactHero from "../components/contact/ContactHero";
import ContactInfoForm from "../components/contact/ContactInfoForm";
import ContactMap from "../components/contact/ContactMap";

export default function Contact() {
  const seoData = {
    title: "Contact RedSpider - Web Design & Development Agency Dubai",
    description: "Get in touch with RedSpider for professional web design, development, and digital marketing services in Dubai. Call, email, or fill out our contact form.",
    keywords: "contact redspider, web design agency dubai contact, website development company uae",
    canonical: "https://www.redspider.ae/contact",
    image: "https://www.redspider.ae/contact-og-image.jpg",
    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />
      <main className="main">
        <ContactHero />
        <ContactInfoForm />
        <ContactMap />
      </main>
    </Layout>
  );
}