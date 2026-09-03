import Head from "next/head";
import { SITE_URL, sanitizeCanonical } from "../../lib/seo";

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  image,
  robots = "index,follow",

  // Schema controls
  includeBusinessSchema = false,
  faqSchema = null,
  serviceSchema = null,
  pageSchema = null,
}) {
  const siteUrl = SITE_URL;

  /*
   * =====================================================
   * SCHEMA GRAPH
   * =====================================================
   */

  const schemaGraph = [];

  /*
   * Global Organization / LocalBusiness / WebSite schemas
   * are now loaded once globally from:
   *
   * lib/schema/global.json
   *
   * through:
   * components/layout/Layout.js
   *
   * Keep includeBusinessSchema for backwards compatibility,
   * but do not output duplicate global schemas here.
   */

  void includeBusinessSchema;

  /*
   * FAQ
   */

  if (faqSchema) {
    schemaGraph.push(faqSchema);
  }

  /*
   * Service
   */

  if (serviceSchema) {
    schemaGraph.push(serviceSchema);
  }

  /*
   * Page-specific schemas
   */

  if (pageSchema) {
    if (Array.isArray(pageSchema)) {
      schemaGraph.push(...pageSchema);
    } else {
      schemaGraph.push(pageSchema);
    }
  }

  const structuredData =
    schemaGraph.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": schemaGraph,
        }
      : null;

  const productionCanonicalUrl =
    sanitizeCanonical(canonical);

  return (
    <Head>
      {/* =================================================
          BASIC SEO
      ================================================= */}

      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}

      <meta
        name="robots"
        content={robots}
      />

      {productionCanonicalUrl && (
        <link
          rel="canonical"
          href={productionCanonicalUrl}
        />
      )}

      {/* =================================================
          VIEWPORT
      ================================================= */}

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      {/* =================================================
          OPEN GRAPH
      ================================================= */}

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      {image && (
        <meta
          property="og:image"
          content={image}
        />
      )}

      {productionCanonicalUrl && (
        <meta
          property="og:url"
          content={productionCanonicalUrl}
        />
      )}

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content="RedSpider Web & Art Design"
      />

      <meta
        property="og:locale"
        content="en_AE"
      />

      {/* =================================================
          TWITTER
      ================================================= */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      {image && (
        <meta
          name="twitter:image"
          content={image}
        />
      )}

      {/* =================================================
          JSON-LD
      ================================================= */}

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              structuredData
            ),
          }}
        />
      )}
    </Head>
  );
}