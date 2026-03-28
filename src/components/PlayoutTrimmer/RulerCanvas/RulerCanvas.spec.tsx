import { act, cleanup, render, waitFor } from '@testing-library/react';

import { RulerCanvas } from './RulerCanvas';
import { drawRuler } from './utils';

type MockResizeObserverInstance = {
  disconnect: jest.Mock;
  observe: jest.Mock;
  unobserve: jest.Mock;
};

let resizeObserverInstance: MockResizeObserverInstance;

jest.mock('./utils', () => {
  const actualUtils = jest.requireActual('./utils');

  return {
    ...actualUtils,
    drawRuler: jest.fn(),
  };
});

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    fillStyle: '',
    scale: jest.fn(),
    setTransform: jest.fn(),
  })) as jest.Mock;

  window.ResizeObserver = jest.fn().mockImplementation(() => {
    resizeObserverInstance = {
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    };

    return resizeObserverInstance;
  });
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  Object.defineProperty(window, 'devicePixelRatio', {
    value: 1,
    writable: true,
  });
});

describe('RulerCanvas', () => {
  const initialWrapperWidth = 500;
  const initialWrapperHeight = 32;
  const initialDevicePixelRatio = 1;
  const initialActiveRange: [number, number] = [0, 1];
  const seconds = 100;
  const testId = 'canvasTestId';

  it('should render successfully', () => {
    const { baseElement } = render(<RulerCanvas isUnitBased={false} totalSeconds={seconds} />);

    expect(baseElement).toBeTruthy();
  });

  it('should render and call drawRuler with initial dimensions', async () => {
    const { baseElement } = render(<RulerCanvas isUnitBased={false} totalSeconds={seconds} activeRange={initialActiveRange} testId={testId} />);

    const canvasElement = baseElement.querySelector(`[data-testid="${testId}"]`);

    expect(canvasElement).not.toBeNull();

    const wrapperElement = canvasElement?.parentElement;

    expect(wrapperElement).not.toBeNull();

    // Set the dimensions on the wrapper
    Object.defineProperty(wrapperElement, 'offsetWidth', { configurable: true, value: initialWrapperWidth });
    Object.defineProperty(wrapperElement, 'offsetHeight', { configurable: true, value: initialWrapperHeight });

    // Trigger a resize event the component is listening for
    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => expect(drawRuler).toHaveBeenCalled());

    expect(drawRuler).toHaveBeenCalledWith(
      canvasElement,
      expect.any(Object),
      seconds,
      initialDevicePixelRatio,
      initialWrapperHeight,
      initialWrapperWidth,
      initialActiveRange,
      undefined,
    );
  });

  it('should recalculate size and redraw on wrapper dimension change (via ResizeObserver)', async () => {
    const newWrapperWidth = 600;
    const newWrapperHeight = 40;

    const { baseElement } = render(<RulerCanvas isUnitBased={false} totalSeconds={seconds} activeRange={initialActiveRange} testId={testId} />);

    const canvasElement = baseElement.querySelector(`[data-testid="${testId}"]`);

    expect(canvasElement).not.toBeNull();

    const wrapperElement = canvasElement?.parentElement;

    expect(wrapperElement).not.toBeNull();

    // Set initial dimensions
    Object.defineProperty(wrapperElement, 'offsetWidth', { configurable: true, value: initialWrapperWidth });
    Object.defineProperty(wrapperElement, 'offsetHeight', { configurable: true, value: initialWrapperHeight });

    // Trigger initial resize event
    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });

    // Wait for initial draw
    await waitFor(() => expect(drawRuler).toHaveBeenCalled());

    (drawRuler as jest.Mock).mockClear();

    // Change dimensions to simulate ResizeObserver callback
    Object.defineProperty(wrapperElement, 'offsetWidth', { configurable: true, value: newWrapperWidth });
    Object.defineProperty(wrapperElement, 'offsetHeight', { configurable: true, value: newWrapperHeight });

    // Trigger another resize event
    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });

    // Wait for drawRuler to be called with new dimensions
    await waitFor(() =>
      expect(drawRuler).toHaveBeenCalledWith(
        canvasElement,
        expect.any(Object),
        seconds,
        initialDevicePixelRatio,
        newWrapperHeight,
        newWrapperWidth,
        initialActiveRange,
        undefined,
      ),
    );
  });

  it('should recalculate size and redraw on window resize', async () => {
    const newDevicePixelRatio = 2;

    const { baseElement } = render(<RulerCanvas isUnitBased={false} totalSeconds={seconds} activeRange={initialActiveRange} testId={testId} />);

    const canvasElement = baseElement.querySelector(`[data-testid="${testId}"]`);

    expect(canvasElement).not.toBeNull();

    const wrapperElement = canvasElement?.parentElement;

    expect(wrapperElement).not.toBeNull();

    // Set the dimensions on the wrapper
    Object.defineProperty(wrapperElement, 'offsetWidth', { configurable: true, value: initialWrapperWidth });
    Object.defineProperty(wrapperElement, 'offsetHeight', { configurable: true, value: initialWrapperHeight });

    // Clear previous calls to drawRuler
    (drawRuler as jest.Mock).mockClear();

    // Simulate window.devicePixelRatio change and window resize event
    Object.defineProperty(window, 'devicePixelRatio', {
      value: newDevicePixelRatio,
      writable: true,
    });

    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });

    // Wait for drawRuler to be called with updated devicePixelRatio
    await waitFor(() =>
      expect(drawRuler).toHaveBeenCalledWith(
        canvasElement,
        expect.any(Object),
        seconds,
        newDevicePixelRatio,
        initialWrapperHeight,
        initialWrapperWidth,
        initialActiveRange,
        undefined,
      ),
    );
  });

  it('should call drawRuler when seconds prop changes', async () => {
    const newSeconds = 200;

    const { baseElement, rerender } = render(<RulerCanvas isUnitBased={false} totalSeconds={seconds} activeRange={initialActiveRange} testId={testId} />);

    const canvasElement = baseElement.querySelector(`[data-testid="${testId}"]`);

    expect(canvasElement).not.toBeNull();

    const wrapperElement = canvasElement?.parentElement;

    expect(wrapperElement).not.toBeNull();

    // Set the dimensions on the wrapper
    Object.defineProperty(wrapperElement, 'offsetWidth', { configurable: true, value: initialWrapperWidth });
    Object.defineProperty(wrapperElement, 'offsetHeight', { configurable: true, value: initialWrapperHeight });

    // Trigger initial resize event and wait for initial draw
    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });
    await waitFor(() => expect(drawRuler).toHaveBeenCalled());

    (drawRuler as jest.Mock).mockClear();

    // Rerender with new seconds value
    rerender(<RulerCanvas isUnitBased={false} totalSeconds={newSeconds} activeRange={initialActiveRange} testId={testId} />);

    // Wait for drawRuler to be called with new seconds value
    await waitFor(() =>
      expect(drawRuler).toHaveBeenCalledWith(
        canvasElement,
        expect.any(Object),
        newSeconds,
        expect.any(Number),
        initialWrapperHeight,
        initialWrapperWidth,
        initialActiveRange,
        undefined,
      ),
    );
  });

  it('should call drawRuler when activeRange prop changes', async () => {
    const newActiveRange: [number, number] = [0.2, 0.8];

    const { baseElement, rerender } = render(<RulerCanvas isUnitBased={false} totalSeconds={seconds} activeRange={initialActiveRange} testId={testId} />);

    const canvasElement = baseElement.querySelector(`[data-testid="${testId}"]`);

    expect(canvasElement).not.toBeNull();

    const wrapperElement = canvasElement?.parentElement;

    expect(wrapperElement).not.toBeNull();

    // Set the dimensions on the wrapper
    Object.defineProperty(wrapperElement, 'offsetWidth', { configurable: true, value: initialWrapperWidth });
    Object.defineProperty(wrapperElement, 'offsetHeight', { configurable: true, value: initialWrapperHeight });

    // Trigger initial resize event and wait for initial draw
    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });
    await waitFor(() => expect(drawRuler).toHaveBeenCalled());

    (drawRuler as jest.Mock).mockClear();

    // Rerender with new activeRange value
    rerender(<RulerCanvas isUnitBased={false} totalSeconds={seconds} activeRange={newActiveRange} testId={testId} />);

    // Wait for drawRuler to be called with new activeRange value
    await waitFor(() =>
      expect(drawRuler).toHaveBeenCalledWith(
        canvasElement,
        expect.any(Object),
        expect.any(Number),
        expect.any(Number),
        initialWrapperHeight,
        initialWrapperWidth,
        newActiveRange,
        undefined,
      ),
    );
  });

  it('should clean up event listener and observer on unmount', () => {
    const abortControllerAbortSpy = jest.spyOn(global.AbortController.prototype, 'abort');

    const { baseElement, unmount } = render(<RulerCanvas isUnitBased={false} totalSeconds={seconds} activeRange={initialActiveRange} testId={testId} />);

    const canvasElement = baseElement.querySelector(`[data-testid="${testId}"]`);

    expect(canvasElement).not.toBeNull();

    const wrapperElement = canvasElement?.parentElement;

    expect(wrapperElement).not.toBeNull();

    Object.defineProperty(wrapperElement, 'offsetWidth', { configurable: true, value: initialWrapperWidth });
    Object.defineProperty(wrapperElement, 'offsetHeight', { configurable: true, value: initialWrapperHeight });

    unmount();

    expect(abortControllerAbortSpy).toHaveBeenCalledTimes(1);
    expect(resizeObserverInstance.unobserve).toHaveBeenCalledWith(wrapperElement);
    expect(resizeObserverInstance.disconnect).toHaveBeenCalledTimes(1);
  });

  it('should log a warning if canvas or context are not ready', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');

    render(<RulerCanvas isUnitBased={false} totalSeconds={seconds} />);

    expect(consoleWarnSpy).toHaveBeenCalledWith('Canvas or context not ready for drawing, or dimensions are zero.');
    expect(drawRuler).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });

  it('should call drawRuler with totalUnits when provided', async () => {
    const totalUnits = 3000; // e.g., 100 seconds * 30fps

    const { baseElement } = render(<RulerCanvas isUnitBased totalSeconds={seconds} totalUnits={totalUnits} testId={testId} />);

    const canvasElement = baseElement.querySelector(`[data-testid="${testId}"]`);
    const wrapperElement = canvasElement?.parentElement as HTMLElement;

    Object.defineProperty(wrapperElement, 'offsetWidth', { configurable: true, value: initialWrapperWidth });
    Object.defineProperty(wrapperElement, 'offsetHeight', { configurable: true, value: initialWrapperHeight });

    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() =>
      expect(drawRuler).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        seconds,
        expect.any(Number),
        initialWrapperHeight,
        initialWrapperWidth,
        undefined,
        totalUnits,
      ),
    );
  });
});
