import PageStyles from "../components/seo/PageStyles";
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import SocialMediaAgencyTemplate from "../components/templates/SocialMediaAgencyTemplate";
import smoSchema from "../lib/schema/social-media-agency-in-dubai.json";
import { SITE_URL } from "../lib/seo";

export default function SocialMediaAgencyInDubai() {
  const title =
    "Social Media Agency Dubai | Social Media Marketing | RedSpider";

  const description =
    "Grow your brand with RedSpider, a social media agency in Dubai offering strategy, content creation, social media management, paid ads and lead generation.";

  const pageUrl = `${SITE_URL}/social-media-agency-in-dubai/`;

  return (
    <Layout>
      <PageStyles href="/assets/css/pages/social-media-agency.css?v=smo-3" />

      <SEO
        title={title}
        description={description}
        keywords="Social Media Agency Dubai, Social Media Marketing Agency Dubai, Social Media Management Dubai, Social Media Marketing Dubai, Social Media Marketing Services Dubai, Instagram Marketing Agency Dubai, Facebook Marketing Dubai, LinkedIn Marketing Dubai, Social Media Advertising Dubai, Social Media Company Dubai, Social Media Management Company Dubai"
        canonical={pageUrl}
        image={`${SITE_URL}/assets/img/og-image.webp`}
        robots="index,follow"
        pageSchema={smoSchema["@graph"]}
      />

      <SocialMediaAgencyTemplate />
    </Layout>
  );
}
