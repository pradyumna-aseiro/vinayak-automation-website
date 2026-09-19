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
const config = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      // The bare domain served the whole site with a 200, giving search engines a
      // second copy of every page. Send it to the canonical www host instead.
      {
        source: "/:path*",
        has: [{ type: "host", value: "vinayakautomation.com" }],
        destination: "https://www.vinayakautomation.com/:path*",
        permanent: true,
      },
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          ...(process.env.VERCEL_ENV === "preview"
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
            : []),
        ],
      },
    ];
  },
};

export default config;
