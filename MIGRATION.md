# Migration Plan: GitHub Pages → Native Wix Hosting

## Background

The travel map is currently a **React + Vite SPA** using `react-leaflet` (Leaflet.js with OpenStreetMap tiles), built to static files and deployed via GitHub Pages. It's embedded on `ouryearofwander.com/map` through an **iframe**. This plan explores moving it to run "natively" within Wix.

## The Core Problem

**Wix has no direct DOM access from page code.** Velo (Wix's development platform) interacts with elements through its `$w` API, not the browser DOM. Libraries like Leaflet.js and React that create and manipulate DOM elements **cannot run in Velo's execution context**. This is the fundamental reason the project was originally built as a standalone app on GitHub Pages.

## Wix Hosting Options Evaluated

| Approach | Truly Native? | Effort | Cost | Notes |
|---|---|---|---|---|
| **iframe (current)** | No | Done | Free | Works today. Fully isolated from Wix page. Uses Leaflet + OpenStreetMap. |
| **Wix Custom Element** | Partially | Medium | Free | Web Component standard. Runs in isolated scope (sandboxed iframe in editor; ambiguously sandboxed on live site). Better Wix integration than a raw iframe. Still uses Leaflet. |
| **Wix GoogleMap + CMS (Option A)** | Yes | Low | Free | Built-in Google Maps element connected to a Wix Content Collection. Pins with popups and blog links. **No polyline, no custom marker colors.** No API key needed — Wix covers Google Maps cost. |
| **Wix HtmlComponent + Google Maps JS API (Option B)** | Partially | Medium | API key required | Full Google Maps JavaScript API embedded in a Wix HtmlComponent. Supports polylines, custom markers, info windows with links. Requires your own Google API key ($200/month free credit ≈ 28,000 map loads). Data can be fed from Wix CMS via Velo `postMessage`. |
| **Third-party Wix app** | Yes | Low | Varies | Apps like Simple Maps, Atlist, or Mapify offer multiple markers, custom icons, and rich popups without code. Worth evaluating as a low-effort alternative. |
| **Wix Blocks app** | Partially | High | Free | App wrapper using Blocks, but still requires a Custom Element or HtmlComponent internally for the actual map rendering. |

### Option A vs. Option B — Wix-Native Google Maps

**Option A (GoogleMap + CMS)** is the simplest path. The built-in Wix GoogleMap element can be connected to a Content Collection where each row becomes a map pin. Each pin's popup displays a title, description, and clickable blog link. Locations are editable from the Wix CMS dashboard with no code deployments. The trade-off is losing the travel path polyline and color-coded markers — you get uniform Google Maps pins only.

**Option B (HtmlComponent + Google Maps JS API)** preserves full feature parity. You embed the Google Maps JavaScript API inside a Wix HtmlComponent, load location data from a CMS collection via Velo's `wix-data` API, and pass it into the HtmlComponent via `postMessage`. This gives you polylines, custom marker icons/colors, and rich info windows. However, this approach requires your own Google Cloud API key and is technically still an iframe (the HtmlComponent renders in an iframe internally). Google's free tier ($200/month credit) covers approximately 28,000 Dynamic Maps loads per month, which is more than sufficient for a personal travel blog.

**Verdict:** For a personal travel blog with ~36 locations, **Option A** is the pragmatic choice — zero cost, zero code maintenance, CMS-editable locations. Choose **Option B** only if the polyline connecting locations in travel order is important enough to justify the API key setup and additional code.

## Key Challenges

### Challenges common to all migration options

1. **Data migration.** Location data is currently hardcoded in `src/data/locations.ts` (36 locations with name, lat, lng, date, description, blogUrl). For any Wix-native option, this data needs to be moved — either into a Wix Content Collection (Options A/B) or re-bundled into a different format.

2. **Date-line wrapping.** The current app has custom logic (`buildPath`, `shiftToView`) to handle the travel path crossing the International Date Line (e.g., USA → Australia → Fiji). Google Maps handles this differently from Leaflet. Option B would need equivalent logic for the polyline; Option A avoids this by dropping the polyline entirely.

### Challenges specific to Option A (GoogleMap + CMS)

3. **Feature loss.** No polyline connecting locations in travel order. No color-coded markers (first/last/intermediate). All pins use standard Google Maps styling. The Velo API for the GoogleMap element is very limited — no programmatic zoom, no `addMarker()` method, no map type control from code.

4. **Address field requirement.** The built-in GoogleMap element uses an Address field (geocoded text) rather than raw lat/lng coordinates. You'd need to store addresses that Google can geocode, or verify that your lat/lng values can be provided in a format the Address field accepts.

### Challenges specific to Option B (HtmlComponent + Google Maps JS API)

5. **Google API key management.** Requires a Google Cloud account, an API key with the Maps JavaScript API enabled, and billing set up (even though the free tier covers typical usage). The API key is embedded in client-side code inside the HtmlComponent, which means it's visible in the page source. You should restrict the key to your domain via the Google Cloud Console.

6. **HtmlComponent is still an iframe.** The Wix HtmlComponent renders its content inside an iframe internally. While it integrates with Velo via `postMessage` (better than a standalone iframe), it's not truly "native" in the Wix DOM. This is functionally similar to the current GitHub Pages iframe approach, just with Google Maps instead of Leaflet and with Wix CMS as the data source.

7. **Marker limits.** Community reports suggest the Google Maps JS API within a Wix HtmlComponent can have performance issues beyond ~50 markers if created rapidly. With 36 locations this shouldn't be a problem, but worth noting for future growth.

### Challenges specific to Custom Element approach

8. **No React in Wix Custom Elements.** Custom Elements must be a single JS file (or self-loading bundle). Bundling React + react-leaflet adds complexity. A rewrite to plain Leaflet.js (~200 lines) would be needed.

9. **Static file hosting.** Wix cannot serve arbitrary `.js` files. The custom element JS bundle must be hosted externally (GitHub Pages, CDN, S3), so you'd still depend on an external host.

10. **Sandboxing restrictions (as of Jan 2025).** Wix sandboxes custom elements, restricting `localStorage`, `sessionStorage`, `cookies`, and `indexedDB`. The map doesn't use these currently, but it limits future features.

11. **External CDN dependencies.** The Leaflet-based approaches load OpenStreetMap tiles and marker icons from external CDNs. Wix's CSP (Content Security Policy) is not user-configurable — if Wix tightens their CSP, these could break.

## Work Plans

### Work Plan: Option A (GoogleMap + CMS — no polyline)

#### Step 1: Create the Wix Content Collection
- [ ] In the Wix Dashboard, create a `TravelLocations` collection with fields:
  - `title` (Text) — location name
  - `address` (Address) — location address or coordinates for Google to geocode
  - `date` (Date) — visit date
  - `description` (Text) — short description
  - `blogUrl` (URL) — link to the blog post
  - `linkText` (Text) — display text for the link (e.g., "Read the blog post")
- [ ] Import the 36 locations from `src/data/locations.ts` into the collection (manual entry or CSV import)
- [ ] Verify that Google correctly geocodes each location from the address/coordinates provided

#### Step 2: Add the GoogleMap element to the page
- [ ] In the Wix Editor, navigate to the `/map` page
- [ ] Remove the current iframe element
- [ ] Add a GoogleMap element from the "Add Elements" panel
- [ ] Connect it to the `TravelLocations` dataset
- [ ] Bind the map fields: location → `address`, title → `title`, description → `description`, link → `blogUrl`, link text → `linkText`
- [ ] Resize and position the map to fill the content area
- [ ] Test on desktop and mobile

#### Step 3: Cleanup
- [ ] Optionally keep the GitHub Pages deployment as a feature-rich fallback (with polyline and colored markers)
- [ ] Update the `/map` page to remove any iframe-related code or settings

**Total effort:** ~1-2 hours of Wix Editor work + data entry.

---

### Work Plan: Option B (HtmlComponent + Google Maps JS API — with polyline)

#### Step 1: Set up Google Maps API key
- [ ] Create a Google Cloud project (or use an existing one)
- [ ] Enable the **Maps JavaScript API**
- [ ] Create an API key and restrict it to `ouryearofwander.com` (HTTP referrer restriction)
- [ ] Set up billing (required even for free tier usage)

#### Step 2: Create the Wix Content Collection
- [ ] Same as Option A Step 1, but use `latitude` (Number) and `longitude` (Number) fields instead of an Address field, since the Google Maps JS API works directly with coordinates
- [ ] Import the 36 locations from `src/data/locations.ts`

#### Step 3: Build the HtmlComponent map
- [ ] In the Wix Editor, add an HtmlComponent (`$w('#html1')`) to the `/map` page
- [ ] Write the embedded HTML/JS that:
  - Loads the Google Maps JavaScript API with your API key
  - Listens for `postMessage` events containing location data
  - Creates markers with color-coded icons (green for first, red for last, blue for intermediate)
  - Adds info windows to each marker with name, date, description, and blog link
  - Draws a polyline connecting locations in chronological order
  - Handles date-line wrapping for the polyline (port `buildPath`/`shiftToView` logic)
- **Estimated scope:** ~200-300 lines of HTML/JS inside the HtmlComponent

#### Step 4: Wire up Velo page code
- [ ] Write Velo page code in the `/map` page's `masterPage.js` or page code:
  ```javascript
  import wixData from 'wix-data';

  $w.onReady(async function () {
    const results = await wixData.query('TravelLocations')
      .ascending('date')
      .limit(100)
      .find();
    const locations = results.items.map(item => ({
      name: item.title,
      lat: item.latitude,
      lng: item.longitude,
      date: item.date,
      description: item.description,
      blogUrl: item.blogUrl
    }));
    $w('#html1').postMessage({ type: 'setLocations', locations });
  });
  ```
- [ ] Test the full data flow: CMS → Velo query → postMessage → HtmlComponent → Google Map

#### Step 5: Test and polish
- [ ] Verify all 36 markers render with correct popups and links
- [ ] Verify the polyline renders correctly, including across the date line
- [ ] Test on desktop and mobile viewports
- [ ] Monitor Google Maps API usage in the Cloud Console

**Total effort:** Medium — API key setup + ~300 lines of embedded code + Velo wiring.

---

### Work Plan: Custom Element approach (Leaflet — alternative)

#### Phase 1: Rewrite map as a vanilla Leaflet Custom Element
- [ ] Create a new `wix-travel-map.js` file implementing the map as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) (`class TravelMap extends HTMLElement`)
- [ ] Port the Leaflet map logic from `TravelMap.tsx` to plain JS (drop React/react-leaflet)
- [ ] Inline the location data or accept it via a `locations` attribute (JSON string)
- [ ] Bundle Leaflet CSS inline (or load from CDN within the shadow DOM / component)
- [ ] Preserve existing features: colored markers, polyline path, date-line wrapping, popups with blog links
- **Estimated scope:** ~300 lines of JS, replacing ~400 lines of TSX + build tooling

