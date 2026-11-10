# CoffeeCorner — Sequential Implementation and Review Prompt Pack

Use this file together with the original `coffee_corner_design.png` attachment. Supply **the image itself** to every Codex session that performs visual work; this document is not a substitute for inspecting it. The reference is an 836 × 1881 composite: the desktop design occupies the left portion and the phone mockup at right shows the intended mobile page. Reproduce the **site inside** the phone, not its black device frame, notch, or the white presentation canvas between the views.

**Source of truth, in order:** (1) the user's brief and acceptance criteria; (2) the attached visual for layout, imagery, copy, colors, hierarchy, desktop/mobile composition; (3) the concrete decisions in the specification below; (4) existing repository instructions (`AGENTS.md`) and working code, if a repository is provided. Where a technical instruction conflicts with an explicit user requirement, preserve the user requirement and report the conflict. This playbook controls execution, not product appearance.

**Classification:** greenfield portfolio/demo website. If the target repository already has a working application, Prompt 0 must inventory it and adapt the milestones to a minimal delta without overwriting unrelated work. No target CoffeeCorner repository was supplied with this planning request.

## Product specification and client decisions

### Goal and scope

Build one polished, responsive, single-page coffee shop showcase named **CoffeeCorner** in **Vue 3 with JavaScript, not TypeScript**, using Vite and a minimal dependency set. The visible brand in the supplied design is **Brew & Co. / Specialty Coffee**; keep that on the page for visual fidelity, while naming the project, package, README, and portfolio case study CoffeeCorner. This resolves the naming mismatch without silently redesigning the reference. No backend, checkout, user account, content management, payment, or live newsletter service is in scope.

The page sections, in order, are: white header; immersive coffee hero; white menu showcase; dark green story; white location/contact; photographic call to action; dark footer. Desktop uses a wide, editorial layout. Mobile is a real responsive reflow matching the phone interior in the reference: condensed header with menu button, vertically composed hero, compact menu controls and stacked product rows, image-led story with stacked benefits, map above contact details, compact CTA, and a multirow footer. Do not render the desktop and mobile screenshots as page backgrounds or as a single flattened image.

### Visible content and visual anchors

| Area | Reference details to preserve | Expected behavior |
| --- | --- | --- |
| Header | Coffee-cup mark, Brew & Co. wordmark and small SPECIALTY COFFEE subtitle; Home, Menu, About, Location; warm-brown rounded Order Now button | Anchor navigation. Mobile menu button opens/closes a keyboard-accessible navigation panel. |
| Hero | Dark, atmospheric café photograph with large latte in foreground; small `GOOD COFFEE · BETTER DAYS`; serif `More Than Just Coffee`, with Coffee in caramel; supporting sentence; filled View Menu and outlined Find Us | Buttons scroll to `#menu` and `#location`. No fake ordering checkout. |
| Menu | `OUR MENU`, `Crafted for Every Moment`; category controls Coffee, Cold Drinks, Pastries, Breakfast, More; four pictured featured items: Espresso $3.00, Cappuccino $4.50, Iced Latte $4.75, Croissant $3.50; View Full Menu button | Working category selection and sensible content for every control. Default Coffee view must retain the four mixed featured items shown in the reference. Full Menu exposes all demo items locally, such as a lightweight accessible dialog or expanded section. Avoid dead controls. |
| Story | Deep forest green background, café interior photograph, `OUR STORY`, `A Neighborhood Coffee Shop with a Bigger Purpose`, short sustainability/community copy, three icon benefits: Specialty Beans, Fresh & Local, Cozy Atmosphere | Desktop image/text composition and mobile image-first card. Benefits retain text alternatives. |
| Location | `OUR LOCATION`, `Visit Us`, brief sentence, address `123 Coffee Street, Cairo, Egypt`, hours Mon–Fri 7:00 AM–9:00 PM; Sat–Sun 8:00 AM–10:00 PM, phone `+20 123 456 7890`, email `hello@brewandco.com` as visible reference copy, stylized map and Get Directions | Reference contact data are **sample portfolio content**, not verified business details. Keep visible reference copy as plain text rather than linking to unverified contact destinations. Directions open a clearly labeled maps search for the sample address; do not claim a verified pin or precise coordinates. |
| CTA/footer | Hand holding a branded takeaway cup; `GOOD COFFEE AWAITS`, `Ready for Your Next Favorite Cup?`, Order Now; dark footer with brand, brief copy, quick links, social icons, newsletter field, legal text | Order Now scrolls to the menu and is described as a portfolio demo in README. Unknown social/legal destinations are decorative or omitted as interactive controls; never use `href="#"`. Newsletter must not claim a subscription was sent. Either label it as an interactive demo with local-only confirmation or connect a real service only if explicitly provided later. |

