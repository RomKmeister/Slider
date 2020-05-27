"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewHandles = /** @class */ (function () {
    function ViewHandles(element, model) {
        this.element = element;
        this.model = model;
        this.findElements();
        this.setSliderParameters();
        this.bindEventListners();
    }
    ViewHandles.prototype.findElements = function () {
        var _a;
        this.handles = this.element.querySelectorAll('.js-slider__handle');
        _a = Array.from(this.handles), this.firstHandle = _a[0], this.secondHandle = _a[1];
    };
    ViewHandles.prototype.setCalc = function (view) {
        this.view = view;
    };
    ViewHandles.prototype.setSliderParameters = function () {
        this.setHandlesPosition();
        this.changeVisibility();
        this.changeDirection();
    };
    ViewHandles.prototype.setHandlesPosition = function () {
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
    ViewHandles.prototype.changeVisibility = function () {
        var handleClassVisibility = 'slider__handle_hidden';
        if (this.model.showSecondHandler) {
            this.secondHandle.classList.remove(handleClassVisibility);
        }
        else {
            this.secondHandle.classList.add(handleClassVisibility);
        }
    };
    ViewHandles.prototype.changeDirection = function () {
        var handleClassDirection = 'slider__handle_vertical';
        if (this.model.verticalScale) {
            this.handles.forEach(function (item) { return item.classList.add(handleClassDirection); });
            this.firstHandle.style.left = '';
            this.secondHandle.style.left = '';
        }
        else {
            this.handles.forEach(function (item) { return item.classList.remove(handleClassDirection); });
            this.firstHandle.style.top = '';
            this.secondHandle.style.top = '';
        }
    };
    ViewHandles.prototype.bindEventListners = function () {
        this.firstHandle.addEventListener('mousedown', this.handleDocumentMouseMove.bind(this));
        this.secondHandle.addEventListener('mousedown', this.handleDocumentMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleDocumentMouseUp.bind(this));
        this.bindedHandleHandleMouseMove = this.handleHandleMouseMove.bind(this);
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
        switch (target) {
            case this.firstHandle:
                return 'firstValue';
            case this.secondHandle:
                return 'secondValue';
            default:
                return 'firstValue';
        }
    };
    ViewHandles.prototype.handleHandleMouseMove = function (event) {
        var _a;
        var coordinate = this.model.verticalScale
            ? event.clientY
            : event.clientX;
        var value = this.view.calculateValue(coordinate);
        var property = this.chooseHandlerForUpdate(this.target);
        this.view.newValue((_a = {}, _a[property] = value, _a));
    };
    return ViewHandles;
}());
exports.default = ViewHandles;
