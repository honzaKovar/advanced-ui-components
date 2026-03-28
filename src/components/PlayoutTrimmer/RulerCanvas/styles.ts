import { SxProps, Theme } from '@mui/material';
import { CSSProperties } from 'react';

import { rulerCanvasZIndex, sliderBaseHeight } from '../constants';

export const canvasStyle: CSSProperties = {
  display: 'block',
  height: '100%',
  width: '100%',
};

export const canvasWrapperSx: SxProps<Theme> = {
  background: 'transparent',
  display: 'block',
  height: sliderBaseHeight,
  mx: 0.75,
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  zIndex: rulerCanvasZIndex,
};
