# Milestone 5 — Final calibration and delivery

2026-11-10. **PASS — READY FOR PORTFOLIO DELIVERY** as a static, nontransactional demo at a host root. No public deployment was performed. All five implementation milestones are complete; optional platform/field checks below remain unverified.

## Changes and accepted findings

| Finding | Severity | Action and observed result |
| --- | --- | --- |
| Headings/product names looked lighter than the reference because only regular local fonts were registered with synthesis disabled. | Medium | Registered real local Nimbus Roman/Sans bold faces. Restored the mobile menu heading’s two-line wrap with a 15ch measure. Final desktop/mobile captures and independent spec review PASS. |
| New axe runner omitted WCAG 2.2 tags. | Low | Included `wcag22aa` with WCAG 2.0/2.1 A/AA and best-practice tags. All eight final scans report zero violations. |
| Selected category briefly showed white text on a light intermediate background during animation (axe measured 3.73:1). | Medium | Removed background-color interpolation; kept the border transition. All normal/reduced-motion scans now PASS; settled selected color measures at least 5.17:1. |
| Featured menu used an aria-label on an unnamed generic div, reported by axe as needing review. | Low | Added `role="region"`; no remaining aria-prohibited-attr review item. |
| Final keyboard script waited on unloaded lazy images. | Low, test harness | Scroll to footer before decoding images, then return to top. Final run completes all four journeys. |

No new features, runtime dependencies or image assets were introduced. Existing responsive imagery already meets the measured performance target, so further compression/preloading suggestions were retained as optional optimization rather than degrading crops.

## Final visual discrepancy ledger

Actual reference: `../coffee_corner_design.png`, desktop panel and phone interior only. Production Chrome screenshots: [1440 full](evidence/milestone-5/regression-4/1440-full.jpg), [390 full](evidence/milestone-5/regression-4/390-full.jpg). Section captures live in `regression-3/` (hero/menu) and `regression-4/` (story/location/CTA/footer). Additional full-page captures cover 1280/768/375/320 px.

| Section | Desktop / mobile observation | Disposition | Status |
| --- | --- | --- | --- |
| Header | Light horizontal brand/navigation bar; compact brand and expandable mobile navigation. No device chrome. | Original vector mark and platform font metrics differ in detail, as intended. | PASS |
| Hero | Dark full-bleed café, large right-side cup, bold two-line heading and paired buttons; mobile cup sits below readable copy. Desktop angled seam retained. | Original scene differs from reference; focal point, palette and hierarchy retained. | PASS |
| Menu | Four desktop cards; compact mobile rows, scrollable category strip and two-line heading. All products/prices retained. | Bold-face discrepancy and mobile wrap resolved. | PASS |
| Story | Forest-green angled desktop band, copy left/photo right and three benefits below; mobile photo first with stacked benefits. | Original café photo; no major unexplained layout mismatch. | PASS |
| Location | Heading above contact/map columns; mobile map precedes contact details. | Original abstract map and visible sample labels intentionally replace precise cartography. | PASS |
| CTA | Full-bleed warm photograph, branded cup on right and text on left; compact centered mobile block. | Subject differs, composition retained; photo fills the section at 320 px. | PASS |
| Footer | Four desktop columns and stacked mobile layout, light logo, social icons and newsletter field. | Honest demo labels add small text; legal/social labels remain noninteractive. | PASS |

Real-browser captures were inspected after the fixes at 1440/390, plus 320/768 reflow/section crops. Independent art review confirmed no material wrapping, clipping, composition or reflow regression. No pixel-identical claim is made.

## Verification and environment

Linux; Node **24.21.0**, npm **11.19.0**, Vue **3.4.35**, Vite **5.3.5**, Playwright **1.62.1**, Chrome **157.0.8103.38**, axe-core **4.10.3**, Lighthouse **12.8.2**. All browser tests use the production preview at `http://127.0.0.1:4173/`.

| Check | Observed evidence | Status |
| --- | --- | --- |
| Production build | 34 modules; CSS 16.97 kB / gzip 4.46; JS 72.49 kB / gzip 28.69. [Build/setup record](evidence/milestone-5/build-and-setup.txt). | PASS |
| Fresh dependency tree and build | Temporary copy excludes dependencies/build output. `npm ci --offline --no-audit --no-fund` installs 38 packages from npm cache; final build hashes match workspace. Initial sandbox EPERM resolved by rerunning outside sandbox. | PASS |
| Header/hero/menu regression | All 15 checks; six viewports, categories, Full Menu, keyboard/touch navigation, reduced motion and focus. [Results](evidence/milestone-5/regression-3/verification.json). | PASS |
| Story/location/CTA/footer regression | All 15 checks; six viewports, sample directions popup, native email validation, no submission/storage, anchor targets, focus/contrast. [Results](evidence/milestone-5/regression-4/verification.json). | PASS |
| Missing assets/overflow/runtime | Exact viewport-matched scrollWidth at 320/375/390/768/1280/1440; no broken images, console errors or failed requests. | PASS |
| Automated accessibility | Eight initial/expanded scans across 1440/390 and normal/reduced motion, zero violations. [Raw axe reports](evidence/milestone-5/). | PASS |
| Keyboard/reduced motion | Four complete clean-context keyboard-only journeys; visible outlines, native controls, skip link, return to top and reduced-motion scrolling. [Rehearsal](evidence/milestone-5/rehearsal.json). | PASS |
| Contrast requiring manual review | Axe flags photo/pseudo-element backgrounds, clipped offscreen category labels, and decorative arrow glyphs as incomplete. Reviewed actual screenshots; photo copy remains legible. Solid colors measured separately in regression 4. Hidden category labels are reachable via horizontal scroll/keyboard. | PASS for scoped visual/manual review |
| Full WCAG certification / screen reader | Automated scans and visual inspection do not establish complete WCAG conformity; no screen-reader session. | NOT VERIFIED |
| Lint/typecheck | No configured command; JavaScript source. `git diff --check` passes, but no lint/typecheck result is claimed. | NOT VERIFIED |