The screenshot is a **composition reference, not a pixel-perfect export of usable source assets**. Record approximate type scales, section heights, spacing, color values, image crops and breakpoints by inspecting it, then calibrate against rendered browser screenshots. The image's desktop panel is presentation-scaled and the right phone is a mockup; do not assume 639 px is the actual intended desktop viewport or 197 px is the intended phone viewport. Establish comparison viewports from equivalent aspect/layout proportions (initial targets: 1440 × 900 desktop, 390 × 844 mobile; also 1280, 768, 375 and 320 px widths). Keep original reference crops in an `assets/reference/` folder if repository permissions permit, solely for internal visual comparison; do not display them as the finished UI.

### Assets and branding

Generate original, cohesive café imagery for: hero latte/café scene; individual Espresso, Cappuccino, Iced Latte and Croissant cards; story interior; takeaway-cup CTA. Keep consistent warm amber light, deep browns, forest green, natural materials and editorial photography. Aim for the reference's framing and negative space, not unrelated generic coffee art. The hero's cup must sit on the right on desktop and remain readable under mobile text; produce separate crops/variants if needed. The branded cup photograph may require a clean generated cup plus a composited vector mark rather than unreliable generated text. Do not lift photography or the provided screenshot into production assets. Export optimized WebP/AVIF with sensible responsive sources and fallback, descriptive filenames, known dimensions and crop/focal point notes. The map should be an original lightweight stylized SVG or a correctly attributed map implementation; no false precise cartography.

Create an attractive, original **vector** coffee-cup logo and responsive lockups consistent with the reference's cup/wordmark pairing. It should work at small header/mobile sizes, with an accessible text equivalent, strong dark/light variants, and a favicon. Avoid a generic unedited icon or unreadable AI-rendered lettering. Reproduce the brand wording with actual text/vector typography. Generated concepts may guide the mark, but finalize a clean SVG manually.

### UX, engineering, and proof

- Use semantic landmarks, clear heading order, keyboard-operable menu/categories/dialog, visible focus, suitable text alternatives, sufficient contrast without losing the reference palette, touch targets near 44 px, reduced-motion support, and no horizontal overflow at 320 px.
- Use fluid layout, deliberate breakpoints, `clamp()` where helpful, responsive images and focal points. Preserve recognizable typography, content order, hero and CTA legibility, cards, footer hierarchy, and mobile spacing. Support Chrome, Firefox, Safari where testable.
- Prefer a serif display face close to the reference and a clean sans for body; license fonts or use reliable fallbacks. Centralize design tokens. Use Vue SFCs in JavaScript (`<script setup>`), simple local data for menu items, and native controls; no TypeScript or needless state library/router.
- Provide lightweight, purposeful transitions on navigation, controls, and reveal only if they complement the reference; respect `prefers-reduced-motion`. Avoid layout shift and decorative motion that blocks use.
- Accessibility target: WCAG 2.2 AA on controls and essential content, with documented exceptions only if the reference and contrast requirements genuinely conflict. Validate with automated checks and manual keyboard/reflow inspection.
- The site is a public portfolio demo. Provide a concise README with install/run/build commands, design provenance, sample-data disclaimer, interaction semantics, image attribution/generation notes, and screenshot comparison workflow. Avoid claims of real orders, mailing-list storage or live business details.
- Performance target on a representative production build: no broken images, reasonable responsive image sizes, lazy-load below-fold assets, stable image boxes, no console errors, and Lighthouse mobile performance/accessibility/best-practices scores at least 90 where a repeatable Lighthouse run is available. Report environment and actual scores; do not fabricate a PASS if unavailable. Visual fidelity and usability take priority over chasing a score through compromised design.

### Visual acceptance protocol

For each visual section: inspect the attached image, capture actual browser screenshots at the selected desktop/mobile widths, compare side by side or by aligned crops, log discrepancies, correct the highest-impact mismatches, and repeat. Compare **page interior only**, not the device frame. Inspect hero/café asset framing, typography and line wraps, section order/heights, color blocks, menu composition, desktop card grid, mobile rows, story photo, map/contact ordering, CTA and footer. A raw pixel-diff score is not a reliable acceptance test for newly generated photos or anti-aliasing; use it as a diagnostic only. Completion requires a human-readable discrepancy ledger with every major mismatch resolved or explicitly justified. Never claim “identical” from code inspection alone.

