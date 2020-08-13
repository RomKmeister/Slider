import { expect } from 'chai';
import BubbleView from '../src/plugin/View/BubbleView/BubbleView';

describe('Bubble View', () => {
  let bubbleView: BubbleView;
  let testElement: HTMLElement;
  beforeEach(() => {
    const element = document.createElement('div');
    element.classList.add('js-slider__bubble');
    bubbleView = new BubbleView(element);
    testElement = bubbleView.bubble;
  });

  it('Should set the bubble value', () => {
    bubbleView.setParameters({
      value: 55,
      isVertical: false,
    });
    expect(testElement.textContent).to.equal('55');
  });

  it('Should set the horizontal direction', () => {
    bubbleView.setParameters({
      value: 55,
      isVertical: false,
    });
    expect(testElement.className).to.equal('slider__bubble');
  });

  it('Should set the vertical direction', () => {
    bubbleView.setParameters({
      value: 55,
      isVertical: true,
    });
    expect(testElement.className).to.equal('slider__bubble slider__bubble_vertical');
  });
});
