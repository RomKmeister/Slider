import Model from '../Model/Model';
import View from '../View/View';
import { ModelOptions } from '../interfaces';

class Presenter {
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.init();
  }

  update(data: ModelOptions, event: string): void {
    if (event === 'modelUpdated') this.view.setViewParameters();
    if (event === 'viewSliderUpdated') this.model.update(data);
  }

  private init(): void {
    this.model.eventEmitter.attach(this);
    this.view.eventEmitter.attach(this);
  }
}

export default Presenter;
