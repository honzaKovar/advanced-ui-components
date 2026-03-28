import { render } from '@testing-library/react';

import { RangeSliderThumb } from './RangeSliderThumb';

describe('RangeSliderThumb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RangeSliderThumb />);

    expect(baseElement).toBeTruthy();
  });
});
