export interface EventEmitter {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(data: ModelOptions | NewOption, event: string): void;
}

export interface Observer {
  update(data: ModelOptions | NewOption, event: string): void;
}

export interface Slider {
  minValueScale: number;
  maxValueScale: number;
  firstValue: number;
  showSecondValue: boolean;
  secondValue: number;
  step: number;
  verticalScale: boolean;
  showBubble: boolean;
}

export interface ModelOptions extends Slider {
  scaleLength: number;
  firstValueRatio: number;
  secondValueRatio: number;
  firstValueArea: number;
}

export interface NewOption {
  target: string;
  newCoordinate: number;
}
