import { expect } from 'chai';
import * as sinon from 'sinon';
import ScaleView from '../src/plugin/View/ScaleView';
import Model from '../src/plugin/Model/Model';
import { BaseOptions } from '../src/plugin/interfaces';

describe('Scale View', () => {
  let options: BaseOptions;
  let scaleView: any;
  let model: Model;
  beforeEach(() => {
    const sandbox = sinon.createSandbox();
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin',
      '<div class="js-slider__scale"></div><div class="js-slider__steps"><div class="slider__step"></div></div>');

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
    scaleView = new ScaleView(element, model);
    sandbox.spy(scaleView.eventEmitter, 'notify');
  });

  it('Should set the horizontal direction of scale', () => {
    scaleView.setDirection();
    expect(scaleView.scale.className).to.equal('js-slider__scale');
  });

  it('Should set the vertical direction of scale', () => {
    scaleView.model.options.isVertical = true;
    scaleView.setDirection();
    expect(scaleView.scale.className).to.equal('js-slider__scale slider__scale_vertical');
  });

  it('Should send new options from the scale to the observers', () => {
    scaleView.scale.dispatchEvent(new MouseEvent('mousedown', { clientX: 100 }));
    const newOptions = { target: 'scale', newCoordinate: 100 };
    expect(scaleView.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOptions);
    expect(scaleView.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('scaleClicked');
  });
});
