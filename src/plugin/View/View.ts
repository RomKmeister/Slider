import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';
import { NewCoordinate } from '../interfaces';
import ScaleView from './ScaleView';
import BubbleView from './BubbleView';
import HandleView from './HandleView';

class View {
  element: HTMLElement;

  model: Model;

  handlesElements: NodeListOf<HTMLElement>;

  bubblesElements: NodeListOf<HTMLElement>;

  viewScale: ScaleView;

  handles: Array<HandleView>

  bubbles: Array<BubbleView>

  scaleLength: number;

  scalePosition: number;

  eventEmitter: EventEmitter;

  constructor(element: HTMLElement, model: Model) {
    this.element = element;
    this.model = model;
    this.init();
  }

  setViewParameters(): void {
    this.viewScale.setScaleParameters();
    this.handles.forEach((item) => item.setHandlersParameters());
    this.bubbles.forEach((item) => item.setBubbleParameters());
  }

  update(data: NewCoordinate, event: string): void {
    let name = '';
    const newValue = this.calculateValue(data.newCoordinate);
    if (event === 'handlerChanged') {
      name = data.target;
    }
    if (event === 'scaleClicked' || event === 'stepClicked') {
      name = this.chooseValueForUpdate(newValue) ? 'firstValueRatio' : 'secondValueRatio';
    }
    const newOption = { [name]: newValue };
    this.eventEmitter.notify(newOption, 'viewUpdated');
  }

  private init(): void {
    this.findElements();
    this.eventEmitter = new EventEmitter();
    this.viewScale = new ScaleView(this.element, this.model);
    this.handles = Array.from(this.handlesElements).map((item, index) => new HandleView(item, index, this.model));
    this.bubbles = Array.from(this.bubblesElements).map((item, index) => new BubbleView(item, index, this.model));
    this.handles.forEach((item) => item.eventEmitter.attach(this));
    this.viewScale.eventEmitter.attach(this);
    this.setViewParameters();
  }

  private findElements(): void {
    this.bubblesElements = this.element.querySelectorAll('.js-slider__bubble');
    this.handlesElements = this.element.querySelectorAll('.js-slider__handle');
  }

  private calculateValue(coordinate: number): number {
    this.getScaleSizes();
    const value = ((coordinate - this.scalePosition) * 100) / this.scaleLength;
    return value;
  }

  private getScaleSizes(): void {
    const scale = this.element.querySelector('.js-slider__scale');
    this.scaleLength = this.model.options.isVertical
      ? scale.clientHeight
      : scale.clientWidth;
    this.scalePosition = this.model.options.isVertical
      ? scale.getBoundingClientRect().top
      : scale.getBoundingClientRect().left;
  }

  private chooseValueForUpdate(newValue: number): boolean {
    const { isSecondValueVisible, firstValueArea } = this.model.options;
    return (isSecondValueVisible && firstValueArea >= newValue) || isSecondValueVisible === false;
  }
}

export default View;
