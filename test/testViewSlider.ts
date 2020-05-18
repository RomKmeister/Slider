/* eslint-disable max-len */
import { expect } from 'chai';
import * as sinon from 'sinon';
import ViewSlider from '../src/plugin/View/ViewSlider';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';

describe('ViewSlider', () => {
  let options: Slider;
  let viewSlider: any;
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
    };

    model = new Model(options);
    viewSlider = new ViewSlider(element, model);
    sandbox.spy(viewSlider.viewScale, 'setDirection');
    sandbox.spy(viewSlider.viewHandles, 'setHandlersParameters');
    sandbox.spy(viewSlider.viewBubbles, 'setBubbleParameters');
    sandbox.spy(viewSlider.eventEmitter, 'notify');
    sandbox.stub(viewSlider, 'getScaleSizes').callsFake(() => {
      viewSlider.scaleLength = 1200;
      viewSlider.scalePosition = 0;
    });
  });

  it('Should set the parameters at the slider elements', () => {
    viewSlider.setViewParameters();
    expect(viewSlider.viewScale.setDirection.called).to.deep.equal(true);
    expect(viewSlider.viewHandles.setHandlersParameters.called).to.deep.equal(true);
    expect(viewSlider.viewBubbles.setBubbleParameters.called).to.deep.equal(true);
  });

  it('Should set the first value as name and 10 as value', () => {
    viewSlider.update({ target: 'firstValue', newCoordinate: 120 }, 'handlerPositionChanged');
    let newOption = { ...viewSlider.model.modelOptions, firstValue: 10 };
    expect(viewSlider.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOption);
    expect(viewSlider.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('viewSliderUpdated');

    viewSlider.update({ target: 'scale', newCoordinate: 120 }, 'scaleClicked');
    newOption = { ...viewSlider.model.modelOptions, firstValue: 10 };
    expect(viewSlider.eventEmitter.notify.getCall(1).args[0]).to.deep.equal(newOption);
  });

  it('Should set the second value as name and 80 as value', () => {
    viewSlider.update({ target: 'secondValue', newCoordinate: 960 }, 'handlerPositionChanged');
    let newOption = { ...viewSlider.model.modelOptions, secondValue: 80 };
    expect(viewSlider.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOption);
    expect(viewSlider.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('viewSliderUpdated');

    viewSlider.update({ target: 'scale', newCoordinate: 960 }, 'scaleClicked');
    newOption = { ...viewSlider.model.modelOptions, secondValue: 80 };
    expect(viewSlider.eventEmitter.notify.getCall(1).args[0]).to.deep.equal(newOption);
  });
});
