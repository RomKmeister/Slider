import Model from '../Model/Model';
import ViewSlider from './ViewSlider';

class ViewScale extends ViewSlider {
  model: Model;

  element: HTMLElement;

  scale: HTMLElement;

  scaleLength: number;

  scalePosition: number;

  mousemove: boolean;

  newhandleHandleMouseMove: any;

  bindedHandleHandleMouseMove: any;

  target: HTMLElement;

  constructor(element: HTMLElement, model: Model) {
    super(element, model);
    this.setScaleParameters();
  }

  setScaleParameters(): void {
    this.findElements();
    this.bindEventListners();
    this.changeDirection();
  }

  private findElements(): void {
    this.scale = this.element.querySelector('.js-slider__scale');
  }

  private changeDirection(): void {
    const scaleClassDirection = 'slider__scale_vertical';

    if (this.model.verticalScale) {
      this.scale.classList.add(scaleClassDirection);
    } else {
      this.scale.classList.remove(scaleClassDirection);
    }
  }

  private bindEventListners(): void {
    this.scale.addEventListener('mousedown', this.handleScaleClick.bind(this));
  }

  private handleScaleClick(event: MouseEvent): void {
    const coordinate = this.model.verticalScale
      ? event.clientY
      : event.clientX;
    const value = this.calculateValue(coordinate);
    const property = this.chooseHandlerForUpdate(value);
    this.mediator.notify({ [property]: value });
  }

  private chooseHandlerForUpdate(value: number): string {
    const name = this.model.firstValueArea >= value ? 'firstValue' : 'secondValue';
    return name;
  }
}

export default ViewScale;
