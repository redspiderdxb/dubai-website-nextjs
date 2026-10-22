/** Only a JSON CMS 404 proves a record is missing. Transient failures must
 * propagate so Next.js ISR retains the last successful page and retries. */
export async function fetchCmsDetail(resource, slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;
  if (!apiUrl || !apiKey) throw new Error("CMS API configuration is missing");
  if (typeof slug !== "string" || !slug) throw new Error("CMS slug is required");

  const response = await fetch(
    `${apiUrl.replace(/\/$/, "")}/${resource}/${encodeURIComponent(slug)}`,
    {
      headers: { Accept: "application/json", "X-API-KEY": apiKey },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    },
  );
  if (response.status === 404) {
    if (!response.headers.get("content-type")?.includes("application/json")) {
      throw new Error(`${resource} API returned a non-JSON 404`);
    }
    await response.json();
    return null;
  }
  if (!response.ok) throw new Error(`${resource} API error: ${response.status}`);
  const payload = await response.json();
  const record = payload?.data;
  if (!record || Array.isArray(record) || typeof record.slug !== "string" || !record.slug) {
    throw new Error(`${resource} API returned an invalid payload`);
  }
  return record;
}

export const fetchServiceBySlug = (slug) => fetchCmsDetail("services", slug);
export const fetchProductBySlug = (slug) => fetchCmsDetail("products", slug);
