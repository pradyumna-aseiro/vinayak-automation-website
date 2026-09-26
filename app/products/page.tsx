import {
  Breadcrumbs,
  CategoryCard,
  EnquiryBanner,
} from "@/components/ui";
import { cardItem, categories } from "@/lib/catalogue";
import { CatalogueFinder } from "@/components/part-finder";
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
          <span>09 product categories</span>
          <span>Selection · supply · integration</span>
        </div>
        <CatalogueFinder
          items={categories.flatMap((c) => c.products.map((p) => cardItem(c, p)))}
        >
          <h2 className="sr-only">Product categories</h2>
          <div className="category-grid catalogue-grid">
            {categories.map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i} />
            ))}
          </div>
        </CatalogueFinder>
      </div>
      <EnquiryBanner
        title="Need help choosing the right product?"
        description="Share the model, application and quantity. We can help you narrow down the options."
        buttonLabel="Get selection support"
      />
    </>
  );
}
