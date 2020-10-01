import Model from '../Model/Model';
import View from '../View/View';
import EventEmitter from '../EventEmitter/EventEmitter';
import { ExtendedOptions } from '../interfaces';

class Presenter {
  private model: Model;

  private view: View;

  eventEmitter = new EventEmitter();

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.init();
  }

  update(data: Partial<ExtendedOptions>, event: string): void {
    const needModelUpdate = event === 'newOptions' || event === 'viewUpdated';
    if (event === 'modelUpdated') {
      this.view.setParameters(this.model.options);
    }
    if (needModelUpdate) {
      this.model.update(data);
    }
    this.eventEmitter.notify();
  }

  getOptions(): ExtendedOptions {
    return this.model.options;
  }

  setOptions(options: Partial<ExtendedOptions>): void {
    const newOptions = { ...this.model.getOptions(), ...options };
    this.update(newOptions, 'newOptions');
  }

  private init(): void {
    this.model.eventEmitter.attach(this);
    this.view.eventEmitter.attach(this);
    this.view.setParameters(this.model.options);
  }
}

export default Presenter;
