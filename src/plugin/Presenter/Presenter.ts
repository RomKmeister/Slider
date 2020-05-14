import Model from '../Model/Model';
import ViewSlider from '../View/ViewSlider';
import ViewPanel from '../View/ViewPanel';
import ViewScale from '../View/ViewScale';
import ViewBubbles from '../View/ViewBubbles';
import ViewHandles from '../View/ViewHandles';
import { Slider } from '../interfaces';

class Presenter {
  options: Slider

  model: Model;

  viewSlider: ViewSlider;

  viewScale: ViewScale;

  viewHandles: ViewHandles;

  viewBubbles: ViewBubbles;

  viewPanel: ViewPanel;

  constructor(element: HTMLElement, options: Slider) {
    this.options = options;
    this.model = new Model();
    this.viewSlider = new ViewSlider(element);
    this.viewScale = new ViewScale(element);
    this.viewHandles = new ViewHandles(element);
    this.viewBubbles = new ViewBubbles(element);
    this.viewPanel = new ViewPanel(element);
    this.init();
  }

  private init(): void {
    this.setEventEmitter();
    this.viewScale.findElements();
    this.viewHandles.findElements();
    this.viewBubbles.findElements();
    this.viewPanel.findElements();
    this.viewHandles.bindEventListners();
    this.viewScale.bindEventListners();
    this.viewPanel.bindEventListners();
    this.model.setModelParameters(this.options);
  }

  update(data, event: string): void {
    if (event === 'modelUpdated') this.setViewParameters(data);
    if (event === 'viewUpdated') this.model.setModelParameters(data);
  }

  private setEventEmitter(): void {
    this.model.eventEmitter.attach(this);
    this.viewScale.eventEmitter.attach(this);
    this.viewHandles.eventEmitter.attach(this);
    this.viewPanel.eventEmitter.attach(this);
  }

  private setViewParameters(model: Model): void {
    this.viewScale.model = model;
    this.viewHandles.model = model;
    this.viewBubbles.model = model;
    this.viewPanel.model = model;
    this.viewScale.setDirection();
    this.viewHandles.setHandlersParameters();
    this.viewBubbles.setBubbleParameters();
    this.viewPanel.setPanelParameters();
  }
}

export default Presenter;
