import { expect } from 'chai';
import ViewSlider from '../src/plugin/View/ViewSlider';
import Model from '../src/plugin/Model/Model';

describe('ViewSlider', () => {
  let viewSlider: ViewSlider;
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

    viewSlider = new ViewSlider(element);
    viewSlider.model = options;
  });

  it('Should calculate value', () => {
    const value = viewSlider.calculateValue(120)
    expect(value).to.equal(1);
  });
});
