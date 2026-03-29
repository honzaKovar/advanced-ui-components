import { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

import { sliderBaseHeight } from '../../constants';

import { canvasStyle, canvasWrapperSx } from './styles';
import { RulerCanvasProps } from './types';
import { drawRuler } from './utils';

export const RulerCanvas = ({ activeRange, isUnitBased, testId, totalSeconds, totalUnits }: RulerCanvasProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [{ height: canvasHeight, width: canvasWidth }, setCanvasSize] = useState({ height: sliderBaseHeight, width: 0 });
  const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio || 1);

  const recalculateSize = useCallback(({ offsetHeight: wrapperOffsetHeight, offsetWidth: wrapperOffsetWidth }: HTMLDivElement) => {
    setCanvasSize((prev) => {
      if (prev.height !== wrapperOffsetHeight || prev.width !== wrapperOffsetWidth) {
        return {
          height: Math.round(wrapperOffsetHeight),
          width: Math.round(wrapperOffsetWidth),
        };
      }

      return prev;
    });

    setDevicePixelRatio(window.devicePixelRatio || 1);
  }, []);

  // This observes changes in the wrapper element's size and the browser window's resize event
  // to keep the canvas dimensions updated and the resolution sharp.
  useEffect(() => {
    const wrapperElement = wrapperRef.current;

    if (!wrapperElement) {
      return;
    }

    recalculateSize(wrapperElement);

    const resizeObserver = new ResizeObserver((entries) => {
      const { height, width } = entries[0].contentRect;

      setCanvasSize((prev) => {
        if (prev.height !== Math.round(height) || prev.width !== Math.round(width)) {
          return {
            height: Math.round(height) || sliderBaseHeight,
            width: Math.round(width),
          };
        }

        return prev;
      });
    });

    resizeObserver.observe(wrapperElement);

    const controller = new AbortController();
    const signal = controller.signal;

    window.addEventListener('resize', () => recalculateSize(wrapperElement), {
      signal,
    });

    return () => {
      resizeObserver.unobserve(wrapperElement);
      resizeObserver.disconnect();
      controller.abort();
    };
  }, [recalculateSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx || canvasWidth <= 0 || canvasHeight <= 0) {
      console.warn('Canvas or context not ready for drawing, or dimensions are zero.');

      return;
    }

    drawRuler({
      activeRange,
      canvas,
      canvasHeight,
      canvasWidth,
      ctx,
      devicePixelRatio,
      isUnitBased,
      totalSeconds,
      totalUnits,
    });
  }, [totalSeconds, totalUnits, activeRange, canvasWidth, canvasHeight, devicePixelRatio, isUnitBased]);

  return (
    <Box ref={wrapperRef} sx={canvasWrapperSx}>
      <canvas ref={canvasRef} style={canvasStyle} data-testid={testId} />
    </Box>
  );
};
