import { expect } from 'chai';
import ViewSlider from '../src/plugin/View/ViewSlider';
import Model from '../src/plugin/Model/Model';

describe('ViewSlider', () => {
  let slider: ViewSlider;

  let sliderWithAllFalse: ViewSlider;

  beforeEach(() => {
    const element = document.createElement('div');
    const model = new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });
    const model1 = new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: false,
      secondValue: 70,
      step: 1,
      verticalScale: false,
      showBubble: false,
    })
    slider = new ViewSlider(element, model);
    sliderWithAllFalse = new ViewSlider(element, model1);

  });
});
