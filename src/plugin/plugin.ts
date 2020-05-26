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
      minvalue: minValue,
      maxvalue: maxValue,
      firstvalue: firstValue,
      issecondvaluevisible: isSecondValueVisible,
      secondvalue: secondValue,
      step,
      isvertical: isVertical,
      isbubblevisible: isBubbleVisible,
      isscalestepsvisible: isScaleStepsVisible,
    } = this.data();

    const options = {
      minValue,
      maxValue,
      firstValue,
      isSecondValueVisible,
      secondValue,
      step,
      isVertical,
      isBubbleVisible,
      isScaleStepsVisible,
    };

    const defaultOptions = {
      minValue: 0,
      maxValue: 100,
      firstValue: 55,
      isSecondValueVisible: true,
      secondValue: 70,
      step: 1,
      isVertical: false,
      isBubbleVisible: true,
      isScaleStepsVisible: true,
    };
    const $finalOptions = $.extend({}, defaultOptions, options);
    const [elements] = this;
    const model = new Model($finalOptions);
    const viewSlider = new ViewSlider(elements, model);
    const viewPanel = new ViewPanel(elements, model);
    new Presenter(model, viewSlider, viewPanel);
  };
}(jQuery));
