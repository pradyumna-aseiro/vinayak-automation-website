# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences with equal weight (confirmed by the owner, 2026-09-26):

- Plant maintenance and purchase staff, mostly in Telangana and South India,
  who need a specific drive, sensor, switch, encoder or panel part quoted and
  supplied, often arriving with a nameplate model number.
- Engineers specifying products for new lines or panels, who need selection
  and application support before they order.

## Product Purpose

The public site for Vinayak Automation Products (VAP), Secunderabad,
Hyderabad, established 2007: an industrial automation products supplier and
system integrator. Success is a quote request for a named product or model,
or a conversation about a new requirement.

## Positioning

A local supplier with range and continuity: more than 10,000 clients since
2007, 350+ products across ten ranges (CG-Emotron, Renu, Jayashree, Sapcon,
Endress+Hauser, Dynaflux, CG Power, Hindustan, Transtech, Bonfiglioli and
others), supplied and supported from Hyderabad.
Sister company of Aseiro Industries (aseiro.com), which handles machine
vision and integration.

## Operating Context

- The catalogue lives in `data/catalogue.json`; the part finder filters it by
  name or model, group, brand and category. Pages are statically generated.
- Enquiries go through `/contact` (a `?product=` parameter pre-fills the
  product) and are emailed through Resend (`lib/contact.mjs`).
- Pricing and availability are confirmed with each quotation; the site shows
  no prices and has no checkout.
- Deployed on Vercel's free tier; the image config is tuned to stay within it.

## Capabilities and Constraints

- The catalogue is incomplete: 155 products are listed while VAP carries
  350+. The owner will supply the missing products (pending, 2026-09-26).
- Product images must show the exact product, from the manufacturer's own
  site, catalogue or brochure where possible, on a white background.
  Provenance for every image is recorded in `docs/media-sources.json`. Never
  substitute a different model's photo.
- Where no official photo exists, the product shows a "Photo on request"
  field instead of a lookalike. RM D131/D151 is one: its old photo was
  Jayashree's "Belt Load Monitor" (now used for that product's own listing),
  and Jayashree's website does not show the series (possibly discontinued;
  owner to confirm).
- Never invent figures, prices or claims.

## Brand Commitments

- Name: Vinayak Automation Products; short forms VAP and Vinayak Automation.
- Voice: plain and factual; name brands, ranges and places rather than
  "innovation" or "growth".
- Third-party brand names visible in illustrative stock photos are
  acceptable (owner, 2026-09-26).

## Evidence on Hand

- Named clients shown in the client grid (for example NTPC, BHEL, Toshiba).
- A named CEO with a photograph; full phone lists and office hours on
  `/contact`.
- Company timeline: founded 2007; first 5,000 clients in 2012; partnered with
  Endress+Hauser in 2015; 10,000+ clients in 2017; team of 20 in 2026.
- Absent, never fabricate: testimonials, prices, stock levels, delivery
  times.

## Product Principles

1. Get a buyer from a model number to a quote request in as few steps as
   possible.
2. Show the real product, not a lookalike.
3. State facts the business can stand behind; leave the rest out.
4. Stay distinct from Aseiro and link to it as the sister company.

## Accessibility & Inclusion

WCAG 2.2 AA as the floor (Lighthouse accessibility 100 on 2026-09-26): no text
below 11px (brand labels 12px), at least 4.5:1 contrast, 44px touch targets,
focus visible on the red bands.
