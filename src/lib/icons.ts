import type {Drawable} from 'roughjs/bin/core';
import type {Gen} from './Sketch';
import {C} from './colors';

type Pt = [number, number];

/** cloud-like closed curve around an ellipse (thought bubble) */
const cloudPoints = (cx: number, cy: number, rx: number, ry: number, bumps: number): Pt[] => {
  const pts: Pt[] = [];
  const steps = bumps * 6;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const bump = 1 + 0.13 * Math.abs(Math.sin((a * bumps) / 2));
    pts.push([cx + Math.cos(a) * rx * bump, cy + Math.sin(a) * ry * bump]);
  }
  return pts;
};

/** doodle cat sitting, facing viewer — orange */
export const cat = (g: Gen, cx: number, cy: number, s = 1): Drawable[] => {
  const o = {fill: C.focus};
  const S = (v: number) => v * s;
  return [
    // tail curling out to the left
    g.path(
      `M ${cx - S(55)} ${cy + S(95)} C ${cx - S(110)} ${cy + S(100)}, ${cx - S(120)} ${cy + S(40)}, ${cx - S(85)} ${cy + S(20)}`,
      {strokeWidth: 6, stroke: C.brown},
    ),
    // body
    g.ellipse(cx, cy + S(55), S(120), S(140), o),
    // head
    g.circle(cx, cy - S(45), S(115), o),
    // ears
    g.polygon(
      [
        [cx - S(52), cy - S(70)],
        [cx - S(60), cy - S(125)],
        [cx - S(15), cy - S(95)],
      ],
      o,
    ),
    g.polygon(
      [
        [cx + S(52), cy - S(70)],
        [cx + S(60), cy - S(125)],
        [cx + S(15), cy - S(95)],
      ],
      o,
    ),
    // eyes
    g.circle(cx - S(22), cy - S(52), S(11), {fill: C.ink, strokeWidth: 2}),
    g.circle(cx + S(22), cy - S(52), S(11), {fill: C.ink, strokeWidth: 2}),
    // nose + mouth
    g.polygon(
      [
        [cx - S(6), cy - S(33)],
        [cx + S(6), cy - S(33)],
        [cx, cy - S(25)],
      ],
      {fill: C.brown, strokeWidth: 2},
    ),
    g.path(`M ${cx - S(12)} ${cy - S(18)} Q ${cx} ${cy - S(8)} ${cx + S(12)} ${cy - S(18)}`, {
      strokeWidth: 2,
    }),
    // whiskers
    g.line(cx - S(30), cy - S(30), cx - S(68), cy - S(36), {strokeWidth: 2}),
    g.line(cx - S(30), cy - S(22), cx - S(68), cy - S(18), {strokeWidth: 2}),
    g.line(cx + S(30), cy - S(30), cx + S(68), cy - S(36), {strokeWidth: 2}),
    g.line(cx + S(30), cy - S(22), cx + S(68), cy - S(18), {strokeWidth: 2}),
    // front paws
    g.ellipse(cx - S(28), cy + S(118), S(40), S(22), o),
    g.ellipse(cx + S(28), cy + S(118), S(40), S(22), o),
    // chest stripes
    g.line(cx - S(8), cy + S(35), cx + S(8), cy + S(35), {strokeWidth: 2}),
    g.line(cx - S(12), cy + S(50), cx + S(12), cy + S(50), {strokeWidth: 2}),
  ];
};

/** brown doormat (trapezoid) with fringe */
export const mat = (g: Gen, cx: number, cy: number, s = 1, tilt = 0): Drawable[] => {
  const S = (v: number) => v * s;
  const rot = (x: number, y: number): Pt => {
    const dx = x - cx;
    const dy = y - cy;
    const c = Math.cos(tilt);
    const sn = Math.sin(tilt);
    return [cx + dx * c - dy * sn, cy + dx * sn + dy * c];
  };
  const body = [
    rot(cx - S(60), cy - S(40)),
    rot(cx + S(60), cy - S(40)),
    rot(cx + S(85), cy + S(40)),
    rot(cx - S(85), cy + S(40)),
  ];
  const fringe: Drawable[] = [];
  for (let i = -3; i <= 3; i++) {
    const t = i / 3;
    const [ax, ay] = rot(cx + t * S(52), cy - S(40));
    const [bx, by] = rot(cx + t * S(52), cy - S(52));
    fringe.push(g.line(ax, ay, bx, by, {strokeWidth: 2}));
    const [cx2, cy2] = rot(cx + t * S(75), cy + S(40));
    const [dx2, dy2] = rot(cx + t * S(75), cy + S(54));
    fringe.push(g.line(cx2, cy2, dx2, dy2, {strokeWidth: 2}));
  }
  // weave texture
  const tex = [
    g.line(...rot(cx - S(45), cy - S(18)), ...rot(cx + S(45), cy - S(18)), {strokeWidth: 1.5}),
    g.line(...rot(cx - S(55), cy + S(5)), ...rot(cx + S(55), cy + S(5)), {strokeWidth: 1.5}),
    g.line(...rot(cx - S(65), cy + S(26)), ...rot(cx + S(65), cy + S(26)), {strokeWidth: 1.5}),
  ];
  return [g.polygon(body, {fill: C.brown}), ...tex, ...fringe];
};

