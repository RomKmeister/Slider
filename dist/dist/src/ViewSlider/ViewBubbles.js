"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBubbles = /** @class */ (function () {
    function ViewBubbles(element, model) {
        this.element = element;
        this.model = model;
        this.setBubbleParameters();
    }
    ViewBubbles.prototype.setBubbleParameters = function () {
        this.findElements();
        this.setBubbleValue();
        this.changeDirection();
        this.changeVisibility();
    };
    ViewBubbles.prototype.findElements = function () {
        var _a;
        this.bubbles = this.element.querySelectorAll('.js-slider__bubble');
        _a = Array.from(this.bubbles), this.firstBubble = _a[0], this.secondBubble = _a[1];
    };
    ViewBubbles.prototype.setBubbleValue = function () {
        this.firstBubble.textContent = String(Math.round(this.model.firstValue));
        this.secondBubble.textContent = String(Math.round(this.model.secondValue));
    };
    ViewBubbles.prototype.changeDirection = function () {
        var bubbleClassDirection = 'slider__bubble_vertical';
        if (this.model.verticalScale) {
            this.bubbles.forEach(function (item) { return item.classList.add(bubbleClassDirection); });
        }
        else {
            this.bubbles.forEach(function (item) { return item.classList.remove(bubbleClassDirection); });
        }
    };
    ViewBubbles.prototype.changeVisibility = function () {
        var bubbleClassVisibility = 'slider__bubble_visible';
        if (this.model.showBubble) {
            this.bubbles.forEach(function (item) { return item.classList.add(bubbleClassVisibility); });
        }
        else {
            this.bubbles.forEach(function (item) { return item.classList.remove(bubbleClassVisibility); });
        }
    };
    return ViewBubbles;
}());
exports.default = ViewBubbles;
