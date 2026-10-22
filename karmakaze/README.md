# Karmakaze

A buildless, responsive portfolio for Karmakaze, hosted at https://karmakaze.keymanagements.org/.

## Preview

From the repository root, run `python3 -m http.server 4318 --directory karmakaze` and open http://localhost:4318.

Cloudflare Pages project: `karmakaze`. Deploy only the contents of this directory. No package installation or build step is needed.

## Content and interaction

- Retains the established crimson persona artwork and creative-world titles from the existing website.
- Distinguishes collaborative character scriptwriting from her own voice performances.
- Native disclosures expand each story; genre filters progressively enhance the complete portfolio.
- The project selector and brief prepare an email draft to the existing management address. They do not submit data to a backend or send messages automatically.
- No invented rates, availability, audio samples, or social profile links. Requests go through management.
- Private conversation transcripts and personal-life details are not included in the site or its assets.

## Banner animation

`web.js` draws descending silk, corner webs, crawling spiders, and a hanging spider on a decorative canvas. The canvas does not intercept pointer input. Animation runs at approximately 30 fps with a pixel-ratio cap of 2. It pauses outside the viewport and while the browser tab is hidden. Visitors can pause it manually; reduced-motion preferences start with a static composition.

`styles.css` contains the responsive layout and reduced-motion rules. `main.js` controls mobile navigation, filters, enquiry preparation, and email copying with error feedback.

## Assets

The original `assets/karmakaze-hero.jpg` is retained. Its WebP counterpart is a format-compressed derivative, not a new portrait. The site uses Cormorant Garamond and Manrope from Google Fonts with local system fallbacks.
