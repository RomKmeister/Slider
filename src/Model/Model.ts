import Presenter from '../Presenter/Presenter';

class Model {
  minValueScale: number;

  maxValueScale: number;

  firstValue: number;

  showSecondValue: boolean;

  secondValue: number;

  step: number;

  verticalScale: boolean;

  showBubble: boolean;

  mediator: Presenter;

  constructor({
    minValueScale,
    maxValueScale,
    firstValue,
    showSecondValue,
    secondValue,
    step,
    verticalScale,
    showBubble,
  }: any) {
    this.minValueScale = minValueScale;
    this.maxValueScale = maxValueScale;
    this.firstValue = firstValue;
    this.showSecondValue = showSecondValue;
    this.secondValue = secondValue;
    this.step = step;
    this.verticalScale = verticalScale;
    this.showBubble = showBubble;
  }

  setMediator(mediator: Presenter): void {
    this.mediator = mediator;
  }

  updateModel(options: any): void {
    Object.assign(this, this.validate(options));
  }

  private validate(newValue: any): any {
    const isValueUnvalidate = Object.prototype.hasOwnProperty.call(newValue, 'firstValue')
    || Object.prototype.hasOwnProperty.call(newValue, 'secondValue');
    if (isValueUnvalidate) {
      const validBorders = this.checkScaleBorders(newValue);
      const validNewValue = this.showSecondValue ? this.checkHandlePosition(validBorders) : validBorders;
      return validNewValue;
    }
    return newValue;
  }

  private checkScaleBorders(newValue: any): any {
    if (newValue.firstValue < this.minValueScale) {
      return this.minValueScale;
    }
    if (newValue.firstValue > this.maxValueScale) {
      return this.maxValueScale;
    }
    if (newValue.secondValue > this.maxValueScale) {
      return this.maxValueScale;
    }
    return newValue;
  }

  private checkHandlePosition(update: any): any {
    const isFirstValueNearly = Object.prototype.hasOwnProperty.call(update, 'firstValue')
    && this.secondValue - update.firstValue <= this.step;
    const isSecondValueNearly = Object.prototype.hasOwnProperty.call(update, 'secondValue')
    && update.secondValue - this.firstValue <= this.step;

    if (isFirstValueNearly) {
      const updatedValue = {} as any;
      updatedValue.firstValue = this.secondValue - this.step;
      return updatedValue;
    }
    if (isSecondValueNearly) {
      const updatedValue = {} as any;
      updatedValue.secondValue = this.firstValue + this.step;
      return updatedValue;
    }
    return update;
  }
}

export default Model;
