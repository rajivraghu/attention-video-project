import React, {useId, useMemo} from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {getLength} from '@remotion/paths';
import rough from 'roughjs';
import type {RoughGenerator} from 'roughjs/bin/generator';
import type {Drawable, Options} from 'roughjs/bin/core';
import {C} from './colors';

export type Gen = RoughGenerator;

/** Default rough.js options shared by every sketch (organic jitter, wobbly double strokes) */
const BASE_OPTIONS: Options = {
  roughness: 1.4,
  bowing: 1.2,
  strokeWidth: 3,
  stroke: C.ink,
  fillStyle: 'solid',
  curveFitting: 0.95,
};

/** ease-out timing used for every draw-on reveal */
export const easeOut = Easing.out(Easing.cubic);

/** Progress 0→1 between `start` and `start + duration` frames, ease-out. */
export const useProgress = (start: number, duration: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
};

type PathInfo = {d: string; stroke: string; strokeWidth: number; fill: string};

type PreparedPath = PathInfo & {
  length: number; // stroke length (0 for fill-only paths)
  isFill: boolean;
  drawableIndex: number;
};

type SketchProps = {
  /** frame at which the pen starts drawing */
  start: number;
  /** how many frames the drawing takes (default 30 = 1s) */
  duration?: number;
  /** deterministic seed so every frame / render thread produces identical jitter */
  seed: number;
  /** produce one or more rough.js drawables */
  draw: (g: Gen) => Drawable | Drawable[];
  /** render strokes dashed (dash pattern still reveals via a stroke-dashoffset mask) */
  dashed?: boolean;
  /** override default rough options for this sketch */
  options?: Options;
  /** stroke-linecap */
  linecap?: 'round' | 'butt' | 'square';
  opacity?: number;
};

/**
 * Sketch — renders rough.js drawables as SVG paths and animates them with the
 * classic stroke-dasharray / stroke-dashoffset "draw-on" technique.
 *
 * - Every stroke path gets dasharray = its length and dashoffset animates
 *   from length → 0 so the line appears to be sketched in real time.
 * - Pen speed is constant: the time budget is split between strokes
 *   proportionally to their length, so long strokes take longer.
 * - Solid fills fade in once ~60% of their outline has been drawn (flat colour
 *   fill appearing with outline), then everything is perfectly static.
 */
