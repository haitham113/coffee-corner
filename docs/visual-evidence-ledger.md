# Visual evidence ledger

Use `PASS`, `FAIL`, or `NOT VERIFIED` for every gate. Each visual entry should identify its viewport, section, evidence path, observed difference, severity, accepted action, and recapture result.

| Milestone | Viewport | Section or check | Status | Evidence and discrepancy | Required action |
| --- | --- | --- | --- | --- | --- |
| 1 | Clean install | Dependency reproducibility | PASS | `npm ci --offline --ignore-scripts --no-audit --no-fund` installed 38 packages from an empty dependency tree using the generated lockfile. | Repeat without `--offline` in a networked environment when convenient. |
| 1 | Build | Production bundle | PASS | `npm run build`; Vite 5.3.5 built 20 modules successfully. | None. |
| 1 | Development server | Local browser URL | PASS | Vite 5.3.5 served `http://127.0.0.1:5173/`; Chrome 155 loaded the Vue app for DOM and screenshot inspection. | None. |
| 1 | 320 px | Horizontal overflow and clipping | PASS | Chrome reported `scrollWidth` 320 and zero overflowing elements. Hero, menu and footer rendered as one-column layouts; full-page capture: `/tmp/coffeecorner-1c-320.png`. | None. |
| 1 | 390 px | Mobile section order and placeholders | PASS | Chrome reported `scrollWidth` 390 and zero overflowing elements. Semantic section order remained hero, menu, story, location and CTA; full-page capture: `/tmp/coffeecorner-1c-390.png`. | None. |
| 1 | 768 px | Tablet reflow | PASS | Chrome reported `scrollWidth` 768 and zero overflowing elements. Hero/footer rendered in two columns and the menu in two columns; full-page capture: `/tmp/coffeecorner-1c-768.png`. | None. |
| 1 | 1440 px | Desktop shell | PASS | Chrome reported `scrollWidth` 1440 and zero overflowing elements. Hero rendered in two columns and the menu/footer in four columns; full-page capture: `/tmp/coffeecorner-1c-1440.png`. | None. |
| 1 | 320 px | Navigation target sizing | PASS | Header brand, all primary navigation links and all footer navigation links measured at least 44 px high. | Recheck after Milestones 3 and 4 replace the temporary navigation treatments. |
| 1 | All widths | Eyebrow text contrast | PASS | Computed colors preserve the caramel direction at 4.79:1 on paper and 4.89:1 on forest, clearing the 4.5:1 AA threshold for 12 px text. | Recheck against photographic backgrounds in later milestones. |
| 1 | DOM | Landmarks and heading order | PASS | Accessibility tree exposed banner, main, contentinfo, two navigation landmarks, one H1 followed by four H2 headings; the focused skip link rendered visibly with a 3 px outline. | Carry forward during section implementation. |
| 2 | Asset inventory | Required raster set | PASS | Seven original generated scenes are exported to `public/assets/images/`: hero, Espresso, Cappuccino, Iced Latte, Croissant, story interior and CTA cup. Pillow inspection confirmed declared dimensions; the largest shipped file is 225,783 bytes. | None. |
| 2 | 1440 × 900 | Responsive image loading | PASS | Chrome 155 selected `hero-1600.webp`, four 720 px products, `story-1200.webp` and `cta-1600.webp`; all reported complete with nonzero intrinsic dimensions. Screenshot: `/tmp/coffeecorner-m2-1440-full.png`. | None. |
| 2 | 390 × 844 | Mobile sources and crops | PASS | Chrome selected the dedicated `hero-mobile-780x1040.webp`, 420 px products, `story-720.webp` and `cta-960.webp`. Cup/product focal points remained legible and the CTA mark stayed on the cup. Screenshot: `/tmp/coffeecorner-m2-390-full.png`. | None. |
| 2 | 320/390/768/1440 px | Reflow regression | PASS | Chrome DevTools reported exact viewport-matched `scrollWidth`, zero overflowing elements, zero broken images and no runtime/network issues at 320, 390 and 1440 px; 768 px reported zero overflowing elements and zero broken images. | None. |
| 2 | Brand assets | SVG validity and small-size clarity | PASS | Six content SVGs parsed successfully with `title` and `desc`; favicon parsed successfully as a browser icon. Direct Chrome captures showed clear silhouettes at compact sizes: `/tmp/coffeecorner-m2-lockup-dark.png`, `/tmp/coffeecorner-m2-compact-dark.png`, `/tmp/coffeecorner-m2-mark-dark.png`, `/tmp/coffeecorner-m2-favicon.png`. Footer capture verifies the light lockup. | None. |
| 2 | Art direction | Reference-relative review | PASS | Warm amber/forest palette, tactile materials, right-weighted hero/CTA subjects, recognizable products and coherent café lighting match the reference direction without copying it. No generated lettering appears; the blank CTA cup receives the original SVG mark in the page. | Reassess final crop calibration when Milestones 3–4 complete section layouts. |
| 2 | Production boundary | Reference and provenance | PASS | `rg` found no `coffee_corner_design` or reference-asset request in `src`, `public` or `index.html`. Generation IDs, prompt focus, focal points, alt text and export settings are documented in `docs/asset-manifest.md`. | None. |
| 2 | Build | Production bundle | PASS | `npm run build`; Vite 5.3.5 built 34 modules with no errors. | None. |
| 2C | Post-fix revalidation | Accepted findings and regression gate | PASS | Corrected the hero fallback declaration from 1600×901 to the actual 1600×900 and added the required per-asset evidence table. Post-fix `npm run build` built 34 modules successfully. Fresh Chrome DevTools runs at 320/390/768/1440 px reported zero overflowing elements, zero broken images and no runtime/network failures; selected hero sources were mobile-780×1040, mobile-780×1040, 960 and 1600 respectively. | No gate blocker remains. AVIF is unavailable in the installed Pillow build, so WebP + progressive JPEG is the documented delivery choice. Final section-level crop calibration remains correctly deferred to Milestones 3–4. |

