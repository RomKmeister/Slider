import Model from '../Model/Model';
import ViewSlider from './ViewSlider';

class ViewScale extends ViewSlider {
  element: HTMLElement;

  model: Model;

  scale: HTMLElement;

  scaleLength: number;

  scalePosition: number;

  mousemove: boolean;

  bindedHandleHandleMouseMove: any;

  target: HTMLElement;

  constructor(element: HTMLElement, model: Model) {
    super(element, model);
    this.initScale();
  }

  changeDirection(): void {
    const scaleClassDirection = 'slider__scale_vertical';

    if (this.model.verticalScale) {
      this.scale.classList.add(scaleClassDirection);
    } else {
      this.scale.classList.remove(scaleClassDirection);
    }
  }

  private initScale(): void {
    this.findElements();
    this.changeDirection();
    this.bindEventListners();
  }

  private findElements(): void {
    this.scale = this.element.querySelector('.js-slider__scale');
  }

  private bindEventListners(): void {
    this.scale.addEventListener('mousedown', this.handleScaleClick.bind(this));
  }

  private handleScaleClick(event: MouseEvent): void {
    const coordinate = this.model.verticalScale ? event.clientY : event.clientX;
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
