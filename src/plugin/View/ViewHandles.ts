/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import ViewSlider from './ViewSlider';
import EventEmitter from '../EventEmitter/EventEmitter';

class ViewHandles extends ViewSlider {
  handles: NodeListOf<HTMLElement>;

  firstHandle: HTMLElement;

  secondHandle: HTMLElement;

  mousemove: boolean;

  bindedHandleHandleMouseMove: any;

  target: HTMLElement;

  eventEmitter = new EventEmitter();

  findElements(): void {
    this.handles = this.element.querySelectorAll('.js-slider__handle');
    [this.firstHandle, this.secondHandle] = Array.from(this.handles);
  }

  setHandlersParameters(): void {
    this.setHandlesPosition();
    this.setVisibility();
    this.setDirection();
  }

  bindEventListners(): void {
    this.handles.forEach((item) => item.addEventListener('mousedown', this.handleDocumentMouseMove.bind(this)));
    this.bindedHandleHandleMouseMove = this.handleHandleMouseMove.bind(this);
    document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
  }

  private setHandlesPosition(): void {
    if (this.model.verticalScale) {
      this.firstHandle.style.top = `${this.model.firstValueRatio}%`;
      this.secondHandle.style.top = `${this.model.secondValueRatio}%`;
    } else {
      this.firstHandle.style.left = `${this.model.firstValueRatio}%`;
      this.secondHandle.style.left = `${this.model.secondValueRatio}%`;
    }
  }

  private setVisibility(): void {
    const handleClassVisibility = 'slider__handle_hidden';

    if (this.model.showSecondValue) {
      this.secondHandle.classList.remove(handleClassVisibility);
    } else {
      this.secondHandle.classList.add(handleClassVisibility);
    }
  }

  private setDirection(): void {
    const handleClassDirection = 'slider__handle_vertical';

    if (this.model.verticalScale) {
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

  private handleDocumentMouseMove(event: MouseEvent): void {
    const findClosest = event.target as HTMLElement;
    this.target = findClosest.closest('.js-slider__handle');
    document.addEventListener('mousemove', this.bindedHandleHandleMouseMove);
  }

  private handleDocumentMouseUp(): void {
    document.removeEventListener('mousemove', this.bindedHandleHandleMouseMove);
  }

  private chooseHandlerForUpdate(target: HTMLElement): string {
    const name = target === this.firstHandle ? 'firstValue' : 'secondValue';
    return name;
  }

  private handleHandleMouseMove(event: MouseEvent): void {
    const coordinate = this.model.verticalScale ? event.clientY : event.clientX;
    const value = this.calculateValue(coordinate);
    const property = this.chooseHandlerForUpdate(this.target);
    const newOptions = { ...this.model, [property]: value };
    this.eventEmitter.notify(newOptions, 'viewUpdated');
  }
}

export default ViewHandles;
