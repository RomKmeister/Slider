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
    this.render();
    this.slider = document.querySelector('.slider');
    this.scale = document.querySelector('.slider__scale');
    this.handles = document.querySelectorAll('.slider__handle');
    this.bubbles = document.querySelectorAll('.slider__bubble');
    this.onChange();
  }

  setMediator(mediator: Presenter): void {
    this.mediator = mediator;
  }

  render(): void {
    const slider = document.createElement('div');
    const scale = document.createElement('div');
    const firstHandle = document.createElement('div');
    const secondHandle = document.createElement('div');
    const firstBubble = document.createElement('div');
    const secondBubble = document.createElement('div');
    slider.classList.add('slider');
    scale.classList.add('slider__scale');
    firstHandle.classList.add('slider__handle');
    secondHandle.classList.add('slider__handle');
    firstBubble.classList.add('slider__bubble');
    secondBubble.classList.add('slider__bubble');
    firstHandle.append(firstBubble);
    secondHandle.append(secondBubble);
    slider.append(scale);
    slider.append(firstHandle);
    slider.append(secondHandle);
    document.body.append(slider);
  }

  setSliderParameters(): void {
    this.setHandlesPosition();
    this.showSecondHandler();
    this.setBubbleValue();
    this.showBubble();
    this.changeDirection();
  }

  private setHandlesPosition(): void {
    [this.firstHandle, this.secondHandle] = this.handles;
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
    [this.firstBubble, this.secondBubble] = this.bubbles;
    this.firstBubble.textContent = String(Math.round(this.model.firstValue));
    this.secondBubble.textContent = String(Math.round(this.model.secondValue));
  }

  private showSecondHandler(): void {
    this.secondHandle.style.display = this.model.showSecondValue
      ? 'block'
      : 'none';
  }

  private showBubble(): void {
    this.bubbles.forEach((item: HTMLElement) => {
      item.style.display = this.model.showBubble
        ? 'block'
        : 'none';
    });
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
