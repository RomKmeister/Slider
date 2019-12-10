import { expect } from 'chai';
import Presenter from '../src/Presenter/Presenter';

afterEach(() => {
  document.body.innerHTML = ''
})


describe("Presenter", function() {

  it('Should subscribe modules to mediator', () => {
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

    expect(slider.model.mediator).to.deep.equal(slider.viewSlider.mediator);
  })

});