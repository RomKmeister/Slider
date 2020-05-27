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
var ViewBubbles = /** @class */ (function (_super) {
    __extends(ViewBubbles, _super);
    function ViewBubbles(element, model) {
        var _this = _super.call(this, element, model) || this;
        _this.setBubbleParameters();
        return _this;
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
}(ViewSlider_1.default));
exports.default = ViewBubbles;
