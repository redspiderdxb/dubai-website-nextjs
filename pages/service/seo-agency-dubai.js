import PageStyles from "../../components/seo/PageStyles";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import SeoAgencyTemplate from "../../components/templates/SeoAgencyTemplate";
import seoAgencySchema from "../../lib/schema/seo-agency-dubai.json";
import { SITE_URL } from "../../lib/seo";

export default function SeoAgencyDubai() {
  const title = "Best SEO Services in UAE | Top SEO Agency in Dubai";

  const description =
    "We are a leading SEO agency in Dubai, UAE. We offer the best search engine optimization services to help businesses rank higher on search engines.";

  const pageUrl = `${SITE_URL}/service/seo-agency-dubai/`;

  return (
    <Layout>
      <PageStyles
        href={[
          "/assets/css/pages/service.css",
          "/assets/css/pages/seo-agency.css?v=premium-ui",
        ]}
      />

      <SEO
        title={title}
        description={description}
        keywords="SEO agency Dubai, SEO company Dubai, search engine optimization Dubai, local SEO Dubai, ecommerce SEO, SEO services UAE"
        canonical={pageUrl}
        image={`${SITE_URL}/assets/img/og-image.webp`}
        robots="index,follow"
        pageSchema={seoAgencySchema["@graph"]}
      />

      <SeoAgencyTemplate />
    </Layout>
  );
}
