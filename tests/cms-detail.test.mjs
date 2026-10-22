import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { fetchCmsDetail } from "../lib/cmsDetail.mjs";

const fetchRecord = (slug) => fetchCmsDetail("services", slug);

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

test("loads a record directly, independently of listing pagination, and encodes slug", async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://cms.example/api/services/a%26b");
    assert.equal(options.cache, "no-store");
    assert.equal(options.headers["X-API-KEY"], "test-only");
    assert.ok(options.signal instanceof AbortSignal);
    return json({ data: { id: 776, slug: "a&b" } });
  };
  assert.equal((await fetchRecord("a&b")).id, 776);
});

test("only a CMS JSON 404 returns null", async () => {
  globalThis.fetch = async () => json({ message: "Not found" }, 404);
  assert.equal(await fetchRecord("missing"), null);
});

for (const status of [401, 403, 429, 500, 502, 503, 504]) {
  test(`HTTP ${status} must not become a cached missing record`, async () => {
    globalThis.fetch = async () => json({ message: "Failure" }, status);
    await assert.rejects(fetchRecord("published"), new RegExp(String(status)));
  });
}
for (const payload of [{}, { data: null }, { data: [] }, { data: {} }]) {
  test(`invalid successful payload ${JSON.stringify(payload)} throws`, async () => {
    globalThis.fetch = async () => json(payload);
    await assert.rejects(fetchRecord("published"), /invalid payload/);
  });
}
test("invalid JSON and HTML 404s do not become missing records", async () => {
  globalThis.fetch = async () => new Response("bad json");
  await assert.rejects(fetchRecord("published"));
  globalThis.fetch = async () => new Response("proxy error", { status: 404 });
  await assert.rejects(fetchRecord("published"), /non-JSON 404/);
});
test("network failures and timeouts propagate; subsequent request recovers", async () => {
  for (const error of [new TypeError("fetch failed"), new DOMException("Timed out", "TimeoutError")]) {
    globalThis.fetch = async () => { throw error; };
    await assert.rejects(fetchRecord("published"), error);
  }
  globalThis.fetch = async () => json({ data: { slug: "published" } });
  assert.equal((await fetchRecord("published")).slug, "published");
});
test("missing configuration fails before making a request", async () => {
  delete process.env.API_KEY;
  delete process.env.NEXT_PUBLIC_API_KEY;
  globalThis.fetch = async () => assert.fail("must not fetch");
  await assert.rejects(fetchRecord("published"), /configuration/);
});

test("products use the same failure protection", async () => {
  globalThis.fetch = async (url) => {
    assert.equal(url, "https://cms.example/api/products/published");
    return json({ data: { slug: "published" } });
  };
  assert.equal((await fetchCmsDetail("products", "published")).slug, "published");
  globalThis.fetch = async () => json({ message: "Unavailable" }, 503);
  await assert.rejects(fetchCmsDetail("products", "published"), /503/);
});
