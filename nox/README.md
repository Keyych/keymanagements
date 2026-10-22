# Nox_vyper — silver gothic talent page

A responsive, buildless portfolio for Nox_vyper, represented by Key Managements.

Cloudflare Pages project: `nox`, with `nox.keymanagements.org` attached. Pushes to `main` auto-deploy. Deploy the contents of this directory as the document root.

## Preview

From the repository root, run `python3 -m http.server 4337 --directory nox`.

## Design and content

The page layout is independent of the artwork. Custom gothic illustrations fit the hero arch, About portrait, and supporting boundaries image. The six community boundaries remain readable HTML. The original voice acting services, TikTok profile, and management email are retained.

The enquiry form opens an email draft with the selected project type and brief; it does not send messages or submit data to a backend. Native disclosures expand the voice services. Navigation and direct links work without JavaScript, and reduced-motion preferences and keyboard focus are supported.

## Assets

The three WebP illustrations were created with the built-in image generation tool using the supplied persona references. Typography is locally hosted: UnifrakturMaguntia, Cormorant Garamond, and Manrope. Font license files are in `assets/fonts/`.

## Validation

Checked JavaScript syntax, local references and anchor targets, email-draft encoding and destination, service disclosures, mobile navigation, and responsive content widths at 375, 390, 768, 1024, and 1440 pixels.

## Color palette

Gunmetal surfaces, silver text and ornament, and brushed-silver buttons. Artwork is displayed in grayscale through CSS to match the site palette.

The matching crimson version is published at `vyper.keymanagements.org`.

## Silver motion effects

`atmosphere.css` and `atmosphere.js` add a tapered metallic snake crawling from the bottom to the top behind the page content, a traveling silver highlight around all three image frames, and slow rotations of the frame stars. The canvas is decorative, does not intercept input, caps its pixel density at 2×, and draws at up to 30 fps.

The footer's Pause motion control pauses all three effects and remembers the choice locally. System reduced-motion preferences disable the effects, including when changed while the page is open; hidden tabs suspend the animation loop. Verified upward travel, pause/resume and persistence, reduced-motion changes, hidden-tab suspension, and mobile layout/navigation at 390px.
