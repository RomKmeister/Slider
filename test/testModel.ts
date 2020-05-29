import { expect } from 'chai';
import * as sinon from 'sinon';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';

describe('Model', () => {
  let model: any;
  let options: Slider;
  beforeEach(() => {
    const sandbox = sinon.createSandbox();
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

    model = new Model(options);
    sandbox.spy(model.eventEmitter, 'notify');
    model.update(options);
  });

  it('Should decrease the first value to the max value', () => {
    options = { ...options, firstValue: 150 };
    model.update(options);
    expect(model.modelOptions.firstValue).to.deep.equal(100);
  });

  it('Should increase the first value to the min value', () => {
    options = { ...options, firstValue: -15 };
    model.update(options);
    expect(model.modelOptions.firstValue).to.deep.equal(0);
  });

  it('Should set the first value and the step less the second value if it visible', () => {
    options = { ...options, ...{ firstValue: 85, isSecondValueVisible: true } };
    model.update(options);
    expect(model.modelOptions.firstValue).to.deep.equal(69);
  });

  it('Should decrease the second value to the max', () => {
    options = { ...options, ...{ secondValue: 200, isSecondValueVisible: true } };
    model.update(options);
    expect(model.modelOptions.secondValue).to.deep.equal(100);
  });

  it('Should set the second value bigger than the first value', () => {
    options = { ...options, secondValue: 50 };
    model.update(options);
    expect(model.modelOptions.secondValue).to.deep.equal(56);
  });

  it('Should calculate the ratios', () => {
    expect(model.modelOptions.scaleLength).to.deep.equal(100);
    expect(model.modelOptions.firstValueRatio).to.deep.equal(55);
    expect(model.modelOptions.secondValueRatio).to.deep.equal(70);
    expect(model.modelOptions.firstValueArea).to.deep.equal(62.5);
  });

  it('Should send the data to the observers', () => {
    expect(model.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(model.modelOptions);
    expect(model.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('modelUpdated');
  });
});
