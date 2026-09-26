"use client";
import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { ProductCardView, type CardItem } from "@/components/product-card";

const groupId = (g: string) =>
  "group-" + g.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const compact = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

// A product matches when every word typed appears in its name, group, brand,
// category or model codes. Model numbers also match with spaces and dashes ignored, so
// "vfx 48" and "VFX-48" both find "VFX48".
function matches(item: CardItem, query: string) {
  const text = [
    item.name,
    item.group,
    item.brand,
    item.category,
    ...item.models,
  ]
    .join(" ")
    .toLowerCase();
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.every((w) => text.includes(w))) return true;
  const q = compact(query);
  return q.length > 1 && compact(text).includes(q);
}

function useDebounced(value: string, ms: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

function FinderField({
  query,
  setQuery,
  label,
  placeholder,
  status,
}: {
  query: string;
  setQuery: (q: string) => void;
  label: string;
  placeholder: string;
  status: string;
}) {
  const id = useId();
  return (
    <div className="finder" role="search">
      <label htmlFor={id} className="finder-label">
        {label}
      </label>
      <div className="finder-input">
        <Search size={18} aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setQuery("");
          }}
        />
        {query && (
          <button
            type="button"
            className="finder-clear"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <p className="finder-status" aria-live="polite" aria-atomic="true">
        {status}
      </p>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="finder-empty">
      <h3>No listed product matches “{query}”.</h3>
      <p>
        Send us the model or part number and our team will confirm whether we
        can supply it.
      </p>
      <Link
        className="button"
        href={"/contact?product=" + encodeURIComponent(query.slice(0, 200))}
      >
        Request a quote for “{query}”
        <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}

const countLabel = (n: number) => `${n} ${n === 1 ? "product" : "products"}`;

// Catalogue page: search every product. The server-rendered category grid
// (children) stays in place until the visitor types.
export function CatalogueFinder({
  items,
  children,
}: {
  items: CardItem[];
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const q = useDebounced(query.trim(), 150);
  const results = useMemo(
    () => (q ? items.filter((i) => matches(i, q)) : items),
    [items, q],
  );
  return (
    <>
      <div className="finder-bar">
        <FinderField
          query={query}
          setQuery={setQuery}
          label="Find a product or model"
          placeholder="e.g. VFX, proximity switch, Endress+Hauser"
          status={
            q
              ? `${countLabel(results.length)} ${results.length === 1 ? "matches" : "match"} “${q}”`
              : `${countLabel(items.length)} across all ranges`
          }
        />
      </div>
      {!q ? (
        children
      ) : results.length ? (
        <ul className="finder-results">
          {results.map((i) => (
            <li key={i.href}>
              <Link href={i.href}>
                <span>
                  <strong>{i.name}</strong>
                  <span className="small-label">
                    {[i.brand, i.group, i.category]
                      .filter((x, n, all) => x && all.indexOf(x) === n)
                      .join(" · ")}
                  </span>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState query={q} />
      )}
    </>
  );
}

// Category page: filter the range in place, grouped as before, with the
// group links kept in a sticky bar.
export function CategoryFinder({
  items,
  groups,
  categoryName,
}: {
  items: CardItem[];
  groups: string[];
  categoryName: string;
}) {
  const [query, setQuery] = useState("");
  const q = useDebounced(query.trim(), 150);
  const results = useMemo(
    () => (q ? items.filter((i) => matches(i, q)) : items),
    [items, q],
  );
  const visibleGroups = groups.filter((g) =>
    results.some((i) => i.group === g),
  );
  const grouped = groups.length > 1;
  return (
    <>
      <div className="finder-bar">
        <FinderField
          query={query}
          setQuery={setQuery}
          label={"Search " + categoryName.toLowerCase()}
          placeholder="Model, product or type"
          status={
            q
              ? `${results.length} of ${countLabel(items.length)} match “${q}”`
              : countLabel(items.length)
          }
        />
      </div>
      {grouped && visibleGroups.length > 0 && (
        <nav className="group-links" aria-label="Product groups">
          {visibleGroups.map((g) => (
            <a key={g} href={"#" + groupId(g)}>
              {g}
            </a>
          ))}
        </nav>
      )}
      {results.length === 0 ? (
        <EmptyState query={q} />
      ) : grouped ? (
        visibleGroups.map((g) => (
          <section key={g} className="product-group" id={groupId(g)}>
            <h3 className="group-title">{g}</h3>
            <div className="product-grid">
              {results
                .filter((i) => i.group === g)
                .map((i) => (
                  <ProductCardView key={i.slug} item={i} />
                ))}
            </div>
          </section>
        ))
      ) : (
        <div className="product-grid">
          {results.map((i) => (
            <ProductCardView key={i.slug} item={i} />
          ))}
        </div>
      )}
    </>
  );
}
