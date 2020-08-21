import { BaseOptions, ExtendedOptions, NewRatio } from '../interfaces';
import EventEmitter from '../EventEmitter/EventEmitter';
import ModelCorrection from './ModelCorrection';

class Model {
  options: ExtendedOptions;

  eventEmitter = new EventEmitter();

  correctOptions = new ModelCorrection();

  constructor(options: BaseOptions) {
    this.getExtendedOptions(options);
  }

  update(options: ExtendedOptions | NewRatio): void {
    const newOptions = this.isValuesChanged(options);
    this.getExtendedOptions(newOptions);
    this.eventEmitter.notify(this.options, 'modelUpdated');
  }

  getOptions(): ExtendedOptions {
    return this.options;
  }

  private isValuesChanged(options: ExtendedOptions | NewRatio): ExtendedOptions {
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

  private getExtendedOptions(options: BaseOptions | ExtendedOptions): void {
    const correctOptions = this.correctOptions.correctOptions(options);
    this.options = this.calculateRatios(correctOptions);
  }

  private calculateRatios(options: BaseOptions | ExtendedOptions): ExtendedOptions {
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
