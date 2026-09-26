import catalogue from "@/data/catalogue.json";
export type Block = { type: string; text?: string; rows?: string[][] };
export type Product = {
  slug: string;
  name: string;
  group: string;
  image: string;
  blocks: Block[];
  legacyIds: string[];
  source: string;
};
export type Category = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  brand: string;
  image: string;
  selection: string[];
  products: Product[];
};
export const categories = catalogue as Category[];
export const site = {
  name: "Vinayak Automation Products",
  url: "https://www.vinayakautomation.com",
  email: "info@vinayakautomation.com",
  phone: "040-27804951",
  tel: "+914027804951",
  phones: [
    { label: "Landlines", numbers: ["040-27804951", "040-27805941"] },
    { label: "Sales", numbers: ["+91 9000 789 304", "+91 9000 789 305"] },
    { label: "Support", numbers: ["+91 9000 789 301", "+91 9000 789 302"] },
    { label: "Marketing", numbers: ["+91 9000 789 303"] },
  ],
  address:
    "No. 10-2-2/10, Meghana East End Apartment, West Marredpally, Secunderabad, Hyderabad, Telangana 500026",
  established: 2007,
};
export const productUrl = (c: Category, p: Product) =>
  `/products/${c.slug}/${p.slug}`;
export const quoteUrl = (product?: string) =>
  product ? `/contact?product=${encodeURIComponent(product)}` : "/contact";
// Index of the block productSummary draws its text from, or -1 for the fallback.
export const summaryBlockIndex = (p: Product) => {
  const para = p.blocks.findIndex((b) => b.type === "paragraph" && b.text);
  return para !== -1
    ? para
    : p.blocks.findIndex((b) => b.type === "feature" && b.text);
};
export const productSummary = (p: Product) =>
  p.blocks[summaryBlockIndex(p)]?.text ||
  `Explore ${p.name} and request selection support from Vinayak Automation Products.`;
