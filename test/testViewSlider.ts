import { expect } from 'chai';
import ViewSlider from '../src/ViewSlider/ViewSlider';
import Model from '../src/Model/Model';
import Presenter from '../src/Presenter/Presenter';

describe('ViewSlider', function() {

  let slider: ViewSlider;

  let sliderWithAllFalse: ViewSlider;

  beforeEach(() => {
    slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    }));

    sliderWithAllFalse = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: false,
      secondValue: 70,
      step: 1,
      verticalScale: false,
      showBubble: false,
    }));
  })

  it('Creates slider', () => {
    expect(slider.slider.className).to.equal('slider-block__slider js-slider');
    expect(slider.slider.querySelectorAll('slider-block__scale js-slider-block__scale').length).to.equal(1);
    expect(slider.slider.querySelectorAll('slider-block__handle').length).to.equal(2);
    expect(slider.slider.querySelectorAll('slider-block__bubble').length).to.equal(2)
  })

  it('Should set horisontal handles position', () => {
    
    expect(sliderWithAllFalse.firstHandle.style.left).to.deep.equal('55%');
    expect(sliderWithAllFalse.secondHandle.style.left).to.deep.equal('70%');
  })

  it('Should set vertical handles position', () => {

    expect(slider.firstHandle.style.top).to.deep.equal('55%');
    expect(slider.secondHandle.style.top).to.deep.equal('70%');
  })

  it('Should set show second handle', () => {
  
    expect(slider.secondHandle.style.display).to.deep.equal('block');
  })

  it('Should set hide second handle', () => {
  
    expect(sliderWithAllFalse.secondHandle.style.display).to.deep.equal('none');
  })

  it('Should set bubble value', () => {

    expect(slider.firstBubble.textContent).to.deep.equal('55');
    expect(slider.secondBubble.textContent).to.deep.equal('70');
  })

  it('Should show bubbles', () => {

    expect(slider.firstBubble.style.display).to.deep.equal('block');
    expect(slider.secondBubble.style.display).to.deep.equal('block');
  })

  it('Should hide bubbles', () => {
  
    expect(sliderWithAllFalse.firstBubble.style.display).to.deep.equal('none');
    expect(sliderWithAllFalse.secondBubble.style.display).to.deep.equal('none');
  })

  it('Should set horisontal scale', () => {

    expect(sliderWithAllFalse.scale.className).to.deep.equal('slider-block__scale js-slider-block__scale');
  })
 
  it('Should set vertical scale', () => {

    expect(slider.scale.className).to.deep.equal('slider-block__scale js-slider-block__scale slider-block__scale_vertical');
  })
});