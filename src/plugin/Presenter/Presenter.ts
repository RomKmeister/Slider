import Model from '../Model/Model';
import View from '../View/View';
import EventEmitter from '../EventEmitter/EventEmitter';
import { ExtendOptions, ExternalOption, NewRatio } from '../interfaces';

class Presenter {
  private model: Model;

  private view: View;

  eventEmitter = new EventEmitter();

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.init();
  }

  update(data: ExtendOptions | NewRatio, event: string): void {
    const needModelUpdate = event === 'newOptions' || event === 'viewUpdated';
    if (event === 'modelUpdated') {
      this.view.setViewParameters();
    }
    if (needModelUpdate) {
      this.model.update(data);
    }
    this.eventEmitter.notify();
  }

  getOptions(): ExtendOptions {
    return this.model.options;
  }

  setOptions(options: ExternalOption): void {
    const newOptions = { ...this.model.getOptions(), ...options };
    this.update(newOptions, 'newOptions');
  }

  private init(): void {
    this.model.eventEmitter.attach(this);
    this.view.eventEmitter.attach(this);
  }
}

export default Presenter;
