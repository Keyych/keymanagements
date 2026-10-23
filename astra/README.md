# Astra — moonlit gothic talent page

A responsive, buildless page for Astra, a voice actor represented by Key Managements.

Cloudflare Pages project: `astra`, with `astra.keymanagements.org` attached. Pushes to `main` auto-deploy. Deploy this directory as the document root.

## Preview

From the repository root, run `python3 -m http.server 4347 --directory astra`.

## Design and content

Astra’s celestial identity is presented in charcoal, silver, and muted violet, with restrained gothic arches and ornament inspired by the Nox talent page. There are no snake assets or snake animations. Her five boundaries, VA email (`xx.astra.va@gmail.com`), Cash App (`$xxastra`), and management links are preserved. The enquiry form opens a prefilled email draft; nothing is sent automatically.

Two new character portraits were generated from the supplied references with the built-in image tool: `assets/astra-gothic-hero.webp` and `assets/astra-gothic-studio.webp`. `assets/astra-moonlit.webp` is the supplied snake-free balcony portrait, resized and converted for the web. The three WebP assets total approximately 506 KB. Original PNGs are retained separately in the workspace’s `astra-artwork` folder.

Typography: locally hosted UnifrakturMaguntia, Cormorant Garamond, and Manrope. Licenses are in `assets/fonts/`.

The frame-star glow and short entrance transitions respect system reduced motion. The footer motion control pauses effects and stores the preference when local storage is available. Content stays readable without JavaScript, and direct email navigation remains available.

## Validation

Checked local files, anchor targets, unique IDs, image descriptions and dimensions, JavaScript syntax, enquiry destination and encoding, menu Escape/focus handling, motion preference persistence, and runtime reduced-motion changes. Browser checks cover mobile navigation, all three loaded portraits, contact fields, no console errors, and no horizontal overflow at 375, 390, 768, 1024, and 1440 pixels. Visually reviewed the full desktop page and mobile hero, boundaries, and contact layout.
