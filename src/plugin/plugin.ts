/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import Presenter from './Presenter/Presenter';
import Model from './Model/Model';
import View from './View/View';
import { Slider, ExternalOption } from './interfaces';

declare global {
  interface JQuery {
    sliderPlugin(options?: Slider | ExternalOption | string, args?: ExternalOption): JQuery;
  }
}

(function ($): void {
  $.fn.sliderPlugin = function (options, ...args): JQuery {
    const $this = this;
    const eventUpdate = $.Event('eventUpdate');
    const isInitialized = !options || typeof options === 'object';
    const plugin = {
      update(): void {
        $this.trigger(eventUpdate);
      },
    };

    if (isInitialized) {
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
      presenter.eventEmitter.attach(plugin);
      $this.data('presenter', presenter);
      plugin.update();
      return this;
    }

    if (typeof options === 'string') {
      return $this.data('presenter')[options](...args);
    }
  };
}(jQuery));
