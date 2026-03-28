import * as utils from './utils';

const { drawRuler, getRulerConfig } = utils;

describe('getRulerConfig', () => {
  it.each`
    seconds | expectedValue
    ${2}    | ${{ majorEvery: 5, step: 1 }}
    ${5}    | ${{ majorEvery: 5, step: 1 }}
    ${11}   | ${{ majorEvery: 5, step: 1 }}
    ${25}   | ${{ majorEvery: 5, step: 1 }}
    ${27}   | ${{ majorEvery: 10, step: 2 }}
    ${60}   | ${{ majorEvery: 5, step: 1 }}
    ${120}  | ${{ majorEvery: 10, step: 2 }}
    ${180}  | ${{ majorEvery: 15, step: 3 }}
    ${3600} | ${{ majorEvery: 300, step: 60 }}
  `('should return correct config for $seconds seconds', ({ expectedValue, seconds }) => {
    const config = getRulerConfig(seconds);

    expect(config).toEqual(expectedValue);
  });
});

describe('drawRuler', () => {
  let mockCanvas: HTMLCanvasElement;
  let mockCtx: CanvasRenderingContext2D;
  let getRulerConfigSpy: jest.SpyInstance;

  beforeEach(() => {
    mockCanvas = {
      getContext: jest.fn().mockReturnValue({}),
      height: 0,
      style: {
        height: '',
        width: '',
      },
      width: 0,
    } as unknown as HTMLCanvasElement;

    mockCtx = {
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      fillStyle: '',
      scale: jest.fn(),
      setTransform: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    getRulerConfigSpy = jest.spyOn(utils, 'getRulerConfig');
    getRulerConfigSpy.mockReturnValue({ majorEvery: 5, step: 1 });
  });

  afterEach(() => {
    getRulerConfigSpy.mockClear();
    getRulerConfigSpy.mockRestore();
  });

  it('should set canvas dimensions and draw bars correctly', () => {
    const totalSeconds = 60;
    const devicePixelRatio = 1;
    const canvasHeight = 32;
    const canvasWidth = 600;
    const activeRange: [number, number] = [0.2, 1];

    drawRuler({ canvas: mockCanvas, ctx: mockCtx, totalSeconds, devicePixelRatio, canvasHeight, canvasWidth, activeRange, isUnitBased: false });

    expect(mockCanvas.width).toBe(canvasWidth * devicePixelRatio);
    expect(mockCanvas.height).toBe(canvasHeight * devicePixelRatio);
    expect(mockCtx.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
    expect(mockCtx.scale).toHaveBeenCalledWith(devicePixelRatio, devicePixelRatio);
    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, canvasWidth, canvasHeight);
    expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, canvasWidth, canvasHeight);

    // Loop runs for timePosition = 0, 1, ..., 60 (61 times)
    // Total fillRect calls: 1 (background) + 61 (bars) = 62
    expect(mockCtx.fillRect).toHaveBeenCalledTimes(62);
  });
});
