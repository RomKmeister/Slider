"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ViewScale_1 = require("../src/plugin/View/ViewScale");
var Model_1 = require("../src/plugin/Model/Model");
describe('ViewScale', function () {
    var viewScale;
    var options;
    var model;
    beforeEach(function () {
        var element = document.createElement('div');
        element.insertAdjacentHTML('afterbegin', '<div class="js-slider__scale"></div>');
        options = {
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: true,
            secondValue: 70,
            step: 1,
            verticalScale: false,
            showBubble: true,
        };
        model = new Model_1.default(options);
        viewScale = new ViewScale_1.default(element, model);
        viewScale.findElements();
    });
    it('Should find scale', function () {
        chai_1.expect(viewScale.scale).to.exist;
    });
    it('Should set horizontal scale', function () {
        viewScale.setDirection();
        chai_1.expect(viewScale.scale.className).to.equal('js-slider__scale');
    });
    it('Should set vertical scale', function () {
        model.verticalScale = true;
        viewScale.setDirection();
        chai_1.expect(viewScale.scale.className).to.equal('js-slider__scale slider__scale_vertical');
    });
});
