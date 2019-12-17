import Model from '../Model/Model';
import Presenter from '../Presenter/Presenter';

class ViewSlider {
  model: Model;

  mediator: Presenter;

  handles: any;

  slider: HTMLElement;

  scale: HTMLElement;

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
    this.onChange();
  }

  setMediator(mediator: Presenter): void {
    this.mediator = mediator;
  }

  render(): HTMLElement {
    this.slider = document.createElement('div');
    this.scale = document.createElement('div');
    this.firstHandle = document.createElement('div');
    this.secondHandle = document.createElement('div');
    this.firstBubble = document.createElement('div');
    this.secondBubble = document.createElement('div');
    this.slider.classList.add('slider');
    this.scale.classList.add('slider__scale');
    this.firstHandle.classList.add('slider__handle');
    this.secondHandle.classList.add('slider__handle');
    this.firstBubble.classList.add('slider__bubble');
    this.secondBubble.classList.add('slider__bubble');
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
    const scaleLength = this.model.maxValueScale - this.model.minValueScale;
    const firstHandlerPosition = (this.model.firstValue * 100) / (scaleLength);
    const secondHandlerPosition = (this.model.secondValue * 100) / (scaleLength);

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
    this.secondHandle.style.display = this.model.showSecondValue
      ? 'block'
      : 'none';
  }

  private showBubble(): void {
    this.firstBubble.style.display = this.model.showBubble
      ? 'block'
      : 'none';
    this.secondBubble.style.display = this.model.showBubble
      ? 'block'
      : 'none';
  }

  private changeDirection(): void {
    const classDirection = 'slider__scale_vertical';
    if (this.model.verticalScale) {
      this.scale.classList.add(classDirection);
      this.firstHandle.style.left = '0';
      this.secondHandle.style.left = '0';
    } else {
      this.scale.classList.remove(classDirection);
      this.firstHandle.style.top = '0';
      this.secondHandle.style.top = '0';
    }
  }

  private onChange(): void {
    this.slider.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.scale.addEventListener('mousedown', this.moveHandeltoScaleClick.bind(this));
  }

  private onMouseDown(event: MouseEvent): void {
    this.target = event.target.closest('.slider__handle');
    this.mousemove = true;
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  private moveHandeltoScaleClick(event: MouseEvent): void {
    this.target = event.target;
    const coordinate = this.model.verticalScale
      ? event.clientY
      : event.clientX;
    const value = this.calculateValue(coordinate);
    const property = this.chooseHandlerForUpdate(this.target, coordinate);
    this.mediator.notify(property, value);
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.mousemove) {
      const coordinate = this.model.verticalScale
        ? event.clientY
        : event.clientX;
      const value = this.calculateValue(coordinate);
      const property = this.chooseHandlerForUpdate(this.target, coordinate);
      this.mediator.notify(property, value);
    }
  }

  private onMouseUp(): void {
    this.mousemove = false;
  }

  private chooseHandlerForUpdate(target: HTMLElement, coordinate: number): string {
    if (target === this.firstHandle) {
      return 'firstValue';
    }
    if (target === this.secondHandle) {
      return 'secondValue';
    }
    if (target === this.scale) {
      const intervalBetweenHandles = this.secondHandle.offsetLeft- this.firstHandle.offsetLeft;
      const handleArea = this.firstHandle.offsetLeft + intervalBetweenHandles / 2;
      if (coordinate < handleArea) {
        return 'firstValue';
      }
      if (coordinate >= handleArea) {
        return 'secondValue';
      }
    }
  }

  private calculateValue(coordinate: number): number {
    const scaleGrade = this.model.maxValueScale - this.model.minValueScale;
    const scaleLength = this.model.verticalScale
      ? this.scale.clientHeight
      : this.scale.clientWidth;
    const scalePosition = this.model.verticalScale
      ? this.scale.getBoundingClientRect().top
      : this.scale.getBoundingClientRect().left;
    let value = Math.round(((coordinate - scalePosition) / this.model.step) / (scaleLength / scaleGrade)) * this.model.step;
    return value;
  }
}

export default ViewSlider;
