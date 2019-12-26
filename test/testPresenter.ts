import { expect } from 'chai';
import Presenter from '../src/Presenter/Presenter';

describe('Slider', function() {


  it('FirstValue should be less than maxValueScale', () => {
    let presenter: Presenter = new Presenter({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: false,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });
    presenter.notify({'firstValue': 50});
    expect(presenter.model.firstValue).to.deep.equal(50);
    expect(presenter.viewSlider.model.firstValue).to.deep.equal(50);
    expect(presenter.viewPanel.model.firstValue).to.deep.equal(50);
  });
});