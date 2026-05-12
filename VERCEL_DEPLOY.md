# Deploy ke Vercel

Project ini sudah dikonfigurasi agar bisa dideploy langsung ke Vercel.

## Cara Deploy

1. Push repo ke GitHub / GitLab / Bitbucket.
2. Buka https://vercel.com/new dan import repo tersebut.
3. Vercel otomatis akan:
   - Mendeteksi `vercel.json`
   - Menjalankan `bun install` lalu `vite build`
   - Mendeploy output dari TanStack Start (`.vercel/output`) menggunakan Build Output API v3
4. Klik **Deploy**.

## Bagaimana routing-nya?

Saat env `VERCEL=1` aktif (otomatis di Vercel), `vite.config.ts`:

- Mematikan plugin Cloudflare
- Mengaktifkan `tanstackStart({ target: "vercel" })`

TanStack Start akan menghasilkan SSR functions + static assets yang sudah
sesuai dengan [Vercel Build Output API](https://vercel.com/docs/build-output-api/v3),
sehingga deep link seperti `/about` tidak akan menghasilkan error
[`NOT_FOUND`](https://vercel.com/docs/errors/not_found) — server function dari
TanStack akan menangani semua route.

## Local development

`bun dev` tetap berjalan seperti biasa (menggunakan setup Cloudflare lokal Lovable).
Konfigurasi Vercel hanya aktif saat build di Vercel.