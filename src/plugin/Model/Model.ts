/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { Slider, Options } from '../interfaces';
import EventEmitter from '../EventEmitter/EventEmitter';
import ModelCorrection from './ModelCorrection';

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
    const correctOptions = new ModelCorrection(options).correctOptions;
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
}

export default Model;
