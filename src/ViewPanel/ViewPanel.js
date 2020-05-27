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
var ViewPanel = /** @class */ (function (_super) {
    __extends(ViewPanel, _super);
    function ViewPanel(item, model) {
        var _this = _super.call(this) || this;
        _this.element = item;
        _this.model = model;
        _this.setPanelParameters();
        _this.formChange();
        return _this;
    }
    ViewPanel.prototype.findElements = function () {
        this.panel = this.element.querySelector('.js-panel');
        this.inputs = this.panel.querySelectorAll('.js-input__field');
    };
    ViewPanel.prototype.setPanelParameters = function () {
        this.findElements();
        var _a = this.inputs, minValueScale = _a[0], maxValueScale = _a[1], firstValue = _a[2], showSecondValue = _a[3], secondValue = _a[4], step = _a[5], verticalScale = _a[6], showBubble = _a[7];
        minValueScale.value = Math.round(this.model.minValueScale);
        maxValueScale.value = Math.round(this.model.maxValueScale);
        firstValue.value = Math.round(this.model.firstValue);
        showSecondValue.checked = this.model.showSecondValue;
        secondValue.value = Math.round(this.model.secondValue);
        step.value = Math.round(this.model.step);
        verticalScale.checked = this.model.verticalScale;
        showBubble.checked = this.model.showBubble;
    };
    ViewPanel.prototype.render = function () {
        this.panel = document.createElement('form');
        this.panel.classList.add('slider-block__panel');
        this.panel.classList.add('js-slider-block__panel');
        return this.panel;
    };
    ViewPanel.prototype.formChange = function () {
        var _this = this;
        this.inputs.forEach(function (item) {
            item.addEventListener('change', _this.handleInpitChange.bind(_this));
        });
    };
    ViewPanel.prototype.handleInpitChange = function (event) {
        var _a;
        var target = event.target;
        var elementName = target.name;
        var elementValue = target.type === 'text' ? Number(target.value) : target.checked;
        this.mediator.notify((_a = {}, _a[elementName] = elementValue, _a));
    };
    return ViewPanel;
}(BaseComponent_1.default));
exports.default = ViewPanel;
