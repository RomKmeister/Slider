import { expect } from 'chai';
import * as sinon from 'sinon';
import RunnerView from '../src/plugin/View/RunnerView/RunnerView';

describe('Runner View', () => {
  let runnerView: RunnerView;
  let testElement: HTMLElement;
  beforeEach(() => {
    const element = document.createElement('div');
    element.classList.add('js-slider__runner');
    runnerView = new RunnerView(element);
    testElement = runnerView.element;
  });

  it('Should set the horizontal position of handle', () => {
    runnerView.setParameters({
      index: 0,
      ratio: 55,
      isVertical: false,
      isVisible: true,
    });
    expect(testElement.style.left).to.equal('55%');
    expect(testElement.className).to.equal('js-slider__runner');
  });

  it('Should set the vertical position of handle', () => {
    runnerView.setParameters({
      index: 0,
      ratio: 55,
      isVertical: true,
      isVisible: true,
    });
    expect(testElement.style.top).to.equal('55%');
    expect(testElement.className).to.equal('js-slider__runner slider__runner_vertical');
  });

  it('Should set the second handle ratio', () => {
    runnerView.setParameters({
      index: 1,
      ratio: 70,
      isVertical: true,
      isVisible: true,
    });
    expect(testElement.style.top).to.equal('70%');
  });

  it('Should show the handle', () => {
    runnerView.setParameters({
      index: 0,
      ratio: 55,
      isVertical: false,
      isVisible: true,
    });
    expect(testElement.className).to.equal('js-slider__runner');
  });

  it('Should hide the handle', () => {
    runnerView.setParameters({
      index: 1,
      ratio: 55,
      isVertical: false,
      isVisible: false,
    });
    expect(testElement.className).to.equal('js-slider__runner slider__runner_hidden');
  });

  it('Should send new options from the first handler to the observers', () => {
    const spy = sinon.spy(runnerView.eventEmitter, 'notify');
    runnerView.setParameters({
      index: 0,
      ratio: 55,
      isVertical: false,
      isVisible: true,
    });
    testElement.dispatchEvent(new Event('mousedown'));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
    const newCoordinate = { target: 0, coordinate: 100 };
    expect(spy.getCall(0).args[0]).to.deep.equal(newCoordinate);
    expect(spy.getCall(0).args[1]).to.equal('runnerMoved');
  });
});
