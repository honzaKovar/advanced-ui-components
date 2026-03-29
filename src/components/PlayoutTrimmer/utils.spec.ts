import { getMarks, getNiceInterval, isNumberTuple } from './utils';

describe('getNiceInterval', () => {
  it('should return the exact preferred interval if rawInterval matches', () => {
    expect(getNiceInterval(100, 10)).toBe(10);
    expect(getNiceInterval(60, 1)).toBe(60);
  });

  it('should return the next largest preferred interval if rawInterval is between them', () => {
    expect(getNiceInterval(3, 1)).toBe(5);
    expect(getNiceInterval(12, 1)).toBe(15);
    expect(getNiceInterval(2.1, 1)).toBe(5);
  });

  it('should return the smallest preferred interval if rawInterval is less than 1', () => {
    expect(getNiceInterval(0.5, 1)).toBe(1);
    expect(getNiceInterval(0.01, 1)).toBe(1);
  });

  it('should return Math.ceil(rawInterval) if rawInterval is greater than all preferred intervals', () => {
    expect(getNiceInterval(4000, 1)).toBe(4000);
    expect(getNiceInterval(3601, 1)).toBe(3601);
    expect(getNiceInterval(3600.1, 1)).toBe(3601);
  });

  it('should return 1 if seconds is 0', () => {
    expect(getNiceInterval(0, 10)).toBe(1);
    expect(getNiceInterval(0, 1)).toBe(1);
  });

  it('should handle various combinations correctly', () => {
    expect(getNiceInterval(100, 3)).toBe(60);
    expect(getNiceInterval(1000, 7)).toBe(300);
    expect(getNiceInterval(1800, 2)).toBe(900);
  });

  it('should return total seconds with invalid maxMarks', () => {
    expect(getNiceInterval(100, 0)).toBe(100);
    expect(getNiceInterval(100, -5)).toBe(100);
  });
});

describe('getMarks', () => {
  const defaultMaxMarks = 15;
  const max5Marks = 5;
  const totalSeconds = 50;

  it('should generate marks with correct labels and values for a simple duration (50 seconds)', () => {
    const marks = getMarks(totalSeconds, false, undefined, defaultMaxMarks);

    expect(marks).toEqual([
      { label: '00:00', value: 0 },
      { label: '00:05', value: 0.1 },
      { label: '00:10', value: 0.2 },
      { label: '00:15', value: 0.3 },
      { label: '00:20', value: 0.4 },
      { label: '00:25', value: 0.5 },
      { label: '00:30', value: 0.6 },
      { label: '00:35', value: 0.7 },
      { label: '00:40', value: 0.8 },
      { label: '00:45', value: 0.9 },
      { label: '00:50', value: 1 },
    ]);
  });

  it('should generate correct number of marks based on adjusted maxMarks parameter', () => {
    const marks = getMarks(totalSeconds, false, undefined, max5Marks);

    expect(marks).toEqual([
      { label: '00:00', value: 0 },
      { label: '00:10', value: 0.2 },
      { label: '00:20', value: 0.4 },
      { label: '00:30', value: 0.6 },
      { label: '00:40', value: 0.8 },
      { label: '00:50', value: 1 },
    ]);
  });

  it('should generate correct number of marks if duration is less than maxMarks parameter (1 mark per second)', () => {
    const totalSeconds = 10;
    const marks = getMarks(totalSeconds, false, undefined, defaultMaxMarks);

    expect(marks).toEqual([
      { label: '00:00', value: 0 },
      { label: '00:01', value: 0.1 },
      { label: '00:02', value: 0.2 },
      { label: '00:03', value: 0.3 },
      { label: '00:04', value: 0.4 },
      { label: '00:05', value: 0.5 },
      { label: '00:06', value: 0.6 },
      { label: '00:07', value: 0.7 },
      { label: '00:08', value: 0.8 },
      { label: '00:09', value: 0.9 },
      { label: '00:10', value: 1 },
    ]);
  });

  it('should gracefully handle duration of 0 seconds', () => {
    const totalSeconds = 0;
    const marks = getMarks(totalSeconds, false, undefined, defaultMaxMarks);

    expect(marks).toEqual([{ label: '00:00', value: 0 }]);
  });

  it('should gracefully handle invalid duration of -5 seconds', () => {
    const totalSeconds = -5;
    const marks = getMarks(totalSeconds, false, undefined, defaultMaxMarks);

    expect(marks).toEqual([{ label: '00:00', value: 0 }]);
  });

  it('should generate absolute frame values when totalUnits is provided (30fps)', () => {
    const totalSeconds = 10;
    const fps = 30;
    const totalUnits = totalSeconds * fps;
    const maxMarks = 10;

    const marks = getMarks(totalSeconds, true, totalUnits, maxMarks);

    expect(marks[1]).toEqual({ label: '00:01', value: 30 });
    expect(marks[5]).toEqual({ label: '00:05', value: 150 });
    expect(marks[10]).toEqual({ label: '00:10', value: 300 });
  });

  it('should fallback to normalized 0-1 scaling if totalUnits is identical to totalSeconds', () => {
    const totalSeconds = 10;
    const totalUnits = 10;
    const marks = getMarks(totalSeconds, false, totalUnits, 10);

    expect(marks[1].value).toBe(0.1);
    expect(marks[10].value).toBe(1);
  });

  it('should handle non-standard unit scales (24fps)', () => {
    const totalSeconds = 5;
    const fps = 24;
    const totalUnits = totalSeconds * fps;
    const maxMarks = 5;

    const marks = getMarks(totalSeconds, true, totalUnits, maxMarks);

    // Each second is 24 units
    expect(marks).toContainEqual({ label: '00:01', value: 24 });
    expect(marks).toContainEqual({ label: '00:05', value: 120 });
  });

  it('should return a default mark if duration or units are 0', () => {
    expect(getMarks(0, false, undefined, 0)).toEqual([{ label: '00:00', value: 0 }]);
    expect(getMarks(-10, false, undefined, 300)).toEqual([{ label: '00:00', value: 0 }]);
  });
});

