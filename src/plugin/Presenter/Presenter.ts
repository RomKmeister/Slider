import Model from '../Model/Model';
import ViewSlider from '../View/ViewSlider';
import { ModelOptions } from '../interfaces';

class Presenter {
  model: Model;

  viewSlider: ViewSlider;

  constructor(model: Model, viewSlider: ViewSlider) {
    this.model = model;
    this.viewSlider = viewSlider;
    this.init();
  }

  update(data: ModelOptions, event: string): void {
    if (event === 'modelUpdated') this.viewSlider.setViewParameters();
    if (event === 'viewSliderUpdated') this.model.update(data);
  }

  private init(): void {
    this.model.eventEmitter.attach(this);
    this.viewSlider.eventEmitter.attach(this);
  }
}

export default Presenter;
