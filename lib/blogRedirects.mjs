// Verified against published CMS IDs/titles on 2026-10-20. Never infer aliases
// by fuzzy matching at request time: similarly named articles can be distinct.
export const blogSlugRedirects = {
  "10-tips-to-help-you-in-getting-an-effective-conversation-rates-on-your-website": "tips-for-getting-conversion-rates", // 531
  "ecommerce-branding-search-of-identity": "ecommerce-branding", // 453
  "tips-to-finalize-the-market-leading-sms-service-provider": "tips-to-finalize-sms-service-provider", // 439
  "website-design-templates-web-designing-made-easy": "website-design-templates", // 382
  "successful-corporate-website-redesigns-and-their-impact-on-seo": "website-redesigns-and-impact-on-seo", // 635
  "digital-marketing-trends-users-must-know-its-surrounding": "digital-marketing-trends", // 345
  "top-web-design-agency-dubai-2026": "top-web-design-agencies-in-dubai", // 653
  "top-real-estate-web-designing-companies": "top-real-estate-web-design-companies-dubai", // 597
  "web-design-company-why-most-websites-fail-before-they-even-go-live": "why-websites-fail-before-they-go-live", // 654
  "10-key-steps-to-building-a-great-small-business-website": "steps-to-building-small-business-website", // 526
  "top-7-web-design-trends-to-look-out-for-in-the-coming-years": "top-web-design-trends", // 483
  "web-designing-trends-changing-business-customer-attraction-2026": "web-design-trends-that-changed-how-businesses-attract-customers", // 687
  "why-business-emails-go-to-spam-spf-dkim-dmarc": "why-business-emails-go-to-spam", // 743
  "ai-driven-digital-marketing-strategies-for-real-estate-brands-in-2026": "ai-driven-digital-marketing-strategies", // 724
  "logo-designing-dubai-why-a-strong-logo-still-defines-successful-brands-online": "logo-defines-successful-brands-online", // 688
  "top-wordpress-page-builders-to-enhance-your-website-design": "top-wordpress-page-builders", // 622
};

export const blogRedirectRules = Object.entries(blogSlugRedirects).flatMap(
  ([oldSlug, slug]) => ["/blog", ""].map((prefix) => ({
    source: `${prefix}/${oldSlug}/`,
    destination: `/blog/${slug}/`,
    permanent: true,
    statusCode: 301,
  })),
);
