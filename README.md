# CoffeeCorner

A responsive Vue 3 + JavaScript portfolio demo, built with Vite from the supplied Brew & Co. desktop/mobile composition. The visible brand is CoffeeCorner, as requested after the original design implementation. All five implementation milestones are complete. See the [final review and readiness table](docs/milestone-5-review.md).

## Run and build

Requires Node.js 22.18+ and npm; verified with Node 24.21.0.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Serve the contents of `dist/` at the root of a static host after building. Dynamic menu image URLs use `/assets/`, so nested-path hosting needs an asset-path adjustment and revalidation. No environment variables or backend are needed. Hosting and a public deployment have not been verified.

## Demo behavior

- Navigation, View Menu, Find Us and Order Now scroll to page sections; no order or payment is created.
- Coffee shows the four reference featured products. Other categories filter locally; View Full Menu expands six sample items.
- Mobile navigation supports keyboard use, Escape, outside click and focus exit.
- Newsletter input uses native email validation and a local acknowledgement. Nothing is sent or stored.
- Address, hours, phone and email are sample portfolio content. Get Directions opens a labeled Google Maps search; no real storefront or precise pin is verified.
- Social icons and legal labels are decorative, without invented destinations.

## Design and assets

`src/App.vue` composes seven sections; `src/components/` holds their Vue SFCs and `src/styles.css` holds the design tokens and responsive rules. No TypeScript, router or state library is used.

Seven photographs were generated for this project and exported as responsive WebP with JPEG fallbacks. The logo variants, favicon and illustrative map are original SVGs. Generation provenance, prompts, dimensions and crop notes are in the [asset manifest](docs/asset-manifest.md). Fonts use local Nimbus faces with Georgia/Arial fallbacks; exact metrics vary by platform.

The reference `coffee_corner_design.png` is never served as production artwork. Visual reviews compare the desktop panel and the page inside the phone, excluding its frame. Primary captures use 1440×900 and 390×844, with reflow checks at 1280/768/375/320 px. [Final evidence](docs/evidence/milestone-5/) and the [comparison ledger](docs/visual-evidence-ledger.md) record section proportions, type, crops and justified differences: original photography/map, system fonts and honest demo labels.

## Verification

Start the production preview first. Browser checks require an external Playwright installation; the shipped app has no testing dependency. Set `PLAYWRIGHT_MODULE` to its module path and `CHROME_PATH` to a compatible executable when needed.

```sh
BASE_URL=http://127.0.0.1:4173 node scripts/verify-milestone-3.mjs
BASE_URL=http://127.0.0.1:4173 node scripts/verify-milestone-4.mjs
AXE_PATH=/path/to/axe-core/axe.min.js BASE_URL=http://127.0.0.1:4173 node scripts/verify-milestone-5.mjs
```

Use `EVIDENCE_PATH` to save a new run separately. Milestones 3/4 cover interactions, six viewport widths, screenshots and runtime errors. Milestone 5 runs axe and keyboard-only desktop/mobile journeys with normal/reduced motion. Install audit tools separately (for example in `/tmp`): `lighthouse@12.8.2` and `axe-core@4.10.3`. The final report records the Lighthouse commands.

Observed results: all 30 regression checks and four final rehearsals PASS; eight axe scans report zero violations. Lighthouse 12.8.2 scores performance/accessibility/best practices **97/100/100 mobile**, **100/100/100 desktop** on the local production preview. A clean-copy `npm ci --offline` and build pass. These are local lab results, not field measurements or full WCAG certification.

Firefox/Safari, physical devices, screen-reader testing, live Maps results and public hosting remain **NOT VERIFIED**. Automated contrast checks cannot resolve photographic/pseudo-element backgrounds; those were visually reviewed, with solid-color contrast separately measured. Detailed evidence, review findings and remaining limitations are in the [final review](docs/milestone-5-review.md).
