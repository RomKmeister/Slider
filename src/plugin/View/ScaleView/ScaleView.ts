import EventEmitter from '../../EventEmitter/EventEmitter';
import { Parameters } from './ScaleViewInterfaces';

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

  setParameters({
    minValue,
    maxValue,
    step,
    isVertical,
    isScaleStepsVisible,
    range,
  }: Parameters): void {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.step = step;
    this.isVertical = isVertical;
    this.isScaleStepsVisible = isScaleStepsVisible;
    this.scaleLength = range;
    this.setDirection();
    this.setSteps();
  }

  private init(): void {
    this.eventEmitter = new EventEmitter();
    this.findElement();
    this.bindEventListeners();
  }

  private findElement(): void {
    this.scale = this.element.querySelector('.js-slider__scale');
  }

  private createScaleSteps(): void {
    this.steps = document.createElement('div');
    if (this.isVertical) {
      this.steps.classList.add('slider__steps');
      this.steps.classList.add('slider__steps_vertical');
    } else {
      this.steps.classList.add('slider__steps');
    }
    this.steps.insertAdjacentHTML('afterbegin', '<div class="slider__step"></div>');
    this.scale.after(this.steps);
  }

  private bindEventListeners(): void {
    this.scale.addEventListener('mousedown', this.handleScaleMouseDown);
    window.addEventListener('resize', this.handleStepsResize);
  }

  private handleScaleMouseDown = (event: MouseEvent): void => {
    this.updateCoordinate(event);
  }

  private handleStepMouseDown(event: MouseEvent): void {
    this.updateCoordinate(event);
  }

  private handleStepsResize = (): void => this.setSteps();

  private updateCoordinate(event: MouseEvent): void {
    event.preventDefault();
    const coordinate = this.isVertical ? event.clientY : event.clientX;
    const newCoordinate = { target: 'scale', coordinate };
    this.eventEmitter.notify(newCoordinate, 'scaleClicked');
  }

  private setDirection(): void {
    const scaleDirection = 'slider__scale_vertical';
    if (this.isVertical) {
      this.scale.classList.add(scaleDirection);
    } else {
      this.scale.classList.remove(scaleDirection);
    }
  }

  private setSteps(): void {
    if (this.steps) {
      this.steps.remove();
    }
    if (this.isScaleStepsVisible) {
      this.createScaleSteps();
      this.setBorder();
      this.createStepItems();
    }
  }

  private findMinBorder(): void {
    this.minBorder = this.steps.querySelector(':first-child');
  }

  private setBorder(): void {
    this.findMinBorder();
    this.minBorder.textContent = String(this.minValue);
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

  private countScaleSteps(): Array<number> {
    this.setBorder();
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
}

export default ScaleView;
