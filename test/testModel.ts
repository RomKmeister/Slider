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
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: false,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    };

    model = new Model(options);
    sandbox.spy(model.eventEmitter, 'notify');
    model.update(options);
  });

  it('FirstValue should be less than maxValueScale', () => {
    options = { ...options, firstValue: 150 };
    model.update(options);
    expect(model.modelOptions.firstValue).to.deep.equal(100);
  });

  it('FirstValue should be more than minValueScale', () => {
    options = { ...options, firstValue: -15 };
    model.update(options);
    expect(model.modelOptions.firstValue).to.deep.equal(0);
  });

  it('FirstValue should be less than secondValue if that visible', () => {
    options = { ...options, ...{ firstValue: 85, showSecondValue: true } };
    model.update(options);
    expect(model.modelOptions.firstValue).to.deep.equal(69);
  });

  it('SecondValue should be less than maxValueScale', () => {
    options = { ...options, ...{ secondValue: 200, showSecondValue: true } };
    model.update(options);
    expect(model.modelOptions.secondValue).to.deep.equal(100);
  });

  it('SecondValue should be more than firstValue', () => {
    options = { ...options, secondValue: 50 };
    model.update(options);
    expect(model.modelOptions.secondValue).to.deep.equal(56);
  });

  it('Calculate ratios', () => {
    expect(model.modelOptions.scaleLength).to.deep.equal(100);
    expect(model.modelOptions.firstValueRatio).to.deep.equal(55);
    expect(model.modelOptions.secondValueRatio).to.deep.equal(70);
    expect(model.modelOptions.firstValueArea).to.deep.equal(62.5);
  });

  it('Set spy', () => {
    expect(model.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(model);
    expect(model.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('modelUpdated');
  });
});
