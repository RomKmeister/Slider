import { expect } from 'chai';
import BubbleView from '../src/plugin/View/BubbleView';

describe('Bubble View', () => {
  let bubbleView: BubbleView;
  let testElement: HTMLElement;
  beforeEach(() => {
    const element = document.createElement('div');
    element.classList.add('js-slider__bubble');
    bubbleView = new BubbleView(element);
    testElement = bubbleView.element;
  });
  it('Should set the first bubble value', () => {
    bubbleView.setBubbleParameters(0, 55, false, true);
    expect(testElement.textContent).to.deep.equal('55');
  });

  it('Should set the second bubble value', () => {
    bubbleView.setBubbleParameters(1, 70, false, true);
    expect(testElement.textContent).to.deep.equal('70');
  });

  it('Should show the bubble', () => {
    bubbleView.setBubbleParameters(1, 70, false, true);
    expect(testElement.className).to.deep.equal('js-slider__bubble slider__bubble_visible');
  });

  it('Should hide the bubble', () => {
    bubbleView.setBubbleParameters(0, 55, false, false);
    expect(testElement.className).to.deep.equal('js-slider__bubble');
  });

  it('Should set the horizontal direction', () => {
    bubbleView.setBubbleParameters(1, 70, false, false);
    expect(testElement.className).to.deep.equal('js-slider__bubble');
  });

  it('Should set the vertical direction', () => {
    bubbleView.setBubbleParameters(0, 55, true, false);
    expect(testElement.className).to.deep.equal('js-slider__bubble slider__bubble_vertical');
  });
});
