# Production and review guide

Read this guide while implementing scenes and before final delivery.

## Style extraction

Capture only decisions that can be implemented in code:

- canvas ratio and background tone;
- outline color, approximate stroke weight, roughness, and fill treatment;
- type families, casing, scale hierarchy, and maximum line lengths;
- recurring shapes and icon grammar;
- accent palette and the semantic role of each color;
- whitespace, alignment, and visual density;
- narrative progression suggested by the reference set.

Do not attempt pixel matching. Recreate the visual system and explanatory function.

## Suggested component layers

Keep these responsibilities separate when the project permits:

- composition root: dimensions, fps, duration, scene sequencing;
- canvas: background and safe-area layout;
- sketch primitive: deterministic Rough.js path generation and draw-on animation;
- handwritten text: font loading and reveal animation;
- icon library: reusable domain illustrations;
- scenes: content arrangement and local timing only.

Reuse the uploaded project's equivalent layers instead of forcing these filenames or abstractions.

## Motion patterns

Prefer motion that resembles a live explainer drawing:

- strokes animate with `strokeDasharray` and `strokeDashoffset`;
- filled shapes appear after their outlines begin;
- labels reveal after the object they describe;
- arrows travel from source to destination;
- related objects arrive in a meaningful sequence;
- small scale or opacity accents reinforce a conclusion without continuous idle motion.

Sequence elements with frame-relative timing. Keep all randomness seeded so the same frame always renders identically. Avoid animating every element simultaneously.

## Readability and layout

- Keep critical text inside a consistent safe area.
- Render long titles early and test their widest frame.
- Keep sketch lines out of text interiors unless they are intentional underlines.
- Use accent colors sparingly and preserve strong outline contrast.
- Inspect full-resolution final frames from every scene, not just thumbnails.

## Rendering fallback

Use the project's normal Remotion renderer first. When Chromium cannot launch because of the execution environment, a code-native fallback may render each requested frame by:

1. providing the frame number to the same React scene tree;
2. rendering that tree to SVG;
3. rasterizing SVG frames with a renderer such as resvg;
4. encoding frames with ffmpeg.

This fallback is valid only if it evaluates the actual scene components and their animations. It must not substitute still reference images or independently redrawn bitmaps.

## Acceptance checklist

- All visible artwork originates in source code.
- No inspiration image appears in the output or source package.
- Topic flow is coherent without narration.
- Scene entrances are progressive and semantically ordered.
- First, middle, and final frames of every scene are visually sound.
- Fonts are local or reliably bundled for rendering.
- Video stream decodes without errors.
- Duration, dimensions, and fps agree with the composition.
- Source archive omits `node_modules`, build caches, rendered frames, and debug artifacts.
