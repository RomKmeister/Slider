"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Presenter_1 = require("../src/Presenter/Presenter");
describe('Slider', function () {
    it('FirstValue should be less than maxValueScale', function () {
        var presenter = new Presenter_1.default({
            minValueScale: 0,
            maxValueScale: 100,
            firstValue: 55,
            showSecondValue: false,
            secondValue: 70,
            step: 1,
            verticalScale: true,
            showBubble: true,
        });
        presenter.notify({ 'firstValue': 50 });
        chai_1.expect(presenter.model.firstValue).to.deep.equal(50);
        chai_1.expect(presenter.viewSlider.model.firstValue).to.deep.equal(50);
        chai_1.expect(presenter.viewPanel.model.firstValue).to.deep.equal(50);
    });
});
