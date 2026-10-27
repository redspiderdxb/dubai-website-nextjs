import { blogRedirectRules } from "./lib/blogRedirects.mjs";

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
      {
        source: "/assets/:path*",
        destination: "https://www.redspider.ae/assets/:path*",
      },
      {
        source: "/favicon.ico",
        destination: "https://www.redspider.ae/favicon.ico",
      },
      {
        source: "/favicon.svg",
        destination: "https://www.redspider.ae/favicon.svg",
      },
      {
        source: "/favicon-96x96.png",
        destination: "https://www.redspider.ae/favicon-96x96.png",
      },
      {
        source: "/site.webmanifest",
        destination: "https://www.redspider.ae/site.webmanifest",
      },
    ];
  },

  async redirects() {
    return [
      ...blogRedirectRules,
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
          "/:notfile((?!\\.well-known(?:/.*)?)(?!(?:blog/dubizzle|products/real|service/ecommerce-web-|web-designer-dubai|digital-marketing-agency-dubai/&|digital-marketing-agency-dubai/%26)$)(?:[^/]+/)*[^/\\.]+$)",
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

      // Exact 301 mappings from 404 PAGE URLs.xlsx (NEW 404 URLS).
      {
        source: "/blog/top-reasons-why-php-is-getting-popular-among-web-developers/",
        destination: "/blog/php-popular-among-web-developers/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/logo-builds-strong-brand-identity/",
        destination: "/blog/how-a-professional-logo-builds-strong-brand-identity-in-the-uae/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/5-reasons-why-seo-services-in-dubai-are-key-to-your-business-growth/",
        destination: "/blog/seo-services-for-business-growth/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/why-mobile-app-maintenance-matters-for-businesses-in-the-uae/",
        destination: "/blog/why-mobile-app-maintenance-matters-for-businesses/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/the-importance-of-ux-ui-design-in-creating-successful-mobile-apps-in-the-uae/",
        destination: "/blog/ux-ui-design-for-successful-mobile-apps/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/client/jumeirah-resturants/",
        destination: "/our-portfolio/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/techniques-that-can-give-you-good-design-experience/",
        destination: "/blog/good-design-experience-techniques/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/how-do-i-create-an-effective-event-management-website-for-business/",
        destination: "/blog/create-effective-event-management-website/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/why-mobile-app-maintenance-matters-for-businesses-in-the-uae/",
        destination: "/blog/why-mobile-app-maintenance-matters-for-businesses/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/our-portfolio/page/2/",
        destination: "/our-portfolio/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/our-portfolio/websites/",
        destination: "/our-portfolio/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/our-portfolio/websites/:industry/",
        destination: "/our-portfolio/:industry/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/ppc-marketing-for-dubai-run-tactics-to-boost-dubai-run-event-registration//",
        destination: "/blog/ppc-marketing-for-dubai-run/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-development-companies-in-dubai/",
        destination: "/blog/top-trusted-web-development-companies-to-consider/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/internet-marketing-company-black-hat-seo-techniques-that-doubles-as-white-hat/",
        destination: "/blog/black-hat-white-hat-seo-techniques/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/ppc-marketing-for-dubai-run-tactics-to-boost-dubai-run-event-registration/",
        destination: "/blog/ppc-marketing-for-dubai-run/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/ways-to-improve-page-load-times-for-your-website/",
        destination: "/blog/improve-page-load-speed/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/service/content-writing-services-in-dubai/",
        destination: "/blog/content-professionals-influencers/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/how-a-qualified-dubai-web-design-company-can-benefit-your-business/",
        destination: "/blog/benefit-of-qualified-web-design-company/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/outsource-web-design-service/",
        destination: "/blog/need-to-outsource-website-development/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/outsource-web-design-service/",
        destination: "/blog/need-to-outsource-website-development/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/service/google-ads-agency-dubai/",
        destination: "/blog/google-ads-vs-meta-business-campaigns/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/outsource-web-design-service//",
        destination: "/blog/need-to-outsource-website-development/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/real-estate-web-designing-in-dubai-from-listings-to-leads/",
        destination: "/blog/real-estate-web-designing-dubai-guide/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/how-redspider-builds-high-performance-websites-using-mern-stack-node-js-next-js/",
        destination: "/blog/building-websites-using-mern-stack-node-js-next-js/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/how-to-settle-position-of-jpeg-images-for-websites/",
        destination: "/blog/set-jpeg-image-position-for-website/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/the-seo-services-in-dubai-a-way-to-stay-on-top-in-google/",
        destination: "/blog/seo-services-for-business-growth/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/digital-marketing-agency-dubai/&",
        destination: "/blog/digital-marketing-agency-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        // Encoded form of the spreadsheet source ending in "&".
        source: "/digital-marketing-agency-dubai/%26",
        destination: "/blog/digital-marketing-agency-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/products/ecommerce-web-design-dubai/",
        destination: "/service/ecommerce-web-design-dubai",
        permanent: true,
        statusCode: 301,
      },

      // 404 URLS NEED TO REDIRECT.xlsx: exact source to destination, one rule per sheet row.
      {
        source: "/why-investing-in-professional-web-design-can-boost-your-dubai-business/",
        destination: "/blog/invest-in-web-design-to-boost-business/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/website-design-in-dubai-the-importance-of-first-impression/",
        destination: "/blog/importance-of-first-impression/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/website-design-in-dubai-the-importance-of-first-impression/",
        destination: "/blog/importance-of-first-impression/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/upcoming-css-trends-to-in-web-design-predictions-expectations//",
        destination: "/blog/css-trends-in-web-design/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/imperfect-design-users-need-to-know/",
        destination: "/blog/imperfect-website-design/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/real-estate-website-design-dubai-for-higher-property-sales/",
        destination: "/blog/real-estate-website-design-dubai-higher-property-sales/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/web-development-dubai-how-should-you-be-a-good-developer/",
        destination: "/service/web-development/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/the-seo-services-in-dubai-a-way-to-stay-on-top-in-google/",
        destination: "/blog/seo-services-dubai-digital-marketing/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/how-sms-and-whatsapp-marketing-help-uae-businesses-get-faster-responses/",
        destination: "/blog/how-sms-and-whatsapp-marketing-help-businesses/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/why-daily-deal-websites-are-better-suited-for-products-not-services/",
        destination: "/blog/daily-deal-websites-better-for-products/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/elevate-your-online-presence-with-dubai-web-design-company/",
        destination: "/blog/online-presence-with-professional-web-design/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/importance-of-usability-in-a-web-design-dubai/",
        destination: "/blog/tips-for-selecting-web-design-company/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/web-design-dubai-dont-stuff-your-design-with-text-and-too-close/",
        destination: "/blog/dont-stuff-your-design-with-text/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/10-best-seo-extensions-that-everyone-should-install/",
        destination: "/blog/10-best-seo-extensions/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/service/web-development-company-in-dubai/",
        destination: "/service/web-development/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/custom-wordpress-website-design-redspider/",
        destination: "/blog/top-wordpress-website-maintenance/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/e-commerce-website-development-dubai/",
        destination: "/service/ecommerce-web-design-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/portfolio/somalian-clients/",
        destination: "/our-portfolio/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/portfolio/logistics-shipping/",
        destination: "/our-portfolio/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/maximize-your-reach-how-meta-business-campaigns-drive-sales-for-dubai-companies/",
        destination: "/blog/meta-business-campaigns-for-sales/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/ecommerce-website-development-uae-sales-performanc/",
        destination: "/blog/ecommerce-web-development-the-foundation-of-online-sales/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/ecommerce-designs-turning-towards-real-success/",
        destination: "/blog/essential-e-commerce-web-design-trends-you-need-to-know/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/discover-the-top-3-tricks-for-the-best-web-design/",
        destination: "/blog/3-tricks-for-good-web-design/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/upcoming-css-trends-to-in-web-design-predictions-expectations/",
        destination: "/blog/css-trends-in-web-design/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/complete-digital-branding-services-uae/",
        destination: "/blog/logo-designing-vs-branding/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/real-estate-web-design-company-in-dubai-best-agency-2026/",
        destination: "/blog/real-estate-web-design-company/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/real-estate-website-design-competitive-advantage-dubai/",
        destination: "/blog/real-estate-website-competitive-advantage-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/ecommerce-designs-turning-towards-real-success/",
        destination: "/blog/essential-e-commerce-web-design-trends-you-need-to-know/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/why-dubais-top-web-design-companies-are-essential-for-your-business-success/",
        destination: "/blog/web-design-companies-for-business-success/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/how-to-generate-real-estate-leads-in-dubai-using-google-meta-ads/",
        destination: "/blog/generate-real-estate-leads-using-google-meta-ads/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/how-sms-and-whatsapp-marketing-help-uae-businesses-get-faster-responses/",
        destination: "/blog/how-sms-and-whatsapp-marketing-help-businesses/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/coolest-ideas-for-web-design-best-choice-for-designers/",
        destination: "/blog/what-is-the-role-of-a-web-designer-in-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-development-engineer-vs-web-developer/",
        destination: "/blog/how-to-select-the-best-web-development-agency-in-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/the-basics-of-seo-strategies-to-know-for-success/",
        destination: "/blog/basics-of-seo-strategies/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/14-secrets-of-web-designing-everything-you-need-to-know/",
        destination: "/blog/secrets-of-web-designing/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/graphic-design-company-dubai-creative-design-services/",
        destination: "/service/graphic-design-services/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-development-agency-uae-website-performance-difference/",
        destination: "/blog/web-development-agency-uae/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/what-are-the-7-steps-to-web-design-a-complete-guide/",
        destination: "/blog/complete-guide-to-web-design/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/seo-services-dubai/",
        destination: "/service/seo-agency-dubai/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/our-content-professionals-influencers-put-you-on-top-of-the-search-engine/",
        destination: "/blog/content-professionals-influencers/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/email-marketing-uae-dos-donts/",
        destination: "/blog/email-marketing-trends/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/web-design-company-6/",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/how-to-build-real-estate-website-propertyfinder-bayut-xml-integration-dubai/",
        destination: "/blog/how-to-build-real-estate-website/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/10-best-seo-extensions-that-everyone-should-install/",
        destination: "/blog/10-best-seo-extensions/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/why-metal-cards-are-becoming-the-new-standard-for-premium-branding/",
        destination: "/service/graphic-design-services/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/real-estate-web-design-dubai-for-lead-generation-2026/",
        destination: "/blog/real-estate-web-design-for-lead-generation/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/real-estate-web-design-dubai-for-lead-generation-2026/",
        destination: "/blog/real-estate-web-design-for-lead-generation/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/ways-to-improve-page-load-times-for-your-website/",
        destination: "/blog/improve-page-load-speed/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/how-to-present-substance-in-the-most-ideal-way-imaginable/",
        destination: "/blog/how-to-present-substance-on-a-website/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/dubizzle/",
        destination: "/products/dubizzle-clone/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/real-estate-web-designing-in-dubai-from-listings-to-leads/",
        destination: "/blog/real-estate-web-designing-dubai-guide/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/effective-web-development-how-does-it-matters-in-your-life/",
        destination: "/blog/how-does-effective-web-development-matter/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/favorite-prototyping-tool-for-great-client-communication-web-development/",
        destination: "/blog/prototyping-tools-in-web-development/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/how-to-generate-real-estate-leads-in-dubai-using-google-meta-ads/",
        destination: "/blog/generate-real-estate-leads-using-google-meta-ads/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/elevate-your-online-presence-with-dubai-web-design-company/",
        destination: "/blog/online-presence-with-professional-web-design/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/compare-cms-vs-custom-development-for-real-estate-sites-in-uae/",
        destination: "/blog/cms-vs-custom-development-for-real-estate-sites/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/10-solid-reasons-to-learn-web-development/",
        destination: "/blog/reasons-to-learn-web-development/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/must-have-certain-features-for-e-commerce-blogs/",
        destination: "/blog/features-for-ecommerce-blogs/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blog/social-media-creative-design-that-builds-strong-brands-and-real-engagement/",
        destination: "/blog/social-media-design-builds-brands-and-engagement/",
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
