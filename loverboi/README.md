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

The site follows LoverBoi’s supplied persona: charcoal, weathered silver, and vivid purple accents. Bold condensed headings and straight edges retain the masculine identity, while the portrait gives the page a recognizable character.

## Visual asset

`assets/loverboi-persona.webp` is the persona image supplied by the site owner, compressed as a 1024 × 1536 WebP without generative alterations. The original supplied PNG is unchanged. Responsive image positioning keeps the mask and face visible; the caption sits over the lower portion of the artwork. The same asset is used for social-sharing metadata.

Previous generated microphone and rose concepts remain recoverable in Git history and are no longer used by the page.

Fonts: Barlow Condensed and Manrope from Google Fonts, with system fallbacks.
