// Privacy notice. Structure matches the owner-approved Aseiro Industries notice
// (/privacy on the Aseiro website, approved 2026-09-26); every statement here is specific to
// this codebase as of 26 September 2026. Sources for each section:
// - Who we are: lib/catalogue.ts (`site.name`, `site.address`, `site.email`).
// - Enquiry form: components/contact-form.tsx and lib/contact.mjs (fields, no
//   file input, emailed through Resend, nothing written to storage).
// - Job applications: components/careers-form.tsx, lib/careers.mjs and
//   lib/careers-options.mjs (fields, links only, no file upload, emailed through
//   Resend, nothing written to storage).
// - Abuse throttle: `rateLimit` in lib/contact.mjs and `careersRateLimit` in
//   lib/careers.mjs (per-IP count held in memory for ten minutes).
// - Analytics and cookies: app/layout.tsx, next.config.mjs and vercel.json load
//   no analytics or tracking script and set no cookies; fonts are self-hosted
//   (app/fonts). The Maps link on app/contact/page.tsx opens Google Maps only
//   when clicked.
// No retention period has been set; add one only when the owner has decided it.
import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui";
import { site } from "@/lib/catalogue";
import { metadata as seo } from "@/lib/seo";
export const metadata = seo(
  "Privacy notice",
  "What the Vinayak Automation Products website collects, where enquiry and job application details go, and how to ask for your details to be deleted.",
  "/privacy",
);
const mail = (
  <a href={"mailto:" + site.email} className="inline-link">
    {site.email}
  </a>
);
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="privacy-section">
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
}
export default function Privacy() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Privacy" }]} />
      <section className="page-hero">
        <h1>Privacy notice</h1>
        <p className="lead">
          What this website collects, where it goes and how to have it removed.
        </p>
      </section>
      <div className="privacy-body">
        <p className="privacy-updated">Last updated 26 September 2026</p>
        <Section id="who" title="Who we are">
          <p>
            This website is run by {site.name}, {site.address}, India.
          </p>
          <p>Questions about this notice: {mail}.</p>
        </Section>
        <Section id="enquiry" title="What the enquiry form collects">
          <p>
            When you send an enquiry from the{" "}
            <Link href="/contact" className="inline-link">
              contact page
            </Link>
            , the form sends:
          </p>
          <ul>
            <li>your name</li>
            <li>email address</li>
            <li>phone number</li>
            <li>
              the product or project, which may be filled in from the product
              page you came from
            </li>
            <li>the requirement you type</li>
          </ul>
          <p>The form has no file upload.</p>
        </Section>
        <Section id="careers" title="What the careers form collects">
          <p>
            When you apply through the{" "}
            <Link href="/#careers" className="inline-link">
              careers form
            </Link>{" "}
            on the home page, the form sends:
          </p>
          <ul>
            <li>full name</li>
            <li>email address</li>
            <li>phone number</li>
            <li>
              your discipline and whether you are a fresher or experienced
            </li>
            <li>years of experience, if you give them</li>
            <li>your current city, if you give it</li>
            <li>a LinkedIn or CV link, if you give one</li>
            <li>the note you write about yourself</li>
          </ul>
          <p>
            The form takes links, not files. If you email us a CV instead, it is
            held in our company mailbox.
          </p>
        </Section>
        <Section id="where" title="Where your details go">
          <p>
            Our web server checks the form and sends it as an email to our team
            through Resend, an email delivery service. The website does not
            store what you wrote; the email is held in our company mailbox,
            where our team reads it. Resend keeps a copy of sent messages for a
            limited period as part of its delivery service.
          </p>
          <p>
            To limit abuse, the server counts form submissions from each IP
            address in memory for ten minutes. This count is not saved.
          </p>
        </Section>
        <Section id="use" title="Why we use it">
          <p>
            To reply to your enquiry: to confirm the product, specifications,
            availability and terms, and to prepare a quotation. Job applications
            are used only to consider you for a role at {site.name} and to
            contact you about it.
          </p>
        </Section>
        <Section id="analytics" title="Analytics and cookies">
          <p>
            This website uses no analytics or tracking scripts and sets no
            cookies. Its fonts are served from this website. The &ldquo;Open in
            Maps&rdquo; link on the contact page opens Google Maps only if you
            click it.
          </p>
        </Section>
        <Section id="other" title="Phone, email and WhatsApp">
          <p>
            If you contact us by phone, email or WhatsApp instead, that
            conversation is handled by the provider you choose and by our team,
            and is used only to answer you.
          </p>
        </Section>
        <Section id="retention" title="How long we keep it">
          <p>
            Enquiry and application details are kept only as long as needed to
            respond and for ordinary business records.
          </p>
        </Section>
        <Section
          id="rights"
          title="Seeing, correcting or deleting your details"
        >
          <p>
            Email {mail} with the email address you used, and tell us whether
            you want a copy of your details, a correction, or for them to be
            deleted.
          </p>
        </Section>
      </div>
    </div>
  );
}
