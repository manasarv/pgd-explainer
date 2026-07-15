# PGD Explainer — project guide & handoff

An animated, self-contained training course for **EDB Postgres Distributed (PGD)**, covering
versions **4 → 5 → 6**. It runs entirely in the browser from a single folder — open
`index.html`, no server, no build step, no network. Built as small modular files so any one
section or helper can be edited in isolation.

---

## 1. How to run

Open `index.html` in any modern browser (double-click). Everything is vanilla HTML/CSS/JS +
inline SVG/SMIL. No dependencies, no internet.

For editing/verification with Node (optional):
- Syntax check a file: `node --check assets/scenes.js`
- Full render check (needs `jsdom`): load every asset + section in a jsdom context, call each
  scene's draw function, assert the SVG is well-formed and every referenced id exists. See
  section 9 for the harness pattern used throughout development.

---

## 2. File map (what to edit for what)

```
pgd_explainer/
  index.html                 Page shell + <script> load order (order matters — see below)
  assets/
    style.css                ALL styling: layout, fonts, narration size, cylinder look, colours,
                             emphasis classes (.pop/.win/.dim/.removed-node), packets, panels, modal
    scenes.js                Shared SVG helpers + ALL "standard" scene drawings.
                             KEY: node() = the frosted-glass cylinder node (used by ~50 scenes).
                             Also defs(), wrapText(), tx(), ln(), meshSVG(), and every s_*() scene fn.
    motion_lib.js            window.MOT — helpers for the cinematic "true-motion" scenes
                             (cylinder box/boxAnim, travelling arrow token(), captions, vis()/ani()/motion()).
    stories.js               Original beat-storyboards (window.PGD_STORY). NOTE: now fully
                             overridden by story_raft.js + story_motion.js. Kept for reference; can be removed.
    story_raft.js            Cinematic Raft scene (overrides PGD_STORY["Raft consensus"]).
                             This is the exemplar for the "tall cylinder, name inside, status below" pattern.
    story_motion.js          The other 10 cinematic hero scenes (mesh, eventual consistency, conflict,
                             resolution, write leader, failover, CAMO, commit scopes, witness, sharding,
                             node lifecycle). Overrides PGD_STORY for those titles.
    views_ref.js             window.PGD_VIEWS — authoritative bdr.* catalog view column tables
                             (harvested from EDB v6 docs). Powers the clickable view modal.
    cli_commands.js          window.PGD_CLI — curated CLI/SQL commands per scene title.
    reference.js             window.PGD_MON (monitoring queries), PGD_SET (GUC settings),
                             PGD_CLIREF (full CLI subcommand reference v4/v5/v6), PGD_TOPIC
                             (maps a scene title -> mon/set/cli reference).
    app.js                   The player engine: navigation, the phase/beat engine, narration +
                             voiceover, search/filter, the view modal, packet injection, viewBox padding.
    views_ddl.js             UNUSED legacy file (superseded by views_ref.js). Not loaded by index.html. Safe to delete.
  sections/
    05_architecture.js       Architecture evolution overview (v4->v5->v6, incl. minor versions)
    10_foundations.js        Foundations
    20_conflicts.js          Conflicts & data safety
    30_coordination.js       Coordination (Raft)
    40_durability.js         Durability & safe writes
    50_v4.js                 Version 4 · BDR + HARP
    60_v5.js                 Version 5 · PGD + Proxy
    70_v6.js                 Version 6 · Editions & Commit scopes
    80_sequences.js          Sequences & partitioning
    90_operations.js         Operations & recovery
  PROJECT.md                 This file.
```

### Script load order (in `index.html`) — do not reorder casually
1. `assets/scenes.js` (defines helpers used by everything)
2. `assets/views_ref.js`, `assets/cli_commands.js`, `assets/reference.js`
3. `assets/stories.js` → `assets/motion_lib.js` → `assets/story_raft.js` → `assets/story_motion.js`
   (later files override earlier `PGD_STORY` entries)
4. `sections/05…90_*.js` (each pushes its group onto `window.PGD_GROUPS`)
5. `assets/app.js` **last** (reads the globals above and boots the player)

---

## 3. Data model

