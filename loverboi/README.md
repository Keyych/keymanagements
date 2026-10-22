# LoverBoi

A responsive, buildless artist site for LoverBoi, managed by Key Managements.

## Preview

From the repository root:

```sh
python3 -m http.server 4317 --directory loverboi
```

Open http://localhost:4317. No build step or package installation is required.
Deploy the contents of `loverboi/` as the site's document root.

## Content and behavior

- The existing 14 boundaries and TikTok, email, Cash App, PayPal, and management destinations are retained.
- Rules 1–12 are organized into three native disclosure groups. Rules 13–14 stay visible.
- JavaScript adds mobile navigation, expand/collapse all, active-section navigation, printing of all rules, and email copying with error feedback.
- Content, disclosure groups, and links work without JavaScript. Clipboard controls only appear in secure browser contexts that support them.
- Reduced-motion preferences are respected. Interactive controls have keyboard focus indicators.
- Services remain marked as coming soon; no booking or payment processing is implemented.

## Visual direction

Charcoal and steel, restrained violet accents, bold condensed headings, straight edges, and waveform details create a masculine recording-studio identity. No decorative hearts, florals, or pastel surfaces are used in the page.

## Visual asset

`assets/studio-microphone.webp` is original artwork created with the built-in image-generation tool and optimized to 1120 × 1400 WebP. It is conceptual studio artwork, not a photograph of the artist or his equipment. The image is bundled locally; the original PNG is retained outside the repository by the image-generation tool. The earlier rose composition is retained in Git history.

Generation prompt:

> Use case: photorealistic-natural. Asset type: website hero artwork for a male voice artist named LoverBoi. Create a vertical 4:5 high-end editorial photograph of a vintage brushed chrome broadcast microphone on its stand in a dark, architectural recording studio. Strong sculptural silhouette, close-up metal grille and black mechanical details, directional cool silver rim light with a very restrained deep violet edge light, smoky charcoal-black backdrop and black acoustic panels fading into shadow. Off-center microphone slightly to the right with enough room around it to breathe. Masculine, understated, cinematic, confident, tactile analog music magazine aesthetic. Deep blacks, desaturated steel and faint plum highlights. Microphone fills middle 65 percent, full capsule and some stand visible, shallow depth of field and subtle film grain, crisp realistic metal. This is conceptual studio artwork, not a real person or a specific artist's equipment. No people, no flowers, no roses, no satin, no hearts, no neon, no text, no lettering, no logos, no watermark.

Fonts: Barlow Condensed and Manrope from Google Fonts, with system fallbacks.
