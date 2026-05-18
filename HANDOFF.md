# Squirrels' Nest — Session Handoff

> Single source of truth for the next Claude session. Read this first.
> Last updated: end of session that spanned May 13 → May 15.

## 1. What this is

A marketing landing site for **Squirrels' Nest** — a converted-cabin Airbnb in the English countryside, owned by Zoe. **One landing page + one contact page. Localhost-only so far** (`http://localhost:3000`). No deploy yet.

The directory was originally named `zoe-lane-end-farm/` because we started with the wrong brand name. The folder name is now legacy — the brand is **Squirrels' Nest**.

## 2. Files of record

| File | Purpose |
|---|---|
| `PRODUCT.md` (in project root) | Brand brief, audience, voice, anti-patterns. Mostly correct but still says "Lane End Farm" — needs renaming to Squirrels' Nest |
| `DESIGN.md` (in project root) | Design tokens, type system, spacing, motion rules |
| `design-system/lane-end-farm/MASTER.md` | ui-ux-pro-max persisted system. Folder name is stale |
| `Reference/screenshots/savor-full/` | 13 screenshots of savor.it captured at scroll positions (their site is the design-language reference) |
| `Reference/screenshots/saltsaun/` | 8 screenshots of saltsaun.com (card-deck stack reference) |
| `Reference/screenshots/audit-v5/` | Self-audit screenshots of the localhost build at various scroll positions |
| `Reference/screenshots/savor-it-design-audit.md` | Earlier technical audit of savor.it's stack (Nuxt + GSAP + Lenis + Rive) |

## 3. The brand brief (essentials)

- **Name**: Squirrels' Nest
- **What**: Converted cabin Airbnb on a working farm in the English countryside, owned by Zoe
- **Voice**: Quiet, editorial, hand-made. Short sentences, full stops. Never marketing-y.
- **Palette**: `--v2-bg: #fcfaf6` (cream), `--v2-ink: #1a1a1a` (near-black), `--v2-ink-soft: #555`, `--v2-mute: #9a9a92`, `--v2-line: #e5e1d7`, moss accent `#4f6b54`
- **Fonts**: EB Garamond (display, 400 weight, `-0.025em` tracking) + Cormorant Garamond italic 300 (italic display) + Geist Sans (body + ALL small labels) + Geist Mono (installed but barely used). **The user explicitly wants ALL small labels in Geist Sans, NOT mono.** Anywhere small white annotation text shows up on a photo, font-family must be `var(--font-geist)` size `0.95rem` weight `500`.

## 4. The user's expectations (learned the hard way)

These are the things the user repeated multiple times across the session. Internalise them before touching anything.

### What they want

- **Inspired-by savor.it**, never a clone. They are explicit that taking design *language* and motion *techniques* (snake galleries, card-stacks, drawing lines, scroll-pinned moments) is fine. Taking specific compositions, copy, or fonts wholesale is not.
- **Centered layouts.** Asymmetric/split layouts annoy them. Default to centered.
- **Small fonts.** Anything over ~5rem at desktop is "way too big". Small labels are `0.95rem` sans.
- **Multiple photos at once, not full-bleed.** Photos should be contained, varied sizes, never dominating the whole screen — EXCEPT for the From-To moment which uses a *blurred* full-bleed photo for contrast behind small white text.
- **Lines that actually draw on scroll.** Not lines that are visible from the start. Stroke-dashoffset must be tied to scroll progress.
- **Each section uses a different technique.** Don't repeat the same `Label ━━ Label` line moment 5 times — do it once, then move to a different motion type for the next section.
- **The "From X — to Y" moment is the signature.** Hand-drawn curved arc line, two small white sans labels, a curved descender to a subline. All grouped tightly in one block of writing, not spread across the viewport.
- **A "snake" horizontal gallery** they like — images travelling along a sine-wave path as you scroll horizontally. They've asked for this multiple times.
- **A "card-deck stack" they like** — saltsaun.com pattern where images flip off the top as you scroll, revealing the next. They've asked for this.
- **"Locked in centre, world moves around you"** — pinned sections with scroll-scrub, viewer stays put, content morphs.

### What they reject

