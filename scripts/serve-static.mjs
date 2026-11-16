// Strict static preview for validating GitHub Pages directory routing.
// Unlike the Vite development server, this never rewrites missing routes to index.html.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const base = process.env.STATIC_BASE_PATH || '/';
const port = Number(process.env.STATIC_PORT || 4174);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    if (!pathname.startsWith(base)) throw new Error('Outside base');
    let file = path.resolve(root, pathname.slice(base.length));
    if (file !== root && !file.startsWith(root + path.sep)) throw new Error('Outside root');
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith('/')) {
        res.writeHead(301, {
          Location: pathname + '/' + new URL(req.url, 'http://localhost').search,
        });
        res.end();
        return;
      }
      file = path.join(file, 'index.html');
    }
    const data = await readFile(file);
    res.writeHead(200, {
      'Content-Type': mime[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(path.join(root, '404.html')));
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log(`Static directory preview: http://127.0.0.1:${port}${base}`),
);
