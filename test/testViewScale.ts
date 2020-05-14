import { expect } from 'chai';
import ViewScale from '../src/plugin/View/ViewScale';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';

describe('ViewScale', () => {
  let viewScale: ViewScale;
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

    viewScale = new ViewScale(element);
    viewScale.model = options;
    viewScale.findElements();
    viewScale.bindEventListners();
  });

  it('Should find scale', () => {
    expect(viewScale.scale).to.exist;
  });

  it('Should set horizontal scale', () => {
    viewScale.setDirection();
    expect(viewScale.scale.className).to.equal('js-slider__scale');
  });

  it('Should set vertical scale', () => {
    viewScale.model.verticalScale = true;
    viewScale.setDirection();
    expect(viewScale.scale.className).to.equal('js-slider__scale slider__scale_vertical');
  });

  it('Should call functions on event', () => {
    const sandbox = sinon.createSandbox();
    sandbox.spy(viewScale, 'calculateValue');
    sandbox.spy(viewScale, 'chooseHandlerForUpdate');
    sandbox.spy(viewScale.eventEmitter, 'notify');
    viewScale.scale.dispatchEvent(new Event('mousedown'));
    expect(viewScale.calculateValue.called).to.deep.equal(true);
    expect(viewScale.chooseHandlerForUpdate.called).to.deep.equal(true);
    expect(viewScale.eventEmitter.notify.called).to.deep.equal(true);
  });
});
