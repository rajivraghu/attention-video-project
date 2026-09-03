import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from './colors';

/** Pure-white 1080×1080 whiteboard with a single SVG layer for all sketches */
export const Canvas: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
    <svg width={1080} height={1080} viewBox="0 0 1080 1080" style={{display: 'block'}}>
      {children}
    </svg>
  </AbsoluteFill>
);