## Milestone 2 per-asset verification

| Asset | Actual delivery dimensions and weights | Intended-size observation | Status |
| --- | --- | --- | --- |
| Hero | 1600×900 WebP, 143,886 B; 960×540 WebP, 71,892 B; 780×1040 mobile WebP, 80,198 B; 1600×900 JPEG, 225,783 B | Chrome selected the 1600 px source at 1440 and the portrait source at 390/320. Right-side cup, latte art and mobile crop remained clear; no text artifacts. Evidence: `/tmp/coffeecorner-m2-1440.png`, `/tmp/coffeecorner-m2-390.png`. | PASS |
| Espresso | 720×480 WebP, 41,844 B; 420×280 WebP, 18,988 B; 720×480 JPEG, 62,802 B | Opened in the generated output and rendered at 284×237 desktop / 80×80 mobile. Black demitasse, crema, handle, saucer and spoon are plausible and recognizable. | PASS |
| Cappuccino | 720×480 WebP, 50,876 B; 420×280 WebP, 22,070 B; 720×480 JPEG, 70,893 B | Opened in the generated output and rendered at 284×237 desktop / 80×80 mobile. Cup geometry and rosetta remain legible without artifacts. | PASS |
| Iced latte | 720×480 WebP, 37,224 B; 420×280 WebP, 16,488 B; 720×480 JPEG, 55,839 B | Opened in the generated output and rendered at 284×237 desktop / 80×80 mobile. Glass, one straw, ice, condensation and drink layers are plausible. | PASS |
| Croissant | 720×480 WebP, 52,758 B; 420×280 WebP, 23,262 B; 720×480 JPEG, 69,865 B | Opened in the generated output and rendered at 284×237 desktop / 80×80 mobile. Single pastry silhouette and laminated layers remain recognizable. | PASS |
| Story interior | 1200×800 WebP, 160,686 B; 720×480 WebP, 71,470 B; 1200×800 JPEG, 218,178 B | Chrome rendered 616×474 desktop / 358×275 mobile. Furniture, plants and architecture are coherent; no signage or generated lettering. | PASS |
| CTA cup | 1600×686 WebP, 62,548 B; 960×411 WebP, 32,778 B; 1600×686 JPEG, 120,059 B | Chrome rendered 624×312 desktop / 358×179 mobile. Hand anatomy and cup are plausible; generated cup is blank and the real vector mark remains aligned at 49 px desktop / 26 px mobile. | PASS |
| Desktop dark/light lockups | 230×64 viewBox; 1,132 B dark / 1,149 B light | Both lockups opened directly at 230×64; the light variant also rendered in the footer at 208×58. Wordmark, subtitle and cup silhouette remain readable. Evidence: `/tmp/coffeecorner-m2-lockup-dark.png`, `/tmp/coffeecorner-m2-lockup-light-green.png`. | PASS |
| Compact dark/light lockups | 174×54 viewBox; 944 B each | Both lockups opened directly at 174×54; the dark variant rendered in the 390 px header at 152×47. Evidence: `/tmp/coffeecorner-m2-compact-dark.png`, `/tmp/coffeecorner-m2-compact-light-green.png`, `/tmp/coffeecorner-m2-390.png`. | PASS |
| Dark/light cup marks | 64×64 viewBox; 865 B dark / 882 B light | Both marks opened directly at 48 px; the dark mark rendered on the CTA cup at 49 px desktop / 26 px mobile. Evidence: `/tmp/coffeecorner-m2-mark-dark.png`, `/tmp/coffeecorner-m2-mark-light-green.png`, full-page captures. | PASS |
| Favicon | 64×64 viewBox; 484 B | Opened directly at 32 px and 64 px; cup silhouette and steam remain distinct. Evidence: `/tmp/coffeecorner-m2-favicon.png`. | PASS |


