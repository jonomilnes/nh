# Nikolai Halonen — Director of Photography

A minimal, cinematic, one-page portfolio website.

## File Structure

```
index.html          — Main HTML page
styles.css          — All styles (design system, layout, interactions)
script.js           — All JavaScript (project data, cursor, showreel, lightbox)
assets/
  projects/
    constellation/  — Arctic feature film
    parallels/      — Lisbon commercial
    still-water/    — Norwegian coast feature
    reverie/        — Parisian fashion editorial
    meridian/       — American Southwest road film
    frequency/      — Bang & Olufsen commercial
```

---

## Replacing Content

### Showreel Vimeo ID

In `script.js`, line near the top:
```js
const SHOWREEL_VIMEO_ID = 'REPLACE_WITH_SHOWREEL_ID';
```
Replace the string with your Vimeo video ID (the number in the URL of your Vimeo video).

### Project Vimeo IDs

Each project in the `PROJECTS` array has a `vimeoId` field:
```js
vimeoId: 'REPLACE_WITH_VIMEO_ID',
```
Replace each with the Vimeo ID of the project film.

### Project Media

Replace placeholder SVG files with actual assets. Maintain the same filenames or update the paths in `script.js`:

```
assets/projects/[project-id]/still-01.jpg    — photography stills
assets/projects/[project-id]/teaser-01.mp4   — teaser video clip (autoplays muted)
assets/projects/[project-id]/teaser-poster.jpg — video poster frame
```

### Project Text

All project titles, descriptions, credits, and categories live in the `PROJECTS` array in `script.js`. No HTML changes needed.

---

## Local Preview

No build tools required. Serve from a local HTTP server (required for Vimeo embeds and video loading):

**Option 1 — Python (built-in):**
```bash
python3 -m http.server 8000
# Then open http://localhost:8000
```

**Option 2 — Node.js (npx):**
```bash
npx serve .
```

**Option 3 — VS Code:**
Use the Live Server extension.

> Note: Opening `index.html` directly via `file://` will not work due to browser security restrictions on iframes and relative resource loading.

---

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch`.
4. Select `main` branch, `/ (root)` folder.
5. Click **Save**.

GitHub Pages will serve the site at `https://[username].github.io/[repo-name]/`.

No build step needed — the site deploys directly from the HTML/CSS/JS files.

---

## Font

[Space Mono](https://fonts.google.com/specimen/Space+Mono) loaded from Google Fonts. An internet connection is required for the font to load. For fully offline use, download and self-host the font files.

---

## Design Notes

- Custom cursor is disabled automatically on touch/mobile devices.
- The showreel width animation (8 columns → full bleed) is driven by scroll position and uses `requestAnimationFrame` for performance.
- The lightbox backdrop uses `backdrop-filter: blur(14px)` per the design spec.
- All project sections use CSS `position: sticky` for the left column on desktop. Sticky is automatically disabled on mobile via `position: static`.
- Teaser videos lazy-load and autoplay only when ≥30% visible in the viewport.
