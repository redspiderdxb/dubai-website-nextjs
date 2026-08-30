// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  trailingSlash: true,

  async redirects() {
    return [
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
      {
        source: "/services/mobile-app-development-company-dubai",
        destination: "/service/mobile-app-development-company-dubai/",
        permanent: true,
      },
      {
        source: "/real-estate-web-design-company",
        destination: "/products/real-estate-portal/",
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
      {
        source: "/daily-deal-website-script",
        destination: "/products/daily-deal-website-script/",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
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
    ];
  },

  images: {
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
    ],
  },
};

export default nextConfig;