### Lighthouse production lab measurements

| Preset | Performance | Accessibility | Best practices | FCP | LCP | TBT | CLS | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile, simulated throttling, 412×823 / DPR 1.75 | 97 | 100 | 100 | 1.1 s | 2.6 s | 0 ms | 0 | PASS |
| Desktop, 1350×940 / DPR 1 | 100 | 100 | 100 | 0.3 s | 0.6 s | 0 ms | 0 | PASS |

Final runs: 12:17:54 and 12:18:04 UTC. [Mobile report](evidence/milestone-5/lighthouse-mobile.json), [desktop report](evidence/milestone-5/lighthouse-desktop.json). Reports retain machine-readable audits but omit embedded screenshot data to reduce repository weight. Scores reflect one local lab run per preset, not field performance. Residual image-sizing and LCP discovery suggestions are nonblocking; the target is ≥90 in all three categories.

Reproduce with an external installation of the recorded tools:

```sh
CHROME_PATH=/usr/bin/google-chrome lighthouse http://127.0.0.1:4173 --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,best-practices --output=json --output-path=/tmp/mobile.json
CHROME_PATH=/usr/bin/google-chrome lighthouse http://127.0.0.1:4173 --chrome-flags='--headless --no-sandbox' --preset=desktop --only-categories=performance,accessibility,best-practices --output=json --output-path=/tmp/desktop.json
```

## Independent final review

**Standards:** one Low finding (WCAG 2.2 audit tags), fixed. Whole-repository inspection found no TypeScript, apparent secrets/private keys, production debug statements, dead `href="#"` controls, phone-frame UI or material code smell. Production assets total about 1.8 MB; largest raster is 225,783 bytes. Original photo/vector provenance is recorded in the asset manifest. Extra SVG variants are the documented deliverable brand kit. No unlicensed third-party photo/font was introduced.

**Spec/art direction:** one Medium finding (missing real bold faces), fixed and independently re-reviewed against final 1440/390/320/768 captures. No unresolved acceptance-critical visual/spec finding remains. Earlier gates are covered by the 30 regression checks and original-asset/provenance inventory.

## Final critical-path rehearsal

Four fresh browser contexts: 1440×900 and 390×844, each normal and reduced motion. Every journey uses Tab/Shift+Tab/Enter to activate the skip link, View Menu, Cold Drinks, Full Menu open/close, About, Location, sample directions, local newsletter and brand return to top. All four PASS, with no console/network failures. Newsletter acknowledgement and full-page captures are retained beside [rehearsal.json](evidence/milestone-5/rehearsal.json). Directions are fulfilled locally after observing the actual popup URL; live provider content is **NOT VERIFIED**. No real order or subscription was attempted.

## Final readiness

| Requirement | Evidence | Status | Required action |
| --- | --- | --- | --- |
| Vue 3 JavaScript stack | Vue SFCs, package lock, production build; no authored TS. | PASS | None. |
| Desktop/mobile fidelity | Final section ledger and independent art review; actual reference and browser captures. | PASS | None. |
| 320–1440 px reflow | Six-width regressions and screenshots; no horizontal document overflow. | PASS | None. |
| Original imagery | Seven generated scenes, optimized responsive sources and provenance manifest. | PASS | None. |
| Original vector logo | Original SVG lockups/marks/favicon, desktop/mobile rendered evidence. | PASS | None. |
| Interaction truthfulness | Local menu/navigation/newsletter; sample location and decorative destinations clearly described. | PASS | None. |
| Accessibility acceptance checks | Zero automated violations; keyboard, targets, focus, reduced motion and scoped contrast review. | PASS | None for measured scope. |
| Production build | Final Vite build and matching clean-copy build hashes. | PASS | None. |
| Performance target | Mobile 97/100/100; desktop 100/100/100, production Lighthouse. | PASS | None. |
| Clean setup | Fresh dependency installation/build from temporary copy using lockfile. | PASS | None. |
| Portfolio documentation | README commands, sample semantics, provenance, evidence, root-host handoff and limitations. | PASS | None. |
| Additional browser/device/screen-reader coverage | Firefox/Safari, physical devices and screen reader not exercised. | NOT VERIFIED | Optional follow-up before claiming broader coverage. |
| Live Maps/public deployment | External destination tested by local interception; root hosting instructions only. | NOT VERIFIED | Verify on chosen host/provider before claiming deployment. |

**Verdict: READY FOR PORTFOLIO DELIVERY.** All acceptance-critical checks pass and no material reference discrepancy remains. Full WCAG certification, cross-browser coverage, field performance and public hosting are not claimed. Serve at host root; nested-path hosting needs dynamic menu image URL changes and revalidation.
