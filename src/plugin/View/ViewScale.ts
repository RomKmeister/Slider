import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';

class ViewScale {
  element: HTMLElement;

  model: Model;

  scale: HTMLElement;

  eventEmitter = new EventEmitter();

  constructor(element: HTMLElement, model: Model) {
    this.element = element;
    this.model = model;
    this.init();
  }

  setDirection(): void {
    const scaleClassDirection = 'slider__scale_vertical';

    if (this.model.modelOptions.verticalScale) {
      this.scale.classList.add(scaleClassDirection);
    } else {
      this.scale.classList.remove(scaleClassDirection);
    }
  }

  private init(): void {
    this.findElements();
    this.bindEventListners();
  }

  private findElements(): void {
    this.scale = this.element.querySelector('.js-slider__scale');
  }

  private bindEventListners(): void {
    this.scale.addEventListener('mousedown', this.handleScaleClick.bind(this));
  }

  private handleScaleClick(event: MouseEvent): void {
    const coordinate = this.model.modelOptions.verticalScale ? event.clientY : event.clientX;
    const newOptions = { target: 'scale', newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'scaleClicked');
  }
}

export default ViewScale;
