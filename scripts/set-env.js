const fs = require('fs');
const path = require('path');

try {
  require('dotenv').config();
} catch {
  // dotenv ausente em prod (Railway): vars vêm direto do process.env
}

const required = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
  'FIREBASE_MEASUREMENT_ID',
  'EMAILJS_SERVICE_ID',
  'EMAILJS_TEMPLATE_ID',
  'EMAILJS_PUBLIC_KEY',
];

const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error('[set-env] Variáveis ausentes:', missing.join(', '));
  console.error('[set-env] Defina em .env (local) ou no painel do Railway (prod).');
  process.exit(1);
}

const isProd = process.env.NODE_ENV === 'production';

const content = `export const environment = {
  production: ${isProd},
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
    measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}'
  },
  emailjs: {
    serviceId: '${process.env.EMAILJS_SERVICE_ID}',
    templateId: '${process.env.EMAILJS_TEMPLATE_ID}',
    publicKey: '${process.env.EMAILJS_PUBLIC_KEY}'
  }
};
`;

const target = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
fs.writeFileSync(target, content, 'utf8');
console.log('[set-env] environment.ts gerado em', target);
