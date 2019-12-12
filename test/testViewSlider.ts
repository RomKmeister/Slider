import { expect } from 'chai';
import ViewSlider from '../src/View/ViewSlider';
import Model from '../src/Model/Model';

afterEach(() => {
  document.body.innerHTML = ''
})


describe('ViewSlider', function() {

  it('Creates slider', () => {
    const viewSlider = new ViewSlider(new Model({}));

    expect(document.querySelectorAll('.slider').length).to.equal(1);
    expect(document.querySelectorAll('.slider__scale').length).to.equal(1);
    expect(document.querySelectorAll('.slider__handle').length).to.equal(2);
    expect(document.querySelectorAll('.slider__bubble').length).to.equal(2)
  })

  it('Should set horisontal handles position', () => {
    const slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: false,
      showBubble: true,
    }));

    slider.setSliderParameters();
    const selectHandles = document.querySelectorAll('.slider__handle') as NodeListOf<HTMLElement>;

    expect(selectHandles[0].style.left).to.deep.equal('55%');
    expect(selectHandles[1].style.left).to.deep.equal('70%');
  })

  it('Should set vertical handles position', () => {
    const slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    }));

    slider.setSliderParameters();
    const selectHandles = document.querySelectorAll('.slider__handle') as NodeListOf<HTMLElement>;

    expect(selectHandles[0].style.top).to.deep.equal('55%');
    expect(selectHandles[1].style.top).to.deep.equal('70%');
  })

  it('Should set show secont handle', () => {
    const slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    }));

    slider.setSliderParameters();
    const selectHandles = document.querySelectorAll('.slider__handle') as NodeListOf<HTMLElement>;
  
    expect(selectHandles[1].style.display).to.deep.equal('block');
  })

  it('Should set hide secont handle', () => {
    const slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: false,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    }));

    slider.setSliderParameters();
    const selectHandles = document.querySelectorAll('.slider__handle') as NodeListOf<HTMLElement>;
  
    expect(selectHandles[1].style.display).to.deep.equal('none');
  })

  it('Should set bubble value', () => {
    const slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    }));

    slider.setSliderParameters();
    const selectBubbles = document.querySelectorAll('.slider__bubble') as NodeListOf<HTMLElement>;
  
    expect(selectBubbles[0].textContent).to.deep.equal('55');
    expect(selectBubbles[1].textContent).to.deep.equal('70');
  })

  it('Should show bubbles', () => {
    const slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    }));

    slider.setSliderParameters();
    const selectBubbles = document.querySelectorAll('.slider__bubble') as NodeListOf<HTMLElement>;
  
    expect(selectBubbles[0].style.display).to.deep.equal('block');
    expect(selectBubbles[1].style.display).to.deep.equal('block');
  })

  it('Should hide bubbles', () => {
    const slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: false,
    }));

    slider.setSliderParameters();
    const selectBubbles = document.querySelectorAll('.slider__bubble') as NodeListOf<HTMLElement>;
  
    expect(selectBubbles[0].style.display).to.deep.equal('none');
    expect(selectBubbles[1].style.display).to.deep.equal('none');
  })

  it('Should set horisontal scale', () => {
    const slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: false,
      showBubble: true,
    }));

    slider.setSliderParameters();
    const selectScale = document.querySelector('.slider__scale') as HTMLElement;

    expect(selectScale.className).to.deep.equal('slider__scale');
  })

 
  it('Should set vertical scale', () => {
    const slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    }));

    slider.setSliderParameters();
    const selectScale = document.querySelector('.slider__scale') as HTMLElement;

    expect(selectScale.className).to.deep.equal('slider__scale slider__scale_vertical');
  })
});