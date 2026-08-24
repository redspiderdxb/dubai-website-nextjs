import Head from "next/head";

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
}) {
  const siteUrl = "https://www.redspider.ae";

  /*
   * =====================================================
   * ORGANIZATION
   * =====================================================
   */

  const organizationSchema = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "RedSpider Web & Art Design",
    url: siteUrl,

    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: `${siteUrl}/assets/img/logo.webp`,
    },

    email: "info@redspider.ae",
    telephone: "+971555515475",

    sameAs: [
      "https://www.facebook.com/RedSpiderWebandArtDesign/",
      "https://x.com/redspider99",
      "https://www.linkedin.com/company/red-spider-web-&-art-design",
      "https://www.instagram.com/redspiderwebartdesign/",
    ],
  };

  /*
   * =====================================================
   * LOCAL BUSINESS
   * =====================================================
   */

  const localBusinessSchema = {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,

    name: "RedSpider Web & Art Design",
    url: siteUrl,

    parentOrganization: {
      "@id": `${siteUrl}/#organization`,
    },

    logo: {
      "@id": `${siteUrl}/#logo`,
    },

    image:
      image ||
      `${siteUrl}/assets/img/og-image.webp`,

    email: "info@redspider.ae",
    telephone: "+971555515475",

    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };

  /*
   * =====================================================
   * WEBSITE
   * =====================================================
   */

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,

    url: siteUrl,

    name: "RedSpider Web & Art Design",

    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  /*
   * =====================================================
   * SCHEMA GRAPH
   * =====================================================
   */

  const schemaGraph = [];

  /*
   * Business + Website schemas are added ONLY when
   * explicitly enabled.
   */

  if (includeBusinessSchema) {
    schemaGraph.push(
      organizationSchema,
      localBusinessSchema,
      websiteSchema
    );
  }

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

  const structuredData =
    schemaGraph.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": schemaGraph,
        }
      : null;

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

      {canonical && (
        <link
          rel="canonical"
          href={canonical}
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

      {canonical && (
        <meta
          property="og:url"
          content={canonical}
        />
      )}

      <meta
        property="og:type"
        content="website"
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