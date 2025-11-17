## Quick context

This is a small single-page React portfolio built with Vite and Tailwind. The app is component-driven and mounted from `src/main.jsx` -> `src/App.jsx`, where `App.jsx` orchestrates the page sections and supplies props like `isDarkMode` and `projects` to child components in `src/components/`.

## How to run (dev & build)

- Install: `npm install`
- Dev server: `npm run dev` (starts Vite)
- Build: `npm run build` (Vite build)
- Preview: `npm run preview`
- Lint: `npm run lint`

These scripts are declared in `package.json`.

## Key architecture notes (what an agent should know)

- Single-page React app using Vite. Entry: `src/main.jsx` (uses `createRoot` + `StrictMode`).
- `App.jsx` is the central coordinator: it holds UI state (dark mode, active section, mouse position) and inlines arrays for `projects` and `skills`. Small data is kept in-component rather than in a separate data file.
- Sections are split into components under `src/components/` (e.g. `Header.jsx`, `Hero.jsx`, `Projects.jsx`, `Contact.jsx`). `App.jsx` renders these in order.
- Navigation/scroll behavior: `App.jsx` exposes `scrollToSection(sectionId)` and components use element IDs `['home','about','projects','skills','contact']`. Example: `Header.jsx` calls `scrollToSection('projects')` when project nav button is clicked.
- The project uses Tailwind with dark mode via a CSS class: `tailwind.config.js` sets `darkMode: 'class'`. Theme toggling adds/removes `document.documentElement.classList.add('dark')` in `App.jsx` — preserve this mechanism when editing theme behavior.

## Project-specific patterns & conventions

- isDarkMode prop: almost every component receives `isDarkMode` and uses conditional Tailwind classes (see `Header.jsx`, `Projects.jsx`, `Contact.jsx`). Prefer toggling styles via this prop rather than global inline styles.
- Component props: UI state is lifted into `App.jsx`; components are presentational and receive handlers/props (e.g. `scrollToSection`, `toggleDarkMode`). Keep that dataflow intact.
- Animations/backgrounds: `FloatingParticles` and `CursorFollower` are used for visual polish; they depend on `mousePosition` and `isDarkMode`. When changing these components, take care not to regress layout or pointer event handling.
- Icons: `lucide-react` is used across components. `vite.config.ts` currently contains `optimizeDeps.exclude: ['lucide-react']` — if you add or change icon usage, keep an eye on Vite dependency optimization (adjust `optimizeDeps` if necessary).
- Data location: `projects` array is embedded in `App.jsx`. When adding many projects, consider moving data to a JSON/module under `src/data/` and import it; otherwise keep the current pattern.

## Files to inspect first (examples)

- `src/App.jsx` — central state, project & skills arrays, dark-mode logic, scroll handling.
- `src/components/Header.jsx` — navigation, mobile menu, dark mode toggle (shows how `scrollToSection` is consumed).
- `src/components/Projects.jsx` — how `projects` data is rendered and how `isDarkMode` affects UI.
- `tailwind.config.js` — content paths and dark-mode setup.
- `vite.config.ts` — plugin + `optimizeDeps` customization.

## Safe edit rules for agents (do not assume anything unseen)

- Do not convert the codebase to TypeScript without the user asking — the repo's `package.json` includes TypeScript devDeps but source files are `.jsx` and the build config is JS/JSX-focused.
- Preserve the `darkMode: 'class'` approach and `localStorage` usage for theme persistence unless the change explicitly targets them.
- Preserve element IDs used for scroll detection (`home`,`about`,`projects`,`skills`,`contact`) so `Header` active detection continues to work.
- When adding new dependencies, update `package.json` and keep Vite's `optimizeDeps` adjustments in mind; run `npm run dev` locally to validate.

## Small examples (copyable references)

- Nav buttons in `src/components/Header.jsx`:
  - They iterate `['home','about','projects','skills','contact']` and call `scrollToSection(item)` — preserve this list if you change section IDs.
- Theme toggle in `src/App.jsx`:
  - toggles `isDarkMode` state, then applies `document.documentElement.classList.add('dark')` and stores preference in `localStorage`.

## What *not* to change silently

- Don't change section IDs or the `scrollIntoView` behavior without updating all consumers (Header and any anchor references).
- Avoid introducing global CSS overrides that break Tailwind utility classes; prefer adding new utilities via `tailwind.config.js`.

If anything here is unclear or you'd like more/less detail (examples, recommended automated checks), tell me which part to expand and I will iterate. 
