import React from 'react';
import {Canvas} from '../lib/Canvas';
import {Sketch, arrow} from '../lib/Sketch';
import {HandText} from '../lib/HandText';
import {doc} from '../lib/icons';
import {C} from '../lib/colors';

/**
 * Scene 2 — Focus on "IT" (0:18 – 0:33)
 * IT attends to every token; higher score = stronger connection.
 */
const TOKENS = ['THE', 'CAT', 'SAT', 'ON', 'THE', 'MAT'];
const SCORES = ['0.1', '0.6', '0.2', '0.1', '0.1', '0.3'];

export const Scene2: React.FC = () => {
  const rowY = 340;
  const xs = TOKENS.map((_, i) => 290 + i * 100);
  const IT = {x: 540, y: 815};

  return (
    <Canvas>
      <HandText x={540} y={110} text="FOCUS ON IT" font="header" size={100} start={0} duration={30} letterSpacing={2} />

      {/* token row: label then boxed document icon, staggered */}
      {TOKENS.map((t, i) => {
        const s = 40 + i * 25;
        return (
          <React.Fragment key={i}>
            <HandText x={xs[i]} y={262} text={t} font="header" size={46} start={s} duration={12} />
            <Sketch start={s + 8} duration={22} seed={100 + i} draw={(g) => doc(g, xs[i], rowY, 76, C.grey)} />
          </React.Fragment>
        );
      })}

      {/* IT document */}
      <Sketch start={192} duration={28} seed={120} draw={(g) => doc(g, IT.x, IT.y, 100, C.yellow)} />
      <HandText x={IT.x} y={912} text="IT" font="header" size={64} start={216} duration={12} />

      {/* arrows IT → tokens */}
      {xs.map((x, i) => {
        const s = 232 + i * 20;
        const startX = IT.x + (i - 2.5) * 30;
        return (
          <Sketch
            key={`a${i}`}
            start={s}
            duration={22}
            seed={140 + i}
            draw={(g) => arrow(g, startX, IT.y - 62, x, rowY + 50, 20)}
          />
        );
      })}

      {/* attention scores */}
      {xs.map((x, i) => {
        const s = 356 + i * 10;
        // place each score just beside its arrow, in the gap between arrows
        const startX = IT.x + (i - 2.5) * 30;
        const scoreY = 480;
        const t = (rowY + 50 - scoreY) / (rowY + 50 - (IT.y - 62));
        const onArrowX = x + t * (startX - x);
        const midX = onArrowX + 44;
        const midY = scoreY;
        return (
          <HandText
            key={`s${i}`}
            x={midX}
            y={midY}
            text={SCORES[i]}
            font="label"
            size={38}
            start={s}
            duration={14}
          />
        );
      })}

      {/* footer */}
      <HandText
        x={540}
        y={1020}
        text="HIGHER SCORE = STRONGER CONNECTION"
        font="header"
        size={50}
        start={410}
        duration={34}
        letterSpacing={1}
      />
    </Canvas>
  );
};
