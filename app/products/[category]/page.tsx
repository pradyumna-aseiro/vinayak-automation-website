import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumbs,
  Button,
  Eyebrow,
  EnquiryBanner,
} from "@/components/ui";
import { aliasesFor, cardItem, categories, quoteUrl } from "@/lib/catalogue";
import { CategoryFinder } from "@/components/part-finder";
import { metadata as seo } from "@/lib/seo";
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = categories.find((c) => c.slug === category);
  if (!c) return {};
  return seo(c.name, c.description, `/products/${c.slug}`, c.image);
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = categories.find((c) => c.slug === category);
  if (!c) notFound();
  const groups = [...new Set(c.products.map((p) => p.group).filter(Boolean))];
  const aliases = aliasesFor(c);
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[{ name: "Products", href: "/products" }, { name: c.name }]}
        />
        <section className="category-hero">
          <div>
            <Eyebrow>{c.brand.toUpperCase()}</Eyebrow>
            <h1>{c.name}</h1>
            <p className="category-headline">{c.headline}</p>
            <p className="lead">{c.description}</p>
            <Button href={quoteUrl(c.name)}>Ask about this range</Button>
          </div>
          <div className="category-hero-image">
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="(max-width: 800px) 90vw, 38vw"
              preload
              fetchPriority="high"
            />
            <span className="small-label">
              PRODUCT SELECTION & APPLICATION SUPPORT
            </span>
          </div>
        </section>
        <nav className="category-switcher" aria-label="Product categories">
          {categories.map((x) => (
            <Link
              key={x.slug}
              href={"/products/" + x.slug}
              aria-current={x.slug === c.slug ? "page" : undefined}
            >
              {x.name}
            </Link>
          ))}
        </nav>
        <section className="range-section">
          <div className="range-heading">
            <div>
              <Eyebrow>EXPLORE THE RANGE</Eyebrow>
              <h2>Products & families</h2>
            </div>
            <span className="range-count">
              {c.products.length}{" "}
              {c.products.length === 1 ? "listing" : "listings"}
            </span>
          </div>
          <CategoryFinder
            items={c.products.map((p) => cardItem(c, p, aliases(p)))}
            groups={groups}
            categoryName={c.name}
          />
        </section>
      </div>
      <EnquiryBanner
        title={
          "Find the right " + c.name.toLowerCase() + " for your application."
        }
        description="For a useful quotation, include the model and quantity if known, plus:"
        points={c.selection}
        product={c.name}
        buttonLabel="Request selection support"
      />
    </>
  );
}
