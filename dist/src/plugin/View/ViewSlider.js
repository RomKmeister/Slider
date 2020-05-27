"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseComponent_1 = require("../BaseComponent/BaseComponent");
var ViewSlider = /** @class */ (function (_super) {
    __extends(ViewSlider, _super);
    function ViewSlider(element, model) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.model = model;
        return _this;
    }
    ViewSlider.prototype.getScaleSizes = function () {
        this.scale = this.element.querySelector('.js-slider__scale');
        this.scaleLength = this.model.verticalScale
            ? this.scale.clientHeight
            : this.scale.clientWidth;
        this.scalePosition = this.model.verticalScale
            ? this.scale.getBoundingClientRect().top
            : this.scale.getBoundingClientRect().left;
    };
    ViewSlider.prototype.calculateValue = function (coordinate) {
        this.getScaleSizes();
        var step = this.model.step > 1 ? this.model.step : 0.01;
        var value = this.model.minValueScale
            + Math.round(((coordinate - this.scalePosition) / step)
                / (this.scaleLength / this.model.modelScaleLength)) * step;
        return value;
    };
    return ViewSlider;
}(BaseComponent_1.default));
exports.default = ViewSlider;
