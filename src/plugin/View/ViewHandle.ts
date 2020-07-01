/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';

class ViewHandle {
  element: HTMLElement;

  index: number;

  model: Model;

  mousemove: boolean;

  handleDocumentMouseMove: any;

  target: HTMLElement;

  eventEmitter: EventEmitter;

  constructor(element: HTMLElement, index: number, model: Model) {
    this.element = element;
    this.index = index;
    this.model = model;
    this.init();
  }

  setHandlersParameters(): void {
    this.setHandlesPosition();
    this.setVisibility();
    this.setDirection();
  }

  private init(): void {
    this.eventEmitter = new EventEmitter();
    this.bindEventListeners();
  }

  private bindEventListeners(): void {
    this.element.addEventListener('mousedown', this.handleHandleMouseDown.bind(this));
    this.handleDocumentMouseMove = this.bindedHandleDocumentMouseMove.bind(this);
    document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
  }

  private handleHandleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const findClosest = event.target as HTMLElement;
    this.target = findClosest.closest('.js-slider__handle');
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
  }

  private handleDocumentMouseUp(): void {
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
  }

  private bindedHandleDocumentMouseMove(event: MouseEvent): void {
    const coordinate = this.model.options.isVertical ? event.clientY : event.clientX;
    const name = (this.index === 0) ? 'firstValue' : 'secondValue';
    const newOptions = { target: name, newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'handlerChanged');
  }

  private setHandlesPosition(): void {
    const { isVertical, firstValueRatio, secondValueRatio } = this.model.options;
    const ratio = this.index === 0 ? firstValueRatio : secondValueRatio;
    if (isVertical) {
      this.element.style.top = `${ratio}%`;
    } else {
      this.element.style.left = `${ratio}%`;
    }
  }

  private setVisibility(): void {
    const handleClassVisibility = 'slider__handle_hidden';
    const isSecondValueVisible = this.model.options.isSecondValueVisible && this.index === 1;
    const isSecondValueInvisible = !this.model.options.isSecondValueVisible && this.index === 1;
    if (isSecondValueVisible) {
      this.element.classList.remove(handleClassVisibility);
    } else if (isSecondValueInvisible) {
      this.element.classList.add(handleClassVisibility);
    }
  }

  private setDirection(): void {
    const handleClassDirection = 'slider__handle_vertical';

    if (this.model.options.isVertical) {
      this.element.classList.add(handleClassDirection);
      this.element.style.left = '';
    } else {
      this.element.classList.remove(handleClassDirection);
      this.element.style.top = '';
    }
  }
}

export default ViewHandle;
