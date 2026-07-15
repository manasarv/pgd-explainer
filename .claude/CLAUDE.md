# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

Open `index.html` directly in a browser — no server, build step, or network needed. Double-click the file or use `open index.html` (macOS).

Optional syntax check (no dependencies):
```
node --check assets/scenes.js
```

Full render check requires `jsdom` — see PROJECT.md §9 for the harness pattern.

## Architecture

### Script load order (fixed — do not reorder)
1. `assets/scenes.js` — SVG helpers + all static scene draw functions (`s_*`)
2. `assets/views_ref.js`, `assets/cli_commands.js`, `assets/reference.js` — reference data globals
3. `assets/stories.js` → `assets/motion_lib.js` → `assets/story_raft.js` → `assets/story_motion.js` — cinematic overrides (later files win)
4. `sections/05_*.js … 90_*.js` — section content, each pushes to `window.PGD_GROUPS`
5. `assets/app.js` **last** — player engine that reads all globals above

### Two scene types

**Standard scenes** (most of the 60 scenes) are declared in `sections/NN_*.js`:
```js
{ t:'Title', sc: s_drawFn, rv:['id1','id2'], fl:['arrow1'], an:'…', re:'…', nr:'…', bv:[…] }
```
`rv` = SVG element ids to reveal; `fl` = flow-line ids that get travelling arrows injected by `app.js`.

**Cinematic scenes** override a standard scene's `sc` via `window.PGD_STORY["Title"]`:
```js
window.PGD_STORY["Raft consensus"] = { sc: myDrawFn, phases:[{nr:'…'}] }
```
The player uses the story's draw fn + phases instead of the section's `sc/rv/fl`. `story_raft.js` and `story_motion.js` contain all 11 cinematic scenes built with `window.MOT` (from `motion_lib.js`).

### The node visual — `node()` in scenes.js

`node(id, x, y, w, h, color, title, sub, extra)`:
- `w ≤ 185` → **frosted-glass cylinder**: node name rendered *inside*, status text *below* the cylinder (class `.cyl-sub`). `app.js` pads the viewBox +46px at render time so below-cylinder text is never clipped.
- `w > 185` → flat info panel with title+subtitle inside.
- Valid colors: `teal`, `coral`, `purple`, `amber`, `blue`, `gray`, `pink`, `green`.

Cinematic scenes use `MOT.box` / `MOT.boxAnim` (static/animated cylinders) instead of `node()`.

### Reference data (keyed by scene title)
- `PGD_VIEWS["bdr.view_name"]` → column docs shown in the clickable modal
- `PGD_CLI["Scene title"]` → CLI/SQL commands shown below the scene
- `PGD_TOPIC["Scene title"]` → maps to `PGD_MON`, `PGD_SET`, `PGD_CLIREF` entries

### player engine (`app.js`)
Flattens `PGD_GROUPS → STEPS`, drives the TOC, beat/phase engine, voiceover (Web Speech API), travelling arrows (`sendPackets`), search, and the view modal.

## Key conventions

- **Narration text is technical only** — never describe UI mechanics ("colour changes", "the arrow moves"). Visuals show; words explain the PGD concept.
- **Motion = meaning**: SMIL tokens travel only during a real state transition. No perpetual decorative loops.
- **DDL honesty**: the view modal shows documented column tables from `views_ref.js` only — never invent SQL DDL.
- Versions in scope: **v4, v5, v6 only** (v3.6/3.7 excluded).

## Pending items (known gaps — see PROJECT.md §8)
- 10 cinematic scenes need per-scene visual tuning: animated status labels not yet moved strictly below the cylinder.
- `FEEDBACK_URL` in `app.js` line 8 is a placeholder — replace with a real form URL.
- `assets/views_ddl.js` and `assets/stories.js` are dead files (unused/overridden) — safe to delete.
