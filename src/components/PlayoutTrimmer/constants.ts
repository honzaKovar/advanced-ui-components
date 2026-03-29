import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/system';

import { getComponentClassName } from '../../utils';

export const maxMarksCount = 15;
export const minMajorBarsCount = 5;
export const majorBarsIdealIntervalSeconds = 5;
export const preferredIntervalsInSeconds = [1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600];

export const changeEvent = new Event('change');

export const scale = {
  decimalMax: 1,
  decimalStep: 0.001,
  min: 0,
  unitStep: 1,
} as const;

export const progressThumbIndex = 0;

export const defaultActiveRange: [number, number] = [0, 1];

const classNamePrefix = 'ui';
const componentName = 'PlayoutTrimmer';

export const componentClassName = getComponentClassName(classNamePrefix, componentName, 'root');
export const rangeSliderClassName = getComponentClassName(classNamePrefix, componentName, 'rangeSlider');
export const progressSliderClassName = getComponentClassName(classNamePrefix, componentName, 'progressSlider');

export const sliderBaseHeight = 32;
export const defaultBorderRadius = ({ shape }: Theme) => `${shape.borderRadius}px`;

export const rangeThumbWidth = 16;
export const rangeSliderTrackBackgroundColor = ({ palette }: Theme) => alpha(palette.primary.main, 0.3);
export const rangeThumbBaseColor = ({ palette }: Theme) => palette.primary.dark;
export const rangeThumbHoveredColor = ({ palette }: Theme) => palette.primary.main;

const progressThumbVerticalOffset = 3;

export const progressSliderHorizontalOffset = 2 * progressThumbVerticalOffset;
export const progressSliderPosition = 'translate(-50%, -58%)';
export const progressThumbBaseWidth = 3;
export const progressThumbHoveredWidth = 4;
export const progressThumbBaseHeight = 36;
export const progressThumbHoveredHeight = 38;
export const progressThumbColor = 'common.white';

export const rulerCanvasZIndex = 0;
export const rangeThumbZIndex = 1;
export const progressThumbZIndex = 2;
