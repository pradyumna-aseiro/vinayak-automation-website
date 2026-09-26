import { CompanyTimeline, WhyVinayak } from "@/components/company-story";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs, Button, EnquiryBanner, Eyebrow } from "@/components/ui";
import { metadata as seo } from "@/lib/seo";
export const revalidate = 3600;
export const metadata = seo(
  "About Vinayak · Established in 2007",
  "Meet Vinayak Automation Products, Hyderabad. Product supply and custom factory automation with PLC, HMI, SCADA, VFD, sensors and control panels since 2007.",
  "/about",
);
export default function About() {
  return (
    <>
      <div className="container">
        <Breadcrumbs items={[{ name: "About us" }]} />
      </div>
      <section className="page-hero container about-hero">
        <div>
          <h1>
            Experience that
            <br />
            connects the dots.
          </h1>
          <p className="lead">
            Automation starts with understanding the application. That has been
            our approach since 2007.
          </p>
        </div>
        <div className="year-block">
          <span>ESTABLISHED</span>
          <strong>2007</strong>
          <span>HYDERABAD, INDIA</span>
        </div>
      </section>
      <div className="container">
        <div className="about-image">
          <Image
            src="/media/workshop.webp"
            alt="A modern industrial workshop with integrated production equipment"
            fill
            sizes="95vw"
            preload
            fetchPriority="high"
          />
          <span className="photo-label">PRODUCTS. PEOPLE. PROCESS.</span>
        </div>
      </div>
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <h2>
              From three brands
              <br />
              to nine product ranges.
            </h2>
          </div>
          <div className="editorial-copy">
            <p>
              Vinayak Automation Products was established in 2007, supplying
              Jayashree products, CG-Emotron drives and Dynaflux AC and DC
              motors.
            </p>
            <p>
              Today, our portfolio spans automation controls, sensors, level and
              flow measurement, encoders, conveyor safety switches, motors and
              control panels. We support both individual product requirements
              and integrated industrial projects.
            </p>
            <p>
              Based in Secunderabad, Hyderabad, we work with OEMs and industrial
              end users to understand the requirement, select suitable
              components and connect them into a working solution.
            </p>
          </div>
        </div>
      </section>
      <CompanyTimeline />
      <WhyVinayak />
      <section className="soft-section section" id="integration">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>SYSTEM INTEGRATION</Eyebrow>
              <h2>Build around the process.</h2>
            </div>
            <p className="heading-aside">
              From a defined component requirement to a turnkey automation
              scope, start with what your machine needs to do.
            </p>
          </div>
          <div className="capability-grid">
            {[
              [
                "01",
                "Machine & process control",
                "PLC, HMI and SCADA integration for machine sequences, operator interfaces and process monitoring.",
              ],
              [
                "02",
                "Drives & motion",
                "VFDs, servo motors and drives selected around motor ratings, speed control and application duty.",
              ],
              [
                "03",
                "Panels & instrumentation",
                "Control panel integration and instrument selection for the operating environment and measurement requirements.",
              ],
            ].map(([number, title, text]) => (
              <article key={number}>
                <span className="small-label">{number} / CAPABILITY</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="section-end">
            <Button href="/contact?product=System%20integration">
              Discuss an integration project
            </Button>
          </div>
        </div>
      </section>
      <section className="section" id="sister-company">
        <div className="container editorial-grid">
          <div>
            <Eyebrow>SISTER COMPANY</Eyebrow>
            <h2>Aseiro Industries.</h2>
          </div>
          <div className="sister-company">
            <a
              href="https://www.aseiro.com/"
              target="_blank"
              rel="noopener"
              aria-label="Aseiro Industries website (opens in a new tab)"
            >
              <Image
                src="/media/clients/aseiro.png"
                width={200}
                height={80}
                alt="Aseiro Industries logo"
              />
            </a>
            <p>
              For machine vision inspection, robotics, factory safety systems
              and turnkey process automation, work with our sister company{" "}
              <a href="https://www.aseiro.com/" target="_blank" rel="noopener">
                Aseiro Industries
              </a>
              . Aseiro builds on Vinayak&apos;s product and integration
              experience, adding vision systems and robotics from Hyderabad and
              Sheffield.
            </p>
            <p>
              <a
                href="https://www.aseiro.com/solutions/machine-vision"
                target="_blank"
                rel="noopener"
                className="sister-link"
              >
                Machine vision systems <ArrowUpRight size={13} />
              </a>
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <Eyebrow>HOW WE WORK</Eyebrow>
            <h2>
              Clear requirements.
              <br />
              Considered solutions.
            </h2>
          </div>
          <div className="steps">
            {[
              [
                "Understand",
                "Share the machine, process conditions and outcome you need.",
              ],
              [
                "Select",
                "Review the relevant products, ratings, interfaces and installation constraints.",
              ],
              [
                "Integrate",
                "Agree the supply and integration scope, delivery requirements and commissioning support.",
              ],
            ].map(([title, text], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EnquiryBanner
        title="Build your next project with Vinayak."
        description="Bring us your application, existing equipment and project goals. Our team will help define the product and integration requirements."
        product="System integration"
        buttonLabel="Discuss your project"
      />
    </>
  );
}
