import $ from 'jquery';

class Slider {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.sliderPlugin();
  }
}

export default Slider;
