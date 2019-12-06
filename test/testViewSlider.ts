import { expect } from 'chai';
import ViewSlider from '../src/View/ViewSlider';
import Model from '../src/Model/Model';

describe("ViewSlider", function() {

  it('Creates slider', () => {
    const viewSlider = new ViewSlider(new Model({}));

    viewSlider.render();

    expect(document.querySelectorAll('.slider').length).to.equal(1);
    expect(document.querySelectorAll('.slider__scale').length).to.equal(1);
    expect(document.querySelectorAll('.slider__handle').length).to.equal(2);
    expect(document.querySelectorAll('.slider__bubble').length).to.equal(2)
  })

  it('Set slider\'s parameters', () => {
    const viewSlider = new ViewSlider(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    }));

    viewSlider.render();
    viewSlider.setHandlesPosition();
    const handles = document.body.querySelectorAll('.slider__handle');
    const firstHandle = handles[0] as HTMLElement;
    const secondHandle = handles[1] as HTMLElement;

    expect(firstHandle.style.left).to.equal('55%');
    expect(secondHandle.style.left).to.equal('70%');
  })
});