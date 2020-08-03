import { expect } from 'chai';
import * as sinon from 'sinon';
import View from '../src/plugin/View/View';
import Model from '../src/plugin/Model/Model';
import { BaseOptions } from '../src/plugin/interfaces';

describe('View', () => {
  let options: BaseOptions;
  let view: View;
  let model: Model;
  beforeEach(() => {
    const element = document.createElement('div');
    element.classList.add('js-slider-block');
    // eslint-disable-next-line max-len
    element.insertAdjacentHTML('afterbegin', '<div class="js-slider"><div class="js-slider__scale" style="width:1200px"></div><div class="js-slider__steps"><div class="slider__step"></div></div><div class="js-slider__runner"><div class="js-slider__bubble"></div></div><div class="js-slider__runner"><div class="js-slider__bubble"></div></div>');

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

  it('Should set the parameters at the slider elements', () => {
    const spyScale = sinon.spy(view.scaleView, 'setParameters');
    const spyRunner = sinon.spy(view.runners[0], 'setParameters');
    const spyBubble = sinon.spy(view.bubbles[0], 'setParameters');
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
