import BaseComponent from '../BaseComponent/BaseComponent';
import { Slider, NewValue } from '../interfaces';

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
  }

  calculateRatios(): void {
    this.scaleLength = this.maxValueScale - this.minValueScale;
    this.firstValueRatio = (this.firstValue - this.minValueScale) * (100 / this.scaleLength);
    this.secondValueRatio = (this.secondValue - this.minValueScale) * (100 / this.scaleLength);
    this.interval = (this.secondValue - this.firstValue) / 2;
    this.firstValueArea = this.firstValue + this.interval;
  }

  updateModel(options: NewValue): void {
    Object.assign(this, this.validate(options));
    this.calculateRatios();
  }

  private validate(newValue: NewValue): NewValue {
    const isValueUnvalidate = Object.prototype.hasOwnProperty.call(newValue, 'firstValue')
    || Object.prototype.hasOwnProperty.call(newValue, 'secondValue');
    if (isValueUnvalidate) {
      const validBorders = this.checkScaleBorders(newValue);
      const validNewValue = this.showSecondValue ? this.checkHandlePosition(validBorders) : validBorders;
      return validNewValue;
    }
    return newValue;
  }

  private checkScaleBorders(newValue: NewValue): NewValue {
    if (newValue.firstValue < this.minValueScale) {
      return { firstValue: this.minValueScale };
    }
    if (newValue.firstValue > this.maxValueScale) {
      return { firstValue: this.maxValueScale };
    }
    if (newValue.secondValue > this.maxValueScale) {
      return { secondValue: this.maxValueScale };
    }
    return newValue;
  }

  private checkHandlePosition(update: NewValue): NewValue {
    const isFirstValueNearly = Object.prototype.hasOwnProperty.call(update, 'firstValue')
    && this.secondValue - update.firstValue <= this.step;
    const isSecondValueNearly = Object.prototype.hasOwnProperty.call(update, 'secondValue')
    && update.secondValue - this.firstValue <= this.step;

    if (isFirstValueNearly) {
      const updatedValue: NewValue = {};
      updatedValue.firstValue = this.secondValue - this.step;
      return updatedValue;
    }
    if (isSecondValueNearly) {
      const updatedValue: NewValue = {};
      updatedValue.secondValue = this.firstValue + this.step;
      return updatedValue;
    }
    return update;
  }
}

export default Model;
