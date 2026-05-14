# Lane End Farm — Design tokens

## Palette
```css
--v2-bg:        #fcfaf6;   /* paper cream */
--v2-ink:       #1a1a1a;   /* near-black ink */
--v2-ink-soft:  #555;      /* body text */
--v2-mute:      #9a9a92;   /* small labels */
--v2-line:      #e5e1d7;   /* hairlines */
--v2-accent:    #4f6b54;   /* moss — italic words only */
```
Contrast ratios (against `--v2-bg`):
- ink → bg: 18.1:1 (AAA)
- ink-soft → bg: 7.0:1 (AAA)
- mute → bg: 3.3:1 (use only for non-essential labels)

## Typography

| Role | Family | Weight | Tracking | Notes |
|---|---|---|---|---|
| Display | EB Garamond | 400 | `-0.025em` | Headlines. One word per headline may be moss italic. |
| Italic display | Cormorant Garamond | 300 italic | `-0.02em` | Pull quotes, supporting phrases. |
| Body | Geist Sans | 400 | default | All paragraphs, descriptions. |
| Small label | Geist Sans | 400 | `0.02em` | Eyebrows, captions. Sentence case, NOT uppercase. |

## Spacing
Mobile-first. Use these vertical rhythm steps:
- Section padding y: `py-20 md:py-32 lg:py-40`
- Inside-section gaps: `gap-y-10 md:gap-y-14`
- Display → supporting body: `mt-8 md:mt-12`
- Body → CTA: `mt-12 md:mt-16`

Container: `max-w-[80rem]` (= 1280px) centered, with horizontal padding from `--v2-container-px` (clamp 1.25rem → 6rem).

## Layout

**Variance: 8.** Centered hero/H1 layouts are banned. Default to one of:
- Split 50/50 (text left, photo right)
- Asymmetric: text left in 7 of 12 cols, photo right starting col 8
- Image-forward: full-bleed photo with overlay text at bottom-left

## Motion
- All transitions: explicit property, 200ms, `ease-out`. No `transition: all`.
- Scroll-driven reveals: `scrub: 1` to `scrub: 1.2`. Lag = quality.
- Buttons get `:active { transform: scale(0.97) }`.
- `prefers-reduced-motion: reduce` → all timelines bail to final state.
- `min-h-[100dvh]` not `min-h-screen` for full-viewport sections (iOS safe).

## Components

### Pill button
```
height: 44px (touch target)
padding-x: 1.5rem
border-radius: 9999px
font: Geist 14px
:hover { background: tint shift }
:active { transform: scale(0.97) }
:focus-visible { outline: 2px solid moss, offset: 2px }
transition: background 200ms ease-out, transform 120ms ease-out
```

### Small label
```
font-family: Geist
font-size: 0.75rem
letter-spacing: 0.02em
color: var(--v2-mute)
text-transform: none
```

## Anti-patterns
- Emoji as icons (use Phosphor/Radix SVG)
- `h-screen` (use `min-h-[100dvh]`)
- Flexbox percentage math like `w-[calc(33%-1rem)]` (use CSS Grid)
- Mono font for UI labels (use Geist sans)
- `transition: all`
- Centered everything (variance is 8)
- Purple/blue "AI" glow gradients
- More than one accent colour
- Animations that start from `scale(0)` or `opacity: 0` with no offset (use `0.95` + `0`)
