import EventEmitter from '../../EventEmitter/EventEmitter';
import { Parameters } from './RunnerViewInterfaces';

class RunnerView {
  element: HTMLElement;

  index: number;

  ratio: number;

  isVertical: boolean;

  mousemove: boolean;

  eventEmitter: EventEmitter;

  constructor(element: HTMLElement) {
    this.element = element;
    this.init();
  }

  setParameters({
    index, ratio, isVertical,
  }: Parameters): void {
    this.index = index;
    this.ratio = ratio;
    this.isVertical = isVertical;
    this.setPosition();
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

  private handleDocumentMouseMove = (event: MouseEvent): void => {
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
