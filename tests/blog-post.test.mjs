import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { fetchPostBySlug } from "../lib/blogPost.mjs";
import { blogRedirectRules, blogSlugRedirects } from "../lib/blogRedirects.mjs";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
beforeEach(() => {
  process.env.NEXT_PUBLIC_API_URL = "https://cms.example/api/";
  process.env.API_KEY = "test-only";
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env = { ...originalEnv };
});
const json = (data, status = 200) => Response.json(data, { status });

test("loads a post directly, independently of listing pagination, and encodes slug", async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://cms.example/api/posts/a%26b");
    assert.equal(options.cache, "no-store");
    assert.equal(options.headers["X-API-KEY"], "test-only");
    assert.ok(options.signal instanceof AbortSignal);
    return json({ data: { id: 776, slug: "a&b" } });
  };
  assert.equal((await fetchPostBySlug("a&b")).id, 776);
});

test("only a CMS JSON 404 returns null", async () => {
  globalThis.fetch = async () => json({ message: "Not found" }, 404);
  assert.equal(await fetchPostBySlug("missing"), null);
});

for (const status of [401, 403, 429, 500, 502, 503, 504]) {
  test(`HTTP ${status} must not become a cached missing post`, async () => {
    globalThis.fetch = async () => json({ message: "Failure" }, status);
    await assert.rejects(fetchPostBySlug("published"), new RegExp(String(status)));
  });
}
for (const payload of [{}, { data: null }, { data: [] }, { data: {} }]) {
  test(`invalid successful payload ${JSON.stringify(payload)} throws`, async () => {
    globalThis.fetch = async () => json(payload);
    await assert.rejects(fetchPostBySlug("published"), /invalid post/);
  });
}
test("invalid JSON and HTML 404s do not become missing posts", async () => {
  globalThis.fetch = async () => new Response("bad json");
  await assert.rejects(fetchPostBySlug("published"));
  globalThis.fetch = async () => new Response("proxy error", { status: 404 });
  await assert.rejects(fetchPostBySlug("published"), /non-JSON 404/);
});
test("network failures and timeouts propagate; subsequent request recovers", async () => {
  for (const error of [new TypeError("fetch failed"), new DOMException("Timed out", "TimeoutError")]) {
    globalThis.fetch = async () => { throw error; };
    await assert.rejects(fetchPostBySlug("published"), error);
  }
  globalThis.fetch = async () => json({ data: { slug: "published" } });
  assert.equal((await fetchPostBySlug("published")).slug, "published");
});
test("missing configuration fails before making a request", async () => {
  delete process.env.API_KEY;
  delete process.env.NEXT_PUBLIC_API_KEY;
  globalThis.fetch = async () => assert.fail("must not fetch");
  await assert.rejects(fetchPostBySlug("published"), /configuration/);
});
test("legacy redirects cover both URL forms without chains or loops", () => {
  assert.equal(blogRedirectRules.length, 32);
  assert.equal(new Set(blogRedirectRules.map(r => r.source)).size, 32);
  for (const [oldSlug, slug] of Object.entries(blogSlugRedirects)) {
    assert.notEqual(oldSlug, slug);
    assert.equal(blogSlugRedirects[slug], undefined);
    for (const prefix of ["/blog", ""]) {
      const rule = blogRedirectRules.find(r => r.source === `${prefix}/${oldSlug}/`);
      assert.equal(rule.destination, `/blog/${slug}/`);
      assert.equal(rule.statusCode, 301);
    }
  }
});
