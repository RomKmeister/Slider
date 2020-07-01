/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { Slider, Options } from '../interfaces';

class ModelCorrection {
  options: Options;

  correctOptions: Slider;

  constructor(options: Slider) {
    this.setModelParameters(options);
  }

  setModelParameters(options: Slider | Options): void {
    const correctStep = this.correctStep(options);
    const correctScale = this.correctScale(correctStep);
    const correctMove = this.options ? this.correctMove(correctScale) : options;
    const correctConfusedValues = this.correctConfusedValues(correctMove);
    const correctStepPosition = this.correctStepPosition(correctConfusedValues);
    this.correctOptions = this.correctMinMax(correctStepPosition);
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
    const isValuesCanChange = this.options.maxValue - this.options.minValue > this.options.step;
    const isFirstValueChanged = options.firstValue !== this.options.firstValue;
    const isSecondValueChanged = options.secondValue !== this.options.secondValue;
    const isFirstValueNearlySecond = this.options.secondValue - options.firstValue <= this.options.step;
    const isSecondValueNearlyFirst = options.secondValue - this.options.firstValue <= this.options.step;

    const isFirstValueNeedCorrect = this.options.isSecondValueVisible && isFirstValueChanged
    && isFirstValueNearlySecond && this.options.secondValue < maxValue;

    const isNeedShortStep = this.options.isSecondValueVisible && isValuesCanChange
    && isFirstValueChanged && isFirstValueNearlySecond && this.options.secondValue >= maxValue
    && (maxValue - minValue) % step > 0;

    const isSecondValueNeedCorrect = isSecondValueChanged && isSecondValueNearlyFirst;

    if (!isValuesCanChange) {
      firstValue = minValue;
      secondValue = maxValue;
    }
    if (isFirstValueNeedCorrect) {
      firstValue = secondValue - step;
    }
    if (isNeedShortStep) {
      firstValue = secondValue - step + (maxValue % step);
    }
    if (isSecondValueNeedCorrect) {
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
    const isValuesEqual = isSecondValueVisible && firstValue === secondValue;
    if (isValuesConfused) {
      const changeValue = secondValue;
      secondValue = firstValue;
      firstValue = changeValue;
    }
    if (isValuesEqual) {
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
    const isInit = isSecondValueVisible && firstValue >= maxValue && secondValue >= maxValue;
    const isValuesLowerMin = isSecondValueVisible && firstValue <= minValue && secondValue <= minValue;
    const isValuesHigherMax = this.options && isInit;
    const isSecondValueHigherMax = isSecondValueVisible && secondValue >= maxValue;
    const isFirstValueLowerMin = firstValue <= minValue;
    const isFirstValueHigherMax = isSecondValueVisible === false && firstValue >= maxValue;

    if (isInit) {
      secondValue = maxValue;
      firstValue = secondValue - ((maxValue - minValue) % step);
    }
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

export default ModelCorrection;
