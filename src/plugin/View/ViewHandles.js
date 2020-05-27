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
var ViewSlider_1 = require("./ViewSlider");
var ViewHandles = /** @class */ (function (_super) {
    __extends(ViewHandles, _super);
    function ViewHandles(element, model) {
        var _this = _super.call(this, element, model) || this;
        _this.setSliderParameters();
        _this.bindEventListners();
        return _this;
    }
    ViewHandles.prototype.findElements = function () {
        var _a;
        this.handles = this.element.querySelectorAll('.js-slider__handle');
        _a = Array.from(this.handles), this.firstHandle = _a[0], this.secondHandle = _a[1];
    };
    ViewHandles.prototype.setSliderParameters = function () {
        this.findElements();
        this.setHandlesPosition();
        this.changeVisibility();
        this.changeDirection();
    };
    ViewHandles.prototype.setHandlesPosition = function () {
        if (this.model.verticalScale) {
            this.firstHandle.style.top = this.model.firstHandlerPosition + "%";
            this.secondHandle.style.top = this.model.secondHandlerPosition + "%";
        }
        else {
            this.firstHandle.style.left = this.model.firstHandlerPosition + "%";
            this.secondHandle.style.left = this.model.secondHandlerPosition + "%";
        }
    };
    ViewHandles.prototype.changeVisibility = function () {
        var handleClassVisibility = 'slider__handle_hidden';
        if (this.model.showSecondValue) {
            this.secondHandle.classList.remove(handleClassVisibility);
        }
        else {
            this.secondHandle.classList.add(handleClassVisibility);
        }
    };
    ViewHandles.prototype.changeDirection = function () {
        var handleClassDirection = 'slider__handle_vertical';
        if (this.model.verticalScale) {
            this.handles.forEach(function (item) {
                item.classList.add(handleClassDirection);
                item.style.left = '';
            });
        }
        else {
            this.handles.forEach(function (item) {
                item.classList.remove(handleClassDirection);
                item.style.top = '';
            });
        }
    };
    ViewHandles.prototype.bindEventListners = function () {
        var _this = this;
        this.handles.forEach(function (item) { return item.addEventListener('mousedown', _this.handleDocumentMouseMove.bind(_this)); });
        this.bindedHandleHandleMouseMove = this.handleHandleMouseMove.bind(this);
        document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
    };
    ViewHandles.prototype.handleDocumentMouseMove = function (event) {
        var findClosest = event.target;
        this.target = findClosest.closest('.js-slider__handle');
        document.addEventListener('mousemove', this.bindedHandleHandleMouseMove);
    };
    ViewHandles.prototype.handleDocumentMouseUp = function () {
        document.removeEventListener('mousemove', this.bindedHandleHandleMouseMove);
    };
    ViewHandles.prototype.chooseHandlerForUpdate = function (target) {
        var name = target === this.firstHandle ? 'firstValue' : 'secondValue';
        return name;
    };
    ViewHandles.prototype.handleHandleMouseMove = function (event) {
        var _a;
        var coordinate = this.model.verticalScale
            ? event.clientY
            : event.clientX;
        var value = this.calculateValue(coordinate);
        var property = this.chooseHandlerForUpdate(this.target);
        this.mediator.notify((_a = {}, _a[property] = value, _a));
    };
    return ViewHandles;
}(ViewSlider_1.default));
exports.default = ViewHandles;
