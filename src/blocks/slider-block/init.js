"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slider_block_1 = require("./slider-block");
$(function () {
    var $slider = $('.js-slider-block');
    $slider.each(function (index, item) {
        new slider_block_1.default($(item));
    });
});
