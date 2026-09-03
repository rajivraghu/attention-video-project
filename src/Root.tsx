import React from 'react';
import {Composition} from 'remotion';
import {AttentionVideo, TOTAL_FRAMES} from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AttentionMechanism"
      component={AttentionVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
