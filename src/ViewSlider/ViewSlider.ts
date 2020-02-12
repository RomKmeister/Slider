import Model from '../Model/Model';
import Presenter from '../Presenter/Presenter';

class ViewSlider {
  model: Model;

  mediator: Presenter;

  handles: any;

  slider: HTMLElement;

  scale: HTMLElement;

  scaleModelLength: number;

  firstHandle: HTMLElement;

  secondHandle: HTMLElement;

  bubbles: any;

  firstBubble: HTMLElement;

  secondBubble: HTMLElement;

  mousemove: boolean;

  target: HTMLElement;

  constructor(model: Model) {
    this.model = model;
    this.slider = this.render();
    this.setSliderParameters();
    this.onChange();
  }

  setMediator(mediator: Presenter): void {
    this.mediator = mediator;
  }

  private render(): HTMLElement {
    this.slider = document.createElement('div');
    this.scale = document.createElement('div');
    this.firstHandle = document.createElement('div');
    this.secondHandle = document.createElement('div');
    this.firstBubble = document.createElement('div');
    this.secondBubble = document.createElement('div');
    this.slider.classList.add('slider-block__slider');
    this.scale.classList.add('slider-block__scale');
    this.firstHandle.classList.add('slider-block__handle');
    this.secondHandle.classList.add('slider-block__handle');
    this.firstBubble.classList.add('slider-block__bubble');
    this.secondBubble.classList.add('slider-block__bubble');
    this.slider.classList.add('js-slider');
    this.scale.classList.add('js-slider-block__scale');
    this.firstHandle.classList.add('js-slider-block__handle');
    this.secondHandle.classList.add('js-slider-block__handle');
    this.firstBubble.classList.add('js-slider-block__bubble');
    this.secondBubble.classList.add('js-slider-block__bubble');
    this.firstHandle.append(this.firstBubble);
    this.secondHandle.append(this.secondBubble);
    this.slider.append(this.scale);
    this.slider.append(this.firstHandle);
    this.slider.append(this.secondHandle);
    return this.slider;
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
    const scaleClassDirection = 'slider-block__scale_vertical';
    const handleClassDirection = 'slider-block__handle_vertical';
    const bubbleClassDirection = 'slider-block__bubble_vertical';

    if (this.model.verticalScale) {
      this.scale.classList.add(scaleClassDirection);
      this.firstHandle.classList.add(handleClassDirection);
      this.secondHandle.classList.add(handleClassDirection);
      this.firstBubble.classList.add(bubbleClassDirection);
      this.secondBubble.classList.add(bubbleClassDirection);
      this.firstHandle.style.left = '';
      this.secondHandle.style.left = '';
    } else {
      this.scale.classList.remove(scaleClassDirection);
      this.firstHandle.classList.remove(handleClassDirection);
      this.secondHandle.classList.remove(handleClassDirection);
      this.firstBubble.classList.remove(bubbleClassDirection);
      this.secondBubble.classList.remove(bubbleClassDirection);
      this.firstHandle.style.top = '';
      this.secondHandle.style.top = '';
    }
  }

  private onChange(): void {
    this.firstHandle.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.secondHandle.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.scale.addEventListener('mousedown', this.moveHandeltoScaleClick.bind(this));
  }

  private onMouseDown(event: MouseEvent): void {
    const findClosest = event.target as HTMLElement;
    this.target = findClosest.closest('.js-slider-block__handle');
    this.mousemove = true;
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  private moveHandeltoScaleClick(event: MouseEvent): void {
    this.target = event.target as HTMLElement;
    const coordinate = this.model.verticalScale
      ? event.clientY
      : event.clientX;
    const value = this.calculateValue(coordinate);
    const property = this.chooseHandlerForUpdate(this.target, coordinate);
    this.mediator.notify({ [property]: value });
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.mousemove) {
      const coordinate = this.model.verticalScale
        ? event.clientY
        : event.clientX;
      const value = this.calculateValue(coordinate);
      const property = this.chooseHandlerForUpdate(this.target, coordinate);
      this.mediator.notify({ [property]: value });
    }
  }

  private onMouseUp(): void {
    this.mousemove = false;
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
