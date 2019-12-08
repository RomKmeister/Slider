import { expect } from 'chai';
import Presenter from '../src/Presenter/Presenter';

afterEach(() => {
  document.body.innerHTML = ''
})


describe("Presenter", function() {

  it('Should update model', () => {
    const slider = new Presenter({
      minValueScale: 10,
      maxValueScale: 150,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });

    slider.viewSlider.render();

    const selectSlider: HTMLElement = document.querySelector('.slider');
    selectSlider.click();

    expect(slider.model.firstValue).to.deep.equal(80)
  })

});