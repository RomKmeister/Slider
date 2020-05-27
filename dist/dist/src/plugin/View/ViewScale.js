"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
            };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewSlider_1 = require("./ViewSlider");
var ViewScale = /** @class */ (function (_super) {
    __extends(ViewScale, _super);
    function ViewScale(element, model) {
        var _this = _super.call(this, element, model) || this;
        _this.setScaleParameters();
        return _this;
    }
    ViewScale.prototype.setScaleParameters = function () {
        this.findElements();
        this.bindEventListners();
        this.changeDirection();
    };
    ViewScale.prototype.findElements = function () {
        this.scale = this.element.querySelector('.js-slider__scale');
    };
    ViewScale.prototype.changeDirection = function () {
        var scaleClassDirection = 'slider__scale_vertical';
        if (this.model.verticalScale) {
            this.scale.classList.add(scaleClassDirection);
        }
        else {
            this.scale.classList.remove(scaleClassDirection);
        }
    };
    ViewScale.prototype.bindEventListners = function () {
        this.scale.addEventListener('mousedown', this.handleScaleClick.bind(this));
    };
    ViewScale.prototype.handleScaleClick = function (event) {
        var _a;
        var coordinate = this.model.verticalScale
            ? event.clientY
            : event.clientX;
        var value = this.calculateValue(coordinate);
        var property = this.chooseHandlerForUpdate(value);
        this.mediator.notify((_a = {}, _a[property] = value, _a));
    };
    ViewScale.prototype.chooseHandlerForUpdate = function (value) {
        var name = this.model.firstValueArea >= value ? 'firstValue' : 'secondValue';
        return name;
    };
    return ViewScale;
}(ViewSlider_1.default));
exports.default = ViewScale;
