import React from 'react';
import {Canvas} from '../lib/Canvas';
import {Sketch, arrow} from '../lib/Sketch';
import {HandText} from '../lib/HandText';
import {magnifier, key, checkmark} from '../lib/icons';
import {C} from '../lib/colors';

/**
 * Scene 6 — Query-Key matching (1:02 – 1:10)
 * One query compared against three keys; key 2 is the strong match.
 */
export const Scene6: React.FC = () => {
  const Q = {x: 250, y: 560};
  const keys = [
    {y: 330, score: '0.2', strong: false},
    {y: 570, score: '0.7', strong: true},
    {y: 810, score: '0.1', strong: false},
  ];
  const KX = 660;

  return (
    <Canvas>
      <HandText x={540} y={110} text="QUERY-KEY MATCHING" font="header" size={96} start={0} duration={34} letterSpacing={2} />

      {/* query */}
      <Sketch start={30} duration={28} seed={501} draw={(g) => magnifier(g, Q.x, Q.y, 1.15)} />
      <HandText x={Q.x} y={760} text="QUERY" font="header" size={56} start={54} duration={10} />

      {/* keys */}
      {keys.map((k, i) => {
        const s = 62 + i * 20;
        return (
          <React.Fragment key={i}>
            <Sketch start={s} duration={20} seed={510 + i} draw={(g) => key(g, KX, k.y, 0.62)} />
            <HandText x={KX + 70} y={k.y + 12} text={`KEY ${i + 1}`} font="header" size={46} start={s + 14} duration={8} anchor="start" />
          </React.Fragment>
        );
      })}

      {/* arrows query → keys */}
      {keys.map((k, i) => (
        <Sketch
          key={`a${i}`}
          start={122 + i * 12}
          duration={14}
          seed={520 + i}
          options={{strokeWidth: k.strong ? 6 : 3}}
          draw={(g) => arrow(g, Q.x + 80, Q.y - 30, KX - 75, k.y - 10, k.strong ? 26 : 20)}
        />
      ))}

      {/* scores */}
      {keys.map((k, i) => (
        <HandText
          key={`s${i}`}
          x={880}
          y={k.y + 16}
          text={k.score}
          font="label"
          size={k.strong ? 66 : 50}
          color={k.strong ? C.active : C.ink}
          start={160 + i * 10}
          duration={10}
          anchor="start"
        />
      ))}

      {/* strong match check + label */}
      <Sketch start={190} duration={12} seed={530} draw={(g) => checkmark(g, 1000, keys[1].y, 0.9)} />
      <HandText x={KX + 90} y={keys[1].y + 78} text="STRONG MATCH" font="header" size={40} color={C.active} start={200} duration={12} anchor="start" />

      <HandText x={540} y={1010} text="HIGHER ATTENTION SCORE" font="header" size={56} start={212} duration={24} letterSpacing={1} />
    </Canvas>
  );
};
