import Model from '../Model/Model';
import View from '../View/View';
import EventEmitter from '../EventEmitter/EventEmitter';
import { ModelOptions } from '../interfaces';

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
    const eventUpdate = new Event('eventUpdate');
    if (event === 'modelUpdated') {
      this.view.setViewParameters();
      this.view.element.dispatchEvent(eventUpdate);
    }
    if (event === 'newOptions') {
      const newOptions = { ...this.model.modelOptions, ...data };
      this.model.update(newOptions);
    }
    if (event === 'viewSliderUpdated') this.model.update(data);
  }

  private init(): void {
    this.model.eventEmitter.attach(this);
    this.view.eventEmitter.attach(this);
  }
}

export default Presenter;
