import { getRelativeValue } from './getRelativeValue';

describe('getRelativeValue', () => {
  it('should return correct relative progress when absoluteProgress is within the range', () => {
    expect(getRelativeValue(50, [0, 100])).toBe(0.5);
    expect(getRelativeValue(75, [50, 100])).toBe(0.5);
    expect(getRelativeValue(25, [0, 50])).toBe(0.5);
    expect(getRelativeValue(10, [0, 100])).toBe(0.1);
    expect(getRelativeValue(90, [0, 100])).toBe(0.9);
  });

  it('should return 0 when absoluteProgress is exactly at rangeStart', () => {
    expect(getRelativeValue(0, [0, 100])).toBe(0);
    expect(getRelativeValue(50, [50, 100])).toBe(0);
    expect(getRelativeValue(-10, [-10, 10])).toBe(0);
  });

  it('should return 1 when absoluteProgress is exactly at rangeEnd', () => {
    expect(getRelativeValue(100, [0, 100])).toBe(1);
    expect(getRelativeValue(100, [50, 100])).toBe(1);
    expect(getRelativeValue(10, [-10, 10])).toBe(1);
  });

  it('should return 0 when absoluteProgress is less than rangeStart', () => {
    expect(getRelativeValue(-10, [0, 100])).toBe(0);
    expect(getRelativeValue(40, [50, 100])).toBe(0);
    expect(getRelativeValue(-20, [-10, 10])).toBe(0);
  });

  it('should return 1 when absoluteProgress is greater than rangeEnd', () => {
    expect(getRelativeValue(110, [0, 100])).toBe(1);
    expect(getRelativeValue(120, [50, 100])).toBe(1);
    expect(getRelativeValue(20, [-10, 10])).toBe(1);
  });

  it('should return 0 when rangeStart equals rangeEnd', () => {
    expect(getRelativeValue(50, [50, 50])).toBe(0);
    expect(getRelativeValue(0, [0, 0])).toBe(0);
    expect(getRelativeValue(100, [50, 50])).toBe(0);
  });

  it('should handle negative range values correctly', () => {
    expect(getRelativeValue(-5, [-10, 0])).toBe(0.5);
    expect(getRelativeValue(-10, [-10, 0])).toBe(0);
    expect(getRelativeValue(0, [-10, 0])).toBe(1);
    expect(getRelativeValue(-15, [-10, 0])).toBe(0);
    expect(getRelativeValue(5, [-10, 0])).toBe(1);
  });

  it('should handle mixed positive and negative range values correctly', () => {
    expect(getRelativeValue(0, [-10, 10])).toBe(0.5);
    expect(getRelativeValue(-5, [-10, 10])).toBe(0.25);
    expect(getRelativeValue(5, [-10, 10])).toBe(0.75);
  });

  it('should handle floating point values correctly', () => {
    expect(getRelativeValue(0.5, [0, 1])).toBe(0.5);
    expect(getRelativeValue(0.75, [0.5, 1.5])).toBe(0.25);
    expect(getRelativeValue(0.1, [0, 0.2])).toBe(0.5);
    expect(getRelativeValue(0.05, [0, 0.1])).toBe(0.5);
  });

  it('should return 0 or 1 for reverse ranges due to Math.max/min constrains', () => {
    expect(getRelativeValue(50, [100, 0])).toBe(0.5);
    expect(getRelativeValue(100, [100, 0])).toBe(0);
    expect(getRelativeValue(0, [100, 0])).toBe(1);
    expect(getRelativeValue(150, [100, 0])).toBe(0);
    expect(getRelativeValue(-50, [100, 0])).toBe(1);
  });
});
