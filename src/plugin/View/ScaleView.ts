import EventEmitter from '../EventEmitter/EventEmitter';

class ScaleView {
  element: HTMLElement;

  minValue: number;

  maxValue: number;

  step: number;

  isVertical: boolean;

  isScaleStepsVisible: boolean;

  scaleLength: number;

  scale: HTMLElement;

  steps: HTMLElement;

  minBorder: HTMLElement;

  eventEmitter: EventEmitter;

  constructor(element: HTMLElement) {
    this.element = element;
    this.init();
  }

  setScaleParameters(
    minValue: number,
    maxValue: number,
    step: number,
    isVertical: boolean,
    isScaleStepsVisible: boolean,
    scaleLength: number,
  ): void {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.step = step;
    this.isVertical = isVertical;
    this.isScaleStepsVisible = isScaleStepsVisible;
    this.scaleLength = scaleLength;
    this.setDirection();
    this.setVisibility();
    this.setBorders();
    this.createStepItems();
  }

  private init(): void {
    this.eventEmitter = new EventEmitter();
    this.findElements();
    this.bindEventListeners();
  }

  private findElements(): void {
    this.scale = this.element.querySelector('.js-slider__scale');
    this.steps = this.element.querySelector('.js-slider__steps');
    this.minBorder = this.steps.querySelector(':first-child');
  }

  private bindEventListeners(): void {
    this.scale.addEventListener('mousedown', this.handleScaleMouseDown.bind(this));
    window.addEventListener('resize', this.createStepItems.bind(this));
  }

  private handleScaleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const coordinate = this.isVertical ? event.clientY : event.clientX;
    const newOptions = { target: 'scale', newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'scaleClicked');
  }

  private handleStepMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const coordinate = this.isVertical ? event.clientY : event.clientX;
    const newOptions = { target: 'scale', newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'scaleClicked');
  }

  private setDirection(): void {
    const scaleDirection = 'slider__scale_vertical';
    const stepsDirection = 'slider__steps_vertical';

    if (this.isVertical) {
      this.scale.classList.add(scaleDirection);
      this.steps.classList.add(stepsDirection);
    } else {
      this.scale.classList.remove(scaleDirection);
      this.steps.classList.remove(stepsDirection);
    }
  }

  private setVisibility(): void {
    const visibility = 'slider__steps_visible';

    if (this.isScaleStepsVisible) {
      this.steps.classList.add(visibility);
    } else {
      this.steps.classList.remove(visibility);
    }
  }

  private setBorders(): void {
    this.minBorder.textContent = String(this.minValue);
  }

  private countScaleSteps(): Array<number> {
    this.findElements();
    const minValueSymbols = String(this.minValue).length;
    const maxValueSymbols = String(this.maxValue).length;
    const stepSymbolSize = this.isVertical ? this.minBorder.clientHeight : this.minBorder.clientWidth;
    const scaleLength = this.isVertical ? this.scale.clientHeight : this.scale.clientWidth;
    let stepSize = stepSymbolSize;
    if (maxValueSymbols >= minValueSymbols) {
      stepSize = (maxValueSymbols * stepSymbolSize) / minValueSymbols;
    }
    const maxStepItems = Math.round(scaleLength / (stepSize + 10));
    const stepsItemsNumber = Math.round((this.maxValue - this.minValue) / this.step);
    const count = Math.round(stepsItemsNumber / (maxStepItems));
    const stepValue = (count <= 1) ? this.step : count * this.step;
    const maxIndex = Math.round((this.maxValue - this.minValue) / stepValue);
    const steps = [];
    for (let i = 0; i < maxIndex; i += 1) {
      steps.push(i * stepValue);
    }
    steps.push(this.maxValue - this.minValue);
    return steps;
  }

  private createStepItems(): void {
    const steps = this.countScaleSteps();
    const fragment = document.createDocumentFragment();
    steps.forEach((value, index) => {
      const valueRatio = (value) * (100 / this.scaleLength);
      const stepElement = document.createElement('p');
      stepElement.classList.add('slider__step');
      const lastStepValue = (index === steps.length - 1) ? this.maxValue : (value + this.minValue);
      stepElement.textContent = String(lastStepValue);
      if (this.isVertical) {
        stepElement.style.top = `${valueRatio}%`;
        stepElement.classList.add('slider__step_vertical');
      } else {
        stepElement.style.left = `${valueRatio}%`;
      }
      stepElement.addEventListener('mousedown', this.handleStepMouseDown.bind(this));
      fragment.append(stepElement);
    });
    this.steps.innerHTML = '';
    this.steps.append(fragment);
  }
}

export default ScaleView;
