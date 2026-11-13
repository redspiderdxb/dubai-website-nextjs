import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-catalog-check-"));

fs.mkdirSync(path.join(dest, "lib"), { recursive: true });
fs.mkdirSync(path.join(dest, "pages", "api"), { recursive: true });
fs.writeFileSync(path.join(dest, "package.json"), '{"type":"module"}\n');

for (const file of ["galleries.js", "api.js", "blogPost.mjs", "cmsDetail.mjs"]) {
  fs.copyFileSync(path.join(root, "lib", file), path.join(dest, "lib", file));
}

fs.copyFileSync(
  path.join(root, "pages", "api", "galleries.js"),
  path.join(dest, "pages", "api", "galleries.js"),
);

const apiSource = fs
  .readFileSync(path.join(dest, "lib", "api.js"), "utf8")
  .replaceAll('from "./galleries"', 'from "./galleries.js"');
fs.writeFileSync(path.join(dest, "lib", "api.js"), apiSource);

const handlerSource = fs
  .readFileSync(path.join(dest, "pages", "api", "galleries.js"), "utf8")
  .replaceAll('from "../../lib/galleries"', 'from "../../lib/galleries.js"');
fs.writeFileSync(path.join(dest, "pages", "api", "galleries.js"), handlerSource);

const runner = `
import assert from "node:assert/strict";

process.env.NEXT_PUBLIC_API_URL = "https://cms.example/api/v1";
process.env.API_KEY = "test-key";

const {
  adoptPortfolioCatalog,
  getAllGalleries,
  isCompleteGalleryCatalog,
} = await import("./lib/galleries.js");
const { fetchAllGalleries } = await import("./lib/api.js");
const { default: handler } = await import("./pages/api/galleries.js");

function item(id) {
  return {
    id,
    name: "Project " + id,
    slug: "project-" + id,
    description: "Project " + id,
    image: "",
    project_url: "https://example.com/" + id,
  };
}

function pageBody(records, meta) {
  return {
    data: records,
    meta: meta || {},
  };
}

function jsonResponse(body) {
  return { ok: true, status: 200, json: async () => body };
}

function createRes() {
  return {
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

const calls = [];
let mode = "missing-total";
const realNow = Date.now;
let clockOffset = 0;
Date.now = () => realNow() + clockOffset;
console.error = () => {};

global.fetch = async (url) => {
  const href = String(url);
  calls.push(href);
  const page = Number(new URL(href, "https://local.test").searchParams.get("page") || "1");

  if (mode === "throw") {
    throw new Error("cms down");
  }

  if (mode === "missing-total") {
    assert.equal(page, 1);
    return jsonResponse(pageBody(
      [item(1), item(2), item(3), item(4), item(5), item(6), item(7), item(8), item(9), item(10)],
      { per_page: 50 },
    ));
  }

  if (mode === "total-without-last-page") {
    if (page === 1) {
      return jsonResponse(pageBody([item(1), item(2)], { total: 4, per_page: 2 }));
    }
    if (page === 2) {
      return jsonResponse(pageBody([item(3), item(4)], { total: 4, per_page: 2 }));
    }
    throw new Error("unexpected page " + page);
  }

  if (mode === "empty-intermediate") {
    if (page === 1) {
      return jsonResponse(pageBody([item(1), item(2)], { total: 6, per_page: 2 }));
    }
    if (page === 2) {
      return jsonResponse(pageBody([], { total: 6, per_page: 2 }));
    }
    if (page === 3) {
      return jsonResponse(pageBody([item(5), item(6)], { total: 6, per_page: 2 }));
    }
    throw new Error("unexpected page " + page);
  }

  throw new Error("unknown mode " + mode);
};

assert.equal(
  isCompleteGalleryCatalog(
    [item(1)],
    { totalProvided: false, pagesAccepted: true, pagination: { last_page: 1, total: 0 } },
  ),
  false,
);
assert.equal(
  isCompleteGalleryCatalog(
    [item(1), item(2)],
    { totalProvided: true, pagesAccepted: false, total: 2 },
  ),
  false,
);
assert.equal(
  isCompleteGalleryCatalog(
    [item(1), item(2)],
    { totalProvided: true, pagesAccepted: true, total: 2 },
  ),
  true,
);

const kept = adoptPortfolioCatalog(
  { items: [item(1), item(2)], complete: true },
  { items: [item(3), item(4), item(5)], complete: false },
);
assert.deepEqual(kept.items.map((entry) => entry.id), [1, 2]);
assert.equal(kept.complete, true);

const upgraded = adoptPortfolioCatalog(
  { items: [item(1)], complete: true },
  { items: [item(1), item(2)], complete: true },
);
assert.deepEqual(upgraded.items.map((entry) => entry.id), [1, 2]);
assert.equal(upgraded.complete, true);

const firstMissing = await getAllGalleries();
assert.equal(firstMissing.complete, false);
assert.equal(firstMissing.stale, undefined);
assert.equal(firstMissing.galleries.length, 10);
const callsAfterMissing = calls.length;
const secondMissing = await getAllGalleries();
assert.equal(secondMissing.complete, false);
assert.ok(calls.length > callsAfterMissing, "catalog without total was cached");

mode = "empty-intermediate";
const callsBeforeHole = calls.length;
const rejected = await getAllGalleries();
assert.equal(rejected.complete, false);
assert.notEqual(rejected.stale, true);
assert.deepEqual(rejected.galleries, []);
const serverRejected = await fetchAllGalleries();
assert.ok(Array.isArray(serverRejected));
assert.deepEqual(serverRejected, []);
const callsAfterHole = calls.length;
await getAllGalleries();
assert.ok(calls.length > callsAfterHole, "rejected partial catalog was cached");
assert.ok(calls.length > callsBeforeHole);

mode = "total-without-last-page";
const callsBeforeComplete = calls.length;
const complete = await getAllGalleries();
assert.equal(complete.complete, true);
assert.deepEqual(complete.galleries.map((entry) => entry.id), [1, 2, 3, 4]);
const serverComplete = await fetchAllGalleries();
assert.ok(Array.isArray(serverComplete));
assert.deepEqual(serverComplete.map((entry) => entry.id), [1, 2, 3, 4]);
assert.equal(serverComplete[0].name, "Project 1");
assert.equal(serverComplete[0].project_url, "https://example.com/1");

const callsAfterComplete = calls.length;
const cached = await getAllGalleries();
assert.equal(cached, complete);
assert.equal(calls.length, callsAfterComplete, "complete catalog was not reused");

const freshResponse = createRes();
await handler({ method: "GET", query: { all: "1" } }, freshResponse);
assert.equal(freshResponse.body.complete, true);
assert.equal(freshResponse.body.stale, undefined);
assert.equal(
  freshResponse.headers["Cache-Control"],
  "public, s-maxage=300, stale-while-revalidate=3600",
);
assert.equal(calls.length, callsAfterComplete);

clockOffset = 6 * 60 * 1000;
mode = "throw";
const stale = await getAllGalleries();
assert.equal(stale.stale, true);
assert.equal(stale.complete, false);
assert.deepEqual(stale.galleries.map((entry) => entry.id), [1, 2, 3, 4]);

const staleResponse = createRes();
await handler({ method: "GET", query: { all: "1" } }, staleResponse);
assert.equal(staleResponse.body.complete, false);
assert.equal(staleResponse.body.stale, true);
assert.equal(staleResponse.body.galleries.length, 4);
assert.equal(staleResponse.headers["Cache-Control"], "private, no-store");

clockOffset = 0;
const callsBeforeReuse = calls.length;
const restored = await getAllGalleries();
assert.equal(restored.complete, true);
assert.equal(restored.stale, undefined);
assert.equal(calls.length, callsBeforeReuse);

console.log("portfolio catalog checks passed");
`;

fs.writeFileSync(path.join(dest, "run.mjs"), runner);
const result = spawnSync(process.execPath, ["run.mjs"], {
  cwd: dest,
  encoding: "utf8",
});

if (result.stdout) {
  process.stdout.write(result.stdout);
}

if (result.stderr) {
  process.stderr.write(result.stderr);
}

process.exit(result.status ?? 1);
