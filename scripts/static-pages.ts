import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { pages, profile } from '../src/data/profile';
import { projects } from '../src/data/projects';

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const baseParts = (env.VITE_BASE_PATH || '/').split('/').filter(Boolean);
const base = `/${baseParts.length ? `${baseParts.join('/')}/` : ''}`;
const siteOrigin = (env.VITE_SITE_URL || '').replace(/\/$/, '');
if (siteOrigin && !/^https?:\/\/[^/]+$/.test(siteOrigin))
  throw new Error(
    'VITE_SITE_URL must be an origin, e.g. https://yani0514.github.io (no path). Set the path in VITE_BASE_PATH.',
  );
const template = await readFile('dist/index.html', 'utf8');
const allPages = [
  ...Object.entries(pages).map(([route, meta]) => ({ route, ...meta })),
  ...projects.map((project) => ({
    route: `/projects/${project.slug}`,
    title: `${project.title} — Yanislav Velikov`,
    description: project.summary,
  })),
];
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!,
  );
const urlFor = (route: string) =>
  `${siteOrigin}${base}${route === '/' ? '' : `${route.slice(1)}/`}`;
for (const page of allPages) {
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/,
      `$1${escape(page.description)}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?>)/,
      `$1${escape(page.title)}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?>)/,
      `$1${escape(page.description)}$2`,
    );
  if (siteOrigin) {
    html = html.replace(
      /(<meta\s+property="og:image"\s+content=")[^"]*("\s*\/?>)/,
      `$1${siteOrigin}${base}images/social-preview.jpg$2`,
    );
    html = html.replace(
      '</head>',
      `<link rel="canonical" href="${escape(urlFor(page.route))}" /><meta property="og:url" content="${escape(urlFor(page.route))}" /></head>`,
    );
  }
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    ...(siteOrigin ? { url: urlFor(page.route) } : {}),
    name: page.title,
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      description: `${profile.title} interested in ${profile.focus}`,
      sameAs: [profile.github],
      homeLocation: { '@type': 'Place', name: profile.location },
    },
  };
  html = html.replace(
    '</head>',
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script></head>`,
  );
  const directory = resolve('dist', page.route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
await writeFile(
  'dist/404.html',
  template
    .replace(
      '<title>Yanislav Velikov — Robotics & Cyber-Physical Systems</title>',
      '<title>Page Not Found — Yanislav Velikov</title>',
    )
    .replace('</head>', '<meta name="robots" content="noindex,follow" /></head>'),
);
await writeFile('dist/.nojekyll', '');
await writeFile(
  'dist/robots.txt',
  `User-agent: *\nAllow: /\n${siteOrigin ? `Sitemap: ${siteOrigin}${base}sitemap.xml\n` : ''}`,
);
if (siteOrigin) {
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allPages.map((p) => `<url><loc>${escape(urlFor(p.route))}</loc></url>`).join('')}</urlset>\n`,
  );
}
console.log(
  `Generated ${allPages.length} route entry pages, 404 fallback and robots.txt${siteOrigin ? ', canonical metadata and sitemap.xml' : ' (set VITE_SITE_URL to add canonical URLs and sitemap)'}. Base: ${base}`,
);
