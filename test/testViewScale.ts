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
});
