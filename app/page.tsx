import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  FlaskConical,
  Droplets,
  Utensils,
  Package,
  Cog,
  Settings2,
  Network,
  Wrench,
  Boxes,
  FileText,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import { ClientCarousel } from "@/components/client-carousel";
import { WhyVinayak, PartnerWithUs } from "@/components/company-story";
import { metadata as seo } from "@/lib/seo";
export const metadata = seo(
  "Industrial automation products & system integration",
  "Industrial automation products and application support backed by 18+ years of experience. Explore drives, controls, instruments and motors from Vinayak.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>INDUSTRIAL AUTOMATION · SINCE 2007</Eyebrow>
            <h1>
              Automation products.
              <br />
              <span>Application support.</span>
            </h1>
            <p>
              Industrial automation products and application support backed by
              18+ years of experience. Built around your requirement.
            </p>
            <div className="hero-actions">
              <Button href="/products">Explore products</Button>
              <Link href="/contact" className="plain-link">
                Discuss your requirement <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-note">PRODUCT SUPPLY / SYSTEM INTEGRATION</div>
          </div>
          <div className="hero-visual">
            <Image
              src="/media/factory.webp"
              alt="Automated equipment on a modern factory production floor"
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
      <ClientCarousel />
      <section className="section" id="products">
        <div className="container">
          <Eyebrow>PRODUCTS & SERVICES</Eyebrow>
          <h2>Our offerings.</h2>
          <div className="offering-columns">
            <article>
              <Boxes size={30} />
              <h3>Products</h3>
              <p>Choose the components your application needs.</p>
              <ul>
                {[
                  ["Drives & automation", "drives-and-automation"],
                  ["PLC / HMI", "industrial-automation-solution"],
                  ["Sensors & instruments", "field-instruments"],
                  ["Motors", "ac-dc-motors"],
                  ["Encoders", "incremental-encoders"],
                  ["Control & power products", "control-and-power-products"],
                ].map(([name, path]) => (
                  <li key={path}>
                    <Link href={"/products/" + path}>
                      {name}
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
              <Button href="/products">Explore all products</Button>
            </article>
            <article>
              <Wrench size={30} />
              <h3>Services</h3>
              <p>Connect product selection with a working solution.</p>
              <ul>
                {[
                  "Product selection",
                  "Application support",
                  "System integration",
                  "Control panels",
                  "Commissioning support",
                ].map((name) => (
                  <li key={name}>
                    <Link href="/about#integration">
                      {name}
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
              <Button href="/about#integration">Our capabilities</Button>
            </article>
          </div>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <Eyebrow>SELECT · INTEGRATE · SUPPORT</Eyebrow>
          <h2>Your 360° application support.</h2>
          <div className="support-steps">
            {[
              [
                Settings2,
                "Select",
                "Match the product to the load, environment and application.",
              ],
              [
                Network,
                "Integrate",
                "Connect controls, drives and instrumentation around your process.",
              ],
              [
                Wrench,
                "Support",
                "Discuss implementation, commissioning and your existing setup.",
              ],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Cog;
              return (
                <article key={String(title)}>
                  <I size={32} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section industries-section">
        <div className="container">
          <Eyebrow>WHERE WE WORK</Eyebrow>
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
      <section className="section requirement-section">
        <div className="container">
          <Eyebrow>INDUSTRIAL AUTOMATION SUPPORT FROM HYDERABAD</Eyebrow>
          <h2>Plan your requirement.</h2>
          <p className="requirement-intro">
            Since 2007, Vinayak Automation Products has supported industrial
            customers with automation components, instrumentation, control
            panels, motors and system integration.
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
          <div className="new-system">
            <strong>Planning a new system?</strong>
            <p>
              Describe the process, required inputs and outputs, and any
              equipment already in use.
            </p>
          </div>
          <Button href="/contact">Send your requirement</Button>
        </div>
      </section>
      <PartnerWithUs />
      <section className="section final-contact">
        <div className="container">
          <Eyebrow>CONTACT VINAYAK</Eyebrow>
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
