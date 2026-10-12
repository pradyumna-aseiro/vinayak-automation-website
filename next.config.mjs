import { legacyRedirects } from "./lib/legacy-redirects.mjs";
export { legacyRedirects };

const config = {
  poweredByHeader: false,
  // Vercel's free tier allows 5,000 image transformations a month, shared with
  // the other projects on the team, and every (image x width x format) variant
  // counts, again each time it goes stale. WebP only, a short width ladder and
  // a long cache keep us well inside it. Images in /public are effectively
  // immutable: when replacing one, give it a new filename, or the old version
  // may be served for up to 31 days.
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 2678400,
  },
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
