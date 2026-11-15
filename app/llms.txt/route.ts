import {
  categories,
  productBrand,
  productUrl,
  site,
} from "@/lib/catalogue";
export const dynamic = "force-static";
// Lists every product page by make and model so an AI assistant asked "who sells
// X in Hyderabad" can name the page. Built from the same data as the sitemap; no
// prices, stock or delivery promises.
const productLines = categories.flatMap((c) => [
  "",
  "## " + c.name + " (" + c.brand + ")",
  c.description,
  "",
  "- [" + c.name + " range](" + site.url + "/products/" + c.slug + ")",
  ...c.products.map((p) => {
    const models = (p.models ?? []).slice(0, 8).join(", ");
    const brand = productBrand(c, p);
    // "Emotron VSS" under CG-Emotron already names the make; don't double it.
    const firstWord = p.name.split(" ")[0].toLowerCase();
    const label = brand.toLowerCase().includes(firstWord)
      ? p.name
      : brand + " " + p.name;
    return (
      "- [" +
      label +
      "](" +
      site.url +
      productUrl(c, p) +
      ")" +
      (models ? ": " + models : "")
    );
  }),
]);
export function GET() {
  return new Response(
    [
      "# " + site.name,
      "> Industrial automation company in Secunderabad, Hyderabad, India, established in " +
        site.established +
        ". Supplies drives, PLCs, HMIs, encoders, sensors, conveyor safety switches, level instruments, motors and gearboxes, and builds VFD and PLC control panels.",
      "",
      "## Business",
      "- [About](" + site.url + "/about): Company and integration capabilities.",
      "- [Contact](" +
        site.url +
        "/contact): Address, telephone numbers and quotation enquiries.",
      "- [All products](" +
        site.url +
        "/products): Searchable catalogue by make, model and type.",
      "",
      "## How to get a quote",
      "- Use the enquiry link on any product page; it opens " +
        site.url +
        "/contact with the product filled in.",
      "- Or call " + site.phone + " or email " + site.email + ".",
      "- Give the make and model, quantity and application. Product suitability, prices, availability and delivery are confirmed with the quotation.",
      ...productLines,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
