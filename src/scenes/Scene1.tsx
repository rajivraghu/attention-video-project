import React from 'react';
import {Canvas} from '../lib/Canvas';
import {Sketch, curvedArrow} from '../lib/Sketch';
import {HandText} from '../lib/HandText';
import {cat, mat, robot, thoughtBubble, questionBadge} from '../lib/icons';
import {C} from '../lib/colors';

/**
 * Scene 1 — Introduction (0:00 – 0:18)
 * "The cat sat on the mat because it was tired." — what does IT refer to?
 */
export const Scene1: React.FC = () => {
  const CAT = {x: 400, y: 380};
  const MAT = {x: 690, y: 420};
  const ROBOT = {x: 520, y: 860};

  return (
    <Canvas>
      {/* header */}
      <HandText x={540} y={110} text="ATTENTION MECHANISM" font="header" size={96} start={0} duration={40} letterSpacing={2} />

      {/* the sentence */}
      <HandText
        x={540}
        y={200}
        text="The cat sat on the mat because it was tired."
        font="body"
        size={42}
        start={45}
        duration={60}
      />

      {/* cat */}
      <Sketch start={110} duration={60} seed={11} draw={(g) => cat(g, CAT.x, CAT.y, 0.95)} />
      <HandText x={262} y={400} text="CAT" font="header" size={48} start={170} duration={16} anchor="end" />
      <Sketch start={186} duration={8} seed={12} draw={(g) => g.line(272, 388, 312, 388)} />

      {/* mat */}
      <Sketch start={200} duration={45} seed={13} draw={(g) => mat(g, MAT.x, MAT.y, 1.05)} />
      <Sketch start={245} duration={8} seed={14} draw={(g) => g.line(788, 410, 828, 410)} />
      <HandText x={840} y={424} text="MAT" font="header" size={48} start={253} duration={16} anchor="start" />

      {/* IT = ? */}
      <HandText x={540} y={430} text="IT = ?" font="header" size={78} start={275} duration={26} />

      {/* robot + label */}
      <Sketch start={310} duration={60} seed={15} draw={(g) => robot(g, ROBOT.x, ROBOT.y, 1)} />
      <HandText x={ROBOT.x} y={1010} text="MODEL" font="header" size={50} start={372} duration={18} />

      {/* thought bubble */}
      <Sketch start={392} duration={40} seed={16} draw={(g) => thoughtBubble(g, 720, 810, 1)} />

      {/* curved dashed arrows + ? badges  — cat side */}
      <Sketch
        start={438}
        duration={30}
        seed={17}
        dashed
        draw={(g) => curvedArrow(g, [610, 770], [470, 735], [405, 550], 22)}
      />
      <Sketch start={462} duration={18} seed={18} draw={(g) => questionBadge(g, 488, 692, 40)} />
      <HandText x={488} y={712} text="?" font="header" size={64} start={476} duration={10} />

      {/* mat side */}
      <Sketch
        start={484}
        duration={30}
        seed={19}
        dashed
        draw={(g) => curvedArrow(g, [660, 745], [660, 640], [675, 505], 22)}
      />
      <Sketch start={506} duration={18} seed={20} draw={(g) => questionBadge(g, 662, 635, 40)} />
      <HandText x={662} y={655} text="?" font="header" size={64} start={520} duration={10} />
    </Canvas>
  );
};
