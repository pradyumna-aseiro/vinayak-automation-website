import type { Metadata } from "next";
import localFont from "next/font/local";
const manrope = localFont({
  src: "./fonts/manrope.woff2",
  variable: "--font-display",
  display: "swap",
});
const inter = localFont({
  src: "./fonts/inter.woff2",
  variable: "--font-body",
  display: "swap",
});
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/ui";
import { site } from "@/lib/catalogue";
import { jsonLd } from "@/lib/seo";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: "%s | Vinayak Automation Products" },
  description:
    "Industrial automation products and system integration from Hyderabad. Drives, PLCs, encoders, instruments, control panels and motors. Established in 2007.",
  robots:
    process.env.VERCEL_ENV === "preview"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": site.url + "/#business",
              name: site.name,
              url: site.url,
              logo: site.url + "/images/vinayak-automation-products-logo-1.png",
              foundingDate: "2007",
              email: site.email,
              telephone: site.tel,
              contactPoint: site.phones.flatMap((group) =>
                group.numbers.map((number) => ({
                  "@type": "ContactPoint",
                  contactType: "sales",
                  telephone: (number.startsWith("040")
                    ? "+91" + number.slice(1)
                    : number
                  ).replace(/[^+0-9]/g, ""),
                })),
              ),
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "10:00",
                closes: "18:00",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "No. 10-2-2/10, Meghana East End Apartment, West Marredpally",
                addressLocality: "Secunderabad",
                addressRegion: "Telangana",
                postalCode: "500026",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
