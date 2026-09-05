import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Breadcrumbs,
  Button,
  Eyebrow,
  ProductCard,
  EnquiryBanner,
} from "@/components/ui";
import { categories, quoteUrl } from "@/lib/catalogue";
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
  const aliasOwners: Record<string, string> = {};
  for (const p of c.products)
    for (const id of p.legacyIds) aliasOwners[id] ??= p.slug;
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
          {groups.length > 1 && (
            <div className="group-links">
              {groups.map((g) => (
                <a
                  key={g}
                  href={"#group-" + g.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                >
                  {g}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          )}
          {groups.length > 1 ? (
            groups.map((g) => (
              <section
                key={g}
                className="product-group"
                id={"group-" + g.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              >
                <h3 className="group-title">{g}</h3>
                <div className="product-grid">
                  {c.products
                    .filter((p) => p.group === g)
                    .map((p) => (
                      <ProductCard
                        key={p.slug}
                        category={c}
                        product={p}
                        aliases={p.legacyIds.filter(
                          (id) => aliasOwners[id] === p.slug && id !== p.slug,
                        )}
                      />
                    ))}
                </div>
              </section>
            ))
          ) : (
            <div className="product-grid">
              {c.products.map((p) => (
                <ProductCard
                  key={p.slug}
                  category={c}
                  product={p}
                  aliases={p.legacyIds.filter(
                    (id) => aliasOwners[id] === p.slug && id !== p.slug,
                  )}
                />
              ))}
            </div>
          )}
        </section>
        <section className="selection-panel">
          <div>
            <Eyebrow>GET THE RIGHT SELECTION</Eyebrow>
            <h2>
              Tell us about
              <br />
              your application.
            </h2>
          </div>
          <div>
            <p>
              For a useful quotation, include the model and quantity if known,
              plus:
            </p>
            <ul>
              {c.selection.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <Button href={quoteUrl(c.name)}>Request selection support</Button>
          </div>
        </section>
      </div>
      <EnquiryBanner />
    </>
  );
}