## Milestone 3 — 2026-11-10

Full implementation, comparison, independent review and revalidation notes: [Milestone 3 review](milestone-3-review.md). Persistent evidence lives under `docs/evidence/milestone-3/` rather than temporary screenshot paths.

| Milestone | Viewport | Section or check | Status | Evidence and discrepancy | Required action |
| --- | --- | --- | --- | --- | --- |
| 3 | Build | Vue JavaScript production bundle | PASS | Vite 5.3.5 built 34 modules; CSS 10.51 kB and JS 67.05 kB. | None. |
| 3 | 320/375/390/768/1280/1440 | Reflow and assets | PASS | Production Chrome 157; exact viewport-matched scroll widths, no broken images. See `evidence/milestone-3/verification.json` and per-width captures. | Carry forward during Milestone 4. |
| 3 | 1440/390 plus 320/768 | Header/hero/menu comparison | PASS | Inspected reference and final browser captures. Full-bleed hero, right-weighted cup, diagonal desktop seam, mobile text/photo composition, desktop grid and mobile rows calibrated. Original imagery/fonts differ in documented detail; no major unexplained scoped discrepancy. | Final whole-page calibration in Milestone 5. |
| 3 | Desktop/mobile | Navigation, categories, Full Menu | PASS | Keyboard, pointer and simulated touch paths; repeated selection/disclosure, Escape/focus return, outside click, focus exit and breakpoint reset pass. Order Now is local menu navigation. | None. |
| 3 | 320 | Target sizes, focus, reduced motion | PASS | Scoped targets at least 44 px high, 3 px visible keyboard outline, instant reduced-motion scrolling. | Recheck after later global CSS changes. |
| 3 | Production runtime | Console/network | PASS | No console errors, failing requests/responses or missing image assets. | None. |
| 3 | Review/revalidation | Accepted findings | PASS | Fixed stale README and visual crop/seam/tablet-copy findings. Final build and production browser suite pass. Standards axis: no findings; Spec axis: one Low, fixed. | Proceed to Milestone 4 only when requested. |
| 3 | Other browsers/audits | Firefox/Safari, screen reader, automated WCAG/Lighthouse | NOT VERIFIED | Not measured in this milestone. Chromium evidence does not establish cross-browser or complete WCAG compliance. | Final delivery audits remain Milestone 5. |


## Milestone 4 — 2026-11-10

Complete implementation/review/discrepancy notes: [Milestone 4 review](milestone-4-review.md). Evidence is retained under `docs/evidence/milestone-4/`.

