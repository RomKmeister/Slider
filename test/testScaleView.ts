import { expect } from 'chai';
import * as sinon from 'sinon';
import ScaleView from '../src/plugin/View/ScaleView/ScaleView';

describe('Scale View', () => {
  let scaleView: any;
  beforeEach(() => {
    const sandbox = sinon.createSandbox();
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin',
      '<div class="js-slider__scale"></div><div class="js-slider__steps"><div class="slider__step"></div></div>');
    scaleView = new ScaleView(element);
    sandbox.spy(scaleView.eventEmitter, 'notify');
  });

  it('Should set the horizontal direction of scale', () => {
    scaleView.setParameters({
      minValue: 0,
      maxValue: 10,
      step: 1,
      isVertical: false,
      isScaleStepsVisible: false,
      range: 100,
    });
    expect(scaleView.scale.className).to.equal('js-slider__scale');
  });

  it('Should set the vertical direction of scale', () => {
    scaleView.setParameters({
      minValue: 0,
      maxValue: 10,
      step: 1,
      isVertical: true,
      isScaleStepsVisible: false,
      range: 100,
    });
    expect(scaleView.scale.className).to.equal('js-slider__scale slider__scale_vertical');
  });

  it('Should send new options from the scale to the observers', () => {
    scaleView.scale.dispatchEvent(new MouseEvent('mousedown', { clientX: 100 }));
    const newCoordinate = { target: 'scale', coordinate: 100 };
    expect(scaleView.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newCoordinate);
    expect(scaleView.eventEmitter.notify.getCall(0).args[1]).to.equal('scaleClicked');
  });
});
