import Model from '../Model/Model';
import ViewSlider from '../ViewSlider/ViewSlider';
import ViewPanel from '../ViewPanel/ViewPanel';

class Presenter {
  model: Model;

  viewSlider: ViewSlider;

  viewPanel: ViewPanel;

  constructor(options: any) {
    this.model = new Model(options);
    this.viewSlider = new ViewSlider(this.model);
    this.viewPanel = new ViewPanel(this.model);
    this.model.setMediator(this);
    this.viewSlider.setMediator(this);
    this.viewPanel.setMediator(this);
  }

  notify(property: any): void {
    this.model.updateModel(property);
    this.viewSlider.setSliderParameters();
    this.viewPanel.setPanelParameters();
  }

  showPanel(): HTMLElement {
    return this.viewPanel.panel;
  }

  showSlider(): HTMLElement {
    return this.viewSlider.slider;
  }
}

export default Presenter;
