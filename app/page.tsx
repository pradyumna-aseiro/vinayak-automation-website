import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Settings2,
  Network,
  LifeBuoy,
} from "lucide-react";
import { Button, CategoryCard, EnquiryBanner, Eyebrow } from "@/components/ui";
import { categories } from "@/lib/catalogue";
import { metadata as seo } from "@/lib/seo";
export const metadata = seo(
  "Industrial automation products & system integration",
  "Explore drives, PLCs, sensors, encoders, instruments and motors. Vinayak Automation Products supports product selection and system integration from Hyderabad.",
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
              The right products.
              <br />
              The power to
              <br />
              <span>move forward.</span>
            </h1>
            <p>
              From a single sensor to an integrated system. Automation products
              and application support to keep your industry moving.
            </p>
            <div className="hero-actions">
              <Button href="/products">Explore our products</Button>
              <Link href="/about" className="plain-link">
                Meet Vinayak <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="hero-note">
              <span className="tiny-cross">+</span> PRODUCT SUPPLY{" "}
              <span className="note-dot">/</span> SYSTEM INTEGRATION
            </div>
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
            <div className="image-corner">
              <span>BUILT AROUND YOUR APPLICATION</span>
              <ArrowUpRight size={26} />
            </div>
            <div className="hero-image-caption">
              <span>01 / INDUSTRIAL AUTOMATION</span>
              <span className="caption-line" />
            </div>
          </div>
        </div>
      </section>
      <section className="brand-strip">
        <div className="container brand-strip-inner">
          <span>
            PRODUCT RANGES
            <br />
            <strong>From established manufacturers</strong>
          </span>
          <div>
            <span>
              CG <b>Emotron</b>
            </span>
            <span>JAYASHREE</span>
            <span>
              RENU<span className="brand-sub">ELECTRONICS</span>
            </span>
            <span>Sapcon</span>
            <span>Dynaflux</span>
          </div>
        </div>
      </section>
      <section className="section" id="products">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>OUR PRODUCT PORTFOLIO</Eyebrow>
              <h2>
                Every component.
                <br />
                One connected partner.
              </h2>
            </div>
            <div className="heading-aside">
              <p>
                Discover the right hardware for your process, with support from
                selection through integration.
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
            ].map((c) => (
              <CategoryCard
                key={c.slug}
                category={c}
                index={categories.indexOf(c)}
              />
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
      <section className="integration-section">
        <div className="container integration-grid">
          <div className="integration-photo">
            <Image
              src="/media/workshop.webp"
              alt="Industrial production equipment inside a manufacturing workshop"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
            />
            <span className="photo-label">FROM REQUIREMENT TO REALITY</span>
          </div>
          <div className="integration-copy">
            <Eyebrow>MORE THAN PRODUCT SUPPLY</Eyebrow>
            <h2>
              Individual expertise.
              <br />
              Integrated thinking.
            </h2>
            <p>
              A drive, a sensor or a control panel is part of a bigger process.
              We bring the components and controls together around the way your
              machine needs to work.
            </p>
            <div className="service-lines">
              {[
                [
                  Settings2,
                  "Product selection",
                  "Match the product to the load, environment and application.",
                ],
                [
                  Network,
                  "System integration",
                  "Connect PLC, HMI, SCADA, drives and control panels.",
                ],
                [
                  LifeBuoy,
                  "Application support",
                  "Discuss implementation, commissioning and your existing setup.",
                ],
              ].map(([Icon, title, description]) => {
                const I = Icon as typeof Settings2;
                return (
                  <div key={String(title)}>
                    <I size={24} />
                    <div>
                      <h3>{String(title)}</h3>
                      <p>{String(description)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/about#integration" className="text-link">
              Explore our capabilities <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section industries-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>APPLICATIONS ACROSS INDUSTRY</Eyebrow>
              <h2>
                Different processes.
                <br />
                The same commitment.
              </h2>
            </div>
            <p className="heading-aside">
              Supporting industrial requirements across manufacturing, process
              plants and machine building.
            </p>
          </div>
          <div className="industry-list">
            {[
              "Cement & steel",
              "Pharmaceuticals & chemicals",
              "Water & pumping",
              "Food & beverages",
              "Packaging & material handling",
              "OEMs & machine builders",
            ].map((x, i) => (
              <div key={x}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{x}</h3>
                <span className="industry-plus">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container buying-guide">
          <Eyebrow>PLAN YOUR REQUIREMENT</Eyebrow>
          <h2>Industrial automation support from Hyderabad</h2>
          <p>
            Established in 2007, Vinayak Automation Products is based in West
            Marredpally, Secunderabad, Hyderabad. Our catalogue brings together
            drives and automation, control and power products, incremental
            encoders, conveyor safety switches, process control instruments,
            field instruments, control panels and AC/DC motors.
          </p>
          <h3>Choosing a component for your application</h3>
          <p>
            Start with the product category and review the individual model or
            family page. For a drive or motor enquiry, include the nameplate
            details, supply voltage, power rating and the machine it operates.
            For sensors and instruments, describe what you need to detect or
            measure, the operating range, mounting arrangement and environment.
            These details help us discuss a suitable selection without relying
            on the model name alone.
          </p>
          <h3>Replacing equipment or planning an integration</h3>
          <p>
            When replacing an existing component, mention its manufacturer, full
            model number and the controls it connects to. For a new system,
            describe the process, required inputs and outputs, and any PLC, HMI,
            SCADA or drive equipment already in use. You can explore our{" "}
            <Link href="/about#integration">
              system integration capabilities
            </Link>{" "}
            before sending your requirements.
          </p>
          <h3>What to include in a quotation request</h3>
          <p>
            Send the product or project name, quantity, delivery location and
            required timeline through our{" "}
            <Link href="/contact">contact form</Link>. Include the technical
            details you already have in the requirement field. Product
            suitability, availability, pricing and delivery should be confirmed
            for your enquiry; catalogue information is a starting point for that
            discussion.
          </p>
        </div>
      </section>
      <EnquiryBanner />
    </>
  );
}
