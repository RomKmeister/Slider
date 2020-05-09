import BaseComponent from '../BaseComponent/BaseComponent';
import Model from '../Model/Model';

class ViewSlider extends BaseComponent {
  element: HTMLElement;

  model: Model;

  scaleLength: number;

  scalePosition: number;

  constructor(element: HTMLElement) {
    super();
    this.element = element;
  }

  calculateValue(coordinate: number): number {
    this.getScaleSizes();
    const step = this.model.step > 1 ? this.model.step : 0.01;
    const value = this.model.minValueScale
    + Math.round(((coordinate - this.scalePosition) / step)
    / (this.scaleLength / this.model.scaleLength)) * step;
    return value;
  }

  private getScaleSizes(): void {
    const scale = this.element.querySelector('.js-slider__scale');
    this.scaleLength = this.model.verticalScale
      ? scale.clientHeight
      : scale.clientWidth;
    this.scalePosition = this.model.verticalScale
      ? scale.getBoundingClientRect().top
      : scale.getBoundingClientRect().left;
  }
}

export default ViewSlider;