#### Phase 2: Host and register on Wix
- [ ] Host `wix-travel-map.js` on a static file server (GitHub Pages `/dist`, or a CDN like jsDelivr/unpkg pointing at the repo)
- [ ] In the Wix Editor, add a Custom Element to the `/map` page
- [ ] Configure it with the tag name and hosted JS URL
- [ ] Set sizing to fill the page content area (replacing the current iframe)
- [ ] Test on both desktop and mobile viewports
- **Prerequisite:** Site must be on a Wix Premium plan with a custom domain

#### Phase 3 (Optional): Wix CMS integration
- [ ] Create a `TravelLocations` content collection (same as Option A/B)
- [ ] Write Velo page code to query the collection and pass data into the custom element via `setAttribute('locations', JSON.stringify(data))`

### Maintaining GitHub Pages as fallback (all options)
- [ ] Keep the current React app and GitHub Pages deployment working regardless of which option is chosen
- [ ] This provides a feature-rich fallback and a way to preview changes before updating the Wix site

## Comparison Matrix

| Aspect | iframe (current) | Option A (GoogleMap + CMS) | Option B (HtmlComponent + GM JS API) | Custom Element (Leaflet) |
|---|---|---|---|---|
| Truly native to Wix | No | **Yes** | Partially (iframe internally) | Partially (sandboxed) |
| Polyline (travel path) | Yes | **No** | Yes | Yes |
| Custom marker colors | Yes | **No** | Yes | Yes |
| Popups with blog links | Yes | Yes | Yes | Yes |
| CMS-editable locations | No | **Yes** | **Yes** | Optional (extra work) |
| API cost | Free (OSM) | **Free** (Wix covers it) | API key required ($0 under free tier) | Free (OSM) |
| External hosting needed | GitHub Pages | **None** | **None** | GitHub Pages / CDN |
| Wix Editor visibility | Opaque box | Full Wix element | Opaque box | Shows with label |
| Code maintenance | React app | **No code** | ~300 lines embedded JS | ~300 lines JS + hosting |
| Date-line wrapping | Custom logic | N/A (no polyline) | Must port logic | Must port logic |
| Mobile responsive | Manual | Wix handles it | Manual in HtmlComponent | Manual |
| Setup effort | Done | **~1-2 hours** | Medium | Medium |

