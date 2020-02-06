import Presenter from '../Presenter/Presenter';

declare global {
  interface JQuery {
    sliderPlugin(options: any): void;
  }
}

(function ($): void {
  $.fn.sliderPlugin = function (options): void {
    const defaultOptions = {
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: false,
      showBubble: true,
    };
    console.log(options);
    const finalOptions = $.extend({}, defaultOptions, options);
    const presenter = new Presenter(finalOptions);

    $(this).append(presenter.showSlider(), presenter.showPanel());
  };
}(jQuery));
