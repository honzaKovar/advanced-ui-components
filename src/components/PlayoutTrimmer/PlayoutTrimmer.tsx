import { ReactElement } from 'react';

import { componentClassName, defaultActiveRange, progressSliderClassName, rangeSliderClassName, scale } from './constants';
import { defaultProgressSliderSx, defaultRangeSliderSx, defaultPlayoutTrimmerSx } from './styles';
import { PlayoutTrimmerProps } from './types';
import { usePlayoutTrimmer } from './usePlayoutTrimmer';
import { getMarks, isNumberTuple } from './utils';
import { Box, Slider, SliderProps } from '@mui/material';
import { mergeSx } from '../../utils';
import { RangeSliderThumb, RulerCanvas } from './components';

const { decimalMax, decimalStep, min, unitStep } = scale;

export const PlayoutTrimmer = ({
  disableProgressConstraint,
  ProgressSliderProps,
  RangeSliderProps,
  sx: playoutTrimmerSx,
  totalSeconds,
  totalUnits,
  ...restPlayoutTrimmerProps
}: PlayoutTrimmerProps): ReactElement => {
  const {
    onChange: onRangeChange,
    onChangeCommitted: onRangeChangeCommitted,
    sx: rangeSliderSx,
    testId: rangeSliderTestId,
    value: rangeSliderValues = defaultActiveRange,
    ...restRangeSliderProps
  } = RangeSliderProps;
  const {
    onChange: onProgressChange,
    onChangeCommitted: onProgressChangeCommitted,
    sx: progressSliderSx,
    testId: progressSliderTestId,
    value: progressSliderValue = 0,
    ...restProgressSliderProps
  } = ProgressSliderProps;

  const { handleProgressChange, handleRangeChange } = usePlayoutTrimmer({
    disableProgressConstraint,
    onProgressChange,
    onRangeChange,
    progressSliderValue,
    rangeSliderValues,
  });

  const isUnitBased = totalUnits !== undefined && totalSeconds !== totalUnits;

  const SharedSliderProps: Partial<SliderProps> = {
    max: isUnitBased ? totalUnits : decimalMax,
    min,
    step: isUnitBased ? unitStep : decimalStep,
  };

  return (
    <Box className={componentClassName} sx={mergeSx(defaultPlayoutTrimmerSx, playoutTrimmerSx)} {...restPlayoutTrimmerProps}>
      {/* TrimIn/TrimOut Range Slider */}
      <Slider
        {...SharedSliderProps}
        className={rangeSliderClassName}
        slots={{ thumb: RangeSliderThumb }}
        onChange={handleRangeChange}
        onChangeCommitted={(event, value) => {
          if (!isNumberTuple(value)) return;

          onRangeChangeCommitted?.(event, value);
        }}
        value={rangeSliderValues}
        sx={mergeSx(defaultRangeSliderSx, rangeSliderSx)}
        data-testid={rangeSliderTestId}
        {...restRangeSliderProps}
      />

      <RulerCanvas totalSeconds={totalSeconds} activeRange={rangeSliderValues} totalUnits={totalUnits} isUnitBased={isUnitBased} />

      {/* Progress Slider */}
      <Slider
        {...SharedSliderProps}
        className={progressSliderClassName}
        marks={getMarks(totalSeconds, isUnitBased, totalUnits)}
        onChange={handleProgressChange}
        onChangeCommitted={(event, value) => {
          if (typeof value !== 'number') return;

          onProgressChangeCommitted?.(event, value);
        }}
        value={progressSliderValue}
        sx={mergeSx(defaultProgressSliderSx, progressSliderSx)}
        data-testid={progressSliderTestId}
        {...restProgressSliderProps}
      />
    </Box>
  );
};
