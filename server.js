const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Normalize trailing slash (except root)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
    res.writeHead(301, { Location: pathname + (parsedUrl.search || '') });
    return res.end();
  }

  // Redirect legacy .html to clean URL (e.g., /about.html -> /about)
  if (pathname.endsWith('.html')) {
    const cleanPath = pathname === '/index.html' ? '/' : pathname.replace(/\.html$/, '');
    res.writeHead(301, { Location: cleanPath + (parsedUrl.search || '') });
    return res.end();
  }

  // Map root to index.html
  let filePath = pathname === '/' 
    ? path.join(PUBLIC_DIR, 'index.html') 
    : path.join(PUBLIC_DIR, pathname);

  fs.stat(filePath, (err, stats) => {
    // 1. Direct file match exists (e.g. styles, images, js)
    if (!err && stats.isFile()) {
      return sendFile(res, filePath);
    }

    // 2. Direct directory match (check for index.html inside)
    if (!err && stats.isDirectory()) {
      const dirIndex = path.join(filePath, 'index.html');
      if (fs.existsSync(dirIndex)) {
        return sendFile(res, dirIndex);
      }
    }

    // 3. Extensionless clean route resolution (e.g., /about -> about.html)
    const htmlCandidate = `${filePath}.html`;
    if (fs.existsSync(htmlCandidate) && fs.statSync(htmlCandidate).isFile()) {
      return sendFile(res, htmlCandidate);
    }

    // 4. File Not Found -> Serve 404.html if available
    const notFoundPage = path.join(PUBLIC_DIR, '404.html');
    if (fs.existsSync(notFoundPage)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(notFoundPage).pipe(res);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  });
});

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const isHtml = ext === '.html';
  const headers = {
    'Content-Type': contentType,
    'Cache-Control': isHtml ? 'no-cache, must-revalidate' : 'public, max-age=3600'
  };

  res.writeHead(200, headers);
  fs.createReadStream(filePath).pipe(res);
}

server.listen(PORT, () => {
  console.log(`\n🚀 LLCG Team Clean URL Server running at:`);
  console.log(`   ➜ Local:   http://localhost:${PORT}/`);
  console.log(`   ➜ Clean:   http://localhost:${PORT}/about`);
  console.log(`   ➜ Clean:   http://localhost:${PORT}/work`);
  console.log(`   ➜ Clean:   http://localhost:${PORT}/services`);
  console.log(`   ➜ Clean:   http://localhost:${PORT}/lets-talk\n`);
});
