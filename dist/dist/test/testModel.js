"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Model_1 = require("../src/Model/Model");
describe('Slider', function () {
    it('FirstValue should be less than maxValueScale', function () {
        var model = new Model_1.default({
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: false,
            secondValue: 70,
            step: 1,
            verticalScale: true,
            showBubble: true,
        });
        model.updateModel({ 'firstValue': 150 });
        chai_1.expect(model.firstValue).to.deep.equal(100);
    });
    it('FirstValue should be more than minValueScale', function () {
        var model = new Model_1.default({
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: false,
            secondValue: 70,
            step: 1,
            verticalScale: true,
            showBubble: true,
        });
        model.updateModel({ 'firstValue': -10 });
        chai_1.expect(model.firstValue).to.deep.equal(0);
    });
    it('FirstValue should be less than secondValue if it visible', function () {
        var model = new Model_1.default({
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: true,
            secondValue: 70,
            step: 1,
            verticalScale: true,
            showBubble: true,
        });
        model.updateModel({ 'firstValue': 200 });
        chai_1.expect(model.firstValue).to.deep.equal(69);
    });
    it('SecondValue should be less than maxValueScale', function () {
        var model = new Model_1.default({
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: false,
            secondValue: 70,
            step: 1,
            verticalScale: true,
            showBubble: true,
        });
        model.updateModel({ 'secondValue': 200 });
        chai_1.expect(model.secondValue).to.deep.equal(100);
    });
    it('SecondValue should be more than firstValue', function () {
        var model = new Model_1.default({
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: true,
            secondValue: 70,
            step: 1,
            verticalScale: true,
            showBubble: true,
        });
        model.updateModel({ 'secondValue': 50 });
        chai_1.expect(model.secondValue).to.deep.equal(56);
    });
});
