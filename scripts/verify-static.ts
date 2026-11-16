import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { loadEnv } from 'vite';
import { projects } from '../src/data/projects';
import { pages } from '../src/data/profile';
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const base = `/${(env.VITE_BASE_PATH || '/').split('/').filter(Boolean).join('/')}`.replace(
  /\/?$/,
  '/',
);
const routes = [...Object.keys(pages), ...projects.map((p) => `/projects/${p.slug}`)];
const titles = new Set<string>();
const descriptions = new Set<string>();
for (const route of routes) {
  const html = await readFile(`dist${route === '/' ? '' : route}/index.html`, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, `${route} has a title`);
  assert.ok(!titles.has(title), `${route} has a unique title`);
  titles.add(title);
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1];
  assert.ok(description, `${route} has a description`);
  assert.ok(!descriptions.has(description), `${route} has a unique description`);
  descriptions.add(description);
  assert.equal(
    html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/)?.[1],
    title,
    `${route} has matching social metadata`,
  );
  assert.equal(
    html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/)?.[1],
    description,
  );
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const value = match[1];
    if (/^https?:/.test(value)) continue;
    assert.ok(value.startsWith(base), `${route}: ${value} respects ${base}`);
    await access(`dist/${value.slice(base.length)}`);
  }
  if (env.VITE_SITE_URL) assert.match(html, /rel="canonical"/);
}
await access('dist/404.html');
await access('dist/.nojekyll');
if (env.VITE_SITE_URL) await access('dist/sitemap.xml');
console.log(
  `Verified ${routes.length} directly addressable routes, unique titles, descriptions, base paths and linked static assets.`,
);
