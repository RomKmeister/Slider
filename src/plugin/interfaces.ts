export interface EventEmitter {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(data?: ExtendOptions | NewCoordinate | ExternalOption, event?: string): void;
}

export interface Observer {
  update(data: ExtendOptions | NewCoordinate | ExternalOption, event: string): void;
}

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

export interface ExtendOptions extends BaseOptions {
  range: number;
  firstValueRatio: number;
  secondValueRatio: number;
  firstValueArea: number;
}

export interface NewCoordinate {
  target: string | number;
  newCoordinate: number;
}

export interface NewRatio {
  [key: string]: number;
}

export interface ExternalOption {
  [key: string]: number | boolean;
}
