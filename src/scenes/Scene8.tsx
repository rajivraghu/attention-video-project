import React from 'react';
import {Canvas} from '../lib/Canvas';
import {Sketch, arrow} from '../lib/Sketch';
import {HandText} from '../lib/HandText';
import {avatar, speechBubble, star, table} from '../lib/icons';
import {C} from '../lib/colors';

/**
 * Scene 8 — Real-world analogy: meeting focus (1:25 – 1:37)
 * You (green) at a round table attend to one relevant person (star).
 */
export const Scene8: React.FC = () => {
  const T = {x: 540, y: 560, rx: 250, ry: 150};
  // seats around the table (angle → position on a slightly larger ellipse)
  const seat = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return {x: T.x + Math.cos(a) * (T.rx + 95), y: T.y + Math.sin(a) * (T.ry + 95)};
  };
  const YOU = seat(90); // bottom
  const REL = seat(-90); // top
  const others = [seat(-150), seat(-30), seat(150), seat(30)];

  return (
    <Canvas>
      <HandText x={540} y={100} text="ATTENTION = MEETING FOCUS" font="header" size={84} start={0} duration={34} letterSpacing={2} />

      {/* table */}
      <Sketch start={36} duration={36} seed={701} draw={(g) => table(g, T.x, T.y, T.rx, T.ry)} />

      {/* background people with speech bubbles */}
      {others.map((p, i) => {
        const s = 72 + i * 22;
        const bx = p.x + (p.x < T.x ? -70 : 70);
        return (
          <React.Fragment key={i}>
            <Sketch start={s} duration={22} seed={710 + i} draw={(g) => avatar(g, p.x, p.y, 0.8)} />
            <Sketch start={s + 16} duration={14} seed={720 + i} draw={(g) => speechBubble(g, bx, p.y - 70, 0.8)} />
          </React.Fragment>
        );
      })}
      <HandText x={150} y={335} text="BACKGROUND" font="header" size={38} color={C.gearGrey} start={170} duration={14} />
      <HandText x={930} y={335} text="BACKGROUND" font="header" size={38} color={C.gearGrey} start={178} duration={14} />

      {/* you */}
      <Sketch start={190} duration={26} seed={730} draw={(g) => avatar(g, YOU.x, YOU.y, 0.95, C.active)} />
      <HandText x={YOU.x} y={YOU.y + 105} text="YOU" font="header" size={52} color={C.active} start={212} duration={10} />

      {/* relevant person */}
      <Sketch start={222} duration={26} seed={731} draw={(g) => avatar(g, REL.x, REL.y, 0.95)} />
      <Sketch start={244} duration={14} seed={732} draw={(g) => star(g, REL.x + 78, REL.y - 60, 30)} />
      <HandText x={REL.x} y={REL.y - 95} text="RELEVANT PERSON" font="header" size={44} start={256} duration={16} />

      {/* solid attention arrow */}
      <Sketch
        start={270}
        duration={24}
        seed={733}
        options={{strokeWidth: 7, stroke: C.brown}}
        draw={(g) => arrow(g, YOU.x, YOU.y - 75, REL.x, REL.y + 80, 32)}
      />

      <HandText x={540} y={1010} text="FOCUS ON WHAT MATTERS MOST" font="header" size={58} start={300} duration={30} letterSpacing={1} />
    </Canvas>
  );
};
