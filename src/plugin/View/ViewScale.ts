import ViewSlider from './ViewSlider';
import EventEmitter from '../EventEmitter/EventEmitter';

class ViewScale extends ViewSlider {
  scale: HTMLElement;

  mousemove: boolean;

  target: HTMLElement;

  eventEmitter = new EventEmitter();

  findElements(): void {
    this.scale = this.element.querySelector('.js-slider__scale');
  }

  setDirection(): void {
    const scaleClassDirection = 'slider__scale_vertical';

    if (this.model.verticalScale) {
      this.scale.classList.add(scaleClassDirection);
    } else {
      this.scale.classList.remove(scaleClassDirection);
    }
  }

  bindEventListners(): void {
    this.scale.addEventListener('mousedown', this.handleScaleClick.bind(this));
  }

  handleScaleClick(event: MouseEvent): void {
    const coordinate = this.model.verticalScale ? event.clientY : event.clientX;
    const value = this.calculateValue(coordinate);
    const property = this.chooseHandlerForUpdate(value);
    const newOptions = { ...this.model, [property]: value };
    this.eventEmitter.notify(newOptions, 'viewUpdated');
  }

  private chooseHandlerForUpdate(value: number): string {
    const name = this.model.firstValueArea >= value ? 'firstValue' : 'secondValue';
    return name;
  }
}

export default ViewScale;
