/** Read-only full-catalog release check. BLOG_BASE_URL may target a preview. */
import { blogSlugRedirects } from "../lib/blogRedirects.mjs";
const base = (process.env.BLOG_BASE_URL || "https://www.redspider.ae").replace(/\/$/, "");
async function read(path) {
  return fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
}
const posts = [];
let lastPage = 1;
let total;
for (let page = 1; page <= lastPage; page++) {
  const response = await read(`/api/blog/?page=${page}`);
  if (!response.ok) throw new Error(`Catalog page ${page}: HTTP ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data.posts) || !Number.isInteger(data.pagination?.last_page)) {
    throw new Error(`Invalid catalog page ${page}`);
  }
  lastPage = data.pagination.last_page;
  total = data.pagination.total;
  posts.push(...data.posts);
}
const bySlug = new Map(posts.map(post => [post.slug, post]));
if (bySlug.size !== total || posts.length !== total) {
  throw new Error(`Catalog incomplete or changed during audit: ${bySlug.size}/${total}; rerun`);
}
const checks = posts.map(post => ({ path: `/blog/${encodeURIComponent(post.slug)}/`, post }));
for (const [oldSlug, slug] of Object.entries(blogSlugRedirects)) {
  const post = bySlug.get(slug);
  if (!post) throw new Error(`Redirect destination absent from catalog: ${slug}`);
  for (const prefix of ["", "/blog"]) checks.push({ path: `${prefix}/${oldSlug}/`, post });
}
const results = [];
let index = 0;
await Promise.all(Array.from({ length: 3 }, async () => {
  while (index < checks.length) {
    const { path, post } = checks[index++];
    try {
      const response = await read(path);
      const html = await response.text();
      const raw = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)?.[1];
      const actual = raw ? JSON.parse(raw).props?.pageProps?.post : null;
      const ok = response.status === 200 && String(actual?.id) === String(post.id) && actual?.slug === post.slug;
      results.push({ path, status: response.status, ok, expectedId: post.id, actualId: actual?.id, finalUrl: response.url });
    } catch (error) {
      results.push({ path, ok: false, error: error.message });
    }
  }
}));
const failures = results.filter(result => !result.ok);
console.log(JSON.stringify({ base, checkedAt: new Date().toISOString(), publishedPosts: total, checked: results.length, passed: results.length - failures.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
