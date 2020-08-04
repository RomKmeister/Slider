import { expect } from 'chai';
import * as sinon from 'sinon';
import { Observer } from '../src/plugin/EventEmitter/EventEmitterInterfaces';
import EventEmitter from '../src/plugin/EventEmitter/EventEmitter';

describe('EventEmitter', () => {
  let eventEmitter: EventEmitter;
  let observer: Observer;
  beforeEach(() => {
    observer = {
      update(): void {}
    };
    eventEmitter = new EventEmitter();
  });

  it('Should attach observer', () => {
    const spy = sinon.spy(eventEmitter, 'attach');
    eventEmitter.attach(observer);
    expect(spy.called).to.equal(true);
  });

  it('Should detach observer', () => {
    const spy = sinon.spy(eventEmitter, 'detach');
    eventEmitter.detach(observer);
    expect(spy.called).to.equal(true);
  });
});
