import { expect } from 'chai';
import * as sinon from 'sinon';
import View from '../src/plugin/View/View';
import Model from '../src/plugin/Model/Model';
import { BaseOptions } from '../src/plugin/interfaces';
import RunnerView from '../src/plugin/View/RunnerView/RunnerView';
import BubbleView from '../src/plugin/View/BubbleView/BubbleView';

describe('View', () => {
  let options: BaseOptions;
  let view: View;
  let model: Model;
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
    };

    model = new Model(options);
    view = new View(element, model);
    sinon.stub(view, 'getScaleSizes' as any).callsFake(() => {
      view.scaleLength = 1200;
      view.scalePosition = 0;
    });
  });

  it('Should create the second runner and the bubbles ', () => {
    view.model.options.isSecondValueVisible = true;
    view.model.options.isBubbleVisible = true;
    view.setParameters();
    expect(view.secondRunnerElement).to.not.equal(null);
    expect(view.firstBubble).to.not.equal(null);
    expect(view.secondBubble).to.not.equal(null);
  });

  it('Should remove the second runner and the bubbles', () => {
    view.model.options.isSecondValueVisible = false;
    view.model.options.isBubbleVisible = false;
    view.setParameters();
    expect(view.secondRunnerElement).to.equal(null);
    expect(view.firstBubble).to.equal(null);
    expect(view.secondBubble).to.equal(null);
  });

  it('Should create the first bubble', () => {
    view.model.options.isSecondValueVisible = false;
    view.model.options.isBubbleVisible = true;
    view.setParameters();
    expect(view.firstBubble).to.not.equal(null);
  });

  it('Should set the parameters at the slider elements', () => {
    const spyScale = sinon.spy(view.scaleView, 'setParameters');
    const spyRunner = sinon.spy(view.firstRunner, 'setParameters');
    const spyBubble = sinon.spy(view.firstBubble, 'setParameters');
    view.setParameters();
    expect(spyScale.called).to.equal(true);
    expect(spyRunner.called).to.equal(true);
    expect(spyBubble.called).to.equal(true);
  });

  it('Should calculate new ratio and choose target for update', () => {
    const spy = sinon.spy(view.eventEmitter, 'notify');
    const newOption = { firstValueRatio: 10 };
    view.update({ target: 0, coordinate: 120 }, 'runnerMoved');
    view.update({ target: 'scale', coordinate: 120 }, 'scaleClicked');
    expect(spy.getCall(0).args[0]).to.deep.equal(newOption);
    expect(spy.getCall(1).args[0]).to.deep.equal(newOption);
    expect(spy.getCall(0).args[1]).to.equal('viewUpdated');
  });
});
