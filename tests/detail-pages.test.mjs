import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Execute the actual data-loading exports without importing React/JSX.
for (const [file, param, fetchName, prop] of [
  ["service/[id].js", "id", "fetchServiceBySlug", "service"],
  ["products/[slug].js", "slug", "fetchProductBySlug", "product"],
]) {
  const source = await readFile(new URL(`../pages/${file}`, import.meta.url), "utf8");
  const body = source.slice(source.indexOf("export async function getStaticProps"))
    .replace("export async function", "async function");
  const makeLoader = new Function(fetchName, "discardInvalidCustomJs", "console",
    `${body}; return getStaticProps;`);
  const load = (fetcher) => makeLoader(fetcher, (value) => value, { error() {} });

  test(`${file}: preserves errors instead of generating an ISR 404`, async () => {
    const failure = new Error("temporary CMS outage");
    await assert.rejects(load(async () => { throw failure; })({ params: { [param]: "published" } }), failure);
  });
  test(`${file}: missing record retries, then recovers when published`, async () => {
    let record = null;
    const getProps = load(async () => record);
    assert.deepEqual(await getProps({ params: { [param]: "published" } }), { notFound: true, revalidate: 60 });
    record = { slug: "published" };
    assert.deepEqual(await getProps({ params: { [param]: "published" } }), {
      props: { [prop]: record }, revalidate: 60,
    });
  });
}
