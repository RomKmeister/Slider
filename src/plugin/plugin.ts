/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import Presenter from '../Presenter/Presenter';

declare global {
  interface JQuery {
    sliderPlugin(item: any, options: any): void;
  }
}

(function ($): void {
  $.fn.sliderPlugin = function (item, options): void {
    options = {
      minValueScale: options.minvaluescale,
      maxValueScale: options.maxvaluescale,
      firstValue: options.firstvalue,
      showSecondValue: options.showsecondvalue,
      secondValue: options.secondvalue,
      step: options.step,
      verticalScale: options.verticalscale,
      showBubble: options.showbubble,
    };
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
    const $finalOptions = $.extend({}, defaultOptions, options);
    const [elements] = item;
    new Presenter(elements, $finalOptions);
  };
}(jQuery));
