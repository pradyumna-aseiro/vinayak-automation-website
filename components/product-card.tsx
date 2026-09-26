import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Camera } from "lucide-react";

// Plain data for one product card. Kept small so a client component can
// receive a whole category of these without shipping the full catalogue.
export type CardItem = {
  slug: string;
  name: string;
  group: string;
  brand: string;
  category: string;
  href: string;
  image: string;
  summary: string;
  aliases: string[];
};

// Shown in place of a product photograph when no official manufacturer image
// exists. It fills the same image field, so cards and pages keep their height.
export function PhotoOnRequest({
  name,
  detail = false,
}: {
  name: string;
  detail?: boolean;
}) {
  return (
    <div
      className="photo-on-request"
      role="img"
      aria-label={`${name}: photo on request`}
    >
      <Camera size={detail ? 30 : 24} strokeWidth={1.5} aria-hidden="true" />
      <span className="small-label">Photo on request</span>
      {detail && (
        <span className="photo-on-request-note">
          Ask our team for images of this product.
        </span>
      )}
    </div>
  );
}

export function ProductCardView({ item }: { item: CardItem }) {
  return (
    <Link href={item.href} className="product-card" id={item.slug}>
      {item.aliases.map((id) => (
        <span id={id} key={id} className="anchor-target" />
      ))}
      <div className="product-card-image">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1000px) 38vw, 24vw"
          />
        ) : (
          <PhotoOnRequest name={item.name} />
        )}
      </div>
      <div className="product-card-copy">
        <span className="small-label">{item.group || item.brand}</span>
        <h3>{item.name}</h3>
        <p>{item.summary}</p>
        <span className="text-link">
          View details <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
