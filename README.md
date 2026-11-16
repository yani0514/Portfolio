# Yanislav Velikov — Engineering Portfolio

A complete React + TypeScript portfolio with six primary pages and eight individual project case studies. The supplied robotics screenshot is the visual reference; navigation and interface elements are real HTML, and the laboratory artwork is a clean generated asset.

## Run locally

Use Node.js 22.14+ (Node 24 LTS recommended) and npm.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite, usually http://127.0.0.1:5173/.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npx tsx scripts/verify-static.ts
npm run preview
```

`npm run format` formats the source. `npm run test:watch` runs tests interactively.

## Pages and interactions

| Route             | Purpose                                                                               |
| ----------------- | ------------------------------------------------------------------------------------- |
| `/`               | Robotics hero, three featured projects and concise introductions                      |
| `/about`          | Personal background, engineering philosophy and future direction                      |
| `/projects`       | Searchable project collection with category filters encoded in the URL                |
| `/projects/:slug` | Eight detailed case studies with architecture, implementation and documented outcomes |
| `/skills`         | Filterable engineering domains, expandable studied concepts and project references    |
| `/education`      | University of Luxembourg and TU Wien academic timeline                                |
| `/contact`        | Collaboration interests and the supplied GitHub profile                               |
| Unknown routes    | Accessible 404 with a path back to the collection                                     |

The header, sidebar, mobile menu and breadcrumbs use React Router. Search/filter state is shareable, active routes are marked with `aria-current`, and back/forward navigation uses browser history. Page changes reset scroll and move focus to the main landmark; back navigation restores saved positions. The mobile menu supports Escape and returns focus to its trigger.

## GitHub Pages deployment

The project intentionally targets GitHub Pages; no separate hosting service, backend or database is required.

1. Create or select the intended GitHub repository and push this project to its `main` branch. This workspace did not come with a Git remote; no repository name has been assumed.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` installs the lockfile, runs lint and tests, builds all pages, verifies static assets, uploads the Pages artifact and deploys it. Change the trigger if your default branch is not `main`.
4. The workflow reads the real deployment origin and repository base path from `actions/configure-pages`. Repository subpaths, account sites and custom-domain root sites use the same code. Configure a custom domain and HTTPS in GitHub’s Pages settings if required.

Build manually for an example repository subpath in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/your-repository/'
$env:VITE_SITE_URL = 'https://yani0514.github.io'
npm run build
npx tsx scripts/verify-static.ts
Remove-Item Env:VITE_BASE_PATH
Remove-Item Env:VITE_SITE_URL
```

`VITE_SITE_URL` is an **origin only**, with no repository path. `VITE_BASE_PATH` includes the path and trailing slash; default is `/`. See `.env.example`. The local preview defaults to root unless configured otherwise.

### Direct URLs and refreshes

The build emits real `index.html` entry files at all fourteen known routes, such as `dist/about/index.html` and `dist/projects/autonomous-racing-cars/index.html`. GitHub Pages serves those directories directly, including on refresh; it may normalize them to a trailing slash. Each entry has its own title, description, Open Graph metadata and structured data. Configuring the origin also generates canonical links, absolute social image URLs and a sitemap.

React Router handles navigation after loading. `404.html` boots the same app for unknown URLs and renders the not-found page with `noindex`; an unknown URL retains the host’s 404 status. There is no hash router or redirect-query workaround. Adding a project to `src/data/projects.ts` automatically creates its static route on the next build. Changes to the list of primary pages must also be reflected in `src/data/profile.ts`.

These are static application entry pages, not server-rendered article bodies. Interactive content requires JavaScript; metadata is present in the delivered HTML for social previews.

## Content editing

- `src/data/profile.ts`: identity, public links and page metadata. Email, LinkedIn and CV are intentionally empty; only add supplied, valid values. A CV path should be relative to `public/`.
- `src/data/projects.ts`: typed case-study content, categories, technologies, status, architecture, considerations and outcomes. Add one object to add a project and its detail route.
- `src/data/skills.ts`: practical skills, studied concepts and related project slugs.
- `src/data/education.ts`: academic institutions, coursework and project references.

The user’s supplied brief is the source for biographical and project claims. The IoT project is explicitly a concept with documentation pending. The coverage extension is in development. No competition rankings, benchmark results, employment, grades or unsupplied contact details are invented. Project graphics are illustrative SVGs; replace them with authentic assets when available.

## Engineering implementation

- React 19, strict TypeScript, Vite, React Router.
- Tailwind v4 handles common utilities and layout helpers; CSS Modules own component styling, gradients, responsive composition and transitions. Global design tokens live in `src/styles/global.css`.
- GSAP handles page/hero sequences and ScrollTrigger parallax. Lenis drives its updates via the GSAP ticker; all effects and listeners are cleaned up. OS reduced motion and the persistent footer preference disable motion.
- Zustand stores only the shared motion preference. Filters use URL state and isolated demos use local state.
- The SVG Pure Pursuit demo solves the target’s exact intersection with a lookahead circle, then calculates curvature and Ackermann steering. The stationary geometric model is labeled as illustrative and does not claim measured project telemetry.
- The optional Three.js / React Three Fiber / Drei scene is loaded only after an explicit click. It uses a demand-based render loop, bounded device pixel ratio and an error boundary. The 2D experience works without WebGL.
- The coverage demo uses two synthetic sources, union semantics and an explicit executable-line denominator. Its controls are fully functional.
- Semantic landmarks, focus rings, a skip link, descriptive labels, route focus handling and keyboard controls are included.
- Fonts are self-hosted, images are WebP, dimensions are explicit, inner routes and 3D are split into separate chunks. No analytics or third-party runtime requests are necessary.

## Assets and verification

See `design/ASSETS.md` for the image generation prompt, source and final asset paths. The source PNG is outside the public directory; only optimized files ship.

Tests cover routing/history, mobile navigation, filtering, empty states, content references, skill controls, exact pursuit geometry and combined coverage. `scripts/verify-static.ts` verifies the production route entries, metadata and every linked asset under the chosen base path. See `VERIFICATION.md` for the checks performed in this workspace and the remaining deployment step.

Official integration references: [Vite static deployment](https://vite.dev/guide/static-deploy.html), [Tailwind Vite plugin](https://tailwindcss.com/docs/installation/using-vite), [React Three Fiber compatibility](https://r3f.docs.pmnd.rs/getting-started/installation).
