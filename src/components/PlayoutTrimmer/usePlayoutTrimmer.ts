import { useCallback, useEffect } from 'react';

import { changeEvent, defaultActiveRange, progressThumbIndex } from './constants';
import { isNumberTuple } from './utils';

interface UsePlayoutTrimmerProps {
  disableProgressConstraint?: boolean;
  onProgressChange?: (event: Event, value: number, activeThumb: number) => void;
  onRangeChange?: (event: Event, value: [number, number], activeThumb: number) => void;
  progressSliderValue?: number;
  rangeSliderValues?: [number, number];
}

interface UsePlayoutTrimmerReturn {
  handleProgressChange?: (event: Event, newProgress: number | number[], activeThumb: number) => void;
  handleRangeChange?: (event: Event, newRange: number | number[], activeThumb: number) => void;
}

export const usePlayoutTrimmer = ({
  disableProgressConstraint = false,
  onProgressChange,
  onRangeChange,
  progressSliderValue,
  rangeSliderValues,
}: UsePlayoutTrimmerProps): UsePlayoutTrimmerReturn => {
  const [leftRangeThumbPosition, rightRangeThumbPosition] = isNumberTuple(rangeSliderValues) ? rangeSliderValues : defaultActiveRange;

  const constrainProgressToRange = useCallback(
    (event: Event, currentProgress: number, activeThumb: number, onProgressChange: (event: Event, value: number, activeThumb: number) => void) => {
      if (currentProgress < leftRangeThumbPosition) {
        onProgressChange(event, leftRangeThumbPosition, activeThumb);
      } else if (currentProgress > rightRangeThumbPosition) {
        onProgressChange(event, rightRangeThumbPosition, activeThumb);
      }
    },
    [leftRangeThumbPosition, rightRangeThumbPosition],
  );

  useEffect(() => {
    if (disableProgressConstraint) return;

    if (progressSliderValue !== undefined && onProgressChange) {
      constrainProgressToRange(changeEvent, progressSliderValue, progressThumbIndex, onProgressChange);
    }
  }, [disableProgressConstraint, constrainProgressToRange, onProgressChange, progressSliderValue]);

  const handleRangeChange = useCallback(
    (event: Event, newRange: number | number[], activeThumb: number) => {
      if (isNumberTuple(newRange)) {
        onRangeChange?.(event, newRange, activeThumb);
      }
    },
    [onRangeChange],
  );

  const handleProgressChange = useCallback(
    (event: Event, newProgress: number | number[], activeThumb: number) => {
      if (typeof newProgress === 'number' && onProgressChange) {
        const isNewProgressWithinRange = newProgress >= leftRangeThumbPosition && newProgress <= rightRangeThumbPosition;

        if (isNewProgressWithinRange || disableProgressConstraint) {
          onProgressChange(event, newProgress, activeThumb);
        } else {
          constrainProgressToRange(event, newProgress, activeThumb, onProgressChange);
        }
      }
    },
    [disableProgressConstraint, constrainProgressToRange, leftRangeThumbPosition, onProgressChange, rightRangeThumbPosition],
  );

  return {
    handleProgressChange,
    handleRangeChange,
  };
};
