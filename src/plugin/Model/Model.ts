/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { BaseOptions, ExtendOptions, NewRatio } from '../interfaces';
import EventEmitter from '../EventEmitter/EventEmitter';
import ModelCorrection from './ModelCorrection';

class Model {
  options: ExtendOptions;

  eventEmitter = new EventEmitter();

  correctOptions = new ModelCorrection();

  constructor(options: BaseOptions) {
    this.setModelParameters(options);
  }

  update(options: ExtendOptions | NewRatio): void {
    const newOptions = this.isValuesChanged(options);
    this.setModelParameters(newOptions);
    this.eventEmitter.notify(this.options, 'modelUpdated');
  }

  getOptions(): ExtendOptions {
    return this.options;
  }

  private isValuesChanged(options: ExtendOptions | NewRatio): ExtendOptions {
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
    return { ...this.options, ...options };
  }

  private setModelParameters(options: BaseOptions | ExtendOptions): void {
    const correctOptions = this.correctOptions.setModelParameters(options);
    this.options = this.calculateRatios(correctOptions);
  }

  private calculateRatios(options: BaseOptions | ExtendOptions): ExtendOptions {
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
