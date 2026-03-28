import { Mark } from '@mui/material/Slider/useSlider.types';

import { maxMarksCount, preferredIntervalsInSeconds } from './constants';

export const getNiceInterval = (seconds: number, maxMarks: number): number => {
  if (maxMarks <= 0) return seconds;

  const rawInterval = seconds / maxMarks;

  return preferredIntervalsInSeconds.find((candidate) => candidate >= rawInterval) ?? Math.ceil(rawInterval);
};

export const getMarks = (totalSeconds: number, isUnitBased: boolean, totalUnits?: number, maxMarks = maxMarksCount): Mark[] => {
  const marks: Mark[] = [];

  const effectiveTotalUnits = totalUnits ?? totalSeconds;

  if (totalSeconds <= 0 || effectiveTotalUnits <= 0) {
    return [{ label: '00:00', value: 0 }];
  }

  const unitsPerSecond = effectiveTotalUnits / totalSeconds;
  const intervalInSeconds = getNiceInterval(totalSeconds, maxMarks);

  for (let seconds = 0; seconds <= totalSeconds; seconds += intervalInSeconds) {
    const unitValue = seconds * unitsPerSecond;

    const value = isUnitBased ? Math.round(unitValue) : seconds / totalSeconds;

    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');

    marks.push({
      label: `${minutes}:${secs}`,
      value,
    });
  }

  return marks;
};

export const isNumberTuple = (value: unknown): value is [number, number] =>
  Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number';

