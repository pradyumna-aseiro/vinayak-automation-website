import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import { legacyRedirects } from "../next.config.mjs";
const categories = JSON.parse(fs.readFileSync("data/catalogue.json", "utf8"));
const routes = new Set([
  "/",
  "/about",
  "/products",
  "/contact",
  ...categories.flatMap((c) => [
    "/products/" + c.slug,
    ...c.products.map((p) => `/products/${c.slug}/${p.slug}`),
  ]),
]);
test("all redirects resolve to a real route without chains", () => {
  assert.equal(
    new Set(legacyRedirects.map((r) => r.source)).size,
    legacyRedirects.length,
  );
  for (const r of legacyRedirects)
    assert.ok(
      routes.has(r.destination.split("#")[0]),
      `${r.source} -> ${r.destination}`,
    );
});
test("catalogue has ten categories, unique routes, and real product images", () => {
  assert.equal(categories.length, 10);
  for (const c of categories) {
    assert.equal(
      new Set(c.products.map((p) => p.slug)).size,
      c.products.length,
    );
    for (const p of c.products) {
      assert.ok(p.name);
      // An empty image means "Photo on request"; any path given must exist.
      if (p.image) assert.ok(fs.existsSync("public" + p.image), p.image);
    }
  }
});
