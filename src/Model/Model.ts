class Model {
  minValueScale: number;

  maxValueScale: number;

  firstValue: number;

  showSecondValue: boolean;

  secondValue: number;

  step: number;

  verticalScale: boolean;

  showBubble: boolean;

  constructor({
    minValueScale = 0,
    maxValueScale = 100,
    firstValue = 40,
    showSecondValue = false,
    secondValue = 70,
    step = 0,
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
}

export default Model;
