# CoffeeCorner

CoffeeCorner is a responsive Vue 3 portfolio demo based on the supplied Brew & Co. desktop and mobile composition. Milestones 1–3 provide the responsive foundation, original imagery and vector branding, and the header, hero and interactive menu. Story, location, CTA and footer remain at their foundation stage for Milestone 4; final calibration and delivery checks are Milestone 5.

## Run locally

Requirements: Node.js 22.18 or later and npm.

```sh
npm install
npm run dev
```

Create and preview a production build:

```sh
npm run build
npm run preview
```

The app uses Vue single-file components with JavaScript. TypeScript, routing, a state library, backend services, ordering, payment, and live newsletter delivery are outside the project scope.

## Current structure

The page follows this semantic order:

1. site header and primary navigation;
2. hero;
3. featured menu;
4. story;
5. location;
6. photographic call to action;
7. footer.

Shared colors, spacing, typography, container sizing, focus treatment, and responsive rules live in `src/styles.css`. The layout moves from wide two-column compositions to single-column sections below 700 px. The menu changes from four columns to two below 900 px and to compact rows below 480 px. The header collapses below 701 px. Milestone 3 captures cover 320/375/390/768/1280/1440 px; lower-page layouts await their own implementation and visual review.

## Visual comparison protocol

The composite reference is presentation scaled. Compare only the desktop page panel and the page inside the phone; exclude the phone frame, notch, and surrounding white canvas.

- Primary captures: 1440 × 900 desktop and 390 × 844 mobile.
- Reflow checks: 1280, 768, 375, and 320 px widths.
- Compare section proportions, line wrapping, color blocks, spacing, image focal points, desktop grids, mobile rows, content order, CTA, and footer density.
- Record material differences in a discrepancy ledger and recapture after each accepted correction.
- Use pixel differences only as diagnostics because original production photography will differ from the reference.

## Original asset system

| Slot | Desktop intent | Mobile intent |
| --- | --- | --- |
| Hero café and latte | Wide atmospheric scene; latte anchored right; dark copy space left | Tall crop with copy readable above the cup |
| Four menu products | Individual landscape card images | Compact square or near-square row thumbnails |
| Story interior | Warm café interior on the right | Image-first crop above story copy |
| Location map | Wide original stylized SVG | Map above the contact details |
| CTA takeaway cup | Cup and hand on the right with copy space left | Compact crop with the cup still recognizable |
| Brand | Original dark/light SVG lockups and favicon | Small, legible condensed lockup |

The seven photographs were generated specifically for this project and exported as responsive WebP files with optimized JPEG fallbacks. The logo, compact lockup, light/dark variants, cup mark, and favicon are original hand-authored SVGs. Full generation provenance, prompts, dimensions, focal points, alt text, and export decisions are recorded in `docs/asset-manifest.md`.

The supplied `coffee_corner_design.png` is a visual reference and is never shipped or requested as production page artwork. Order Now and View Menu scroll to the sample menu; Find Us scrolls to the location section. This is a portfolio demo with no ordering or payment service. The Coffee category intentionally shows the four mixed featured items from the reference; other categories filter locally. View Full Menu expands a local sample menu with no dialog or focus trap. The mobile navigation supports Escape, outside click and keyboard focus exit. The newsletter form remains deferred to Milestone 4; no subscription is sent.


## Milestone 3 verification

Build with `npm run build`. The browser regression script uses Playwright and a running dev or preview server:

```sh
BASE_URL=http://127.0.0.1:5173 node scripts/verify-milestone-3.mjs
```

Use a local Playwright installation, or set `PLAYWRIGHT_MODULE` to an existing Playwright module path. Set `CHROME_PATH` to a system Chrome executable if needed. No browser-testing package is required by the shipped app. The script saves viewport screenshots and observed results to `docs/evidence/milestone-3/`; `docs/milestone-3-review.md` records the visual and review gates. Browser results apply to Chromium; Firefox and Safari remain unverified.
