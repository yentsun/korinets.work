# korinets.work

Personal portfolio website for Maksim Korinets — a single-page app that aggregates data from multiple public APIs into a card-based layout.

## Stack

- **React 19** — UI framework
- **Vite 6** — build tool and dev server
- **Native `fetch`** — all API calls (no axios, no GraphQL)
- **pnpm** — package manager

## How it works

The app displays a grid of cards, each representing a profile or service. Cards are defined in `src/data.js` with a priority that determines their display order.

**Two card types:**

- **Static** — content is hardcoded (bio, email, upwork, etc.)
- **Dynamic** — content is fetched at runtime from public APIs:
  - GitHub (repos, followers, recent activity)
  - GitLab (username, events)
  - NPM (published packages, scores)
  - Last.fm (playcount, currently playing)
  - Stack Overflow (reputation, badges)

Each dynamic card uses the `useFetchData` hook which calls the API functions defined in `src/api/` and merges the results.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview  # preview the production build locally
```

## Project structure

```
├── index.html              # Entry HTML (Vite root)
├── vite.config.js          # Vite configuration
├── public/                 # Static assets (icons, images)
├── src/
│   ├── index.jsx           # React entry point
│   ├── index.css           # Global styles
│   ├── data.js             # Card definitions
│   ├── util.js             # Helpers (timeSince, average, etc.)
│   ├── api/                # API fetch functions
│   │   ├── github.js
│   │   ├── gitlab.js
│   │   ├── lastfm.js
│   │   ├── npm.js
│   │   └── so.js
│   ├── components/
│   │   ├── Base.jsx        # Root component (card grid)
│   │   └── Card.jsx        # Individual card
│   └── hooks/
│       └── useFetchData.js # Data fetching hook
```
