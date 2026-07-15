#!/usr/bin/env python3
"""
check_scene_overlaps.py — static layout-collision scanner for
assets/story_whiteboard.js whiteboard scenes.

Parses each `function name(){...}` body in story_whiteboard.js and
extracts approximate bounding boxes for:
  - person(x, y, 'label', accessory) calls
  - cyl(x, y, w, h, 'label', sub, color) calls
  - raw <rect x=".." y=".." width=".." height=".."> elements (>=300px2,
    to skip decorative dots/markers)
  - H.tan(...) / H.tst(...) text calls, with estimated rendered width
    from character count + font size/weight

Each element is tagged with the H.vis(a,b) phase window it renders in
(tracked via the '<g opacity="0">'+H.vis(a,b) ... </g> wrapper idiom
used throughout this file); elements with no wrapper are "always
visible" (0,1). Only elements whose windows actually overlap in time
are compared — two things that are never on-screen at the same time
(e.g. two different phases of a multi-phase diagram) are not flagged
even if their coordinates coincide.

Two passes are printed:
  1. Raw person-vs-cyl overlaps (the most common real bug: the DBA/
     Observer icon positioned too close to the first diagram element).
  2. A broader, containment-filtered pass across all element kinds —
     pairs where one box sits (almost) entirely inside the other are
     skipped, since that's virtually always intentional (a label
     inside its own box, a node inside a location "frame" rect). What
     remains is a short, high-signal list worth reading by hand.

This is a heuristic, not a renderer: font metrics are estimated, not
measured, so treat every flagged pair as "look at this", not "this is
definitely broken". Known, confirmed-safe false-positive shapes:
  - a full-canvas background/flash <rect> (e.g. 600x480) "overlapping"
    a title or caption — it's a backdrop, not a box anything sits in.
  - a small <rect> drawn behind a label purely to blank out a line or
    token path passing behind it (paper-colored, no visible border).

Usage:
    python3 scripts/check_scene_overlaps.py
Run from anywhere; the path to story_whiteboard.js is resolved relative
to this script's location.
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_PATH = os.path.join(ROOT, 'assets', 'story_whiteboard.js')

with open(SRC_PATH) as f:
    SRC = f.read()

FN_RE = re.compile(r'function (\w+)\(\)\{')
PERSON_RE = re.compile(r"person\((\d+),\s*(\d+),\s*'([^']*)'")
CYL_RE = re.compile(r"cyl\((\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*'([^']*)'")
RECT_RE = re.compile(r'<rect x="(-?\d+)" y="(-?\d+)" width="(\d+)" height="(\d+)"')
TAN_RE = re.compile(r"H\.t(?:an|st)\((\d+),\s*(\d+),\s*'([^']*)',\s*([\d.]+)(?:,[^,()]*)*(?:,\s*H\.vis\(([\d.]+),\s*([\d.]+)\))?\)")
GROUP_START_RE = re.compile(r"'<g opacity=\"0\">'\+H\.vis\(([\d.]+),\s*([\d.]+)\)")
GROUP_END_RE = re.compile(r"</g>")


def extract_body(start):
    depth = 0
    i = start
    while True:
        if SRC[i] == '{':
            depth += 1
        elif SRC[i] == '}':
            depth -= 1
            if depth == 0:
                return SRC[start:i + 1]
        i += 1


def text_half_width(s, fontsize=14, bold=False):
    per_char = fontsize * (0.62 if bold else 0.55)
    return max((len(s) * per_char) / 2, 10)


def windows_by_position(body):
    events = []
    for m in GROUP_START_RE.finditer(body):
        events.append((m.start(), 'start', float(m.group(1)), float(m.group(2))))
    for m in GROUP_END_RE.finditer(body):
        events.append((m.start(), 'end', None, None))
    events.sort(key=lambda e: e[0])
    return events


def window_at(pos, events):
    stack = []
    for epos, kind, a, b in events:
        if epos > pos:
            break
        if kind == 'start':
            stack.append((a, b))
        elif kind == 'end' and stack:
            stack.pop()
    if not stack:
        return (0.0, 1.0)
    return (max(w[0] for w in stack), min(w[1] for w in stack))


def windows_intersect(w1, w2):
    return max(w1[0], w2[0]) < min(w1[1], w2[1])


def boxes_for(body):
    events = windows_by_position(body)
    boxes = []
    for m in PERSON_RE.finditer(body):
        px, py, plabel = int(m.group(1)), int(m.group(2)), m.group(3)
        lbl_half = text_half_width(plabel, 14, True) if plabel else 20
        x0, x1 = px - max(13, lbl_half), px + max(13, lbl_half)
        y0, y1 = py, py + 88
        boxes.append(('person', plabel, x0, y0, x1, y1, window_at(m.start(), events)))
    for m in CYL_RE.finditer(body):
        cx, cy, cw, ch, clabel = (int(m.group(1)), int(m.group(2)),
                                  int(m.group(3)), int(m.group(4)), m.group(5))
        boxes.append(('cyl', clabel, cx, cy - 10, cx + cw, cy + ch, window_at(m.start(), events)))
    for m in RECT_RE.finditer(body):
        rx, ry, rw, rh = int(m.group(1)), int(m.group(2)), int(m.group(3)), int(m.group(4))
        if rw * rh < 300:
            continue
        boxes.append(('rect', f'{rw}x{rh}', rx, ry, rx + rw, ry + rh, window_at(m.start(), events)))
    for m in TAN_RE.finditer(body):
        tx, ty, ttext, tsize = int(m.group(1)), int(m.group(2)), m.group(3), float(m.group(4))
        if not ttext.strip():
            continue
        a, b = m.group(5), m.group(6)
        win = (float(a), float(b)) if a and b else window_at(m.start(), events)
        half = text_half_width(ttext, tsize, False)
        x0, x1 = tx - half, tx + half
        y0, y1 = ty - tsize, ty + 4
        boxes.append(('text', ttext[:40], x0, y0, x1, y1, win))
    return boxes


def overlap(a, b):
    ax0, ay0, ax1, ay1 = a[2:6]
    bx0, by0, bx1, by1 = b[2:6]
    return min(ax1, bx1) - max(ax0, bx0), min(ay1, by1) - max(ay0, by0)


def contained(a, b, tol=6):
    return a[2] >= b[2] - tol and a[4] <= b[4] + tol and a[3] >= b[3] - tol and a[5] <= b[5] + tol


def main():
    fn_starts = [(m.start(), m.group(1)) for m in FN_RE.finditer(SRC)]
    person_cyl_hits = []
    broad_hits = []

    for start, name in fn_starts:
        body = extract_body(start)
        boxes = boxes_for(body)
        n = len(boxes)
        for i in range(n):
            for j in range(i + 1, n):
                a, b = boxes[i], boxes[j]
                if a[0] == 'person' and b[0] == 'person':
                    continue
                if not windows_intersect(a[6], b[6]):
                    continue
                ox, oy = overlap(a, b)
                if ox <= 8 or oy <= 8:
                    continue
                if {a[0], b[0]} == {'person', 'cyl'}:
                    person_cyl_hits.append((name, a, b, ox, oy))
                if a[0] == 'text' and b[0] == 'text':
                    continue
                if contained(a, b) or contained(b, a):
                    continue
                broad_hits.append((name, a, b, ox, oy))

    print(f"=== Pass 1: person-vs-cyl overlaps ({len(person_cyl_hits)}) ===\n")
    for name, a, b, ox, oy in person_cyl_hits:
        print(f"{name}: person '{a[1] if a[0]=='person' else b[1]}' overlaps "
              f"cyl '{b[1] if b[0]=='cyl' else a[1]}' by ~{ox:.0f}x{oy:.0f}px")

    print(f"\n=== Pass 2: broader containment-filtered overlaps ({len(broad_hits)}) ===")
    print("(review each by hand — some are known-safe backdrops/label-clearing rects)\n")
    for name, a, b, ox, oy in broad_hits:
        print(f"{name}: [{a[0]}] '{a[1]}' win{a[6]} @({a[2]:.0f},{a[3]:.0f}-{a[4]:.0f},{a[5]:.0f}) "
              f"vs [{b[0]}] '{b[1]}' win{b[6]} @({b[2]:.0f},{b[3]:.0f}-{b[4]:.0f},{b[5]:.0f})  "
              f"overlap {ox:.0f}x{oy:.0f}")

    total = len(person_cyl_hits) + len(broad_hits)
    print(f"\nTOTAL FLAGGED: {total}")


if __name__ == '__main__':
    main()
