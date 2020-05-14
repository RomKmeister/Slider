/* eslint-disable no-param-reassign */

import BaseComponent from '../BaseComponent/BaseComponent';
import { Slider } from '../interfaces';
import EventEmitter from '../EventEmitter/EventEmitter';

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

  eventEmitter = new EventEmitter();

  setModelParameters(options: Slider): void {
    const newOpt = this.validate(options);
    Object.assign(this, newOpt);
    this.calculateRatios();
    this.eventEmitter.notify(this, 'modelUpdated');
  }

  private calculateRatios(): void {
    this.scaleLength = this.maxValueScale - this.minValueScale;
    this.firstValueRatio = (this.firstValue - this.minValueScale) * (100 / this.scaleLength);
    this.secondValueRatio = (this.secondValue - this.minValueScale) * (100 / this.scaleLength);
    this.interval = (this.secondValue - this.firstValue) / 2;
    this.firstValueArea = this.firstValue + this.interval;
  }

  private validate(options: Slider): Slider {
    const isFirstValueNearly = this.showSecondValue && options.firstValue !== this.firstValue
    && this.secondValue - options.firstValue <= this.step;
    const isSecondValueNearly = options.secondValue !== this.secondValue
    && options.secondValue - this.firstValue <= this.step;

    if (isFirstValueNearly) {
      options.firstValue = this.secondValue - this.step;
    }
    if (isSecondValueNearly) {
      options.secondValue = this.firstValue + this.step;
    }
    if (options.firstValue < this.minValueScale) {
      options.firstValue = this.minValueScale;
    }
    if (options.firstValue > this.maxValueScale) {
      options.firstValue = this.maxValueScale;
    }
    if (options.secondValue > this.maxValueScale) {
      options.secondValue = this.maxValueScale;
    }
    return options;
  }
}

export default Model;