/** blue doodle robot */
export const robot = (g: Gen, cx: number, cy: number, s = 1): Drawable[] => {
  const S = (v: number) => v * s;
  const o = {fill: C.tech};
  return [
    // antenna
    g.line(cx, cy - S(70), cx, cy - S(100), {strokeWidth: 3}),
    g.circle(cx, cy - S(105), S(14), {fill: C.ink}),
    // head
    g.rectangle(cx - S(65), cy - S(70), S(130), S(110), o),
    // ears
    g.rectangle(cx - S(80), cy - S(30), S(15), S(35), o),
    g.rectangle(cx + S(65), cy - S(30), S(15), S(35), o),
    // eyes
    g.circle(cx - S(28), cy - S(22), S(36), {fill: '#FFFFFF', strokeWidth: 2.5}),
    g.circle(cx + S(28), cy - S(22), S(36), {fill: '#FFFFFF', strokeWidth: 2.5}),
    g.circle(cx - S(28), cy - S(20), S(14), {fill: C.ink, strokeWidth: 2}),
    g.circle(cx + S(28), cy - S(20), S(14), {fill: C.ink, strokeWidth: 2}),
    // smile
    g.path(`M ${cx - S(28)} ${cy + S(14)} Q ${cx} ${cy + S(34)} ${cx + S(28)} ${cy + S(14)}`, {
      strokeWidth: 2.5,
    }),
    // body
    g.rectangle(cx - S(48), cy + S(45), S(96), S(55), o),
    g.line(cx - S(25), cy + S(65), cx + S(25), cy + S(65), {strokeWidth: 2}),
    g.line(cx - S(25), cy + S(80), cx + S(25), cy + S(80), {strokeWidth: 2}),
  ];
};

/** thought bubble with text lines; trailing dots point toward (tx, ty) */
export const thoughtBubble = (g: Gen, cx: number, cy: number, s = 1): Drawable[] => {
  const S = (v: number) => v * s;
  return [
    g.circle(cx - S(95), cy + S(70), S(14), {fill: '#FFFFFF', strokeWidth: 2.5}),
    g.circle(cx - S(72), cy + S(48), S(24), {fill: '#FFFFFF', strokeWidth: 2.5}),
    g.curve(cloudPoints(cx, cy, S(78), S(58), 7), {fill: '#FFFFFF'}),
    g.line(cx - S(40), cy - S(18), cx + S(30), cy - S(18), {strokeWidth: 3}),
    g.line(cx - S(40), cy, cx + S(40), cy, {strokeWidth: 3}),
    g.line(cx - S(40), cy + S(18), cx + S(15), cy + S(18), {strokeWidth: 3}),
  ];
};

/** yellow "?" badge */
export const questionBadge = (g: Gen, cx: number, cy: number, r = 40): Drawable[] => {
  return [g.circle(cx, cy, r * 2, {fill: C.yellow})];
};

/** document / token icon */
export const doc = (g: Gen, cx: number, cy: number, size: number, fill: string): Drawable[] => {
  const h = size / 2;
  return [
    g.rectangle(cx - h, cy - h, size, size, {fill}),
    g.line(cx - h * 0.55, cy - h * 0.35, cx + h * 0.4, cy - h * 0.35, {strokeWidth: 3}),
    g.line(cx - h * 0.55, cy, cx + h * 0.55, cy, {strokeWidth: 3}),
    g.line(cx - h * 0.55, cy + h * 0.35, cx + h * 0.1, cy + h * 0.35, {strokeWidth: 3}),
  ];
};

