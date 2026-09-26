---
name: Vinayak Automation Products
description: Industrial automation products and system integration from Hyderabad, since 2007.
colors:
  accent: "#a13236"
  accent-dark: "#81262a"
  accent-tint: "#f3e6e3"
  accent-tint-strong: "#eed5d3"
  paper: "#f9f8f5"
  white: "#ffffff"
  soft: "#eeefea"
  grey-50: "#f1f1ee"
  grey-100: "#e9ece6"
  line: "#dcdfd9"
  grey-300: "#cdd2c9"
  muted: "#616765"
  grey-800: "#333d3b"
  ink: "#212525"
  success: "#27572e"
  success-soft: "#597258"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(42px, 5.3vw, 76px)"
    fontWeight: 550
    lineHeight: 1.16
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(32px, 3.4vw, 48px)"
    fontWeight: 550
    lineHeight: 1.16
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "23px"
    fontWeight: 550
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.8
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  body-small:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.13em"
  caption:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  circle: "50%"
spacing:
  section: "100px"
  section-compact: "65px"
  container: "1280px"
  gutter-desktop: "48px"
  gutter-tablet: "32px"
  gutter-mobile: "20px"
  grid-gap: "28px"
  touch-target: "44px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "16px 23px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.accent-dark}"
    textColor: "{colors.white}"
  button-small:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "13px 18px"
    height: "46px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 23px"
    height: "52px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-on-band:
    backgroundColor: "{colors.white}"
    textColor: "{colors.accent}"
    rounded: "{rounded.none}"
    padding: "16px 23px"
    height: "52px"
  button-on-band-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.accent-dark}"
  chip-group:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "44px"
  chip-group-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  product-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "22px 25px 26px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "48px"
  finder-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "48px"
  red-band:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    padding: "65px 0"
---

# Design System: Vinayak Automation Products

## Overview

**Creative North Star: "The Parts Counter"**

The site behaves like a well-kept trade counter: warm paper, hairline rules, a catalogue laid out in plain rows, and one confident brand red that marks where to act. Buyers often arrive with a nameplate model number, and nothing on the page is allowed to get between that number and a quote. So the system is quiet by default and loud in exactly two ways: the red of an action or current state, and a full-width red band where the page asks for contact or shows who already buys here.

Density is moderate and orderly. Sections breathe (100px vertical rhythm on desktop), but inside a section the catalogue is compact: three-column card grids, sticky group chips, finder results as ruled rows. Surfaces are flat and square-edged. Structure comes from 1px rules and a slight tonal step between paper, soft grey and white, never from shadows.

Imagery is evidence, not mood. Product photographs show the exact manufacturer product on white. Atmospheric factory photography appears only where the page describes the company (the home hero and the About page), and it is desaturated and scrimmed so it never outshouts the catalogue.

**Key Characteristics:**
- Warm off-white paper ground with near-black green-grey ink; one brand red as the only strong hue.
- Manrope display headings at medium weight with tight negative tracking; Inter for everything read.
- Square corners on every control, card, chip and band.
- Full-width red emphasis bands, each separated from the next by real content.
- Exact product photography on white fields.
- WCAG 2.2 AA floor: 11px minimum text, 44px targets, visible focus everywhere, including on red.

## Colors

A restrained warm-neutral palette with a single oxide red doing all of the signalling.

### Primary
- **Counter Red** (accent): primary buttons, current-page nav marker, hover state for links and card borders, the emphasised phrase inside a hero headline, spec-line markers, timeline rules, icon colour in lists, the global focus outline, and the background of the full-width emphasis bands.
- **Deep Counter Red** (accent-dark): hover state of primary buttons, error text for form fields and notices.
- **Red Wash** (accent-tint): quiet red surfaces, used for the numbered badges and note box in the requirement planner.
- **Red Wash Strong** (accent-tint-strong): text selection highlight.

### Neutral
- **Warm Paper** (paper): page background, header, sticky chip bar, form-field fill, the resting arrow tile on category cards.
- **Product White** (white): product card and product detail image fields, finder input, client logo tiles, text and buttons on red bands.
- **Soft Grey** (soft): alternating section background, category image fields, quote aside, form panel, empty-state panel, table headers.
- **Grey 50 / Grey 100** (grey-50, grey-100): the rule between a product image and its copy; the footer background.
- **Hairline** (line): the default 1px rule for borders, dividers, card outlines, chips and table cells.
- **Grey 300** (grey-300): stronger rules for inputs, capability cards and the footer bottom border.
- **Slate Muted** (muted): all secondary text and paragraph copy (paragraphs default to this colour), labels, icons at rest.
- **Grey 800** (grey-800): the dark field behind the home hero photograph while it loads.
- **Counter Ink** (ink): headings, primary text, the filled state of chips and secondary buttons.

