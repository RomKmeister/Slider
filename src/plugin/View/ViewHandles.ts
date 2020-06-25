/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';

class ViewHandles {
  element: HTMLElement;

  model: Model;

  handles: NodeListOf<HTMLElement>;

  firstHandle: HTMLElement;

  secondHandle: HTMLElement;

  mousemove: boolean;

  handleDocumentMouseMove: any;

  target: HTMLElement;

  eventEmitter: EventEmitter;

  constructor(element: HTMLElement, model: Model) {
    this.element = element;
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
    this.findElements();
    this.bindEventListeners();
  }

  private findElements(): void {
    this.handles = this.element.querySelectorAll('.js-slider__handle');
    [this.firstHandle, this.secondHandle] = Array.from(this.handles);
  }

  private bindEventListeners(): void {
    this.handles.forEach((item) => item.addEventListener('mousedown', this.handleHandleMouseDown.bind(this)));
    this.handleDocumentMouseMove = this.bindHandleDocumentMouseMove.bind(this);
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

  private bindHandleDocumentMouseMove(event: MouseEvent): void {
    const coordinate = this.model.options.isVertical ? event.clientY : event.clientX;
    const name = (this.target === this.firstHandle) ? 'firstValue' : 'secondValue';
    const newOptions = { target: name, newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'handlerChanged');
  }

  private setHandlesPosition(): void {
    if (this.model.options.isVertical) {
      this.firstHandle.style.top = `${this.model.options.firstValueRatio}%`;
      this.secondHandle.style.top = `${this.model.options.secondValueRatio}%`;
    } else {
      this.firstHandle.style.left = `${this.model.options.firstValueRatio}%`;
      this.secondHandle.style.left = `${this.model.options.secondValueRatio}%`;
    }
  }

  private setVisibility(): void {
    const visibility = 'slider__handle_hidden';

    if (this.model.options.isSecondValueVisible) {
      this.secondHandle.classList.remove(visibility);
    } else {
      this.secondHandle.classList.add(visibility);
    }
  }

  private setDirection(): void {
    const direction = 'slider__handle_vertical';

    if (this.model.options.isVertical) {
      this.handles.forEach((item) => {
        item.classList.add(direction);
        item.style.left = '';
      });
    } else {
      this.handles.forEach((item) => {
        item.classList.remove(direction);
        item.style.top = '';
      });
    }
  }
}

export default ViewHandles;
