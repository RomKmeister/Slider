import { expect } from 'chai';
import Presenter from '../src/Presenter/Presenter';

describe("Slider", function() {
  let defaultSlider: any;
  let customSlider: any;
  beforeEach(() => { 
    defaultSlider = new Presenter({});
    customSlider = new Presenter({
      minValueScale: 10,
      maxValueScale: 150,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });
  })

  it("Создает слайдер", () => {
    expect(defaultSlider.model).to.deep.equal({
      minValueScale: 0, 
      maxValueScale: 100, 
      firstValue: 40, 
      showSecondValue: false,
      secondValue: 70,
      step: 0, 
      verticalScale: false, 
      showBubble: true
    })
  });
  
  it("Создает слайдер", () => {
    expect(customSlider.model).to.deep.equal({
      minValueScale: 10,
      maxValueScale: 150,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    })
  });
});