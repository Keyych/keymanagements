# Miki — King of Beans

Buildless talent page for Miki, King of the Bean Kingdom: voice actor, maker of the bean games, and owner of Beans Digital.

Cloudflare Pages project: `miki`, with `miki.keymanagements.org` attached. Pushes to `main` auto-deploy. Deploy this directory as the document root.

## Preview

From the repository root, run `python3 -m http.server 4350 --bind 127.0.0.1 --directory miki`.

## Design

An emerald, muted forest, olive, and antique-gold editorial layout with original hero, recording-studio, and royal-emblem artwork. Text remains live HTML; images retain their aspect ratios, with responsive cropping in the hero. Game posters combine SVG scenery with the supplied animated bean GIF. CSS filters provide mint, coral, lilac, and gold variants without changing its pixels or eight-frame animation. A first-frame PNG is used for reduced motion. The old site artwork is retained on disk but is not referenced by the page.

- Responsive navigation, keyboard dismissal, native service disclosures, and reduced-motion support.
- Atmospheric forest sway, drifting leaves, and fractal mist flowing beyond the hero into the page. The portrait stays fixed. The pause control persists the visitor's choice; reduced motion and hidden tabs stop the animation, and offscreen scenery pauses automatically.
- Cash App support links to `https://cash.app/$blackhound55`.
- No phone number, email address, WhatsApp link, contact form, or contact placeholder.
- Voice samples remain pending; no sample playback is advertised.

See [ARTWORK.md](ARTWORK.md) for the generated image filenames, generation method, and complete prompts.

## Publishing updates

Local CSS and JavaScript URLs in `index.html` include the first 12 characters of each file’s SHA-256 hash as a `v` query parameter. Refresh the corresponding hash whenever a file changes, before pushing, so the custom domain’s browser cache cannot retain an older design.
