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

  update(options: ModelOptions | Slider): void {
    this.setModelParameters(options);
    this.eventEmitter.notify(this.modelOptions, 'modelUpdated');
  }

  private setModelParameters(options: Slider | ModelOptions): void {
    const correctMove = this.correctMove(options);
    const correctConfusedValues = this.correctConfusedValues(correctMove);
    const correctMinMax = this.correctMinMax(correctConfusedValues);
    const correctOptions = this.correctStepPosition(correctMinMax);
    this.modelOptions = this.calculateRatios(correctOptions);
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

  private correctMove(options: Slider): Slider {
    const { step } = options;
    let {
      firstValue, secondValue,
    } = options;
    const isFirstValueNearly = this.modelOptions && this.modelOptions.isSecondValueVisible
    && options.firstValue !== this.modelOptions.firstValue
    && this.modelOptions.secondValue - options.firstValue <= this.modelOptions.step;
    const isSecondValueNearly = this.modelOptions && options.secondValue !== this.modelOptions.secondValue
    && options.secondValue - this.modelOptions.firstValue <= this.modelOptions.step;
    if (isFirstValueNearly) {
      firstValue = secondValue - step;
    }
    if (isSecondValueNearly) {
      secondValue = firstValue + step;
    }
    return {
      ...options,
      ...{
        firstValue, secondValue,
      },
    };
  }

  private correctConfusedValues(options: Slider): Slider {
    const {
      isSecondValueVisible, step,
    } = options;
    let {
      firstValue, secondValue,
    } = options;
    const isValuesConfused = isSecondValueVisible && firstValue >= secondValue;
    if (isValuesConfused) {
      const changeValue = secondValue;
      secondValue = firstValue;
      firstValue = changeValue;
    }
    if (firstValue === secondValue) {
      secondValue += step;
    }
    return {
      ...options,
      ...{
        firstValue, secondValue,
      },
    };
  }

  private correctMinMax(options: Slider): Slider {
    const {
      minValue, maxValue, isSecondValueVisible, step,
    } = options;
    let {
      firstValue, secondValue,
    } = options;
    const isValuesLowerMin = isSecondValueVisible && firstValue <= minValue && secondValue <= minValue;
    const isValuesHigherMax = isSecondValueVisible && firstValue >= maxValue && secondValue >= maxValue;
    const isSecondValueHigherMax = isSecondValueVisible && secondValue >= maxValue;
    const isFirstValueLowerMin = firstValue <= minValue;
    const isFirstValueHigherMax = isSecondValueVisible === false && firstValue >= maxValue;

    if (isValuesLowerMin) {
      firstValue = minValue;
      secondValue = firstValue + step;
    }
    if (isValuesHigherMax) {
      secondValue = maxValue;
      firstValue = secondValue - step;
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
    return {
      ...options,
      ...{
        firstValue, secondValue,
      },
    };
  }

  private correctStepPosition(options: Slider): Slider {
    const {
      minValue, maxValue, step,
    } = options;
    let {
      firstValue, secondValue,
    } = options;
    const isFirstValueEqualSteps = step >= 1 && firstValue % step !== 0 && firstValue > minValue && firstValue < maxValue;
    const isSecondValueEqualSteps = step >= 1 && secondValue % step !== 0 && secondValue < maxValue;
    if (isFirstValueEqualSteps) {
      firstValue = Math.round(firstValue / step) * step + (minValue % step);
    }
    if (isSecondValueEqualSteps) {
      secondValue = Math.round(secondValue / step) * step + (minValue % step);
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
