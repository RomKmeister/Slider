import Model from '../Model/Model';
import ViewSlider from '../ViewSlider/ViewSlider';
import ViewPanel from '../ViewPanel/ViewPanel';

class Presenter {
  model: Model;

  viewSlider: ViewSlider;

  viewPanel: ViewPanel;

  constructor(element: HTMLElement, options: any) {
    this.model = new Model(options);
    this.viewSlider = new ViewSlider(element, this.model);
    this.viewPanel = new ViewPanel(element, this.model);
    this.model.setMediator(this);
    this.viewSlider.setMediator(this);
    this.viewPanel.setMediator(this);
  }

  notify(property: any): void {
    this.model.updateModel(property);
    this.viewSlider.setSliderParameters();
    this.viewPanel.setPanelParameters();
  }
}

export default Presenter;
