"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
const companies = [
  ["NTPC", "ntpc", "https://ntpc.co.in/"],
  ["BHEL", "bhel", "https://www.bhel.com/"],
  ["MEIL", "megha", "https://www.meil.in/"],
  ["Toshiba", "toshiba", "https://www.toshiba.com/"],
  ["Amrutanjan", "amrutanjan", "https://www.amrutanjan.com/"],
  ["Aurobindo Pharma", "aurobindo", "https://www.aurobindo.com/"],
  ["TSGENCO", "tspgc", "https://www.tsgenco.co.in/"],
  ["JSW Cement", "jsw", "https://www.jswcement.in/"],
  ["HMWSSB", "hyderabad", "https://www.hyderabadwater.gov.in/"],
  ["Hy-Gro", "hygro", "https://hygrochemicals.com/"],
  ["Medreich", "medreich", "https://www.medreich.com/"],
  ["Neuland", "neuland", "https://www.neulandlabs.com/"],
  ["Penna Cement", "penna", "https://www.pennacement.com/"],
  ["SCCL", "sccl", "https://scclmines.com/"],
  ["Aseiro Industries", "aseiro", "https://www.aseiro.com/"],
];
export function ClientCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const direction = useRef(0);
  useEffect(() => {
    let frame = 0,
      previous = 0;
    const tick = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 40) : 0;
      previous = time;
      if (
        track.current &&
        direction.current &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        track.current.scrollLeft += direction.current * elapsed * 0.3;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  const move = (direction: number) =>
    track.current?.scrollBy({
      left: direction * 220,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <section className="section client-section" aria-labelledby="clients-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OUR CLIENTS & COLLABORATORS</span>
            <h2 id="clients-title">Relationships across industry.</h2>
          </div>
          <div className="carousel-controls">
            <button
              type="button"
              aria-label="Previous company logos"
              onClick={() => move(-1)}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              aria-label="Next company logos"
              onClick={() => move(1)}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
        <p className="carousel-hint">
          Explore the companies. Hover over either end to browse, or use the
          arrows. Select a logo to visit its website.
        </p>
        <ul
          ref={track}
          className="client-track"
          aria-label="Company websites"
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            direction.current = x > rect.width - 180 ? 1 : x < 180 ? -1 : 0;
          }}
          onPointerLeave={() => {
            direction.current = 0;
          }}
          onPointerDown={() => {
            direction.current = 0;
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              move(e.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          {companies.map(([name, key, url]) => (
            <li key={key}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name + " website (opens in a new tab)"}
              >
                <Image
                  src={
                    "/media/clients/" +
                    key +
                    (key === "aseiro" ? ".png" : ".jpg")
                  }
                  width={180}
                  height={100}
                  alt={name}
                />
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
