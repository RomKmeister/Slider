import { expect } from 'chai';
import * as sinon from 'sinon';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';
import EventEmitter from '../src/plugin/EventEmitter/EventEmitter';

describe('EventEmitter', () => {
  let eventEmitter: any;
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

    eventEmitter = new EventEmitter();
    model = new Model(options);
    sandbox.spy(eventEmitter, 'attach');
    sandbox.spy(eventEmitter, 'detach');
    eventEmitter.attach(model);
  });

  it('Should attach observer', () => {
    expect(eventEmitter.attach.called).to.deep.equal(true);
  });

  it('Should detach observer', () => {
    eventEmitter.detach(model);
    expect(eventEmitter.detach.called).to.deep.equal(true);
  });
});
