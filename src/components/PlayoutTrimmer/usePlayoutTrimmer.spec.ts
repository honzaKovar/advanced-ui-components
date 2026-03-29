import { act, renderHook } from '@testing-library/react';

import { usePlayoutTrimmer } from './usePlayoutTrimmer';

const mockChangeEvent = new Event('change');
const mockProgressThumbIndex = 0;
const updatedActiveRange: [number, number] = [0.2, 0.8];

jest.mock('./constants', () => ({
  changeEvent: new Event('change'),
  defaultActiveRange: [0, 1],
  progressThumbIndex: 0,
}));

describe('usePlayoutTrimmer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return handleProgressChange and handleRangeChange functions', () => {
    const { result } = renderHook(() => usePlayoutTrimmer({}));

    expect(typeof result.current.handleProgressChange).toBe('function');
    expect(typeof result.current.handleRangeChange).toBe('function');
  });

  it('should call onRangeChange with updatedActiveRange when it is a valid number tuple', () => {
    const onRangeChangeMock = jest.fn();
    const { result } = renderHook(() => usePlayoutTrimmer({ onRangeChange: onRangeChangeMock }));

    const activeThumb = 1;

    act(() => {
      result.current.handleRangeChange?.(mockChangeEvent, updatedActiveRange, activeThumb);
    });

    expect(onRangeChangeMock).toHaveBeenCalledTimes(1);
    expect(onRangeChangeMock).toHaveBeenCalledWith(mockChangeEvent, updatedActiveRange, activeThumb);
  });

  it('should not call onRangeChange when newRange is not a valid number tuple', () => {
    const onRangeChangeMock = jest.fn();
    const { result } = renderHook(() => usePlayoutTrimmer({ onRangeChange: onRangeChangeMock }));

    act(() => {
      result.current.handleRangeChange?.(mockChangeEvent, 0.5, 0); // Single number
      result.current.handleRangeChange?.(mockChangeEvent, [0.1, 'b' as unknown as number], 0); // Invalid element
      result.current.handleRangeChange?.(mockChangeEvent, [0.1, 0.2, 0.3], 0); // Incorrect length
    });

    expect(onRangeChangeMock).not.toHaveBeenCalled();
  });

  it('should call onProgressChange when newProgress is within the active range', () => {
    const onProgressChangeMock = jest.fn();
    const { result } = renderHook(() =>
      usePlayoutTrimmer({
        onProgressChange: onProgressChangeMock,
        rangeSliderValues: [0.2, 0.8],
      }),
    );

    const newProgressValue = 0.5;

    act(() => {
      result.current.handleProgressChange?.(mockChangeEvent, newProgressValue, mockProgressThumbIndex);
    });

    expect(onProgressChangeMock).toHaveBeenCalledTimes(1);
    expect(onProgressChangeMock).toHaveBeenCalledWith(mockChangeEvent, newProgressValue, mockProgressThumbIndex);
  });

  it('should call onProgressChange with constrained value when newProgress is below the active range', () => {
    const onProgressChangeMock = jest.fn();
    const { result } = renderHook(() =>
      usePlayoutTrimmer({
        onProgressChange: onProgressChangeMock,
        rangeSliderValues: [0.2, 0.8],
      }),
    );

    const newProgressValue = 0.1; // Below 0.2

    act(() => {
      result.current.handleProgressChange?.(mockChangeEvent, newProgressValue, mockProgressThumbIndex);
    });

    expect(onProgressChangeMock).toHaveBeenCalledTimes(1);
    expect(onProgressChangeMock).toHaveBeenCalledWith(mockChangeEvent, 0.2, mockProgressThumbIndex); // Constrained to leftRangeThumbPosition (updated value)
  });

  it('should call onProgressChange with constrained value when newProgress is above the active range', () => {
    const onProgressChangeMock = jest.fn();
    const { result } = renderHook(() =>
      usePlayoutTrimmer({
        onProgressChange: onProgressChangeMock,
        rangeSliderValues: [0.2, 0.8],
      }),
    );

    const newProgressValue = 0.9; // Above 0.8

    act(() => {
      result.current.handleProgressChange?.(mockChangeEvent, newProgressValue, mockProgressThumbIndex);
    });

    expect(onProgressChangeMock).toHaveBeenCalledTimes(1);
    expect(onProgressChangeMock).toHaveBeenCalledWith(mockChangeEvent, 0.8, mockProgressThumbIndex); // Constrained to rightRangeThumbPosition (updated value)
  });

  // Test Case 7: handleProgressChange - newProgress is not a number
  it('should not call onProgressChange when newProgress is not a number', () => {
    const onProgressChangeMock = jest.fn();
    const { result } = renderHook(() =>
      usePlayoutTrimmer({
        onProgressChange: onProgressChangeMock,
        rangeSliderValues: [0.2, 0.8],
      }),
    );

    act(() => {
      result.current.handleProgressChange?.(mockChangeEvent, [0.5, 0.6], 0); // Array
      result.current.handleProgressChange?.(mockChangeEvent, 'abc' as unknown as number, 0); // String
    });

    expect(onProgressChangeMock).not.toHaveBeenCalled();
  });

  it('should constrain progressSliderValue on initial render if outside range', () => {
    const onProgressChangeMock = jest.fn();

    renderHook(() =>
      usePlayoutTrimmer({
        onProgressChange: onProgressChangeMock,
        progressSliderValue: 0.1, // Below 0.2
        rangeSliderValues: [0.2, 0.8],
      }),
    );

    expect(onProgressChangeMock).toHaveBeenCalledTimes(1);
    expect(onProgressChangeMock).toHaveBeenCalledWith(
      expect.any(Event),
      0.2, // Constrained to leftRangeThumbPosition (0.2)
      mockProgressThumbIndex,
    );
  });

  it('should not constrain progressSliderValue on initial render if within range', () => {
    const onProgressChangeMock = jest.fn();

    renderHook(() =>
      usePlayoutTrimmer({
        onProgressChange: onProgressChangeMock,
        progressSliderValue: 0.5, // Within provided range [0.2, 0.8]
        rangeSliderValues: [0.2, 0.8],
      }),
    );

    expect(onProgressChangeMock).not.toHaveBeenCalled(); // No constraining needed
  });

  it('should constrain progressSliderValue when rangeSliderValues change and progress is outside new range', () => {
    const onProgressChangeMock = jest.fn();
    const { rerender } = renderHook(
      ({ progressSliderValue, rangeSliderValues }) =>
        usePlayoutTrimmer({
          onProgressChange: onProgressChangeMock,
          progressSliderValue,
          rangeSliderValues,
        }),
      {
        initialProps: {
          progressSliderValue: 0.5,
          rangeSliderValues: [0, 1] as [number, number],
        },
      },
    );

    // Initially, progress is within range, no call
    expect(onProgressChangeMock).not.toHaveBeenCalled();

    // Rerender with new range after which progress is outside the range
    act(() => {
      rerender({
        progressSliderValue: 0.5,
        rangeSliderValues: [0.6, 0.8],
      });
    });

    expect(onProgressChangeMock).toHaveBeenCalledTimes(1);
    expect(onProgressChangeMock).toHaveBeenCalledWith(
      expect.any(Event),
      0.6, // Constrained to new left range value
      mockProgressThumbIndex,
    );

    onProgressChangeMock.mockClear(); // Clear mock for next rerender

    // Rerender with new range after which progress is outside the range
    act(() => {
      rerender({
        progressSliderValue: 0.7,
        rangeSliderValues: [0.1, 0.5],
      });
    });

    expect(onProgressChangeMock).toHaveBeenCalledTimes(1);
    expect(onProgressChangeMock).toHaveBeenCalledWith(
      expect.any(Event),
      0.5, // Constrained to new right range value
      mockProgressThumbIndex,
    );
  });

  it('should use defaultActiveRange when rangeSliderValues is not a number tuple', () => {
    const onProgressChangeMock = jest.fn();
    const { result } = renderHook(() =>
      usePlayoutTrimmer({
        onProgressChange: onProgressChangeMock,
        progressSliderValue: 1.5,
        rangeSliderValues: undefined,
      }),
    );

    expect(onProgressChangeMock).toHaveBeenCalledTimes(1);
    expect(onProgressChangeMock).toHaveBeenCalledWith(
      expect.any(Event),
      1, // Constrained to defaultActiveRange's end
      mockProgressThumbIndex,
    );

    onProgressChangeMock.mockClear();

    act(() => {
      result.current.handleProgressChange?.(mockChangeEvent, -0.1, 0); // Below default range's start
    });

    expect(onProgressChangeMock).toHaveBeenCalledTimes(1);
    expect(onProgressChangeMock).toHaveBeenCalledWith(
      expect.any(Event),
      0, // Constrained to defaultActiveRange's start
      mockProgressThumbIndex,
    );
  });
});
