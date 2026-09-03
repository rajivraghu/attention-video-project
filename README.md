# Attention Mechanism — whiteboard explainer (Remotion + Rough.js)

Recreates the first ~52 s of the LaminaLabs-style "Attention Mechanism" explainer as a
hand-drawn whiteboard sketch: 1080×1080, 30 fps, pure white canvas, hard cuts.

## Structure
- `src/lib/Sketch.tsx` – core primitive. Generates Rough.js drawables (seeded → deterministic),
  converts them to SVG paths and animates each stroke with `stroke-dasharray` / `stroke-dashoffset`
  (constant pen speed, ease-out). Solid fills fade in as the outline completes. Also `arrow`,
  `curvedArrow`, `blockArrow` helpers and a `dashed` mode (dashes revealed through a dash-offset mask).
- `src/lib/HandText.tsx` – hand-lettered text (Amatic SC / Patrick Hand / Caveat via
  `@remotion/google-fonts`) written on left→right with a clip sweep.
- `src/lib/icons.ts` – cat, mat, robot, thought bubble, document, brain, gear, magnifier, key, chest.
- `src/scenes/Scene1..8.tsx` – Introduction, Focus on IT, Attention Weights, How Attention Works, Query/Key/Value, Query-Key Matching, Weighted Sum, Meeting Focus.
- `src/Video.tsx` – `<Series>` of the 8 scenes (2910 frames = 97 s).

## Commands
```bash
npm install
npx remotion studio                 # preview
npx remotion render src/index.ts AttentionMechanism out/attention_video.mp4
```
