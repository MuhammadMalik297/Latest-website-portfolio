# Muhammad Malik — Premium React Portfolio

A cinematic single-page React portfolio built around Muhammad Malik's verified QA automation, AI/data, ecommerce, and premium digital-product work.

## What is included

- A Vite + React app with a production-ready `dist/` build.
- GSAP-powered motion and scroll choreography.
- A meaning-driven React Three Fiber hero scene with selectable capability lanes.
- A second interactive 3D systems section where each hotspot reveals part of the capability story.
- A centered horizontal featured-work stage that scrolls only once the section reaches the middle of the viewport.
- A command palette (`Ctrl/Cmd + K` or `/`) for fast navigation.
- A searchable/filterable project atlas with modal detail views.
- Tishnagii video integrated into the brand / commerce section.

## Main files to edit

- `src/data/portfolioData.js` — all portfolio copy, experience, projects, links, skills, education.
- `src/components/HeroScene.jsx` — hero 3D scene.
- `src/components/SystemLabScene.jsx` — second 3D interactive section.
- `src/sections/HeroSection.jsx` — hero copy and interactive lane content.
- `src/sections/CapabilitiesSection.jsx` — systems-lab copy and node explanations.
- `src/sections/FeaturedSection.jsx` — horizontal featured-work stage.
- `src/styles/index.css` — color system, layout, motion styling, visual polish.
- `public/assets/` — CV, portrait, showcase images, and video assets.

## Important content notes

### CitrusBits date conflict

The uploaded CVs conflict on the CitrusBits date range:

- some files show `Jul 2025 — Jan 2026`
- some files show `Jul 2025 — Present`

This build uses `Jul 2025 — Jan 2026`, matching the newer Sydney-based CV variants. If you want the public site to say `Present` instead, update the first experience item in `src/data/portfolioData.js`.

### Tishnagii video included

This package already includes the Tishnagii showcase reel and poster image.

If you want to replace them later, swap these two files and rebuild:

```bash
public/assets/tishnagii-showcase.mp4
public/assets/tishnagii-poster.webp
```

## Prerequisites

Use Node.js 22+.

## How to run locally

1. Open a terminal in this project folder.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal (usually `http://localhost:5173`).

If you want the dev server exposed on your local network:

```bash
npm run host
```

## Troubleshooting

### `vite is not recognized`

That means dependencies did not install correctly yet.

Run:

```bash
npm install
```

If it still fails, try:

```bash
npm cache clean --force
npm install
```

### npm exits unexpectedly on Windows

If npm crashes mid-install on Windows, close the terminal, reopen it, and run:

```bash
npm cache clean --force
npm install
```

Then verify Vite exists:

```bash
dir node_modules\.bin
```

You should see `vite` in that folder.

## How to build for production

```bash
npm run build
```

This creates the production-ready output inside `dist/`.

## How to preview the production build

```bash
npm run preview
```

## Deploying

### Netlify / Vercel / static hosting

1. Run:

```bash
npm run build
```

2. Deploy the `dist/` folder.

If you connect the repo directly:

- Build command: `npm run build`
- Publish directory: `dist`

## Quick customization checklist

### Replace contact info
Edit `src/data/portfolioData.js`.

### Replace the CV
Drop the new PDF into `public/assets/` and update the `cv` path in `src/data/portfolioData.js`.

### Replace images and video
Swap files in `public/assets/` and keep the same filenames, or update the paths in the data file.

### Change colors
Edit the root variables and override blocks in `src/styles/index.css`.

### Edit the 3D sections
- Hero: `src/components/HeroScene.jsx`
- Systems section: `src/components/SystemLabScene.jsx`

## Project scripts

- `npm run dev` — start local development
- `npm run host` — start development server on your LAN
- `npm run build` — create a production bundle
- `npm run preview` — preview the production bundle locally

## Tested status

- `npm install` completed successfully in this environment
- `npm run build` completed successfully in this environment
