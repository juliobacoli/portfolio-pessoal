const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://www.google.com",
    "connect-src 'self' https://firestore.googleapis.com https://api.emailjs.com",
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

app.use(express.static(path.join(__dirname, 'dist/portfolio-pessoal/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/portfolio-pessoal/browser/index.html'));
});

app.listen(process.env.PORT || 8080);
