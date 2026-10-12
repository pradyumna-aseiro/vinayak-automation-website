import { legacyRedirects } from "@/lib/legacy-redirects.mjs";
import { site } from "@/lib/catalogue";

// Temporary sitemap of the old static-site URLs, which now 308 to the new pages.
// Google last crawled some of them in July and August 2026 and still shows them
// in results, so it has not seen the redirects. Listing them prompts a recrawl.
// Remove this route (and the sitemap in Search Console) once the old URLs drop
// out of the index.
export const dynamic = "force-static";

export function GET() {
  const urls = [...new Set(legacyRedirects.map((r) => r.source))]
    .map((path) => `  <url><loc>${site.url}${path}</loc></url>`)
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
