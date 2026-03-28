import { alpha, SxProps, Theme } from '@mui/material';

import {
  defaultBorderRadius,
  progressSliderHorizontalOffset,
  progressSliderPosition,
  progressThumbBaseHeight,
  progressThumbBaseWidth,
  progressThumbColor,
  progressThumbHoveredHeight,
  progressThumbHoveredWidth,
  progressThumbZIndex,
  rangeSliderTrackBackgroundColor,
  rangeThumbBaseColor,
  rangeThumbHoveredColor,
  rangeThumbWidth,
  rangeThumbZIndex,
  sliderBaseHeight,
} from './constants';

export const defaultPlayoutTrimmerSx: SxProps<Theme> = {
  alignItems: 'center',
  display: 'flex',
  height: sliderBaseHeight,
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
};

const rangeSliderDockSx: SxProps<Theme> = {
  backgroundColor: 'transparent',
  border: ({ palette }) => `1px solid ${palette.divider}`,
  boxSizing: 'border-box',
  content: '""',
  height: sliderBaseHeight,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: rangeThumbWidth,
};

export const defaultRangeSliderSx: SxProps<Theme> = (theme) => ({
  '& .MuiSlider-rail': {
    backgroundColor: 'transparent',
    height: sliderBaseHeight,
  },
  '& .MuiSlider-thumb': {
    '&::before': {
      boxShadow: 'none',
    },
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      backgroundColor: rangeThumbBaseColor,
      boxShadow: 'none',
    },
    backgroundColor: rangeThumbBaseColor,
    border: 'none',
    boxShadow: 'none',
    maxHeight: sliderBaseHeight,
    maxWidth: rangeThumbWidth,
    minHeight: sliderBaseHeight,
    width: rangeThumbWidth,
    zIndex: rangeThumbZIndex,
  },
  '& .MuiSlider-thumb[data-index="0"]': {
    borderRadius: `${defaultBorderRadius(theme)} 0 0 ${defaultBorderRadius(theme)}`,
    transform: 'translate(-100%, -50%)',
  },
  '& .MuiSlider-thumb[data-index="1"]': {
    borderRadius: `0 ${defaultBorderRadius(theme)} ${defaultBorderRadius(theme)} 0`,
    transform: 'translate(0%, -50%)',
  },
  '& .MuiSlider-track': {
    backgroundColor: rangeSliderTrackBackgroundColor,
    borderBottom: `2px solid ${rangeThumbBaseColor(theme)}`,
    borderTop: `2px solid ${rangeThumbBaseColor(theme)}`,
  },
  '&.MuiSlider-root': {
    borderRadius: 0,
    height: sliderBaseHeight,
    mb: 0,
    mt: 0,
    pb: 0,
    pt: 0,
  },
  '&::after': {
    ...rangeSliderDockSx,
    borderBottomRightRadius: defaultBorderRadius,
    borderTopRightRadius: defaultBorderRadius,
    right: -rangeThumbWidth,
  },
  '&::before': {
    ...rangeSliderDockSx,
    borderBottomLeftRadius: defaultBorderRadius,
    borderTopLeftRadius: defaultBorderRadius,
    left: -rangeThumbWidth,
  },
  '&:hover, &.Mui-focusVisible, &.Mui-active': {
    '& .MuiSlider-thumb': {
      backgroundColor: rangeThumbHoveredColor,
    },
    '& .MuiSlider-track': {
      backgroundColor: rangeSliderTrackBackgroundColor,
      borderBottomColor: rangeThumbHoveredColor,
      borderTopColor: rangeThumbHoveredColor,
    },
  },
  backgroundColor: 'transparent',
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderTop: `1px solid ${theme.palette.divider}`,
  boxSizing: 'border-box',
  height: sliderBaseHeight,
  p: 0,
  position: 'absolute',
  width: '100%',
});

export const defaultProgressSliderSx: SxProps<Theme> = ({ palette, typography }) => ({
  '& .MuiSlider-mark': {
    display: 'none',
  },
  '& .MuiSlider-markLabel.MuiSlider-markLabel': {
    color: palette.text.primary, //
    mt: 0.5,
  },
  '& .MuiSlider-markLabel.MuiSlider-markLabelActive': {
    color: palette.text.primary, //
  },
  '& .MuiSlider-rail': {
    background: 'transparent',
  },
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      backgroundColor: progressThumbColor,
      boxShadow: 'none',
    },
    backgroundColor: progressThumbColor,
    border: `0.5px solid ${alpha(palette.text.secondary, 0.7)}`,
    borderRadius: defaultBorderRadius,
    boxShadow: 'none',
    height: progressThumbBaseHeight,
    maxWidth: progressThumbBaseWidth,
    minHeight: progressThumbBaseHeight,
    transform: progressSliderPosition,
    width: progressThumbBaseWidth,
    zIndex: progressThumbZIndex,
  },
  '& .MuiSlider-track': {
    background: 'transparent',
    border: 'none',
  },
  '&:hover, &.Mui-focusVisible, &.Mui-active': {
    '& .MuiSlider-thumb': {
      backgroundColor: progressThumbColor,
      borderRadius: defaultBorderRadius,
      boxShadow: 'none',
      height: progressThumbHoveredHeight,
      maxWidth: progressThumbHoveredWidth,
      minHeight: progressThumbHoveredHeight,
      transform: progressSliderPosition,
      width: progressThumbHoveredWidth,
    },
  },
  color: progressThumbColor,
  height: sliderBaseHeight,
  mb: 0,
  p: 0,
  position: 'absolute',
  width: `calc(100% - ${progressSliderHorizontalOffset}px)`,
});
