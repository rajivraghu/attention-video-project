import React from 'react';
import {Series} from 'remotion';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {Scene6} from './scenes/Scene6';
import {Scene7} from './scenes/Scene7';
import {Scene8} from './scenes/Scene8';

/** Scene durations in frames @30fps — hard cuts between scenes */
export const SCENES = {
  intro: 540, // 0:00 – 0:18
  focus: 450, // 0:18 – 0:33
  weights: 300, // 0:33 – 0:43
  concepts: 270, // 0:43 – 0:52
  qkv: 300, // 0:52 – 1:02
  matching: 240, // 1:02 – 1:10
  weighted: 450, // 1:10 – 1:25
  meeting: 360, // 1:25 – 1:37
};

export const TOTAL_FRAMES = Object.values(SCENES).reduce((a, b) => a + b, 0);

export const AttentionVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SCENES.intro}>
        <Scene1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.focus}>
        <Scene2 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.weights}>
        <Scene3 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.concepts}>
        <Scene4 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.qkv}>
        <Scene5 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.matching}>
        <Scene6 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.weighted}>
        <Scene7 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.meeting}>
        <Scene8 />
      </Series.Sequence>
    </Series>
  );
};
