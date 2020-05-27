"use strict";
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
Object.defineProperty(exports, "__esModule", { value: true });
var Presenter_1 = require("../Presenter/Presenter");
(function ($) {
    $.fn.sliderPlugin = function (item, options) {
        var defaultOptions = {
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: true,
            secondValue: 70,
            step: 1,
            verticalScale: false,
            showBubble: true,
        };
        var $finalOptions = $.extend({}, defaultOptions, options);
        new Presenter_1.default(item, $finalOptions);
    };
}(jQuery));
