import $ from 'jquery';

class Slider {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.sliderPlugin(
      this.element, {
        minValueScale: $(this).data('minvaluescale'),
        maxValueScale: $(this).data('maxvaluescale'),
        firstValue: $(this).data('firstvalue'),
        showSecondValue: $(this).data('showsecondvalue'),
        secondValue: $(this).data('secondvalue'),
        step: $(this).data('step'),
        verticalScale: $(this).data('verticalscale'),
        showBubble: $(this).data('showbubble'),
      }
    );
  }
}

export default Slider;
