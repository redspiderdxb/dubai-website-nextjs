export const SITE_URL = "https://www.redspider.ae";

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

  if (!canonical || typeof canonical !== "string") {
    return fallback;
  }

  try {
    const parsed = new URL(canonical.trim(), SITE_URL);

    if (BLOCKED_CANONICAL_HOST.test(parsed.hostname)) {
      parsed.host = "www.redspider.ae";
    } else if (parsed.hostname === "redspider.ae") {
      parsed.host = "www.redspider.ae";
    } else if (parsed.hostname !== "www.redspider.ae") {
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
      parsed.hostname === "www.redspider.ae" &&
      parsed.pathname.startsWith("/")
    );
  } catch {
    return false;
  }
}
