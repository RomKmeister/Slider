import { expect } from 'chai';
import * as sinon from 'sinon';
import ViewScale from '../src/plugin/View/ViewScale';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';

describe('ViewScale', () => {
  let options: Slider;
  let viewScale: any;
  let model: Model;
  beforeEach(() => {
    const sandbox = sinon.createSandbox();
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', '<div class="js-slider__scale"></div>');

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
    viewScale = new ViewScale(element, model);
    sandbox.spy(viewScale.eventEmitter, 'notify');
  });

  it('Should set the horizontal direction of scale', () => {
    viewScale.setDirection();
    expect(viewScale.scale.className).to.equal('js-slider__scale');
  });

  it('Should set the vertical direction of scale', () => {
    viewScale.model.modelOptions.isVertical = true;
    viewScale.setDirection();
    expect(viewScale.scale.className).to.equal('js-slider__scale slider__scale_vertical');
  });

  it('Should send new options from the scale to the observers', () => {
    viewScale.scale.dispatchEvent(new MouseEvent('mousedown', { clientX: 100 }));
    const newOptions = { target: 'scale', newCoordinate: 100 };
    expect(viewScale.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOptions);
    expect(viewScale.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('scaleClicked');
  });
});
