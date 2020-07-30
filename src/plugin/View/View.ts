import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';
import { NewCoordinate } from '../interfaces';
import ScaleView from './ScaleView/ScaleView';
import BubbleView from './BubbleView/BubbleView';
import HandleView from './HandleView/HandleView';

class View {
  element: HTMLElement;

  model: Model;

  handlesElements: NodeListOf<HTMLElement>;

  bubblesElements: NodeListOf<HTMLElement>;

  scaleView: ScaleView;

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

  setParameters(): void {
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
      range,
    } = this.model.options;
    this.scaleView.setParameters({
      minValue, maxValue, step, isVertical, isScaleStepsVisible, range,
    });
    this.handles.forEach((item, index) => {
      const ratio = index === 0 ? firstValueRatio : secondValueRatio;
      const isVisible = index === 0 ? true : isSecondValueVisible;
      return item.setParameters({
        index, ratio, isVertical, isVisible,
      });
    });
    this.bubbles.forEach((item, index) => {
      const value = index === 0 ? firstValue : secondValue;
      return item.setParameters({
        index, value, isVertical, isBubbleVisible,
      });
    });
  }

  update(data: NewCoordinate, event: string): void {
    const newValue = this.calculateRatio(data.newCoordinate);
    const chooseHandler = data.target === 0 ? 'first' : 'second';
    const name = event === 'handlerChanged' ? this.chooseRatioForUpdate(chooseHandler) : this.chooseRatioForUpdate(newValue);
    const newOption = { [name]: newValue };
    this.eventEmitter.notify(newOption, 'viewUpdated');
  }

  private init(): void {
    this.findElements();
    this.eventEmitter = new EventEmitter();
    this.scaleView = new ScaleView(this.element);
    this.handles = Array.from(this.handlesElements).map((item) => new HandleView(item));
    this.bubbles = Array.from(this.bubblesElements).map((item) => new BubbleView(item));
    this.handles.forEach((item) => item.eventEmitter.attach(this));
    this.scaleView.eventEmitter.attach(this);
    this.setParameters();
  }

  private findElements(): void {
    this.bubblesElements = this.element.querySelectorAll('.js-slider__bubble');
    this.handlesElements = this.element.querySelectorAll('.js-slider__handle');
  }

  private calculateRatio(coordinate: number): number {
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

  private chooseRatioForUpdate(newValue: number | string): string {
    const { isSecondValueVisible, firstValueArea } = this.model.options;
    const checking = newValue === 'first'
    || (isSecondValueVisible && firstValueArea >= newValue) || isSecondValueVisible === false;
    if (checking) {
      return 'firstValueRatio';
    }
    return 'secondValueRatio';
  }
}

export default View;
