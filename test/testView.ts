import { expect } from 'chai';
import * as sinon from 'sinon';
import View from '../src/plugin/View/View';
import Model from '../src/plugin/Model/Model';
import { BaseOptions } from '../src/plugin/interfaces';

describe('View', () => {
  let options: BaseOptions;
  let view: any;
  let model: Model;
  beforeEach(() => {
    const sandbox = sinon.createSandbox();
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
    sandbox.spy(view.scaleView, 'setParameters');
    sandbox.spy(view.runners[0], 'setParameters');
    sandbox.spy(view.bubbles[0], 'setParameters');
    sandbox.spy(view.eventEmitter, 'notify');
    sandbox.stub(view, 'getScaleSizes').callsFake(() => {
      view.scaleLength = 1200;
      view.scalePosition = 0;
    });
  });

  it('Should set the parameters at the slider elements', () => {
    view.setParameters();
    expect(view.scaleView.setParameters.called).to.equal(true);
    expect(view.runners[0].setParameters.called).to.equal(true);
    expect(view.bubbles[0].setParameters.called).to.equal(true);
  });
  it('Should calculate new ratio and choose target for update', () => {
    const newOption = { firstValueRatio: 10 };
    view.update({ target: 0, coordinate: 120 }, 'runnerMoved');
    view.update({ target: 'scale', coordinate: 120 }, 'scaleClicked');
    expect(view.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOption);
    expect(view.eventEmitter.notify.getCall(1).args[0]).to.deep.equal(newOption);
    expect(view.eventEmitter.notify.getCall(0).args[1]).to.equal('viewUpdated');
  });
});
