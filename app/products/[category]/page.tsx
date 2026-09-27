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
// Search titles name the products and the place buyers search for ("pull cord
// switch hyderabad"); the on-page headings keep the shorter category names.
const searchCopy: Record<string, { title: string; description: string }> = {
  "drives-and-automation": {
    title: "CG-Emotron AC Drives & Soft Starters, Hyderabad",
    description:
      "CG-Emotron AC drives, soft starters and control interfaces for pumps, fans, conveyors and process machines. Supplied from Hyderabad since 2007. Ask for a quote.",
  },
  "industrial-automation-solution": {
    title: "Renu PLCs, HMIs & Gateways, Hyderabad",
    description:
      "Renu PLCs, HMIs, industrial PCs and protocol gateways for machine control and system integration, supplied and supported from Hyderabad. Ask for a quote.",
  },
  "control-and-power-products": {
    title: "Proximity, Speed & Level Switches, Hyderabad",
    description:
      "Jayashree proximity switches, speed monitors, level sensors, tilt switches and motor-starting products for plants in Telangana. Ask Vinayak Automation for a quote.",
  },
  "incremental-encoders": {
    title: "Jayashree Incremental Encoders, Hyderabad",
    description:
      "Jayashree hollow-shaft and solid-shaft incremental encoders for position and speed feedback, including elevator and machine-tool types. Quotes from Hyderabad.",
  },
  "conveyor-safety-switches": {
    title: "Conveyor Safety Switches: Pull Cord & Belt Sway",
    description:
      "Pull cord (rope) switches, belt sway switches, belt monitoring units and heavy-duty limit switches for conveyors. Supplied from Hyderabad. Ask for a quote.",
  },
  "process-control-instruments": {
    title: "Sapcon Level Switches & Transmitters, Hyderabad",
    description:
      "Sapcon level switches, level transmitters and indicators for liquids, powders and bulk solids, plus flow and speed monitoring. Quotes from Vinayak Automation, Hyderabad.",
  },
  "field-instruments": {
    title: "Endress+Hauser Field Instruments, Hyderabad",
    description:
      "Endress+Hauser level, flow, pressure, temperature and liquid analysis instruments for process plants, with selection support from Vinayak Automation, Hyderabad.",
  },
  "control-panels": {
    title: "VFD & PLC Control Panels, Hyderabad",
    description:
      "VFD and PLC control panels built around your machine and process, with drives, PLCs and HMIs from the ranges we supply. Discuss your panel with our Hyderabad team.",
  },
  "ac-dc-motors": {
    title: "AC, DC & BLDC Motors and Gear Motors, Hyderabad",
    description:
      "Dynaflux AC, PMDC and BLDC motors, geared motors and DC drives, plus CG Power and Hindustan LT motors. Supplied from Hyderabad since 2007. Ask for a quote.",
  },
  gearboxes: {
    title: "Worm & Helical Gearboxes, Hyderabad",
    description:
      "Transtech and Bonfiglioli worm, heli-worm, double worm and in-line helical gearboxes and gear motors, supplied from Hyderabad. Ask Vinayak Automation for a quote.",
  },
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = categories.find((c) => c.slug === category);
  if (!c) return {};
  const local = searchCopy[c.slug];
  return seo(
    local?.title ?? c.name,
    local?.description ?? c.description,
    `/products/${c.slug}`,
    c.image,
  );
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
            <Eyebrow brand>{c.brand}</Eyebrow>
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
            <h2>Products & families</h2>
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
