import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';

class ViewScale {
  element: HTMLElement;

  model: Model;

  scale: HTMLElement;

  values: HTMLElement;

  eventEmitter: EventEmitter;

  newpars: { 'step': number, 'scaleStepsNumber': number };

  constructor(element: HTMLElement, model: Model) {
    this.element = element;
    this.model = model;
    this.init();
  }

  setDirection(): void {
    const scaleClassDirection = 'slider__scale_vertical';
    const valuesClassDirection = 'slider__values_vertical';

    if (this.model.modelOptions.isVertical) {
      this.scale.classList.add(scaleClassDirection);
      this.values.classList.add(valuesClassDirection);
    } else {
      this.scale.classList.remove(scaleClassDirection);
      this.values.classList.remove(valuesClassDirection);
    }
  }

  private init(): void {
    this.eventEmitter = new EventEmitter();
    this.findElements();
    this.bindEventListners();
    this.setBorders();
    this.createValuesItems();
  }

  private findElements(): void {
    this.scale = this.element.querySelector('.js-slider__scale');
    this.values = this.element.querySelector('.js-slider__values');
    this.minBorder = this.values.querySelector('.js-slider__step_value_min');
  }

  private bindEventListners(): void {
    this.scale.addEventListener('mousedown', this.handleScaleMouseDown.bind(this));
  }

  private handleScaleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const coordinate = this.model.modelOptions.isVertical ? event.clientY : event.clientX;
    const newOptions = { target: 'scale', newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'scaleClicked');
  }

  private handleValueMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const target = event.target;
    const coordinate = target.textContent;
    const newOptions = { target: 'value', newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'valueClicked');
  }

  setBorders() {
    this.minBorder.textContent = this.model.modelOptions.minValue;
  }

  private countScaleSteps(): newpars {
    const minValueSymbols = String(this.model.modelOptions.minValue).length;
    const maxValueSymbols = String(this.model.modelOptions.maxValue).length;
    const areaLength = this.model.modelOptions.isVertical ? this.minBorder.clientHeight : this.minBorder.clientWidth;
    if (maxValueSymbols >= minValueSymbols) {
      this.stepWidth = maxValueSymbols * areaLength / minValueSymbols;
    } else {
      this.stepWidth = areaLength;
    };
    const valuesLength = this.model.modelOptions.isVertical ? this.values.clientHeight : this.values.clientWidth;
    console.log(this.values.clientHeight);
    const MAX_SCALE_STEPS = Math.round(valuesLength / (this.stepWidth + 10));
    const { minValue, maxValue, step } = this.model.modelOptions;
    let scaleStepsNumber = Math.round((maxValue - minValue) / step);
    let parameters = {};
    parameters = { ...parameters, 'step': step };
    parameters = { ...parameters, 'scaleStepsNumber': scaleStepsNumber };
    if (scaleStepsNumber < MAX_SCALE_STEPS) {
      parameters = { ...parameters, 'step': step };
      parameters = { ...parameters, 'scaleStepsNumber': scaleStepsNumber };
    } else {
      const count = Math.round(scaleStepsNumber / (MAX_SCALE_STEPS));
      parameters = { ...parameters, 'step': step * count };
      parameters = { ...parameters, 'scaleStepsNumber': Math.round(scaleStepsNumber / count) };
    }
    
    return parameters;
  }

    private createValuesItems(): nodeValues {
    const { step, scaleStepsNumber } = this.countScaleSteps();
    const { minValue, maxValue } = this.model.modelOptions;
    const fragment = document.createDocumentFragment();
    for (let i = 1 ; i <= scaleStepsNumber; i += 1) {
      const stepElement = document.createElement('p');
      stepElement.classList.add('slider__step');
      stepElement.textContent = String(step * i + minValue);
      if(this.model.modelOptions.isVertical) {
        stepElement.style.top = `${(step * i) * (100 / this.model.modelOptions.scaleLength)}%`;
        stepElement.classList.add('slider__step_vertical');
      } else {
      stepElement.style.left = `${(step * i) * (100 / this.model.modelOptions.scaleLength)}%`;
      }
      stepElement.addEventListener('mousedown', this.handleValueMouseDown.bind(this));
      if (i === scaleStepsNumber) {
        stepElement.textContent = String(maxValue);
        if(this.model.modelOptions.isVertical) {
          stepElement.style.top = `${(maxValue - minValue ) * 100 / this.model.modelOptions.scaleLength}%`;
        } else {
          stepElement.style.left = `${(maxValue - minValue) * 100 / this.model.modelOptions.scaleLength}%`;
        }
      }
      fragment.append(stepElement);
    }
    this.values.append(fragment);
  }
}

export default ViewScale;
