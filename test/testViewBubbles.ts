import { expect } from 'chai';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';
import ViewBubbles from '../src/plugin/View/ViewBubbles';

describe('ViewBubbles', () => {
  let options: Slider;
  let model: Model;
  let viewBubbles: ViewBubbles;
  beforeEach(() => {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin',
      '<div class="js-slider__bubble"></div><div class="js-slider__bubble"></div>');

    options = {
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: false,
      showBubble: false,
    };

    model = new Model(options);
    viewBubbles = new ViewBubbles(element, model);
    viewBubbles.setBubbleParameters();
  });

  it('Should set bubble value', () => {
    expect(viewBubbles.firstBubble.textContent).to.deep.equal('55');
    expect(viewBubbles.secondBubble.textContent).to.deep.equal('70');
  });

  it('Should show bubbles', () => {
    viewBubbles.model.modelOptions.showBubble = true;
    viewBubbles.setBubbleParameters();
    expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble slider__bubble_visible');
    expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble slider__bubble_visible');
  });

  it('Should hide bubbles', () => {
    expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble');
    expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble');
  });

  it('Should set horizontal direction', () => {
    expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble');
    expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble');
  });

  it('Should set vertical direction', () => {
    viewBubbles.model.modelOptions.verticalScale = true;
    viewBubbles.setBubbleParameters();
    expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble slider__bubble_vertical');
    expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble slider__bubble_vertical');
  });
});
