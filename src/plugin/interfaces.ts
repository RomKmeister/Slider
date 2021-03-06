export interface BaseOptions {
  minValue: number;
  maxValue: number;
  firstValue: number;
  isSecondValueVisible: boolean;
  secondValue: number;
  step: number;
  isVertical: boolean;
  isBubbleVisible: boolean;
  isScaleStepsVisible: boolean;
}

export interface ExtendedOptions extends BaseOptions {
  range: number;
  firstValueRatio: number;
  secondValueRatio: number;
  firstValueArea: number;
}

export interface NewCoordinate {
  target: string | number;
  coordinate: number;
}
