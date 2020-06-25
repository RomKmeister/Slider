/* eslint-disable max-len */
import { expect } from 'chai';
import * as sinon from 'sinon';
import View from '../src/plugin/View/View';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';

describe('view', () => {
  let options: Slider;
  let view: any;
  let model: Model;
  beforeEach(() => {
    const sandbox = sinon.createSandbox();
    const element = document.createElement('div');
    element.classList.add('js-slider-block');
    element.insertAdjacentHTML('afterbegin', '<div class="js-slider"><div class="js-slider__scale" style="width:1200px"></div><div class="js-slider__handle"><div class="js-slider__bubble"></div></div><div class="js-slider__handle"><div class="js-slider__bubble"></div></div>');

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
    sandbox.spy(view.viewScale, 'setDirection');
    sandbox.spy(view.viewHandles, 'setHandlersParameters');
    sandbox.spy(view.viewBubbles, 'setBubbleParameters');
    sandbox.spy(view.eventEmitter, 'notify');
    sandbox.stub(view, 'getScaleSizes').callsFake(() => {
      view.scaleLength = 1200;
      view.scalePosition = 0;
    });
  });

  it('Should set the parameters at the slider elements', () => {
    view.setViewParameters();
    expect(view.viewScale.setDirection.called).to.deep.equal(true);
    expect(view.viewHandles.setHandlersParameters.called).to.deep.equal(true);
    expect(view.viewBubbles.setBubbleParameters.called).to.deep.equal(true);
  });

  it('Should set the first value as name and 10 as value', () => {
    view.update({ target: 'firstValue', newCoordinate: 120 }, 'handlerPositionChanged');
    let newOption = { ...view.model.options, firstValue: 10 };
    expect(view.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOption);
    expect(view.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('viewUpdated');

    view.update({ target: 'scale', newCoordinate: 120 }, 'scaleClicked');
    newOption = { ...view.model.options, firstValue: 10 };
    expect(view.eventEmitter.notify.getCall(1).args[0]).to.deep.equal(newOption);
  });

  it('Should set the second value as name and 80 as value', () => {
    view.update({ target: 'secondValue', newCoordinate: 960 }, 'handlerPositionChanged');
    let newOption = { ...view.model.options, secondValue: 80 };
    expect(view.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOption);
    expect(view.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('viewUpdated');

    view.update({ target: 'scale', newCoordinate: 960 }, 'scaleClicked');
    newOption = { ...view.model.options, secondValue: 80 };
    expect(view.eventEmitter.notify.getCall(1).args[0]).to.deep.equal(newOption);
  });
});
