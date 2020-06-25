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
      minValue: 0,
      maxValue: 100,
      firstValue: 55,
      isSecondValueVisible: true,
      secondValue: 70,
      step: 1,
      isVertical: false,
      isBubbleVisible: false,
      isScaleStepsVisible: true,
    };

    model = new Model(options);
    viewBubbles = new ViewBubbles(element, model);
    viewBubbles.setBubbleParameters();
  });

  it('Should set the bubble value', () => {
    expect(viewBubbles.firstBubble.textContent).to.deep.equal('55');
    expect(viewBubbles.secondBubble.textContent).to.deep.equal('70');
  });

  it('Should show the bubbles', () => {
    viewBubbles.model.options.isBubbleVisible = true;
    viewBubbles.setBubbleParameters();
    expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble slider__bubble_visible');
    expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble slider__bubble_visible');
  });

  it('Should hide the bubbles', () => {
    expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble');
    expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble');
  });

  it('Should set the horizontal direction', () => {
    expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble');
    expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble');
  });

  it('Should set the vertical direction', () => {
    viewBubbles.model.options.isVertical = true;
    viewBubbles.setBubbleParameters();
    expect(viewBubbles.firstBubble.className).to.deep.equal('js-slider__bubble slider__bubble_vertical');
    expect(viewBubbles.secondBubble.className).to.deep.equal('js-slider__bubble slider__bubble_vertical');
  });
});
