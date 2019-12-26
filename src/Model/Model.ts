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
    const saveFirstValue = this.firstValue;
    const saveSecondValue = this.secondValue;
    Object.assign(this, options);
    this.checkScaleBorders();
    this.checkHandlePosition(saveFirstValue, saveSecondValue);
  }

  private checkScaleBorders(): void {
    if (this.firstValue < this.minValueScale) {
      this.firstValue = this.minValueScale;
    }

    if (this.firstValue > this.maxValueScale) {
      this.firstValue = this.maxValueScale;
    }

    if (this.secondValue > this.maxValueScale) {
      this.secondValue = this.maxValueScale;
    }
  }

  private checkHandlePosition(saveFirstValue: number, saveSecondValue: number): void {
    if (this.showSecondValue && this.secondValue - this.firstValue <= this.step) {
      if (saveFirstValue - this.firstValue === 0) {
        this.secondValue = this.firstValue + this.step;
      }
      if (saveSecondValue - this.secondValue === 0) {
        this.firstValue = this.secondValue - this.step;
      }
    }
  }
}

export default Model;
