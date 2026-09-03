import React from 'react';
import {Canvas} from '../lib/Canvas';
import {Sketch, arrow} from '../lib/Sketch';
import {HandText} from '../lib/HandText';
import {badge, chest, plusNode, box} from '../lib/icons';
import {C} from '../lib/colors';

/**
 * Scene 7 — Weighted sum & output (1:10 – 1:25)
 * scores → value chests → "+" → context-aware output
 */
export const Scene7: React.FC = () => {
  const xs = [260, 540, 820];
  const scores = ['0.2', '0.7', '0.1'];
  const SCORE_Y = 250;
  const CHEST_Y = 490;
  const PLUS = {x: 540, y: 690};
  const OUT = {x: 540, y: 860};

  return (
    <Canvas>
      <HandText x={540} y={105} text="WEIGHTED SUM" font="header" size={100} start={0} duration={30} letterSpacing={2} />

      {/* score badges */}
      {xs.map((x, i) => (
        <React.Fragment key={`b${i}`}>
          <Sketch start={34 + i * 22} duration={20} seed={601 + i} draw={(g) => badge(g, x, SCORE_Y, 52, C.purple)} />
          <HandText x={x} y={SCORE_Y + 16} text={scores[i]} font="label" size={50} start={48 + i * 22} duration={10} />
        </React.Fragment>
      ))}
      <HandText x={70} y={SCORE_Y + 14} text="SCORES" font="header" size={40} start={100} duration={12} anchor="start" />

      {/* arrows down to chests */}
      {xs.map((x, i) => (
        <Sketch key={`a${i}`} start={116 + i * 14} duration={14} seed={610 + i} draw={(g) => arrow(g, x, SCORE_Y + 62, x, CHEST_Y - 95, 20)} />
      ))}

      {/* value chests (size reflects weight) */}
      {xs.map((x, i) => {
        const sc = [0.72, 1.0, 0.62][i];
        return <Sketch key={`c${i}`} start={160 + i * 26} duration={30} seed={620 + i} draw={(g) => chest(g, x, CHEST_Y, sc)} />;
      })}
      <HandText x={70} y={CHEST_Y + 14} text="VALUES" font="header" size={40} start={240} duration={12} anchor="start" />

      {/* converge into + node */}
      {xs.map((x, i) => (
        <Sketch
          key={`p${i}`}
          start={256 + i * 12}
          duration={16}
          seed={630 + i}
          draw={(g) => arrow(g, x, CHEST_Y + 95, PLUS.x + (x - PLUS.x) * 0.12, PLUS.y - 48, 18)}
        />
      ))}
      <Sketch start={294} duration={22} seed={640} draw={(g) => plusNode(g, PLUS.x, PLUS.y, 44)} />

      {/* output */}
      <Sketch start={318} duration={12} seed={641} draw={(g) => arrow(g, PLUS.x, PLUS.y + 48, OUT.x, OUT.y - 58, 20)} />
      <Sketch start={330} duration={26} seed={642} draw={(g) => box(g, OUT.x, OUT.y, 520, 110, C.yellow)} />
      <HandText x={OUT.x} y={OUT.y + 20} text="CONTEXT-AWARE OUTPUT" font="header" size={58} start={350} duration={22} />

      <HandText x={540} y={1010} text="WORD + SURROUNDING CONTEXT" font="header" size={54} start={382} duration={30} letterSpacing={1} />
    </Canvas>
  );
};
