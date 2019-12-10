import { expect } from 'chai';
import ViewSlider from '../src/View/ViewSlider';
import Model from '../src/Model/Model';

afterEach(() => {
  document.body.innerHTML = ''
})


describe("ViewSlider", function() {

  it('Creates slider', () => {
    const viewSlider = new ViewSlider(new Model({}));

    expect(document.querySelectorAll('.slider').length).to.equal(1);
    expect(document.querySelectorAll('.slider__scale').length).to.equal(1);
    expect(document.querySelectorAll('.slider__handle').length).to.equal(2);
    expect(document.querySelectorAll('.slider__bubble').length).to.equal(2)
  })

  it('Should set slider\s parameters', () => {
    const slider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });

    slider.setSliderParameters();

    const selectHandles = document.querySelectorAll('.slider__handle') as HTMLElement);
    const selectBubbles = document.querySelectorAll('.slider__bubble') as HTMLElement;


    expect(selectHandles[0].style.left).to.deep.equal("55%");
    expect(selectHandles[1].style.left).to.deep.equal("70%");
    expect(selectHandles[1].style.display).to.deep.equal("block");
    expect(selectBubbles[0].style.display).to.deep.equal("block");
    expect(selectBubbles[1].style.display).to.deep.equal("block");
    expect(selectBubbles[0].textContent).to.deep.equal("55");
    expect(selectBubbles[1].textContent).to.deep.equal("70");
  })
});