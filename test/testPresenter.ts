/* eslint-disable max-len */
import { expect } from 'chai';
import * as sinon from 'sinon';
import Presenter from '../src/plugin/Presenter/Presenter';
import View from '../src/plugin/View/View';
import Model from '../src/plugin/Model/Model';
import { BaseOptions } from '../src/plugin/interfaces';

describe('Presenter', () => {
  let presenter: any;
  let model: Model;
  let options: BaseOptions;
  let view: View;

  beforeEach(() => {
    const sandbox = sinon.createSandbox();
    const element = document.createElement('div');
    element.classList.add('js-slider-block');
    element.insertAdjacentHTML('afterbegin', '<div class="js-slider"><div class="js-slider__scale"></div><div class="js-slider__steps"><div class="slider__step"></div></div><div class="js-slider__handle"><div class="js-slider__bubble"></div></div><div class="js-slider__handle"><div class="js-slider__bubble"></div></div>');

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
    presenter = new Presenter(model, view);
    sandbox.spy(model, 'update');
    sandbox.spy(view, 'setViewParameters');
  });

  it('Should update model', () => {
    presenter.update(presenter.model, 'viewUpdated');
    presenter.update(presenter.model, 'newOptions');
    expect(presenter.model.update.calledTwice).to.deep.equal(true);
  });

  it('Should update views', () => {
    presenter.update(presenter.model, 'modelUpdated');
    expect(presenter.view.setViewParameters.called).to.deep.equal(true);
  });

  it('Should get model options', () => {
    const getOptions = presenter.getOptions();
    expect(getOptions).to.deep.equal(model.options);
  });

  it('Should set model options', () => {
    presenter.setOptions({ minValue: 44 });
    expect(presenter.model.update.called).to.deep.equal(true);
    expect(presenter.model.options.minValue).to.deep.equal(44);
  });
});
