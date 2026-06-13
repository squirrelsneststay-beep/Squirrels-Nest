# Squirrels' Nest. Hosting + Security Plan

Last updated: 2026-05-17. Read this end-to-end before clicking deploy.

---

## Phase 1. Security check (DONE in this commit)

| Check | Result | Action taken |
|---|---|---|
| `npm audit` | 2 moderate, 0 high, 0 critical | next 16.2.6 range + postcss build-time XSS. Neither runtime-exploitable for static marketing. Bump `next` to 16.3+ post-launch. |
| Hardcoded secrets in source | Clean | No `process.env`, `API_KEY`, `TOKEN`, etc. in app code. |
| Unsafe external links (`target="_blank"` w/o `rel`) | Clean | None present. When adding the Airbnb link, use `rel="noopener noreferrer"`. |
| Security headers | Were absent | Added in `next.config.ts`: CSP, HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy disabling camera/mic/geo/topics. `X-Powered-By` stripped. |
| Content Security Policy | None | Added a tight CSP. `script-src 'self' 'unsafe-inline' 'unsafe-eval'` is required for Next.js hydration. `font-src 'self' data:` since `next/font/google` self-hosts. |
| robots.txt + sitemap.xml | Missing | Added `app/robots.ts` + `app/sitemap.ts`. |
| Open Graph + Twitter card | Minimal | Full metadata in `app/layout.tsx`: GB locale, OG image (sq-12.jpg), proper title template. |

---

## Phase 2. Security eventualities to think through before launch

### Things that will probably happen

1. **Scrapers + bots indexing the site.** Mitigation: rate-limited at CDN level (Vercel does this automatically), `robots.txt` already directs them.
2. **Image hotlinking from other sites.** Mitigation: Vercel/CDN bandwidth is generous for free tier, but if it spikes, add `Referrer-Policy` checks or migrate hero images to a CDN with hotlink protection (Cloudflare R2 + Workers).
3. **DDoS / Layer 7 floods.** Mitigation: Vercel + Cloudflare both absorb the L3/L4 stuff automatically. For L7 (e.g. bot spam on contact form), add a honeypot field + Cloudflare Turnstile if the form is ever wired up.
4. **Exposed `.env` accidentally committed.** Mitigation: `.gitignore` already includes `.env*`. Verify before pushing public — `git ls-files | grep -E '\.env'` should return nothing.
5. **Broken third-party iframe embed.** Mitigation: CSP `frame-ancestors 'none'` plus `X-Frame-Options: DENY` block all iframing.

### Things that might happen

