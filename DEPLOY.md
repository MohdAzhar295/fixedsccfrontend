# Smart Cool Care — Netlify deploy (frontend)

Deploy **this folder** (`smartcoolcare-frontend-src`) as its own GitHub repo. The site is a Vite + React SPA; Netlify builds `dist/` and serves static assets (logo, category images) from `public/`.

**Backend API** stays on Render (`smartcoolcare-backend-render` repo). The live API is already at `https://newcurser.onrender.com`.

---

## 1. Push code to GitHub

1. Create a new repo on GitHub (e.g. `smartcoolcare-frontend`).
2. From this folder, push all files **except** `node_modules/`, `.env`, and `dist/`.
3. Confirm these are in the repo:
   - `public/brand/logo.jpg`
   - `public/images/categories/*.jpg`
   - `public/images/shop-storefront.jpg`
   - `netlify.toml`

---

## 2. Connect Netlify

1. Go to [netlify.com](https://www.netlify.com) → **Add new site** → **Import an existing project** → GitHub.
2. Select your frontend repo.
3. Netlify reads `netlify.toml` automatically:
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20

Do not change build settings unless Netlify fails to detect the file.

---

## 3. Environment variables (Netlify)

**Site settings → Environment variables → Add variable** (scope: **Production**).

| Variable | Production value |
|----------|------------------|
| `VITE_API_URL` | `https://newcurser.onrender.com` |
| `VITE_WHATSAPP_NUMBER` | `919718639697` |
| `VITE_INSTAGRAM_URL` | `https://www.instagram.com/smart_cool_care/` |
| `VITE_SHOP_ADDRESS` | `E-83/2, Hamdard Gali, Shaheen Bagh, Jamia Nagar, New Delhi 110025` |
| `VITE_MAPS_URL` | `https://www.google.com/maps/search/?api=1&query=E-83%2F2+Hamdard+Gali+Shaheen+Bagh+New+Delhi+110025` |
| `VITE_GSTIN` | `07AATPQ7109D1ZG` |
| `VITE_HOME_INSTAGRAM_REELS` | `https://www.instagram.com/reel/DYpB71iyGey/\|Workshop clip 1,https://www.instagram.com/reel/DYji2fMSv8H/\|Workshop clip 2` |
| `VITE_INSTAGRAM_VIDEOS` | `https://www.instagram.com/reel/DYtiXJ-S2w_/\|Workshop clip 1,https://www.instagram.com/reel/DZZR4IEyh3N/\|Workshop clip 2,https://www.instagram.com/reel/DWDwV54RSaY/\|Workshop clip 3` |

> **Note:** In the Netlify UI, paste reel values without escaping the pipe `|` — use `url|Title` as shown in `.env.example`.

**No trailing slash** on `VITE_API_URL`.

---

## 4. Deploy

1. Click **Deploy site** (or trigger **Deploys → Trigger deploy** after saving env vars).
2. Wait for build to finish (usually 1–3 minutes).
3. Open the Netlify URL and verify:
   - Homepage, categories, products load
   - Images under `/images/categories/` display
   - WhatsApp links work
   - `/admin` opens (login uses backend credentials on Render)

---

## 5. Custom domain (optional)

**Domain management → Add domain** → follow DNS steps for `smartcoolcare.store` or your domain.

No extra env vars needed if the API URL stays on Render.

---

## Local dev vs production

| | Local (`npm run dev`) | Netlify |
|--|----------------------|---------|
| API | `VITE_API_URL=http://localhost:3000` in `.env` | `https://newcurser.onrender.com` in Netlify |
| Port | Vite (e.g. `5174`) | HTTPS on Netlify |
| Images | `public/` served by Vite | Copied into `dist/` at build |

Copy `.env.example` → `.env` for local work. Never commit `.env`.

---

## Verify build locally (optional)

```bash
npm install
npm run build
npm run preview
```

Open the preview URL; set `VITE_API_URL` in `.env` before building if you want to test against Render.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page after deploy | Check build log; ensure `dist/index.html` exists |
| Products empty | Backend cold start — wait 30s and refresh; confirm `VITE_API_URL` |
| Category images broken | Ensure `public/images/categories/` is in Git |
| `/shop` or `/admin` 404 | `netlify.toml` SPA redirect should be present |
| Admin login fails | Set `ADMIN_*` on Render; do not use `USE_JSON_STORE` there |

See `../smartcoolcare-backend-render/DEPLOY.md` for API and database setup.
