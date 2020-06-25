/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { Slider, Options } from '../interfaces';
import EventEmitter from '../EventEmitter/EventEmitter';

class Model {
  options: Options;

  eventEmitter = new EventEmitter();

  constructor(options: Slider) {
    this.setModelParameters(options);
  }

  update(options: Options | Slider): void {
    this.setModelParameters(options);
    this.eventEmitter.notify(this.options, 'modelUpdated');
  }

  getOptions(): Options {
    return this.options;
  }

  private setModelParameters(options: Slider | Options): void {
    const correctStep = this.correctStep(options);
    const correctScale = this.correctScale(correctStep);
    const correctMove = this.correctMove(correctScale);
    const correctConfusedValues = this.correctConfusedValues(correctMove);
    const correctStepPosition = this.correctStepPosition(correctConfusedValues);
    const correctOptions = this.correctMinMax(correctStepPosition);
    this.options = this.calculateRatios(correctOptions);
  }

  private calculateRatios(options: Slider): Options {
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

  private correctStep(options: Slider): Slider {
    let { step } = options;
    if (step < 1) {
      step = 1;
    }
    return {
      ...options,
      ...{
        step,
      },
    };
  }

  private correctScale(options: Slider): Slider {
    const { step, maxValue } = options;
    let { minValue } = options;
    if (maxValue < minValue) {
      minValue = maxValue - step;
    }
    return {
      ...options,
      ...{
        minValue,
      },
    };
  }

  private correctMove(options: Slider): Slider {
    const { minValue, maxValue, step } = options;
    let {
      firstValue, secondValue,
    } = options;
    const isScaleLong = Math.round((maxValue - minValue) / step) > 1;
    const isFirstValueNearly = this.options && this.options.isSecondValueVisible
    && options.firstValue !== this.options.firstValue
    && this.options.secondValue - options.firstValue <= this.options.step && isScaleLong;
    const isSecondValueNearly = this.options && options.secondValue !== this.options.secondValue
    && options.secondValue - this.options.firstValue <= this.options.step && isScaleLong;
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
      firstValue = secondValue - ((maxValue - minValue) % step);
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
    const isFirstValueEqualSteps = step >= 1 && (firstValue + minValue) % step !== 0
    && firstValue > minValue && firstValue < maxValue;
    const isSecondValueEqualSteps = step >= 1 && (secondValue - minValue) % step !== 0 && secondValue < maxValue;
    if (isFirstValueEqualSteps) {
      firstValue = Math.floor(firstValue / step) * step + (minValue % step);
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
