import EventEmitter from '../EventEmitter/EventEmitter';
import { NewCoordinate, ExtendedOptions } from '../interfaces';
import ScaleView from './ScaleView/ScaleView';
import BubbleView from './BubbleView/BubbleView';
import RunnerView from './RunnerView/RunnerView';

class View {
  element: HTMLElement;

  options: ExtendedOptions;

  firstRunnerElement: HTMLElement;

  secondRunnerElement: HTMLElement;

  scaleView: ScaleView;

  firstRunner: RunnerView;

  secondRunner: RunnerView;

  firstBubble: BubbleView;

  secondBubble: BubbleView;

  scaleLength: number;

  scalePosition: number;

  eventEmitter: EventEmitter;

  constructor(element: HTMLElement) {
    this.element = element;
    this.init();
  }

  setParameters(options: ExtendedOptions): void {
    this.options = options;
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
    } = this.options;
    this.render();
    this.scaleView.setParameters({
      minValue, maxValue, step, isVertical, isScaleStepsVisible, range,
    });
    if (isSecondValueVisible) {
      [this.firstRunner, this.secondRunner].forEach((item, index) => {
        const ratio = index === 0 ? firstValueRatio : secondValueRatio;
        item.setParameters({
          index, ratio, isVertical,
        });
      });
    } else {
      this.firstRunner.setParameters({ index: 0, ratio: firstValueRatio, isVertical });
    }
    if (isBubbleVisible && isSecondValueVisible) {
      [this.firstBubble, this.secondBubble].forEach((item, index) => {
        const value = index === 0 ? firstValue : secondValue;
        item.setParameters({
          value, isVertical,
        });
      });
    }
    if (isBubbleVisible && !isSecondValueVisible) {
      this.firstBubble.setParameters({ value: firstValue, isVertical });
    }
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
    this.eventEmitter = new EventEmitter();
    this.scaleView = new ScaleView(this.element);
    this.scaleView.eventEmitter.attach(this);
    this.initFirstRunner();
  }

  private initFirstRunner(): void {
    this.firstRunnerElement = this.element.querySelector('.js-slider__runner');
    this.firstRunner = new RunnerView(this.firstRunnerElement);
    this.firstRunner.eventEmitter.attach(this);
  }

  private render(): void {
    const { isSecondValueVisible, isBubbleVisible } = this.options;
    if (isSecondValueVisible) {
      this.createSecondRunner();
    }
    if (isBubbleVisible && isSecondValueVisible) {
      this.createFirstBubble();
      this.createSecondBubble();
    }
    if (isBubbleVisible && !isSecondValueVisible) {
      this.createFirstBubble();
      this.removeSecondBubble();
    }
    if (!isBubbleVisible) {
      this.removeFirstBubble();
      this.removeSecondBubble();
    }
    if (!isSecondValueVisible) {
      this.removeSecondRunner();
    }
  }

  private createSecondRunner(): void {
    if (!this.secondRunnerElement) {
      this.secondRunnerElement = document.createElement('div');
      this.secondRunnerElement.classList.add('slider__runner');
      this.element.append(this.secondRunnerElement);
      this.secondRunner = new RunnerView(this.secondRunnerElement);
      this.secondRunner.eventEmitter.attach(this);
    }
  }

  private removeSecondRunner(): void {
    if (this.secondRunnerElement) {
      this.secondRunnerElement.remove();
      this.secondRunnerElement = null;
    }
  }

  private createFirstBubble(): void {
    if (!this.firstBubble) {
      this.firstBubble = new BubbleView(this.firstRunnerElement);
    }
  }

  private removeFirstBubble(): void {
    if (this.firstBubble) {
      this.firstRunnerElement.innerHTML = '';
      this.firstBubble = null;
    }
  }

  private createSecondBubble(): void {
    if (!this.secondBubble) {
      this.secondBubble = new BubbleView(this.secondRunnerElement);
    }
  }

  private removeSecondBubble(): void {
    if (this.secondBubble) {
      this.secondRunnerElement.innerHTML = '';
      this.secondBubble = null;
    }
  }

  private calculateRatio(coordinate: number): number {
    this.getScaleSizes();
    const value = ((coordinate - this.scalePosition) * 100) / this.scaleLength;
    return value;
  }

  private getScaleSizes(): void {
    const scale = this.element.querySelector('.js-slider__scale');
    this.scaleLength = this.options.isVertical
      ? scale.clientHeight
      : scale.clientWidth;
    this.scalePosition = this.options.isVertical
      ? scale.getBoundingClientRect().top
      : scale.getBoundingClientRect().left;
  }

  private chooseRatioForUpdate(newRatio: number): string {
    const { isSecondValueVisible, firstValueArea } = this.options;
    const needFirstValueRatio = (isSecondValueVisible && firstValueArea >= newRatio) || isSecondValueVisible === false;
    if (needFirstValueRatio) {
      return 'firstValueRatio';
    }
    return 'secondValueRatio';
  }
}

export default View;
