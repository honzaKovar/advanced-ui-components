export const clampValueWithinRange = (value: number, range: [number, number]): number => {
  const [start, end] = range;

  return Math.max(start, Math.min(end, value));
};
