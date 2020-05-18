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
    this.bindEventListners();
  }

  private findElements(): void {
    this.handles = this.element.querySelectorAll('.js-slider__handle');
    [this.firstHandle, this.secondHandle] = Array.from(this.handles);
  }

  private bindEventListners(): void {
    this.handles.forEach((item) => item.addEventListener('mousedown', this.handleHandleMouseDown.bind(this)));
    this.handleDocumentMouseMove = this.bindedHandleDocumentMouseMove.bind(this);
    document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
  }

  private handleHandleMouseDown(event: MouseEvent): void {
    const findClosest = event.target as HTMLElement;
    this.target = findClosest.closest('.js-slider__handle');
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
  }

  private handleDocumentMouseUp(): void {
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
  }

  private bindedHandleDocumentMouseMove(event: MouseEvent): void {
    const coordinate = this.model.modelOptions.isVertical ? event.clientY : event.clientX;
    const name = (this.target === this.firstHandle) ? 'firstValue' : 'secondValue';
    const newOptions = { target: name, newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'handlerPositionChanged');
  }

  private setHandlesPosition(): void {
    if (this.model.modelOptions.isVertical) {
      this.firstHandle.style.top = `${this.model.modelOptions.firstValueRatio}%`;
      this.secondHandle.style.top = `${this.model.modelOptions.secondValueRatio}%`;
    } else {
      this.firstHandle.style.left = `${this.model.modelOptions.firstValueRatio}%`;
      this.secondHandle.style.left = `${this.model.modelOptions.secondValueRatio}%`;
    }
  }

  private setVisibility(): void {
    const handleClassVisibility = 'slider__handle_hidden';

    if (this.model.modelOptions.isSecondValueVisible) {
      this.secondHandle.classList.remove(handleClassVisibility);
    } else {
      this.secondHandle.classList.add(handleClassVisibility);
    }
  }

  private setDirection(): void {
    const handleClassDirection = 'slider__handle_vertical';

    if (this.model.modelOptions.isVertical) {
      this.handles.forEach((item) => {
        item.classList.add(handleClassDirection);
        item.style.left = '';
      });
    } else {
      this.handles.forEach((item) => {
        item.classList.remove(handleClassDirection);
        item.style.top = '';
      });
    }
  }
}

export default ViewHandles;