describe('isNumberTuple', () => {
  it('should return true for valid number tuples', () => {
    expect(isNumberTuple([1, 2])).toBe(true);
    expect(isNumberTuple([0, 0])).toBe(true);
    expect(isNumberTuple([-1, 1])).toBe(true);
    expect(isNumberTuple([10.5, 20.0])).toBe(true);
    expect(isNumberTuple([Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])).toBe(true);
    expect(isNumberTuple([Infinity, -Infinity])).toBe(true); // Infinity is typeof 'number'
    expect(isNumberTuple([NaN, 5])).toBe(true); // NaN is typeof 'number'
  });

  it('should return false for arrays with incorrect length', () => {
    expect(isNumberTuple([])).toBe(false);
    expect(isNumberTuple([1])).toBe(false);
    expect(isNumberTuple([1, 2, 3])).toBe(false);
    expect(isNumberTuple([1, 2, 3, 4, 5])).toBe(false);
  });

  it('should return false for arrays where the first element is not a number', () => {
    expect(isNumberTuple(['1', 2])).toBe(false);
    expect(isNumberTuple([true, 2])).toBe(false);
    expect(isNumberTuple([null, 2])).toBe(false);
    expect(isNumberTuple([undefined, 2])).toBe(false);
    expect(isNumberTuple([{}, 2])).toBe(false);
    expect(isNumberTuple([[], 2])).toBe(false);
  });

  it('should return false for arrays where the second element is not a number', () => {
    expect(isNumberTuple([1, '2'])).toBe(false);
    expect(isNumberTuple([1, false])).toBe(false);
    expect(isNumberTuple([1, null])).toBe(false);
    expect(isNumberTuple([1, undefined])).toBe(false);
    expect(isNumberTuple([1, {}])).toBe(false);
    expect(isNumberTuple([1, []])).toBe(false);
  });

  it('should return false for arrays where both elements are not numbers', () => {
    expect(isNumberTuple(['a', 'b'])).toBe(false);
    expect(isNumberTuple([true, false])).toBe(false);
    expect(isNumberTuple([null, undefined])).toBe(false);
    expect(isNumberTuple([{}, []])).toBe(false);
  });

  it('should return false for non-array inputs', () => {
    expect(isNumberTuple(123)).toBe(false);
    expect(isNumberTuple('clickEffects')).toBe(false);
    expect(isNumberTuple(true)).toBe(false);
    expect(isNumberTuple(null)).toBe(false);
    expect(isNumberTuple(undefined)).toBe(false);
    expect(isNumberTuple({})).toBe(false);
    expect(isNumberTuple(new Date())).toBe(false);
  });
});