## Working Method

Run Prompt 0, inspect the plan, then Prompt 0A and adopt justified corrections. For each milestone: run its Implement prompt; inspect changed files; run its non-mutating Verify prompt; run its focused non-mutating Review prompt; accept or reject findings with reasons; run Fix only for accepted findings; rerun the gate; commit verified work; proceed to the next milestone. A failed or unobserved gate blocks progression unless the owner explicitly accepts a non-spec-breaking limitation. Pass the reference image and this complete file into fresh Codex sessions. Keep a short evidence log with screenshots, commands, versions and findings. These prompts authorize staged implementation **when used later**; generating this file does not implement the website.

### Status tracking

Every milestone and prompt heading carries one status flag:

- `[🟢 COMPLETE]` — the prompt has been executed and its required report or evidence has been recorded.
- `[🟡 IN PROGRESS]` — work has started, but one or more required actions or evidence items remain.
- `[🔴 BLOCKED]` — work cannot continue until a named prerequisite or environment limitation is resolved.
- `[⚪ NOT STARTED]` — no work has begun.

A milestone may be marked `[🟢 COMPLETE]` only when **every prompt belonging to that milestone is `[🟢 COMPLETE]` and the milestone gate is satisfied**. A verification prompt can finish with `FAIL` or `NOT VERIFIED`, but the milestone remains incomplete until its gate passes or the owner explicitly accepts a non-spec-breaking limitation. A fix prompt is complete when accepted findings have been fixed and revalidated, or when the completed review explicitly records that no changes are required. Update the heading flags and Milestone Gates status column at the end of every run.

Status reconciliation is mandatory bookkeeping and is the sole permitted edit when a verification or review prompt otherwise says “Modify nothing.” At the end of **every prompt**, update that prompt heading from its current flag to the status supported by the result: `COMPLETE` when all requested work and reporting are finished, `IN PROGRESS` when required work remains but can continue, or `BLOCKED` when a named prerequisite prevents continuation. Then inspect every prompt under the current milestone and recompute the parent milestone: mark it `COMPLETE` only when all child prompts are `COMPLETE` and the milestone gate passes; otherwise mark it `IN PROGRESS`, or `BLOCKED` when progress cannot continue. Keep the Milestone Gates table synchronized with the parent heading.

## Global Rules

1. Read the attached image, this specification, `AGENTS.md` if present, and existing code before editing. Preserve unrelated working behavior. Use the declared Vue/JavaScript stack and repository conventions.
2. Work only on the active milestone. Do not pull later features into an earlier step. Keep dependencies minimal; do not add backend, authentication, routing, payment, analytics or third-party map SDK without an actual requirement.
3. Give each interactive control a real, honest outcome. Never imply a payment, newsletter subscription, verified location or business contact succeeded when it did not.
4. Run checks in a real browser where layout or browser interaction is at stake. Verification and review prompts must not edit files. Use exactly `PASS`, `FAIL`, `NOT VERIFIED`; record actual output and evidence, with `NOT VERIFIED` when tools or an environment are absent.
5. After implementation/fixes report files changed, decisions, commands and observed results, limitations, remaining risks, documentation changes, and a suggested Conventional Commit. Do not include secrets, licensed third-party assets without rights, debug data or source screenshot as a production image.
6. Carry forward earlier visual, accessibility and interaction checks after changes that could affect them. Use the smallest correct fix before expanding scope.

## Milestone Gates

| Milestone | Status | Gate before continuing |
| --- | --- | --- |
| 0. Plan | 🟢 COMPLETE | Repository state, asset approach, visual comparison viewports, component/data map, risks and exact build order are documented; no code changed. |
| 1. Foundation and design system | 🟢 COMPLETE | Vue JavaScript app starts and builds; responsive shell and semantic section skeleton display without overflow at 320/390/768/1440 px; tokens, typography and comparison process documented. |
| 2. Original assets and logo | 🟢 COMPLETE | Original logo/favicons and all required optimized images exist, load in the app, have correct crops/text alternatives and provenance; no generated text artifacts or stretched images. |
| 3. Hero and menu | 🟢 COMPLETE | Desktop/mobile header, hero and menu match reference composition closely; all navigation, categories and full-menu behavior work by mouse, touch simulation and keyboard; no misleading Order Now flow. |
| 4. Story, location, CTA and footer | 🟢 COMPLETE | All remaining sections match their desktop/mobile layouts; directions, footer links and newsletter demo behave honestly; focus and contrast remain usable. |
| 5. Visual calibration and delivery | ⚪ NOT STARTED | Full-page desktop/mobile comparison ledger is resolved, regressions pass, production build and fresh setup work, portfolio documentation is accurate, and final readiness table is evidence-based. |

