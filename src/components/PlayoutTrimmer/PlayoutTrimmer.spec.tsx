import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { progressSliderClassName, rangeSliderClassName } from './constants';
import { PlayoutTrimmer } from './PlayoutTrimmer';

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}));

describe('PlayoutTrimmer', () => {
  it('should render successfully', () => {
    const progressSliderTestId = 'progressSliderTestId';
    const rangeSliderTestId = 'rangeSliderTestId';

    const { baseElement, getByTestId } = render(
      <PlayoutTrimmer totalSeconds={100} ProgressSliderProps={{ testId: progressSliderTestId }} RangeSliderProps={{ testId: rangeSliderTestId }} />,
    );

    expect(baseElement).toBeTruthy();

    expect(getByTestId(progressSliderTestId)).toHaveClass(progressSliderClassName);
    expect(getByTestId(rangeSliderTestId)).toHaveClass(rangeSliderClassName);
  });
});
