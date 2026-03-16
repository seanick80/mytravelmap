# Year of Wander — Travel Map

An interactive map tracking a year-long round-the-world trip, with markers for each destination linked to blog posts on [ouryearofwander.com](https://www.ouryearofwander.com).

**Live:** [seanick80.github.io/mytravelmap](https://seanick80.github.io/mytravelmap/)

## Features

- Color-coded markers: green (first stop), red (most recent), blue (intermediate)
- Dashed polyline connecting locations in chronological order
- Click any marker for a popup with the location name, date, description, and a link to the blog post
- Handles International Date Line crossings (e.g., USA → Australia → Fiji) with smart longitude wrapping

## Tech Stack

- **React 19** + **TypeScript**
- **Leaflet** / **react-leaflet** — map rendering with OpenStreetMap tiles (free, no API key)
- **Vite** — build tooling and dev server

## Getting Started

```bash
npm install
npm run dev
```

Opens a local dev server (default `http://localhost:5173/mytravelmap/`).

## Building for Production

```bash
npm run build
```

Outputs static files to `dist/`. The build is configured with `base: "/mytravelmap/"` for GitHub Pages hosting.

## Deployment

Pushes to `master` automatically deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`. The workflow runs `npm ci && npm run build` on Node 22 and publishes the `dist/` folder.

## Adding a Location

Edit `src/data/locations.ts` and add an entry to the array:

```typescript
{
  name: "City, Country",
  lat: 0.0000,
  lng: 0.0000,
  date: "YYYY-MM-DD",
  description: "Short description",
  blogUrl: "https://www.ouryearofwander.com/post/slug",  // optional
}
```

Push to `master` and the site redeploys automatically.

## Embedding

The map is embedded on [ouryearofwander.com/map](https://www.ouryearofwander.com/map) via an iframe. See [MIGRATION.md](MIGRATION.md) for an analysis of options to host the map natively within Wix.
