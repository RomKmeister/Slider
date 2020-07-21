import { BaseOptions, ExtendOptions } from '../interfaces';

class ModelCorrection {
  options: BaseOptions | ExtendOptions;

  setModelParameters(options: BaseOptions | ExtendOptions): BaseOptions | ExtendOptions {
    const correctStep = this.correctStep(options);
    const correctScale = this.correctRange(correctStep);
    const correctMove = this.options ? this.correctMove(correctScale) : correctScale;
    const correctConfusedValues = this.correctDisorderedValues(correctMove);
    const correctStepPosition = this.correctStepPosition(correctConfusedValues);
    this.options = this.correctMinMax(correctStepPosition);
    return this.options;
  }

  private correctStep(options: BaseOptions | ExtendOptions): BaseOptions | ExtendOptions {
    const { step } = options;
    const correctedStep = step < 1 ? 1 : step;
    return {
      ...options,
      ...{
        step: correctedStep,
      },
    };
  }

  private correctRange(options: BaseOptions | ExtendOptions): BaseOptions | ExtendOptions {
    const { step, minValue, maxValue } = options;
    const correctedMaxValue = maxValue < minValue ? (minValue + step) : maxValue;
    return {
      ...options,
      ...{
        maxValue: correctedMaxValue,
      },
    };
  }

  private correctMove(options: BaseOptions | ExtendOptions): BaseOptions | ExtendOptions {
    const {
      minValue, maxValue, firstValue, secondValue, step,
    } = options;
    let correctedFirstValue = firstValue;
    let correctedSecondValue = secondValue;
    const isValuesCanChange = this.options.maxValue - this.options.minValue > this.options.step;
    const isFirstValueChanged = options.firstValue !== this.options.firstValue;
    const isSecondValueChanged = options.secondValue !== this.options.secondValue;
    const isFirstValueNearlySecond = this.options.secondValue - options.firstValue <= this.options.step;
    const isSecondValueNearlyFirst = options.secondValue - this.options.firstValue <= this.options.step;

    const isFirstValueNeedCorrect = this.options.isSecondValueVisible && isFirstValueChanged
    && isFirstValueNearlySecond && this.options.secondValue < maxValue;

    const isIncompleteStep = this.options.isSecondValueVisible && isValuesCanChange
    && isFirstValueChanged && isFirstValueNearlySecond && this.options.secondValue >= maxValue
    && (maxValue - minValue) % step > 0;

    const isSecondValueNeedCorrect = isSecondValueChanged && isSecondValueNearlyFirst;

    if (!isValuesCanChange) {
      correctedFirstValue = minValue;
      correctedSecondValue = maxValue;
    }
    if (isFirstValueNeedCorrect) {
      correctedFirstValue = secondValue - step;
    }
    if (isIncompleteStep) {
      correctedFirstValue = secondValue - step + (maxValue % step);
    }
    if (isSecondValueNeedCorrect) {
      correctedSecondValue = firstValue + step;
    }
    return {
      ...options,
      ...{
        firstValue: correctedFirstValue, secondValue: correctedSecondValue,
      },
    };
  }

  private correctDisorderedValues(options: BaseOptions | ExtendOptions): BaseOptions | ExtendOptions {
    const {
      firstValue, secondValue, isSecondValueVisible, step,
    } = options;
    let correctedFirstValue = firstValue;
    let correctedSecondValue = secondValue;
    const isValuesDisordered = isSecondValueVisible && firstValue >= secondValue;
    const isValuesEqual = isSecondValueVisible && firstValue === secondValue;
    if (isValuesDisordered) {
      const changeValue = secondValue;
      correctedSecondValue = firstValue;
      correctedFirstValue = changeValue;
    }
    if (isValuesEqual) {
      correctedSecondValue += step;
    }
    return {
      ...options,
      ...{
        firstValue: correctedFirstValue, secondValue: correctedSecondValue,
      },
    };
  }

  private correctMinMax(options: BaseOptions | ExtendOptions): BaseOptions | ExtendOptions {
    const {
      minValue, maxValue, firstValue, secondValue, isSecondValueVisible, step,
    } = options;
    let correctedFirstValue = firstValue;
    let correctedSecondValue = secondValue;
    const isInit = isSecondValueVisible && firstValue >= maxValue && secondValue >= maxValue;
    const isValuesLowerMin = isSecondValueVisible && firstValue <= minValue && secondValue <= minValue;
    const isValuesHigherMax = this.options && isInit;
    const isSecondValueHigherMax = isSecondValueVisible && secondValue >= maxValue;
    const isFirstValueLowerMin = firstValue <= minValue;
    const isFirstValueHigherMax = isSecondValueVisible === false && firstValue >= maxValue;

    if (isInit) {
      correctedSecondValue = maxValue;
      correctedFirstValue = correctedSecondValue - ((maxValue - minValue) % step);
    }
    if (isValuesLowerMin) {
      correctedFirstValue = minValue;
      correctedSecondValue = correctedFirstValue + step;
    }
    if (isValuesHigherMax) {
      correctedSecondValue = maxValue;
      correctedFirstValue = correctedSecondValue - step;
    }
    if (isFirstValueLowerMin) {
      correctedFirstValue = minValue;
    }
    if (isFirstValueHigherMax) {
      correctedFirstValue = maxValue;
    }
    if (isSecondValueHigherMax) {
      correctedSecondValue = maxValue;
    }
    return {
      ...options,
      ...{
        firstValue: correctedFirstValue, secondValue: correctedSecondValue,
      },
    };
  }

  private correctStepPosition(options: BaseOptions | ExtendOptions): BaseOptions | ExtendOptions {
    const {
      minValue, maxValue, firstValue, secondValue, step,
    } = options;
    let correctedFirstValue = firstValue;
    let correctedSecondValue = secondValue;
    const isFirstValueEqualSteps = step >= 1 && (firstValue + minValue) % step !== 0
    && firstValue > minValue && firstValue < maxValue;
    const isSecondValueEqualSteps = step >= 1 && (secondValue - minValue) % step !== 0 && secondValue < maxValue;
    if (isFirstValueEqualSteps) {
      correctedFirstValue = Math.round(firstValue / step) * step + (minValue % step);
    }
    if (isSecondValueEqualSteps) {
      correctedSecondValue = Math.round(secondValue / step) * step + (minValue % step);
    }
    return {
      ...options,
      ...{
        firstValue: correctedFirstValue, secondValue: correctedSecondValue,
      },
    };
  }
}

export default ModelCorrection;
