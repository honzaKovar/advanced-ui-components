import { BoxProps, SliderProps } from '@mui/material';
import { SyntheticEvent } from 'react';

export interface PlayoutTrimmerProps extends BoxProps {
  ProgressSliderProps: Omit<SliderProps, 'onChange' | 'onChangeCommitted' | 'value'> & {
    onChange?: (event: Event, value: number, activeThumb: number) => void;
    onChangeCommitted?: (event: SyntheticEvent | Event, value: number) => void;
    testId?: string;
    value?: number;
  };
  RangeSliderProps: Omit<SliderProps, 'onChange' | 'onChangeCommitted' | 'value'> & {
    onChange?: (event: Event, value: [number, number], activeThumb: number) => void;
    onChangeCommitted?: (event: SyntheticEvent | Event, value: [number, number]) => void;
    testId?: string;
    value?: [number, number];
  };
  disableProgressConstraint?: boolean;
  totalSeconds: number;
  totalUnits?: number;
}