### A section file (`sections/NN_*.js`)
Each section pushes ONE group:
```js
window.PGD_GROUPS = window.PGD_GROUPS || [];
window.PGD_GROUPS.push({
  label:'Coordination (Raft)', badge:'Foundations',
  steps:[ /* scene objects */ ]
});
```

### A scene/step object
```js
{
  t:   'Raft consensus',          // title (also the key used by overrides/reference maps)
  tag: 'core',                    // 'core' | 'new'  (badge styling)
  badge:'PGD 5',                  // optional per-step version badge (else group badge)
  chap:'Coordination',            // breadcrumb label
  sc:  s_raft,                    // draw function (returns an <svg> string)
  rv:  ['ring','r1','r2','r3'],   // ids revealed when the step shows (non-story scenes)
  fl:  ['rv2','rv3'],             // flow-line ids that animate (arrows)
  an:  'Imagine…',                // analogy panel (HTML)
  re:  'In real terms…',          // technical panel (HTML)
  nr:  'spoken narration…',       // narration (voiceover + bottom "Narration" box)
  hb:  'v6 runbook 28',           // optional "Hands-on" runbook reference
  bv:  [['bdr.group_raft_details','desc']]  // catalog-view chips (clickable -> modal)
}
```

### Overriding a scene with a cinematic animation (`PGD_STORY`)
```js
window.PGD_STORY["Raft consensus"] = {
  sc: s_raft_motion,             // self-running SMIL drawing (overrides the section's sc)
  phases:[ {nr:'…technical narration…'} ]  // beats; engine speaks/advances per beat
};
```
If a title has a `PGD_STORY` entry, the player uses that drawing + phases instead of the
section's `sc`/`rv`/`fl`.

### Reference data (keyed by scene title)
- `PGD_VIEWS["bdr.node_slots"] = {desc, uses, src, cols:[[name,type,desc],…]}`
- `PGD_CLI["Raft consensus"]   = [{v:'pgd v6', cmd:'pgd raft show', note:'…'}, …]`
- `PGD_TOPIC["Raft consensus"] = {mon:'raft-consensus', set:['raft'], cli:'raft'}`
  - `PGD_MON[mon]` = monitoring query + interpretation
  - `PGD_SET[area]` = GUC rows {name, def, desc}
  - `PGD_CLIREF[group]` = {v6:[…], v5:[…], v4:[…]} full subcommand reference

---

## 4. The node visual (cylinder) — `node()` in scenes.js
- Boxes with `w <= 185` render as an **isometric frosted-glass cylinder**; wider boxes stay flat
  "info panels". The cylinder is anchored at the given top `y` and extended to a minimum height
  (~84) so all nodes look tall and uniform.
- **Node name** is drawn INSIDE the cylinder (class `.cyl-name`, 15px).
- **Status/descriptor** (the old subtitle) is drawn BELOW the cylinder (class `.cyl-sub`, 11.5px),
  so text never overlaps the glass.
- The accent colour per node (teal/amber/coral/…) is carried on the rim + glowing base ring, so
  leader/follower/failed states still read. Emphasis classes target the cylinder parts:
  `.pop` (scale+glow), `.win` (green rim), `.dim`, `.removed-node` (dashed coral).
- `app.js` pads every scene's viewBox by +46px at render time so the below-cylinder text is never clipped.

The cinematic scenes use their own cylinder builders: `MOT.box`/`MOT.boxAnim` (motion_lib.js)
and a local `cyl()` in story_raft.js.

---

## 5. The player engine (app.js)
- Flattens `PGD_GROUPS` into `STEPS`; builds the left TOC.
- **Phase/beat engine**: each scene is one or more beats. `curPhases(step)` returns the story
  phases if overridden, else a single beat from `rv/fl/nr`. `applyUpTo(p)` reveals beats 0..p,
  speaks the current beat, updates the narration box and step counter. `nextBeat()/prevBeat()`
  step through beats then across scenes. Beats advance on narration end (voiceover on) or a timer
  (voiceover off); Back/Next also work manually.
- **Travelling arrows** (`sendPackets`) inject SMIL arrowheads that move along each `fl` line/path,
  rotating toward the destination (replaces the old moving dot). Cinematic scenes draw their own arrows.
- **View modal** (`openView`): clicking a `bv` chip shows the documented columns/description from
  `PGD_VIEWS`; if a view isn't documented, it says so (no fabricated DDL).
