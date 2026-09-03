import React from 'react';
import {Canvas} from '../lib/Canvas';
import {Sketch, arrow} from '../lib/Sketch';
import {HandText} from '../lib/HandText';
import {gear, magnifier, key, chest} from '../lib/icons';

/**
 * Scene 4 — How Attention Works (0:43 – 0:52)
 * Query (magnifier), Key (key), Value (chest) feed the attention formula (gear).
 */
export const Scene4: React.FC = () => {
  const GEAR = {x: 540, y: 840};
  const ICON_Y = 380;
  const items = [
    {x: 300, label: 'QUERY', n: '1', seed: 301, draw: magnifier},
    {x: 540, label: 'KEY', n: '2', seed: 302, draw: key},
    {x: 780, label: 'VALUE', n: '3', seed: 303, draw: chest},
  ];

  return (
    <Canvas>
      <HandText x={540} y={95} text="HOW ATTENTION WORKS" font="header" size={92} start={0} duration={30} letterSpacing={2} />
      <HandText x={540} y={185} text="3 KEY CONCEPTS" font="header" size={64} start={28} duration={20} letterSpacing={2} />

      {/* attention formula gear */}
      <Sketch start={50} duration={50} seed={300} draw={(g) => gear(g, GEAR.x, GEAR.y, 78, 8)} />
      <HandText x={GEAR.x} y={985} text="ATTENTION FORMULA" font="header" size={48} start={98} duration={20} />

      {items.map((it, i) => {
        const s = 118 + i * 46;
        return (
          <React.Fragment key={it.label}>
            <Sketch start={s} duration={34} seed={it.seed} draw={(g) => it.draw(g, it.x, ICON_Y, 1)} />
            <HandText x={it.x} y={540} text={it.label} font="header" size={50} start={s + 26} duration={12} />
            <HandText x={it.x} y={605} text={it.n} font="label" size={50} start={s + 34} duration={8} />
            <Sketch
              start={s + 38}
              duration={16}
              seed={it.seed + 50}
              draw={(g) => arrow(g, it.x, 630, GEAR.x + (it.x - GEAR.x) * 0.16, GEAR.y - 105, 22)}
            />
          </React.Fragment>
        );
      })}
    </Canvas>
  );
};