# Milestone 0 — Repository Assessment and Implementation Plan `[🟢 COMPLETE]`

## Prompt 0 — Repository Assessment and Implementation Plan `[🟢 COMPLETE]`

```text
You are preparing CoffeeCorner, a Vue 3 JavaScript-only portfolio site. Read CoffeeCorner_SEQUENTIAL_IMPLEMENTATION_AND_REVIEW_PROMPTS.md in full, inspect the actual coffee_corner_design.png image, inspect AGENTS.md and the target repository. Modify nothing.

Inventory existing code/assets and reusable patterns; identify whether this is greenfield or an existing-system delta. Translate desktop and phone interiors into a section/component tree, menu data model, design tokens, responsive breakpoints, image/variant/crop manifest, logo approach, interaction mapping, and accessibility/performance requirements. Identify likely files and commands without inventing paths that do not exist. Establish comparison viewport/capture protocol and note that the reference panels are presentation scaled.

Propose the five milestone order above or a smaller justified adaptation, commit boundaries, test/browser tools, visual evidence ledger, negative cases, regression checks, documentation and final delivery evidence. Surface contradictions, missing prerequisites and unnecessary dependencies; make the smallest production-quality recommendation. Stop after the written plan. Do not implement or generate assets yet.

Status update: before ending, update the Prompt 0 heading flag based on the actual result. Then inspect Prompt 0 and Prompt 0A, recompute the Milestone 0 heading, and synchronize the Milestone Gates table. Milestone 0 is COMPLETE only when both prompts are COMPLETE and its gate passes.
```

## Prompt 0A — Challenge the Plan `[🟢 COMPLETE]`

```text
Read the CoffeeCorner specification, image and Prompt 0 output. Modify nothing. Act as (1) a senior art director assessing visual fidelity and original asset feasibility, (2) a responsive frontend/accessibility engineer, and (3) a skeptical portfolio client checking whether the demo behaves honestly.

Challenge sequencing, desktop/mobile source interpretation, image generation/cropping, logo legibility, component boundaries, fake controls, contrast, reflow, misleading sample details, regressions and premature infrastructure. Return exactly: Critical changes; Recommended changes; Optional improvements; Scope to cut/defer first; Final recommended order. Cite concrete parts of the reference or repo. No implementation.

Status update: before ending, update the Prompt 0A heading flag based on the actual result. Then inspect Prompt 0 and Prompt 0A, recompute the Milestone 0 heading, and synchronize the Milestone Gates table. Milestone 0 is COMPLETE only when both prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

# Milestone 1 — Foundation and Design System `[🟢 COMPLETE]`

## Prompt 1 — Implement `[🟢 COMPLETE]`

```text
Read the CoffeeCorner specification, attached image, accepted Prompt 0/0A plan, AGENTS.md and repository. Implement Milestone 1 only. Set up or adapt a minimal Vue 3 + Vite JavaScript project. Build semantic header/main/section/footer skeletons and a maintainable component structure. Establish reset, color/spacing/type/button/layout tokens, font loading with fallback, responsive containers and breakpoints; use temporary neutral placeholders sized for later images, with no reference screenshot used as production UI. Document asset slots, target crops, capture viewports and run commands.

Exclude generated assets, detailed hero/menu styling, completed interactions and lower-page polish. Add only checks valuable for build/reflow, and run install, dev server, production build and browser inspection at 320/390/768/1440 px if available. Check horizontal scrolling and console errors. Gate: a JavaScript-only Vue app builds, the semantic section shell follows reference order, and each width reflows without horizontal overflow. Stop after this milestone. Report actual evidence, limitations and suggested commit.

Status update: before ending, update the Prompt 1 heading flag based on the actual result. Then inspect Prompts 1, 1A, 1B and 1C, recompute the Milestone 1 heading, and synchronize the Milestone Gates table. Milestone 1 is COMPLETE only when all four prompts are COMPLETE and its gate passes.
```

## Prompt 1A — Verify `[🟢 COMPLETE]`

```text
Modify nothing. Verify source is Vue 3 JavaScript, not TypeScript; inspect package scripts and build output. Run the app in a browser at 320/390/768/1440 px and observe section order, semantic landmarks, font fallback, overflow and console. Include a negative check for missing asset placeholders and narrow text clipping. Return each gate item as PASS/FAIL/NOT VERIFIED with commands, screenshots/observations and paths. Do not infer visual readiness from build success.