export const Sketch: React.FC<SketchProps> = ({
  start,
  duration = 30,
  seed,
  draw,
  dashed = false,
  options,
  linecap = 'round',
  opacity = 1,
}) => {
  const maskId = useId();
  const p = useProgress(start, duration);

  const {paths, total, perDrawable} = useMemo(() => {
    const g = rough.generator({
      options: {...BASE_OPTIONS, ...options, seed},
    }) as Gen;
    const result = draw(g);
    const drawables = Array.isArray(result) ? result : [result];
    const prepared: PreparedPath[] = [];
    const perDrawable: {startLen: number; endLen: number}[] = [];
    let running = 0;
    drawables.forEach((dr, di) => {
      const startLen = running;
      const infos = g.toPaths(dr) as PathInfo[];
      infos.forEach((info) => {
        const isFill = info.stroke === 'none' || info.strokeWidth === 0;
        let length = 0;
        if (!isFill) {
          try {
            length = getLength(info.d);
          } catch {
            length = 0;
          }
          running += length;
        }
        prepared.push({...info, length, isFill, drawableIndex: di});
      });
      perDrawable.push({startLen, endLen: running});
    });
    return {paths: prepared, total: running, perDrawable};
  }, [seed, draw, options]);

  if (p <= 0) return null;

  const penPos = p * total; // how much "ink" has been laid down so far

  // elements are emitted in drawable order (fill, then its outline) so that a
  // shape drawn later correctly covers what is behind it
  const strokeEls: React.ReactNode[] = [];
  const maskEls: React.ReactNode[] = [];

  let cursor = 0;
  paths.forEach((path, i) => {
    if (path.isFill) {
      // fill appears once 60% of the drawable's outline has been drawn
      const {startLen, endLen} = perDrawable[path.drawableIndex];
      const span = Math.max(endLen - startLen, 1);
      const local = (penPos - startLen) / span;
      const fillOpacity = interpolate(local, [0.6, 1], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      if (fillOpacity > 0) {
        strokeEls.push(
          <path
            key={`f${i}`}
            d={path.d}
            fill={path.fill}
            stroke="none"
            opacity={fillOpacity}
          />,
        );
      }
      return;
    }

    const localDrawn = Math.min(Math.max(penPos - cursor, 0), path.length);
    cursor += path.length;
    if (localDrawn <= 0) return;

    const dashoffset = path.length - localDrawn;

    if (dashed) {
      // visible path is dashed; the reveal happens through a mask path
      strokeEls.push(
        <path
          key={`s${i}`}
          d={path.d}
          fill="none"
          stroke={path.stroke}
          strokeWidth={path.strokeWidth}
          strokeLinecap={linecap}
          strokeLinejoin="round"
          strokeDasharray="14 10"
        />,
      );
      maskEls.push(
        <path
          key={`m${i}`}
          d={path.d}
          fill="none"
          stroke="#fff"
          strokeWidth={path.strokeWidth * 6}
          strokeLinecap="round"
          strokeDasharray={path.length}
          strokeDashoffset={dashoffset}
        />,
      );
    } else {
      strokeEls.push(
        <path
          key={`s${i}`}
          d={path.d}
          fill="none"
          stroke={path.stroke}
          strokeWidth={path.strokeWidth}
          strokeLinecap={linecap}
          strokeLinejoin="round"
          strokeDasharray={path.length}
          strokeDashoffset={dashoffset}
        />,
      );
    }
  });

  return (
    <g opacity={opacity}>
      {dashed ? (
        <>
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse">
              {maskEls}
            </mask>
          </defs>
          <g mask={`url(#${maskId})`}>{strokeEls}</g>
        </>
      ) : (
        strokeEls
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Rough helpers – return drawables for common composite shapes
// ---------------------------------------------------------------------------

/** straight arrow with an open "V" head */
export const arrow = (
  g: Gen,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  head = 20,
  opts?: Options,
): Drawable[] => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const spread = Math.PI / 7;
  const hx1 = x2 - head * Math.cos(a - spread);
  const hy1 = y2 - head * Math.sin(a - spread);
  const hx2 = x2 - head * Math.cos(a + spread);
  const hy2 = y2 - head * Math.sin(a + spread);
  return [
    g.line(x1, y1, x2, y2, opts),
    g.linearPath(
      [
        [hx1, hy1],
        [x2, y2],
        [hx2, hy2],
      ],
      opts,
    ),
  ];
};

/** quadratic-curve arrow: from p0 through control c to p1 */
export const curvedArrow = (
  g: Gen,
  p0: [number, number],
  c: [number, number],
  p1: [number, number],
  head = 20,
  opts?: Options,
): Drawable[] => {
  const a = Math.atan2(p1[1] - c[1], p1[0] - c[0]);
  const spread = Math.PI / 7;
  const hx1 = p1[0] - head * Math.cos(a - spread);
  const hy1 = p1[1] - head * Math.sin(a - spread);
  const hx2 = p1[0] - head * Math.cos(a + spread);
  const hy2 = p1[1] - head * Math.sin(a + spread);
  return [
    g.path(`M ${p0[0]} ${p0[1]} Q ${c[0]} ${c[1]} ${p1[0]} ${p1[1]}`, opts),
    g.linearPath(
      [
        [hx1, hy1],
        [p1[0], p1[1]],
        [hx2, hy2],
      ],
      opts,
    ),
  ];
};

/** big filled block arrow (used for the HIGH / LOW attention indicators) */
export const blockArrow = (
  g: Gen,
  cx: number,
  cy: number,
  h: number,
  dir: 'up' | 'down',
  fill: string,
): Drawable => {
  const w = h * 0.55;
  const shaft = w * 0.42;
  const headH = h * 0.42;
  const s = dir === 'up' ? 1 : -1;
  const tipY = cy - (h / 2) * s;
  const baseY = cy + (h / 2) * s;
  const headBaseY = tipY + headH * s;
  const pts: [number, number][] = [
    [cx, tipY],
    [cx + w / 2, headBaseY],
    [cx + shaft / 2, headBaseY],
    [cx + shaft / 2, baseY],
    [cx - shaft / 2, baseY],
    [cx - shaft / 2, headBaseY],
    [cx - w / 2, headBaseY],
  ];
  return g.polygon(pts, {fill});
};