### Tertiary
- **Workshop Green** (success, success-soft): success notice after an enquiry is sent, and the small location dot in the footer. Nothing else.

### Named Rules

**The One Red Rule.** Red is the only strong hue in the system. It marks action, current state, emphasis and focus. Green is reserved for success and the location dot; no other hues are introduced.

**The Red Band Rule.** A full-width red band (accent background, white text) is the page's loudest statement: the client grid and the closing contact call on the home page, the enquiry banner on catalogue and About pages. Bands are never stacked; substantive paper content always separates one band from the next.

## Typography

**Display Font:** Manrope, self-hosted variable (with Arial, sans-serif)
**Body Font:** Inter, self-hosted variable (with Arial, sans-serif)

**Character:** Manrope at a medium 550 weight with tight tracking gives headings a machined, compact shape without shouting. Inter carries body text, controls and labels at comfortable reading sizes.

### Hierarchy
- **Display** (550, clamp 42px to 76px, 1.16): page h1. Hero and category heroes use their own clamps within this range (category hero clamp 38px to 60px, product detail clamp 34px to 50px). One phrase may take Counter Red.
- **Headline** (550, clamp 32px to 48px, 1.16): section h2 and band headlines; catalogue sub-sections step down to fixed 34px to 36px.
- **Title** (550, 23px, -0.025em): h3 for cards and sub-sections, 20px to 24px by context. Finder result names use Manrope 600 at 18px.
- **Lead** (400, 17px, 1.8): the intro paragraph under a page h1, max about 620px wide.
- **Body** (400, 16px, 1.65): default text; muted colour for paragraphs, ink for headings and links. Card and aside copy sits at 13px to 15px with 1.75 line-height. Long prose is capped near 70ch.
- **Label** (600, 12px, 0.13em, uppercase): brand and group names on product and category cards, contact-item labels, finder result brand lines.
- **Caption** (550 to 650, 11px, 0.12em to 0.17em, capitals): photo captions, hero note, catalogue caption, card ordinal numbers, breadcrumbs, footer fine print.

### Named Rules

**The Eleven Floor Rule.** No text is set below 11px. Brand and manufacturer names are set at 12px or larger.

**The Label Case Rule.** Tracked capitals are for metadata: a brand, a group, a caption, a count. Headings and body copy are always sentence case.

## Layout

A single centred container, 1280px maximum, with side gutters of 48px on desktop, 32px below 1100px, 20px below 800px and 18px below 520px. Sections run 100px top and bottom on desktop, 65px below 800px.

Grids are simple column splits. The home hero is a two-column split (copy left, photograph right) that stacks below 800px. Category and product grids run three columns at 25px to 28px gaps, two columns below 800px, one below 520px. The client grid runs five columns, three below 900px, with logos alone on phones. Page heroes for categories and product details are two-column text-and-image splits that stack below 800px.

Section headings align a heading left and a short aside (max about 355px) right, bottom-aligned; they stack below 800px.

Catalogue pages keep the buyer oriented: a category switcher row of chips under the hero, a part finder above the grid, and a sticky row of group chips pinned to the top of the viewport while a long range scrolls. On phones the chip row runs edge to edge and scrolls horizontally.

Every interactive target is at least 44px tall; where a chip is visually smaller, an invisible pseudo-element extends its tap area.

## Elevation & Depth

The system is flat. Depth comes from tonal steps (paper, soft grey, white product fields) and 1px rules, not shadows. Hover feedback is a colour change, a 2px upward lift on buttons, or a 1.04 scale on product imagery. Motion runs 0.2s for colour and lift, 0.3s to 0.35s for image scale, and all animation and transition is removed under reduced-motion preferences.

### Shadow Vocabulary
- **Mobile menu drop** (`box-shadow: 0 10px 15px #00000008`): the only box shadow, under the open mobile navigation panel.
- **Caption legibility** (`text-shadow: 0 1px 3px rgba(0,0,0,0.7)`): white captions over the hero photograph, alongside a dark gradient scrim.

### Named Rules

**The Hairline Rule.** Separate things with a 1px rule or a tonal step. Cards, chips, inputs and tables never cast shadows.

## Shapes

Square by default. Buttons, inputs, chips, product cards, category image fields, panels and bands all have 0 radius, and form fields reset the browser radius explicitly. Circles appear only as small markers: the footer location dot, timeline nodes and the numbered badges in the requirement planner. Red appears as geometry in a few fixed forms: a 3px by 16px underline for the current nav item, 2px top or left rules on highlight and timeline items, and a 2px left rule on specification notes.

**The Square Edge Rule.** New catalogue components are square-cornered. The rounded corners on a few later home-page modules are drift, not precedent.

