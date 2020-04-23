import BaseComponent from '../BaseComponent/BaseComponent';
import Model from '../Model/Model';

class ViewSlider extends BaseComponent {
  model: Model;

  element: HTMLElement;

  slider: HTMLElement;

  scale: HTMLElement;

  handles: NodeListOf<HTMLElement>;

  bubbles: NodeListOf<HTMLElement>;

  firstHandle: HTMLElement;

  secondHandle: HTMLElement;

  firstBubble: HTMLElement;

  secondBubble: HTMLElement;

  scaleModelLength: number;

  mousemove: boolean;

  newhandleHandleMouseMove: any;

  bindedHandleHandleMouseMove: any;

  target: HTMLElement;

  constructor(element: HTMLElement, model: Model) {
    super();
    this.element = element;
    this.model = model;
    this.findElements();
    this.setSliderParameters();
    this.bindEventListners();
  }

  private findElements(): void {
    this.slider = this.element.querySelector('.js-slider');
    this.scale = this.slider.querySelector('.js-slider__scale');
    this.handles = this.slider.querySelectorAll('.js-slider__handle');
    this.bubbles = this.slider.querySelectorAll('.js-slider__bubble');
    [this.firstHandle, this.secondHandle] = Array.from(this.handles);
    [this.firstBubble, this.secondBubble] = Array.from(this.bubbles);
  }

  setSliderParameters(): void {
    this.setHandlesPosition();
    this.showSecondHandler();
    this.setBubbleValue();
    this.showBubble();
    this.changeDirection();
  }

  private setHandlesPosition(): void {
    this.scaleModelLength = this.model.maxValueScale - this.model.minValueScale;
    const firstHandlerPosition = (this.model.firstValue - this.model.minValueScale) * (100 / this.scaleModelLength);
    const secondHandlerPosition = (this.model.secondValue - this.model.minValueScale) * (100 / this.scaleModelLength);

    if (this.model.verticalScale) {
      this.firstHandle.style.top = `${firstHandlerPosition}%`;
      this.secondHandle.style.top = `${secondHandlerPosition}%`;
    } else {
      this.firstHandle.style.left = `${firstHandlerPosition}%`;
      this.secondHandle.style.left = `${secondHandlerPosition}%`;
    }
  }

  private setBubbleValue(): void {
    this.firstBubble.textContent = String(Math.round(this.model.firstValue));
    this.secondBubble.textContent = String(Math.round(this.model.secondValue));
  }

  private showSecondHandler(): void {
    this.secondHandle.style.display = this.toggleElement(this.model.showSecondValue);
  }

  private showBubble(): void {
    this.firstBubble.style.display = this.toggleElement(this.model.showBubble);
    this.secondBubble.style.display = this.toggleElement(this.model.showBubble);
  }

  private toggleElement(statement: boolean): string {
    if (statement) return 'block';
    return 'none';
  }

  private changeDirection(): void {
    const scaleClassDirection = 'slider__scale_vertical';
    const handleClassDirection = 'slider__handle_vertical';
    const bubbleClassDirection = 'slider__bubble_vertical';

    if (this.model.verticalScale) {
      this.scale.classList.add(scaleClassDirection);
      this.handles.forEach((item) => item.classList.add(handleClassDirection));
      this.bubbles.forEach((item) => item.classList.add(bubbleClassDirection));
      this.firstHandle.style.left = '';
      this.secondHandle.style.left = '';
    } else {
      this.scale.classList.remove(scaleClassDirection);
      this.handles.forEach((item) => item.classList.remove(handleClassDirection));
      this.bubbles.forEach((item) => item.classList.remove(bubbleClassDirection));
      this.firstHandle.style.top = '';
      this.secondHandle.style.top = '';
    }
  }

  private bindEventListners(): void {
    this.firstHandle.addEventListener('mousedown', this.handleDocumentMouseMove.bind(this));
    this.secondHandle.addEventListener('mousedown', this.handleDocumentMouseMove.bind(this));
    this.scale.addEventListener('mousedown', this.handleScaleClick.bind(this));
    document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
    document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
    this.bindedHandleHandleMouseMove = this.handleHandleMouseMove.bind(this);
  }

  private handleDocumentMouseMove(event: MouseEvent): void {
    const findClosest = event.target as HTMLElement;
    this.target = findClosest.closest('.js-slider__handle');
    document.addEventListener('mousemove', this.bindedHandleHandleMouseMove);
  }

  private handleDocumentMouseUp(): void {
    document.removeEventListener('mousemove', this.bindedHandleHandleMouseMove);
  }

  private handleScaleClick(event: MouseEvent): void {
    this.target = event.target as HTMLElement;
    const coordinate = this.model.verticalScale
      ? event.clientY
      : event.clientX;
    const value = this.calculateValue(coordinate);
    const property = this.chooseHandlerForUpdate(this.target, coordinate);
    this.mediator.notify({ [property]: value });
  }

  private handleHandleMouseMove(event: MouseEvent): void {
    const coordinate = this.model.verticalScale
      ? event.clientY
      : event.clientX;
    const value = this.calculateValue(coordinate);
    const property = this.chooseHandlerForUpdate(this.target, coordinate);
    this.mediator.notify({ [property]: value });
  }

  private chooseHandlerForUpdate(target: HTMLElement, coordinate: number): string {
    const intervalBetweenHandles = this.secondHandle.offsetLeft - this.firstHandle.offsetLeft;
    const handleArea = this.firstHandle.offsetLeft + intervalBetweenHandles / 2;
    switch (target) {
      case this.firstHandle:
        return 'firstValue';
      case this.secondHandle:
        return 'secondValue';
      case this.scale:
        if (coordinate < handleArea) {
          return 'firstValue';
        }
        return 'secondValue';
      default:
        return 'firstValue';
    }
  }

  private calculateValue(coordinate: number): number {
    const scaleDomLength = this.model.verticalScale
      ? this.scale.clientHeight
      : this.scale.clientWidth;
    const scalePosition = this.model.verticalScale
      ? this.scale.getBoundingClientRect().top
      : this.scale.getBoundingClientRect().left;
    const step = this.model.step > 1 ? this.model.step : 0.01;
    const value = this.model.minValueScale
    + Math.round(((coordinate - scalePosition) / step) / (scaleDomLength / this.scaleModelLength)) * step;
    return value;
  }
}

export default ViewSlider;
