import BaseComponent from '../BaseComponent/BaseComponent';
import { Slider } from '../interfaces';

class Model extends BaseComponent {
  minValueScale: number;

  maxValueScale: number;

  firstValue: number;

  showSecondValue: boolean;

  secondValue: number;

  step: number;

  verticalScale: boolean;

  showBubble: boolean;

  scaleLength: number;

  firstValueRatio: number;

  secondValueRatio: number;

  interval: number;

  firstValueArea: number;

  constructor({
    minValueScale,
    maxValueScale,
    firstValue,
    showSecondValue,
    secondValue,
    step,
    verticalScale,
    showBubble,
  }: Slider) {
    super();
    this.minValueScale = minValueScale;
    this.maxValueScale = maxValueScale;
    this.firstValue = firstValue;
    this.showSecondValue = showSecondValue;
    this.secondValue = secondValue;
    this.step = step;
    this.verticalScale = verticalScale;
    this.showBubble = showBubble;
    this.calculateRatios();
    this.validate(this);
  }

  updateModel(options: Slider): void {
    const newOpt = this.validate(options);
    Object.assign(this, newOpt);
    this.calculateRatios();
  }

  private calculateRatios(): void {
    this.scaleLength = this.maxValueScale - this.minValueScale;
    this.firstValueRatio = (this.firstValue - this.minValueScale) * (100 / this.scaleLength);
    this.secondValueRatio = (this.secondValue - this.minValueScale) * (100 / this.scaleLength);
    this.interval = (this.secondValue - this.firstValue) / 2;
    this.firstValueArea = this.firstValue + this.interval;
  }

  private validate(options: Slider): Slider {
    const isFirstValueNearly = options.firstValue !== this.firstValue
    && this.secondValue - options.firstValue <= this.step;
    const isSecondValueNearly = options.secondValue !== this.secondValue
    && options.secondValue - this.firstValue <= this.step;

    if (options.firstValue < this.minValueScale) {
      options.firstValue = this.minValueScale;
    }
    if (options.firstValue > this.maxValueScale) {
      options.firstValue = this.maxValueScale;
    }
    if (options.secondValue > this.maxValueScale) {
      options.secondValue = this.maxValueScale;
    }
    if (isFirstValueNearly) {
      options.firstValue = this.secondValue - this.step;
    }
    if (isSecondValueNearly) {
      options.secondValue = this.firstValue + this.step;
    }
    return options;
  }
}

export default Model;