## Components

### Buttons
Firm, rectangular and labelled in plain words, always followed by an up-right arrow icon.
- **Shape:** square corners (0), minimum height 52px (46px small).
- **Primary:** Counter Red fill, white 14px Inter at 550, 16px by 23px padding, label and arrow pushed apart by a 24px gap.
- **Hover / Focus:** fill darkens to Deep Counter Red and the button lifts 2px (0.2s). Focus is a 3px Counter Red outline offset 5px.
- **Secondary:** transparent with a Hairline border and ink text; on hover it fills with ink and turns white.
- **On a red band:** white fill with red text; hover shifts to paper with deep-red text; focus outline turns white.
- **Disabled:** 65% opacity, wait cursor, no lift.

### Text links
Ink 14px at 550 with a trailing arrow, at least 44px tall; hover turns the text red. On cards the link drops to 12px and sits at the card's foot.

### Chips
- **Style:** transparent with a Hairline border, muted 11px to 13px text, square corners.
- **State:** hover and current page fill with ink and turn white. Category switcher chips mark the current range with `aria-current`. Group chips are anchor links in a sticky, horizontally scrolling bar on a paper ground with a Hairline bottom rule; their focus outline is inset so it is not clipped.

### Cards / Containers
- **Product card:** white field, Hairline border, square. A 220px image field shows the product contained with 30px by 48px padding, then a copy block (22px to 26px padding) separated by a Grey 50 rule: group or brand label, title, three-line clamped summary, "View details" link. Hover turns the border red and scales the image by 1.04.
- **Category card:** borderless. A 248px Soft Grey image field (product multiply-blended so its white ground disappears), a two-digit ordinal at top left and a square paper arrow tile at bottom right that turns red on hover. Copy sits below on paper: brand label, title, description, "Explore range".
- **Panels:** Soft Grey, square, 32px to 40px padding, for the quote aside, contact form and empty finder state.
- **Shadow Strategy:** none (see Elevation & Depth).

### Inputs / Fields
- **Style:** Grey 300 1px border, paper fill (white inside the finder), square, 48px minimum height, 16px text so mobile browsers do not zoom.
- **Focus:** border turns red, with the global 3px red focus outline. The finder input shows focus on the whole field wrapper.
- **Error:** border turns red and a 12px Deep Counter Red message sits below. Success notices use Workshop Green.

### Navigation
A 100px paper header (82px below 800px) with a Hairline bottom rule, the VAP lockup at left and 14px Inter at 500 links at right, ending in a small primary button. Hover turns links red; the current page gets a short red underline. Below 800px the links collapse behind a menu toggle into a full-width paper panel. Breadcrumbs sit under the header at 11px, muted, with the current page in ink.

### Part Finder (signature)
A search field labelled at 12px ink, with a leading search icon, a 44px clear button and a live status line in tabular numerals. Results are ruled rows at least 64px tall: product name in Manrope 600 at 18px over a brand label, with a trailing arrow; hover turns name and arrow red. No match produces a Soft Grey panel offering a direct enquiry for the typed model.

### Red Emphasis Band (signature)
Full-bleed Counter Red section, 65px vertical padding (50px below 800px), with a white headline, white body text, an optional two-column white bullet list, and a white on-band button. Focus inside a band is always a white 3px outline.

### Client Grid
White logo tiles with a Hairline border in a five-column grid, each linking to the company's site, logo contained at 140px by 65px with a 12px name below. It is set inside a red band on the home page, where tiles take a white border and a paper hover and focus turns white. On phones only the logos show.

## Do's and Don'ts

### Do:
- **Do** use Counter Red for action, current state and emphasis only, and keep every other surface in the paper, soft grey, white and ink family.
- **Do** separate red bands with substantive paper content, and switch the focus outline to white (3px, offset 4px to 5px) on anything focusable inside a band.
- **Do** show the exact manufacturer product on a white field, stored as WebP in `public/media/products`, contained with generous padding. On Soft Grey fields, multiply-blend so the white background disappears.
- **Do** keep all text at 11px or above and brand labels at 12px or above, with at least 4.5:1 contrast.
- **Do** give every link, chip and button a target at least 44px tall.
- **Do** separate content with 1px Hairline rules and tonal steps.

### Don't:
- **Don't** use a different model's photo, a lookalike, or a product photographed on a busy or tinted background.
- **Don't** put a red focus outline on a red band.
- **Don't** stack two red bands back to back.
- **Don't** add shadows to cards, chips, inputs or panels.
- **Don't** round the corners of new controls, cards or panels; circles are only for small dots and badges.
- **Don't** set headings or body copy in tracked capitals; tracked caps are for metadata labels.
- **Don't** introduce a hue other than red for emphasis.
