import { expect } from 'chai';
import * as sinon from 'sinon';
import Model from '../src/plugin/Model/Model';
import { BaseOptions } from '../src/plugin/interfaces';

describe('Model', () => {
  let model: Model;
  let options: BaseOptions;
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

    model = new Model(options);
  });

  it('Should get the options', () => {
    const testOptions = model.getOptions();
    expect(testOptions).to.deep.equal(model.options);
  });

  it('Should calculate the ratios', () => {
    expect(model.options.range).to.equal(100);
    expect(model.options.firstValueRatio).to.equal(55);
    expect(model.options.secondValueRatio).to.equal(70);
    expect(model.options.firstValueArea).to.equal(62.5);
  });

  it('Should send the data to the observers', () => {
    const spy = sinon.spy(model.eventEmitter, 'notify');
    model.update(model.options);
    expect(spy.getCall(0).args[0]).to.deep.equal(model.options);
    expect(spy.getCall(0).args[1]).to.equal('modelUpdated');
  });
});
