# Asset sources

## New industrial photography

- `public/media/factory.webp`: Catgirlmutant, Unsplash, https://unsplash.com/photos/a-factory-filled-with-lots-of-machines-and-equipment-jADekDuAPSA . Source image https://images.unsplash.com/photo-1716643863806-989dd76ae093 . Used as decorative industrial context on the homepage and composed social preview, not represented as a Vinayak-owned facility.
- `public/media/workshop.webp`: Homa Appliances, Unsplash, https://unsplash.com/photos/7zQgZG8mwe0 . Source image https://images.unsplash.com/photo-1716191299945-4c5b89703971 . Used as decorative context on Home and About, not represented as a Vinayak installation.
- Both were obtained under the standard Unsplash License, https://unsplash.com/license (commercial use permitted). Images are locally served and optimised; no remote image hotlink is required by the website.
- `public/media/social.jpg`: original website-title composition using the licensed factory photo, website colours and typography.

## Existing assets

The VAP logo and authentic product photographs were retained from the user's existing repository at commit 07f918d943442707744c44539544e5ef2ba4e608. These are existing site assets, not newly licensed stock or generated representations of products. Their original rights remain with their respective owners. No new manufacturer authorisation claims are made.

## Fonts

Manrope and Inter variable fonts are self-hosted. SIL Open Font License texts are included next to the fonts in `app/fonts/`. Glyph fallback is provided by the system sans-serif stack.


## September 2026 company story update
VAP header/footer vector logo and site icons extracted/rendered from the owner-supplied VAP LOGO.pdf, first-page emblem. Original PDF remains unchanged. Client logos restored from repository commit 07f918d, images/services/client; the 14 identities match the owner-supplied client slide. Aseiro logo retrieved from https://www.aseiro.com/aseiro-logo-main.png. External company destinations are defined in components/client-grid.tsx. Company milestones, 20 employees in 2026, four highlights and partnership content supplied by the owner in this update. The client highlight was updated to 10,000+ in the September 2026 design audit, as confirmed by the owner; the 2012 (5,000) and 2017 (10,000+) timeline entries are unchanged.

## September 2026 design audit
Full provenance (source, author, licence, sha256, bytes, where used) for new media is in `docs/media-sources.json`. The homepage hero now uses `public/media/control-panel-wiring.webp` and About uses `public/media/hmi-machine-line.webp` (both Unsplash License). `workshop.webp` was removed; `factory.webp` is kept because `scripts/social-card.mjs` composes the social preview from it. The Industrial automation category image is a cleaned crop of the existing Renu FlexiPanels photograph (`public/media/renu-flexipanels-hmi.webp`). The Control & power category image now uses the existing Jayashree speed-switch photograph `images/services/ss-11.jpg` (white background) instead of the grey `ps.jpg`; legacy image files stay in place for old inbound links.

## September 2026 product photographs
72 product images now live in `public/media/products/` as trimmed WebP cut-outs on pure white. 32 come from the manufacturers' own websites or datasheets (Renu Electronics, CG Emotron, Jayashree Electron and jencoder.com, Sapcon Instruments). Two of those needed their flat backdrop removed. The other 40 are existing site photographs with their flat studio backdrops removed locally with sharp: 37 Endress+Hauser family images, plus Emotron VSE, Jayashree RME261 and the HFSR reactor. `docs/media-sources.json` gives each one's source URL (and PDF page), processing, sha256 and size. These are manufacturer images, used only to show that manufacturer's own product in the dealer listing. No manufacturer authorisation or endorsement is claimed. The replaced files in `public/images/services/` stay in place for old inbound links.
