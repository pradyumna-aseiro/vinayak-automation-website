# Vinayak Automation Products

Next.js App Router website for Vinayak Automation Products, established in 2007. The catalogue is a product enquiry site, not a shop or inventory system.

## Development

Use Node.js 24 LTS and npm. Run `npm ci`, then `npm run dev`. Production verification: `npm run build`, `npm start -- --port 3100`.

- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm test` — catalogue/redirect integrity and contact API behaviour; provider calls are mocked
- `npm run check:site` — crawl all pages, images, redirects, metadata and invalid API requests against localhost:3100
- `node scripts/browser-check.mjs` — desktop/tablet/mobile layout and form interaction tests; all email submissions are intercepted
- `node scripts/accessibility.mjs` — axe WCAG A/AA checks
- `node scripts/lighthouse.mjs` — local mobile Lighthouse audits

Browser scripts use an installed Google Chrome. Lighthouse uses the standard Windows Chrome path. Reports and screenshots are written to gitignored `artifacts/`.

## Content and assets

`data/catalogue.json` contains nine categories and 105 product/family listings. Edit it to maintain product names, copy, specifications and images. `lib/catalogue.ts` contains company contact details. Shared layouts and components provide consistent typography, navigation and quotation links.

The baseline was repository commit `07f918d943442707744c44539544e5ef2ba4e608`. Active product content was extracted; commented-out products, mirrored error pages, duplicate templates and unsupported company statistics were not republished. The established year is explicitly 2007. Product image files retain their legacy public paths where used. See `docs/catalogue-inventory.json`, `docs/legacy-file-inventory.txt`, `docs/legacy-redirects.json` and `docs/asset-sources.md`.

Manufacturer ranges describe the existing catalogue, not newly asserted authorised-dealer appointments. Ratings and model options must be confirmed for an order. No stock, prices, reviews or availability were invented.

## Resend contact configuration

Copy `.env.example` to `.env.local` for local configuration. Never commit credentials.

- `RESEND_API_KEY`: preferred Resend API key variable; the legacy lowercase `resend` is still accepted.
- `CONTACT_FROM_EMAIL`: sender address on a domain verified in the existing Resend account. There is deliberately no fallback to the restricted `onboarding@resend.dev` testing sender.
- `CONTACT_TO_EMAIL`: defaults to `info@vinayakautomation.com`.

The public interface remains `POST /api/contact` with `name`, `email`, `phone_number`, `product_name`, `message` and optional empty honeypot `website`. The server validates lengths and formats, rejects foreign origins, limits request size and uses a bounded per-instance throttle. Configure Vercel Firewall rate limiting if sustained abuse requires distributed protection; the in-memory throttle is not a global guarantee.

The browser retains entered data after failure. A stable idempotency key is reused for unchanged retries. Success means Resend accepted an email with a provider identifier, not proof of inbox delivery. Errors never expose provider response bodies or secrets.

No real email has been sent during development. Verified sender configuration and an authorised labelled inbox-delivery test are required before claiming the form operational.

## Preview and production

`codex/vinayak-rebuild` is the review branch; `master` is the existing production branch. `vercel.json` selects Next.js and the `.next` build output for the existing Vercel project. Push the review branch to trigger its Git integration; do not merge until preview approval.

Preview builds use `VERCEL_ENV=preview` to emit noindex metadata, noindex response headers and a disallow-all robots file. Production canonical URLs remain `https://www.vinayakautomation.com`. Keep production hostname/DNS and existing project association intact.

Configure the Resend variables separately for the intended Vercel environments. The Vercel CLI was not authenticated in this workspace during implementation; no secret environment configuration was changed. Roll back a release using Vercel's previous production deployment if needed.
