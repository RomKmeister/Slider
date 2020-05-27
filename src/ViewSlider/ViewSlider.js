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
var ViewSlider = /** @class */ (function (_super) {
    __extends(ViewSlider, _super);
    function ViewSlider(item, model) {
        var _this = _super.call(this) || this;
        _this.element = item;
        _this.model = model;
        _this.setSliderParameters();
        _this.bindEventListners();
        return _this;
    }
    ViewSlider.prototype.findElements = function () {
        var _a, _b;
        this.slider = this.element.querySelector('.js-slider');
        this.scale = this.slider.querySelector('.js-slider__scale');
        _a = this.slider.querySelectorAll('.js-slider__handle'), this.firstHandle = _a[0], this.secondHandle = _a[1];
        _b = this.slider.querySelectorAll('.js-slider__bubble'), this.firstBubble = _b[0], this.secondBubble = _b[1];
        this.firstBubble.textContent = '1234';
    };
    ViewSlider.prototype.setSliderParameters = function () {
        this.findElements();
        this.setHandlesPosition();
        this.showSecondHandler();
        this.setBubbleValue();
        this.showBubble();
        this.changeDirection();
    };
    ViewSlider.prototype.setHandlesPosition = function () {
        this.scaleModelLength = this.model.maxValueScale - this.model.minValueScale;
        var firstHandlerPosition = (this.model.firstValue - this.model.minValueScale) * (100 / this.scaleModelLength);
        var secondHandlerPosition = (this.model.secondValue - this.model.minValueScale) * (100 / this.scaleModelLength);
        if (this.model.verticalScale) {
            this.firstHandle.style.top = firstHandlerPosition + "%";
            this.secondHandle.style.top = secondHandlerPosition + "%";
        }
        else {
            this.firstHandle.style.left = firstHandlerPosition + "%";
            this.secondHandle.style.left = secondHandlerPosition + "%";
        }
    };
    ViewSlider.prototype.setBubbleValue = function () {
        this.firstBubble.textContent = String(Math.round(this.model.firstValue));
        this.secondBubble.textContent = String(Math.round(this.model.secondValue));
    };
    ViewSlider.prototype.showSecondHandler = function () {
        this.secondHandle.style.display = this.toggleElement(this.model.showSecondValue);
    };
    ViewSlider.prototype.showBubble = function () {
        this.firstBubble.style.display = this.toggleElement(this.model.showBubble);
        this.secondBubble.style.display = this.toggleElement(this.model.showBubble);
    };
    ViewSlider.prototype.toggleElement = function (statement) {
        if (statement)
            return 'block';
        return 'none';
    };
    ViewSlider.prototype.changeDirection = function () {
        var scaleClassDirection = 'slider-block__scale_vertical';
        var handleClassDirection = 'slider-block__handle_vertical';
        var bubbleClassDirection = 'slider-block__bubble_vertical';
        if (this.model.verticalScale) {
            this.scale.classList.add(scaleClassDirection);
            this.firstHandle.classList.add(handleClassDirection);
            this.secondHandle.classList.add(handleClassDirection);
            this.firstBubble.classList.add(bubbleClassDirection);
            this.secondBubble.classList.add(bubbleClassDirection);
            this.firstHandle.style.left = '';
            this.secondHandle.style.left = '';
        }
        else {
            this.scale.classList.remove(scaleClassDirection);
            this.firstHandle.classList.remove(handleClassDirection);
            this.secondHandle.classList.remove(handleClassDirection);
            this.firstBubble.classList.remove(bubbleClassDirection);
            this.secondBubble.classList.remove(bubbleClassDirection);
            this.firstHandle.style.top = '';
            this.secondHandle.style.top = '';
        }
    };
    ViewSlider.prototype.bindEventListners = function () {
        this.firstHandle.addEventListener('mousedown', this.handleDocumentMouseMove.bind(this));
        this.secondHandle.addEventListener('mousedown', this.handleDocumentMouseMove.bind(this));
        this.scale.addEventListener('mousedown', this.handleScaleClick.bind(this));
        document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
        document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
        this.bindedHandleHandleMouseMove = this.handleHandleMouseMove.bind(this);
    };
    ViewSlider.prototype.handleDocumentMouseMove = function (event) {
        var findClosest = event.target;
        this.target = findClosest.closest('.js-slider-block__handle');
        document.addEventListener('mousemove', this.bindedHandleHandleMouseMove);
    };
    ViewSlider.prototype.handleDocumentMouseUp = function () {
        document.removeEventListener('mousemove', this.bindedHandleHandleMouseMove);
    };
    ViewSlider.prototype.handleScaleClick = function (event) {
        var _a;
        this.target = event.target;
        var coordinate = this.model.verticalScale
            ? event.clientY
            : event.clientX;
        var value = this.calculateValue(coordinate);
        var property = this.chooseHandlerForUpdate(this.target, coordinate);
        this.mediator.notify((_a = {}, _a[property] = value, _a));
    };
    ViewSlider.prototype.handleHandleMouseMove = function (event) {
        var _a;
        var coordinate = this.model.verticalScale
            ? event.clientY
            : event.clientX;
        var value = this.calculateValue(coordinate);
        var property = this.chooseHandlerForUpdate(this.target, coordinate);
        this.mediator.notify((_a = {}, _a[property] = value, _a));
    };
    ViewSlider.prototype.chooseHandlerForUpdate = function (target, coordinate) {
        var intervalBetweenHandles = this.secondHandle.offsetLeft - this.firstHandle.offsetLeft;
        var handleArea = this.firstHandle.offsetLeft + intervalBetweenHandles / 2;
        switch (target) {
            case this.firstHandle:
                return 'firstValue';
            case this.secondHandle:
                return 'secondValue';
            case this.scale:
                if (coordinate < handleArea) {
                    return 'firstValue';
                }
                return 'secondValue';
            default:
                return 'firstValue';
        }
    };
    ViewSlider.prototype.calculateValue = function (coordinate) {
        var scaleDomLength = this.model.verticalScale
            ? this.scale.clientHeight
            : this.scale.clientWidth;
        var scalePosition = this.model.verticalScale
            ? this.scale.getBoundingClientRect().top
            : this.scale.getBoundingClientRect().left;
        var step = this.model.step > 1 ? this.model.step : 0.01;
        var value = this.model.minValueScale
            + Math.round(((coordinate - scalePosition) / step) / (scaleDomLength / this.scaleModelLength)) * step;
        return value;
    };
    return ViewSlider;
}(BaseComponent_1.default));
exports.default = ViewSlider;
