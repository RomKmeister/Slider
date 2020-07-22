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
      const newFirstValue = this.calculateNewValue(options.firstValueRatio);
      return { ...this.options, ...{ firstValue: newFirstValue } };
    }
    if (isSecondRatioChanged) {
      const newSecondValue = this.calculateNewValue(options.secondValueRatio);
      return { ...this.options, ...{ secondValue: newSecondValue } };
    }
    return { ...this.options, ...options };
  }

  private calculateNewValue(newValue: number): number {
    return (newValue * this.options.scaleLength) / 100 + this.options.minValue;
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
    const firstValueArea = firstValueRatio + (secondValueRatio - firstValueRatio) / 2;
    return {
      ...options,
      ...{
        scaleLength, firstValueRatio, secondValueRatio, firstValueArea,
      },
    };
  }
}

export default Model;