Status update: before ending, update the Prompt 1A heading flag based on the actual result. Then inspect Prompts 1, 1A, 1B and 1C, recompute the Milestone 1 heading, and synchronize the Milestone Gates table. Milestone 1 is COMPLETE only when all four prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

## Prompt 1B — Responsive Foundation Review `[🟢 COMPLETE]`

```text
Modify nothing. As a skeptical responsive/accessibility reviewer, inspect the real DOM and rendered page for incorrect landmarks, heading order, viewport assumptions derived from the composite image, overflow, unreadable text, fragile absolute positioning, excessive dependencies, and poor 320 px reflow. Classify concrete findings Critical/High/Medium/Low with evidence, impact, path and smallest fix.

Status update: before ending, update the Prompt 1B heading flag based on the actual result. Then inspect Prompts 1, 1A, 1B and 1C, recompute the Milestone 1 heading, and synchronize the Milestone Gates table. Milestone 1 is COMPLETE only when all four prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

## Prompt 1C — Fix and Revalidate `[🟢 COMPLETE]`

```text
Fix only the accepted Milestone 1 findings. Preserve the defined visual direction; do not implement future sections or imagery. Rerun build and affected browser-width/landmark checks. Report PASS/FAIL/NOT VERIFIED evidence and any unresolved gate blockers. Stop after Milestone 1.

Status update: before ending, update the Prompt 1C heading flag based on the actual result. Then inspect Prompts 1, 1A, 1B and 1C, recompute the Milestone 1 heading, and synchronize the Milestone Gates table. Milestone 1 is COMPLETE only when all four prompts are COMPLETE and its gate passes.
```

# Milestone 2 — Original Imagery and Brand Assets `[🟢 COMPLETE]`

## Prompt 2 — Implement `[🟢 COMPLETE]`

```text
Read the specification, actual reference image and accepted plan; inspect existing asset slots before editing. Implement Milestone 2 only. Generate original, visually coherent café photos for hero, four menu products, story interior and takeaway-cup CTA. Inspect every output for composition, coffee/food plausibility, artifacts, consistency, legible mobile crops and space for overlay text; regenerate weak images. Optimize/export appropriate responsive formats and note sizes, focal points and alt text. Design an original crisp SVG cup mark, desktop/mobile Brew & Co. lockups, light/dark variants and favicon. Put real assets in the page without completing later section layout. Document generation provenance and intended crops.

Do not reproduce/ship the reference screenshot, use unlicensed stock images, leave AI gibberish on cups, fabricate a geographic map, or start future interactions. Run build; load each asset in the browser at desktop/mobile widths and inspect dimensions, sharpness, missing files and text-overlap risk. Gate: all required original asset slots and vector branding are usable, optimized and documented, with no visible generation defects. Stop after this milestone.

Status update: before ending, update the Prompt 2 heading flag based on the actual result. Then inspect Prompts 2, 2A, 2B and 2C, recompute the Milestone 2 heading, and synchronize the Milestone Gates table. Milestone 2 is COMPLETE only when all four prompts are COMPLETE and its gate passes.
```

## Prompt 2A — Verify `[🟢 COMPLETE]`

```text
Modify nothing. Inventory required files and actual dimensions/weights. Open each original image and SVG at intended rendered sizes; verify photo consistency, hero right-side cup placement, legible mobile crop, product identity, CTA cup/mark, logo small-size clarity, no generated textual artifacts, valid SVG accessibility, no missing requests and no screenshot as production asset. Run build. Return PASS/FAIL/NOT VERIFIED with a per-asset evidence table.

Status update: before ending, update the Prompt 2A heading flag based on the actual result. Then inspect Prompts 2, 2A, 2B and 2C, recompute the Milestone 2 heading, and synchronize the Milestone Gates table. Milestone 2 is COMPLETE only when all four prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

## Prompt 2B — Art Direction and Asset Review `[🟢 COMPLETE]`

```text
Modify nothing. As a critical café brand art director, compare each produced asset and crop with the matching image region of the reference. Flag generic stock-like compositions, implausible products, mismatched lighting, wrong palette, inaccessible logo, poor small-scale lockup, excessive byte sizes and imagery that will obscure copy. Provide severity, evidence, path and smallest fix. Recheck Milestone 1 width/overflow invariants.

Status update: before ending, update the Prompt 2B heading flag based on the actual result. Then inspect Prompts 2, 2A, 2B and 2C, recompute the Milestone 2 heading, and synchronize the Milestone Gates table. Milestone 2 is COMPLETE only when all four prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

## Prompt 2C — Fix and Revalidate `[🟢 COMPLETE]`

```text
Fix accepted Milestone 2 asset/logo findings only; regenerate, recrop or optimize where necessary. Reopen changed assets at intended sizes, rerun build and prior reflow checks. Report exact evidence and remaining limitations. Stop after Milestone 2.

