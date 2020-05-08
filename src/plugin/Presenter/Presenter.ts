import Model from '../Model/Model';
import ViewSlider from '../View/ViewSlider';
import ViewPanel from '../View/ViewPanel';
import ViewScale from '../View/ViewScale';
import ViewBubbles from '../View/ViewBubbles';
import ViewHandles from '../View/ViewHandles';
import { Slider, NewValue } from '../interfaces';

class Presenter {
  model: Model;

  viewSlider: ViewSlider;

  viewScale: ViewScale;

  viewHandles: ViewHandles;

  viewBubbles: ViewBubbles;

  viewPanel: ViewPanel;

  constructor(element: HTMLElement, options: Slider) {
    this.model = new Model(options);
    this.viewSlider = new ViewSlider(element, this.model);
    this.viewScale = new ViewScale(element, this.model);
    this.viewHandles = new ViewHandles(element, this.model);
    this.viewBubbles = new ViewBubbles(element, this.model);
    this.viewPanel = new ViewPanel(element, this.model);
    this.init();
  }

  init(): void {
    this.viewScale.findElements();
    this.viewHandles.findElements();
    this.viewBubbles.findElements();
    this.viewPanel.findElements();
    this.setMediator();
    this.viewHandles.bindEventListners();
    this.viewScale.bindEventListners();
    this.viewPanel.formChange();
    this.setViewParameters();
  }

  notify(property: NewValue): void {
    this.model.updateModel(property);
    this.viewScale.setDirection();
    this.viewHandles.setHandlersParameters();
    this.viewBubbles.setBubbleParameters();
    this.viewPanel.setPanelParameters();
  }

  private setMediator(): void {
    this.model.setMediator(this);
    this.viewSlider.setMediator(this);
    this.viewScale.setMediator(this);
    this.viewHandles.setMediator(this);
    this.viewPanel.setMediator(this);
  }

  private setViewParameters(): void {
    this.viewScale.setDirection();
    this.viewHandles.setHandlersParameters();
    this.viewBubbles.setBubbleParameters();
    this.viewPanel.setPanelParameters();
  }
}

export default Presenter;
