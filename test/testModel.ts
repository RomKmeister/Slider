import { expect } from 'chai';
import Model from '../src/Model/Model';

describe("Slider", function() {

  it("FirstValue should be less than maxValueScale", () => {
    const valueMoreMax: Model = new Model({
      maxValueScale: 150,
      firstValue: 200,
    });
    valueMoreMax.checkScaleBorders();
    expect(valueMoreMax.firstValue).to.deep.equal(valueMoreMax.maxValueScale)
  });

  it("FirstValue should be more than minValueScale", () => {
    const valuedLessMin: Model = new Model({
      minValueScale: 10,
      firstValue: 0,
    });
    valuedLessMin.checkScaleBorders();
    expect(valuedLessMin.firstValue).to.deep.equal(valuedLessMin.minValueScale)
  });
  
  it("SecondValue should be less than maxValueScale", () => {
    const valueMoreMax: Model = new Model({
      maxValueScale: 150,
      secondValue: 200,
    });
    valueMoreMax.checkScaleBorders();
    expect(valueMoreMax.secondValue).to.deep.equal(valueMoreMax.maxValueScale)
  });
});