/* eslint-disable max-len */
import { expect } from 'chai';
import * as sinon from 'sinon';
import Presenter from '../src/plugin/Presenter/Presenter';
import View from '../src/plugin/View/View';
import Model from '../src/plugin/Model/Model';
import { BaseOptions } from '../src/plugin/interfaces';

describe('Presenter', () => {
  let presenter: Presenter;
  let model: Model;
  let options: BaseOptions;
  let view: View;

  beforeEach(() => {
    const element = document.createElement('div');
    element.classList.add('js-slider');
    element.insertAdjacentHTML('afterbegin', '<div class="js-slider__scale"></div><div class="js-slider__steps"><div class="slider__step"></div></div><div class="js-slider__runner"><div class="js-slider__bubble"></div></div><div class="js-slider__runner"><div class="js-slider__bubble"></div>');

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
  });

  it('Should update model', () => {
    const newRatio = { firstValueRatio: 1 };
    const spy = sinon.spy(model, 'update');
    presenter.update(newRatio, 'viewUpdated');
    presenter.update(newRatio, 'newOptions');
    expect(spy.calledTwice).to.equal(true);
  });

  it('Should update views', () => {
    const newRatio = { firstValueRatio: 1 };
    const spy = sinon.spy(view, 'setParameters');
    presenter.update(newRatio, 'modelUpdated');
    expect(spy.called).to.equal(true);
  });

  it('Should get model options', () => {
    const getOptions = presenter.getOptions();
    expect(getOptions).to.equal(model.options);
  });

  it('Should set model options', () => {
    const spy = sinon.spy(model, 'update');
    presenter.setOptions({ minValue: 44 });
    expect(spy.called).to.equal(true);
    expect(model.options.minValue).to.equal(44);
  });
});
