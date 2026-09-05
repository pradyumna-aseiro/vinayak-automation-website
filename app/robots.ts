import type { MetadataRoute } from "next";
import { site } from "@/lib/catalogue";
export default function robots(): MetadataRoute.Robots {
  return process.env.VERCEL_ENV === "preview"
    ? { rules: { userAgent: "*", disallow: "/" } }
    : {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: site.url + "/sitemap.xml",
      };
}
