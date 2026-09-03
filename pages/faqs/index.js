// pages/faqs/index.js

import PageStyles from "../../components/seo/PageStyles";
import FAQPage from "../../components/FAQPage";
import SEO from "../../components/seo/SEO";
import faqsSchema from "../../lib/schema/faqs.json";

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
      <PageStyles href="/assets/css/pages/faqs.css" />

      <SEO
        {...seoData}
        pageSchema={faqsSchema["@graph"]}
      />

      <FAQPage />
    </>
  );
}