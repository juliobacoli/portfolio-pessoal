# DEV.md

## Tunnel para teste mobile (Cloudflare)

Dois terminais separados:

**Terminal 1 — Angular dev server:**
```
ng serve --host 0.0.0.0 --port 4205 --allowed-hosts=all
```

**Terminal 2 — Cloudflare tunnel (após server subir):**
```
cloudflared tunnel --url http://localhost:4205
```

Terminal 2 gera URL pública temporária (ex: `https://xyz.trycloudflare.com`) — abre no celular.

---

## Regras de commit

- **Nunca** incluir co-autor (`Co-Authored-By`) em commits ou PRs.
- Commits e PRs devem ser de autoria exclusiva do dev.
