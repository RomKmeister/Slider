"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ViewPanel_1 = require("../src/ViewPanel/ViewPanel");
var Model_1 = require("../src/Model/Model");
describe('ViewPanel', function () {
    var panel;
    beforeEach(function () {
        panel = new ViewPanel_1.default(new Model_1.default({
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: true,
            secondValue: 70,
            step: 1,
            verticalScale: true,
            showBubble: true,
        }));
    });
    it('Creates panel', function () {
        chai_1.expect(panel.panel.className).to.equal('slider-block__panel js-slider-block__panel');
        chai_1.expect(panel.panel.querySelectorAll('.slider-block__input').length).to.equal(8);
    });
    it('Should set values to text inputs', function () {
        var minValueScale = panel.panel.querySelector('input[name="minValueScale"]');
        var maxValueScale = panel.panel.querySelector('input[name="maxValueScale"]');
        var firstValue = panel.panel.querySelector('input[name="firstValue"]');
        var secondValue = panel.panel.querySelector('input[name="secondValue"]');
        var step = panel.panel.querySelector('input[name="step"]');
        chai_1.expect(minValueScale.value).to.deep.equal('0');
        chai_1.expect(maxValueScale.value).to.deep.equal('100');
        chai_1.expect(firstValue.value).to.deep.equal('55');
        chai_1.expect(secondValue.value).to.deep.equal('70');
        chai_1.expect(step.value).to.deep.equal('1');
    });
    it('Should set values to checkbox inputs', function () {
        var showSecondValue = panel.panel.querySelector('input[name="showSecondValue"]');
        var verticalScale = panel.panel.querySelector('input[name="verticalScale"]');
        var showBubble = panel.panel.querySelector('input[name="showBubble"]');
        chai_1.expect(showSecondValue.checked).to.deep.equal(true);
        chai_1.expect(verticalScale.checked).to.deep.equal(true);
        chai_1.expect(showBubble.checked).to.deep.equal(true);
    });
});
