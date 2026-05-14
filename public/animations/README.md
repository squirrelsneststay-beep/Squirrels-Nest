# Animation files

Drop downloaded animation files here.

## Rive files (.riv)
- From: https://rive.app/marketplace
- Download by signing in (free) and clicking the download icon on the file's detail page
- Filename suggestion: `hero-mark.riv`, `divider.riv`, `loader.riv`
- After dropping in here, tell me the filename and where to place it on the page.

## Lottie files (.json)
- From: https://lottiefiles.com/free-animations (no signup needed for many)
- Click any animation → "Download" → choose "Lottie JSON"
- Filename suggestion: `accent-line.json`, `intro.json`, `arrow.json`
- After dropping in here, tell me the filename and where to place it on the page.

## How they're used

Once you've dropped a file in:

```tsx
// Rive
<RiveAnim src="/animations/hero-mark.riv" />

// Lottie
<LottieAnim src="/animations/accent-line.json" />
```

I'll wire it into the right spot once you've picked one.
