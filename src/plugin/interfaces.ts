export interface EventEmitter {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(data?: Options | NewOption | ExternalOption, event?: string): void;
}

export interface Observer {
  update(data: Options | NewOption | ExternalOption, event: string): void;
}

export interface Slider {
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

export interface Options extends Slider {
  scaleLength: number;
  firstValueRatio: number;
  secondValueRatio: number;
  firstValueArea: number;
}

export interface NewOption {
  target: string;
  newCoordinate: number;
}

export interface ExternalOption {
  [key: string]: number | boolean;
}