/** brain */
export const brain = (g: Gen, cx: number, cy: number, s = 1): Drawable[] => {
  const S = (v: number) => v * s;
  return [
    g.curve(cloudPoints(cx, cy, S(95), S(72), 8), {fill: C.purple}),
    // stem
    g.polygon(
      [
        [cx - S(14), cy + S(60)],
        [cx + S(14), cy + S(60)],
        [cx + S(10), cy + S(88)],
        [cx - S(10), cy + S(88)],
      ],
      {fill: C.purple},
    ),
    // central fissure
    g.path(
      `M ${cx} ${cy - S(70)} C ${cx - S(15)} ${cy - S(30)}, ${cx + S(15)} ${cy + S(10)}, ${cx} ${cy + S(60)}`,
      {strokeWidth: 2.5},
    ),
    // squiggles
    g.path(`M ${cx - S(70)} ${cy - S(10)} q ${S(15)} ${-S(25)} ${S(30)} 0 q ${S(10)} ${S(20)} ${S(25)} ${-S(5)}`, {
      strokeWidth: 2.5,
    }),
    g.path(`M ${cx - S(60)} ${cy + S(30)} q ${S(15)} ${-S(20)} ${S(30)} 0 q ${S(10)} ${S(15)} ${S(22)} ${-S(5)}`, {
      strokeWidth: 2.5,
    }),
    g.path(`M ${cx + S(15)} ${cy - S(20)} q ${S(15)} ${-S(25)} ${S(30)} 0 q ${S(8)} ${S(18)} ${S(22)} ${-S(5)}`, {
      strokeWidth: 2.5,
    }),
    g.path(`M ${cx + S(20)} ${cy + S(30)} q ${S(15)} ${-S(20)} ${S(28)} 0 q ${S(8)} ${S(15)} ${S(20)} ${-S(5)}`, {
      strokeWidth: 2.5,
    }),
  ];
};

/** cog / gear */
export const gear = (g: Gen, cx: number, cy: number, R = 80, teeth = 8): Drawable[] => {
  const r = R * 0.74;
  const pts: Pt[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const tw = step * 0.22; // half tooth width (angle)
    const bw = step * 0.3; // half base width (angle)
    pts.push([cx + Math.cos(a - bw) * r, cy + Math.sin(a - bw) * r]);
    pts.push([cx + Math.cos(a - tw) * R, cy + Math.sin(a - tw) * R]);
    pts.push([cx + Math.cos(a + tw) * R, cy + Math.sin(a + tw) * R]);
    pts.push([cx + Math.cos(a + bw) * r, cy + Math.sin(a + bw) * r]);
  }
  return [g.polygon(pts, {fill: C.gearGrey}), g.circle(cx, cy, R * 0.6, {fill: '#FFFFFF'})];
};

/** magnifying glass */
export const magnifier = (g: Gen, cx: number, cy: number, s = 1): Drawable[] => {
  const S = (v: number) => v * s;
  const lx = cx - S(18);
  const ly = cy - S(18);
  const a = Math.PI / 4;
  const hw = S(14);
  const r = S(62);
  const hx0 = lx + Math.cos(a) * r;
  const hy0 = ly + Math.sin(a) * r;
  const hx1 = lx + Math.cos(a) * S(135);
  const hy1 = ly + Math.sin(a) * S(135);
  const nx = -Math.sin(a) * hw;
  const ny = Math.cos(a) * hw;
  return [
    g.circle(lx, ly, r * 2, {fill: C.tech}),
    g.circle(lx, ly, r * 1.55, {strokeWidth: 2}),
    g.path(`M ${lx - S(35)} ${ly - S(5)} Q ${lx - S(30)} ${ly - S(35)} ${lx - S(5)} ${ly - S(38)}`, {
      stroke: '#FFFFFF',
      strokeWidth: 5,
    }),
    g.polygon(
      [
        [hx0 + nx, hy0 + ny],
        [hx1 + nx, hy1 + ny],
        [hx1 - nx, hy1 - ny],
        [hx0 - nx, hy0 - ny],
      ],
      {fill: C.ink},
    ),
  ];
};

/** golden key */
export const key = (g: Gen, cx: number, cy: number, s = 1): Drawable[] => {
  const S = (v: number) => v * s;
  const o = {fill: C.yellow};
  return [
    g.circle(cx, cy - S(55), S(80), o),
    g.circle(cx, cy - S(55), S(32), {fill: '#FFFFFF'}),
    g.rectangle(cx - S(13), cy - S(18), S(26), S(120), o),
    g.rectangle(cx + S(13), cy + S(60), S(28), S(16), o),
    g.rectangle(cx + S(13), cy + S(86), S(22), S(16), o),
  ];
};

