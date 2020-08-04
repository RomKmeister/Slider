import { BaseOptions, ExtendOptions, NewRatio } from '../interfaces';
import EventEmitter from '../EventEmitter/EventEmitter';
import ModelCorrection from './ModelCorrection';

class Model {
  options: ExtendOptions;

  eventEmitter = new EventEmitter();

  correctOptions = new ModelCorrection();

  constructor(options: BaseOptions) {
    this.getExtendOptions(options);
  }

  update(options: ExtendOptions | NewRatio): void {
    const newOptions = this.isValuesChanged(options);
    this.getExtendOptions(newOptions);
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
      return { ...this.options, firstValue: newFirstValue };
    }
    if (isSecondRatioChanged) {
      const newSecondValue = this.calculateNewValue(options.secondValueRatio);
      return { ...this.options, secondValue: newSecondValue };
    }
    return { ...this.options, ...options };
  }

  private calculateNewValue(newValue: number): number {
    return (newValue * this.options.range) / 100 + this.options.minValue;
  }

  private getExtendOptions(options: BaseOptions | ExtendOptions): void {
    const correctOptions = this.correctOptions.correctOptions(options);
    this.options = this.calculateRatios(correctOptions);
  }

  private calculateRatios(options: BaseOptions | ExtendOptions): ExtendOptions {
    const {
      minValue, maxValue, firstValue, secondValue,
    } = options;
    const range = maxValue - minValue;
    const firstValueRatio = (firstValue - minValue) * (100 / range);
    const secondValueRatio = (secondValue - minValue) * (100 / range);
    const firstValueArea = firstValueRatio + (secondValueRatio - firstValueRatio) / 2;
    return {
      ...options, range, firstValueRatio, secondValueRatio, firstValueArea,
    };
  }
}

export default Model;
