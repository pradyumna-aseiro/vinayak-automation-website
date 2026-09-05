import Image from "next/image";
import { Breadcrumbs, Button, EnquiryBanner, Eyebrow } from "@/components/ui";
import { metadata as seo } from "@/lib/seo";
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
          <Eyebrow>ABOUT VINAYAK</Eyebrow>
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
            <Eyebrow>OUR STORY</Eyebrow>
            <h2>
              A practical partner
              <br />
              for industrial progress.
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
      <EnquiryBanner />
    </>
  );
}
