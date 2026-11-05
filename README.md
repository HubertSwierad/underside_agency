# Underside Agency

React and TypeScript portfolio with About, a Work overview, and individual project sliders.

## Development

- `npm ci` — install the locked dependencies.
- `npm start` — run the development server at http://localhost:3000.
- `npm test -- --watchAll=false` — run the tests once.
- `npm run build` — prepare images and create a production build in `build/`.

## Source layout

- `src/components/<Name>/` — component implementation, its CSS, tests, and public `index.ts` export. Components without dedicated styles do not need an empty CSS file.
- `src/components/WorkPage/WorkLayout.css` — layout shared by the Work overview and project pages.
- `src/contexts/` — shared playback state.
- `src/hooks/` — reusable React hooks.
- `src/utils/` — slider helpers and their tests.
- `src/data/` — About content, Work projects, image dimensions, and discovered YouTube covers.
- `src/App.tsx` and `src/App.css` — navigation, background video, and the application shell.

About owns its layout styles independently from Work. Shared video and slider navigation styles live with their components.

## Media preparation

Published media lives in `public/About/` and `public/Portfolio/`. Edit the data files to change tile content and order.

- `npm run images:optimize` — optimize portfolio photos and update image dimensions. Requires Python and macOS image tools.
- `npm run images:check` — check that portfolio photos stay within 500 KB.
- YouTube covers named `watch?v=VIDEO_ID.jpg` (or PNG/WebP) are discovered automatically before development and production builds.

Image optimization keeps originals in the ignored `.image-originals/` directory. Optional source assets belong in `originals/` or `original-assets/`, outside the published `public/` directory.

## Deployment

The Dockerfile builds the site and serves it through Nginx. `nginx.conf` provides the fallback routing for project URLs.
