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
    const {
      minValue,
      maxValue,
      firstValue,
      isSecondValueVisible,
      secondValue,
      step,
      isVertical,
      isBubbleVisible,
      isScaleStepsVisible,
      firstValueRatio,
      secondValueRatio,
      scaleLength,
    } = this.model.options;
    this.viewScale.setScaleParameters(minValue, maxValue, step, isVertical, isScaleStepsVisible, scaleLength);
    this.handles.forEach((item, index) => {
      const ratio = index === 0 ? firstValueRatio : secondValueRatio;
      const isVisible = index === 0 ? true : isSecondValueVisible;
      return item.setHandlersParameters(index, ratio, isVertical, isVisible);
    });
    this.bubbles.forEach((item, index) => {
      const value = index === 0 ? firstValue : secondValue;
      return item.setBubbleParameters(index, value, isVertical, isBubbleVisible);
    });
  }

  update(data: NewCoordinate, event: string): void {
    let name = '';
    const newValue = this.calculateValue(data.newCoordinate);
    if (event === 'handlerChanged') {
      name = data.target === 0 ? 'firstValueRatio' : 'secondValueRatio';
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
    this.viewScale = new ScaleView(this.element);
    this.handles = Array.from(this.handlesElements).map((item) => new HandleView(item));
    this.bubbles = Array.from(this.bubblesElements).map((item) => new BubbleView(item));
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
