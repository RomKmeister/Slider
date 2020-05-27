"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewScale = /** @class */ (function () {
    function ViewScale(element, model) {
        this.element = element;
        this.model = model;
        this.findElements();
        this.bindEventListners();
        this.changeDirection();
        this.getScaleSizes();
    }
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
        var value = this.view.calculateValue(coordinate);
        var property = 'firstValue';
        this.view.newValue((_a = {}, _a[property] = value, _a));
    };
    ViewScale.prototype.getScaleSizes = function () {
        this.scaleLength = this.model.verticalScale
            ? this.scale.clientHeight
            : this.scale.clientWidth;
        this.scalePosition = this.model.verticalScale
            ? this.scale.getBoundingClientRect().top
            : this.scale.getBoundingClientRect().left;
    };
    ViewScale.prototype.setCalc = function (view) {
        this.view = view;
    };
    return ViewScale;
}());
exports.default = ViewScale;
