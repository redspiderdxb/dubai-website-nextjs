// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  trailingSlash: true,
  // Use the equivalent rules below so four legacy paths can redirect directly.
  skipTrailingSlashRedirect: true,

  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap-xml",
      },
    ];
  },

  async redirects() {
    return [
      // Preserve Next.js trailing-slash handling for all other public paths.
      {
        source: "/:file((?!\\.well-known(?:/.*)?)(?:[^/]+/)*[^/]+\\.\\w+)/",
        destination: "/:file",
        permanent: true,
        missing: [{ type: "header", key: "x-nextjs-data" }],
      },
      {
        // The final $ prevents slash-terminated paths from redirecting to themselves.
        source:
          "/:notfile((?!\\.well-known(?:/.*)?)(?!(?:blog/dubizzle|products/real|service/ecommerce-web-|web-designer-dubai)$)(?:[^/]+/)*[^/\\.]+$)",
        destination: "/:notfile/",
        permanent: true,
      },
      {
        source: "/sitemap.xml/",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/about-us/",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/our-portfolio/",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contact-us/",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/service/",
        permanent: true,
      },
      {
        source: "/services/web-development",
        destination: "/service/web-development/",
        permanent: true,
      },
      {
        source: "/services/graphic-design",
        destination: "/service/graphic-design-services/",
        permanent: true,
      },
      {
        source: "/services/brochure-design",
        destination: "/service/brochure-design-company-in-dubai/",
        permanent: true,
      },
      {
        source: "/services/ecommerce-development-services",
        destination: "/service/ecommerce-web-design-dubai/",
        permanent: true,
      },
      {
        source: "/services/email-marketing-services",
        destination: "/service/email-marketing/",
        permanent: true,
      },
      {
        source: "/services/web-hosting",
        destination: "/service/web-hosting/",
        permanent: true,
      },
      {
        source: "/services/logo-designing-company-dubai-brand-identity",
        destination: "/service/logo-designing-company-dubai-brand-identity/",
        permanent: true,
      },

      // 301 Redirect: Old Logo Design URL → New Logo Design URL
      {
        source: "/service/logo-designing-company-dubai",
        destination: "/service/logo-designing-company-dubai-brand-identity/",
        permanent: true,
      },

      // 301 Redirect: Old Graphic Design URL → New Graphic Design URL
      {
        source: "/service/graphic-design-company-dubai",
        destination: "/service/graphic-design-services/",
        permanent: true,
      },

      {
        source: "/services/mobile-app-development-company-dubai",
        destination: "/service/mobile-app-development-company-dubai/",
        permanent: true,
      },

      // 301 Redirect: Old Mobile App Development URL → New Mobile App Development URL
      {
        source: "/service/mobile-app-development",
        destination: "/service/mobile-app-development-company-dubai/",
        permanent: true,
      },

      {
        source: "/real-estate-web-design-company",
        destination: "/products/real-estate-portal/",
        permanent: true,
      },

      {
        // 301 Redirect: Old blog URL → New blog URL
        source: "/sub-domains-vs-sub-directories-which-is-better-for-seo",
        destination: "/blog/sub-domains-vs-sub-directories/",
        permanent: true,
      },

      {
        source: "/sms-marketing-uae",
        destination: "/products/sms-marketing-uae/",
        permanent: true,
      },
      {
        source: "/dubizzle-clone-classified-directory",
        destination: "/products/dubizzle-clone/",
        permanent: true,
      },
      // 301 Redirect: Old Classified Directory URL → New Dubizzle Clone URL
      {
        source: "/products/classified-directory",
        destination: "/products/dubizzle-clone/",
        permanent: true,
      },

      {
        source: "/daily-deal-website-script",
        destination: "/products/daily-deal-website-script/",
        permanent: true,
      },

      // 301 Redirect: Old Daily Deal Website URL → New Daily Deal Website URL
      {
        source: "/products/daily-deal-website",
        destination: "/products/daily-deal-website-script/",
        permanent: true,
      },

      {
        source:
          "/real-estate-website-designing-that-generates-quality-leads-in-dubai",
        destination: "/products/real-estate-portal/",
        permanent: true,
      },

      // Exact mappings from 404 PAGE URLs.xlsx. Explicit statusCode keeps HTTP 301.
      {
        source: "/blog/web-development-agency-uae-website-performance-difference/",
        destination: "/blog/web-development-agency-uae/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-design-company-downtown-dubai/",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/graphic-design-company-in-dubai/",
        destination: "/service/graphic-design-services/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/graphic-designing-vs-web-designing-web-designing/",
        destination: "/blog/graphic-designing-vs-web-designing/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/best-real-estate-website-and-real-estate-industry/",
        destination: "/blog/real-estate-website-design-trends-you-need-to-know/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/real-estate-web-design-company-in-dubai-best-agency-2026/",
        destination: "/blog/real-estate-web-design-company/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/should-i-optimize-my-website-into-a-more-responsive-one/",
        destination: "/blog/optimize-website-into-responsive/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/what-budget-one-needs-for-website-development/",
        destination: "/blog/web-development-company-can-build-your-website/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/imperfect-design-users-need-to-know/",
        destination: "/blog/imperfect-website-design/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/careers/",
        destination: "/contact-us/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/sms-marketing-an-amazing-style-to-access-a-wider-range-of-customers/",
        destination: "/blog/benefits-of-sms-marketing/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/errors-to-avoid-in-your-sms-marketing/",
        destination: "/blog/avoid-sms-marketing-errors/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/creating-info-graphics-its-connectivity-with-web-designers-dubai/",
        destination: "/blog/infographics-importance/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/top-web-designing-tricks-for-a-web-designer-to-meet-the-modern-requirements/",
        destination: "/blog/secrets-of-web-designing/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/favorite-prototyping-tool-for-great-client-communication-web-development/",
        destination: "/blog/prototyping-tools-in-web-development/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/3-website-development-tools-users-need-to-know/",
        destination: "/blog/website-development-and-its-associated-values/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/a-ridiculous-guide-to-finding-the-best-web-developers/",
        destination: "/blog/best-web-development-company-in-the-uae/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/why-do-we-use-flash-for-web-design-purposes/",
        destination: "/blog/flash-for-web-design-purposes/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-design-dubai/",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/angular-js-vs-jquery-a-detailed-overview/",
        destination: "/blog/angularjs-vs-jquery/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/start-your-branding-with-complete-web-solutions/",
        destination: "/blog/branding-with-website-solution/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/ecommerce-website-development-uae-sales-performanc/",
        destination: "/blog/ecommerce-website-development-dubai-guide/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/why-metal-cards-are-becoming-the-new-standard-for-premium-branding/",
        destination: "/blog/ecommerce-branding/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/web-design-impact-beyond-measure-web-designing/",
        destination: "/blog/how-modern-web-design-impacts-property-sales/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/real-estate-website-design-competitive-advantage-dubai/",
        destination: "/blog/real-estate-website-competitive-advantage-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/angular-js-vs-jquery-a-detailed-overview/",
        destination: "/blog/angularjs-vs-jquery/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/why-business-websites-fail-and-few-solutions-for-a-successful-website/",
        destination: "/blog/reasons-for-business-website-failure/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/what-is-ecommerce-website-benefits-of-ecommerce-websites/",
        destination: "/blog/essential-e-commerce-web-design-trends-you-need-to-know/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/sms-marketing-is-making-the-marketing-procedure-broad-and-famous/",
        destination: "/blog/best-sms-marketing-tools-software/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/real-estate-websites-in-dubai-technology-trends/",
        destination: "/blog/real-estate-website-design-trends-you-need-to-know/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/products/",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/e-commerce-and-web-design-how-they-interact-and-why/",
        destination: "/blog/essential-e-commerce-web-design-trends-you-need-to-know/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/internet/",
        destination: "/blog/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/dubizzle",
        destination: "/products/dubizzle-clone/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/our-content-professionals-influencers-put-you-on-top-of-the-search-engine/",
        destination: "/blog/content-professionals-influencers/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/how-computers-slow-content-development/",
        destination: "/blog/how-computers-slow-down-content-development/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/products/real",
        destination: "/products/real-estate-portal/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/real-estate-website-companies-in-dubai/",
        destination: "/blog/real-estate-website-design-trends-you-need-to-know/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/real-estate-website-companies-in-dubai/",
        destination: "/blog/real-estate-website-design-trends-you-need-to-know/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/social-media-creative-design-that-builds-strong-brands-and-real-engagement/",
        destination: "/blog/social-media-design-builds-brands-and-engagement/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/social-media-creative-design-that-builds-strong-brands-and-real-engagement//",
        destination: "/blog/social-media-design-builds-brands-and-engagement/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/social-media-creative-design-2/",
        destination: "/blog/social-media-design-builds-brands-and-engagement/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/whatsapp-business-api-integration-dubai/",
        destination: "/service/whatsapp-business-api-integration/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/service/ecommerce-web-",
        destination: "/service/ecommerce-web-design-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/service/profile-brochure-designing/",
        destination: "/service/brochure-design-company-in-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/products/e-commerce/",
        destination: "/service/ecommerce-web-design-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/the-benefits-of-using-css-animations-lets-unfold-it/",
        destination: "/blog/css-animation-benefits/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/graphic-designing-vs-web-designing-web-designing/",
        destination: "/blog/graphic-designing-vs-web-designing/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-designer-dubai",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-designer-dubai/",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/website-development-company/",
        destination: "/service/web-development/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-design-company-In-dubai/",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-design-company-dubai/",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-design-in-dubai/",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact.html",
        destination: "/contact-us/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/about.html",
        destination: "/about-us/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-design-company/",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/graphic-design-in-modern-business-marketing/",
        destination: "/blog/the-role-of-graphic-design-in-modern-business-marketing/",
        permanent: true,
        statusCode: 301,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/assets/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
      {
        source: "/assets/img/favicon.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/vendor/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/js/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/css/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=2592000, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  images: {
    qualities: [70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.redspider.ae",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "redspider.rsworkspace.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.RedSpider.ae",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "old.redspider.ae",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
