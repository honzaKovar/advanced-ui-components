import { ReactElement, useEffect, useState } from 'react';

import { getRelativeValue } from '../../../utils';
import { PlayoutTrimmer, PlayoutTrimmerProps } from '../../../components';

export type PlayoutTrimmerStoryProps = Omit<PlayoutTrimmerProps, 'RangeSliderProps' | 'ProgressSliderProps'> & {
  progress: number;
  progressUnits?: number;
  range: [number, number];
  useUnits?: boolean;
  width?: number;
};

export const PlayoutTrimmerStory = ({ progress: progressFromArgs, range: rangeFromArgs, useUnits, ...restProps }: PlayoutTrimmerStoryProps): ReactElement => {
  const [range, setRange] = useState<[number, number]>(rangeFromArgs);
  const [progress, setProgress] = useState<number>(progressFromArgs);

  const relativeProgress = getRelativeValue(progress, range);

  useEffect(() => {
    setProgress(progressFromArgs);
  }, [progressFromArgs]);

  useEffect(() => {
    setRange(rangeFromArgs);
  }, [rangeFromArgs]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 300, justifyContent: 'space-between', paddingLeft: 10 }}>
      <PlayoutTrimmer
        RangeSliderProps={{
          onChange: (__, newRange) => setRange(newRange),
          value: range,
        }}
        ProgressSliderProps={{
          onChange: (__, newProgress) => setProgress(newProgress),
          value: progress,
        }}
        {...restProps}
      />
      <div style={{ display: 'flex', flexDirection: 'column', height: 80, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 160 }}>Absolute Progress:</div> {useUnits ? `${progress} frames` : progress.toFixed(2)}
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 160 }}>Relative Progress:</div> {relativeProgress.toFixed(2)}
        </div>
      </div>
    </div>
  );
};
