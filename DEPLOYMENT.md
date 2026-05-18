# Deploy GaVi Website on gavistays.com (GoDaddy Domain)

This project is a Vite + React SPA (single-page app). Deep links such as `/about` or `/booking` need a fallback to `index.html` on the hosting provider.

## Recommended: Vercel + GoDaddy DNS

1. Push this project to GitHub.
2. Go to Vercel and import the repository.
3. Build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
4. In Vercel project settings, open **Domains** and add:
   - `gavistays.com`
   - `www.gavistays.com`
5. Vercel will show required DNS records. In GoDaddy DNS, add/update:
   - `A` record for host `@` to Vercel's provided IP
   - `CNAME` record for host `www` to Vercel's provided target
6. Wait for DNS propagation (usually a few minutes, can take up to 24 hours).
7. In Vercel, set the primary domain to `gavistays.com` and redirect `www` to apex (or vice versa, your choice).

## Why this works

- `vercel.json` in the project provides SPA fallback routing so internal pages do not 404 on refresh.
- `public/robots.txt` and `public/sitemap.xml` already use `https://gavistays.com`.

## Alternative: GoDaddy cPanel hosting only

If you host directly on GoDaddy cPanel (no Vercel/Netlify):

1. Run `npm install` and `npm run build`.
2. Upload contents of `dist` into `public_html`.
3. Add this `.htaccess` in `public_html` for SPA routes:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Without this rewrite rule, refreshing non-home pages can return 404.