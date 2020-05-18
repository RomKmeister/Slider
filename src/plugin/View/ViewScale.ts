import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';

class ViewScale {
  element: HTMLElement;

  model: Model;

  scale: HTMLElement;

  eventEmitter: EventEmitter;

  constructor(element: HTMLElement, model: Model) {
    this.element = element;
    this.model = model;
    this.init();
  }

  setDirection(): void {
    const scaleClassDirection = 'slider__scale_vertical';

    if (this.model.modelOptions.isVertical) {
      this.scale.classList.add(scaleClassDirection);
    } else {
      this.scale.classList.remove(scaleClassDirection);
    }
  }

  private init(): void {
    this.eventEmitter = new EventEmitter();
    this.findElements();
    this.bindEventListners();
  }

  private findElements(): void {
    this.scale = this.element.querySelector('.js-slider__scale');
  }

  private bindEventListners(): void {
    this.scale.addEventListener('mousedown', this.handleScaleMouseDown.bind(this));
  }

  private handleScaleMouseDown(event: MouseEvent): void {
    const coordinate = this.model.modelOptions.isVertical ? event.clientY : event.clientX;
    const newOptions = { target: 'scale', newCoordinate: coordinate };
    this.eventEmitter.notify(newOptions, 'scaleClicked');
  }
}

export default ViewScale;
