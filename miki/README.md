# Miki — King of Beans

A buildless portfolio for Miki, King of the Bean Kingdom: voice actor, maker of the bean games, and owner of Beans Digital.

Cloudflare Pages project: `miki`, with `miki.keymanagements.org` attached. Pushes to `main` auto-deploy. Deploy this directory as the document root.

## Preview

From the repository root, run `python3 -m http.server 4350 --bind 127.0.0.1 --directory miki`.

## Pages

- `/` — introduction and illustrated chapter directory.
- `/voice/` — voice acting, recording artwork, and pending voice reel.
- `/games/` — Bean Snake and Bean Crush with the supplied animated bean.
- `/studio/` — Beans Digital, service disclosures, and client previews.
- `/court/` — Key and Miki’s royal court.
- `/support/` — Cash App support at `https://cash.app/$blackhound55`.

Every chapter has its own original Miki scene, unique page metadata, current-page navigation, a return-home link, and a next-chapter link. Old home-page anchors (`#voice`, `#games`, `#digital`, `#court`, and `#support`) redirect to the relevant page through `main.js`.

## Design and behavior

An emerald, muted forest, olive, and antique-gold editorial layout. Text remains live HTML. Images keep their proportions; mobile chapter heroes show the entire composition. CSS, JavaScript, and artwork are shared through root-relative URLs.

- Responsive navigation, keyboard dismissal, native service disclosures, and reduced-motion support.
- Atmospheric forest sway on the home page, drifting leaves, and bright fractal mist flowing beyond the artwork. The pause control persists the visitor’s choice; reduced motion and hidden tabs stop atmospheric animation, and offscreen scenery pauses automatically.
- Game posters combine SVG scenery with the unchanged eight-frame bean GIF supplied by the user. CSS filters provide mint, coral, lilac, and gold variants. A first-frame PNG is used for reduced motion.
- No phone number, email address, WhatsApp link, contact form, or contact placeholder.
- Voice samples remain pending; no sample playback is advertised.

See [ARTWORK.md](ARTWORK.md) and [CHAPTER-ARTWORK.md](CHAPTER-ARTWORK.md) for generated image filenames, methods, and complete prompts.

## Publishing updates

Local CSS and JavaScript URLs in **all six HTML files** include the first 12 characters of each file’s SHA-256 hash as a `v` query parameter. Refresh the corresponding hash everywhere whenever a shared asset changes, before pushing, so the custom domain’s browser cache cannot retain an older design.
