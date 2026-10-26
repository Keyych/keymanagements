# Miki — King of Beans

A buildless portfolio for Miki, King of the Bean Kingdom: voice actor, maker of the bean games, and owner of Beans Digital.

Cloudflare Pages project: `miki`, with `miki.keymanagements.org` attached. Pushes to `main` auto-deploy. Deploy this directory as the document root.

## Preview

From the repository root, run `python3 -m http.server 4350 --bind 127.0.0.1 --directory miki`.

## Pages

- `/` — a concise introduction, transparent Miki portrait, and four section links.
- `/voice/` — a layered recording-room scene with Miki and the microphone in front, subtle mouse-follow depth, warm lettering layered behind the foreground, a brief caption, and pending voice reel.
- `/games/` — a layered candlelit games room, subtle mouse-follow depth, and Bean Snake and Bean Crush with the supplied animated bean.
- `/studio/` — a layered drafting-room scene with Miki in front, lettering on the paper, subtle mouse-follow depth, Beans Digital service disclosures, and client previews.
- `/court/` — Miki, his crown and the ivy-covered terrace move together in front of the distant castle, with upright lettering behind him, subtle mouse-follow depth, and Key and Miki’s royal court.
- `/support/` — Cash App support at `https://cash.app/$blackhound55`.

Every subpage has its own original Miki scene, unique page metadata, current-page navigation, and a return-home link. Old home-page anchors (`#voice`, `#games`, `#digital`, `#court`, and `#support`) redirect to the relevant page through `main.js`.

## Design and behavior

An emerald, muted forest, olive, and antique-gold editorial layout. Text remains live HTML. Images keep their proportions. The voice, studio, games and court pages layer their scenes with typography positioned within the artwork on mobile and desktop; the support page's mobile hero shows the entire composition. Games and court use upright typography. CSS, JavaScript, and artwork are shared through root-relative URLs.

- Responsive navigation, keyboard dismissal, native service disclosures, and reduced-motion support.
- A transparent home-page portrait layered in front of the original castle scene, with soft rim lighting, shadows, forest sway, and subtle pointer depth; drifting leaves and bright fractal mist pass in front. The full illustrated scenes remain on the subpages. The pause control persists the visitor’s choice; reduced motion and hidden tabs stop atmospheric animation, and offscreen scenery pauses automatically.
- Game posters combine SVG scenery with the unchanged eight-frame bean GIF supplied by the user. CSS filters provide mint, coral, lilac, and gold variants. A first-frame PNG is used for reduced motion.
- No phone number, email address, WhatsApp link, contact form, or contact placeholder.
- Voice samples remain pending; no sample playback is advertised.

See [ARTWORK.md](ARTWORK.md) and [CHAPTER-ARTWORK.md](CHAPTER-ARTWORK.md) for generated image filenames, methods, and complete prompts.

## Depth interaction

`scene-depth.js` controls the existing home, voice, studio, games and court layers. On phones, touch devices and layouts up to 800px wide, ordinary page scrolling gently shifts the foreground and background at different rates. Wider mouse layouts keep pointer-follow depth. Scroll listeners are passive, updates run only on demand while the scene is visible, and the pause control, reduced-motion preference and hidden tabs stop the movement. No device-motion permission is needed.

## Publishing updates

Local CSS and JavaScript URLs in **all six HTML files** include the first 12 characters of each file’s SHA-256 hash as a `v` query parameter. Refresh the corresponding hash everywhere whenever a shared asset changes, before pushing, so the custom domain’s browser cache cannot retain an older design.