| Milestone | Viewport | Check | Status | Evidence and discrepancy | Required action |
| --- | --- | --- | --- | --- | --- |
| 4 | Production build | Vue JavaScript | PASS | Vite 5.3.5, 34 modules; CSS 16.77 kB and JS 72.48 kB. | None. |
| 4 | 320/375/390/768/1280/1440 px | Reflow/assets/order/CTA coverage | PASS | Exact viewport-matched scroll widths, no broken images, mobile story image-first/map-before-contact; photo covers CTA. `verification.json` plus per-width captures. | Carry forward during Milestone 5. |
| 4 | 1440/390 plus 320/768 | Story/location/CTA/footer composition | PASS | Actual browser comparison with reference; fixed bright-photo benefit text and 320 px photo coverage gap. Original illustrative map and compact demo labels are justified differences. | Final whole-page calibration remains Milestone 5. |
| 4 | Desktop/mobile | Sample directions, footer and CTA links | PASS | New-tab sample search URL observed; all internal anchors work; contacts remain text and no dead social/legal links. | Live provider results NOT VERIFIED, and no real storefront claimed. |
| 4 | Invalid/valid input | Newsletter demo | PASS | Native validation; local-only acknowledgement; zero submission requests/storage writes; editing/reloading clears status. `newsletter-invalid.jpg`, `newsletter-valid.jpg`. | None. |
| 4 | 320/mobile touch | Focus, targets, reduced motion and contrast | PASS | New targets at least 44 px tall with visible outlines; touch paths pass; sampled solid colors at least 5.17:1. Photo overlays inspected visually. | Full automated audit remains Milestone 5. |
| 4 | Regression | Earlier header/hero/menu | PASS | All 15 previous-suite checks pass in `regression/verification.json`; no runtime/network/image errors. | None. |
| 4 | Review/fix | Standards and Spec | PASS | One Medium coverage finding fixed and revalidated; final independent reviews found no acceptance-critical issue. | Proceed to Milestone 5. |
| 4 | Other platforms/audits | Firefox/Safari, physical devices, screen reader, full WCAG/Lighthouse | NOT VERIFIED | Not performed in this milestone. Chromium evidence is not cross-browser certification. | Final delivery audit. |

## Milestone 5 — 2026-11-10

[Final review, section comparison ledger, audit and readiness table](milestone-5-review.md). Final production screenshots and machine-readable reports are in `evidence/milestone-5/`.

| Check | Status | Evidence and disposition |
| --- | --- | --- |
| Final desktop/mobile art direction | PASS | Actual reference compared with 1440/390 full and section captures, plus 320/768 inspections. Real bold faces restored reference hierarchy; mobile menu heading remains two lines. No material unexplained discrepancy remains. |
| Six-width reflow and earlier gates | PASS | All 30 regression checks; exact scroll widths, expected content order, working keyboard/touch interactions, no broken images/runtime/network errors. |
| Accessibility and final rehearsal | PASS | Eight axe scans with WCAG2.2AA tags: zero violations. Four keyboard-only desktop/mobile journeys with normal/reduced motion pass. Fixed category-transition contrast dip and named menu region. Photo/pseudo-element contrast review items manually inspected. |
| Production build / fresh setup | PASS | Vite build succeeds; temporary-copy clean dependency install and build match final workspace hashes. Sandbox-only esbuild EPERM resolved outside sandbox. |
| Production Lighthouse | PASS | 12.8.2: mobile97/100/100 and desktop100/100/100 performance/accessibility/best practices. Lab measurements, not field guarantees. |
| Repository and handoff | PASS | JavaScript only; no apparent secrets/debug/dead controls; original image/vector provenance; README updated with run/audit/root-host instructions and honest demo semantics. |
| Optional broader validation | NOT VERIFIED | Firefox/Safari, physical devices, screen reader, full WCAG certification, live Maps content, public hosting and nested-path deployment. No claims made for these. |

Final verdict: **READY FOR PORTFOLIO DELIVERY** as a static portfolio demo at a host root. No code changes or feature work remain in the approved five-milestone scope.