- **Search** filters the TOC by title/text/view name. **Voiceover** uses the Web Speech API
  (best Mac voices preferred; falls back gracefully).

---

## 6. Conventions / decisions worth keeping
- **Narration is technical only** — no UI/animation-mechanics wording ("colour changes", "loops",
  "crown drops"). Visuals show; words explain the PGD concept.
- **Motion = meaning**: arrows/tokens move only during a transition (no perpetual decorative loops
  in the cinematic scenes). State changes (rim colour, crown, value flips) carry the explanation.
- **DDL honesty**: the runbooks/guide contain no CREATE VIEW DDL; the modal shows the documented
  column tables from the v6 catalog reference and never invents SQL.
- **Versions**: only v4, v5, v6 are in scope (the source zip also had 3.6/3.7 — excluded).
- Narration font is +2px (15.5) in the Narration box and on-canvas captions.

---

## 7. Current status — DONE
- Modular multi-file architecture; runs offline from `index.html`.
- 10 sections / 60 scenes; search bar; clickable catalog-view modal (authoritative v6 columns).
- Per-concept reference layer: monitoring query + GUC settings + full CLI subcommand reference
  (v6 baseline, v4/v5 deltas), mapped by scene title.
- Architecture-evolution overview animating HARP → PGD Proxy → Connection Manager across v4/5/6
  incl. minor-version highlights.
- Narration-synced phase engine; travelling **arrows** (not dots) along every flow.
- Isometric **frosted-glass cylinder** nodes applied course-wide via `node()`.
- "Tall cylinder + node name inside + status below" pattern fully applied to all ~50 standard
  scenes and to the Raft cinematic scene.
- Narration font increased +2px everywhere.

## 8. Current status — PENDING / KNOWN ITEMS
1. **10 cinematic hero scenes** (mesh, eventual consistency, conflict, resolution, write leader,
   failover, CAMO, commit scopes, witness, sharding, node lifecycle) use glass cylinders and the
   larger name font, but their animated status labels were NOT relocated to strictly "below the
   cylinder" — they are hand-choreographed and need per-scene tuning (do one at a time, eyeball each).
2. **Dense standard scenes**: because status now sits below each cylinder, a few tightly-packed
   scenes (e.g. v6 editions, sharding) may want a small spacing nudge. Verify visually.
3. **Optional full navy/cyan theme**: nodes are glass on the existing dark theme. A full deep-navy
   + cyan/emerald re-skin (like `pgd_sample_animation.html`) was offered but not applied app-wide.
4. **Dead files**: `assets/views_ddl.js` (unused, not loaded) and `assets/stories.js` (fully
   overridden) can be deleted.
5. `FEEDBACK_URL` in `app.js` is a placeholder — set it to a real form URL to enable the feedback button.

## 9. Verification harness (used during development)
```js
// node, with jsdom installed
const {JSDOM}=require('jsdom'), fs=require('fs'), vm=require('vm');
const dom=new JSDOM('<!doctype html><body><div id="canvas"></div></body>');
const ctx=vm.createContext({window:dom.window, document:dom.window.document});
[...assets, ...sections].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
// then iterate window.PGD_GROUPS, call each step's draw fn, assert <svg> well-formed and
// every rv/fl/beat id exists in the output. (Don't run the page timer — it never exits.)
```

## 10. Editing workflow (single-file)
- Keep the whole folder locally; open `index.html` to test.
- To change one section's content → edit that `sections/NN_*.js`.
- To change how all nodes look → edit `node()` in `assets/scenes.js` and/or `assets/style.css`.
- To change a cinematic scene → edit `assets/story_raft.js` or `assets/story_motion.js`.
- A single file won't run alone — it needs the rest of the folder around it.

## 11. Source material (not shipped in this folder)
- `pgd_guide.zip` — PGD-POD training runbooks (v3.6→v6) + summary HTML pages. Used to source
  concepts, example queries, CLI usage. Only v4/v5/v6 content was used.
- EDB v6 docs (`https://www.enterprisedb.com/docs/pgd/…`) — authoritative for catalog views,
  monitoring SQL, CLI command reference, and pgd-settings. Fetched as markdown via
  `curl -H "Accept: text/markdown" <url>`.
