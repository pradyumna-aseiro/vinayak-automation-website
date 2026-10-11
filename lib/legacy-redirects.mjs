// Old static-site URLs and where they now live. next.config.mjs turns these
// into permanent redirects; app/sitemap-legacy.xml lists the old URLs so search
// engines recrawl them and see the redirects.
import fs from "node:fs";
const categories = JSON.parse(fs.readFileSync("data/catalogue.json", "utf8"));
export const legacyRedirects = [
  { source: "/index.html", destination: "/" },
  { source: "/index-2.html", destination: "/" },
  { source: "/about.html", destination: "/about" },
  { source: "/products.html", destination: "/products" },
  { source: "/contact.html", destination: "/contact" },
  { source: "/services.html", destination: "/about#integration" },
  ...categories.map((c) => ({
    source: `/${c.slug}.html`,
    destination: `/products/${c.slug}`,
  })),
  {
    source: "/drives-and-automation-detail.html",
    destination: "/products/drives-and-automation",
  },
  {
    source: "/industrial-automation-solution-detail.html",
    destination: "/products/industrial-automation-solution",
  },
  {
    source: "/control-and-power-products-detail.html",
    destination: "/products/control-and-power-products",
  },
  ...["c4ca", "c81e", "eccb", "a87f"].map((suffix, i) => ({
    source: `/control-and-power-products-detail${suffix}.html`,
    destination:
      "/products/control-and-power-products#" +
      ["tab1primary", "tab2primary", "tab3primary", "tab4primary"][i],
  })),
  ...["", "c4ca", "c81e"].map((suffix) => ({
    source: `/incremental-encoders-detail${suffix}.html`,
    destination:
      "/products/incremental-encoders" +
      (suffix ? "#" + (suffix === "c4ca" ? "tab1primary" : "tab2primary") : ""),
  })),
  {
    source: "/renu-electronics.html",
    destination: "/products/industrial-automation-solution",
  },
  {
    source: "/vfx.html",
    destination: "/products/drives-and-automation/vfx-fdu",
  },
];
