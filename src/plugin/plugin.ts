/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import Presenter from './Presenter/Presenter';
import Model from './Model/Model';
import View from './View/View';
import { Slider, ExternalOption } from './interfaces';

declare global {
  interface JQuery {
    sliderPlugin(options?: Slider | ExternalOption): JQuery;
  }
}

(function ($): void {
  $.fn.sliderPlugin = function (options): JQuery {
    const $this = this;
    const eventUpdate = $.Event('eventUpdate');
    const isInitialised = $this.data('isInitialised');
    const getOptions = isInitialised && !options;
    const setOptions = isInitialised && options;

    if (!isInitialised) {
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
      const $finalOptions = $.extend({}, defaultOptions, this.data('options'), options);
      const [elements] = this;
      const model = new Model($finalOptions);
      const view = new View(elements, model);
      const presenter = new Presenter(model, view);
      $this.data('presenter', presenter);
      $this.data('isInitialised', true);
      $this.trigger(eventUpdate);
    }

    if (getOptions) {
      return $this.data('presenter').model.modelOptions;
    }

    if (setOptions) {
      $this.data('presenter').update(options, 'newOptions');
      $this.trigger(eventUpdate);
    }
    return this;
  };
}(jQuery));
