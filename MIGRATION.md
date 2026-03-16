# Migration Plan: GitHub Pages → Native Wix Hosting

## Background

The travel map is currently a **React + Vite SPA** using `react-leaflet` (Leaflet.js with OpenStreetMap tiles), built to static files and deployed via GitHub Pages. It's embedded on `ouryearofwander.com/map` through an **iframe**. This plan explores moving it to run "natively" within Wix.

## The Core Problem

**Wix has no direct DOM access from page code.** Velo (Wix's development platform) interacts with elements through its `$w` API, not the browser DOM. Libraries like Leaflet.js and React that create and manipulate DOM elements **cannot run in Velo's execution context**. This is the fundamental reason the project was originally built as a standalone app on GitHub Pages.

## Wix Hosting Options Evaluated

| Approach | Truly Native? | Effort | Notes |
|---|---|---|---|
| **iframe (current)** | No | Done | Works today. Fully isolated from Wix page. |
| **Wix Custom Element** | Partially | Medium | Web Component standard. Runs in isolated scope (sandboxed iframe in editor; ambiguously sandboxed on live site). Better Wix integration than a raw iframe. |
| **Velo page code + Wix UI** | Yes | Very High | Would require abandoning Leaflet entirely and using Wix's built-in Google Maps element or building a map from scratch with Wix UI primitives. Severe feature loss. |
| **Wix Blocks app** | Partially | High | App wrapper using Blocks, but still requires a Custom Element internally for the actual map rendering. |

**Verdict:** The **Custom Element** approach is the only viable middle ground. It provides better integration with the Wix page than a raw iframe (property passing, theme awareness) while still allowing Leaflet to run. However, it is **not truly native** — the map still executes in an isolated context. Full native rendering would require abandoning Leaflet, which is not practical.

## Key Challenges

1. **No React in Wix Custom Elements.** Custom Elements must be a single JS file (or self-loading bundle). While possible, bundling React + react-leaflet into a single custom element file adds complexity and bundle size. **Recommendation: rewrite the map component in plain Leaflet.js** (~200 lines), eliminating React as a dependency entirely.

2. **Static file hosting.** Wix cannot serve arbitrary `.js` files from its infrastructure. The custom element JS bundle must be hosted externally (GitHub Pages, CDN, S3) or via Velo's custom element file hosting mechanism. This means you'll likely **still depend on an external host** for the JS file itself.

3. **Data pipeline.** Location data is currently hardcoded in `src/data/locations.ts`. Two options for Wix:
   - **Keep it bundled** in the JS file (simplest, current approach works).
   - **Move to a Wix Content Collection** and pass data into the custom element via attributes/properties from Velo code. This enables editing locations from the Wix CMS dashboard without code changes, but adds complexity.

4. **Sandboxing restrictions (as of Jan 2025).** Wix sandboxes custom elements, restricting `localStorage`, `sessionStorage`, `cookies`, and `indexedDB`. The map doesn't use any of these currently, so this is low risk, but it limits future features (e.g., saving user preferences).

5. **Cross-component communication.** If the Wix page needs to interact with the map (e.g., clicking a blog post highlights a location), you'd use `setAttribute()` from Velo code → custom element, which is more limited than React props/state. Bi-directional communication requires `postMessage`-style patterns.

6. **External CDN dependencies.** The map loads OpenStreetMap tiles and marker icons from external CDNs. These should continue to work, but Wix's CSP (Content Security Policy) is not user-configurable — if Wix ever tightens their CSP to block these domains, the map breaks with no recourse.

## Work Plan

### Phase 1: Rewrite map as a vanilla Leaflet Custom Element
- [ ] Create a new `wix-travel-map.js` file implementing the map as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) (`class TravelMap extends HTMLElement`)
- [ ] Port the Leaflet map logic from `TravelMap.tsx` to plain JS (drop React/react-leaflet)
- [ ] Inline the location data or accept it via a `locations` attribute (JSON string)
- [ ] Bundle Leaflet CSS inline (or load from CDN within the shadow DOM / component)
- [ ] Preserve existing features: colored markers, polyline path, date-line wrapping, popups with blog links
- **Estimated scope:** ~300 lines of JS, replacing ~400 lines of TSX + build tooling

### Phase 2: Host and register on Wix
- [ ] Host `wix-travel-map.js` on a static file server (GitHub Pages `/dist`, or a CDN like jsDelivr/unpkg pointing at the repo)
- [ ] In the Wix Editor, add a Custom Element to the `/map` page
- [ ] Configure it with the tag name and hosted JS URL
- [ ] Set sizing to fill the page content area (replacing the current iframe)
- [ ] Test on both desktop and mobile viewports
- **Prerequisite:** Site must be on a Wix Premium plan with a custom domain (already the case for `ouryearofwander.com`)

### Phase 3 (Optional): Wix CMS integration
- [ ] Create a `TravelLocations` content collection in Wix with fields: `name`, `lat`, `lng`, `date`, `description`, `blogUrl`
- [ ] Write Velo page code to query the collection and pass data into the custom element via `setAttribute('locations', JSON.stringify(data))`
- [ ] This enables adding/editing locations from the Wix dashboard without touching code

### Phase 4 (Optional): Maintain GitHub Pages as fallback
- [ ] Keep the current React app and GitHub Pages deployment working
- [ ] This provides a fallback if Wix sandboxing changes break the custom element

## What You Actually Gain vs. the Current iframe

| Aspect | iframe (current) | Custom Element |
|---|---|---|
| Wix theme integration | None | Partial (can read theme via attributes) |
| CMS-driven data | No | Yes (Phase 3) |
| Wix Editor visibility | Opaque box | Shows in editor with label |
| SEO | Not indexed | Still not indexed (client-side JS) |
| Page load | Extra HTTP round-trip for iframe src | Slightly faster (no iframe navigation) |
| Isolation | Full iframe sandbox | Still sandboxed, slightly less isolated |
| Hosting dependency | GitHub Pages | Still need external JS host |
| Maintenance burden | Low (standalone app) | Medium (two codebases or shared build) |

## Open Questions

1. **Is the iframe actually a problem?** The current setup works. The migration gains are modest (slightly better Wix integration, optional CMS data editing). If the iframe meets your needs, the effort may not be justified.

2. **Wix sandboxing trajectory.** Wix tightened sandboxing in Jan 2025. Will they tighten further? Custom elements and iframes are treated similarly — if one breaks, the other likely will too. Worth monitoring [Wix's sandboxing announcements](https://support.wix.com/en/article/updates-to-iframes-and-custom-elements).

3. **Do you want CMS-editable locations?** If yes, Phase 3 is valuable. If you're happy editing `locations.ts` and redeploying, it's unnecessary complexity.

4. **Mobile behavior.** How does the custom element handle resizing within the Wix responsive layout? This needs testing — Wix's responsive engine may interact differently with custom elements vs. iframes.

5. **Wix Premium plan tier.** Custom elements require Premium. Which tier are you on? Some tiers have limitations on custom code features.

6. **Do you need bi-directional communication?** (e.g., clicking a marker triggers something on the Wix page, or clicking a blog post on the page pans the map to that location). This is possible but significantly more complex with custom elements.

## Recommendation

**Stay with the iframe unless you need CMS-editable locations or deeper Wix page integration.** The custom element approach is a lateral move — you're trading one sandboxed context for a slightly-less-sandboxed context, while adding maintenance burden. The map's external dependencies (OSM tiles, marker icons) work equally well in both approaches, and you'll still need an external host for the JS bundle either way.

If you do proceed, start with **Phase 1 only** (vanilla Leaflet custom element) as a proof of concept before committing to the full migration.
