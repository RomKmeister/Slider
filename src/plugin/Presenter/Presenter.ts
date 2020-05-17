import Model from '../Model/Model';
import ViewSlider from '../View/ViewSlider';
import ViewPanel from '../View/ViewPanel';
import { ModelOptions } from '../interfaces';

class Presenter {
  model: Model;

  viewSlider: ViewSlider;

  viewPanel: ViewPanel;

  constructor(model: Model, viewSlider: ViewSlider, viewPanel: ViewPanel) {
    this.model = model;
    this.viewSlider = viewSlider;
    this.viewPanel = viewPanel;
    this.init();
  }

  update(data: ModelOptions, event: string): void {
    if (event === 'modelUpdated') {
      this.viewSlider.setViewParameters();
      this.viewPanel.setPanelParameters();
    }
    if (event === 'viewSliderUpdated') this.model.update(data);
    if (event === 'viewPanelUpdated') this.model.update(data);
  }

  private init(): void {
    this.model.eventEmitter.attach(this);
    this.viewSlider.eventEmitter.attach(this);
    this.viewPanel.eventEmitter.attach(this);
  }
}

export default Presenter;
