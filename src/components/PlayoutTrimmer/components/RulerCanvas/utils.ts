/* eslint-disable id-length */
import { defaultActiveRange, majorBarsIdealIntervalSeconds, maxMarksCount, minMajorBarsCount, preferredIntervalsInSeconds } from '../../constants';

import { activeBarColor, inactiveBarColor, majorBarHeight, minorBarHeight } from './constants';
import { DrawRulerProps } from './types';

export const getRulerConfig = (seconds: number): { majorEvery: number; step: number } => {
  const maxMajorBarsCount = Math.min(maxMarksCount, Math.max(minMajorBarsCount, Math.floor(seconds / majorBarsIdealIntervalSeconds)));

  // --- Calculate the major interval for ruler bars ---

  // Find the smallest preferred interval that keeps the bar count within limits.
  let majorInterval = preferredIntervalsInSeconds.find((interval) => seconds / interval <= maxMajorBarsCount) ?? Math.ceil(seconds / maxMajorBarsCount); // Fallback if no preferred interval fits.

  // Adjust major interval to snap to a preferred multiple of 5 from candidates.
  const nextCleanInterval = preferredIntervalsInSeconds.find((candidate) => candidate >= majorInterval && candidate % 5 === 0);

  if (nextCleanInterval !== undefined) {
    majorInterval = nextCleanInterval;
  }

  // --- Calculate the minor interval for finer granularity ticks ---

  // Prioritize larger divisors (5, 3, 2, 1) for clean minor ticks.
  const possibleDivisors = [5, 3, 2, 1];
  let minorInterval = 1;

  for (const divisor of possibleDivisors) {
    if (majorInterval % divisor === 0) {
      minorInterval = majorInterval / divisor;
      break;
    }
  }

  // --- Determine the overall step size for drawing all ticks (major and minor) ---
  const step = minorInterval >= 1 ? minorInterval : 1;

  return {
    majorEvery: majorInterval,
    step,
  };
};

// eslint-disable-next-line max-statements
export const drawRuler = ({ activeRange, canvas, canvasHeight, canvasWidth, ctx, devicePixelRatio, isUnitBased, totalSeconds, totalUnits }: DrawRulerProps) => {
  // Set the canvas's internal drawing dimensions (physical pixels)
  // to account for device pixel ratio (e.g., Retina displays) for sharpness.
  canvas.width = canvasWidth * devicePixelRatio;
  canvas.height = canvasHeight * devicePixelRatio;

  // Set the canvas's displayed CSS dimensions.
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  // Reset and apply scaling to the drawing context.
  // All subsequent drawing commands will be scaled by the devicePixelRatio,
  // allowing drawing logic to remain in CSS pixel units.
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(devicePixelRatio, devicePixelRatio);

  // Clear the entire canvas and set a transparent background.
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const { majorEvery, step } = getRulerConfig(totalSeconds);
  // Calculate pixels per second based on the canvas's CSS width.
  const pixelsPerSecond = canvasWidth / totalSeconds;

  // Determine the active range for coloring segments.
  const [rangeStart, rangeEnd] = activeRange ?? defaultActiveRange;

  const effectiveTotalUnits = totalUnits ?? totalSeconds;
  const unitsPerSecond = effectiveTotalUnits / totalSeconds;

  // Loop through time (in seconds) to draw each ruler bar.
  for (let timePosition = 0; timePosition <= totalSeconds; timePosition += step) {
    // Calculate the x-coordinate for the current timePosition.
    let x = Math.round(timePosition * pixelsPerSecond);

    // Adjust the x-coordinate for the very last tick mark.
    // If timePosition is at the end of the timeline and 'x' lands exactly on the canvas edge,
    // shift it one pixel left to ensure it's visible within the canvas boundary.
    if (timePosition === totalSeconds && x === canvasWidth) {
      x = canvasWidth - 1;
    }

    // Determine if the current tick is a major tick and set its height accordingly.
    const isMajor = timePosition % majorEvery === 0;
    const lineHeight = isMajor ? majorBarHeight : minorBarHeight;
    const verticalLineStartPosition = (canvasHeight - lineHeight) / 2;

    const normalizedPosition = isUnitBased ? timePosition * unitsPerSecond : timePosition / totalSeconds;

    ctx.fillStyle = normalizedPosition >= rangeStart && normalizedPosition <= rangeEnd ? activeBarColor : inactiveBarColor;

    ctx.fillRect(x, verticalLineStartPosition, 1, lineHeight);
  }
};
