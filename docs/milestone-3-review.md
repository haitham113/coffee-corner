# Milestone 3 — Header, hero and menu

Implemented and reviewed on 2026-11-10. Scope is Milestone 3 only. Story, location, CTA and footer remain the Milestone 1–2 foundation, not finished delivery sections.

## Implementation

- Desktop navigation and an original responsive brand lockup; mobile navigation disclosure with Escape/focus return, outside click, focus exit and resize cleanup.
- Full-bleed original hero photograph, desktop diagonal section edge, responsive photo composition, serif heading, View Menu and Find Us anchor actions.
- Five working category buttons. Coffee intentionally retains the four mixed reference products. Breakfast offers the existing croissant/cappuccino pairing and More offers an extra shot; these are sample menu entries, not new unrelated product images.
- Desktop four-card menu, tablet two-card layout, mobile product rows, real prices/descriptions and a local Full Menu disclosure. The disclosure has no modal focus trap; focus stays on its toggle.
- Order Now scrolls to the sample menu. No checkout, order submission or remote service exists.

## Verification (Prompts 3 and 3A)

`npm run build` — PASS, Vite 5.3.5, 34 modules. Final output: CSS 10.51 kB (3.13 kB gzip), JS 67.05 kB (26.61 kB gzip). No test runner, linter or typechecker was present in the baseline; JavaScript-only Vue compilation and meaningful browser behavior checks were used.

`BASE_URL=http://127.0.0.1:4173 PLAYWRIGHT_MODULE=<existing-playwright-module> CHROME_PATH=/usr/bin/google-chrome node scripts/verify-milestone-3.mjs` — production preview. Chrome 157.0.8103.38 with Playwright. The machine-specific module path is intentionally supplied through the environment instead of adding a production dependency. Full observed output is in [verification.json](evidence/milestone-3/verification.json).

| Gate | Status | Evidence |
| --- | --- | --- |
| Build | PASS | Production compilation above. |
| 320/375/390/768/1280/1440 px reflow | PASS | Each viewport's document scroll width equals viewport width; no broken images. Width-specific `*-full.jpg`, `*-hero.jpg` and `*-menu.jpg` captures. |
| Navigation and hero actions | PASS | Home, About, Location, View Menu, Find Us and Order Now reach existing anchors. |
| Mobile navigation | PASS | Keyboard open/tab, Escape and focus return, outside click, focus exit, navigation selection and resize closure. See `mobile-navigation.jpg`. |
| Categories | PASS | All five views, repeated selection, keyboard Space, one pressed category at a time, expected product content. |
| Full Menu | PASS | Six local items, keyboard Enter/repeated opening and closing, expanded state, focus retained and explicit demo copy. See `full-menu-expanded.jpg`. |
| Touch simulation | PASS | Mobile navigation, categories and Full Menu tested with mobile/hasTouch browser context. Physical device testing NOT VERIFIED. |
| Touch targets | PASS | Scoped toggle/category/action controls measured at least 44 px tall at 320 px. |
| Focus and reduced motion | PASS | Keyboard focus has 3 px solid outline; reduced motion selects instant scrolling and 0.00001 s transitions. |
| Runtime/assets | PASS | No console errors, failed network responses/requests or broken images in the production browser run. Responsive hero uses portrait source on mobile, 960 px at tablet and 1600 px on desktop. |
| Firefox/Safari, screen reader and automated WCAG audit | NOT VERIFIED | Chromium keyboard/DOM and visual review completed. Cross-browser and broader accessibility/performance audits remain part of final delivery. |

The first automated run recorded failures in the test harness, retained in `verification-first-run.json`: an outside-click target was covered by the open dropdown, the Menu anchor selector also matched Order Now, and keyboard focus was inspected while the browser was still in pointer mode. Corrected the actual test actions/selectors, verified keyboard focus with keyboard input, and reran against the production build. All final checks pass; no application fix was inferred from those harness failures.

## Visual comparison and discrepancy ledger

Inspected `coffee_corner_design.png` directly and compared the desktop panel and phone interior with the actual browser captures, excluding the phone frame. These are composition comparisons, not claims of pixel identity. Primary evidence: [desktop](evidence/milestone-3/1440-full.jpg), [mobile hero](evidence/milestone-3/390-hero.jpg), [mobile menu](evidence/milestone-3/390-menu.jpg). Additional widths provide reflow evidence.

| Finding | Severity | Action and recapture result | Status |
| --- | --- | --- | --- |
| Foundation hero placed a separate image beside text | High | Replaced with full-bleed photo and readable overlay, matched large two-line serif hierarchy and right-weighted cup. Desktop capture compared with reference. | PASS |
| First mobile crop placed the cup behind action buttons | Medium | Lowered the foreground crop, blended its top, and used an enlarged café backdrop from the same original image; cup now below actions with no hard image seam or duplicate cup. Inspected 320 and 390 px hero captures. | PASS |
| Desktop hero/menu seam was straight | Low | Added the reference's shallow diagonal edge and calibrated the overlapping section space; recaptured desktop. | PASS |
| Tablet description extended across the bright cup | Medium | Limited desktop/tablet hero copy to 58% of container, leaving the original mobile override. Recaptured 768 px and repeated regressions. | PASS |
| Menu foundation had placeholder lines and no controls | High | Replaced with named/priced cards, category controls and Full Menu; desktop four-card grid and mobile rows now follow reference. | PASS |
| Photographs and logo differ in detail from the supplied reference | Low | Justified: the spec requires original generated images and vector branding. Retained reference palette, subject placement, wording and visual hierarchy. | PASS |
| Exact reference font files are unavailable | Low | Retained licensed system/fallback serif and sans fonts and calibrated sizes/wraps. The visual is composition-matched, not font-identical. | PASS |
| Lower-page composition remains unfinished | Deferred scope | Milestone 4 owns story/location/CTA/footer. Full-page captures expose their current state without claiming those sections are complete. | NOT VERIFIED |

## Review (Prompt 3B)

The code-review skill's two independent review axes were applied to the scoped source files. Because the application was initially untracked, review inspected the actual files against `AGENTS.md` and the supplied spec rather than claiming a meaningful HEAD diff of an already-committed app.

Standards: PASS, zero actionable findings. Vue/JavaScript, native controls, lifecycle listener cleanup, reduced motion and honest demo behavior conform. No material abstraction/duplication finding.

Spec: one Low finding — stale README wording said ordering controls were absent. Accepted and fixed: README now explains Order Now's local anchor behavior, sample prices, category rules and the local menu disclosure. No Critical/High findings or scope creep.

The focused browser accessibility review exercised actual DOM and behavior: menu closed while crossing the breakpoint, no hidden nav tab stops, Escape restores toggle focus, category buttons retain native keyboard operation and pressed states, and disclosure focus does not enter a trap. The hero/navigation/menu are visually legible in captures. This is not a claim of a complete screen-reader or WCAG audit.

## Fix and revalidation (Prompt 3C)

Accepted all concrete findings above, fixed them, reran the build and production browser regression, and inspected final desktop/mobile/tablet captures. No unresolved acceptance-critical Milestone 3 finding remains. The milestone gate passes; Milestone 4 is next. No lower-page feature was implemented.
