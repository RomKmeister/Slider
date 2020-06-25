import Model from '../Model/Model';
import View from '../View/View';
import EventEmitter from '../EventEmitter/EventEmitter';
import { Options, ExternalOption } from '../interfaces';

class Presenter {
  private model: Model;

  private view: View;

  eventEmitter = new EventEmitter();

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.init();
  }

  update(data: Options, event: string): void {
    if (event === 'modelUpdated') {
      this.view.setViewParameters();
    }
    if (event === 'newOptions') {
      this.model.update(data);
    }
    if (event === 'viewUpdated') this.model.update(data);
    this.eventEmitter.notify();
  }

  getOptions(): Options {
    return this.model.options;
  }

  setOptions(options: ExternalOption): void {
    const newOptions = { ...this.model.options, ...options };
    this.update(newOptions, 'newOptions');
  }

  private init(): void {
    this.model.eventEmitter.attach(this);
    this.view.eventEmitter.attach(this);
  }
}

export default Presenter;
