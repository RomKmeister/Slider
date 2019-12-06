import { expect } from 'chai';
import ViewSlider from '../src/View/ViewSlider';

describe("ViewSlider", function() {

  it('Creates slider', () => {
    const viewSlider = new ViewSlider();

    viewSlider.render();

    expect(document.querySelectorAll('.slider').length).to.equal(1);
    expect(document.querySelectorAll('.slider__scale').length).to.equal(1);
    expect(document.querySelectorAll('.slider__handler').length).to.equal(2);
    expect(document.querySelectorAll('.slider__bubble').length).to.equal(2)
  })
  

});