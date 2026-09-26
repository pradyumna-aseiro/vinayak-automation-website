"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  function navigate() {
    setOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="Vinayak Automation Products home"
          scroll={false}
          onNavigate={navigate}
        >
          <Image
            src="/media/vap-lockup.png"
            width={340}
            height={78}
            alt="Vinayak Automation Products"
            className="vap-lockup"
            priority
          />
        </Link>
        <button
          ref={button}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-nav"
          aria-label="Main navigation"
          className={open ? "main-nav is-open" : "main-nav"}
        >
          {[
            ["/", "Home"],
            ["/about", "About us"],
            ["/products", "Products"],
            ["/#careers", "Careers"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                (href === "/" ? path === "/" : path.startsWith(href))
                  ? "page"
                  : undefined
              }
              // An in-page anchor must keep the browser's scroll to its target.
              scroll={href.includes("#") ? undefined : false}
              onNavigate={href.includes("#") ? () => setOpen(false) : navigate}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="button button-small"
            scroll={false}
            onNavigate={navigate}
          >
            Request a quote <ArrowUpRight size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
