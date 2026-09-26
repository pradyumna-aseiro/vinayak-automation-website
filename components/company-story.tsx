import { experienceYears } from "@/lib/experience";
import {
  Users,
  LayoutGrid,
  Boxes,
  Clock,
} from "lucide-react";
export function WhyVinayak() {
  return (
    <section className="section experience-band">
      <div className="container">
        <div className="section-heading">
          <h2>Since 2007, in numbers.</h2>
          <p className="heading-aside">
            More than 10,000 clients, supplied and supported from our office in
            Secunderabad, Hyderabad.
          </p>
        </div>
        <div className="vap-highlights">
          {[
            [Users, "10,000+", "Satisfied clients"],
            [LayoutGrid, "9", "Product ranges"],
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
