import Presenter from '../Presenter/Presenter';

(function($) {
$.fn.sliderPlugin = function (options) {

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

  const finalOptions = $.extend({}, defaultOptions, options);
  const presenter = new Presenter(finalOptions);

  $(this).append(presenter.showPanel(), presenter.showSlider());
}})(jQuery);