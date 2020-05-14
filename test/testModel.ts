import { expect } from 'chai';
import EventEmitter from '../EventEmitter/EventEmitter';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';
import sinon = require('sinon');


describe('Model', () => {
  let model: Model;
  let options: any;
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

    model = new Model();
    sandbox.spy(model.eventEmitter, 'notify');
    model.setModelParameters(options);
  });

  it('FirstValue should be less than maxValueScale', () => {
    options = {firstValue: 150};
    model.setModelParameters(options);
    expect(model.firstValue).to.deep.equal(100);
  });

  it('FirstValue should be more than minValueScale', () => {
    options = {firstValue: -15};
    model.setModelParameters(options);
    expect(model.firstValue).to.deep.equal(0);
  });

  it('FirstValue should be less than secondValue if that visible', () => {
    options = {
      showSecondValue: true,
    };
    model.setModelParameters(options);
    options = {
      firstValue: 85,
    };
    model.setModelParameters(options);
    expect(model.firstValue).to.deep.equal(69);
  });

  it('SecondValue should be less than maxValueScale', () => {
    options = {secondValue: 200};
    model.setModelParameters(options);
    expect(model.secondValue).to.deep.equal(100);
  });

  it('SecondValue should be more than firstValue', () => {
    options = {secondValue: 50};
    model.setModelParameters(options);
    expect(model.secondValue).to.deep.equal(56);
  });

  it('Calculate ratios', () => {
    expect(model.scaleLength).to.deep.equal(100);
    expect(model.firstValueRatio).to.deep.equal(55);
    expect(model.secondValueRatio).to.deep.equal(70);
    expect(model.interval).to.deep.equal(7.5);
    expect(model.firstValueArea).to.deep.equal(62.5);
  });

  it('Set spy', () => {
    expect(model.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(model);
    expect(model.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('modelUpdated');
  });
});
