import Model from '../Model/Model';
import ViewSlider from '../ViewSlider/ViewSlider';
import ViewPanel from '../ViewPanel/ViewPanel';

class Presenter {
  model: Model;

  viewSlider: ViewSlider;

  viewPanel: ViewPanel;

  constructor(options: object) {
    this.model = new Model(options);
    this.viewSlider = new ViewSlider(this.model);
    this.viewPanel = new ViewPanel(this.model);
    this.model.setMediator(this);
    this.viewSlider.setMediator(this);
    this.viewPanel.setMediator(this);
    this.viewSlider.setSliderParameters();
    this.viewPanel.setPanelParameters();
  }

  notify(property: string, value: number | boolean): void {
    this.model.updateModel(property, value);
    this.model.checkScaleBorders();
    this.viewSlider.setSliderParameters();
    this.viewPanel.setPanelParameters();

  }

  show() {
    return this.viewPanel.panel;
  }

  show1() {
    return this.viewSlider.slider;
  }
}

export default Presenter;
