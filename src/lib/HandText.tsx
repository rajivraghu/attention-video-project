import React, {useId} from 'react';
import {interpolate} from 'remotion';
import {FONTS, FONT_ADVANCE} from './fonts';
import {C} from './colors';
import {useProgress} from './Sketch';

type Props = {
  x: number;
  y: number;
  text: string;
  start: number;
  duration?: number;
  font?: keyof typeof FONTS;
  size?: number;
  color?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number | string;
  letterSpacing?: number;
};

/**
 * HandText — hand-lettered SVG text that "writes on" left-to-right.
 *
 * Fonts are outlines the browser rasterises, so they have no path to dash.
 * We emulate the pen by revealing the glyphs through a clip rectangle that
 * sweeps left→right (ease-out) while a thin stroke outline leads the fill,
 * which reads like real handwriting on a whiteboard.
 */
export const HandText: React.FC<Props> = ({
  x,
  y,
  text,
  start,
  duration = 24,
  font = 'body',
  size = 40,
  color = C.ink,
  anchor = 'middle',
  weight,
  letterSpacing = 0,
}) => {
  const clipId = useId();
  const p = useProgress(start, duration);
  if (p <= 0) return null;

  // generous width estimate for the clip window (only affects reveal timing)
  const estWidth =
    text.length * size * FONT_ADVANCE[font] * 1.15 +
    letterSpacing * text.length +
    size * 0.4;
  const left =
    anchor === 'middle' ? x - estWidth / 2 : anchor === 'end' ? x - estWidth : x - size * 0.2;

  // outline is drawn slightly ahead of the fill → pen-then-ink feel
  const fillOpacity = interpolate(p, [0, 0.15, 1], [0, 0.6, 1], {
    extrapolateRight: 'clamp',
  });

  const fontWeight = weight ?? (font === 'header' || font === 'label' ? 700 : 400);

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <rect x={left} y={y - size * 1.2} width={estWidth * p} height={size * 1.7} />
        </clipPath>
      </defs>
      <text
        x={x}
        y={y}
        clipPath={`url(#${clipId})`}
        textAnchor={anchor}
        fontFamily={FONTS[font]}
        fontSize={size}
        fontWeight={fontWeight}
        fill={color}
        fillOpacity={fillOpacity}
        stroke={color}
        strokeWidth={size * 0.012}
        letterSpacing={letterSpacing}
        style={{paintOrder: 'stroke fill'}}
      >
        {text}
      </text>
    </g>
  );
};
