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

## Visual asset

`assets/voice-and-rose.webp` is original artwork created with the built-in image-generation tool and optimized to 1120 × 1400 WebP (about 93 KB). It is a conceptual still life, not a photograph of the artist or his equipment. The image is bundled locally; the original PNG is retained outside the repository by the image-generation tool.

Generation prompt:

> Use case: stylized-concept. Asset type: editorial website hero photograph for LoverBoi, a romantic voice artist with a lavender brand. Create one beautifully art-directed vertical still-life photograph, portrait 4:5. A vintage chrome broadcast microphone on a short elegant stand, entwined with one velvety deep-purple rose with natural stem and a few leaves. Microphone centered slightly right, rose bloom beside upper left of microphone. Dark smoky aubergine studio background, subtle lilac spotlight falling across metallic chrome grille, violet satin fabric gently gathered on the bottom surface. High-end analog music editorial, intimate and tactile, dramatic chiaroscuro, fine film grain, sculptural shadow, natural photographic realism. Restrained palette of inky plum, silver, muted lavender and violet. Entire microphone head visible with ample breathing room above and beside. Strong silhouette, elegant simple composition, subject fills middle 65 percent. No people, no text, no lettering, no watermark, no logos, no headphones.

Fonts: Cormorant Garamond and Manrope from Google Fonts, with system fallbacks.
