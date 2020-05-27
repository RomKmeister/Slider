"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model(_a) {
        var minValueScale = _a.minValueScale, maxValueScale = _a.maxValueScale, firstValue = _a.firstValue, showSecondValue = _a.showSecondValue, secondValue = _a.secondValue, step = _a.step, verticalScale = _a.verticalScale, showBubble = _a.showBubble;
        var _this = _super.call(this) || this;
        _this.minValueScale = minValueScale;
        _this.maxValueScale = maxValueScale;
        _this.firstValue = firstValue;
        _this.showSecondValue = showSecondValue;
        _this.secondValue = secondValue;
        _this.step = step;
        _this.verticalScale = verticalScale;
        _this.showBubble = showBubble;
        _this.setPosition();
        return _this;
    }
    Model.prototype.setPosition = function () {
        this.modelScaleLength = this.maxValueScale - this.minValueScale;
        this.firstHandlerPosition = (this.firstValue - this.minValueScale) * (100 / this.modelScaleLength);
        this.secondHandlerPosition = (this.secondValue - this.minValueScale) * (100 / this.modelScaleLength);
        this.interval = (this.secondValue - this.firstValue) / 2;
        this.firstValueArea = this.firstValue + this.interval;
    };
    Model.prototype.updateModel = function (options) {
        Object.assign(this, this.validate(options));
        this.setPosition();
    };
    Model.prototype.validate = function (newValue) {
        var isValueUnvalidate = Object.prototype.hasOwnProperty.call(newValue, 'firstValue')
            || Object.prototype.hasOwnProperty.call(newValue, 'secondValue');
        if (isValueUnvalidate) {
            var validBorders = this.checkScaleBorders(newValue);
            var validNewValue = this.showSecondValue ? this.checkHandlePosition(validBorders) : validBorders;
            return validNewValue;
        }
        return newValue;
    };
    Model.prototype.checkScaleBorders = function (newValue) {
        if (newValue.firstValue < this.minValueScale) {
            return { firstValue: this.minValueScale };
        }
        if (newValue.firstValue > this.maxValueScale) {
            return { firstValue: this.maxValueScale };
        }
        if (newValue.secondValue > this.maxValueScale) {
            return { secondValue: this.maxValueScale };
        }
        return newValue;
    };
    Model.prototype.checkHandlePosition = function (update) {
        var isFirstValueNearly = Object.prototype.hasOwnProperty.call(update, 'firstValue')
            && this.secondValue - update.firstValue <= this.step;
        var isSecondValueNearly = Object.prototype.hasOwnProperty.call(update, 'secondValue')
            && update.secondValue - this.firstValue <= this.step;
        if (isFirstValueNearly) {
            var updatedValue = {};
            updatedValue.firstValue = this.secondValue - this.step;
            return updatedValue;
        }
        if (isSecondValueNearly) {
            var updatedValue = {};
            updatedValue.secondValue = this.firstValue + this.step;
            return updatedValue;
        }
        return update;
    };
    return Model;
}(BaseComponent_1.default));
exports.default = Model;
