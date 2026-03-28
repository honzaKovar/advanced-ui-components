import { clampValueWithinRange } from '../clampValueWithinRange';

/**
 * Converts an absolute value into its relative position within a specified range.
 *
 * Given an absolute value, this function calculates its normalized (relative) position
 * within the range [start, end], producing a value between 0 and 1.
 *
 * - If `start` and `end` are equal, the function returns 0 to avoid division by zero.
 * - The result is clamped to the range [0, 1] to ensure it remains within bounds.
 *
 * @param value - The absolute value to normalize.
 * @param range - A tuple [start, end] defining the range against which to normalize the value.
 * @returns A number between 0 and 1 representing the value’s relative position within the range.
 */
export const getRelativeValue = (value: number, [start, end]: [number, number]): number => {
  if (start === end) return 0;

  const valueWithinRange = value - start;
  const totalRangeLength = end - start;

  const relative = valueWithinRange / totalRangeLength;

  // Ensures the relative progress is strictly between 0 and 1.
  return clampValueWithinRange(relative, [0, 1]);
};
