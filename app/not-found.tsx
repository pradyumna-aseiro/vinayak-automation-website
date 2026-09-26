import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>404 · Page not found</Eyebrow>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <p>
        This page is no longer available. Explore our product catalogue or
        contact our team for help.
      </p>
      <Button href="/products">Explore products</Button>
    </section>
  );
}
