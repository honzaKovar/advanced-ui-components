import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SliderThumb } from '@mui/material';
import { ReactElement } from 'react';

import { RangeSliderThumbProps } from './types';
import { sharedIconProps } from './constants';


export const RangeSliderThumb = ({ children, ...restProps }: RangeSliderThumbProps): ReactElement => {
  const thumbIndex = restProps['data-index'];

  return (
    <SliderThumb {...restProps}>
      {children}
      {thumbIndex === 0 ? <ChevronLeftIcon {...sharedIconProps} /> : <ChevronRightIcon {...sharedIconProps} />}
    </SliderThumb>
  );
};
