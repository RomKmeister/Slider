import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';
import { NewCoordinate } from '../interfaces';
import ScaleView from './ScaleView/ScaleView';
import BubbleView from './BubbleView/BubbleView';
import RunnerView from './RunnerView/RunnerView';

class View {
  element: HTMLElement;

  model: Model;

  runnersElements: Array<HTMLElement>;

  bubblesElements: Array<HTMLElement>;

  scaleView: ScaleView;

  runners: Array<RunnerView>

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
    this.runners.forEach((item, index) => {
      const ratio = index === 0 ? firstValueRatio : secondValueRatio;
      const isVisible = index === 0 ? true : isSecondValueVisible;
      item.setParameters({
        index, ratio, isVertical, isVisible,
      });
    });
    this.bubbles.forEach((item, index) => {
      const value = index === 0 ? firstValue : secondValue;
      item.setParameters({
        index, value, isVertical, isBubbleVisible,
      });
    });
  }

  update(data: NewCoordinate, event: string): void {
    const newRatio = this.calculateRatio(data.coordinate);
    let name = '';
    if (event === 'scaleClicked') {
      name = this.chooseRatioForUpdate(newRatio);
    } else {
      name = data.target === 0 ? 'firstValueRatio' : 'secondValueRatio';
    }
    const newOption = { [name]: newRatio };
    this.eventEmitter.notify(newOption, 'viewUpdated');
  }

  private init(): void {
    this.findElements();
    this.eventEmitter = new EventEmitter();
    this.scaleView = new ScaleView(this.element);
    this.runners = this.runnersElements.map((item) => new RunnerView(item));
    this.bubbles = this.bubblesElements.map((item) => new BubbleView(item));
    this.runners.forEach((item) => item.eventEmitter.attach(this));
    this.scaleView.eventEmitter.attach(this);
    this.setParameters();
  }

  private findElements(): void {
    this.bubblesElements = Array.from(this.element.querySelectorAll('.js-slider__bubble'));
    this.runnersElements = Array.from(this.element.querySelectorAll('.js-slider__runner'));
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

  private chooseRatioForUpdate(newRatio: number): string {
    const { isSecondValueVisible, firstValueArea } = this.model.options;
    const needFirstValueRatio = (isSecondValueVisible && firstValueArea >= newRatio) || isSecondValueVisible === false;
    if (needFirstValueRatio) {
      return 'firstValueRatio';
    }
    return 'secondValueRatio';
  }
}

export default View;