Status update: before ending, update the Prompt 2C heading flag based on the actual result. Then inspect Prompts 2, 2A, 2B and 2C, recompute the Milestone 2 heading, and synchronize the Milestone Gates table. Milestone 2 is COMPLETE only when all four prompts are COMPLETE and its gate passes.
```

# Milestone 3 — Header, Hero and Menu Experience `[🟢 COMPLETE]`

## Prompt 3 — Implement `[🟢 COMPLETE]`

```text
Read the specification, actual image, accepted prior plan, current app and asset manifest. Implement Milestone 3 only: faithful desktop/mobile header and hero; photograph overlay/crops, serif display hierarchy, logo, navigation, mobile menu, scroll targets and CTAs; menu heading/categories, four default reference products, mobile stacked rows, desktop card grid, local data for additional categories, and a working accessible Full Menu expansion/dialog. Keep the CoffeeCorner project name and visible Brew & Co. identity. Add restrained interactive states, focus behavior, escape/outside handling where appropriate and reduced-motion behavior. Make Order Now take the visitor to the menu rather than pretending to transact.

Exclude story/location/footer implementation and external ordering services. Add meaningful tests for category state and mobile-menu/full-menu interactions if project tooling supports them. Run build and browser checks at 320/375/390/768/1280/1440 px, keyboard and touch simulation. Capture the reference-relevant desktop/mobile regions, compare visually, log mismatches and iterate. Gate: reference composition is closely matched and every visible control in these sections works without overflow, trap or fake success. Stop after this milestone.

Status update: before ending, update the Prompt 3 heading flag based on the actual result. Then inspect Prompts 3, 3A, 3B and 3C, recompute the Milestone 3 heading, and synchronize the Milestone Gates table. Milestone 3 is COMPLETE only when all four prompts are COMPLETE and its gate passes.
```

## Prompt 3A — Verify `[🟢 COMPLETE]`

```text
Modify nothing. In a real browser at desktop/mobile target widths, compare header/hero/menu screenshots to the corresponding interiors of the reference. Record image focal points, type wrapping, spacing, colors, desktop grid/mobile rows and menu section height differences. Click and keyboard-test every nav/CTA/category/Full Menu control, including repeated toggling, Escape, focus return, 320 px reflow and reduced motion. Check broken images, console errors and prior asset/overflow gates. Return PASS/FAIL/NOT VERIFIED with evidence and a ranked mismatch ledger.

Status update: before ending, update the Prompt 3A heading flag based on the actual result. Then inspect Prompts 3, 3A, 3B and 3C, recompute the Milestone 3 heading, and synchronize the Milestone Gates table. Milestone 3 is COMPLETE only when all four prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

## Prompt 3B — Interaction and Accessibility Review `[🟢 COMPLETE]`

```text
Modify nothing. Act as a skeptical frontend accessibility specialist. Try keyboard-only navigation, category switching, menu open/close during resize, dialog focus/escape, deep-link targets beneath the header, touch target sizing, insufficient hero overlay contrast and screen reader labels. Review actual behavior and DOM, not only code. Classify findings Critical/High/Medium/Low, with impact, evidence, path and smallest fix.

Status update: before ending, update the Prompt 3B heading flag based on the actual result. Then inspect Prompts 3, 3A, 3B and 3C, recompute the Milestone 3 heading, and synchronize the Milestone Gates table. Milestone 3 is COMPLETE only when all four prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

## Prompt 3C — Fix and Revalidate `[🟢 COMPLETE]`

```text
Fix approved Milestone 3 findings only. Re-run interaction/keyboard tests and desktop/mobile screenshot comparisons, and recheck Milestones 1–2 build, overflow and asset gates. Report actual PASS/FAIL/NOT VERIFIED evidence and unresolved mismatches. Stop after Milestone 3.

