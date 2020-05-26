import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';

class ViewScale {
  element: HTMLElement;

  model: Model;

  scale: HTMLElement;

  steps: HTMLElement;

  minBorder: HTMLElement;

  eventEmitter: EventEmitter;

  constructor(element: HTMLElement, model: Model) {
    this.element = element;
    this.model = model;
    this.init();
  }

  setScaleParameters(): void {
    this.setDirection();
    this.setVisibility();
    this.setBorders();
    this.createStepItems();
  }

  private init(): void {
    this.eventEmitter = new EventEmitter();
    this.findElements();
    this.bindEventListners();
  }

  private findElements(): void {
    this.scale = this.element.querySelector('.js-slider__scale');
    this.steps = this.element.querySelector('.js-slider__steps');
    this.minBorder = this.steps.querySelector(':first-child');
  }

  private bindEventListners(): void {
    this.scale.addEventListener('mousedown', this.handleScaleMouseDown.bind(this));
    window.addEventListener('resize', this.createStepItems.bind(this));
  }

  private handleScaleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const coordinate = this.model.modelOptions.isVertical ? event.clientY : event.clientX;
    const newOptions = { target: 'scale', newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'scaleClicked');
  }

  private handleStepMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const { target } = event;
    let coordinate = 0;
    if (target instanceof HTMLElement) {
      coordinate = Number(target.textContent);
    }
    const newOptions = { target: 'value', newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'stepClicked');
  }

  private setDirection(): void {
    const scaleClassDirection = 'slider__scale_vertical';
    const stepsClassDirection = 'slider__steps_vertical';

    if (this.model.modelOptions.isVertical) {
      this.scale.classList.add(scaleClassDirection);
      this.steps.classList.add(stepsClassDirection);
    } else {
      this.scale.classList.remove(scaleClassDirection);
      this.steps.classList.remove(stepsClassDirection);
    }
  }

  private setVisibility(): void {
    const stepClassVisibility = 'slider__steps_visible';

    if (this.model.modelOptions.isScaleStepsVisible) {
      this.steps.classList.add(stepClassVisibility);
    } else {
      this.steps.classList.remove(stepClassVisibility);
    }
  }

  private setBorders(): void {
    this.minBorder.textContent = String(this.model.modelOptions.minValue);
  }

  private countScaleSteps(): Array<number> {
    this.findElements();
    const {
      minValue,
      maxValue,
      step,
      isVertical,
    } = this.model.modelOptions;
    const minValueSymbols = String(minValue).length;
    const maxValueSymbols = String(maxValue).length;
    const stepSymbolSize = isVertical ? this.minBorder.clientHeight : this.minBorder.clientWidth;
    const scaleLength = isVertical ? this.scale.clientHeight : this.scale.clientWidth;
    let stepSize = stepSymbolSize;
    if (maxValueSymbols >= minValueSymbols) {
      stepSize = (maxValueSymbols * stepSymbolSize) / minValueSymbols;
    }
    const maxStepItems = Math.round(scaleLength / (stepSize + 10));
    const stepsItemsNumber = Math.round((maxValue - minValue) / step);
    const count = Math.round(stepsItemsNumber / (maxStepItems));
    const stepValue = (count <= 1) ? step : count * step;
    const maxIndex = Math.round((maxValue - minValue) / stepValue);
    const steps = [];
    for (let i = 0; i < maxIndex; i += 1) {
      steps.push(i * stepValue);
    }
    steps.push(maxValue - minValue);
    return steps;
  }

  private createStepItems(): void {
    const {
      minValue,
      maxValue,
      isVertical,
      scaleLength,
    } = this.model.modelOptions;
    const steps = this.countScaleSteps();
    const fragment = document.createDocumentFragment();
    steps.forEach((value, index) => {
      const valueRatio = (value) * (100 / scaleLength);
      const stepElement = document.createElement('p');
      stepElement.classList.add('slider__step');
      const lastStepValue = (index === steps.length - 1) ? maxValue : (value + minValue);
      stepElement.textContent = String(lastStepValue);
      if (isVertical) {
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

export default ViewScale;
