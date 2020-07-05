/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { Slider, Options } from '../interfaces';
import EventEmitter from '../EventEmitter/EventEmitter';
import ModelCorrection from './ModelCorrection';

class Model {
  options: Options;

  eventEmitter = new EventEmitter();

  correctOptions = new ModelCorrection();

  constructor(options: Slider) {
    this.setModelParameters(options);
  }

  update(options: Options): void {
    const newOptions = this.isValuesChanged(options);
    this.setModelParameters(newOptions);
    this.eventEmitter.notify(this.options, 'modelUpdated');
  }

  getOptions(): Options {
    return this.options;
  }

  private isValuesChanged(options: Options): Options {
    const isFirstRatioChanged = Object.keys(options).length === 1 && options.firstValueRatio;
    const isSecondRatioChanged = Object.keys(options).length === 1 && options.secondValueRatio;
    if (isFirstRatioChanged) {
      const newFirstValue = (options.firstValueRatio * this.options.scaleLength) / 100 + this.options.minValue;
      const newOptions = { ...this.options, firstValue: newFirstValue };
      return newOptions;
    }
    if (isSecondRatioChanged) {
      const newSecondValue = (options.secondValueRatio * this.options.scaleLength) / 100 + this.options.minValue;
      const newOptions = { ...this.options, secondValue: newSecondValue };
      return newOptions;
    }
    return options;
  }

  private setModelParameters(options: Slider | Options): void {
    const correctOptions = this.correctOptions.setModelParameters(options);
    this.options = this.calculateRatios(correctOptions);
  }

  private calculateRatios(options: Slider): Options {
    const {
      minValue, maxValue, firstValue, secondValue,
    } = options;
    const scaleLength = maxValue - minValue;
    const firstValueRatio = (firstValue - minValue) * (100 / scaleLength);
    const secondValueRatio = (secondValue - minValue) * (100 / scaleLength);
    const interval = (secondValueRatio - firstValueRatio) / 2;
    const firstValueArea = firstValueRatio + interval;
    return {
      ...options,
      ...{
        scaleLength, firstValueRatio, secondValueRatio, firstValueArea,
      },
    };
  }
}

export default Model;
