/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { Slider, ModelOptions } from '../interfaces';
import EventEmitter from '../EventEmitter/EventEmitter';

class Model {
  options: Slider;

  modelOptions: ModelOptions;

  eventEmitter = new EventEmitter();

  constructor(options: Slider) {
    this.setModelParameters(options);
  }

  update(options: ModelOptions): void {
    this.setModelParameters(options);
    this.eventEmitter.notify(this, 'modelUpdated');
  }

  private setModelParameters(options: Slider | ModelOptions): void {
    const validOptions = this.validate(options);
    this.modelOptions = this.calculateRatios(validOptions);
  }

  private calculateRatios(options: Slider): ModelOptions {
    const {
      minValueScale, maxValueScale, firstValue, secondValue,
    } = options;
    const scaleLength = maxValueScale - minValueScale;
    const firstValueRatio = (firstValue - minValueScale) * (100 / scaleLength);
    const secondValueRatio = (secondValue - minValueScale) * (100 / scaleLength);
    const interval = (secondValue - firstValue) / 2;
    const firstValueArea = firstValue + interval;
    return {
      ...options,
      ...{
        scaleLength, firstValueRatio, secondValueRatio, firstValueArea,
      },
    };
  }

  private validate(options: Slider): Slider {
    const {
      minValueScale, maxValueScale, showSecondValue, step,
    } = options;
    let {
      firstValue, secondValue,
    } = options;
    const isValuesLowerMin = showSecondValue && firstValue <= minValueScale && secondValue <= minValueScale;
    const isValuesHigherMax = showSecondValue && firstValue >= maxValueScale && secondValue >= maxValueScale;
    const isSecondValueHigherMax = showSecondValue && secondValue > maxValueScale;
    const isFirstValueLowerMin = firstValue <= minValueScale;
    const isFirstValueHigherMax = firstValue >= maxValueScale;
    const isValuesConfused = showSecondValue && firstValue >= secondValue;
    const isFirstValueNearly = this.modelOptions && this.modelOptions.showSecondValue
    && options.firstValue !== this.modelOptions.firstValue
    && this.modelOptions.secondValue - options.firstValue <= this.modelOptions.step;
    const isSecondValueNearly = this.modelOptions && options.secondValue !== this.modelOptions.secondValue
    && options.secondValue - this.modelOptions.firstValue <= this.modelOptions.step;

    if (isValuesLowerMin) {
      firstValue = minValueScale;
      secondValue = firstValue + step;
    }
    if (isValuesHigherMax) {
      secondValue = maxValueScale;
      firstValue = secondValue - step;
    }
    if (isFirstValueLowerMin) {
      firstValue = minValueScale;
    }
    if (isFirstValueHigherMax) {
      firstValue = maxValueScale;
    }
    if (isSecondValueHigherMax) {
      secondValue = maxValueScale;
    }
    if (isFirstValueNearly) {
      firstValue = secondValue - step;
    }
    if (isSecondValueNearly) {
      secondValue = firstValue + step;
    }
    if (isValuesConfused) {
      const changeValue = secondValue;
      firstValue = secondValue - step;
      secondValue = changeValue;
    }
    return {
      ...options,
      ...{
        firstValue, secondValue,
      },
    };
  }
}

export default Model;