- **Full-bleed chicken/duck photos as hero.** Hero must be clean typographic, not full-bleed photographic.
- **Repeating the same scroll moment pattern multiple times** down the page.
- **Uppercase text-transform on small labels.** Sentence case only.
- **Mono font for small annotations.** Geist Sans only.
- **Big text everywhere.** They explicitly hate display sizes > ~5rem max.
- **Asymmetric layouts** ("all over the place").
- **White empty screens between sections.** Every viewport must have visible content.
- **Cookie banners, chat widgets, subscribe popups.**

## 5. Current page structure (committed at HEAD)

```
app/page.tsx
├── 1. CleanHero          — big "Squirrels' / Nest" wordmark, 2 small floating photos
├── 2. SignatureFromTo    — one moment: "From the road ━━ to the cabin" + curved descender + subline,
│                            blurred photo backdrop, lines draw with scroll
├── 3. CardDeckStack      — pinned, photos flip off the top as you scroll (saltsaun pattern)
├── 4. MultiPhotoGrid     — 4 photos at varied sizes centered on cream, not full-bleed
├── 5. VerticalStackReveal — "Without traffic / signal / noise / neighbours / rushing",
│                            small Geist sans, blurred dark photo bg
├── 6. SnakeGallery       — horizontal pinned scroll, 7 images on sine wave Y offset
└── 7. Final CTA          — "Stay a while." + "Book on Airbnb ↗"
```

