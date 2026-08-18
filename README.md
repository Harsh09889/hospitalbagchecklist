# Hospital Bag Checklist

A free hospital bag checklist site for mom, baby, and dad — live at [babyhospitalbag.com](https://babyhospitalbag.com).

Help expecting parents know exactly what to pack for labor, delivery, and their hospital stay. Includes SEO content pages, a personalised checklist generator, and a printable PDF download.

## Stack

- [Astro 7](https://astro.build) with React islands
- [Tailwind CSS v4](https://tailwindcss.com)
- [Nanostores](https://github.com/nanostores/nanostores) for client state
- [jsPDF](https://github.com/parallax/jsPDF) for PDF export
- Deployed to Cloudflare Workers via [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

## Requirements

- Node.js >= 22.12.0 (see [`.nvmrc`](.nvmrc))

## Commands

| Command | Action |
| :------ | :----- |
| `yarn install` | Install dependencies |
| `yarn dev` | Start local dev server at `localhost:4321` |
| `yarn build` | Build production site to `./dist/` |
| `yarn preview` | Preview the build locally |
| `yarn deploy` | Deploy to Cloudflare Workers |
| `yarn deploy:dry-run` | Dry-run deploy without publishing |

## Project layout

```text
src/
├── config/site.ts       # Site metadata, routes, navigation
├── pages/               # Astro pages (SEO landing pages + /checklist app)
├── components/
│   ├── checklist/       # Interactive checklist UI (React)
│   ├── layout/          # Header, footer, theme toggle
│   ├── marketing/       # Hero, SEO intro sections
│   └── seo/             # Meta tags, structured data
├── data/content/        # Checklist items, FAQs, legal copy
├── lib/                 # Theme helpers, schema utilities
└── styles/global.css    # Tailwind base styles
public/                  # Static assets (favicon, cursors, robots.txt)
```

Route definitions and internal links are centralised in `src/config/site.ts` so URLs only change in one place.

## Deploy

The site builds to `./dist/` and is served as static assets on Cloudflare Workers. Configuration lives in [`wrangler.jsonc`](wrangler.jsonc).

```bash
yarn build
yarn deploy
```
