"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ViewSlider_1 = require("../src/ViewSlider/ViewSlider");
var Model_1 = require("../src/Model/Model");
describe('ViewSlider', function () {
    var slider;
    var sliderWithAllFalse;
    beforeEach(function () {
        slider = new ViewSlider_1.default(new Model_1.default({
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: true,
            secondValue: 70,
            step: 1,
            verticalScale: true,
            showBubble: true,
        }));
        sliderWithAllFalse = new ViewSlider_1.default(new Model_1.default({
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: false,
            secondValue: 70,
            step: 1,
            verticalScale: false,
            showBubble: false,
        }));
    });
    it('Creates slider', function () {
        chai_1.expect(slider.slider.className).to.equal('slider-block__slider js-slider');
        chai_1.expect(slider.slider.querySelectorAll('.js-slider-block__scale').length).to.equal(1);
        chai_1.expect(slider.slider.querySelectorAll('.js-slider-block__handle').length).to.equal(2);
        chai_1.expect(slider.slider.querySelectorAll('.js-slider-block__bubble').length).to.equal(2);
    });
    it('Should set horisontal handles position', function () {
        chai_1.expect(sliderWithAllFalse.firstHandle.style.left).to.deep.equal('55%');
        chai_1.expect(sliderWithAllFalse.secondHandle.style.left).to.deep.equal('70%');
    });
    it('Should set vertical handles position', function () {
        chai_1.expect(slider.firstHandle.style.top).to.deep.equal('55%');
        chai_1.expect(slider.secondHandle.style.top).to.deep.equal('70%');
    });
    it('Should set show second handle', function () {
        chai_1.expect(slider.secondHandle.style.display).to.deep.equal('block');
    });
    it('Should set hide second handle', function () {
        chai_1.expect(sliderWithAllFalse.secondHandle.style.display).to.deep.equal('none');
    });
    it('Should set bubble value', function () {
        chai_1.expect(slider.firstBubble.textContent).to.deep.equal('55');
        chai_1.expect(slider.secondBubble.textContent).to.deep.equal('70');
    });
    it('Should show bubbles', function () {
        chai_1.expect(slider.firstBubble.style.display).to.deep.equal('block');
        chai_1.expect(slider.secondBubble.style.display).to.deep.equal('block');
    });
    it('Should hide bubbles', function () {
        chai_1.expect(sliderWithAllFalse.firstBubble.style.display).to.deep.equal('none');
        chai_1.expect(sliderWithAllFalse.secondBubble.style.display).to.deep.equal('none');
    });
    it('Should set horisontal scale', function () {
        chai_1.expect(sliderWithAllFalse.scale.className).to.deep.equal('slider-block__scale js-slider-block__scale');
    });
    it('Should set vertical scale', function () {
        chai_1.expect(slider.scale.className).to.deep.equal('slider-block__scale js-slider-block__scale slider-block__scale_vertical');
    });
});
