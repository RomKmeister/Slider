import { expect } from 'chai';
import * as sinon from 'sinon';
import Model from '../src/plugin/Model/Model';
import { BaseOptions } from '../src/plugin/interfaces';
import EventEmitter from '../src/plugin/EventEmitter/EventEmitter';

describe('EventEmitter', () => {
  let eventEmitter: EventEmitter;
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

    eventEmitter = new EventEmitter();
    model = new Model(options);
  });

  it('Should attach observer', () => {
    const spy = sinon.spy(eventEmitter, 'attach');
    eventEmitter.attach(model);
    expect(spy.called).to.equal(true);
  });

  it('Should detach observer', () => {
    const spy = sinon.spy(eventEmitter, 'detach');
    eventEmitter.detach(model);
    expect(spy.called).to.equal(true);
  });
});
