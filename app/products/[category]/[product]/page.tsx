import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowLeft } from "lucide-react";
import {
  Breadcrumbs,
  Button,
  Eyebrow,
  ProductCard,
  EnquiryBanner,
} from "@/components/ui";
import { PhotoOnRequest } from "@/components/product-card";
import {
  categories,
  productBrand,
  productUrl,
  productSummary,
  summaryBlockIndex,
  quoteUrl,
  site,
} from "@/lib/catalogue";
import { metadata as seo, jsonLd } from "@/lib/seo";
export function generateStaticParams() {
  return categories.flatMap((c) =>
    c.products.map((p) => ({ category: c.slug, product: p.slug })),
  );
}
export const dynamicParams = false;
// Name, then the summary cut at a word boundary, then who quotes it. Slicing the
// joined string at 160 characters left descriptions ending mid-word ("Belt S").
const QUOTE_LINE = " Quotes from Hyderabad.";
function searchDescription(name: string, group: string | undefined, summary: string) {
  const lead = group && !name.toLowerCase().includes(group.toLowerCase()) ? `${name} (${group}): ` : `${name}: `;
  const room = Math.max(158 - lead.length - QUOTE_LINE.length, 40);
  let text = summary.replace(/\s+/g, " ").trim();
  if (text.length > room) {
    const cut = text.slice(0, room - 1);
    text = cut.slice(0, Math.max(cut.lastIndexOf(" "), 0)).replace(/[\s,;:.\-–]+$/, "") + "…";
  } else if (!/[.!?]$/.test(text)) text += ".";
  return lead + text + QUOTE_LINE;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product } = await params;
  const c = categories.find((c) => c.slug === category);
  const p = c?.products.find((p) => p.slug === product);
  if (!c || !p) return {};
  return seo(
    c.slug === "field-instruments" ? `${p.name} · ${p.group}` : p.name,
    searchDescription(p.name, p.group, productSummary(p)),
    productUrl(c, p),
    p.image || undefined,
  );
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product } = await params;
  const c = categories.find((c) => c.slug === category);
  const p = c?.products.find((p) => p.slug === product);
  if (!c || !p) notFound();
  const brand = productBrand(c, p);
  const related = c.products.filter((x) => x.slug !== p.slug).slice(0, 3);
  // The lead paragraph already shows the summary, which is taken from one of the
  // blocks. Skip that block below so the same text is not printed twice.
  const summaryIndex = summaryBlockIndex(p);
  const blocks = p.blocks.filter((_, i) => i !== summaryIndex);
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            { name: "Products", href: "/products" },
            { name: c.name, href: "/products/" + c.slug },
            { name: p.name },
          ]}
        />
        <section className="product-detail-hero">
          <div className="product-detail-image">
            {p.image ? (
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 800px) 90vw, 42vw"
                preload
                fetchPriority="high"
              />
            ) : (
              <PhotoOnRequest name={p.name} detail />
            )}
          </div>
          <div className="product-detail-intro">
            <Eyebrow brand>{brand}</Eyebrow>
            <h1>{p.name}</h1>
            <p className="lead">{productSummary(p)}</p>
            <div className="product-actions">
              <Button href={quoteUrl(p.name)}>Request a quotation</Button>
              <a className="plain-link" href={"tel:" + site.tel}>
                <Phone size={16} /> Talk to our team
              </a>
            </div>
            <p className="product-note">
              Price, availability and exact configuration are confirmed with
              your quotation.
            </p>
          </div>
        </section>
        <section className="product-information">
          <div className="spec-content">
            <h2>Features & specifications</h2>
            {blocks.length ? (
              blocks.map((b, i) =>
                b.type === "table" ? (
                  <div className="table-scroll" key={i}>
                    <table>
                      <caption>{p.name} specifications</caption>
                      <tbody>
                        {b.rows?.map((r, j) => (
                          <tr key={j}>
                            {r.map((v, k) =>
                              k === 0 ? (
                                <th scope="row" key={k}>
                                  {v}
                                </th>
                              ) : (
                                <td key={k}>{v}</td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : b.type === "heading" ? (
                  <h3 key={i}>{b.text}</h3>
                ) : b.type === "feature" ? (
                  <div className="spec-line" key={i}>
                    <span aria-hidden="true">↳</span>
                    <p>{b.text}</p>
                  </div>
                ) : (
                  <p key={i}>{b.text}</p>
                ),
              )
            ) : (
              <p>
                Share your required range, installation details and output type
                with our team for product selection and specifications.
              </p>
            )}
            {p.models?.length ? (
              <div className="spec-line">
                <span aria-hidden="true">↳</span>
                <p>Models : {p.models.join(", ")}</p>
              </div>
            ) : null}
            <p className="spec-note">
              Ratings and options can vary by model. Confirm the selected
              configuration and current manufacturer documentation before
              ordering.
            </p>
          </div>
          <aside className="quote-aside">
            <Eyebrow>Selection support</Eyebrow>
            <h3>
              Put the details
              <br />
              in our hands.
            </h3>
            <p>
              Include your model, quantity and delivery city. For selection
              help, tell us:
            </p>
            <ul>
              {c.selection.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <Button href={quoteUrl(p.name)}>Enquire about this product</Button>
          </aside>
        </section>
        {related.length > 0 && (
          <section className="related-section">
            <div className="section-heading">
              <h2>Explore this range</h2>
              <Link href={"/products/" + c.slug} className="text-link">
                <ArrowLeft size={16} />
                All {c.name.toLowerCase()}
              </Link>
            </div>
            <div className="product-grid">
              {related.map((x) => (
                <ProductCard key={x.slug} category={c} product={x} />
              ))}
            </div>
          </section>
        )}
      </div>
      <EnquiryBanner
        title={"Ready to discuss " + p.name + "?"}
        description="Confirm the model, quantity and delivery location with our team. We will help with selection and the next steps."
        product={p.name}
        buttonLabel="Enquire about this product"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: productSummary(p),
            ...(p.image ? { image: site.url + p.image } : {}),
            url: site.url + productUrl(c, p),
            category: c.name,
            ...(brand !== "System integration"
              ? { brand: { "@type": "Brand", name: brand } }
              : {}),
          }),
        }}
      />
    </>
  );
}
