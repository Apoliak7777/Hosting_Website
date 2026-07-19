<div align="center">

[![Slovencina](https://img.shields.io/badge/SK-Sloven%C4%8Dina-30363d?style=for-the-badge)](README.md) [![English](https://img.shields.io/badge/EN-English-2ea043?style=for-the-badge)](README.en.md)

# 🎮 ApoliakHost

**A fully clickable frontend prototype of a game server and VPS hosting website - built on React 19, Vite 8 and Tailwind CSS v4.**

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.17-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.40-0055FF?style=flat-square&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-GPL_3.0-blue?style=flat-square)

</div>

---

## 📑 Table of Contents

- [🧭 Overview](#-overview)
- [✨ Features](#-features)
- [⚡ Quick Start](#-quick-start)
- [📂 Project Structure](#-project-structure)
- [🗺️ Routes](#️-routes)
- [💳 Pricing Plans](#-pricing-plans)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎨 Design System and Theming](#-design-system-and-theming)
- [⚠️ Known Limitations](#️-known-limitations)
- [📄 License](#-license)

---

## 🧭 Overview

ApoliakHost is a single-page (SPA) marketing presentation for a fictional game server and VPS hosting company, with the main emphasis on Minecraft. Beyond the landing page it also contains a complete simulation of a client panel - server creation, restart, a console with a running log and resource scaling.

The entire application is **frontend only**. There is no backend, API, database or payment gateway - every "deploy", login and server metric is simulated in the browser via `setTimeout` and React state. The source code does not contain a single `fetch`, `axios` or XHR call.

The whole application lives in the `webroot/` folder. The repository root contains only `LICENSE`, this README, its Slovak counterpart and an unused image backup.

> [!IMPORTANT]
> This is a **demo / prototype**, not a working hosting product. All statistics, prices and testimonials are made up and hardcoded in the components.

---

## ✨ Features

- 🎬 **Animated landing page** - Hero, live stat bar, game catalogue, feature bento, pricing, infrastructure, testimonials, world map and FAQ, assembled in `pages/Home.jsx`.
- 🌌 **Canvas particle system** - a custom HTML5 Canvas 2D effect in `Hero.jsx` with 52 particles and connecting lines based on distance, plus blurred gradient orbs.
- 🕹️ **Catalogue of 6 games** - Minecraft, Rust, Counter-Strike 2, ARK, Valheim, DayZ, with category filtering, a 3D mouse-driven tilt effect and a detail modal.
- 🚀 **Simulated deployment** - a 5-step fake provisioning progress bar (allocating resources → NVMe → DDoS rules → starting services → finalizing), confetti via `canvas-confetti` and a redirect into the client area.
- 💰 **Two pricing tables** - 6 Minecraft tiers (Dirt through Netherite) and 3 VPS plans, both with a monthly / yearly toggle.
- 🖥️ **Client dashboard** - `pages/ClientArea.jsx` (413 lines) behind a `ProtectedRoute`: server cards with CPU/RAM gauges, status pills and an activity feed.
- 🔧 **Server detail** - Overview / Console / Resources tabs, renaming, restart, deletion with confirmation, a fake console that appends 3 lines at 1.4 s intervals once the tab is opened and then stops, and a resource scaling slider from 40-220 %.
- 🔐 **Login and registration** - client-side validation (email regex, min. 6 characters for login / 8 for registration), a password visibility toggle and an artificial latency of 650-750 ms.
- 🧭 **Reactive navbar** - hides when scrolling down, reappears when scrolling up, switches to a glass style and changes its buttons based on the login state.
- 🌍 **Interactive world map** - 6 clickable locations (Frankfurt, New York, London, Singapore, Tokyo, Los Angeles) with tooltips showing latency and server counts.
- 💬 **Testimonials and FAQ** - a carousel that auto-advances every 5 s and an accordion with animated expansion.

---

## ⚡ Quick Start

> [!WARNING]
> All commands are run from the `webroot/` folder. There is **no** `package.json` in the repository root.

```bash
cd webroot
npm install
npm run dev
```

The Vite dev server runs by default at `http://localhost:5173`.

### Available npm scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Starts the Vite dev server with hot reload |
| `npm run build`   | Creates a production build in `webroot/dist/` |
| `npm run preview` | Serves the already built `dist/`          |
| `npm run lint`    | Runs ESLint across the whole project      |

### Requirements

| Item          | Value                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| Node.js       | current LTS (Vite 8 and ESLint 10 do not support old versions); the `engines` field is not defined in `package.json` |
| Configuration | none - there is no `.env` and no environment variable is read anywhere in the code                        |
| Network       | required only for Google Fonts (Inter + Outfit); offline the page renders with system fonts               |

> [!NOTE]
> A reproducible install is possible via `npm ci` - the repository contains `package-lock.json` (lockfileVersion 3).

---

## 📂 Project Structure

```text
Hosting_Website/
├── LICENSE                    # full text of the GNU GPL v3
├── README.md                  # Slovak version (primary)
├── README.en.md               # this file
├── images_backup/             # 46 images, a duplicate of webroot/public/images (never used)
└── webroot/                   # the entire application
    ├── index.html             # Vite entry, mounts #root and loads Google Fonts
    ├── package.json           # the only project manifest
    ├── package-lock.json      # lockfileVersion 3
    ├── vite.config.js         # React plugin only, otherwise default settings
    ├── postcss.config.js      # @tailwindcss/postcss + autoprefixer
    ├── tailwind.config.js     # legacy v3 config - NOT USED (see limitations)
    ├── eslint.config.js       # flat config, react-hooks + react-refresh
    ├── .gitignore             # leftover from the Vite template
    ├── README.md              # untouched "React + Vite" template - unused
    ├── public/
    │   ├── images/            # game banners, OS logos, world map, icons (served from /images/*)
    │   ├── favicon.svg        # unused
    │   └── icons.svg          # unused
    └── src/
        ├── main.jsx           # ReactDOM.createRoot in StrictMode
        ├── App.jsx            # AuthProvider > BrowserRouter > Navbar + Routes + Footer
        ├── index.css          # Tailwind v4 @theme tokens + custom utility classes
        ├── App.css            # leftover from the Vite template - unused
        ├── assets/            # hero.png, react.svg, vite.svg - unused
        ├── context/
        │   └── AuthContext.jsx    # the entire "backend": login state + server array
        ├── pages/
        │   ├── Home.jsx           # landing page + local GlobalLiveBar, HowItWorks, Testimonials
        │   ├── Minecraft.jsx      # Hero + Pricing + feature blocks
        │   ├── VPS.jsx            # Hero + VPSPricing + GlobalNetwork
        │   ├── Login.jsx          # login form
        │   ├── Register.jsx       # registration form
        │   └── ClientArea.jsx     # control panel simulation (the largest file)
        └── components/
            ├── Navbar.jsx         # navigation reacting to scroll and login state
            ├── Hero.jsx           # canvas particle system, reused on 3 pages
            ├── GamesCarousel.jsx  # game catalogue + deploy modal
            ├── Features.jsx       # feature bento grid
            ├── Pricing.jsx        # 6 Minecraft plans
            ├── VPSPricing.jsx     # 3 VPS plans
            ├── GlobalNetwork.jsx  # interactive location map
            ├── FAQ.jsx            # accordion
            └── Footer.jsx         # footer
```

Items marked `unused` are dead leftovers from the Vite template - details in the [Known Limitations](#️-known-limitations) section.

---

## 🗺️ Routes

Defined in `src/App.jsx` via `BrowserRouter`.

| Path         | Component    | Protected | Description                               |
| ------------ | ------------ | --------- | ----------------------------------------- |
| `/`          | `Home`       | no        | Main landing page                         |
| `/minecraft` | `Minecraft`  | no        | Minecraft hosting + pricing               |
| `/vps`       | `VPS`        | no        | VPS hosting + network map                 |
| `/login`     | `Login`      | no        | Login                                     |
| `/register`  | `Register`   | no        | Registration                              |
| `/client`    | `ClientArea` | yes       | Client panel, otherwise redirect to `/login` |

---

## 💳 Pricing Plans

### Minecraft (`components/Pricing.jsx`)

| Plan      | RAM   | vCPU | Storage | Monthly | Yearly (data) | Yearly (displayed) |
| --------- | ----- | ---- | ------- | ------- | ------------- | ------------------ |
| Dirt      | 1 GB  | 1    | 5 GB    | €2      | €19.20        | €19                |
| Wood      | 2 GB  | 2    | 10 GB   | €4      | €38.40        | €38                |
| Cobble    | 4 GB  | 3    | 15 GB   | €8      | €76.80        | €77                |
| Iron      | 6 GB  | 4    | 30 GB   | €10     | €96           | €96                |
| Gold      | 8 GB  | 4    | 50 GB   | €14     | €134.40       | €134               |
| Netherite | 14 GB | 4    | 80 GB   | €20     | €192          | €192               |

> [!NOTE]
> `Pricing.jsx` renders the yearly price via `plan.yearly.toFixed(0)`, so on the page the decimals are rounded to whole euros (€76.80 is shown as €77). The "Yearly (data)" column is the value in the `plans` array, the "Yearly (displayed)" column is what the visitor actually sees.

### VPS (`components/VPSPricing.jsx`)

| Plan       | RAM   | vCPU | Storage | Monthly | Yearly |
| ---------- | ----- | ---- | ------- | ------- | ------ |
| Starter    | 4 GB  | 2    | 50 GB   | €15     | €144   |
| Advanced   | 8 GB  | 4    | 100 GB  | €25     | €240   |
| Enterprise | 16 GB | 8    | 200 GB  | €45     | €432   |

`VPSPricing.jsx` prints `plan.yearly` directly, without rounding - these values therefore match the page exactly.

> [!CAUTION]
> The prices are fictional. There is no checkout and no payment gateway integration - clicking a plan merely creates a server in the browser's memory.

---

## 🛠️ Tech Stack

| Category     | Technology                              | Version            |
| ------------ | --------------------------------------- | ------------------ |
| UI library   | React + React DOM                       | ^19.2.6            |
| Routing      | react-router-dom                        | ^7.17.0            |
| Build tool   | Vite + @vitejs/plugin-react             | ^8.0.12 / ^6.0.1   |
| Styling      | Tailwind CSS v4 (CSS-first `@theme`)    | ^4.3.1             |
| Animation    | framer-motion                           | ^12.40.0           |
| Icons        | lucide-react                            | ^1.18.0            |
| Effects      | canvas-confetti                         | ^1.9.4             |
| Linting      | ESLint (flat config)                    | ^10.3.0            |

The language is plain JavaScript / JSX. The `@types/react` and `@types/react-dom` packages are installed, but the project has neither TypeScript nor a `tsconfig.json` - they only serve the editor.

---

## 🎨 Design System and Theming

The base palette, fonts and animations are defined as CSS custom properties in the `@theme` block in `webroot/src/index.css`.

| Token                   | Value     | Usage                                        |
| ----------------------- | --------- | -------------------------------------------- |
| `--color-dark`          | `#050507` | page background (`bg-dark` in `App.jsx`)     |
| `--color-accent-blue`   | `#00f0ff` | primary accent, links, focus ring            |
| `--color-accent-purple` | `#a855f7` | secondary accent                             |
| `--color-accent-yellow` | `#facc15` | "Most popular" and "Save 20%" badges         |
| `--color-accent-red`    | `#f43f5e` | error states                                 |
| `--color-gray-text`     | `#8a90a3` | secondary text                               |
| `--font-sans`           | Inter     | body text                                    |
| `--font-display`        | Outfit    | headings                                     |
| `--color-card`          | `#0f1119` | **defined but never used** - the cards actually use the `.glass-dark` utility with a hardcoded `rgba(10, 11, 16, 0.85)` |
| `--color-light-dark`    | `#0c0e14` | **defined but never used**                   |
| `--color-semi-dark`     | `#14161f` | **defined but never used**                   |

> [!WARNING]
> `@theme` is **not the only place** you need to edit when changing the look. Part of the palette is hardcoded outside of it:
>
> - in `index.css`: the backgrounds and borders of the `.glass` / `.glass-dark` / `.glass-strong` utilities (literal `rgba(...)`), the scrollbar colours (`#0a0b11`, `#2a2f3d`, `#3a4154`), `.step` (`#00f0ff`), `.deploy-progress` and `::selection` (`#00f0ff` / `#050507`);
> - in `Hero.jsx`: the particle colour `rgba(0, 240, 255, ...)` and the connecting line colour `rgba(168, 85, 247, 0.08)` straight in the canvas code, where no CSS variable can reach;
> - in `Login.jsx` and `Register.jsx`: `bg-[#050507]`, `bg-[radial-gradient(#1a1f2e...)]` and `bg-[#0c0e14]`.
>
> Recolouring the site through `@theme` alone therefore will not change these places.

The file also contains custom utility classes: `glass`, `glass-dark`, `glass-strong` (glassmorphism via `backdrop-filter`), gradient text, a noise texture, a grid background, shimmer, `tilt-card` and a restyled scrollbar.

---

## ⚠️ Known Limitations

The following points are verified directly against the source code.

**Authentication is not a security boundary.**
`AuthContext.login()` merely sets a boolean to `true`. Any string matching the regex `/\S+@\S+\.\S+/` together with a 6-character password will open `/client`. On top of that, the `Pricing.jsx`, `VPSPricing.jsx` and `GamesCarousel.jsx` components call `login()` automatically when Deploy is clicked, so the "protected" dashboard can be reached without the user ever seeing the login form.

**Nothing is persisted.**
Servers, console logs and the login state live purely in React state. There is not a single use of `localStorage` or `sessionStorage` in the code. Refreshing the page wipes all created servers and logs the user out; refreshing directly on `/client` redirects back to `/login`.

**Likely crash when filtering games.**
`GamesCarousel.jsx` (around line 176) calls the custom `useTilt()` hook inside a `.map()` over `filteredGames`. The number of hooks therefore changes with the active category (All = 6 games, Sandbox = 1 game), which React rejects with the error *"Rendered fewer hooks than expected"*. `npm run lint` should flag this through the `react-hooks` rules.

**Dynamic Tailwind classes are never generated.**
`Features.jsx` composes classes such as `` `bg-${f.accent}/10` `` and `GlobalNetwork.jsx` uses `` `bg-${loc.color}` ``. Tailwind's static scanner cannot see interpolated strings, so the feature icons and the map nodes lose their intended accent colours.

**`tailwind.config.js` is dead code.**
The project runs on Tailwind v4 with CSS-based configuration (`@theme` in `index.css`) and there is no `@config` directive anywhere, so the v3-style config is never loaded at all. Its values also differ from the real ones (`accentBlue #00e5ff` vs. `--color-accent-blue #00f0ff`), which can be confusing during edits.

**Some design tokens are unused.**
`--color-card`, `--color-light-dark` and `--color-semi-dark` are defined in `@theme`, but not a single utility in `src/` consumes them. Changing them has no effect on the appearance - details in the [Design System and Theming](#-design-system-and-theming) section.

**All the numbers are marketing fiction.**
The server and player counts, the uptime SLA, the 1.2 Tbps DDoS protection, the number of locations and the names in the testimonials are hardcoded in the components. The FAQ even contradicts the rest of the site (it states 480 Gbps DDoS and a 60-second setup). The "live" counters on the home page are a fake growing loop - `Home.jsx` increments the player count every 2.4 s and everything resets after a reload.

**The console in the server detail stops after a while.**
The `setInterval` in `ClientArea.jsx` (lines 96-103) ticks every 1400 ms, but the callback starts with the condition `if (idx >= extra.length) return;` and the `extra` array has only three items. The console therefore appends three more lines to the three static ones over roughly 4.2 s and then goes silent, while the timer keeps running idle until the tab is closed.

**Deployment requires an SPA fallback.**
`dist/` is fully static, but the routing uses `BrowserRouter` without a `basename` and without a `HashRouter` fallback. The hosting must have a catch-all rewrite to `index.html` configured, otherwise opening or refreshing `/minecraft`, `/vps`, `/login`, `/register` and `/client` directly returns a 404.

**Inactive UI elements.**
The Discord and Google login buttons and the "Forgot?" link only show an `alert()`. Most of the footer links (Dedicated Servers, Web Hosting, About Us, Contact, Terms of Service, Privacy Policy, Knowledge Base, Submit Ticket, Discord Community) are plain `<span>` elements with no target. The client area sidebar has three tabs - Dashboard, Billing and Settings. The Billing tab is explicitly marked as a preview ("Preview mode — all charges paused"). The Settings tab (whose heading reads "Account") is not marked - its two pre-filled fields and the "Save changes" button have no `onClick` handler, so clicking silently does nothing.

**Dead files.**
`images_backup/` in the root is an identical copy of `webroot/public/images`. `src/App.css` and `src/assets/` (hero.png, react.svg, vite.svg) are unused leftovers from the Vite template, as are `public/favicon.svg` and `public/icons.svg`. The file `webroot/README.md` is still the original "React + Vite" template.

**No tests and no CI.**
The repository contains no test framework, no CI configuration and no Dockerfile. Quality is checked solely by `npm run lint`.

**Performance on weaker hardware.**
The Hero particle animation runs in an uncapped `requestAnimationFrame` loop with an O(n²) distance check and does not respect `prefers-reduced-motion`. Together with the heavy `backdrop-filter` in the glass utilities, the landing page is fairly demanding.

---

## 📄 License

The project is licensed under the **GNU General Public License v3.0**. The `LICENSE` file in the repository root contains the complete, unmodified text of the license including the "How to Apply These Terms to Your New Programs" appendix.

> [!NOTE]
> The template line `Copyright (C) <year> <name of author>` was never filled in and no source file carries a GPL header - the license is therefore included, but not formally applied to the work.

---

<div align="center">

Built by **Alex Poliak** - [GitHub](https://github.com/Apoliak7777) - [alexpoliak21@gmail.com](mailto:alexpoliak21@gmail.com)

</div>
