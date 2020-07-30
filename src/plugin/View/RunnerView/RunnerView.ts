import EventEmitter from '../../EventEmitter/EventEmitter';
import { Parameters } from './RunnerViewInterfaces';

class RunnerView {
  element: HTMLElement;

  index: number;

  ratio: number;

  isVertical: boolean;

  isVisible: boolean;

  mousemove: boolean;

  eventEmitter: EventEmitter;

  constructor(element: HTMLElement) {
    this.element = element;
    this.init();
  }

  setParameters({
    index, ratio, isVertical, isVisible,
  }: Parameters): void {
    this.index = index;
    this.ratio = ratio;
    this.isVertical = isVertical;
    this.isVisible = isVisible;
    this.setPosition();
    this.setVisibility();
    this.setDirection();
  }

  private init(): void {
    this.eventEmitter = new EventEmitter();
    this.bindEventListeners();
  }

  private bindEventListeners(): void {
    this.element.addEventListener('mousedown', this.handleRunnerMouseDown.bind(this));
    document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
  }

  private handleRunnerMouseDown(event: MouseEvent): void {
    event.preventDefault();
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
  }

  private handleDocumentMouseUp(): void {
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private handleDocumentMouseMove = (event: MouseEvent) => {
    const coordinate = this.isVertical ? event.clientY : event.clientX;
    const newCoordinate = { target: this.index, coordinate };
    this.eventEmitter.notify(newCoordinate, 'runnerMoved');
  }

  private setPosition(): void {
    if (this.isVertical) {
      this.element.style.top = `${this.ratio}%`;
    } else {
      this.element.style.left = `${this.ratio}%`;
    }
  }

  private setVisibility(): void {
    const runnerClassVisibility = 'slider__runner_hidden';
    if (this.isVisible === false) {
      this.element.classList.add(runnerClassVisibility);
    } else {
      this.element.classList.remove(runnerClassVisibility);
    }
  }

  private setDirection(): void {
    const runnerClassDirection = 'slider__runner_vertical';

    if (this.isVertical) {
      this.element.classList.add(runnerClassDirection);
      this.element.style.left = '';
    } else {
      this.element.classList.remove(runnerClassDirection);
      this.element.style.top = '';
    }
  }
}

export default RunnerView;
