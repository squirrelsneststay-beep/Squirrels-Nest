# Shepherd's hut photos go here

Drop Zoe's real shepherd's-hut photos into this folder, e.g.:

```
hut-01.jpg   (the two single beds / interior)
hut-02.jpg   (interior detail, or the hut exterior across the garden)
hut-03.jpg   (optional extra)
```

Then in `components/v2/ShepherdsHut.tsx`, swap the two `HUT_PHOTO_*`
constants at the top from the lodge stand-ins to these files, e.g.:

```ts
const HUT_PHOTO_MAIN = "/images/shepherds-hut/hut-01.jpg";
const HUT_PHOTO_DETAIL = "/images/shepherds-hut/hut-02.jpg";
```

Until then the section uses two lodge photos as placeholders so it
isn't empty. None of the existing `squirrels-nest/sq-XX.jpg` photos
show the hut — they are all the lodge.
