import Model from '../Model/Model';
import View from '../View/View';
import EventEmitter from '../EventEmitter/EventEmitter';
import { ModelOptions, Slider, ExternalOption } from '../interfaces';

class Presenter {
  model: Model;

  view: View;

  eventEmitter = new EventEmitter();

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.init();
  }

  update(data: ModelOptions, event: string): void {
    if (event === 'modelUpdated') {
      this.view.setViewParameters();
    }
    if (event === 'newOptions') {
      this.model.update(data);
    }
    if (event === 'viewSliderUpdated') this.model.update(data);
    this.eventEmitter.notify();
  }

  getOptions(): ModelOptions {
    return this.model.modelOptions;
  }

  setOptions(options: ExternalOption): void {
    const newOptions = { ...this.model.modelOptions, ...options };
    this.update(newOptions, 'newOptions');
  }

  private init(): void {
    this.model.eventEmitter.attach(this);
    this.view.eventEmitter.attach(this);
  }
}

export default Presenter;
