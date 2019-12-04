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
}

export default Model;
