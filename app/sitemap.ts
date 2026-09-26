import type { MetadataRoute } from "next";
import { categories, productUrl, site } from "@/lib/catalogue";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/products",
    "/contact",
    "/privacy",
    ...categories.flatMap((c) => [
      "/products/" + c.slug,
      ...c.products.map((p) => productUrl(c, p)),
    ]),
  ].map((path) => ({ url: site.url + path }));
}
