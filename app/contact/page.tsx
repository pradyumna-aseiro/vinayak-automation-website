import { PhoneNumbers } from "@/components/phone-numbers";
import { Breadcrumbs } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/catalogue";
import { metadata as seo } from "@/lib/seo";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
export const metadata = seo(
  "Contact & request a quotation",
  "Contact Vinayak Automation Products in Hyderabad for product quotations and system integration. Call 040-27804951 or send your requirements.",
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const query = await searchParams;
  const product =
    typeof query.product === "string" ? query.product.slice(0, 200) : "";
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Contact" }]} />
      <section className="page-hero">
        <h1>
          Ask our Hyderabad team
          <br />
          for a quotation.
        </h1>
        <p className="lead">
          A product enquiry, a replacement or a new integration project. Tell us
          what you’re working on.
        </p>
      </section>
      <div className="contact-grid">
        <section className="contact-details">
          <h2>Let’s get in touch.</h2>
          <div className="contact-item">
            <Phone size={21} />
            <div>
              <PhoneNumbers />
            </div>
          </div>
          <div className="contact-item">
            <Mail size={21} />
            <div>
              <span className="small-label">Email us</span>
              <a href={"mailto:" + site.email}>{site.email}</a>
            </div>
          </div>
          <div className="contact-item">
            <MapPin size={21} />
            <div>
              <span className="small-label">Find us</span>
              <address>{site.address}</address>
              <a
                href={
                  "https://www.google.com/maps/search/?api=1&query=" +
                  encodeURIComponent(site.address)
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Open in Maps <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="office-hours">
            <span className="small-label">Office hours</span>
            <p>
              Monday–Saturday
              <br />
              10:00–18:00 IST
            </p>
          </div>
        </section>
        <section className="form-panel" aria-labelledby="form-title">
          <h2 id="form-title">How can we help?</h2>
          <p>
            All fields are required. Include the model, quantity and delivery
            location where possible.
          </p>
          <ContactForm initialProduct={product} />
        </section>
      </div>
    </div>
  );
}
