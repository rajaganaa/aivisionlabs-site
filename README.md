# AI Vision Labs — aivisionlabs.tech

React + Vite + Tailwind CSS company website for AI Vision Labs.

## Stack
- React 18 + Vite 5
- Tailwind CSS 3
- Fonts: Syne (display) + Inter (body) + JetBrains Mono (labels/code)
- Accent: Amber #F5A623

## Local dev
```bash
npm install
npm run dev
```

## Deploy to Vercel
1. Push to GitHub repo
2. Import repo in Vercel dashboard
3. Framework: Vite (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add domain: aivisionlabs.tech

## Domain Setup (manage.get.tech)
After Vercel deployment:
1. Vercel → Project Settings → Domains → Add `aivisionlabs.tech`
2. Vercel will show you DNS records (usually A record + CNAME)
3. manage.get.tech → DNS Management → Add those records
4. manage.get.tech → Custom Email (Titan Mail) → Create `contact@aivisionlabs.tech`

## Contact Form
Currently uses mailto: fallback. For production serverless form:
- Add a Vercel serverless function at `/api/contact.js`
- Or use Resend / EmailJS for direct sends without backend

## Team
- CEO: Prabhakaran
- Founder: Rajaganapathy M
