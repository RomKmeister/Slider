import { expect } from 'chai';
import ModelCorrection from '../src/plugin/Model/ModelCorrection';
import { BaseOptions } from '../src/plugin/interfaces';

describe('Model Corrections', () => {
  let model: any;
  let options: BaseOptions;
  let testOptions: any;
  beforeEach(() => {
    options = {
      minValue: 0,
      maxValue: 100,
      firstValue: 55,
      isSecondValueVisible: false,
      secondValue: 70,
      step: 1,
      isVertical: true,
      isBubbleVisible: true,
      isScaleStepsVisible: true,
    };

    model = new ModelCorrection();
  });

  it('Should set the step to 1', () => {
    options = { ...options, step: 0 };
    testOptions = model.setModelParameters(options);
    expect(testOptions.step).to.deep.equal(1);
  });

  it('Should set the scale more than the step', () => {
    options = {
      ...options, minValue: 10, maxValue: 0, step: 5,
    };
    testOptions = model.setModelParameters(options);
    expect(testOptions.maxValue).to.deep.equal(15);
  });

  it('Should decrease the first value to the max value', () => {
    options = { ...options, firstValue: 150 };
    testOptions = model.setModelParameters(options);
    expect(testOptions.firstValue).to.deep.equal(100);
  });

  it('Should increase the first value to the min value', () => {
    options = { ...options, firstValue: -15 };
    testOptions = model.setModelParameters(options);
    expect(testOptions.firstValue).to.deep.equal(0);
  });

  it('Should set the first value and the step less the second value if it visible', () => {
    model.setModelParameters(options);
    options = { ...options, ...{ firstValue: 70, isSecondValueVisible: true } };
    testOptions = model.setModelParameters(options);
    expect(testOptions.firstValue).to.deep.equal(70);
  });

  it('Should decrease the second value to the max', () => {
    options = { ...options, ...{ secondValue: 200, isSecondValueVisible: true } };
    testOptions = model.setModelParameters(options);
    expect(testOptions.secondValue).to.deep.equal(100);
  });

  it('Should set the second value bigger than the first value', () => {
    model.setModelParameters(options);
    options = { ...options, secondValue: 50 };
    testOptions = model.setModelParameters(options);
    expect(testOptions.secondValue).to.deep.equal(56);
  });
});