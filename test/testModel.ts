import { expect } from 'chai';
import Model from '../src/plugin/Model/Model';
import * as sinon from 'sinon';

describe('Model', () => {
  let model;
  let options;
  beforeEach(() => {
    options = {
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: false,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    };

    model = new Model();
    model.setModelParameters = function (options: Slider): void {
      const newOpt = this.validate(options);
      Object.assign(this, newOpt);
      this.calculateRatios();
    }
    model.setModelParameters(options);
  }
  it('FirstValue should be less than maxValueScale', () => {
    options = {firstValue: 150};
    model.setModelParameters(options);
    expect(model.firstValue).to.deep.equal(100)
  });

  it('FirstValue should be more than minValueScale', () => {
    options = {firstValue: -15};
    model.setModelParameters(options);
    expect(model.firstValue).to.deep.equal(0)
  });

  it('FirstValue should be less than secondValue if that visible', () => {
    options = {firstValue: 85,
    showSecondValue: true};
    model.setModelParameters(options);
    expect(model.firstValue).to.deep.equal(69)
  });

  it('SecondValue should be less than maxValueScale', () => {
    options = {secondValue: 200};
    model.setModelParameters(options);
    expect(model.secondValue).to.deep.equal(100)
  });

  it('SecondValue should be more than firstValue', () => {
    options = {secondValue: 50};
    model.setModelParameters(options);
    expect(model.secondValue).to.deep.equal(56)
  });
});
