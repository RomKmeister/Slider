import BaseComponent from '../BaseComponent/BaseComponent';
import Model from '../Model/Model';

class ViewSlider extends BaseComponent {
  model: Model;

  element: HTMLElement;

  scale: HTMLElement;

  scaleLength: number;

  scalePosition: number;

  constructor(element: HTMLElement, model: Model) {
    super();
    this.element = element;
    this.model = model;
  }

  private getScaleSizes(): void {
    this.scale = this.element.querySelector('.js-slider__scale');
    this.scaleLength = this.model.verticalScale
      ? this.scale.clientHeight
      : this.scale.clientWidth;
    this.scalePosition = this.model.verticalScale
      ? this.scale.getBoundingClientRect().top
      : this.scale.getBoundingClientRect().left;
  }

  calculateValue(coordinate: number): number {
    this.getScaleSizes();
    const step = this.model.step > 1 ? this.model.step : 0.01;
    const value = this.model.minValueScale
    + Math.round(((coordinate - this.scalePosition) / step)
    / (this.scaleLength / this.model.scaleLength)) * step;
    return value;
  }
}

export default ViewSlider;
