export const DEFAULT_CATEGORY = "filter-websites";

export const PORTFOLIO_CATEGORIES = [
  {
    filter: "filter-websites",
    slug: "websites",
    label: "Websites",
  },
  {
    filter: "filter-app",
    slug: "mobile-app",
    label: "Mobile App",
  },
  {
    filter: "filter-video",
    slug: "videos-production",
    label: "Videos Production",
  },
  {
    filter: "filter-figma",
    slug: "figma-design",
    label: "Figma Design",
  },
];

export const PORTFOLIO_INDUSTRIES = [
  { value: "real-estate", label: "Real Estate Websites" },
  { value: "ecommerce", label: "E-Commerce Websites" },
  { value: "corporate", label: "Corporate Websites" },
  { value: "daily-deals", label: "Daily Deals Websites" },
  { value: "web-portal", label: "Web Portal" },
  { value: "engineering", label: "Engineering & Construction" },
  { value: "travel", label: "Travel & Tourism" },
  { value: "somalian", label: "Somalian Clients" },
  { value: "international", label: "International Projects" },
  { value: "luxury", label: "Luxury & Stunning" },
  { value: "landing", label: "Ad Landing Pages" },
  { value: "logistics", label: "Logistics & Shipping" },
  { value: "bank", label: "Bank" },
];

const CATEGORY_BY_SLUG = Object.fromEntries(
  PORTFOLIO_CATEGORIES.map((item) => [item.slug, item]),
);

const CATEGORY_BY_FILTER = Object.fromEntries(
  PORTFOLIO_CATEGORIES.map((item) => [item.filter, item]),
);

const INDUSTRY_BY_SLUG = Object.fromEntries(
  PORTFOLIO_INDUSTRIES.map((item) => [item.value, item]),
);

export function getCategoryBySlug(slug) {
  return CATEGORY_BY_SLUG[slug] || null;
}

export function getCategoryByFilter(filter) {
  return CATEGORY_BY_FILTER[filter] || CATEGORY_BY_FILTER[DEFAULT_CATEGORY];
}

export function getIndustryBySlug(slug) {
  return INDUSTRY_BY_SLUG[slug] || null;
}

export function buildPortfolioPath(categoryFilter = DEFAULT_CATEGORY, industry = "") {
  const category = getCategoryByFilter(categoryFilter);
  const categorySlug = category?.slug || "websites";
  const industrySlug = industry ? String(industry).trim() : "";

  if (industrySlug && INDUSTRY_BY_SLUG[industrySlug]) {
    if (categorySlug === "websites") {
      return `/our-portfolio/${industrySlug}/`;
    }

    return `/our-portfolio/${categorySlug}/${industrySlug}/`;
  }

  if (categorySlug === "websites") {
    return "/our-portfolio/";
  }

  return `/our-portfolio/${categorySlug}/`;
}

export function parsePortfolioSlug(slug = []) {
  const parts = Array.isArray(slug)
    ? slug.filter(Boolean).map((part) => String(part).toLowerCase())
    : [];

  if (parts.length === 0) {
    return {
      filter: DEFAULT_CATEGORY,
      industry: "",
      path: "/our-portfolio/",
      valid: true,
    };
  }

  if (parts.length === 1) {
    const [first] = parts;
    const category = getCategoryBySlug(first);
    const industry = getIndustryBySlug(first);

    if (category) {
      return {
        filter: category.filter,
        industry: "",
        path: buildPortfolioPath(category.filter),
        valid: true,
      };
    }

    if (industry) {
      return {
        filter: DEFAULT_CATEGORY,
        industry: industry.value,
        path: buildPortfolioPath(DEFAULT_CATEGORY, industry.value),
        valid: true,
      };
    }

    return { valid: false };
  }

  if (parts.length === 2) {
    const [categorySlug, industrySlug] = parts;
    const category = getCategoryBySlug(categorySlug);
    const industry = getIndustryBySlug(industrySlug);

    if (category && industry) {
      return {
        filter: category.filter,
        industry: industry.value,
        path: buildPortfolioPath(category.filter, industry.value),
        valid: true,
      };
    }

    return { valid: false };
  }

  return { valid: false };
}

export function getPortfolioSeo(filter = DEFAULT_CATEGORY, industry = "") {
  const category = getCategoryByFilter(filter);
  const industryItem = industry ? getIndustryBySlug(industry) : null;
  const path = buildPortfolioPath(filter, industry);

  if (industryItem) {
    return {
      title: `${industryItem.label} Portfolio | RedSpider Dubai`,
      description: `Browse RedSpider’s ${industryItem.label.toLowerCase()} portfolio projects designed and developed for businesses in Dubai and the UAE.`,
      keywords: `${industryItem.label.toLowerCase()}, portfolio dubai, redspider projects`,
      path,
    };
  }

  if (category.filter === "filter-app") {
    return {
      title: "Mobile App Portfolio Dubai | RedSpider Projects",
      description:
        "Explore RedSpider’s mobile app portfolio featuring selected Android and iOS projects created for businesses across Dubai and the UAE.",
      keywords:
        "mobile app portfolio dubai, app development examples uae, redspider apps",
      path,
    };
  }

  if (category.filter === "filter-video") {
    return {
      title: "Video Production Portfolio Dubai | RedSpider Projects",
      description:
        "Explore RedSpider’s video production portfolio featuring promotional, corporate and animated video projects for Dubai and UAE brands.",
      keywords:
        "video production portfolio dubai, corporate video examples uae, redspider videos",
      path,
    };
  }

  if (category.filter === "filter-figma") {
    return {
      title: "Figma Design Portfolio Dubai | RedSpider Projects",
      description:
        "Explore RedSpider’s Figma design portfolio featuring selected UI/UX and website design projects for businesses in Dubai and the UAE.",
      keywords:
        "figma design portfolio dubai, ui ux design examples uae, redspider figma",
      path,
    };
  }

  return {
    title: "Web Design Portfolio Dubai | RedSpider Projects",
    description:
      "Explore RedSpider’s web design portfolio featuring selected website projects created for businesses across Dubai, the UAE and different industries.",
    keywords:
      "web design portfolio dubai, redspider projects, website development examples uae",
    path,
  };
}
