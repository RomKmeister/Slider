import { expect } from 'chai';
import * as sinon from 'sinon';
import View from '../src/plugin/View/View';
import { ExtendedOptions } from '../src/plugin/interfaces';

describe('View', () => {
  let options: ExtendedOptions;
  let view: View;
  beforeEach(() => {
    const element = document.createElement('div');
    element.classList.add('js-slider-block');
    // eslint-disable-next-line max-len
    element.insertAdjacentHTML('afterbegin',
      `<div class="js-slider">
        <div class="js-slider__scale" style="width:1200px"></div>
        <div class="js-slider__runner"></div>
      </div>`);

    options = {
      minValue: 0,
      maxValue: 100,
      firstValue: 55,
      isSecondValueVisible: true,
      secondValue: 70,
      step: 1,
      isVertical: false,
      isBubbleVisible: true,
      isScaleStepsVisible: true,
      range: 100,
      firstValueRatio: 55,
      secondValueRatio: 70,
      firstValueArea:62.5,
    };
    view = new View(element);
    sinon.stub(view, 'getScaleSizes' as any).callsFake(() => {
      view.scaleLength = 1200;
      view.scalePosition = 0;
    });
  });

  it('Should create the second runner and the bubbles ', () => {
    options.isSecondValueVisible = true;
    options.isBubbleVisible = true;
    view.setParameters(options);
    expect(view.secondRunnerElement).to.not.equal(null);
    expect(view.firstBubble).to.not.equal(null);
    expect(view.secondBubble).to.not.equal(null);
  });

  it('Should create the first bubble', () => {
    options.isSecondValueVisible = false;
    options.isBubbleVisible = true;
    view.setParameters(options);
    expect(view.firstBubble).to.not.equal(null);
  });

  it('Should remove the second runner and the bubbles', () => {
    options.isSecondValueVisible = false;
    options.isBubbleVisible = false;
    view.setParameters(options);
    expect(view.secondRunnerElement).to.be.undefined;
    expect(view.firstBubble).to.be.undefined;
    expect(view.secondBubble).to.be.undefined;
  });

  it('Should set the parameters at the slider elements', () => {
    options.isBubbleVisible = true;
    view.setParameters(options);
    const spyScale = sinon.spy(view.scaleView, 'setParameters');
    const spyRunner = sinon.spy(view.firstRunner, 'setParameters');
    const spyBubble = sinon.spy(view.firstBubble, 'setParameters');
    view.setParameters(options);
    expect(spyScale.called).to.equal(true);
    expect(spyRunner.called).to.equal(true);
    expect(spyBubble.called).to.equal(true);
  });

  it('Should calculate new ratio and choose target for update', () => {
    const spy = sinon.spy(view.eventEmitter, 'notify');
    const newOption = { firstValueRatio: 10 };
    view.setParameters(options);
    view.update({ target: 0, coordinate: 120 }, 'runnerMoved');
    view.update({ target: 'scale', coordinate: 120 }, 'scaleClicked');
    expect(spy.getCall(0).args[0]).to.deep.equal(newOption);
    expect(spy.getCall(1).args[0]).to.deep.equal(newOption);
    expect(spy.getCall(0).args[1]).to.equal('viewUpdated');
  });
});
