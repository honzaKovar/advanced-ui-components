import { clampValueWithinRange } from './clampValueWithinRange';

describe('clampValueWithinRange', () => {
  it('should return the value itself if it is within the range', () => {
    expect(clampValueWithinRange(5, [0, 10])).toBe(5);
    expect(clampValueWithinRange(0, [0, 10])).toBe(0);
    expect(clampValueWithinRange(10, [0, 10])).toBe(10);
    expect(clampValueWithinRange(5.5, [0.1, 9.9])).toBe(5.5);
  });

  it('should return the start of the range if the value is below it', () => {
    expect(clampValueWithinRange(-5, [0, 10])).toBe(0);
    expect(clampValueWithinRange(-0.1, [0, 10])).toBe(0);
    expect(clampValueWithinRange(9.9, [10, 20])).toBe(10);
  });

  it('should return the end of the range if the value is above it', () => {
    expect(clampValueWithinRange(15, [0, 10])).toBe(10);
    expect(clampValueWithinRange(10.1, [0, 10])).toBe(10);
    expect(clampValueWithinRange(20.1, [10, 20])).toBe(20);
  });

  it('should return the start/end value if the range is a single point', () => {
    expect(clampValueWithinRange(5, [5, 5])).toBe(5);
    expect(clampValueWithinRange(0, [5, 5])).toBe(5);
    expect(clampValueWithinRange(10, [5, 5])).toBe(5);
    expect(clampValueWithinRange(5.0001, [5, 5])).toBe(5);
  });

  it('should clamp to the larger value (start) if the range is inverted (start > end)', () => {
    expect(clampValueWithinRange(5, [50, 10])).toBe(50);
    expect(clampValueWithinRange(10, [50, 10])).toBe(50);
    expect(clampValueWithinRange(30, [50, 10])).toBe(50);
    expect(clampValueWithinRange(50, [50, 10])).toBe(50);
    expect(clampValueWithinRange(70, [50, 10])).toBe(50);
  });
});
