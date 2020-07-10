import { expect } from 'chai';
import Model from '../src/plugin/Model/Model';
import { BaseOptions } from '../src/plugin/interfaces';
import BubbleView from '../src/plugin/View/BubbleView';

describe('Bubble View', () => {
  let options: BaseOptions;
  let model: Model;
  let bubbleView: BubbleView;
  let testElement: HTMLElement;
  beforeEach(() => {
    const element = document.createElement('div');
    element.classList.add('js-slider__bubble');
    const index = 0;

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
    bubbleView = new BubbleView(element, index, model);
    bubbleView.setBubbleParameters();
    testElement = bubbleView.element;
  });

  it('Should set the bubble value', () => {
    expect(testElement.textContent).to.deep.equal('55');
  });

  it('Should show the bubble', () => {
    bubbleView.model.options.isBubbleVisible = true;
    bubbleView.setBubbleParameters();
    expect(testElement.className).to.deep.equal('js-slider__bubble slider__bubble_visible');
  });

  it('Should hide the bubble', () => {
    expect(testElement.className).to.deep.equal('js-slider__bubble');
  });

  it('Should set the horizontal direction', () => {
    expect(testElement.className).to.deep.equal('js-slider__bubble');
  });

  it('Should set the vertical direction', () => {
    bubbleView.model.options.isVertical = true;
    bubbleView.setBubbleParameters();
    expect(testElement.className).to.deep.equal('js-slider__bubble slider__bubble_vertical');
  });
});
