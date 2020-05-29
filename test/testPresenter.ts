/* eslint-disable max-len */
import { expect } from 'chai';
import * as sinon from 'sinon';
import Presenter from '../src/plugin/Presenter/Presenter';
import ViewSlider from '../src/plugin/View/ViewSlider';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';

describe('Presenter', () => {
  let presenter: any;
  let model: Model;
  let options: Slider;
  let viewSlider: ViewSlider;

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
    viewSlider = new ViewSlider(element, model);
    presenter = new Presenter(model, viewSlider);
    sandbox.spy(model, 'update');
    sandbox.spy(viewSlider, 'setViewParameters');
  });

  it('Should update model', () => {
    presenter.update(presenter.model, 'viewSliderUpdated');
    expect(presenter.model.update.called).to.deep.equal(true);
  });

  it('Should update views', () => {
    presenter.update(presenter.model, 'modelUpdated');
    expect(presenter.viewSlider.setViewParameters.called).to.deep.equal(true);
  });
});
