import React from 'react';
import {Canvas} from '../lib/Canvas';
import {Sketch, arrow, blockArrow} from '../lib/Sketch';
import {HandText} from '../lib/HandText';
import {cat, mat, brain, box} from '../lib/icons';
import {C} from '../lib/colors';

/**
 * Scene 3 — Attention Weights (0:33 – 0:43)
 * IT → CAT strongly (0.75), IT → MAT weakly (0.15) → better context for the model.
 */
export const Scene3: React.FC = () => {
  const CAT = {x: 320, y: 260};
  const MAT = {x: 740, y: 250};
  const IT = {x: 540, y: 485};
  const BRAIN = {x: 540, y: 760};

  return (
    <Canvas>
      <HandText x={540} y={100} text="ATTENTION WEIGHTS" font="header" size={92} start={0} duration={30} letterSpacing={2} />

      {/* cat */}
      <Sketch start={28} duration={50} seed={201} draw={(g) => cat(g, CAT.x, CAT.y, 0.78)} />
      <HandText x={CAT.x} y={415} text="CAT" font="header" size={48} start={78} duration={12} />

      {/* mat */}
      <Sketch start={90} duration={40} seed={202} draw={(g) => mat(g, MAT.x, MAT.y, 0.9, -0.35)} />
      <HandText x={MAT.x} y={400} text="MAT" font="header" size={48} start={128} duration={12} />

      {/* IT box */}
      <Sketch start={140} duration={22} seed={203} draw={(g) => box(g, IT.x, IT.y, 96, 90, C.yellow)} />
      <HandText x={IT.x} y={506} text="IT" font="header" size={64} start={154} duration={10} />

      {/* strong arrow to cat, weak arrow to mat */}
      <Sketch
        start={166}
        duration={20}
        seed={204}
        options={{strokeWidth: 7}}
        draw={(g) => arrow(g, IT.x - 55, IT.y - 40, CAT.x + 90, CAT.y + 60, 30)}
      />
      <Sketch
        start={186}
        duration={18}
        seed={205}
        options={{strokeWidth: 2}}
        draw={(g) => arrow(g, IT.x + 55, IT.y - 40, MAT.x - 75, MAT.y + 70, 16)}
      />

      {/* HIGH attention (green up) */}
      <Sketch start={198} duration={20} seed={206} draw={(g) => blockArrow(g, CAT.x, 500, 110, 'up', C.active)} />
      <HandText x={CAT.x} y={610} text="HIGH" font="header" size={44} start={216} duration={10} />
      <HandText x={CAT.x} y={655} text="ATTENTION" font="header" size={44} start={224} duration={12} />
      <HandText x={CAT.x} y={740} text="0.75" font="label" size={62} start={238} duration={14} />

      {/* LOW attention (red down) */}
      <Sketch start={210} duration={20} seed={207} draw={(g) => blockArrow(g, MAT.x, 500, 110, 'down', C.negative)} />
      <HandText x={MAT.x} y={610} text="LOW" font="header" size={44} start={230} duration={10} />
      <HandText x={MAT.x} y={655} text="ATTENTION" font="header" size={44} start={238} duration={12} />
      <HandText x={MAT.x} y={740} text="0.15" font="label" size={62} start={250} duration={14} />

      {/* model brain */}
      <Sketch start={228} duration={45} seed={208} draw={(g) => brain(g, BRAIN.x, BRAIN.y, 1)} />
      <HandText x={BRAIN.x - 20} y={905} text="MODEL" font="header" size={48} start={270} duration={12} anchor="middle" />
      <HandText x={BRAIN.x + 130} y={880} text="BETTER" font="header" size={44} start={280} duration={10} anchor="middle" />
      <HandText x={BRAIN.x + 130} y={922} text="CONTEXT" font="header" size={44} start={288} duration={10} anchor="middle" />
    </Canvas>
  );
};
