/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import Presenter from './Presenter/Presenter';
import Model from './Model/Model';
import ViewSlider from './View/ViewSlider';
import { Slider, ModelOptions } from './interfaces';

declare global {
  interface JQuery {
    sliderPlugin(options: Slider | ModelOptions| null, method: string): void;
  }
}

(function ($): void {
  $.fn.sliderPlugin = function (options, method = 'init'): void {
    const $this = this;
    let model: Model;
    if (method === 'init') {
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
      model = new Model($finalOptions);
      const viewSlider = new ViewSlider(elements, model);
      new Presenter(model, viewSlider);
    }

    if (method === 'setData') {
      model.update(options);
    }

    function getData(): void {
      $this.data('options', model.modelOptions);
    }
    const sliderPluginUpdate = $.Event('sliderPluginUpdate');
    const pluginObserver = {
      update(): void {
        getData();
        $this.trigger(sliderPluginUpdate);
      },
    };

    model.eventEmitter.attach(pluginObserver);
    pluginObserver.update();
  };
}(jQuery));
