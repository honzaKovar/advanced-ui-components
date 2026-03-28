export interface RulerCanvasProps {
  activeRange?: [number, number];
  isUnitBased: boolean;
  testId?: string;
  totalSeconds: number;
  totalUnits?: number;
}
export interface DrawRulerProps extends RulerCanvasProps {
  canvas: HTMLCanvasElement;
  canvasHeight: number;
  canvasWidth: number;
  ctx: CanvasRenderingContext2D;
  devicePixelRatio: number;
}
