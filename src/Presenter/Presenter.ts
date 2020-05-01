import Model from '../Model/Model';
import ViewSlider from '../ViewSlider/ViewSlider';
import ViewPanel from '../ViewPanel/ViewPanel';
import ViewScale from '../ViewSlider/ViewScale';
import ViewBubbles from '../ViewSlider/ViewBubbles';
import ViewHandles from '../ViewSlider/ViewHandles';

class Presenter {
  model: Model;

  viewSlider: ViewSlider;

  viewPanel: ViewPanel;

  viewHandles: ViewHandles;

  viewBubbles: ViewBubbles;

  viewScale: ViewScale;

  constructor(element: HTMLElement, options: any) {
    this.model = new Model(options);
    this.viewSlider = new ViewSlider(element, this.model);
    this.viewScale = new ViewScale(element, this.model);
    this.viewHandles = new ViewHandles(element, this.model);
    this.viewBubbles = new ViewBubbles(element, this.model);
    this.viewPanel = new ViewPanel(element, this.model);
    this.model.setMediator(this);
    this.viewSlider.setMediator(this);
    this.viewScale.setMediator(this);
    this.viewHandles.setMediator(this);
    this.viewPanel.setMediator(this);
  }

  notify(property: any): void {
    this.model.updateModel(property);
    this.viewHandles.setSliderParameters();
    this.viewScale.setScaleParameters();
    this.viewBubbles.setBubbleParameters();
    this.viewPanel.setPanelParameters();
  }
}

export default Presenter;
