# Milestone 4 — Story, location, CTA and footer

Implemented, verified and reviewed on 2026-11-10. Milestone 4 is complete; final whole-page calibration, fresh-setup and delivery audits remain Milestone 5.

## Changes

- Story: completed community/sustainability copy and three icon benefits; layered desktop interior image, readable bottom overlay, shallow section edges and an image-first mobile card.
- Location: reference address, hours, phone and email as plain sample text; original illustrative SVG map; visible sample-data note and explicitly labeled new-tab maps search.
- CTA: original photograph displayed full-bleed with the original vector wordmark on its cup, readable overlay, local Order Now menu anchor and compact mobile composition.
- Footer: brand/copy, desktop quick links, noninteractive social icons and legal labels, native email validation and an explicitly local newsletter preview. Success says: “Demo checked locally. No subscription was sent or saved.” Editing clears that message. No network submission, backend or storage code was introduced.
- Added `scripts/verify-milestone-4.mjs`. The previous script now accepts `EVIDENCE_PATH` so new regression captures preserve the earlier milestone's evidence. Updated README and asset manifest.

## Verification — Prompts 4 and 4A

`npm run build`: PASS, Vite 5.3.5, 34 modules; CSS 16.77 kB (4.44 kB gzip), JS 72.48 kB (28.69 kB gzip).

Production preview: `http://127.0.0.1:4173/`; Chrome 157.0.8103.38, Playwright headless. Test scripts accept a local Playwright installation or an existing module through `PLAYWRIGHT_MODULE`, plus `CHROME_PATH` when needed. No runtime dependencies were added.

```sh
BASE_URL=http://127.0.0.1:4173 node scripts/verify-milestone-4.mjs
BASE_URL=http://127.0.0.1:4173 EVIDENCE_PATH=docs/evidence/milestone-4/regression node scripts/verify-milestone-3.mjs
```

| Check | Status | Observed evidence |
| --- | --- | --- |
| Production compilation | PASS | Build above. |
| New-section browser suite | PASS | All 15 checks in [verification.json](evidence/milestone-4/verification.json). |
| Earlier-section regression suite | PASS | All 15 checks in [regression/verification.json](evidence/milestone-4/regression/verification.json). |
| 320/375/390/768/1280/1440 px | PASS | Document scroll width equals viewport width, no broken images and CTA photo bounds cover the section. Per-width full-page JPG captures retained. |
| Mobile ordering | PASS | Measured story photo before story copy; map before contact details. Desktop map is right of contact details. |
| Sample details and presentation | PASS | Exact reference contact values present as text; no `tel:`, `mailto:`, `href="#"`, social or legal dead links. Map caption identifies illustration/sample location. |
| Directions | PASS | Clicking opens a new tab at the Google Maps search URL with the exact sample address query and `noopener noreferrer`. The link announces sample search/new tab and references the sample-data note. |
| Live maps result/storefront | NOT VERIFIED | The external destination was fulfilled locally in the test to inspect navigation without relying on or claiming a real result. No verified pin or coordinates are claimed. |
| Empty/invalid newsletter | PASS | Native required/type-mismatch validation, with no success message. See `newsletter-invalid.jpg`. |
| Valid newsletter | PASS | Enter submits locally; exact demo acknowledgement appears with zero new requests and zero local/session storage entries. Input edits and page reload clear the message. See `newsletter-valid.jpg`. |
| CTA/footer navigation | PASS | CTA menu action and all four desktop footer anchors reach existing page sections. Prior hero/header/menu critical paths also pass. |
| Keyboard/touch | PASS | At 320 px the new links, input and submit button have visible 3 px focus outlines, at least 44 px height and viewport-contained bounds. Mobile-touch newsletter/CTA paths pass. Reduced-motion scrolling is instant. |
| Solid-color contrast | PASS | Measured at least 5.17:1 for sampled new text/controls; exact foreground/background ratios are in verification JSON. Photographic overlays were additionally inspected visually, not certified by solid-background calculations. |
| Runtime/network/assets | PASS | No console errors, failed requests/responses or broken images observed. |
| Firefox/Safari, physical device, screen reader, full automated accessibility/performance audits | NOT VERIFIED | These checks were not performed in Milestone 4; broader audits remain Milestone 5. |

## Visual comparison and discrepancy ledger

Inspected the supplied `coffee_corner_design.png` and compared actual browser screenshots with the desktop panel and phone interiors, excluding the frame. Final primary captures: [desktop](evidence/milestone-4/1440-full.jpg), [mobile](evidence/milestone-4/390-full.jpg). Section captures also cover 320/390/768/1440 px. This is a reference-relative composition assessment, not a pixel-identity claim.

| Finding | Severity | Accepted action and final observation | Status |
| --- | --- | --- | --- |
| Story foundation lacked full copy and benefits | High | Completed copy/icons; placed image right on desktop and first on mobile, with corresponding heading hierarchy and dark-green field. | PASS |
| Desktop Cozy Atmosphere text crossed bright photo | Medium | Added a lower-image gradient; final `1440-story.jpg` shows light benefit text against a darkened photograph while preserving the interior scene. | PASS |
| Location foundation was an empty placeholder | High | Added original map, details and directions; desktop contact/map columns and mobile map-first order match the reference. | PASS |
| Narrow CTA had a photograph coverage gap | Medium | Review identified approximately 48 px of uncovered background at 320 px. Set the mobile photo canvas to at least 672 px width. Final measured image height is 288.109 px versus 288 px section height; final `320-cta.jpg` confirms coverage. | PASS |
| CTA was split text/image rather than photographic backdrop | High | Reused original photo full-bleed and overlaid the real vector lockup within the photo's coordinate system. Final desktop and mobile crops preserve cup branding. | PASS |
| Footer placeholders and absent form | High | Completed reference-like four-column desktop / stacked mobile composition, newsletter field, icons and legal presentation with honest behavior. | PASS |
| Map differs from reference's real-cartography appearance | Low | Justified by requirement for original lightweight map and no false precise geography: abstract streets/river/parks retain the visual vocabulary; caption explicitly identifies illustration. | PASS |
| Sample-data and demo labels add a little height | Low | Required for honest interactions. Kept notes compact while preserving visual hierarchy. | PASS |
| Exact photos, logo geometry and font files differ | Low | Original imagery/vector mark are required. Existing documented system serif/sans choices retain reference hierarchy and wraps. Final whole-page calibration remains Milestone 5. | PASS |

## Focused review — Prompt 4B

Used the code-review skill's independent Standards and Spec axes on the diff from `527987b` and the new SVG. Standards found one Medium CTA coverage issue; accepted and fixed as above. No Critical/High findings or material code smells. Spec found no additional actionable application issue; confirmed sample contacts/maps, local form, decorative social/legal presentation and absence of scope creep.

Both reviewers inspected final screenshots and verification results. Standards confirmed CTA coverage and readability; Spec confirmed corrected desktop story overlay and desktop/mobile ordering. No acceptance-critical Milestone 4 finding remains.

## Fix and revalidation — Prompt 4C

Completed the accepted gradient/coverage corrections, rebuilt, ran both production browser suites, and inspected final desktop/mobile/tablet section captures. All 30 browser checks pass. No Milestone 5 task was marked complete. The checkpoint commit is `feat: complete CoffeeCorner story location and footer milestone`.
