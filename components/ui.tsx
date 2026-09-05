import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  categories,
  site,
  quoteUrl,
  productUrl,
  productSummary,
  type Category,
  type Product,
} from "@/lib/catalogue";
import { jsonLd } from "@/lib/seo";
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button${secondary ? " button-secondary" : ""}`}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {all.map((x, i) => (
            <li key={i}>
              {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
              {x.href ? (
                <Link href={x.href}>{x.name}</Link>
              ) : (
                <span aria-current="page">{x.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: all.map((x, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: x.name,
              ...(x.href ? { item: site.url + x.href } : {}),
            })),
          }),
        }}
      />
    </>
  );
}
export function CategoryCard({
  category: c,
  index = 0,
}: {
  category: Category;
  index?: number;
}) {
  return (
    <Link href={`/products/${c.slug}`} className="category-card">
      <div className="category-image">
        <span className="card-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Image
          src={c.image}
          alt={c.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1000px) 45vw, 28vw"
        />
        <span className="card-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="category-copy">
        <span className="small-label">{c.brand}</span>
        <h3>{c.name}</h3>
        <p>{c.description}</p>
        <span className="text-link">
          Explore range <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}
export function ProductCard({
  category: c,
  product: p,
  aliases = [],
}: {
  category: Category;
  product: Product;
  aliases?: string[];
}) {
  return (
    <Link href={productUrl(c, p)} className="product-card" id={p.slug}>
      {aliases.map((id) => (
        <span id={id} key={id} className="anchor-target" />
      ))}
      <div className="product-card-image">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1000px) 38vw, 24vw"
        />
      </div>
      <div className="product-card-copy">
        <span className="small-label">{p.group || c.brand}</span>
        <h3>{p.name}</h3>
        <p>{productSummary(p)}</p>
        <span className="text-link">
          View details <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
export function EnquiryBanner() {
  return (
    <section className="enquiry-banner">
      <div className="container enquiry-inner">
        <div>
          <Eyebrow>LET’S TALK REQUIREMENTS</Eyebrow>
          <h2>
            A product in mind?
            <br />A process to improve?
          </h2>
          <p>Tell us what you need. We’ll help you take the next step.</p>
        </div>
        <Button href={quoteUrl()}>Discuss your requirement</Button>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <Image
                src="/images/vinayak-automation-products-logo-1.png"
                alt=""
                width={58}
                height={58}
              />
              <span>
                VINAYAK <span>AUTOMATION PRODUCTS</span>
              </span>
            </Link>
            <p>
              Industrial products.
              <br />
              Application-led integration.
              <br />
              Established in 2007.
            </p>
            <span className="location-tag">
              <span /> Hyderabad, India
            </span>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/about">About Vinayak</Link>
            <Link href="/products">All products</Link>
            <Link href="/about#integration">System integration</Link>
            <Link href="/contact">Contact us</Link>
          </div>
          <div>
            <h3>Product ranges</h3>
            {categories.slice(0, 5).map((c) => (
              <Link key={c.slug} href={"/products/" + c.slug}>
                {c.name}
              </Link>
            ))}
            <Link href="/products">
              View all ranges <ArrowUpRight size={13} />
            </Link>
          </div>
          <div>
            <h3>Get in touch</h3>
            <a href={"tel:" + site.tel}>
              <Phone size={15} />
              {site.phone}
            </a>
            <a href={"mailto:" + site.email}>
              <Mail size={15} />
              {site.email}
            </a>
            <p className="address">
              <MapPin size={17} />
              <span>{site.address}</span>
            </p>
            <p>Mon–Sat · 10:00–18:00</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Vinayak Automation Products</span>
          <span>Product supply & system integration</span>
        </div>
      </div>
    </footer>
  );
}
