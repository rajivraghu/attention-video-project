import React from 'react';
import {Canvas} from '../lib/Canvas';
import {Sketch} from '../lib/Sketch';
import {HandText} from '../lib/HandText';
import {doc, magnifier, key, chest} from '../lib/icons';
import {C} from '../lib/colors';

/**
 * Scene 5 — Query, Key & Value definitions (0:52 – 1:02)
 * Three columns, revealed left → right.
 */
export const Scene5: React.FC = () => {
  const cols = [
    {x: 220, label: 'QUERY', seed: 401, draw: magnifier, docFill: C.tech, lines: ['WHAT AM I', 'SEARCHING?']},
    {x: 540, label: 'KEY', seed: 402, draw: key, docFill: C.focus, lines: ['WHAT INFO', 'I HAVE?']},
    {x: 860, label: 'VALUE', seed: 403, draw: chest, docFill: C.values, lines: ['ACTUAL', 'INFORMATION']},
  ];
  const ICON_Y = 360;

  return (
    <Canvas>
      <HandText x={540} y={110} text="QUERY, KEY & VALUE" font="header" size={96} start={0} duration={34} letterSpacing={2} />

      {cols.map((c, i) => {
        const s = 40 + i * 80;
        return (
          <React.Fragment key={c.label}>
            <Sketch start={s} duration={36} seed={c.seed} draw={(g) => c.draw(g, c.x, ICON_Y, 1)} />
            <HandText x={c.x} y={545} text={c.label} font="header" size={56} start={s + 28} duration={12} />
            <Sketch start={s + 40} duration={24} seed={c.seed + 10} draw={(g) => doc(g, c.x, 680, 110, c.docFill)} />
            <HandText x={c.x} y={840} text={c.lines[0]} font="header" size={46} start={s + 58} duration={12} />
            <HandText x={c.x} y={892} text={c.lines[1]} font="header" size={46} start={s + 66} duration={12} />
          </React.Fragment>
        );
      })}

      {/* thin column separators */}
      <Sketch start={250} duration={16} seed={420} options={{strokeWidth: 1.5, stroke: C.grey}} draw={(g) => [g.line(380, 250, 380, 930), g.line(700, 250, 700, 930)]} />
    </Canvas>
  );
};