Status update: before ending, update the Prompt 3C heading flag based on the actual result. Then inspect Prompts 3, 3A, 3B and 3C, recompute the Milestone 3 heading, and synchronize the Milestone Gates table. Milestone 3 is COMPLETE only when all four prompts are COMPLETE and its gate passes.
```

# Milestone 4 — Story, Location, CTA and Footer `[🟢 COMPLETE]`

## Prompt 4 — Implement `[🟢 COMPLETE]`

```text
Read the specification, reference image and existing implementation. Implement Milestone 4 only. Recreate the dark-green story area with editorial interior image and three benefits; desktop and mobile compositions from the reference; location details and an original stylized map; photographic CTA; and footer with brand, quick links, social presentation, newsletter demo and legal copy. Make Find Us/Location scroll correctly. Get Directions may open a map search for the sample address with an honest accessible label. Display the reference's sample business text while ensuring invalid contact destinations are not clickable. Newsletter must provide local validation and a clearly identified demo-only acknowledgement, with no claim of remote subscription. Do not create dead social/legal links.

Add only meaningful interaction validation, run build, real-browser link/form/keyboard/reflow checks, and desktop/mobile visual comparisons including full-page screenshots. Gate: all sections render and closely match the reference at target widths; working controls are honest and accessible; no broken routes, overflow or console errors. Stop after this milestone.

Status update: before ending, update the Prompt 4 heading flag based on the actual result. Then inspect Prompts 4, 4A, 4B and 4C, recompute the Milestone 4 heading, and synchronize the Milestone Gates table. Milestone 4 is COMPLETE only when all four prompts are COMPLETE and its gate passes.
```

## Prompt 4A — Verify `[🟢 COMPLETE]`

```text
Modify nothing. Compare story/location/CTA/footer against the desktop and phone interiors. Inspect actual mobile order, photo crop, map presentation, contact spacing, footer density, heading hierarchy and CTA contrast. Try every link/button, invalid and valid newsletter input, keyboard focus, sample directions behavior and 320 px reflow. Recheck header, menu and hero critical paths. Report PASS/FAIL/NOT VERIFIED with screenshots/observations and ranked discrepancies. Do not assert a subscription was submitted or a real address was found.

Status update: before ending, update the Prompt 4A heading flag based on the actual result. Then inspect Prompts 4, 4A, 4B and 4C, recompute the Milestone 4 heading, and synchronize the Milestone Gates table. Milestone 4 is COMPLETE only when all four prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

## Prompt 4B — Honest Demo and Responsive Review `[🟢 COMPLETE]`

```text
Modify nothing. Act as a skeptical prospective client and accessibility reviewer. Seek broken or misleading ordering, newsletter, address, phone, email, legal and social interactions; inspect mobile story/map/footer order, contrast, alt text, focus, touch areas and image loading. Classify findings Critical/High/Medium/Low with observed evidence, impact, path and smallest fix. Check regression of earlier desktop/mobile sections.

Status update: before ending, update the Prompt 4B heading flag based on the actual result. Then inspect Prompts 4, 4A, 4B and 4C, recompute the Milestone 4 heading, and synchronize the Milestone Gates table. Milestone 4 is COMPLETE only when all four prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

## Prompt 4C — Fix and Revalidate `[🟢 COMPLETE]`

```text
Fix approved Milestone 4 findings only. Repeat affected desktop/mobile screenshots, link/form/keyboard checks, build and earlier section critical paths. Report PASS/FAIL/NOT VERIFIED evidence, unresolved issues and updated discrepancy ledger. Stop after Milestone 4.

Status update: before ending, update the Prompt 4C heading flag based on the actual result. Then inspect Prompts 4, 4A, 4B and 4C, recompute the Milestone 4 heading, and synchronize the Milestone Gates table. Milestone 4 is COMPLETE only when all four prompts are COMPLETE and its gate passes.
```

# Milestone 5 — Visual Calibration and Portfolio Delivery `[⚪ NOT STARTED]`

## Prompt 5 — Implement `[⚪ NOT STARTED]`

```text
Read the specification, image, current app and accumulated discrepancy ledger. Implement final calibration only. Capture full-page and section-level screenshots at 1440 and 390 px, plus reflow widths 1280/768/375/320. Correct material differences in spacing, line wraps, proportions, picture focal points, transitions and visual rhythm while preserving semantic/accessibility behavior. Make final responsive image/performance refinements. Write concise README and portfolio handoff instructions explaining sample data and nontransactional demo behavior, commands, generated image provenance, visual comparison process and known limitations. Avoid adding features.

Run build, interaction regressions, automated accessibility check if available, manual keyboard/reduced-motion checks, production Lighthouse where available, browser console/network inspection and fresh-install/build verification. Gate: no major unexplained reference mismatch; all required interactions and reflow pass; final documentation and evidence are accurate. Stop after this milestone.

