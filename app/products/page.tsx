import {
  Breadcrumbs,
  CategoryCard,
  EnquiryBanner,
  Eyebrow,
} from "@/components/ui";
import { categories } from "@/lib/catalogue";
import { metadata as seo } from "@/lib/seo";
export const metadata = seo(
  "Industrial product catalogue",
  "Browse all nine Vinayak product ranges: drives, PLCs, sensors, encoders, conveyor safety switches, process and field instruments, panels and motors.",
  "/products",
);
export default function Products() {
  return (
    <>
      <div className="container">
        <Breadcrumbs items={[{ name: "Products" }]} />
        <section className="page-hero">
          <Eyebrow>THE PRODUCT PORTFOLIO</Eyebrow>
          <h1>
            Find your next
            <br />
            <span>building block.</span>
          </h1>
          <p className="lead">
            Explore our automation ranges. Start with the product you know, or
            speak to us about the application.
          </p>
        </section>
        <div className="catalogue-caption">
          <span>09 PRODUCT CATEGORIES</span>
          <span>SELECTION · SUPPLY · INTEGRATION</span>
        </div>
        <div className="category-grid catalogue-grid">
          {categories.map((c, i) => (
            <CategoryCard key={c.slug} category={c} index={i} />
          ))}
        </div>
      </div>
      <EnquiryBanner />
    </>
  );
}
