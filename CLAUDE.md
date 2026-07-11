# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A pure static website (HTML / CSS / vanilla JS / JSON — zero dependencies, no build step, no framework, no tests) for an architecture research project: observing post-last-train Shibuya and translating urban street parts into camouflage furniture prototypes. It is published via GitHub Pages from the `main` branch root (`.nojekyll` is present) at https://yuya-st-arch.github.io/shibuya-after-last-train/ and is opened via QR codes on presentation boards. Site content and commit-facing text are in Japanese; keep that language for content edits.

## Commands

There is no build, lint, or test tooling. Development is: edit files → view in browser → push to `main` (which deploys to Pages within ~1–2 minutes).

```bash
# Local preview (required — see below)
python -m http.server 5176    # → http://localhost:5176/
# or: npx serve .
```

**Always verify through a local server, never `file://`.** All pages load their content with `fetch()` from `data/*.json`; under `file://` those fetches fail and `script.js` silently renders from hardcoded `FALLBACK_*` constants, so counts and sections will be wrong without an obvious error. Reduced Field Notes / Archive item counts on `file://` are fallback behavior, not a bug.

## Architecture

### Data-driven single page + self-contained sub-pages

- `index.html` + `script.js` + `style.css` — the main one-page site. `script.js` is a single IIFE (~1,500 lines): `init()` at the bottom fetches all manifests in parallel via `loadJSON(path, fallback)` and calls one `renderXxx()` function per section. Content changes are almost always **JSON edits, not JS edits**.
- Sub-pages (`detail/`, `fieldnotes/`, `lineage/`, `underground-live/`, `a1-board/`) are each a standalone `index.html` with inline JS that fetches its own JSON from `../data/`. They do not use `script.js`.

### Data files (`data/`)

| File | Feeds |
| --- | --- |
| `site_content.json` | Main page copy: hero (incl. video path), concept, timeline, map legend, transformation, prototypes, drawings, conclusion, and `hidden_sections` |
| `photo_manifest.json` / `video_manifest.json` | Field Notes grid (photos + videos merged, filterable) |
| `archive_manifest.json` | Urban Parts Archive: `items[]` plus 9 category definitions with `related_prototype` links |
| `classification.json` | Classification section |
| `works.json` | Design Works (the 3 built pieces, images in `assets/works/`) |
| `detail_sources.json`, `fieldnotes.json`, `lineage.json`, `intervention_20260703.json` | The corresponding sub-pages |

Field-session photo sets live under `assets/field/<date-slug>/` with their own `photo_manifest.json` plus `hero/`, `selected/`, `thumbnails/` subfolders; `renderNightSession()` in `script.js` and `underground-live/index.html` read these directly.

### Section visibility

`site_content.json > hidden_sections` (currently `["prototypes", "drawings"]`) hides unfinished sections and their nav links via `applyHiddenSections()`. Unhide by removing the id from that array — don't delete the HTML.

### View modes (main page)

- **Presentation Mode** — `P` key or the top-right button; strips Field Notes, Archive, and UI chrome down to the 8 chapters used in reviews. `A` key (only while in Presentation) toggles the Archive back on.
- **board-mode** — a body class toggled automatically once scrolled past ~78% of the hero; styling hook only.
- Missing drawing/map images render as labeled PLACEHOLDER frames; dropping a file at the path referenced in `site_content.json > drawings[]` replaces the placeholder automatically.

## Content workflows

Adding a photo/video = copy a web-safe file into the right `assets/` folder + append one entry to the matching manifest. No code changes. Conventions:

- Filenames are alphanumeric (romanized) — e.g. `2026-07-03_underground-live_004_subway-live-overview.jpg`.
- `photo_manifest.json` entries carry `priority` (1 = Hero/Featured, 2 = Featured, 3 = Archive-only) and `added_batch` for batch tracking.
- `archive_manifest.json` entries need an `archive_category` (one of the 9 defined keys) and ideally `related_prototype`.

## Privacy rules (important)

This project photographs people at night in public. The repo is engineered so nothing sensitive can ship:

- `assets/photos/raw/`, `assets/videos/raw/`, `**/review_needed/`, `data/_review_needed.json`, `data/import_log.json`, and `_backup_*/` are gitignored — never force-add them or reference them from site code.
- Only curated, web-safe files go in `selected/` folders: faces must be unidentifiable (distance/shadow/blur), no readable names/phone numbers/plates, EXIF GPS stripped, compressed for web (long edge 1920px, JPEG q82).
- Photos with clear faces stay in `review_needed/` until consent is confirmed. The site never reads `_review_needed.json`, so quarantined material cannot leak into the page.
- README §9 has the full pre-publication checklist; run through it before promoting new imagery.

## Design system

Documented in `design_notes.md` (rationale, references, and how this differs from the parallel "Codex" edition — keep the "observation station / editorial archive" identity). Key invariants: black background with warm orange accent `#ff5b3a`; three fonts by role (Inter = titles/UI, Noto Serif JP = body/observations, JetBrains Mono = metadata/chapter numbers/clock); film grain + scanline texture; numbered chapters (`01 / Concept`); no decorative icons, emoji, AI-generated imagery, or JS frameworks.

## Note on README drift

`README.md` is the maintainer's operating manual (in Japanese) and partially describes an older layout (`data/prototypes.json` era counts, `assets/photos/raw/` local-only folders, Windows paths to the source photo drive). Trust the actual files in `data/` and `assets/` over README counts; the workflows and privacy rules in README remain authoritative.
