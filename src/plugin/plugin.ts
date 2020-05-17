/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import Presenter from './Presenter/Presenter';
import Model from './Model/Model';
import ViewSlider from './View/ViewSlider';
import ViewPanel from './View/ViewPanel';

declare global {
  interface JQuery {
    sliderPlugin(): void;
  }
}

(function ($): void {
  $.fn.sliderPlugin = function (): void {
    const {
      minvaluescale: minValueScale,
      maxvaluescale: maxValueScale,
      firstvalue: firstValue,
      showsecondvalue: showSecondValue,
      secondvalue: secondValue,
      step,
      verticalscale: verticalScale,
      showbubble: showBubble,
    } = this.data();

    const options = {
      minValueScale,
      maxValueScale,
      firstValue,
      showSecondValue,
      secondValue,
      step,
      verticalScale,
      showBubble,
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
    const [elements] = this;
    const model = new Model($finalOptions);
    const viewSlider = new ViewSlider(elements, model);
    const viewPanel = new ViewPanel(elements, model);
    new Presenter(model, viewSlider, viewPanel);
  };
}(jQuery));
