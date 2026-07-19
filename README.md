<div align="center">

[![Slovencina](https://img.shields.io/badge/SK-Sloven%C4%8Dina-2ea043?style=for-the-badge)](README.md) [![English](https://img.shields.io/badge/EN-English-30363d?style=for-the-badge)](README.en.md)

# 🎮 ApoliakHost

**Plne klikateľný frontend prototyp webu pre hosting game serverov a VPS - postavený na React 19, Vite 8 a Tailwind CSS v4.**

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.17-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.40-0055FF?style=flat-square&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-GPL_3.0-blue?style=flat-square)

</div>

---

## 📑 Obsah

- [🧭 Prehľad](#-prehľad)
- [✨ Funkcie](#-funkcie)
- [⚡ Rýchly štart](#-rýchly-štart)
- [📂 Štruktúra projektu](#-štruktúra-projektu)
- [🗺️ Routy](#️-routy)
- [💳 Cenníkové plány](#-cenníkové-plány)
- [🛠️ Tech stack](#️-tech-stack)
- [🎨 Design systém a theming](#-design-systém-a-theming)
- [⚠️ Známe obmedzenia](#️-známe-obmedzenia)
- [📄 Licencia](#-licencia)

---

## 🧭 Prehľad

ApoliakHost je jednostránková (SPA) marketingová prezentácia fiktívnej hostingovej firmy pre herné servery a VPS, s hlavným dôrazom na Minecraft. Okrem landing page obsahuje aj kompletnú simuláciu klientskeho panela - vytváranie serverov, reštart, konzolu s bežiacim logom a škálovanie zdrojov.

Celá aplikácia je **výhradne frontend**. Neexistuje backend, API, databáza ani platobná brána - každý "deploy", prihlásenie aj metrika servera je simulovaný v prehliadači cez `setTimeout` a React state. V zdrojovom kóde nie je ani jedno volanie `fetch`, `axios` či XHR.

Aplikácia žije celá v priečinku `webroot/`. Koreň repozitára obsahuje len `LICENSE`, tento README, jeho anglickú verziu a nepoužívanú zálohu obrázkov.

> [!IMPORTANT]
> Toto je **demo / prototyp**, nie funkčný hostingový produkt. Všetky štatistiky, ceny aj referencie sú vymyslené a natvrdo zapísané v komponentoch.

---

## ✨ Funkcie

- 🎬 **Animovaná landing page** - Hero, live stat bar, katalóg hier, feature bento, cenník, infraštruktúra, referencie, mapa sveta a FAQ, poskladané v `pages/Home.jsx`.
- 🌌 **Canvas particle systém** - vlastný HTML5 Canvas 2D efekt v `Hero.jsx` s 52 časticami a spájajúcimi čiarami podľa vzdialenosti, plus rozostrené gradientové orby.
- 🕹️ **Katalóg 6 hier** - Minecraft, Rust, Counter-Strike 2, ARK, Valheim, DayZ, s filtrom kategórií, 3D tilt efektom podľa myši a detailným modálom.
- 🚀 **Simulovaný deployment** - 5-krokový fake provisioning progress bar (allocating resources → NVMe → DDoS pravidlá → štart služieb → finalizing), konfety cez `canvas-confetti` a presmerovanie do klientskej zóny.
- 💰 **Dva cenníky** - 6 Minecraft tierov (Dirt až Netherite) a 3 VPS plány, oba s prepínačom mesačne / ročne.
- 🖥️ **Klientsky dashboard** - `pages/ClientArea.jsx` (413 riadkov) za `ProtectedRoute`: karty serverov s CPU/RAM ukazovateľmi, status pilulkami a activity feedom.
- 🔧 **Detail servera** - záložky Overview / Console / Resources, premenovanie, reštart, mazanie s potvrdením, fake konzola, ktorá po otvorení záložky dopíše 3 riadky v intervale 1,4 s a potom sa zastaví, a slider škálovania zdrojov 40-220 %.
- 🔐 **Prihlásenie a registrácia** - validácia na strane klienta (regex na email, min. 6 znakov pri logine / 8 pri registrácii), toggle zobrazenia hesla a umelá latencia 650-750 ms.
- 🧭 **Reaktívny navbar** - schová sa pri scrollovaní dole, objaví sa pri scrollovaní hore, prepína sa na glass štýl a mení tlačidlá podľa stavu prihlásenia.
- 🌍 **Interaktívna mapa sveta** - 6 klikateľných lokalít (Frankfurt, New York, Londýn, Singapur, Tokio, Los Angeles) s tooltipmi o latencii a počte serverov.
- 💬 **Referencie a FAQ** - carousel s automatickým posunom každých 5 s a akordeón s animovaným rozbaľovaním.

---

## ⚡ Rýchly štart

> [!WARNING]
> Všetky príkazy sa spúšťajú z priečinka `webroot/`. V koreni repozitára **nie je** žiadny `package.json`.

```bash
cd webroot
npm install
npm run dev
```

Dev server Vite beží štandardne na `http://localhost:5173`.

### Dostupné npm skripty

| Príkaz            | Popis                                     |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Spustí Vite dev server s hot reloadom     |
| `npm run build`   | Vytvorí produkčný build do `webroot/dist/` |
| `npm run preview` | Naservíruje už vybuildovaný `dist/`       |
| `npm run lint`    | Spustí ESLint nad celým projektom         |

### Požiadavky

| Položka       | Hodnota                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| Node.js       | aktuálne LTS (Vite 8 a ESLint 10 nepodporujú staré verzie); pole `engines` nie je v `package.json` definované |
| Konfigurácia  | žiadna - neexistuje `.env` a žiadna premenná prostredia sa v kóde nečíta                                   |
| Sieť          | potrebná len pre Google Fonts (Inter + Outfit); offline sa stránka vykreslí so systémovými fontmi          |

> [!NOTE]
> Reprodukovateľná inštalácia je možná cez `npm ci` - repozitár obsahuje `package-lock.json` (lockfileVersion 3).

---

## 📂 Štruktúra projektu

```text
Hosting_Website/
├── LICENSE                    # plný text GNU GPL v3
├── README.md                  # tento súbor
├── README.en.md               # anglická verzia
├── images_backup/             # 46 obrázkov, duplikát webroot/public/images (nikde sa nepoužíva)
└── webroot/                   # celá aplikácia
    ├── index.html             # Vite entry, mountuje #root a načíta Google Fonts
    ├── package.json           # jediný manifest projektu
    ├── package-lock.json      # lockfileVersion 3
    ├── vite.config.js         # len React plugin, inak default nastavenia
    ├── postcss.config.js      # @tailwindcss/postcss + autoprefixer
    ├── tailwind.config.js     # legacy v3 config - NEPOUŽÍVA SA (viď obmedzenia)
    ├── eslint.config.js       # flat config, react-hooks + react-refresh
    ├── .gitignore             # zvyšok Vite šablóny
    ├── README.md              # nezmenený "React + Vite" template - nepoužité
    ├── public/
    │   ├── images/            # bannery hier, logá OS, mapa sveta, ikony (servované z /images/*)
    │   ├── favicon.svg        # nepoužité
    │   └── icons.svg          # nepoužité
    └── src/
        ├── main.jsx           # ReactDOM.createRoot v StrictMode
        ├── App.jsx            # AuthProvider > BrowserRouter > Navbar + Routes + Footer
        ├── index.css          # Tailwind v4 @theme tokeny + vlastné utility triedy
        ├── App.css            # zvyšok Vite šablóny - nepoužité
        ├── assets/            # hero.png, react.svg, vite.svg - nepoužité
        ├── context/
        │   └── AuthContext.jsx    # celý "backend": stav prihlásenia + pole serverov
        ├── pages/
        │   ├── Home.jsx           # landing page + lokálne GlobalLiveBar, HowItWorks, Testimonials
        │   ├── Minecraft.jsx      # Hero + Pricing + feature bloky
        │   ├── VPS.jsx            # Hero + VPSPricing + GlobalNetwork
        │   ├── Login.jsx          # prihlasovací formulár
        │   ├── Register.jsx       # registračný formulár
        │   └── ClientArea.jsx     # simulácia control panelu (najväčší súbor)
        └── components/
            ├── Navbar.jsx         # navigácia reagujúca na scroll a stav prihlásenia
            ├── Hero.jsx           # canvas particle systém, znovupoužitý na 3 stránkach
            ├── GamesCarousel.jsx  # katalóg hier + deploy modál
            ├── Features.jsx       # bento mriežka vlastností
            ├── Pricing.jsx        # 6 Minecraft plánov
            ├── VPSPricing.jsx     # 3 VPS plány
            ├── GlobalNetwork.jsx  # interaktívna mapa lokalít
            ├── FAQ.jsx            # akordeón
            └── Footer.jsx         # pätička
```

Položky označené `nepoužité` sú mŕtve zvyšky Vite šablóny - podrobnosti v sekcii [Známe obmedzenia](#️-známe-obmedzenia).

---

## 🗺️ Routy

Definované v `src/App.jsx` cez `BrowserRouter`.

| Cesta        | Komponent    | Chránená | Popis                                     |
| ------------ | ------------ | -------- | ----------------------------------------- |
| `/`          | `Home`       | nie      | Hlavná landing page                       |
| `/minecraft` | `Minecraft`  | nie      | Minecraft hosting + cenník                |
| `/vps`       | `VPS`        | nie      | VPS hosting + mapa siete                  |
| `/login`     | `Login`      | nie      | Prihlásenie                               |
| `/register`  | `Register`   | nie      | Registrácia                               |
| `/client`    | `ClientArea` | áno      | Klientsky panel, inak redirect na `/login` |

---

## 💳 Cenníkové plány

### Minecraft (`components/Pricing.jsx`)

| Plán      | RAM   | vCPU | Storage | Mesačne | Ročne (dáta) | Ročne (zobrazené) |
| --------- | ----- | ---- | ------- | ------- | ------------ | ----------------- |
| Dirt      | 1 GB  | 1    | 5 GB    | 2 €     | 19,20 €      | 19 €              |
| Wood      | 2 GB  | 2    | 10 GB   | 4 €     | 38,40 €      | 38 €              |
| Cobble    | 4 GB  | 3    | 15 GB   | 8 €     | 76,80 €      | 77 €              |
| Iron      | 6 GB  | 4    | 30 GB   | 10 €    | 96 €         | 96 €              |
| Gold      | 8 GB  | 4    | 50 GB   | 14 €    | 134,40 €     | 134 €             |
| Netherite | 14 GB | 4    | 80 GB   | 20 €    | 192 €        | 192 €             |

> [!NOTE]
> `Pricing.jsx` vykresľuje ročnú cenu cez `plan.yearly.toFixed(0)`, takže na stránke sa desatinné miesta zaokrúhlia na celé eurá (76,80 € sa zobrazí ako 77 €). Stĺpec "Ročne (dáta)" je hodnota v poli `plans`, stĺpec "Ročne (zobrazené)" je to, čo uvidí návštevník.

### VPS (`components/VPSPricing.jsx`)

| Plán       | RAM   | vCPU | Storage | Mesačne | Ročne |
| ---------- | ----- | ---- | ------- | ------- | ----- |
| Starter    | 4 GB  | 2    | 50 GB   | 15 €    | 144 € |
| Advanced   | 8 GB  | 4    | 100 GB  | 25 €    | 240 € |
| Enterprise | 16 GB | 8    | 200 GB  | 45 €    | 432 € |

`VPSPricing.jsx` vypisuje `plan.yearly` priamo, bez zaokrúhľovania - tieto hodnoty teda zodpovedajú stránke presne.

> [!CAUTION]
> Ceny sú fiktívne. Neexistuje žiadny checkout ani napojenie na platobnú bránu - kliknutie na plán len vytvorí server v pamäti prehliadača.

---

## 🛠️ Tech stack

| Kategória    | Technológia                             | Verzia             |
| ------------ | --------------------------------------- | ------------------ |
| UI knižnica  | React + React DOM                       | ^19.2.6            |
| Routing      | react-router-dom                        | ^7.17.0            |
| Build tool   | Vite + @vitejs/plugin-react             | ^8.0.12 / ^6.0.1   |
| Styling      | Tailwind CSS v4 (CSS-first `@theme`)    | ^4.3.1             |
| Animácie     | framer-motion                           | ^12.40.0           |
| Ikony        | lucide-react                            | ^1.18.0            |
| Efekty       | canvas-confetti                         | ^1.9.4             |
| Linting      | ESLint (flat config)                    | ^10.3.0            |

Jazyk je čistý JavaScript / JSX. Balíky `@types/react` a `@types/react-dom` sú síce nainštalované, ale projekt nemá TypeScript ani `tsconfig.json` - slúžia len editoru.

---

## 🎨 Design systém a theming

Základná paleta, fonty a animácie sú definované ako CSS custom properties v bloku `@theme` v `webroot/src/index.css`.

| Token                   | Hodnota   | Použitie                                     |
| ----------------------- | --------- | -------------------------------------------- |
| `--color-dark`          | `#050507` | pozadie stránky (`bg-dark` v `App.jsx`)      |
| `--color-accent-blue`   | `#00f0ff` | primárny akcent, odkazy, focus ring          |
| `--color-accent-purple` | `#a855f7` | sekundárny akcent                            |
| `--color-accent-yellow` | `#facc15` | badge "Most popular" a "Save 20%"            |
| `--color-accent-red`    | `#f43f5e` | chybové stavy                                |
| `--color-gray-text`     | `#8a90a3` | sekundárny text                              |
| `--font-sans`           | Inter     | základný text                                |
| `--font-display`        | Outfit    | nadpisy                                      |
| `--color-card`          | `#0f1119` | **definované, ale nikde nepoužité** - karty v skutočnosti používajú utilitu `.glass-dark` s natvrdo zapísaným `rgba(10, 11, 16, 0.85)` |
| `--color-light-dark`    | `#0c0e14` | **definované, ale nikde nepoužité**          |
| `--color-semi-dark`     | `#14161f` | **definované, ale nikde nepoužité**          |

> [!WARNING]
> `@theme` **nie je jediné miesto**, ktoré treba editovať pri zmene vzhľadu. Časť palety je natvrdo zapísaná mimo neho:
>
> - v `index.css`: pozadia a orámovania utilít `.glass` / `.glass-dark` / `.glass-strong` (literálne `rgba(...)`), farby scrollbaru (`#0a0b11`, `#2a2f3d`, `#3a4154`), `.step` (`#00f0ff`), `.deploy-progress` a `::selection` (`#00f0ff` / `#050507`);
> - v `Hero.jsx`: farba častíc `rgba(0, 240, 255, ...)` a spájajúcich čiar `rgba(168, 85, 247, 0.08)` priamo v canvas kóde, kam sa žiadna CSS premenná nedostane;
> - v `Login.jsx` a `Register.jsx`: `bg-[#050507]`, `bg-[radial-gradient(#1a1f2e...)]` a `bg-[#0c0e14]`.
>
> Prefarbenie stránky len cez `@theme` teda tieto miesta nezmení.

Súbor obsahuje aj vlastné utility triedy: `glass`, `glass-dark`, `glass-strong` (glassmorphism cez `backdrop-filter`), gradientový text, noise textúru, grid pozadie, shimmer, `tilt-card` a upravený scrollbar.

---

## ⚠️ Známe obmedzenia

Nasledujúce body sú overené priamo v zdrojovom kóde.

**Autentifikácia nie je bezpečnostná hranica.**
`AuthContext.login()` len nastaví boolean na `true`. Ktorýkoľvek reťazec vyhovujúci regexu `/\S+@\S+\.\S+/` a heslo dlhé 6 znakov otvorí `/client`. Navyše komponenty `Pricing.jsx`, `VPSPricing.jsx` aj `GamesCarousel.jsx` volajú `login()` automaticky pri kliknutí na Deploy, takže do "chráneného" dashboardu sa dá dostať bez toho, aby používateľ vôbec videl prihlasovací formulár.

**Nič sa neukladá.**
Servery, logy konzoly aj stav prihlásenia žijú výhradne v React state. V kóde nie je ani jedno použitie `localStorage` alebo `sessionStorage`. Refresh stránky vymaže všetky vytvorené servery a odhlási používateľa; refresh priamo na `/client` presmeruje späť na `/login`.

**Pravdepodobný pád pri filtrovaní hier.**
`GamesCarousel.jsx` (riadok ~176) volá vlastný hook `useTilt()` vnútri `.map()` cez `filteredGames`. Počet hookov sa tak mení podľa aktívnej kategórie (All = 6 hier, Sandbox = 1 hra), čo React odmietne chybou *"Rendered fewer hooks than expected"*. `npm run lint` by na to malo upozorniť cez pravidlá `react-hooks`.

**Dynamické Tailwind triedy sa nikdy nevygenerujú.**
`Features.jsx` skladá triedy ako `` `bg-${f.accent}/10` `` a `GlobalNetwork.jsx` používa `` `bg-${loc.color}` ``. Statický scanner Tailwindu interpolované reťazce nevidí, takže ikony vlastností a uzly na mape prídu o zamýšľané akcentové farby.

**`tailwind.config.js` je mŕtvy kód.**
Projekt beží na Tailwind v4 s konfiguráciou v CSS (`@theme` v `index.css`) a nikde nie je direktíva `@config`, takže sa v3-štýl config vôbec nenačíta. Jeho hodnoty sa navyše líšia od skutočných (`accentBlue #00e5ff` vs. `--color-accent-blue #00f0ff`), čo môže zmiasť pri úpravách.

**Časť dizajnových tokenov je nepoužitá.**
`--color-card`, `--color-light-dark` a `--color-semi-dark` sú v `@theme` definované, ale v `src/` ich nekonzumuje ani jedna utilita. Ich zmena nemá na vzhľad žiadny vplyv - detaily v sekcii [Design systém a theming](#-design-systém-a-theming).

**Všetky čísla sú marketingová fikcia.**
Počty serverov a hráčov, uptime SLA, 1,2 Tbps DDoS ochrana, počet lokalít aj mená v referenciách sú natvrdo v komponentoch. FAQ si dokonca protirečí so zvyškom stránky (uvádza 480 Gbps DDoS a 60-sekundový setup). "Live" počítadlá na hlavnej stránke sú fake rastúca slučka - `Home.jsx` každých 2,4 s zvýši počet hráčov a po reloade sa všetko resetuje.

**Konzola v detaile servera sa po chvíli zastaví.**
`setInterval` v `ClientArea.jsx` (riadky 96-103) tiká každých 1400 ms, ale callback začína podmienkou `if (idx >= extra.length) return;` a pole `extra` má len tri položky. Konzola teda k trom statickým riadkom dopíše ďalšie tri za približne 4,2 s a potom už mlčí, zatiaľ čo časovač beží naprázdno až do zatvorenia záložky.

**Deployment vyžaduje SPA fallback.**
`dist/` je plne statický, ale routing používa `BrowserRouter` bez `basename` a bez fallbacku na `HashRouter`. Hosting musí mať nastavený catch-all rewrite na `index.html`, inak priame otvorenie alebo refresh na `/minecraft`, `/vps`, `/login`, `/register` a `/client` vráti 404.

**Neaktívne prvky UI.**
Tlačidlá Discord a Google prihlásenia a odkaz "Forgot?" len zobrazia `alert()`. Väčšina odkazov v pätičke (Dedicated Servers, Web Hosting, About Us, Contact, Terms of Service, Privacy Policy, Knowledge Base, Submit Ticket, Discord Community) sú obyčajné `<span>` elementy bez cieľa. Bočné menu klientskej zóny má tri záložky - Dashboard, Billing a Settings. Záložka Billing je explicitne označená ako preview ("Preview mode — all charges paused"). Záložka Settings (jej nadpis znie "Account") označená nie je - jej dve predvyplnené polia a tlačidlo "Save changes" nemajú žiadny `onClick` handler, takže kliknutie ticho neurobí nič.

**Mŕtve súbory.**
`images_backup/` v koreni je identická kópia `webroot/public/images`. `src/App.css` a `src/assets/` (hero.png, react.svg, vite.svg) sú nepoužité zvyšky Vite šablóny, rovnako ako `public/favicon.svg` a `public/icons.svg`. Súbor `webroot/README.md` je stále pôvodný "React + Vite" template.

**Žiadne testy ani CI.**
V repozitári nie je testovací framework, CI konfigurácia ani Dockerfile. Kvalitu kontroluje jedine `npm run lint`.

**Výkon na slabšom hardvéri.**
Particle animácia v Hero beží v neobmedzenej `requestAnimationFrame` slučke s O(n²) kontrolou vzdialeností a nerešpektuje `prefers-reduced-motion`. Spolu s intenzívnym `backdrop-filter` v glass utilitách je landing page pomerne náročná.

---

## 📄 Licencia

Projekt je licencovaný pod **GNU General Public License v3.0**. Súbor `LICENSE` v koreni repozitára obsahuje kompletný nezmenený text licencie vrátane prílohy "How to Apply These Terms to Your New Programs".

> [!NOTE]
> Šablónový riadok `Copyright (C) <year> <name of author>` nebol vyplnený a žiadny zdrojový súbor neobsahuje GPL hlavičku - licencia je teda priložená, ale formálne neaplikovaná na dielo.

---

<div align="center">

Vytvoril **Alex Poliak** - [GitHub](https://github.com/Apoliak7777) - [alexpoliak21@gmail.com](mailto:alexpoliak21@gmail.com)

</div>