/** treasure chest */
export const chest = (g: Gen, cx: number, cy: number, s = 1): Drawable[] => {
  const S = (v: number) => v * s;
  const o = {fill: C.values};
  return [
    g.rectangle(cx - S(85), cy - S(5), S(170), S(90), o),
    g.path(
      `M ${cx - S(85)} ${cy - S(5)} L ${cx - S(85)} ${cy - S(30)} Q ${cx} ${cy - S(105)} ${cx + S(85)} ${cy - S(30)} L ${cx + S(85)} ${cy - S(5)} Z`,
      {fill: C.active},
    ),
    g.line(cx - S(85), cy + S(25), cx + S(85), cy + S(25), {strokeWidth: 2.5}),
    g.rectangle(cx - S(16), cy - S(15), S(32), S(36), {fill: C.yellow}),
    g.circle(cx, cy + S(3), S(10), {fill: C.ink, strokeWidth: 2}),
  ];
};

/** boxed token "IT" style rectangle with fill */
export const box = (g: Gen, cx: number, cy: number, w: number, h: number, fill: string): Drawable[] => {
  return [g.rectangle(cx - w / 2, cy - h / 2, w, h, {fill})];
};

/** simple avatar: head circle + shoulders arc */
export const avatar = (g: Gen, cx: number, cy: number, s = 1, fill: string = C.grey): Drawable[] => {
  const S = (v: number) => v * s;
  return [
    g.path(
      `M ${cx - S(52)} ${cy + S(60)} Q ${cx - S(52)} ${cy + S(5)} ${cx} ${cy + S(5)} Q ${cx + S(52)} ${cy + S(5)} ${cx + S(52)} ${cy + S(60)} Z`,
      {fill},
    ),
    g.circle(cx, cy - S(30), S(64), {fill}),
  ];
};

/** small speech bubble (rounded rect + tail) */
export const speechBubble = (g: Gen, cx: number, cy: number, s = 1): Drawable[] => {
  const S = (v: number) => v * s;
  return [
    g.polygon(
      [
        [cx - S(34), cy - S(22)],
        [cx + S(34), cy - S(22)],
        [cx + S(34), cy + S(14)],
        [cx + S(2), cy + S(14)],
        [cx - S(14), cy + S(30)],
        [cx - S(12), cy + S(14)],
        [cx - S(34), cy + S(14)],
      ],
      {fill: '#FFFFFF', strokeWidth: 2.5},
    ),
    g.line(cx - S(20), cy - S(8), cx + S(20), cy - S(8), {strokeWidth: 2}),
    g.line(cx - S(20), cy + S(2), cx + S(10), cy + S(2), {strokeWidth: 2}),
  ];
};

/** five-point star */
export const star = (g: Gen, cx: number, cy: number, R = 30, fill: string = C.yellow): Drawable[] => {
  const pts: Pt[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? R : R * 0.45;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return [g.polygon(pts, {fill, strokeWidth: 2.5})];
};

/** green check mark */
export const checkmark = (g: Gen, cx: number, cy: number, s = 1): Drawable[] => {
  const S = (v: number) => v * s;
  return [
    g.linearPath(
      [
        [cx - S(28), cy],
        [cx - S(8), cy + S(22)],
        [cx + S(32), cy - S(26)],
      ],
      {stroke: C.active, strokeWidth: 8},
    ),
  ];
};

/** "+" node in a circle */
export const plusNode = (g: Gen, cx: number, cy: number, r = 40): Drawable[] => {
  return [
    g.circle(cx, cy, r * 2, {fill: '#FFFFFF'}),
    g.line(cx - r * 0.55, cy, cx + r * 0.55, cy, {strokeWidth: 6}),
    g.line(cx, cy - r * 0.55, cx, cy + r * 0.55, {strokeWidth: 6}),
  ];
};

/** round score badge */
export const badge = (g: Gen, cx: number, cy: number, r: number, fill: string): Drawable[] => {
  return [g.circle(cx, cy, r * 2, {fill})];
};

/** round conference table seen from above */
export const table = (g: Gen, cx: number, cy: number, rx: number, ry: number): Drawable[] => {
  return [
    g.ellipse(cx, cy, rx * 2, ry * 2, {fill: '#F9E4C8'}),
    g.ellipse(cx, cy, rx * 1.6, ry * 1.6, {strokeWidth: 1.5}),
  ];
};
