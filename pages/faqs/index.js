// pages/faqs/index.js

import FAQPage from "../../components/FAQPage";
import SEO from "../../components/seo/SEO";

export default function FAQs() {
  const seoData = {
    title: "Frequently Asked Questions | RedSpider Dubai",
    description:
      "Find answers about working with RedSpider, including project enquiries, quotations, revisions, client responsibilities, communication, approvals and project delivery.",
    canonical: "https://www.redspider.ae/faqs/",
    robots: "index,follow",
  };

  return (
    <>
      <SEO {...seoData} />
      <FAQPage />
    </>
  );
}