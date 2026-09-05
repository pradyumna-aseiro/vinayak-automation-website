import { categories, site } from "@/lib/catalogue";
export const dynamic = "force-static";
export function GET() {
  return new Response(
    [
      "# " + site.name,
      "> Industrial automation products and system integration. Established in 2007. Based in Secunderabad, Hyderabad, India.",
      "",
      "## Business",
      "- [About](" +
        site.url +
        "/about): Company and integration capabilities.",
      "- [Contact](" +
        site.url +
        "/contact): Address, telephone numbers and quotation enquiries.",
      "",
      "## Product catalogue",
      ...categories.map(
        (c) =>
          "- [" +
          c.name +
          "](" +
          site.url +
          "/products/" +
          c.slug +
          "): " +
          c.description,
      ),
      "",
      "Product suitability, prices, availability and delivery require confirmation by the business.",
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
