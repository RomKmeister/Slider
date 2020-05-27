"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ViewBubbles_1 = require("../src/plugin/View/ViewBubbles");
var Model_1 = require("../src/plugin/Model/Model");
describe('ViewBubbles', function () {
    var viewBubbles;
    var options;
    var model;
    beforeEach(function () {
        var element = document.createElement('div');
        element.insertAdjacentHTML('afterbegin', '<div class="js-slider__bubble"></div><div class="js-slider__bubble"></div>');
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
        viewBubbles = new ViewBubbles_1.default(element, model);
        viewBubbles.findElements();
        viewBubbles.setBubbleParameters();
    });
    it('Should find bubbles', function () {
        chai_1.expect(viewBubbles.bubbles).to.exist;
    });
    it('Should set bubble value', function () {
        chai_1.expect(viewBubbles.firstBubble.textContent).to.deep.equal('55');
        chai_1.expect(viewBubbles.secondBubble.textContent).to.deep.equal('70');
    });
    it('Should show bubbles', function () {
        model.showBubble = true;
        viewBubbles.setBubbleParameters();
        chai_1.expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble slider__bubble_visible');
        chai_1.expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble slider__bubble_visible');
    });
    it('Should hide bubbles', function () {
        chai_1.expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble');
        chai_1.expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble');
    });
    it('Should set horizontal direction', function () {
        chai_1.expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble');
        chai_1.expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble');
    });
    it('Should set vertical direction', function () {
        model.verticalScale = true;
        viewBubbles.setBubbleParameters();
        chai_1.expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble slider__bubble_vertical');
        chai_1.expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble slider__bubble_vertical');
    });
});
