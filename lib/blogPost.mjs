/**
 * Only an explicit CMS 404 means missing. All other failures must reach Next.js
 * so ISR retains the last successful page and retries instead of caching a 404.
 */
export async function fetchPostBySlug(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;
  if (!apiUrl || !apiKey) throw new Error("Blog API configuration is missing");
  if (typeof slug !== "string" || !slug) throw new Error("Blog slug is required");

  const response = await fetch(
    `${apiUrl.replace(/\/$/, "")}/posts/${encodeURIComponent(slug)}`,
    {
      headers: { Accept: "application/json", "X-API-KEY": apiKey },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    },
  );

  if (response.status === 404) {
    // An HTML proxy/error page is not proof that a CMS post is missing.
    if (!response.headers.get("content-type")?.includes("application/json")) {
      throw new Error("Blog API returned a non-JSON 404");
    }
    await response.json();
    return null;
  }
  if (!response.ok) throw new Error(`Blog detail API error: ${response.status}`);

  const payload = await response.json();
  const post = payload?.data;
  if (!post || Array.isArray(post) || typeof post.slug !== "string" || !post.slug) {
    throw new Error("Blog API returned an invalid post payload");
  }
  return post;
}
