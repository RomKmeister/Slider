import ViewSlider from './ViewSlider';

class ViewScale extends ViewSlider {
  scale: HTMLElement;

  mousemove: boolean;

  target: HTMLElement;

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

  private handleScaleClick(event: MouseEvent): void {
    const coordinate = this.model.verticalScale ? event.clientY : event.clientX;
    const value = this.calculateValue(coordinate);
    const property = this.chooseHandlerForUpdate(value);
    const newOptions = { ...this.model, [property]: value };
    this.mediator.notify(newOptions);
  }

  private chooseHandlerForUpdate(value: number): string {
    const name = this.model.firstValueArea >= value ? 'firstValue' : 'secondValue';
    return name;
  }
}

export default ViewScale;
