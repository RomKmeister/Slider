import Model from '../Model/Model';
import ViewSlider from './ViewSlider';

class ViewHandles extends ViewSlider {
  model: Model;

  view: ViewSlider;

  element: HTMLElement;

  handles: NodeListOf<HTMLElement>;

  firstHandle: HTMLElement;

  secondHandle: HTMLElement;

  mousemove: boolean;

  newhandleHandleMouseMove: any;

  bindedHandleHandleMouseMove: any;

  target: HTMLElement;

  constructor(element: HTMLElement, model: Model) {
    super(element, model);
    this.setSliderParameters();
    this.bindEventListners();
  }

  private findElements(): void {
    this.handles = this.element.querySelectorAll('.js-slider__handle');
    [this.firstHandle, this.secondHandle] = Array.from(this.handles);
  }

  setCalc(view: ViewSlider): void {
    this.view = view;
  }

  setSliderParameters(): void {
    this.findElements();
    this.setHandlesPosition();
    this.changeVisibility();
    this.changeDirection();
  }

  setHandlesPosition(): void {
    if (this.model.verticalScale) {
      this.firstHandle.style.top = `${this.model.firstHandlerPosition}%`;
      this.secondHandle.style.top = `${this.model.secondHandlerPosition}%`;
    } else {
      this.firstHandle.style.left = `${this.model.firstHandlerPosition}%`;
      this.secondHandle.style.left = `${this.model.secondHandlerPosition}%`;
    }
  }

  private changeVisibility(): void {
    const handleClassVisibility = 'slider__handle_hidden';

    if (this.model.showSecondValue) {
      this.secondHandle.classList.remove(handleClassVisibility);
    } else {
      this.secondHandle.classList.add(handleClassVisibility);
    }
  }

  private changeDirection(): void {
    const handleClassDirection = 'slider__handle_vertical';

    if (this.model.verticalScale) {
      this.handles.forEach((item) => item.classList.add(handleClassDirection));
      this.firstHandle.style.left = '';
      this.secondHandle.style.left = '';
    } else {
      this.handles.forEach((item) => item.classList.remove(handleClassDirection));
      this.firstHandle.style.top = '';
      this.secondHandle.style.top = '';
    }
  }

  private bindEventListners(): void {
    this.firstHandle.addEventListener('mousedown', this.handleDocumentMouseMove.bind(this));
    this.secondHandle.addEventListener('mousedown', this.handleDocumentMouseMove.bind(this));
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

  private chooseHandlerForUpdate(target: HTMLElement): string {
    const name = target === this.firstHandle ? 'firstValue' : 'secondValue';
    return name;
  }

  private handleHandleMouseMove(event: MouseEvent): void {
    const coordinate = this.model.verticalScale
      ? event.clientY
      : event.clientX;
    const value = this.calculateValue(coordinate);
    const property = this.chooseHandlerForUpdate(this.target);
    this.mediator.notify({ [property]: value });
  }
}

export default ViewHandles;
