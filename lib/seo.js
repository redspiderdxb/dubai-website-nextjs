export const PRODUCTION_HOSTS = new Set(["redspider.ae", "www.redspider.ae"]);

function normalizeSiteUrl(url) {
  const trimmed = String(url || "").trim().replace(/\/$/, "");

  return trimmed || "https://www.redspider.ae";
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL,
);

function getCanonicalHostname() {
  try {
    return new URL(SITE_URL).hostname;
  } catch {
    return "www.redspider.ae";
  }
}

const BLOCKED_CANONICAL_HOST =
  /(?:^|\.)vercel\.app$|localhost|127\.0\.0\.1|rsworkspace\.net|\.local$/i;

function withTrailingSlash(pathname = "/") {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function productionCanonical(path = "/") {
  const pathname = path.startsWith("/") ? path : `/${path}`;

  return `${SITE_URL}${withTrailingSlash(pathname)}`;
}

export function sanitizeCanonical(canonical, fallbackPath) {
  const fallback = fallbackPath ? productionCanonical(fallbackPath) : undefined;
  const canonicalHost = getCanonicalHostname();

  if (!canonical || typeof canonical !== "string") {
    return fallback;
  }

  try {
    const parsed = new URL(canonical.trim(), SITE_URL);

    if (BLOCKED_CANONICAL_HOST.test(parsed.hostname)) {
      parsed.host = canonicalHost;
    } else if (parsed.hostname === "redspider.ae" || parsed.hostname === "www.redspider.ae") {
      parsed.host = canonicalHost;
    } else if (!PRODUCTION_HOSTS.has(parsed.hostname)) {
      return fallback;
    }

    parsed.protocol = "https:";
    parsed.port = "";
    parsed.search = "";
    parsed.hash = "";
    parsed.pathname = withTrailingSlash(parsed.pathname || "/");

    return parsed.toString();
  } catch {
    return fallback;
  }
}

export function isProductionSitemapUrl(url) {
  if (!url || typeof url !== "string") {
    return false;
  }

  try {
    const parsed = new URL(url);

    return (
      parsed.protocol === "https:" &&
      PRODUCTION_HOSTS.has(parsed.hostname) &&
      parsed.pathname.startsWith("/")
    );
  } catch {
    return false;
  }
}
