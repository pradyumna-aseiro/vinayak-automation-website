import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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

export function ProductCardView({ item }: { item: CardItem }) {
  return (
    <Link href={item.href} className="product-card" id={item.slug}>
      {item.aliases.map((id) => (
        <span id={id} key={id} className="anchor-target" />
      ))}
      <div className="product-card-image">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1000px) 38vw, 24vw"
        />
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
