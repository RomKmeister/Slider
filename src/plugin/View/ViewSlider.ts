import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';
import { NewOption } from '../interfaces';
import ViewScale from './ViewScale';
import ViewBubbles from './ViewBubbles';
import ViewHandles from './ViewHandles';

class ViewSlider {
  element: HTMLElement;

  model: Model;

  viewScale: ViewScale;

  viewHandles: ViewHandles;

  viewBubbles: ViewBubbles;

  scaleLength: number;

  scalePosition: number;

  eventEmitter = new EventEmitter();

  constructor(element: HTMLElement, model: Model) {
    this.element = element;
    this.model = model;
    this.init();
  }

  setViewParameters(): void {
    this.viewScale.setDirection();
    this.viewHandles.setHandlersParameters();
    this.viewBubbles.setBubbleParameters();
  }

  update(data: NewOption, event: string): void {
    let name = '';
    const newValue = this.calculateValue(data.newCoordinate);
    if (event === 'handlerPositionChanged') {
      name = data.target;
    }
    if (event === 'scaleClicked') {
      name = this.model.modelOptions.firstValueArea >= newValue ? 'firstValue' : 'secondValue';
    }
    const newOption = { ...this.model.modelOptions, [name]: newValue };
    this.eventEmitter.notify(newOption, 'viewSliderUpdated');
  }

  private init(): void {
    this.viewScale = new ViewScale(this.element, this.model);
    this.viewHandles = new ViewHandles(this.element, this.model);
    this.viewBubbles = new ViewBubbles(this.element, this.model);
    this.viewHandles.eventEmitter.attach(this);
    this.viewScale.eventEmitter.attach(this);
    this.setViewParameters();
  }

  private calculateValue(coordinate: number): number {
    this.getScaleSizes();
    const LIQUID_MOVE = 0.01;
    const step = this.model.modelOptions.step > 1 ? this.model.modelOptions.step : LIQUID_MOVE;
    const value = this.model.modelOptions.minValueScale
    + Math.round(((coordinate - this.scalePosition) / step)
    / (this.scaleLength / this.model.modelOptions.scaleLength)) * step;
    return value;
  }

  private getScaleSizes(): void {
    const scale = this.element.querySelector('.js-slider__scale');
    this.scaleLength = this.model.modelOptions.verticalScale
      ? scale.clientHeight
      : scale.clientWidth;
    this.scalePosition = this.model.modelOptions.verticalScale
      ? scale.getBoundingClientRect().top
      : scale.getBoundingClientRect().left;
  }
}

export default ViewSlider;
