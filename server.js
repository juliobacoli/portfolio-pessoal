const express = require('express');
const path = require('path');
const app = express();

const DIST = path.join(__dirname, 'dist/portfolio-pessoal/browser');
// Arquivos gerados pelo build com hash no nome (ex.: main-HWQHVFZH.js) nunca mudam de conteúdo
const HASHED = /-[A-Z0-9]{8}\.(js|css)$/;

app.set('trust proxy', true);

app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://*.cloudflare.com https://challenges.cloudflare.com https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://www.google.com",
    "connect-src 'self' https://firestore.googleapis.com https://api.emailjs.com https://*.cloudflare.com https://cloudflareinsights.com",
    "frame-ancestors 'none'",
  ].join('; '));
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  next();
});

const BLOCKED = /(\.\.|\.env|\.git|server\.js|package\.json|node_modules)/i;

app.use((req, res, next) => {
  if (BLOCKED.test(req.path)) return res.status(404).end();
  next();
});

app.use(express.static(DIST, {
  setHeaders: (res, filePath) => {
    if (HASHED.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (filePath.endsWith('.html') || filePath.endsWith('.json')) {
      // index.html e traduções: sempre revalida, para o deploy novo aparecer na hora
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  },
}));

app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(process.env.PORT || 8080);
