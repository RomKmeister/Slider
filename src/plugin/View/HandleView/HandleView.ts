import EventEmitter from '../../EventEmitter/EventEmitter';
import { Parameters } from './HandleViewInterfaces';

class HandleView {
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
    this.element.addEventListener('mousedown', this.handleHandleMouseDown.bind(this));
    document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
  }

  private handleHandleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
  }

  private handleDocumentMouseUp(): void {
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private handleDocumentMouseMove = (event: MouseEvent) => {
    const coordinate = this.isVertical ? event.clientY : event.clientX;
    const newOptions = { target: this.index, newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'handleMoved');
  }

  private setPosition(): void {
    if (this.isVertical) {
      this.element.style.top = `${this.ratio}%`;
    } else {
      this.element.style.left = `${this.ratio}%`;
    }
  }

  private setVisibility(): void {
    const handleClassVisibility = 'slider__handle_hidden';
    if (this.isVisible === false) {
      this.element.classList.add(handleClassVisibility);
    } else {
      this.element.classList.remove(handleClassVisibility);
    }
  }

  private setDirection(): void {
    const handleClassDirection = 'slider__handle_vertical';

    if (this.isVertical) {
      this.element.classList.add(handleClassDirection);
      this.element.style.left = '';
    } else {
      this.element.classList.remove(handleClassDirection);
      this.element.style.top = '';
    }
  }
}

export default HandleView;