Footer (in `app/layout.tsx`): "Stay a while" + "Find us" (Squirrels' Nest / The English countryside / hello@squirrelsneststay.co.uk) + "Visit" (Home / Contact / Book on Airbnb / Instagram).

## 6. Components inventory

### v2/ (current generation)
- `CleanHero.tsx` — current hero
- `SignatureFromTo.tsx` — single signature moment
- `CardDeckStack.tsx` — saltsaun-style card flip
- `MultiPhotoGrid.tsx` — multi-photo centered cream layout
- `VerticalStackReveal.tsx` — Without-list
- `SnakeGallery.tsx` — horizontal snake
- `CenteredQuiet.tsx` — older centered editorial text component, not currently in page but exists
- `FromToMoment.tsx` — old multi-instance From-To, deprecated by SignatureFromTo
- `FlickingImageStack.tsx` — older flicking stack, deprecated by CardDeckStack
- `MorphingLine.tsx`, `PinnedStack.tsx`, `WordLineMoment.tsx` — earlier-generation, deprecated

### ui/ (21st.dev imports)
- `smooth-scroll-hero.tsx` — clip-path expansion hero (replaced by CleanHero on /)
- `story-scroll.tsx` (FlowArt) — stacked rotating sections — REMOVED FROM PAGE, file kept
- `parallax-scroll-feature-section.tsx` — alternating clip-reveal — REMOVED FROM PAGE
- `text-roll.tsx` — letter roll hover effect — not currently used
- `RiveAnim.tsx`, `LottieAnim.tsx` — animation file wrappers, not used yet
- `RadiusOnScroll.tsx` — radius animation wrapper, not used in current page

### Other
- `Nav.tsx`, `Footer.tsx`, `SmoothScroll.tsx`, `IntroLoader.tsx` — chrome
- `SnakingLine.tsx` — fixed right-edge vertical line, currently NOT mounted in the page

## 7. Tech stack

- **Next.js 16.2.6** + Turbopack + App Router + TypeScript + Tailwind v4
- **GSAP + ScrollTrigger** for scroll-pinned + scrub timelines (most motion)
- **Lenis** for smooth scroll, wired to GSAP ticker via `SmoothScroll.tsx`
- **framer-motion** for the 21st.dev components (SmoothScrollHero etc.)
- **@gsap/react** for the FlowArt component
- **@rive-app/react-canvas** + `lottie-react` installed but unused (no `.riv` or `.json` files dropped)

## 8. Photography

`public/images/squirrels-nest/sq-01.jpg` through `sq-43.jpg` — 43 real cabin photos exported from Lightroom. Plus `public/images/zoe-01.jpg` through `zoe-15.jpg` (15 web-board references). Currently used on the page:

| File | What it is |
|---|---|
| `sq-01` | Garden path with chicken (DON'T put on hero — user is sick of chickens) |
| `sq-05` | Two ducks on a path |
| `sq-08` | Cabin exterior with bistro table |
| `sq-12` | Bedroom with red headboard, white linen, quilted blanket — striking |
| `sq-15` | Interior with yellow chairs by window |
| `sq-18` | Two yellow velvet chairs in green sitting room |
| `sq-22` | Bronze tap interior detail |
| `sq-28` | Bedroom with red velvet screen + yellow chair |
| `sq-30` | Chandelier on red wall |
| `sq-32` | Pillow scene |
| `sq-35` | Kitchen corner with coffee machine and red-checked curtain |
| `sq-38` | Shower (bathroom — probably skip) |
| `sq-42` | Lamps + flowers + game board |

## 9. MCPs / skills installed (across sessions)

### Connected MCPs that work
- `magic` (21st.dev) — component search + builder
- `shadcn` — registry component access
- `claude.ai Airtable, Notion, Google Drive, Canva, Higgsfield, Shopify`

### Need re-auth on each restart
- `mobbin` — user authenticated previously but token doesn't persist across session resumes
- `plugin:vercel`, `plugin:linear`, `plugin:posthog`, etc. — all need auth

### Skills installed
- `ui-ux-pro-max` (CLI Python tool at `/Users/georgewoodhead/.claude/plugins/cache/ui-ux-pro-max-skill/`)
- `emil-design-eng` (Emil Kowalski's design eng philosophy)
- `impeccable` (Paul Bakaus's frontend design skill)
- `design-taste-frontend` (Leonxlnx's high-agency frontend skill)
- All four can be invoked. They're not magic — they're guidelines/checklists. The user expects them to be USED to inform decisions, not just installed.

## 10. Git state

```
HEAD branch on disk, multiple commits made through the session:
- feat: rebrand to Squirrels' Nest + 6 distinct scroll techniques
- fix(SignatureFromTo): lines actually draw + tight block layout
- polish: swap to better-matched photos + subtle dividers above eyebrows
- feat: rebuild as centered editorial with 4 From-To moments
- feat: apply design-skill stack — asymmetric hero, sans-serif eyebrows
- Initial commit from Create Next App
```

Roll back to any prior commit with `git reset --hard <sha>`.

## 11. Known issues to fix next

1. **PRODUCT.md and design-system/lane-end-farm/MASTER.md still reference "Lane End Farm"** — update brand name throughout.
2. **`Reference/screenshots/zoe-lane-end-farm/` folder name** is stale — could be renamed but it's a screenshot archive so low priority.
3. **The CardDeckStack pinned timing** may need tuning — currently each card flip uses `0.18` duration which may feel too fast/slow. Verify by scrolling through.
4. **Mobile breakpoints**: most components have responsive clamps but haven't been tested at 375px viewport.
5. **The contact page (`/contact`)** the user said is fine — DON'T touch it.
6. **Real Airbnb listing URL** — every CTA `href="#"` should be the live Airbnb listing once user provides it.
7. **No real domain / no deploy yet** — site is localhost-only.

## 12. The thing the user kept coming back to

If they say *anything* about "scroll", "the bit with the lines", or "savor", they're referring to a **single signature pinned moment**:

- Two small white Geist Sans labels (e.g. "From the road" and "to the cabin")
- Connected by a **hand-drawn curved arc** that DRAWS itself as the user scrolls (stroke-dashoffset animation)
- A second **curved descender** dropping from the right side of the arc
- A subline below in the same Geist Sans, with an italic Cormorant tail underneath
- All grouped tightly as one block of writing
- On a **blurred photographic backdrop** (cabin photo, scaled 1.06, `filter: blur(10px)`)
- Photo crossfades between 2–3 linked frames during the moment

That moment is the soul of the brief. Build it once, well, and don't repeat it as a pattern down the page.

## 13. What to ask the user first when picking back up

1. "Refresh `localhost:3000` — is the site running? If not, run `npm run dev` in `Sites/zoe-lane-end-farm/site/`."
2. "Which section, top-to-bottom, is the worst right now? One specific complaint at a time."
3. "Do you have the real Airbnb listing URL yet to wire into the CTAs?"

Don't propose a redesign. Don't second-guess earlier decisions. **Look at what's on disk, scroll the live site, take screenshots, and only fix what they specifically name.**
