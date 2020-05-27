"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ViewHandles_1 = require("../src/plugin/View/ViewHandles");
var Model_1 = require("../src/plugin/Model/Model");
describe('ViewHandles', function () {
    var viewHandles;
    var options;
    var model;
    beforeEach(function () {
        var element = document.createElement('div');
        element.insertAdjacentHTML('afterbegin', '<div class="js-slider__handle"></div><div class="js-slider__handle"></div>');
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
        viewHandles = new ViewHandles_1.default(element, model);
        viewHandles.findElements();
        viewHandles.setHandlersParameters();
    });
    it('Should find handles', function () {
        chai_1.expect(viewHandles.handles).to.exist;
    });
    it('Should set horisontal handles position', function () {
        chai_1.expect(viewHandles.firstHandle.style.left).to.deep.equal('55%');
        chai_1.expect(viewHandles.secondHandle.style.left).to.deep.equal('70%');
        chai_1.expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle');
        chai_1.expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle');
    });
    it('Should set vertical handles position', function () {
        model.verticalScale = true;
        viewHandles.setHandlersParameters();
        chai_1.expect(viewHandles.firstHandle.style.top).to.deep.equal('55%');
        chai_1.expect(viewHandles.secondHandle.style.top).to.deep.equal('70%');
        chai_1.expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle slider__handle_vertical');
        chai_1.expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle slider__handle_vertical');
    });
    it('Should set show second handle', function () {
        chai_1.expect(viewHandles.secondHandle.className).to.deep.equal('js-slider__handle');
    });
    it('Should set hide second handle', function () {
        model.showSecondValue = false;
        viewHandles.setHandlersParameters();
        chai_1.expect(viewHandles.secondHandle.className).to.deep.equal('js-slider__handle slider__handle_hidden');
    });
});
