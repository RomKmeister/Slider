"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = require("jquery");
jquery_1.default(document).ready(function () {
    var $slider = jquery_1.default('.js-slider-block');
    $slider.each(function (index, item) {
        jquery_1.default(item).sliderPlugin(jquery_1.default(_this), {
            minValueScale: jquery_1.default(_this).data('minvaluescale'),
            maxValueScale: jquery_1.default(_this).data('maxvaluescale'),
            firstValue: jquery_1.default(_this).data('firstvalue'),
            showSecondValue: jquery_1.default(_this).data('showsecondvalue'),
            secondValue: jquery_1.default(_this).data('secondvalue'),
            step: jquery_1.default(_this).data('step'),
            verticalScale: jquery_1.default(_this).data('verticalscale'),
            showBubble: jquery_1.default(_this).data('showbubble'),
        });
    });
});
