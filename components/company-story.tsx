import { experienceYears } from "@/lib/experience";
import {
  Users,
  BadgeIndianRupee,
  Boxes,
  Clock,
  Megaphone,
  Award,
  Puzzle,
  Coins,
  Wrench,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
export function WhyVinayak() {
  return (
    <section className="section experience-band">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>WHY US</Eyebrow>
            <h2>Us and our experience.</h2>
          </div>
          <p className="heading-aside">
            Trusted by 5,000+ clients, we blend technology and expertise to
            drive innovation, efficiency, and growth across industries.
          </p>
        </div>
        <div className="vap-highlights">
          {[
            [Users, "5,000+", "Satisfied clients"],
            [BadgeIndianRupee, "Economical", "Prices"],
            [Boxes, "350+", "Products"],
            [Clock, `${experienceYears()}+ years`, "Of experience"],
          ].map(([Icon, value, label]) => {
            const I = Icon as typeof Users;
            return (
              <article key={String(label)}>
                <I size={28} />
                <strong>{String(value)}</strong>
                <span>{String(label)}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function CompanyTimeline() {
  return (
    <section className="section">
      <div className="container">
        <Eyebrow>OUR JOURNEY</Eyebrow>
        <h2>Growing with industry since 2007.</h2>
        <ol className="vap-timeline">
          {[
            ["2007", "VAP was founded."],
            ["2012", "Reached our first 5,000 clients."],
            ["2015", "Partnered with Endress+Hauser."],
            ["2017", "Reached 10,000+ clients."],
            ["2023", "Team grew to 15+ employees."],
            ["2026", "Team grows to 20 employees."],
          ].map(([year, text]) => (
            <li key={year}>
              <time dateTime={year}>{year}</time>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function PartnerWithUs() {
  return (
    <section className="section vap-partnership" id="partnership">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>WHY PARTNER WITH US</Eyebrow>
            <h2>Why partner with us.</h2>
          </div>
          <p className="heading-aside">
            Collaborate with us to accelerate digital transformation in
            manufacturing worldwide. Empower your clients with automation
            products and solutions developed to enhance precision, efficiency,
            and innovation across industries.
          </p>
        </div>
        <div className="vap-partner-grid">
          {[
            [
              Megaphone,
              "Collaborative marketing",
              "Connect your offering with shared opportunities and joint marketing initiatives.",
            ],
            [
              Award,
              "Industry expertise",
              "Bring application knowledge and product experience into your projects.",
            ],
            [
              Puzzle,
              "Seamless integration",
              "Connect products and controls around the requirements of your process.",
            ],
            [
              Coins,
              "Preferential pricing",
              "Discuss commercial terms tailored to your partnership and project scope.",
            ],
            [
              Wrench,
              "Dedicated technical support",
              "Work with a team that supports product selection and implementation.",
            ],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Users;
            return (
              <article key={String(title)}>
                <I size={26} />
                <h3>{String(title)}</h3>
                <p>{String(text)}</p>
              </article>
            );
          })}
        </div>
        <Button href="/contact?product=Partnership%20enquiry">
          Discuss a partnership
        </Button>
      </div>
    </section>
  );
}
