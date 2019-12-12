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
    minValueScale = 0,
    maxValueScale = 100,
    firstValue = 40,
    showSecondValue = true,
    secondValue = 70,
    step = 5,
    verticalScale = false,
    showBubble = true,
  }) {
    this.minValueScale = minValueScale;
    this.maxValueScale = maxValueScale;
    this.firstValue = firstValue;
    this.showSecondValue = showSecondValue;
    this.secondValue = secondValue;
    this.step = step;
    this.verticalScale = verticalScale;
    this.showBubble = showBubble;
  }

  checkScaleBorders(): void {
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

  setMediator(mediator: Presenter): void {
    this.mediator = mediator;
  }

  updateModel(property: string, value: number | boolean): void {
    this[property] = value;
  }
}

export default Model;
