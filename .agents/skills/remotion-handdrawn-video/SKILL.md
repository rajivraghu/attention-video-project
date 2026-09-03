---
name: remotion-handdrawn-video
description: Create or adapt code-native animated explainer videos from an uploaded React/Remotion project and visual reference images, using Rough.js and hand-drawn motion. Use when the user wants the references treated as style inspiration rather than displayed, segmented, traced, or composited into the video.
---

# Remotion Hand-Drawn Video

Build the requested explainer inside the supplied project's architecture. The finished frames must be generated from React components and vector drawing code, not from the reference-image pixels.

## Inputs and intent

Expect an uploaded project archive or directory plus one or more inspiration images. Inspect both before changing code.

- Treat the existing project as the implementation source of truth: composition registration, dimensions, frame rate, scene sequencing, reusable primitives, animation idioms, package manager, and rendering commands.
- Treat the images as art-direction evidence: palette, typography, spacing, line quality, density, icon vocabulary, hierarchy, and story beats.
- Derive the topic and narrative from the user's request and references. Ask only when an ambiguity would materially change the result.
- Preserve unrelated user code and assets. Work in a clean copy when the uploaded project must remain untouched.

## Non-negotiable rendering boundary

Create every visible scene element with React, SVG/HTML/Canvas, Rough.js, and the project's own components.

- Do not crop, tile, segment, trace, reveal, pan across, or display the inspiration images.
- Do not use screenshots of recreated scenes as the animation source.
- Do not use HyperFrames or substitute a different video framework.
- Reference images may enter the deliverable only when the user explicitly asks to show them as content.

## Production workflow

1. Inventory the project with `rg --files`; inspect package scripts, composition roots, timing constants, drawing helpers, fonts, and scene components.
2. Inspect each reference image at full-frame scale. Write a compact internal style specification and a scene-by-scene content map.
3. Preserve or extend the existing design system. Prefer reusable icon and drawing primitives over one-off monolithic scene markup.
4. Implement the narrative as React scene components registered in Remotion. Use Rough.js for imperfect outlines and filled shapes where it matches the references.
5. Animate construction over time: draw-on strokes, handwriting reveals, staged object entrances, moving arrows, subtle emphasis, and clean scene transitions. Use `useCurrentFrame`, `interpolate`, `spring`, and deterministic seeds where appropriate.
6. Keep text readable at the target resolution and ensure no labels collide, clip, or sit behind sketch lines.
7. Render the real composition. If browser launch is blocked but the source supports SVG output, an SSR SVG-to-raster fallback is acceptable only when it renders the same React scene components and frame state.
8. Validate source, output, and motion. Read [the production and review guide](references/production-guide.md) for implementation patterns and the acceptance checklist. Run `scripts/verify_video.py` on the final MP4.
9. Deliver both the final video and an editable project package. Exclude dependency directories, caches, temporary frames, debug files, and the inspiration images unless redistribution was explicitly requested.

## Completion criteria

Do not call the work complete until:

- the project type-checks or builds with its declared command;
- the composition renders from code without missing fonts or assets;
- the final video decodes end-to-end and matches the registered resolution, frame rate, and intended duration;
- sampled frames show genuine progressive construction rather than an image reveal;
- the editable package can be extracted and contains the source needed to reproduce the render.
