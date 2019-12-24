import { expect } from 'chai';
import Model from '../src/Model/Model';

describe("Slider", function() {


  it("FirstValue should be less than maxValueScale", () => {
    let model: Model = new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: false,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });
    model.updateModel("firstValue", 200);
    expect(model.firstValue).to.deep.equal(100)
  });

  it("FirstValue should be more than minValueScale", () => {
    let model: Model = new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: false,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });
    model.updateModel("firstValue", -10);
    expect(model.firstValue).to.deep.equal(0)
  });

  it("FirstValue should be less than secondValue if it visible", () => {
    let model: Model = new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });
    model.updateModel("firstValue", 200);
    expect(model.firstValue).to.deep.equal(69)
  });
  
  it("SecondValue should be less than maxValueScale", () => {
    let model: Model = new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: false,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });
    model.updateModel("secondValue", 200);
    expect(model.secondValue).to.deep.equal(100)
  });

  it("SecondValue should be more than firstValue", () => {
    let model: Model = new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });
    model.updateModel("secondValue", 50);
    expect(model.secondValue).to.deep.equal(56)
  });
});