## Open Questions

1. **Is the polyline worth the complexity?** Option A (no polyline) is dramatically simpler — zero code, zero API keys, CMS-editable. The polyline is a nice visual but the map is functional without it. Is it worth the jump from Option A to Option B?

2. **Address geocoding for Option A.** The built-in GoogleMap element uses an Address field. Need to verify whether raw lat/lng coordinates work, or if text addresses are required. If text addresses are needed, some remote locations may not geocode accurately.

3. **Google API free tier durability.** Google currently offers $200/month in free Maps credits. If this changes, Option B would start incurring costs. Option A is unaffected since Wix covers the cost.

4. **Wix Premium plan tier.** Custom elements and HtmlComponents with Velo code require a Premium plan. Which tier is the site on? Some tiers have limitations on custom code features.

5. **Third-party apps.** Apps like Simple Maps, Atlist, or Mapify may offer a middle ground — multiple markers with custom styling and no API key. Worth evaluating before committing to Option B if the polyline is desired.

6. **Wix sandboxing trajectory.** Wix tightened sandboxing in Jan 2025. Worth monitoring [Wix's sandboxing announcements](https://support.wix.com/en/article/updates-to-iframes-and-custom-elements) — this affects Options B and the Custom Element approach.

7. **Mobile behavior.** How does each option handle resizing within the Wix responsive layout? The built-in GoogleMap element (Option A) should handle this natively; the HtmlComponent and Custom Element approaches need manual testing.

## Recommendation

**Option A (GoogleMap + CMS) is the best fit for this project** if you can live without the polyline. It eliminates all external hosting dependencies, removes code maintenance entirely, and lets you manage locations from the Wix dashboard. Setup takes 1-2 hours.

**Option B (HtmlComponent + Google Maps JS API)** is the right choice if the polyline is important. It preserves full feature parity with the current app while gaining CMS-editable locations. The trade-off is needing a Google API key (free tier is sufficient) and ~300 lines of embedded code to maintain.

**The Custom Element / Leaflet approach** is a lateral move — you're trading one sandboxed context for a slightly-less-sandboxed context while still depending on an external host. It's only preferable if you specifically want to keep using OpenStreetMap tiles instead of Google Maps.

**Suggested path:** Try Option A first. If the lack of a polyline feels like a significant loss, upgrade to Option B. Keep the current GitHub Pages deployment as a fallback regardless.
