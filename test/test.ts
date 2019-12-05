import { expect } from 'chai';
import Presenter from '../src/Presenter/Presenter';
import Model from '../src/Model/Model';

describe("Slider", function() {

  it("Создает слайдер с кастомными параметрами", () => {
    const customSliderPresenter: Presenter = new Presenter({
      minValueScale: 10,
      maxValueScale: 150,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });
    const customSliderModel: Model = new Model({
      minValueScale: 10,
      maxValueScale: 150,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    });
    expect(customSliderPresenter.model).to.deep.equal(customSliderModel)
  });

    it("FirstValue should be less than maxValueScale", () => {
    const valueMoreMax: Presenter = new Presenter({
      maxValueScale: 150,
      firstValue: 200,
    });
    valueMoreMax.model.checkScaleBorders();
    expect(valueMoreMax.model.firstValue).to.deep.equal(valueMoreMax.model.maxValueScale)
  });

  it("FirstValue should be more than minValueScale", () => {
    const valuedLessMin: Presenter = new Presenter({
      minValueScale: 10,
      firstValue: 0,
    });
    valuedLessMin.model.checkScaleBorders();
    expect(valuedLessMin.model.firstValue).to.deep.equal(valuedLessMin.model.minValueScale)
  });
  
  it("SecondValue should be less than maxValueScale", () => {
    const valueMoreMax: Presenter = new Presenter({
      maxValueScale: 150,
      secondValue: 200,
    });
    valueMoreMax.model.checkScaleBorders();
    expect(valueMoreMax.model.secondValue).to.deep.equal(valueMoreMax.model.maxValueScale)
  });
});