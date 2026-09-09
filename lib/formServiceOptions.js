/** Fallback when the services API is unavailable (matches header menu). */
export const FALLBACK_HEADER_SERVICES = [
  { name: "Web Design & Development", slug: "web-development" },
  { name: "eCommerce Website Development", slug: "ecommerce-web-design-dubai" },
  { name: "Real Estate Website Development", slug: "real-estate-portal", path: "/products/real-estate-portal" },
  { name: "Mobile App Development", slug: "mobile-app-development-company-dubai" },
  { name: "Branding & Logo Design", slug: "logo-designing-company-dubai-brand-identity" },
  { name: "Graphic Design", slug: "graphic-design-services" },
  { name: "Brochure & Company Profile Design", slug: "brochure-design-company-in-dubai" },
  { name: "Email Marketing", slug: "email-marketing" },
  { name: "SMS Marketing", slug: "sms-marketing-uae", path: "/products/sms-marketing-uae" },
  { name: "Web Hosting & Server Solutions", slug: "web-hosting" },
  { name: "WhatsApp Business API Integration", slug: "whatsapp-business-api-integration" },
];

export function getServiceNavPath(service) {
  if (service?.path) {
    return service.path;
  }

  if (!service?.slug) {
    return "/service/";
  }

  return `/service/${service.slug}`;
}

/** Static service pages that must appear in the Services menu. */
export const STATIC_SERVICE_NAV_ITEMS = [
  {
    name: "Search Engine Optimization",
    slug: "seo-agency-dubai",
    path: "/service/seo-agency-dubai",
  },
];

function normalizeServiceNavPath(service) {
  if (service?.path) {
    return String(service.path).replace(/\/+$/, "");
  }

  if (service?.slug) {
    return `/service/${service.slug}`;
  }

  return "";
}

export function mergeStaticServiceNavItems(services) {
  const list = Array.isArray(services) ? [...services] : [];

  for (const item of STATIC_SERVICE_NAV_ITEMS) {
    const itemPath = normalizeServiceNavPath(item);
    const exists = list.some((existing) => {
      return (
        existing?.slug === item.slug ||
        existing?.name === item.name ||
        normalizeServiceNavPath(existing) === itemPath
      );
    });

    if (!exists) {
      list.push(item);
    }
  }

  return list;
}

export function resolveHeaderServices(apiServices) {
  if (Array.isArray(apiServices) && apiServices.length > 0) {
    return apiServices;
  }

  return FALLBACK_HEADER_SERVICES;
}

export function buildServiceSelectOptions(services, placeholder = "Select service") {
  const list = resolveHeaderServices(services);

  return [
    { value: "", label: placeholder, disabled: true },
    ...list
      .filter((item) => item?.name)
      .map((item) => ({
        value: item.name,
        label: item.name,
      })),
  ];
}
