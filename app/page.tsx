import { categories, site } from "@/lib/catalogue";
import { experienceYears } from "@/lib/experience";
import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  FlaskConical,
  Droplets,
  Utensils,
  Package,
  Cog,
  Boxes,
  FileText,
  ClipboardList,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Button, CategoryCard } from "@/components/ui";
import { ClientGrid } from "@/components/client-grid";
import { CareersForm } from "@/components/careers-form";
import { telHref } from "@/components/phone-numbers";
import { WhyVinayak } from "@/components/company-story";
import { metadata as seo } from "@/lib/seo";
export const revalidate = 3600;
// The layout's "%s | Vinayak Automation Products" template does not apply to a page
// in the layout's own segment, so the homepage must carry the brand itself. Without
// it, the one page people reach by searching the company name was the only page
// whose title did not contain it.
const homeTitle =
  "Vinayak Automation Products – Automation Supplier, Hyderabad";
export function generateMetadata() {
  const base = seo(
    homeTitle,
    `Industrial automation products and system integration in Hyderabad since 2007. Drives, PLCs, HMIs, encoders, sensors and conveyor safety switches from Vinayak (VAP).`,
    "/",
  );
  return {
    ...base,
    title: { absolute: homeTitle },
    openGraph: { ...base.openGraph, title: homeTitle },
    twitter: { ...base.twitter, title: homeTitle },
  };
}
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>
              Industrial Automation Products Supplier in{" "}
              <span>Hyderabad</span>
            </h1>
            <p>
              {experienceYears()}+ years supplying drives, PLCs, encoders,
              sensors and conveyor safety switches, with application support
              built around your requirement.
            </p>
            <div className="hero-actions">
              <Button href="/products">Explore products</Button>
              <Link href="/contact" className="plain-link">
                Discuss your requirement <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-note">
              SINCE 2007 · PRODUCT SUPPLY / SYSTEM INTEGRATION
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src="/media/control-panel-wiring.webp"
              alt="Open control panel with PLC modules, power supplies, network switches and labelled terminal wiring"
              fill
              sizes="(max-width: 800px) 100vw, 52vw"
              preload
              fetchPriority="high"
            />
            <div className="hero-image-caption">
              BUILT AROUND YOUR REQUIREMENT
            </div>
          </div>
        </div>
      </section>
      <ClientGrid />
      <section className="section" id="products">
        <div className="container">
          <div className="section-heading">
            <h2>Our offerings.</h2>
            <div className="heading-aside">
              <p>
                Drives, PLCs and HMIs, sensors, encoders, field instruments and
                motors from CG-Emotron, Renu, Jayashree, Sapcon, Endress+Hauser
                and Dynaflux.
              </p>
              <Link href="/products" className="text-link">
                Browse all products <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
          <div className="category-grid">
            {[
              categories[0],
              categories[1],
              categories[2],
              categories[3],
              categories[5],
              categories[8],
            ].map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i} />
            ))}
          </div>
          <div className="more-ranges">
            <span>Also in our portfolio</span>
            {[categories[4], categories[6], categories[7]].map((c) => (
              <Link href={"/products/" + c.slug} key={c.slug}>
                {c.name}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section industries-section">
        <div className="container">
          <h2>Applications across industries.</h2>
          <div className="industry-list">
            {[
              [Factory, "Cement & steel"],
              [FlaskConical, "Pharmaceuticals & chemicals"],
              [Droplets, "Water & pumping"],
              [Utensils, "Food & beverages"],
              [Package, "Packaging & material handling"],
              [Cog, "OEMs & machine builders"],
            ].map(([Icon, name]) => {
              const I = Icon as typeof Cog;
              return (
                <div key={String(name)}>
                  <I size={28} aria-hidden="true" />
                  <h3>{String(name)}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <WhyVinayak />
      <section className="section soft-section ceo-section">
        <div className="container ceo-grid">
          <Image
            src="/media/abhijeet-madnurkar.png"
            width={360}
            height={420}
            alt="Abhijeet Madnurkar, CEO of Vinayak Automation Products"
            className="ceo-photo"
          />
          <div>
            <h2>Abhijeet Madnurkar</h2>
            <p className="ceo-role">CEO - Vinayak Automation Products</p>
            <p>
              Abhijeet built VAP into a trusted industrial automation brand
              serving OEMs and factories across South India. His industry
              knowledge and longstanding relationships guide the company&apos;s
              approach to product selection, application support and practical
              automation solutions.
            </p>
            <Link href="/about" className="text-link">
              Explore the Vinayak story <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section requirement-section">
        <div className="container">
          <h2>Plan your requirement.</h2>
          <p className="requirement-intro">
            Since 2007, Vinayak Automation Products has supported industrial
            customers from Hyderabad with automation components,
            instrumentation, control panels, motors and system integration.
          </p>
          <ol className="requirement-cards">
            {[
              [
                Boxes,
                "Choose a component",
                [
                  "Drives & motors",
                  "Sensors & instruments",
                  "Control & power products",
                  "Control panels",
                ],
                "Start with the product category or model family.",
              ],
              [
                FileText,
                "Share your application",
                [
                  "Nameplate details",
                  "Supply voltage & power rating",
                  "What you need to detect or measure",
                  "Operating range, mounting & environment",
                  "PLC / HMI / SCADA / drive details",
                ],
                "For replacements, include the manufacturer and full model number.",
              ],
              [
                ClipboardList,
                "Request a quotation",
                [
                  "Product / project name",
                  "Quantity",
                  "Delivery location",
                  "Required timeline",
                  "Technical details available",
                ],
                "Confirm suitability, availability, pricing and delivery for your enquiry.",
              ],
            ].map(([Icon, title, items, note], i) => {
              const I = Icon as typeof Cog;
              return (
                <li key={String(title)}>
                  <div className="requirement-card-title">
                    <span>0{i + 1}</span>
                    <h3>{String(title)}</h3>
                  </div>
                  <I size={40} />
                  <ul>
                    {(items as string[]).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="requirement-note">{String(note)}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <section
        className="section careers-section"
        id="careers"
        aria-labelledby="careers-title"
      >
        <div className="container careers-grid">
          <div className="careers-copy">
            <h2 id="careers-title">
              We&apos;re hiring engineers in Hyderabad.
            </h2>
            <p>
              Vinayak Automation Products is looking for engineers, both
              freshers and experienced, to work with our team in Secunderabad,
              Hyderabad on automation products, application support and system
              integration.
            </p>
            <h3>Disciplines</h3>
            <ul className="careers-disciplines">
              {[
                "Mechanical",
                "Electrical",
                "Automation & PLC",
                "Robotics",
                "Instrumentation",
                "Sales & application engineering",
                "Other engineering disciplines",
              ].map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h3>Apply directly</h3>
            <p>
              Fill in the form, or email your CV to{" "}
              <a href={"mailto:" + site.email}>{site.email}</a>. You can also
              call us.
            </p>
            <div className="phone-groups">
              {site.phones
                .filter((g) => g.label === "Landlines" || g.label === "Sales")
                .map((group) => (
                  <div key={group.label}>
                    <span className="small-label">{group.label}</span>
                    <div className="phone-links">
                      {group.numbers.map((number) => (
                        <a key={number} href={telHref(number)}>
                          {number}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="form-panel">
            <h3 className="form-panel-title">Apply online</h3>
            <p>
              Fields marked optional can be left blank. Add a LinkedIn profile
              or a link to your CV if you have one.
            </p>
            <CareersForm />
          </div>
        </div>
      </section>
      <section className="requirement-contact">
        <div className="container">
          <h2>Have a product or automation requirement?</h2>
          <p>
            Talk to our team about product selection, replacement or system
            integration.
          </p>
          <Button href="/contact">Contact Vinayak</Button>
        </div>
      </section>
    </>
  );
}
