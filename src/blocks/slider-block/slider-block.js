import $ from 'jquery';

class Slider {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.sliderPlugin(this.element, this.element.data());
  }
}

export default Slider;
