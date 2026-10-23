# Astra — moonlit gothic talent page

A responsive, buildless page for Astra, a voice actor represented by Key Managements.

Cloudflare Pages project: `astra`, with `astra.keymanagements.org` attached. Pushes to `main` auto-deploy. Deploy this directory as the document root.

## Preview

From the repository root, run `python3 -m http.server 4347 --directory astra`.

## Design and content

Astra shares Nox’s gothic atmosphere while using her own midnight-blue and deep-purple palette, a portrait-first hero with a lunar oval frame, a spacious serif title, moon-phase dividers, and alternating editorial sections. The small gothic wordmark provides a visual connection to the other talent pages. There are no snake assets or snake animations. Her five boundaries, VA email (`xx.astra.va@gmail.com`), Cash App (`$xxastra`), and management links are preserved. The enquiry form opens a prefilled email draft; nothing is sent automatically.

Two new character portraits were generated from the supplied references with the built-in image tool: `assets/astra-gothic-hero.webp` and `assets/astra-gothic-studio.webp`. `assets/astra-moonlit.webp` is the supplied snake-free balcony portrait, resized and converted for the web. The three WebP assets total approximately 506 KB. Original PNGs are retained separately in the workspace’s `astra-artwork` folder.

Typography: locally hosted UnifrakturMaguntia, Cormorant Garamond, and Manrope. Licenses are in `assets/fonts/`.

Two tall oval celestial rings frame the main portrait, with stars travelling along their outlines in opposite directions at a gentle 24- and 32-second pace. Each star also turns through 360 degrees on its vertical axis like a coin, revealing its silver reverse and thin edge. The orbital paths stay oval throughout the animation as the portrait turns continuously through 360 degrees like a coin. The portrait is on the front; a white mirror with grey and silver sheens fills the reverse, with a thin silver edge visible during the turn. The mirror is drawn with CSS and contains no reflected portrait. The rings, coin rotation, and short entrance transitions respect system reduced motion. The footer motion control pauses effects and stores the preference when local storage is available. Content stays readable without JavaScript, and direct email navigation remains available.

## Validation

Checked local files, anchor targets, unique IDs, image descriptions and dimensions, JavaScript syntax, enquiry destination and encoding, menu Escape/focus handling, motion preference persistence, and runtime reduced-motion changes. Browser checks cover mobile navigation, all three loaded portraits, contact fields, no console errors, and no horizontal overflow at 375, 390, 768, 1024, and 1440 pixels. Visually reviewed the full desktop page and mobile hero, boundaries, and contact layout.
