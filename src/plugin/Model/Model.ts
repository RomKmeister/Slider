/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { Slider, ModelOptions } from '../interfaces';
import EventEmitter from '../EventEmitter/EventEmitter';

class Model {
  modelOptions: ModelOptions;

  eventEmitter = new EventEmitter();

  constructor(options: Slider) {
    this.setModelParameters(options);
  }

  update(options: ModelOptions): void {
    this.setModelParameters(options);
    this.eventEmitter.notify(this.modelOptions, 'modelUpdated');
  }

  private setModelParameters(options: Slider | ModelOptions): void {
    const validOptions = this.correct(options);
    this.modelOptions = this.calculateRatios(validOptions);
  }

  private calculateRatios(options: Slider): ModelOptions {
    const {
      minValue, maxValue, firstValue, secondValue,
    } = options;
    const scaleLength = maxValue - minValue;
    const firstValueRatio = (firstValue - minValue) * (100 / scaleLength);
    const secondValueRatio = (secondValue - minValue) * (100 / scaleLength);
    const interval = (secondValue - firstValue) / 2;
    const firstValueArea = firstValue + interval;
    return {
      ...options,
      ...{
        scaleLength, firstValueRatio, secondValueRatio, firstValueArea,
      },
    };
  }

  private correct(options: Slider): Slider {
    const {
      minValue, maxValue, isSecondValueVisible, step,
    } = options;
    let {
      firstValue, secondValue,
    } = options;
    const isValuesLowerMin = isSecondValueVisible && firstValue <= minValue && secondValue <= minValue;
    const isValuesHigherMax = isSecondValueVisible && firstValue >= maxValue && secondValue >= maxValue;
    const isSecondValueHigherMax = isSecondValueVisible && secondValue >= maxValue;
    const isFirstValueLowerMin = isSecondValueVisible === false && firstValue <= minValue;
    const isFirstValueHigherMax = isSecondValueVisible === false && firstValue >= maxValue;
    const isValuesConfused = isSecondValueVisible && firstValue >= secondValue;
    const isFirstValueNearly = this.modelOptions && this.modelOptions.isSecondValueVisible
    && options.firstValue !== this.modelOptions.firstValue
    && this.modelOptions.secondValue - options.firstValue <= this.modelOptions.step;
    const isSecondValueNearly = this.modelOptions && options.secondValue !== this.modelOptions.secondValue
    && options.secondValue - this.modelOptions.firstValue <= this.modelOptions.step;
    const isValuesEqualSteps = step >= 1 && (firstValue % step !== 0 || secondValue % step !== 0);

    if (isValuesLowerMin) {
      firstValue = minValue;
      secondValue = firstValue + step;
    }
    if (isValuesHigherMax) {
      secondValue = maxValue;
      firstValue = secondValue - step;
    }
    if (isValuesEqualSteps) {
      firstValue = Math.round(firstValue / step) * step + (minValue % step);
      secondValue = Math.round(secondValue / step) * step + (minValue % step);
    }
    if (isFirstValueLowerMin) {
      firstValue = minValue;
    }
    if (isFirstValueHigherMax) {
      firstValue = maxValue;
    }
    if (isSecondValueHigherMax) {
      secondValue = maxValue;
    }
    if (isFirstValueNearly) {
      firstValue = secondValue - step;
    }
    if (isSecondValueNearly) {
      secondValue = firstValue + step;
    }
    if (isValuesConfused) {
      const changeValue = secondValue;
      firstValue = secondValue;
      secondValue = changeValue + step;
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
