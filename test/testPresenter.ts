import { expect } from 'chai';
import Presenter from '../src/plugin/Presenter/Presenter';
import sinon = require('sinon');

describe('Presenter', () => {
  let presenter: Presenter;
  let options: Model;

  beforeEach(() => {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', '<div class="js-slider__scale"></div>');

    options = {
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: false,
      showBubble: true,
      scaleLength: 100,
      firstValueRatio: 55,
      secondValueRatio: 70,
      interval: 7.5,
      firstValueArea: 62.5,
    };

    presenter = new Presenter(element, options);
  });

  it('Should call functions on event', () => {
    const sandbox = sinon.createSandbox();
    sandbox.spy(presenter, 'setViewParameters');
    presenter.update(options, 'modelUpdated')
    expect(presenter.setViewParameters.called).to.deep.equal(true);
  });

  it('Should call functions on event', () => {
    const sandbox = sinon.createSandbox();
    sandbox.spy(presenter.model, 'setModelParameters');
    presenter.update(options, 'viewUpdated')
    expect(presenter.model.setModelParameters.called).to.deep.equal(true);
  });
});