Status update: before ending, update the Prompt 5 heading flag based on the actual result. Then inspect Prompts 5, 5A, 5B and 5C, recompute the Milestone 5 heading, and synchronize the Milestone Gates table. Milestone 5 is COMPLETE only when all four prompts are COMPLETE and its gate passes.
```

## Prompt 5A — Verify `[⚪ NOT STARTED]`

```text
Modify nothing. Perform final real-browser visual audit of all sections at 1440/390 px against the actual reference image, plus 1280/768/375/320 reflow. Report a section-by-section discrepancy ledger and whether each major mismatch is resolved. Run production build, fresh install/build from a clean checkout or temporary copy, keyboard navigation, reduced-motion check, category/menu/full-menu/newsletter/directions paths, missing-image/console/network checks, automated accessibility and Lighthouse when supported. Record actual tool versions, viewports, screenshots, scores and failures. Mark unavailable proof NOT VERIFIED; never infer an 'identical' result solely from code.

Status update: before ending, update the Prompt 5A heading flag based on the actual result. Then inspect Prompts 5, 5A, 5B and 5C, recompute the Milestone 5 heading, and synchronize the Milestone Gates table. Milestone 5 is COMPLETE only when all four prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

## Prompt 5B — Final Art Direction, Accessibility and Repository Audit `[⚪ NOT STARTED]`

```text
Modify nothing. As a critical creative director plus frontend reviewer, judge visual fidelity and quality of the original imagery/logo, browser reflow, accessibility and interaction truthfulness. Inspect the whole repository for TypeScript, secrets, unlicensed assets, debug remnants, dead links, unused files, giant images, misleading README claims and presentation-only phone chrome copied into the live page. Classify Critical/High/Medium/Low findings with visual/behavior evidence, affected path and smallest fix. Include regressions against every prior gate.

Status update: before ending, update the Prompt 5B heading flag based on the actual result. Then inspect Prompts 5, 5A, 5B and 5C, recompute the Milestone 5 heading, and synchronize the Milestone Gates table. Milestone 5 is COMPLETE only when all four prompts are COMPLETE and its gate passes. This status-only edit is permitted despite the read-only instruction.
```

## Prompt 5C — Fix and Revalidate `[⚪ NOT STARTED]`

```text
Fix approved final findings only, without feature expansion. Repeat all affected screenshot comparisons, interaction checks, accessibility/build/fresh-setup checks and earlier gate regressions. Update the discrepancy ledger and README honestly. Report PASS/FAIL/NOT VERIFIED; unresolved Critical/High gate violations block delivery. Stop after Milestone 5.

Status update: before ending, update the Prompt 5C heading flag based on the actual result. Then inspect Prompts 5, 5A, 5B and 5C, recompute the Milestone 5 heading, and synchronize the Milestone Gates table. Milestone 5 is COMPLETE only when all four prompts are COMPLETE and its gate passes.
```

# Final Critical-Path Rehearsal `[⚪ NOT STARTED]`

```text
Modify nothing. From a clean browser session at desktop and mobile sizes, load the production build; inspect hero; use View Menu; switch menu categories; open/close Full Menu; navigate About and Location; follow Get Directions; validate the newsletter demo; return to top with keyboard only; repeat with reduced motion. Capture visible outcomes, errors, broken requests, focus behavior and full-page screenshots. Report PASS/FAIL/NOT VERIFIED for each path. Never report a real order, subscription or verified storefront.

Status update: before ending, update the Final Critical-Path Rehearsal heading flag based on the actual result. This final gate has no parent milestone, so update only its own heading. This status-only edit is permitted despite the read-only instruction.
```

# Final Readiness Check `[⚪ NOT STARTED]`

```text
Modify nothing. Read the CoffeeCorner specification, the actual attached image, all milestone evidence, discrepancy ledger, final audit and rehearsal. Produce a table with columns Requirement | Evidence | Status | Required Action. Status must be PASS, FAIL or NOT VERIFIED. Cover Vue JavaScript stack, desktop/mobile fidelity, 320–1440 px reflow, original imagery, original logo, interaction truthfulness, accessibility, production build, performance if measured, clean setup and portfolio documentation. Give one verdict: READY FOR PORTFOLIO DELIVERY only if every acceptance-critical item passes and no material reference discrepancy remains; otherwise NOT READY FOR PORTFOLIO DELIVERY. Do not modify code or invent evidence.

Status update: before ending, update the Final Readiness Check heading flag based on the actual result. This final gate has no parent milestone, so update only its own heading. This status-only edit is permitted despite the read-only instruction.
```

**Final principle:** the portfolio result is judged by the actual responsive browser page and honest working controls, with the supplied image as visual authority.
