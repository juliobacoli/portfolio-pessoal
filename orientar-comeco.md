# Guia de desenvolvimento

## Acesso local remoto (testar do celular)

Para testar o site rodando local de outros dispositivos (celular, tablet),
usa-se um túnel via cloudflared. URL pública é gerada e válida enquanto o
comando estiver rodando.

### Pré-requisitos
- `cloudflared` instalado (winget: `winget install --id Cloudflare.cloudflared`)
- `ng` (Angular CLI) disponível

### Passos (2 terminais)

**Terminal 1 — Angular dev server**
```
ng serve --host 0.0.0.0 --port 4205 --allowed-hosts=all
```
- `--host 0.0.0.0` aceita conexões de qualquer IP
- `--port 4205` usa porta fixa
- `--allowed-hosts=all` libera o host check (necessário pro tunnel)

**Terminal 2 — Cloudflared tunnel**
```
cloudflared tunnel --url http://localhost:4205
```

A saída mostrará algo como:
```
+--------------------------------------------------+
| Your quick Tunnel has been created! Visit it at: |
| https://xxxx-xxxx-xxxx.trycloudflare.com         |
+--------------------------------------------------+
```

Cole essa URL no navegador do celular. Hot reload do Angular funciona
automaticamente — alterações no código aparecem no celular.

### Encerrar
`Ctrl+C` em ambos os terminais. URL gerada deixa de funcionar.

### Notas
- A URL muda a cada execução (quick tunnel é efêmero)
- Mensagens em vermelho do tipo "Cannot determine default origin certificate
  path" são normais para quick tunnels — ignorar
- Se a porta 4205 estiver ocupada, Angular sugere outra automaticamente —
  ajustar o `--port` do tunnel para bater

## Variáveis de ambiente

`.env` na raiz contém credenciais Firebase + EmailJS (gitignored). Script
`scripts/set-env.js` gera `src/environments/environment.ts` ao rodar
`npm start` ou `npm run build` (hooks `prestart`/`prebuild`).

Em produção (Railway), as mesmas variáveis vivem no painel
Settings → Variables. Nomes usados:
- `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`,
  `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`,
  `FIREBASE_APP_ID`, `FIREBASE_MEASUREMENT_ID`
- `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`

Template de referência: `.env.example`.

## Build de produção local
```
npm run build
node server.js
```
Abre em `http://localhost:8080`. Útil para validar CSP, headers de
segurança e bundle final antes do deploy.
