import fs from "node:fs";
import * as cheerio from "cheerio";
import { legacyRedirects } from "../next.config.mjs";
const origin = process.env.CHECK_ORIGIN || "http://localhost:3100";
const data = JSON.parse(fs.readFileSync("data/catalogue.json", "utf8"));
const routes = [
  "/",
  "/about",
  "/products",
  "/contact",
  "/privacy",
  ...data.flatMap((c) => [
    "/products/" + c.slug,
    ...c.products.map((p) => `/products/${c.slug}/${p.slug}`),
  ]),
];
const failures = [],
  records = [],
  assets = new Set(),
  links = new Set();
const titles = new Set();
for (const path of routes) {
  const r = await fetch(origin + path);
  const $ = cheerio.load(await r.text());
  const title = $("title").text();
  if (r.status !== 200) failures.push(`${path}: ${r.status}`);
  if ($("h1").length !== 1)
    failures.push(`${path}: h1 count ${$("h1").length}`);
  if (!title || titles.has(title))
    failures.push(`${path}: missing/duplicate title`);
  titles.add(title);
  if (!$('meta[name="description"]').attr("content"))
    failures.push(`${path}: missing description`);
  if ($("html").attr("lang") !== "en") failures.push(`${path}: language`);
  const canonical = $('link[rel="canonical"]').attr("href");
  if (
    canonical !==
    "https://www.vinayakautomation.com" + (path === "/" ? "" : path)
  )
    failures.push(`${path}: canonical ${canonical}`);
  $('script[type="application/ld+json"]').each((_, n) => {
    try {
      JSON.parse($(n).text());
    } catch {
      failures.push(`${path}: bad JSON-LD`);
    }
  });
  $('a[href^="/"]').each((_, n) => links.add($(n).attr("href")));
  $("img[src]").each((_, n) => assets.add($(n).attr("src")));
  records.push({ path, status: r.status, title, canonical });
}
for (const link of links) {
  const path = new URL(link, origin).pathname;
  if (!routes.includes(path) && !path.startsWith("/api/"))
    failures.push(`Unrecognised internal link: ${link}`);
}
for (const asset of assets) {
  const r = await fetch(new URL(asset, origin));
  if (!r.ok) failures.push(`Broken image ${asset}: ${r.status}`);
}
for (const rule of legacyRedirects) {
  const r = await fetch(origin + rule.source, { redirect: "manual" });
  if (r.status !== 308) failures.push(`Redirect ${rule.source}: ${r.status}`);
  if (
    new URL(r.headers.get("location"), origin).pathname !==
    rule.destination.split("#")[0]
  )
    failures.push(`Wrong redirect ${rule.source}`);
}
for (const old of [
  "/images/fav.html",
  "/apple-touch-icon.html",
  "/fonts/POST.html",
  "/unknown-page",
]) {
  const r = await fetch(origin + old);
  if (r.status !== 404) failures.push(`Expected 404 ${old}, got ${r.status}`);
}
const invalid = await fetch(origin + "/api/contact", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: "{}",
});
if (invalid.status !== 400) failures.push("API invalid request not rejected");
const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
for (const path of routes)
  if (
    !sitemap.includes(
      "https://www.vinayakautomation.com" + (path === "/" ? "" : path),
    )
  )
    failures.push(`Missing sitemap ${path}`);
const result = {
  origin,
  pages: records.length,
  images: assets.size,
  redirects: legacyRedirects.length,
  failures,
  records,
};
fs.mkdirSync("artifacts", { recursive: true });
fs.writeFileSync("artifacts/crawl.json", JSON.stringify(result, null, 2));
console.log({
  pages: records.length,
  images: assets.size,
  redirects: legacyRedirects.length,
  failures,
});
if (failures.length) process.exitCode = 1;
