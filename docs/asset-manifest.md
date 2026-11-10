# CoffeeCorner asset manifest

All photographs in this manifest were generated for CoffeeCorner on 2026-10-22 with the built-in OpenAI image generation tool. They are original project assets, not crops from `coffee_corner_design.png` and not stock photography. The source PNGs remain in the local Codex generated-image archive; only optimized delivery files are shipped in `public/`.

## Shared art direction and prompt set

Every image prompt specified photorealistic editorial café photography with warm amber practical light, espresso brown, caramel, cream, deep forest green, natural wood and believable material texture. Shared constraints were: no watermark, no unrelated logo, no signage or lettering, no duplicated objects, and physically plausible food, drink, furniture and anatomy.

| Asset | Final prompt focus | Generated source ID | Delivery, focal point and alt text |
| --- | --- | --- | --- |
| Hero | Atmospheric independent café at dusk; handmade speckled latte with leaf art in the lower-right third; dark uncluttered copy space on the left; mobile-safe crop around the cup. | `exec-4f7e2cac-1458-41a5-98db-a31f7ab4ad8a.png` | `hero-1600.webp`, `hero-960.webp`, `hero-mobile-780x1040.webp`, JPEG fallback. Focal point: 76% 66%. Alt: “Latte in a speckled ceramic cup on a warm wooden café table.” |
| Espresso | One matte-black demitasse with crema, saucer and spoon on walnut, close three-quarter view. | `exec-a4cb6287-9887-434b-93b0-74c7ceb1067e.png` | 720/420 WebP, JPEG fallback. Focal point: center. Alt: “Espresso with crema in a matte black demitasse.” |
| Cappuccino | One warm-white speckled cup with plausible rosetta art, gentle overhead three-quarter view. | `exec-10bcf87f-5d57-4447-a3b1-46870b1f7472.png` | 720/420 WebP, JPEG fallback. Focal point: center. Alt: “Cappuccino with rosetta latte art in a speckled stoneware cup.” |
| Iced latte | One clear glass with espresso/milk layers, realistic ice, condensation and a single dark straw. | `exec-0ab6f5c4-69e8-41f8-b333-2e6e67a98003.png` | 720/420 WebP, JPEG fallback. Focal point: center. Alt: “Layered iced latte in a clear glass with condensation.” |
| Croissant | One golden butter croissant with visible laminated layers and restrained crumbs on walnut. | `exec-9fc0e540-7126-407c-852a-4e730c51c18a.png` | 720/420 WebP, JPEG fallback. Focal point: 50% 55%. Alt: “Golden butter croissant with crisp flaky layers.” |
| Story | Coherent neighborhood café interior with wood, plants, shelves and warm pendants; no people. | `exec-9ac293fb-9dcd-462d-93b7-5761ebcaeeb8.png` | 1200/720 WebP, JPEG fallback. Focal point: 58% 50%. Alt: “Warm neighborhood café interior with wood tables, pendant lights, and abundant plants.” |
| CTA | One plausible hand holding a completely blank cream takeaway cup in the right third, dark foliage copy space left. | `exec-0ec8ebb1-6936-4cba-bd7d-d98eac4ebfae.png` | 1600/960 WebP, JPEG fallback. Focal point: 76% 50%. Decorative image; original SVG mark is overlaid separately so no generated lettering is shipped. |

## Brand system

The original cup mark is a hand-authored SVG: a rounded caramel cup, asymmetrical handle, two steam strokes, saucer and coffee-bean counterform. It is not traced from the reference. Desktop and compact lockups use real SVG text for `CoffeeCorner` and `SPECIALTY COFFEE`, with dark and light variants. The favicon uses the same cup silhouette.

| File | Purpose |
| --- | --- |
| `public/assets/brand/mark-dark.svg` / `mark-light.svg` | Standalone mark for light/dark contexts and cup composition. |
| `public/assets/brand/logo-lockup-dark.svg` / `logo-lockup-light.svg` | 230 × 64 desktop lockups. |
| `public/assets/brand/logo-compact-dark.svg` / `logo-compact-light.svg` | 174 × 54 small/mobile lockups with strengthened strokes. |
| `public/favicon.svg` | 64 × 64 rounded favicon. |

## Export notes

- WebP exports use quality 82 and Lanczos resizing. JPEG fallbacks use progressive quality 84.
- The 1600 px hero is 144 KB; all other WebP variants are below 161 KB.
- Intrinsic dimensions are declared in the Vue templates to reserve layout space.
- AVIF was not exported because the available Pillow build lacks AVIF support; WebP plus optimized JPEG provides the milestone’s modern-format and fallback coverage without adding a dependency.
- `coffee_corner_design.png` remains a repository-only comparison reference and is never requested by the app.


## Milestone 4 illustrative map and CTA composition

`public/assets/illustrations/neighborhood-map.svg` is an original hand-authored 800 × 460 SVG. It uses an abstract river, street grid, parks, a marker and a brand label; it has no real geographic coordinates or third-party map tiles. Visible caption and alt text identify it as a sample illustration. The sample-address search is a separate, explicitly labeled action.

The existing blank-cup CTA photograph is now displayed full-bleed. The original dark vector lockup is overlaid at 74.5% horizontal / 47% vertical within the image, so the wordmark stays on the cup as the whole image scales. Mobile scales the same composition and keeps a 672 px minimum intrinsic canvas width to cover a 288 px section at 320 px without stretching. A dark overlay preserves copy legibility. No new generated raster image was needed.
