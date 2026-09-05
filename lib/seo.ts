import type { Metadata } from "next";
import { site } from "./catalogue";
export function metadata(
  title: string,
  description: string,
  path: string,
  image = "/media/social.jpg",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: site.url + path,
      siteName: site.name,
      type: "website",
      locale: "en_IN",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
