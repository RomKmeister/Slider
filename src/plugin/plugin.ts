/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import Presenter from './Presenter/Presenter';
import Model from './Model/Model';
import View from './View/View';
import { Slider, ExternalOption } from './interfaces';
import defaultOptions from './defaultOptions';

declare global {
  interface JQuery {
    sliderPlugin(options?: Slider | ExternalOption | string, args?: ExternalOption): JQuery;
  }
}

(function ($): void {
  $.fn.sliderPlugin = function (options, ...args): JQuery {
    const $this = this;
    const isInitialized = !options || typeof options === 'object';
    const eventUpdate = $.Event('eventUpdate');
    const plugin = {
      update(): void {
        $this.trigger(eventUpdate);
      },
    };

    if (isInitialized) {
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