6. **Someone tries to copy the site verbatim.** Marketing copy is your IP. Mitigation: nothing technical can stop it — file a DMCA if it happens. Add a quiet `© Squirrels' Nest` in the footer (already there).
7. **Someone tries to phish using the brand.** Mitigation: register the domain + close lookalike variants (`squirrelsnest.uk`, `squirrels-nest.co.uk`).
8. **The Airbnb listing URL changes.** Mitigation: store it as an environment variable (`NEXT_PUBLIC_AIRBNB_URL`) so you can swap without redeploying everything.
9. **Compliance: UK GDPR if you ever add analytics or a contact form that stores data.**
   - Without analytics + form data: **you don't need a cookie banner.** Site is purely informational.
   - If you add Plausible / Fathom (cookieless): still no banner needed.
   - If you add Google Analytics / Meta Pixel: **you need a cookie banner + Privacy Policy page.** Use [Cookiebot](https://cookiebot.com) or build a simple banner.
10. **Image rights.** All photos in `public/images/squirrels-nest/` should be Zoe's own. The Pinterest references (`zoe-XX.jpg`) used in the story section need to be either licensed or replaced before public launch.

### Hard requirements before going live

- [ ] **Domain registered.** Recommend Cloudflare Registrar (at-cost pricing, no markup). `.co.uk` is roughly £8/year.
- [ ] **Email forwarding for `hello@squirrelsneststay.co.uk`.** Cloudflare Email Routing — free, forwards to your real inbox.
- [ ] **Privacy Policy + Terms pages** (light versions) if any contact form gets added.
- [ ] **Real Airbnb listing URL** wired into the CTAs (currently `#book` placeholder).
- [ ] **`zoe-XX.jpg` Pinterest reference images replaced** with Zoe's own photography or licensed stock. These are currently used in UnifiedStory chapter backgrounds. Legal risk if she doesn't own them.
- [ ] **`NEXT_PUBLIC_SITE_URL`** env var set in hosting platform to the production domain.

---

## Phase 3. Where to host. The recommendation.

### TL;DR. Vercel. Free tier is enough for this site.

This is a Next.js 16 site. Vercel built Next.js, so the deployment story is one command + one button.

### Comparison

| Host | Cost (this site) | Setup time | Notes |
|---|---|---|---|
| **Vercel** | **£0** on Hobby tier | 5 min | Auto-deploy from GitHub, global CDN, free SSL, preview URLs per branch. Built for Next.js. **PICK THIS.** |
| Cloudflare Pages | £0 | 15 min | Cheaper at scale, but Next.js 16 server features require their adapter. More setup. |
| Netlify | £0 | 10 min | Similar to Vercel. Less optimal for Next.js specifically. |
| AWS Amplify / Self-host | £5+/mo | 1 day | Total overkill. Don't. |

### Vercel free tier limits (Hobby plan)

- 100GB bandwidth/month — plenty for a marketing site
- Unlimited preview deploys
- Auto SSL on `*.vercel.app` + custom domains
- Edge network (~250 cities globally)
- Hard cap on builds-per-day (lots)

If the site ever exceeds these, Pro is £20/month per developer. Cabin Airbnb traffic won't get there.

---

## Phase 4. Step-by-step deploy

### One-time setup (do this once)

1. **Push the site to GitHub.**
   ```bash
   cd <path-to-site-folder>
   gh repo create squirrels-nest --private --source=. --push
   ```
   (Or create via github.com UI and `git remote add origin <url>` then `git push -u origin main`.)

2. **Install the Vercel CLI.**
   ```bash
   npm i -g vercel
   ```

3. **Register the domain.**
   - Cloudflare Registrar: cloudflare.com/products/registrar/
   - Buy `squirrelsneststay.co.uk`. Pay ~£8.
   - Optionally also grab `squirrelsnest.uk` + `squirrels-nest.co.uk` to redirect.

### Deploy (every push, automatic after first time)

4. **Link the project to Vercel.** From the site folder:
   ```bash
   vercel link
   ```
   Pick your account. Pick "Create a new project". Confirm framework: Next.js.

5. **Set the environment variable.**
   ```bash
   vercel env add NEXT_PUBLIC_SITE_URL production
   # paste: https://squirrelsneststay.co.uk
   ```

6. **Deploy.**
   ```bash
   vercel --prod
   ```
   First deploy takes ~2 minutes. You get a `*.vercel.app` URL immediately.

### Attach the custom domain

7. **Add the domain in Vercel.**
   - Vercel dashboard → Project → Settings → Domains → Add `squirrelsneststay.co.uk`.
   - Vercel will tell you what DNS records to add.

8. **Update DNS at Cloudflare Registrar.**
   - Add the two records Vercel asks for (one A record, one CNAME).
   - Wait 5-30 minutes for DNS to propagate.

9. **Enable Cloudflare Email Routing.**
   - Cloudflare dashboard → your domain → Email → Email Routing.
   - Add `hello@squirrelsneststay.co.uk` → your real inbox.
   - Free.

10. **Verify HTTPS.** Once DNS propagates, Vercel issues an SSL cert automatically. Visit `https://squirrelsneststay.co.uk` and check the lock icon.

### Post-launch verification

- [ ] Check security headers with [securityheaders.com](https://securityheaders.com). Should score A or A+.
- [ ] Check SSL with [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/). Should be A+.
- [ ] Verify `robots.txt` at `https://squirrelsneststay.co.uk/robots.txt`.
- [ ] Verify `sitemap.xml` at `https://squirrelsneststay.co.uk/sitemap.xml`.
- [ ] Test the page on a real phone, in landscape + portrait, on iOS Safari (the mobile fallback CSS in `globals.css` is for this).
- [ ] Submit sitemap to Google Search Console.

---

## Quick reference. Files I added in this commit

- `next.config.ts` — security headers, image config, hardening
- `app/robots.ts` — crawl rules
- `app/sitemap.ts` — sitemap entries
- `app/layout.tsx` — full Open Graph + Twitter metadata, GB locale
- `HOSTING.md` — this document

## Cost summary

| Item | Cost |
|---|---|
| Vercel Hobby plan | £0 |
| Cloudflare domain (.co.uk) | ~£8/year |
| Cloudflare Email Routing | £0 |
| SSL certificate | £0 |
| **Total year 1** | **~£8** |
