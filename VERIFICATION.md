# Verification — 16 November 2026

## Completed checks

- Strict TypeScript check: passed.
- ESLint: passed with no errors or warnings.
- Vitest / React Testing Library: 12 tests passed. These cover route navigation, active navigation, browser history, direct case-study rendering, unknown slugs, mobile menu dismissal/focus, project search/filter/reset, URL-restored filters, skill selection, exact pursuit geometry and coverage source selection.
- Production build: passed. Fourteen static route entries are emitted: six primary pages and eight case studies, plus a 404 fallback.
- Static output verifier: passed for both `/` and `/portfolio-preview/`. Checks include unique titles/descriptions, matching Open Graph text, valid asset URLs, route entries and configured canonical metadata/sitemap.
- A strict local static server served all fourteen production routes under the test repository subpath with HTTP 200. Unknown paths returned HTTP 404. This server has no SPA rewrite, so the check exercises actual directory entries.
- Browser checks of the production subpath: direct nested case-study navigation, refresh and back/forward history all worked. Metadata remained specific to the page.
- Responsive browser matrix: homepage, About, Projects, Skills, Education, Contact and the racing case study at 375, 768, 1024, 1440 and 1920 pixels (35 combinations). No horizontal document overflow or broken images were detected.
- Manual browser checks: mobile menu and project navigation, combined category/search, Pure Pursuit slider, lazy-loaded 3D view, and all/none coverage-source controls worked.
- Browser console: no application errors observed. Opening the optional 3D scene produces an upstream Three.js `Clock` deprecation warning; the scene renders successfully.
- Dependency audit: zero known vulnerabilities in the final installed tree.

## Performance observations

The desktop WebP hero is 61,106 bytes; the smaller source is 29,990 bytes. Fonts are served locally. The main production application chunk is approximately 146 kB gzip. The optional 3D scene is approximately 253 kB gzip and is not requested until its button is activated. Vite reports a size advisory for that isolated 3D chunk.

No Lighthouse score is claimed; a Lighthouse audit was not run. Reduced motion is supported through both the operating-system preference and the site preference. WebGL failure is covered by a fallback; the functional SVG demo does not depend on WebGL.

## Evidence

Local verification artifacts are intentionally ignored by Git:

- `artifacts/responsive-checks.json`
- `artifacts/http-routing-checks.json`
- `artifacts/dependency-audit.json`
- `artifacts/production-build.log`
- `artifacts/screenshots/home-desktop.jpg`
- `artifacts/screenshots/home-mobile.jpg`
- `artifacts/screenshots/projects-desktop.jpg`
- `artifacts/screenshots/about-desktop.jpg`
- `artifacts/screenshots/education-desktop.jpg`
- `artifacts/screenshots/contact-desktop.jpg`

## Deployment status

The GitHub Pages Actions workflow is implemented, with separate build/read and deployment/write permissions. The workspace did not contain a Git repository or remote, so no remote push or hosted deployment has been performed. Follow README.md to connect the intended repository and enable Pages. The workflow derives the actual base path and origin from GitHub rather than assuming a repository name.

The final local build uses `/` without an invented public domain. Canonical URLs and the sitemap are generated when the real origin is supplied. The test origin `https://example.test` was used only for the subpath verification build and is absent from the final build.
