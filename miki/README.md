# Miki — King of Beans

Buildless talent page for Miki, King of the Bean Kingdom: voice actor, maker of the bean games, and owner of Beans Digital.

Cloudflare Pages project: `miki`, with `miki.keymanagements.org` attached. Pushes to `main` auto-deploy. Deploy this directory as the document root.

## Preview

From the repository root, run `python3 -m http.server 4350 --bind 127.0.0.1 --directory miki`.

## Design

An emerald, ivory, and antique-gold editorial layout with original hero, recording-studio, and royal-emblem artwork. Text remains live HTML; images retain their aspect ratios, with responsive cropping in the hero. Game posters use original SVG and CSS graphics. The old site artwork is retained on disk but is not referenced by the page.

- Responsive navigation, keyboard dismissal, native service disclosures, and reduced-motion support.
- Cash App support links to `https://cash.app/$blackhound55`.
- No phone number, email address, WhatsApp link, contact form, or contact placeholder.
- Voice samples remain pending; no sample playback is advertised.

See [ARTWORK.md](ARTWORK.md) for the generated image filenames, generation method, and complete prompts.
